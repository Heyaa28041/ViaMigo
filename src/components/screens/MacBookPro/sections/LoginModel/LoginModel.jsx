import React, { useState } from "react";

const LoginModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/login-bg.jpg')" }} // replace with your background image path
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto z-10 flex flex-col items-center">
        <img src="/logo.png" alt="Logo" className="w-16 h-16 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-center mb-2">Welcome back!</h2>
        <p className="text-gray-600 text-center mb-6">Sign in to continue your travel planning journey.</p>
        <form className="w-full space-y-4">
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <input type="email" placeholder="Enter your email" className="w-full border rounded-xl px-4 py-3 pr-12 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2" />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor"><path d="M2 5.5V15a1.5 1.5 0 001.5 1.5h13A1.5 1.5 0 0018 15V5.5L10 12 2 5.5z" /></svg>
              </span>
            </div>
          </div>
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">Password</label>
            <div className="relative flex items-center">
              <input type="password" placeholder="Enter your password" className="w-full border rounded-xl px-4 py-3 pr-12 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2" />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor"><circle cx="10" cy="10" r="6"></circle><line x1="10" y1="13" x2="10" y2="13.5"></line></svg>
              </span>
              {/* Add a show/hide password toggle if needed */}
            </div>
            <div className="w-full flex justify-end">
              <a href="#" className="text-xs text-blue-600 ml-1 hover:underline">Forgot password?</a>
            </div>
          </div>
          <button type="submit"
            className="w-full py-3 rounded-xl mt-2 font-bold text-white bg-gradient-to-r from-[#a341e4] to-[#3be6e6] text-lg tracking-wide"
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center my-6 w-full text-gray-500">
          <div className="flex-grow border-t"></div>
          <span className="px-4 text-xs">or continue with</span>
          <div className="flex-grow border-t"></div>
        </div>
        <div className="flex justify-between w-full gap-4 mb-2">
          <button className="flex-1 py-2 rounded-xl border border-gray-300 flex items-center justify-center gap-2 font-semibold bg-white">
            <img src="/google.svg" alt="Google" className="w-6 h-6" />
            Google
          </button>
          <button className="flex-1 py-2 rounded-xl border border-gray-300 flex items-center justify-center gap-2 font-semibold bg-white">
            <img src="/apple.svg" alt="Apple" className="w-6 h-6" />
            Apple
          </button>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl">&times;</button>
      </div>
    </div>
  );
};

export default LoginModal;
