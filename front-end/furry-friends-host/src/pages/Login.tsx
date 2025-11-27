import api from '@/services/api'; // Se der erro no '@', use '../services/api'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext"; // Pode remover se não estiver usando o login do contexto
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PawPrint } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Opcional se você está fazendo manual
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // 1. Envia email e senha para o seu Back-end (server.js)
      const response = await api.post('/login', { 
        email: email,      
        password: password 
      });

      // 2. Se deu certo, pega o token
      const { token } = response.data;
      
      // 3. Guarda o token no navegador
      localStorage.setItem('token', token);
      
      // 4. Muda para a tela principal
      alert("Login realizado com sucesso!");
      navigate('/dashboard'); // Verifique se essa rota existe no seu App.tsx

    } catch (error) {
      console.error(error);
      alert("Erro! Verifique se a senha é 123456 e o backend está rodando.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/10 px-4">
      <Card className="w-full max-w-md shadow-2xl border-none">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center">
            <PawPrint className="w-10 h-10 text-primary" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">AnimalHotels</CardTitle>
            <CardDescription className="text-base mt-2">
              Gerencie hospedagens para pets com amor e carinho
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {/* CORREÇÃO 1: onSubmit chama handleLogin agora */}
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Campo de Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            {/* CORREÇÃO 2: Adicionado o Campo de Senha que faltava */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-medium">
              Entrar
            </Button>
            
            <p className="text-xs text-center text-muted-foreground pt-2">
              Para demonstração, use qualquer email e a senha <strong>123456</strong>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;