import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import React from "react";

type MessageType = "info" | "error" | "success" | null;

interface FormContainerProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  buttonLabel: string;
  buttonColor?: "blue" | "green" | "red";
  message?: { type: MessageType; text: string } | null;
  footer?: React.ReactNode;
}

export default function FormContainer({
  title,
  onSubmit,
  children,
  buttonLabel,
  buttonColor = "blue",
  message,
  footer,
}: FormContainerProps) {
  const messageColorMap = {
    info: "text-blue-500",
    success: "text-green-500",
    error: "text-red-500",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-2xl p-4">
        <form onSubmit={onSubmit}>
          <CardBody className="flex flex-col gap-6">
            <Typography variant="h4" color="blue-gray" className="text-center">
              {title}
            </Typography>

            {message?.text && message.type && (
              <Typography
                className={`text-center text-sm font-medium ${messageColorMap[message.type]}`}
              >
                {message.text}
              </Typography>
            )}

            {children}
          </CardBody>
          <CardFooter>
            <Button type="submit" color={buttonColor} fullWidth>
              {buttonLabel}
            </Button>
            {footer && <div className="mt-4 text-center">{footer}</div>}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
