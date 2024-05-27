import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AdminLogin } from "../../network/api";

const SignIn: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await AdminLogin({ email, password });

      if (resp.success) {
        onLogin(); // Update authentication state
        swal({
          title: "Login Successful",
          text: "You have successfully logged in!",
          icon: "success",
        });
        navigate("/");
      } else {
        swal({
          title: "Login Failed",
          text: "Invalid login attempt.",
          icon: "error",
        });
      }
    } catch (error) {
      swal({
        title: "Login Failed",
        text: "Invalid email or password.",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-800">
      <div className="w-full max-w-md bg-slate-700 rounded-lg p-8">
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">SIGN IN</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-gray-600 text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-gray-600 text-white"
            required
          />
          <button type="submit" className="bg-red-600 text-white rounded p-2 font-semibold">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
