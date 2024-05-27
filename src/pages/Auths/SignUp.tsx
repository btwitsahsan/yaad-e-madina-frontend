import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CreateAdmin } from "../../network/api"; // Update this to your actual sign-up API function
// import { encryptCookie } from "../../utils/cookie";

const SignUp: React.FC = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  // const navigate = useNavigate();

  // const handleSignUp = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     setErrorMessage("Passwords do not match");
  //     return;
  //   }

  //   try {
  //     const resp = await CreateAdmin({ name, email, password });

  //     if (resp.success) {
  //       const { token } = resp;
  //       encryptCookie("token", token);
  //       navigate("/");
  //     }else{
  //       console.log(resp)
  //     }
  //   } catch (error) {
  //     setErrorMessage("Failed to sign up. Please try again.");
  //     console.log("Sign-up error:", error);
  //   }
  // };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-800">
      {/* <div className="w-full max-w-md bg-slate-700 rounded-lg p-8">
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">SIGN UP</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded bg-gray-600 text-white"
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 rounded bg-gray-600 text-white"
            required
          />
          <button type="submit" className="bg-red-600 text-white rounded p-2 font-semibold">
            Sign Up
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default SignUp;
