import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LockIcon, MailIcon } from "lucide-react";
import { ILogin } from "@/utils/types";
import { loginService } from "@/services/auth-services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [credentials, setCredentials] = useState<ILogin>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginService(credentials);

      if (response.status === 200) {
        toast.success("Inicio de sesión exitoso");
        localStorage.setItem("jwt", response.json.data.access)
        navigate("/chat")
        return;
      }

      throw new Error(response.json.error);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="tu@ejemplo.com"
                  className="pl-10"
                  value={credentials.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  name="password"
                  className="pl-10"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm">
                Recordarme
              </Label>
            </div>
            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="link" className="px-0 text-sm">
            ¿Olvidaste tu contraseña?
          </Button>
          <Button variant="link" className="px-0 text-sm">
            Crear cuenta
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
