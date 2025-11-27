import { Tutor } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Eye, Trash2, Edit } from "lucide-react";
import { Link } from "react-router-dom";

interface TutorCardProps {
  tutor: Tutor;
  onEdit: (tutor: Tutor) => void;
  onDelete: (id: string) => void;
}

const TutorCard = ({ tutor, onEdit, onDelete }: TutorCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">
                  {tutor.nome.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{tutor.nome}</h3>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>{tutor.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>{tutor.telefone}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t">
            <Link to={`/tutor/${tutor.id}`} className="flex-1">
              <Button variant="default" size="sm" className="w-full gap-2">
                <Eye className="w-4 h-4" />
                Ver Detalhes
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(tutor)}
              className="gap-2"
            >
              <Edit className="w-4 h-4" />
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(tutor.id)}
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

export default TutorCard;
