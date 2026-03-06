"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      router.push("/");
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white relative overflow-hidden">
      {/* Toast Notification */}
      <div
        className={`absolute top-10 left-1/2 -translate-x-1/2 min-w-[300px] text-sm text-red-600 bg-red-50 py-3 px-4 rounded-lg shadow-md text-center border border-red-200 transition-all duration-200 transform z-50 ${
          error
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        {error}
      </div>
      <div className="w-full max-w-[440px] flex flex-col pt-8">
        {/* Logo */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-3">
            <img src="/sungrow-logo.png" alt="Sungrow Logo" />
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col gap-[16px]"
        >
          {/* ID Input */}
          <div>
            <div className="relative">
              <input
                type="text"
                className="w-full h-[48px] px-4 border border-[#ddd] rounded-[8px] focus:outline-none focus:border-[#ef7800] placeholder-[#aaa] text-[16px] text-black"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-[48px] pl-4 pr-12 border border-[#ddd] rounded-[8px] focus:outline-none focus:border-[#ef7800] placeholder-[#aaa] text-[16px] text-black"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex justify-between items-center mt-[-4px] mb-[12px]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-[16px] h-[16px] rounded border-[#cbd5e1] text-[#ef7800] focus:ring-[#ef7800]"
              />
              <span className="text-[12px] text-[#475569]">
                로그인 상태 유지
              </span>
            </label>
            <a
              href="#"
              className="text-[12px] text-[#333] underline underline-offset-2"
            >
              아이디 · 비밀번호 찾기
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-[48px] bg-[#ef7800] hover:bg-[#d66b00] text-white font-bold text-[16px] rounded-[8px] transition duration-200 flex items-center justify-center cursor-pointer"
          >
            로그인
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center mt-10 mb-6 w-[440px]">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e2e8f0]"></div>
          </div>
          <div className="relative px-4 bg-white text-[12px] text-[#64748b] uppercase tracking-wider">
            Or continue with
          </div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="w-full h-[44px] border border-[#e2e8f0] rounded-[8px] flex items-center justify-center gap-3 hover:bg-gray-50 transition duration-200 cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-[20px] h-[20px]"
          />
          <span className="text-[#334155] text-[14px] font-semibold">
            Google
          </span>
        </button>

        {/* Sign up */}
        <div className="mt-14 text-center text-[14px] text-[#64748b]">
          계정이 없으신가요?{" "}
          <a
            href="#"
            className="text-[#333] font-bold underline underline-offset-2 hover:text-[#ef7800] transition ml-1"
          >
            회원가입 하기
          </a>
        </div>
      </div>
    </div>
  );
}
