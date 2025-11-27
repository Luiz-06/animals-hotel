export interface Tutor {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

export interface Animal {
  id: string;
  tutorId: string;
  nome: string;
  especie: "Gato" | "Cachorro";
  raca: string;
  idade: number;
  fotoUrl?: string;
}
