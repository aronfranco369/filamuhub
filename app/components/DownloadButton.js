import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const DownloadButton = ({
  size = "sm",
  variant = "default",
  fileSize,
  className = "",
  onClick,
  children,
}) => {
  const baseClasses = "flex items-center gap-1";
  const defaultStyle = "bg-gray-900 hover:bg-gray-700 text-white";

  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={`${baseClasses} ${defaultStyle} ${className}`}
    >
      <Download className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      {children || (fileSize && <span>{fileSize} MB</span>)}
    </Button>
  );
};

export default DownloadButton;
