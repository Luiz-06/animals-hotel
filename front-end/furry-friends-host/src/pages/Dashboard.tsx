import { useState, useEffect } from "react";
import { Tutor } from "@/types";
import Layout from "@/components/Layout";
import TutorCard from "@/components/TutorCard";
import TutorForm from "@/components/TutorForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api"; 

const Dashboard = () => {
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);

  useEffect(() => {
    fetchTutores();
  }, []);

  const fetchTutores = async () => {
    try {
      const response = await api.get('/tutores');
      setTutores(response.data);
    } catch (error) {
      console.error("Erro ao buscar tutores:", error);
      toast.error("Erro ao carregar lista de tutores.");
    }
  };

  const handleSave = async (tutorData: Omit<Tutor, "id"> & { id?: string }) => {
    try {
      if (tutorData.id) {
        // EDITAR (PUT)
        await api.put(`/tutores/${tutorData.id}`, tutorData);
        toast.success("Tutor atualizado com sucesso!");
      } else {
        await api.post('/tutores', tutorData);
        toast.success("Tutor cadastrado com sucesso!");
      }
      fetchTutores(); 
      setEditingTutor(null);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar tutor.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este tutor?")) {
        try {
            await api.delete(`/tutores/${id}`);
            toast.success("Tutor removido com sucesso!");
            fetchTutores(); 
        } catch (error) {
            console.error("Erro ao deletar:", error);
            toast.error("Erro ao excluir tutor.");
        }
    }
  };

  const handleEdit = (tutor: Tutor) => {
    setEditingTutor(tutor);
    setIsFormOpen(true);
  };

  const handleNewTutor = () => {
    setEditingTutor(null);
    setIsFormOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tutores</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie os tutores e seus pets
            </p>
          </div>
          <Button onClick={handleNewTutor} className="gap-2 shadow-lg">
            <Plus className="w-5 h-5" />
            Novo Tutor
          </Button>
        </div>

        {tutores.length === 0 ? (
          <div className="text-center py-16 bg-muted/30 rounded-xl border-2 border-dashed">
            <p className="text-lg text-muted-foreground mb-4">
              Nenhum tutor encontrado.
            </p>
            <Button onClick={handleNewTutor} variant="outline" className="gap-2">
              <Plus className="w-5 h-5" />
              Cadastrar Primeiro Tutor
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutores.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <TutorForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSave={handleSave}
          tutor={editingTutor}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;