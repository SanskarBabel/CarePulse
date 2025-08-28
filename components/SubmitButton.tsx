import Image from "next/image";
import { Button } from "./ui/button";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
  loadingText?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const SubmitButton = ({ 
  isLoading, 
  className, 
  children, 
  loadingText = "Processing...",
  disabled = false,
  type = "submit",
  variant = "default",
  size = "default"
}: ButtonProps) => {
  return (
    <Button
      type={type}
      disabled={isLoading || disabled}
      className={cn("shad-primary-btn w-full", className)}
      variant={variant}
      size={size}
      aria-busy={isLoading}
      aria-describedby={isLoading ? "loading-description" : undefined}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Image
            src="/assets/icons/loader.svg"
            alt="Loading"
            width={24}
            height={24}
            className="animate-spin mr-2"
          />
          <span>{loadingText}</span>
          <span id="loading-description" className="sr-only">
            Please wait while we process your request
          </span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;