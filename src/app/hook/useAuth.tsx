"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("usuarioLogado");
    if (!userData) {
      
      router.push("/");
    }
  }, []);
};
