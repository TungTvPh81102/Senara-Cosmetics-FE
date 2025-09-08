"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthService } from "@/services/auth.service.hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Shield, ArrowLeft, RefreshCw } from "lucide-react";

export default function Page() {
  const { login, verifyOTP, isLoading, error } = useAuthService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login({ email, password });

    if (result?.requiresOTP) {
      setShowOtpModal(true);
      setCountdown(60);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").replace(/\D/g, "");
    const newOtp = [...otp];

    for (let i = 0; i < Math.min(pastedText.length, 6); i++) {
      newOtp[i] = pastedText[i];
    }

    setOtp(newOtp);
    setOtpError("");

    const nextEmptyIndex = newOtp.findIndex((digit) => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : Math.min(nextEmptyIndex, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const submitOtp = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setOtpError("Vui lòng nhập đầy đủ mã OTP");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      const result = await verifyOTP({ email, otp: otpCode });
      if (result?.success) {
        window.location.href = "/system-console";
      } else {
        setOtpError("Mã OTP không chính xác. Vui lòng thử lại.");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setOtpError("Có lỗi xảy ra. Vui lòng thử lại.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setOtpLoading(false);
    }
  };

  const resendOtp = async () => {
    if (countdown > 0) return;

    setResendLoading(true);
    try {
      await login({ email, password });
      setCountdown(60);
      setOtpError("");
      setOtp(["", "", "", "", "", ""]);
    } catch (error) {
      setOtpError("Không thể gửi lại mã OTP. Vui lòng thử lại.");
    } finally {
      setResendLoading(false);
    }
  };

  const closeOtpModal = () => {
    setShowOtpModal(false);
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    setCountdown(0);
  };

  return (
    <>
      <div className="min-h-[100svh] grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex relative overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60" />
          <div className="relative z-10 flex w-full items-end p-8">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Chào mừng trở lại</h2>
              <p className="text-muted-foreground mt-2 max-w-sm">
                Đăng nhập để quản trị hệ thống, quản lý sản phẩm, đơn hàng và nhiều hơn nữa.
              </p>
            </div>
          </div>
          <Image
            src="/globe.svg"
            alt="Background"
            width={1200}
            height={1200}
            className="absolute -right-40 -top-40 opacity-30 dark:opacity-20 select-none pointer-events-none"
            priority
          />
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-2">
              <div className="flex justify-center">
                <Image
                  src="/logo-system.png"
                  alt="Logo"
                  width={200}
                  height={100}
                  className="transform scale-125"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">Senara Cosmetics System Console</span>
                <ThemeSwitch />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">Đăng nhập</h1>
              <p className="text-sm text-muted-foreground">
                Sử dụng tài khoản quản trị của bạn để tiếp tục.
              </p>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Mật khẩu
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error ? (
                <div className="text-sm text-destructive" role="alert">
                  Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.
                </div>
              ) : null}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </form>

            <div className="mt-6">
              <Separator />
            </div>

            <div className="mt-6 flex items-center justify-between text-sm">
              <Link href="#" className="text-primary hover:underline">
                Quên mật khẩu?
              </Link>
              <span className="text-muted-foreground">Liên hệ quản trị viên để được cấp quyền</span>
            </div>

            <p className="mt-10 text-xs text-muted-foreground">
              Bằng việc đăng nhập, bạn đồng ý với các điều khoản sử dụng và chính sách bảo mật.
            </p>
          </div>
        </div>
      </div>

      <Dialog open={showOtpModal} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-xl font-semibold">Xác thực bảo mật</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Chúng tôi đã gửi mã xác thực 6 số đến email của bạn
              <br />
              <span className="font-medium text-foreground">{email}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  onPaste={index === 0 ? handleOtpPaste : undefined}
                  className="h-12 w-12 text-center text-lg font-semibold"
                  disabled={otpLoading}
                />
              ))}
            </div>

            {otpError && (
              <div className="text-sm text-destructive text-center" role="alert">
                {otpError}
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={submitOtp}
                className="w-full h-11"
                disabled={otpLoading || otp.some((digit) => !digit)}
              >
                {otpLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Đang xác thực...
                  </>
                ) : (
                  "Xác thực"
                )}
              </Button>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeOtpModal}
                  disabled={otpLoading}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Quay lại
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resendOtp}
                  disabled={countdown > 0 || resendLoading || otpLoading}
                  className="text-primary hover:text-primary/80"
                >
                  {resendLoading ? (
                    <>
                      <RefreshCw className="mr-1 h-4 w-4 animate-spin" />
                      Đang gửi...
                    </>
                  ) : countdown > 0 ? (
                    `Gửi lại (${countdown}s)`
                  ) : (
                    "Gửi lại mã"
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Không nhận được mã? Kiểm tra thư mục spam hoặc liên hệ quản trị viên
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
