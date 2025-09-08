import { cn } from "@/lib/utils";

const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("mx-auto space-y-2 p-6 pb-16 lg:px-8", className)}>{children}</div>;
};
export default Container;
