import {
  Navbar,
  Typography,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import { useAuth } from "../context/authContext";
import {
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { FaGithub } from "react-icons/fa";

function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar className="bg-white shadow px-6 py-3 flex items-center justify-between">
        <Typography variant="h6" className="text-blue-700">
          Admin Dashboard
        </Typography>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/gandhiomkar/react-auth-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 text-gray-800 hover:text-black"
            title="View on GitHub"
          >
            {FaGithub({ size: 24, className: "transition hover:scale-110" })}
          </a>

          <Typography className="text-gray-700 text-sm">
            Welcome, {user?.name}
          </Typography>
          <Button size="sm" color="red" onClick={logout}>
            Logout
          </Button>
        </div>
      </Navbar>

      <div className="container mx-auto px-6 py-10">
        <Typography variant="h4" className="mb-8 text-blue-gray-800">
          Dashboard Overview
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-lg">
            <CardHeader
              floated={false}
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4"
            >
              <div className="flex items-center justify-between">
                <Typography variant="h5">Reports</Typography>
                <ChartBarIcon className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardBody>
              <Typography variant="small" className="text-gray-700">
                View and export monthly reports, KPIs, and analytics.
              </Typography>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardHeader
              floated={false}
              className="bg-gradient-to-r from-green-600 to-green-400 text-white p-4"
            >
              <div className="flex items-center justify-between">
                <Typography variant="h5">User Management</Typography>
                <UsersIcon className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardBody>
              <Typography variant="small" className="text-gray-700">
                Manage users, permissions, and access control.
              </Typography>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardHeader
              floated={false}
              className="bg-gradient-to-r from-purple-600 to-purple-400 text-white p-4"
            >
              <div className="flex items-center justify-between">
                <Typography variant="h5">Settings</Typography>
                <Cog6ToothIcon className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardBody>
              <Typography variant="small" className="text-gray-700">
                Configure application settings and preferences.
              </Typography>
            </CardBody>
          </Card>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <Typography variant="h6" className="mb-4 text-blue-gray-800">
            Quick Insights
          </Typography>
          <Typography className="text-gray-600">
            This section can include charts, recent activity, data summaries, or
            system status widgets.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
