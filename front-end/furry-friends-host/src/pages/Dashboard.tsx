import { useState, useEffect } from "react";
import { Tutor } from "@/types";
import Layout from "@/components/Layout";
import TutorCard from "@/components/TutorCard";
import TutorForm from "@/components/TutorForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Users, PawPrint } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";

const Dashboard = () => {
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [totalAnimais, setTotalAnimais] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);

  useEffect(() => {
    fetchDados();
  }, []);

  const fetchDados = async () => {
    try {
      const [resTutores, resAnimais] = await Promise.all([
        api.get('/tutores'),
        api.get('/animais')
      ]);
      setTutores(resTutores.data);
      setTotalAnimais(resAnimais.data.length);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar dados.");
    }
  };

  const handleSave = async (tutorData: Omit<Tutor, "id"> & { id?: string }) => {
    try {
      if (tutorData.id) {
        await api.put(`/tutores/${tutorData.id}`, tutorData);
        toast.success("Tutor atualizado!");
      } else {
        await api.post('/tutores', tutorData);
        toast.success("Tutor cadastrado!");
      }
      fetchDados();
      setEditingTutor(null);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir?")) {
        try {
            await api.delete(`/tutores/${id}`);
            toast.success("Tutor removido!");
            fetchDados();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao excluir.");
        }
    }
  };

  const filteredTutores = tutores.filter(t =>
    (t.nome || t.nome || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Tutores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tutores.length}</div>
              <p className="text-xs text-muted-foreground">Clientes cadastrados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hóspedes (Pets)</CardTitle>
              <PawPrint className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAnimais}</div>
              <p className="text-xs text-muted-foreground">Animais no sistema</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tutor por nome..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => { setEditingTutor(null); setIsFormOpen(true); }} className="w-full sm:w-auto gap-2 shadow-lg">
            <Plus className="w-5 h-5" /> Novo Tutor
          </Button>
        </div>

        {filteredTutores.length === 0 ? (
          <div className="text-center py-16 bg-muted/30 rounded-xl border-2 border-dashed">
            <p className="text-lg text-muted-foreground mb-4">
              {searchTerm ? "Nenhum tutor encontrado para essa busca." : "Nenhum tutor cadastrado."}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsFormOpen(true)} variant="outline" className="gap-2">
                <Plus className="w-5 h-5" /> Cadastrar Primeiro
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutores.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                onEdit={(t) => { setEditingTutor(t); setIsFormOpen(true); }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <TutorForm open={isFormOpen} onOpenChange={setIsFormOpen} onSave={handleSave} tutor={editingTutor} />
      </div>
    </Layout>
  );
};

export default Dashboard;
