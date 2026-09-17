import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import LoaderIcon from "../components/loading/LoaderIcon";
import { Link } from "react-router";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  //register

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    employeeId: "",
    position: "",
  });
  const { signUp, isSignUP, login, isLoggingIn } = useAuthStore();

  const HandleSignUP = async (e) => {
    e.preventDefault();
    const response = await signUp(formData);
    setFormData({ fullName: "", email: "", password: "", position: "", employeeId: "" });

    if (response) setIsLogin(true);
  };

  //login

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handelLogin = (e) => {
    e.preventDefault();
    const response = login(loginData);
    setLoginData({ email: "", password: "" });
    // if (response) {
    //   return <Link to={"/chat"} />;
    // }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen overflow-hidden px-4 py-10"
      style={{ background: "#10151C", fontFamily: "'Inter', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&display=swap"
      />

      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-30"
        style={{ background: "#FF6B4A" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
        style={{ background: "#4E7C6C" }}
      />

      <div
        className="relative w-full max-w-[850px] min-h-[500px]  grid grid-cols-1 md:grid-cols-[1fr_1.1fr] rounded-3xl overflow-hidden"
        style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.55)" }}
      >
        {/* Left / brand panel */}
        <div
          className="hidden md:flex flex-col justify-between p-10"
          style={{
            background: "linear-gradient(160deg, #161D26 0%, #10151C 65%)",
          }}
        >
          <div className="flex items-center gap-2 ">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#FF6B4A" }}
            />
            <span
              className="text-sm tracking-wide"
              style={{ color: "#8B96A5" }}
            >
              Clear conversations. Less noise.
            </span>
          </div>

          <p
            className="text-4xl leading-[1.15]"
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              color: "#F4F1EC",
            }}
          >
            Stay connected.
            <br />
            Stay in the loop.
          </p>

          {/* chat bubble illustration */}
          <div>
            <div className="flex flex-col gap-7 max-w-[280px]">
              <div
                className="self-start rounded-2xl rounded-bl-sm px-4 py-2 text-sm"
                style={{ background: "#232C37", color: "#C7CFD9" }}
              >
                Can you share the latest update?
              </div>
              <div
                className="self-end rounded-2xl rounded-br-sm px-4 py-2 text-sm"
                style={{ background: "#FF6B4A", color: "#1A0F0B" }}
              >
                Sure. I’ll send it over.
              </div>
              <div
                className="self-start rounded-2xl rounded-bl-sm px-4 py-2 text-sm"
                style={{ background: "#232C37", color: "#C7CFD9" }}
              >
                Thanks, that helps.
              </div>
            </div>
          </div>

          <p className="text-xs" style={{ color: "#5C6673" }}>
            Less noise. More clarity.
          </p>
        </div>

        {/* Right / form panel */}
        <div
          className="flex flex-col p-8 sm:p-10"
          style={{ background: "#F4F1EC" }}
        >
          {/* tab switcher */}
          <div
            className="relative flex mb-5 rounded-full p-1 w-full max-w-[280px]"
            style={{ background: "#E6E1D6" }}
          >
            <span
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-transform duration-300 ease-out"
              style={{
                background: "#1A0F0B",
                transform: isLogin
                  ? "translateX(calc(100% + 8px))"
                  : "translateX(0)",
              }}
            />
            <label
              onClick={() => setIsLogin(isLogin ? false : true)}
              className="relative z-10 flex-1 text-center py-2 text-sm font-medium cursor-pointer transition-colors duration-300"
              style={{ color: isLogin ? "#6B5F4F" : "#F4F1EC" }}
            >
              Sign up
            </label>
            <label
              onClick={() => setIsLogin(isLogin ? false : true)}
              className="relative z-10 flex-1 text-center py-2 text-sm font-medium cursor-pointer transition-colors duration-300"
              style={{ color: isLogin ? "#F4F1EC" : "#6B5F4F" }}
            >
              Login
            </label>
          </div>

          {/* Signup */}
          <div className={isLogin ? "hidden" : "block"}>
            <h1
              className="text-3xl mb-1"
              style={{ fontFamily: "'Fraunces', serif", color: "#1A0F0B" }}
            >
              Create your account
            </h1>
            <p className="text-sm mb-5" style={{ color: "#8A8474" }}>
              Get started with clearer, more focused communication.
            </p>

            <form className="flex flex-col gap-4" onSubmit={HandleSignUP}>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                }}
                placeholder="Full name"
                required
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none border border-transparent focus:border-[#1A0F0B] transition-colors"
                style={{ background: "#FFFFFF", color: "#1A0F0B" }}
              />

              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
                placeholder="Email address"
                autoComplete="email"
                required
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none border border-transparent focus:border-[#1A0F0B] transition-colors"
                style={{ background: "#FFFFFF", color: "#1A0F0B" }}
              />

              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) => {
                  setFormData({ ...formData, employeeId: e.target.value });
                }}
                placeholder="Employee Id"
                required
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none border border-transparent focus:border-[#1A0F0B] transition-colors"
                style={{ background: "#FFFFFF", color: "#1A0F0B" }}
              />

              <input
                type="text"
                value={formData.position}
                onChange={(e) => {
                  setFormData({ ...formData, position: e.target.value });
                }}
                placeholder="Job Role"
                required
                autoComplete="job role"
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none border border-transparent focus:border-[#1A0F0B] transition-colors"
                style={{ background: "#FFFFFF", color: "#1A0F0B" }}
              />

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                autoComplete="current-password"
                required
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none border border-transparent focus:border-[#1A0F0B] transition-colors"
                style={{ background: "#FFFFFF", color: "#1A0F0B" }}
              />

              <button
                type="submit"
                disabled={isSignUP}
                className="w-full h-12 mt-2 justify-center rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-70 cursor-pointer"
                style={{ background: "#1A0F0B", color: "#F4F1EC" }}
              >
                {isSignUP ? (
                  <div className="flex justify-center">
                    <LoaderIcon className={" text-center w-full "} />
                  </div>
                ) : (
                  "Create account"
                )}
              </button>
            </form>
          </div>

          {/* Login */}
          <div className={isLogin ? "block" : "hidden"}>
            <h1
              className="text-3xl mb-1"
              style={{ fontFamily: "'Fraunces', serif", color: "#1A0F0B" }}
            >
              Welcome back
            </h1>
            <p className="text-sm mb-7" style={{ color: "#8A8474" }}>
              Good to see you again.
            </p>

            <form className="flex flex-col gap-4" onSubmit={handelLogin}>
              <input
                type="email"
                placeholder="Email address"
                value={loginData.email}
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value });
                }}
                required
                autoComplete="email"
                className="w-full rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-[#1A0F0B] transition-colors"
                style={{ background: "#FFFFFF", color: "#1A0F0B" }}
              />

              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                }}
                autoComplete="current-password"
                required
                className="w-full rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-[#1A0F0B] transition-colors"
                style={{ background: "#FFFFFF", color: "#1A0F0B" }}
              />

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full h-12 mt-2 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-70 cursor-pointer"
                style={{ background: "#FF6B4A", color: "#1A0F0B" }}
              >
                {isLoggingIn ? (
                  <LoaderIcon className={"text-center w-full"} />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
