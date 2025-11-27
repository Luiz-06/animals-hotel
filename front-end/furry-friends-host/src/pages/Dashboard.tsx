import { useState, useEffect } from "react";
import { Tutor } from "@/types";
import { mockTutores } from "@/lib/mock-data";
import Layout from "@/components/Layout";
import TutorCard from "@/components/TutorCard";
import TutorForm from "@/components/TutorForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("animalhotels_tutores");
    if (stored) {
      setTutores(JSON.parse(stored));
    } else {
      setTutores(mockTutores);
      localStorage.setItem("animalhotels_tutores", JSON.stringify(mockTutores));
    }
  }, []);

  const saveTutores = (newTutores: Tutor[]) => {
    setTutores(newTutores);
    localStorage.setItem("animalhotels_tutores", JSON.stringify(newTutores));
  };

  const handleSave = (tutorData: Omit<Tutor, "id"> & { id?: string }) => {
    if (tutorData.id) {
      const updated = tutores.map((t) =>
        t.id === tutorData.id ? { ...tutorData, id: tutorData.id } : t
      );
      saveTutores(updated);
      toast.success("Tutor atualizado com sucesso!");
    } else {
      const newTutor = {
        ...tutorData,
        id: Date.now().toString(),
      };
      saveTutores([...tutores, newTutor]);
      toast.success("Tutor cadastrado com sucesso!");
    }
    setEditingTutor(null);
  };

  const handleEdit = (tutor: Tutor) => {
    setEditingTutor(tutor);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    const filtered = tutores.filter((t) => t.id !== id);
    saveTutores(filtered);
    toast.success("Tutor removido com sucesso!");
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
              Nenhum tutor cadastrado ainda
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
