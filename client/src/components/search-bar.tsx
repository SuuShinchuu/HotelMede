import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const NEIGHBORHOODS = [
  "Aranjuez",
  "Belén",
  "Boston",
  "Buenos Aires",
  "Castilla",
  "El Poblado",
  "Envigado",
  "Estadio",
  "Itagüí",
  "La América",
  "La Candelaria",
  "Laureles",
  "Manrique",
  "Popular",
  "Robledo",
  "San Javier"
];

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [_, navigate] = useLocation();

  const suggestions = NEIGHBORHOODS.filter(neighborhood =>
    neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (neighborhood?: string) => {
    const term = neighborhood || searchTerm;
    if (term.trim()) {
      navigate(`/hotels?neighborhood=${encodeURIComponent(term.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeSuggestion >= 0) {
        handleSearch(suggestions[activeSuggestion]);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-lg">
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Buscar por barrio..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
              setActiveSuggestion(-1);
            }}
            onKeyDown={handleKeyDown}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          {showSuggestions && searchTerm.trim() !== "" && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-border z-[100] max-h-[300px] overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={cn(
                    "px-4 py-2 cursor-pointer hover:bg-accent text-gray-900 dark:text-gray-100",
                    index === activeSuggestion && "bg-accent"
                  )}
                  onClick={() => handleSearch(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
      </form>
    </div>
  );
}