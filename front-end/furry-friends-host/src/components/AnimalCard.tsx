import { Animal } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";

interface AnimalCardProps {
  animal: Animal;
  onEdit: (animal: Animal) => void;
  onDelete: (id: string) => void;
}

const AnimalCard = ({ animal, onEdit, onDelete }: AnimalCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-square overflow-hidden bg-muted">
        {animal.fotoUrl ? (
          <img
            src={animal.fotoUrl}
            alt={animal.nome}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
            <span className="text-6xl">🐾</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{animal.nome}</h3>
              <p className="text-sm text-muted-foreground">{animal.raca}</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              {animal.especie}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {animal.idade} {animal.idade === 1 ? "ano" : "anos"}
          </p>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(animal)}
              className="flex-1 gap-2"
            >
              <Edit className="w-4 h-4" />
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(animal.id)}
              className="gap-2 hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimalCard;
