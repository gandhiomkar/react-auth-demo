import { User } from "../models/User";

const USERS_KEY = "mock_users";

export const userService = {
  signup,
  login,
  getUsers,
  findUserByEmail,
};

function getUsers(): User[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function findUserByEmail(email: string): User | undefined {
  return getUsers().find((user) => user.email === email);
}

function findUserByUsername(username: string): User | undefined {
  return getUsers().find((user) => user.username === username);
}

function signup(user: Omit<User,"uid">): { success: boolean; message: string } {
  const users = getUsers();
  const exists = users.find((u) => u.email === user.email || u.username === user.username);
  if (exists) {
    return { success: false, message: "User already exists" };
  }

  const newUser: User = { ...user, uid: crypto.randomUUID() };
  saveUsers([...users, newUser]);
  return { success: true, message: "User created successfully" };
}

function login(username: string, password: string): { success: boolean; message: string; user?: User } {
  const user = findUserByUsername(username);
  if (!user) return { success: false, message: "User not found" };
  if (user.password !== password) return { success: false, message: "Incorrect password" };
  return { success: true, message: "Login successful", user };
}
