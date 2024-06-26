"use client";

import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useAdminProfile } from "@/hooks/zustand/useAdminProfile";
import { NextUIProvider } from "@nextui-org/react";
import { ConfigProvider } from "antd";
import id_ID from "antd/lib/locale/id_ID";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  const {
    isLoading,
    isError,
    setError,
    isSuccess,
    setIsSuccess,
    isMessage,
    setPermissions,
  } = useLayout();

  const router = useRouter();
  const path = usePathname();

  const token = getCookie("_token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const { setAdminProfile } = useAdminProfile();

  const getMe = async () => {
    try {
      const res = await api.get(`/auth/admin/me`);
      setPermissions(res.data.data.role.permissions);
      setAdminProfile({
        name: res.data.data.name,
      });
      if (path === "/") {
        router.push("/user");
      }
    } catch (error) {
      deleteCookie("_token");
      router.push("/");
    }
  };

  useEffect(() => {
    if (isSuccess && isMessage) {
      toast.success(isMessage);
      setIsSuccess(false, "");
    }
    if (isError && isMessage) {
      toast.error(isMessage);
      setError(false, "");
    }
    getMe();
  }, [isSuccess, isError, isLoading]);
  return (
    <NextUIProvider>
      <NextTopLoader
        color="#7FC7D9"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        zIndex={100000}
        showSpinner={true}
        easing="ease"
      />
      <Toaster />
      <ConfigProvider locale={id_ID}>{children}</ConfigProvider>
    </NextUIProvider>
  );
}
