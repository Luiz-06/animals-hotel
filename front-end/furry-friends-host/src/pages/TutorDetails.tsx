import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tutor, Animal } from "@/types";
import { mockAnimais } from "@/lib/mock-data";
import Layout from "@/components/Layout";
import AnimalCard from "@/components/AnimalCard";
import AnimalForm from "@/components/AnimalForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ArrowLeft, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

const TutorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    const storedTutores = localStorage.getItem("animalhotels_tutores");
    if (storedTutores) {
      const tutores: Tutor[] = JSON.parse(storedTutores);
      const foundTutor = tutores.find((t) => t.id === id);
      if (foundTutor) {
        setTutor(foundTutor);
      }
    }

    const storedAnimais = localStorage.getItem("animalhotels_animais");
    if (storedAnimais) {
      const allAnimais: Animal[] = JSON.parse(storedAnimais);
      setAnimais(allAnimais.filter((a) => a.tutorId === id));
    } else {
      const filtered = mockAnimais.filter((a) => a.tutorId === id);
      setAnimais(filtered);
      localStorage.setItem("animalhotels_animais", JSON.stringify(mockAnimais));
    }
  }, [id]);

  const saveAnimais = (newAnimais: Animal[]) => {
    const storedAnimais = localStorage.getItem("animalhotels_animais");
    let allAnimais: Animal[] = storedAnimais ? JSON.parse(storedAnimais) : [];
    
    allAnimais = allAnimais.filter((a) => a.tutorId !== id);
    allAnimais = [...allAnimais, ...newAnimais];
    
    localStorage.setItem("animalhotels_animais", JSON.stringify(allAnimais));
    setAnimais(newAnimais);
  };

  const handleSave = (animalData: Omit<Animal, "id" | "tutorId"> & { id?: string }) => {
    if (animalData.id) {
      const updated = animais.map((a) =>
        a.id === animalData.id ? { ...animalData, id: animalData.id, tutorId: id! } : a
      );
      saveAnimais(updated);
      toast.success("Animal atualizado com sucesso!");
    } else {
      const newAnimal: Animal = {
        ...animalData,
        id: Date.now().toString(),
        tutorId: id!,
      };
      saveAnimais([...animais, newAnimal]);
      toast.success("Animal cadastrado com sucesso!");
    }
    setEditingAnimal(null);
  };

  const handleEdit = (animal: Animal) => {
    setEditingAnimal(animal);
    setIsFormOpen(true);
  };

  const handleDelete = (animalId: string) => {
    const filtered = animais.filter((a) => a.id !== animalId);
    saveAnimais(filtered);
    toast.success("Animal removido com sucesso!");
  };

  const handleNewAnimal = () => {
    setEditingAnimal(null);
    setIsFormOpen(true);
  };

  if (!tutor) {
    return (
      <Layout>
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">Tutor não encontrado</p>
          <Button onClick={() => navigate("/dashboard")} className="mt-4">
            Voltar ao Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="gap-2 mb-6 -ml-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-bold text-primary">
                      {tutor.nome.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-3">{tutor.nome}</h1>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{tutor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{tutor.telefone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Animais</h2>
              <p className="text-muted-foreground mt-1">
                {animais.length} {animais.length === 1 ? "pet cadastrado" : "pets cadastrados"}
              </p>
            </div>
            <Button onClick={handleNewAnimal} className="gap-2 shadow-lg">
              <Plus className="w-5 h-5" />
              Novo Animal
            </Button>
          </div>

          {animais.length === 0 ? (
            <div className="text-center py-16 bg-muted/30 rounded-xl border-2 border-dashed">
              <p className="text-lg text-muted-foreground mb-4">
                Nenhum animal cadastrado ainda
              </p>
              <Button onClick={handleNewAnimal} variant="outline" className="gap-2">
                <Plus className="w-5 h-5" />
                Cadastrar Primeiro Animal
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {animais.map((animal) => (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        <AnimalForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSave={handleSave}
          animal={editingAnimal}
        />
      </div>
    </Layout>
  );
};

export default TutorDetails;
