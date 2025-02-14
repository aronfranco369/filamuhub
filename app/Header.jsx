import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-transparent text-white">
      <h1 className="text-xl font-bold">FILAMU HUB</h1>
      <div className="flex items-center">
        <Search className="h-6 w-6 cursor-pointer" />
      </div>
    </header>
  );
}
