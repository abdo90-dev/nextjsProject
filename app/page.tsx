"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { School } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/environment";
interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}
export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!credentials.username) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(credentials.username)) {
      newErrors.email = 'Adresse email invalide';
    }

    if (!credentials.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (credentials.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would validate credentials
    if (validateForm()) {
      try {
        // Use Firebase Authentication to sign in
        await signInWithEmailAndPassword(auth, credentials.username, credentials.password);
        router.push("/dashboard");// Call onLogin if needed for additional logic
      } catch (error) {
        setErrors({
          general: 'Email ou mot de passe incorrect'
        });
      }
    }
    if (credentials.username === "admin" && credentials.password === "admin") {
    
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <School className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            School Management System
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in to access your admin dashboard
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}