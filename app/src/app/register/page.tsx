"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "counselor" as "counselor" | "teacher",
    institution: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    setLoading(true);

    try {
      await signUp(
        formData.email,
        formData.password,
        formData.displayName,
        formData.role,
        formData.institution || undefined
      );
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes("email-already-in-use")) {
          setError("Bu e-posta adresi zaten kullanılıyor.");
        } else if (err.message.includes("weak-password")) {
          setError("Şifre çok zayıf.");
        } else {
          setError("Kayıt olurken bir hata oluştu.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
              <span className="text-white font-semibold text-sm">N</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">NIDA</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Kayıt Ol</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Input
                id="displayName"
                name="displayName"
                type="text"
                label="Ad Soyad"
                placeholder="Adınız Soyadınız"
                value={formData.displayName}
                onChange={handleChange}
                required
              />

              <Input
                id="email"
                name="email"
                type="email"
                label="E-posta"
                placeholder="ornek@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Select
                id="role"
                name="role"
                label="Rol"
                value={formData.role}
                onChange={handleChange}
                options={[
                  { value: "counselor", label: "Psikolojik Danışman" },
                  { value: "teacher", label: "Öğretmen" },
                ]}
              />

              <Input
                id="institution"
                name="institution"
                type="text"
                label="Kurum (Opsiyonel)"
                placeholder="Okul veya kurum adı"
                value={formData.institution}
                onChange={handleChange}
              />

              <Input
                id="password"
                name="password"
                type="password"
                label="Şifre"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Şifre Tekrar"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                className="w-full"
                isLoading={loading}
                disabled={loading}
              >
                Kayıt Ol
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Zaten hesabınız var mı?{" "}
              <Link
                href="/login"
                className="text-gray-900 hover:underline font-medium"
              >
                Giriş Yapın
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-xs text-gray-500">
          Kayıt olarak{" "}
          <Link href="/terms" className="underline">
            Kullanım Koşulları
          </Link>{" "}
          ve{" "}
          <Link href="/privacy" className="underline">
            Gizlilik Politikası
          </Link>
          &apos;nı kabul etmiş olursunuz.
        </p>
      </div>
    </div>
  );
}
