import { Tutor, Animal } from "@/types";

export const mockTutores: Tutor[] = [
  {
    id: "1",
    nome: "Maria Silva",
    email: "maria.silva@email.com",
    telefone: "(11) 98765-4321",
  },
  {
    id: "2",
    nome: "João Santos",
    email: "joao.santos@email.com",
    telefone: "(21) 99876-5432",
  },
  {
    id: "3",
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    telefone: "(31) 97654-3210",
  },
];

export const mockAnimais: Animal[] = [
  {
    id: "1",
    tutorId: "1",
    nome: "Rex",
    especie: "Cachorro",
    raca: "Golden Retriever",
    idade: 3,
    fotoUrl: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400",
  },
  {
    id: "2",
    tutorId: "1",
    nome: "Mimi",
    especie: "Gato",
    raca: "Persa",
    idade: 2,
    fotoUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400",
  },
  {
    id: "3",
    tutorId: "2",
    nome: "Thor",
    especie: "Cachorro",
    raca: "Husky Siberiano",
    idade: 4,
    fotoUrl: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400",
  },
  {
    id: "4",
    tutorId: "3",
    nome: "Luna",
    especie: "Gato",
    raca: "Siamês",
    idade: 1,
    fotoUrl: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400",
  },
];
