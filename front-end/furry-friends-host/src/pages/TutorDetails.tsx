import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tutor, Animal } from "@/types";
import Layout from "@/components/Layout";
import AnimalCard from "@/components/AnimalCard";
import AnimalForm from "@/components/AnimalForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ArrowLeft, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";

const TutorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
        const responseTutores = await api.get('/tutores');
        const foundTutor = responseTutores.data.find((t: Tutor) => t.id === id);
        setTutor(foundTutor || null);

        const responseAnimais = await api.get(`/animais?tutorId=${id}`);
        setAnimais(responseAnimais.data);
    } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar dados.");
    }
  };

  const handleSave = async (animalData: Omit<Animal, "id" | "tutorId"> & { id?: string }) => {
    try {
        const payload = { ...animalData, tutorId: id };
        
        if (animalData.id) {
            await api.put(`/animais/${animalData.id}`, payload);
            toast.success("Animal atualizado com sucesso!");
        } else {
            await api.post('/animais', payload);
            toast.success("Animal cadastrado!");
        }
        fetchData();
        setEditingAnimal(null);
    } catch (error) {
        console.error(error);
        toast.error("Erro ao salvar animal.");
    }
  };

  const handleDelete = async (animalId: string) => {
    if(confirm("Remover este animal?")) {
        try {
            await api.delete(`/animais/${animalId}`);
            toast.success("Animal removido!");
            fetchData();
        } catch(e) {
            toast.error("Erro ao remover.");
        }
    }
  };

  const handleEdit = (animal: Animal) => {
    setEditingAnimal(animal);
    setIsFormOpen(true);
  };

  const handleNewAnimal = () => {
    setEditingAnimal(null);
    setIsFormOpen(true);
  };

  if (!tutor) return <Layout><div>Carregando...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="gap-2 mb-6 -ml-2">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Button>
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">{tutor.nome.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-3">{tutor.nome}</h1>
                    <div className="space-y-2 text-muted-foreground">
                        <div className="flex items-center gap-2"><Mail className="w-4 h-4" />{tutor.email}</div>
                        <div className="flex items-center gap-2"><Phone className="w-4 h-4" />{tutor.telefone}</div>
                    </div>
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Animais ({animais.length})</h2>
            <Button onClick={handleNewAnimal} className="gap-2 shadow-lg"><Plus className="w-5 h-5" /> Novo Animal</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {animais.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
          </div>
        </div>

        <AnimalForm open={isFormOpen} onOpenChange={setIsFormOpen} onSave={handleSave} animal={editingAnimal} />
      </div>
    </Layout>
  );
};

export default TutorDetails;