import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchBar() {
  const [search, setSearch] = useState("");
  const [_, navigate] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/hotels?neighborhood=${encodeURIComponent(search)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 max-w-lg w-full">
      <Input
        placeholder="Buscar por barrio..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">
        <Search className="h-4 w-4 mr-2" />
        Buscar
      </Button>
    </form>
  );
}