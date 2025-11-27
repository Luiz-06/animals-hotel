import { useState, useEffect } from "react";
import { Tutor } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TutorFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (tutor: Omit<Tutor, "id"> & { id?: string }) => void;
  tutor?: Tutor | null;
}

const TutorForm = ({ open, onOpenChange, onSave, tutor }: TutorFormProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  useEffect(() => {
    if (tutor) {
      setFormData({
        nome: tutor.nome,
        email: tutor.email,
        telefone: tutor.telefone,
      });
    } else {
      setFormData({
        nome: "",
        email: "",
        telefone: "",
      });
    }
  }, [tutor, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      ...(tutor && { id: tutor.id }),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {tutor ? "Editar Tutor" : "Novo Tutor"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
              placeholder="Ex: Maria Silva"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="Ex: maria@email.com"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              required
              placeholder="Ex: (11) 98765-4321"
              className="h-11"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {tutor ? "Salvar Alterações" : "Criar Tutor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TutorForm;
