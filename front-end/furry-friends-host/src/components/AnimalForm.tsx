import { useState, useEffect } from "react";
import { Animal } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AnimalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (animal: Omit<Animal, "id" | "tutorId"> & { id?: string }) => void;
  animal?: Animal | null;
}

const AnimalForm = ({ open, onOpenChange, onSave, animal }: AnimalFormProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    especie: "Cachorro" as "Gato" | "Cachorro",
    raca: "",
    idade: 0,
    fotoUrl: "",
  });

  useEffect(() => {
    if (animal) {
      setFormData({
        nome: animal.nome,
        especie: animal.especie,
        raca: animal.raca,
        idade: animal.idade,
        fotoUrl: animal.fotoUrl || "",
      });
    } else {
      setFormData({
        nome: "",
        especie: "Cachorro",
        raca: "",
        idade: 0,
        fotoUrl: "",
      });
    }
  }, [animal, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      ...(animal && { id: animal.id }),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {animal ? "Editar Animal" : "Novo Animal"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
              placeholder="Ex: Rex"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="especie">Espécie</Label>
            <Select
              value={formData.especie}
              onValueChange={(value: "Gato" | "Cachorro") =>
                setFormData({ ...formData, especie: value })
              }
            >
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cachorro">Cachorro</SelectItem>
                <SelectItem value="Gato">Gato</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="raca">Raça</Label>
            <Input
              id="raca"
              value={formData.raca}
              onChange={(e) => setFormData({ ...formData, raca: e.target.value })}
              required
              placeholder="Ex: Golden Retriever"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="idade">Idade (anos)</Label>
            <Input
              id="idade"
              type="number"
              min="0"
              value={formData.idade}
              onChange={(e) =>
                setFormData({ ...formData, idade: parseInt(e.target.value) || 0 })
              }
              required
              placeholder="Ex: 3"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fotoUrl">URL da Foto (opcional)</Label>
            <Input
              id="fotoUrl"
              value={formData.fotoUrl}
              onChange={(e) => setFormData({ ...formData, fotoUrl: e.target.value })}
              placeholder="https://exemplo.com/foto.jpg"
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
              {animal ? "Salvar Alterações" : "Adicionar Animal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AnimalForm;
