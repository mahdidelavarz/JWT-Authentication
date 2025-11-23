// // components/auth/OTPForm.tsx

// 'use client';

// import { useState } from 'react';
// import { useMutation } from '@tanstack/react-query';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { Icon } from '@iconify/react';

// interface OTPFormProps {
//   onSuccess: (phoneNumber: string) => void;
// }

// export default function OTPForm({ onSuccess }: OTPFormProps) {
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const sendOTPMutation = useMutation({
//     mutationFn: async (phone: string) => {
//       const response = await axios.post('/api/auth/send-otp', {
//         phone_number: phone,
//       });
//       return response.data;
//     },
//     onSuccess: () => {
//       toast.success('کد تایید ارسال شد');
//       onSuccess(phoneNumber);
//     },
//     onError: (error: any) => {
//       const message =
//         error.response?.data?.message || 'خطا در ارسال کد تایید';
//       toast.error(message);
//     },
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!/^09[0-9]{9}$/.test(phoneNumber)) {
//       toast.error('شماره تلفن نامعتبر است');
//       return;
//     }

//     sendOTPMutation.mutate(phoneNumber);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label
//           htmlFor="phone"
//           className="block text-sm font-medium text-gray-700 mb-2"
//         >
//           شماره موبایل
//         </label>
//         <div className="relative">
//           <input
//             id="phone"
//             type="tel"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             placeholder="09123456789"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             disabled={sendOTPMutation.isPending}
//             maxLength={11}
//           />
//           <Icon
//             icon="mdi:phone"
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             width={20}
//           />
//         </div>
//       </div>

//       <button
//         type="submit"
//         disabled={sendOTPMutation.isPending}
//         className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//       >
//         {sendOTPMutation.isPending ? (
//           <>
//             <Icon icon="mdi:loading" className="animate-spin" width={20} />
//             در حال ارسال...
//           </>
//         ) : (
//           <>
//             <Icon icon="mdi:send" width={20} />
//             ارسال کد تایید
//           </>
//         )}
//       </button>
//     </form>
//   );
// }

//! test version

// components/auth/OTPForm.tsx

"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

interface OTPFormProps {
  onSuccess: (phoneNumber: string) => void;
}

export default function OTPForm({ onSuccess }: OTPFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const sendOTPMutation = useMutation({
    mutationFn: async (phone: string) => {
      const response = await axios.post("/api/auth/send-otp", {
        phone_number: phone,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Show OTP code in toast for testing
      if (data.otpCode) {
        toast.success(`کد تایید: ${data.otpCode}`, {
          duration: 10000, // Show for 10 seconds
          icon: "🔑",
          style: {
            background: "#10b981",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
            padding: "16px",
          },
        });
      } else {
        toast.success("کد تایید ارسال شد");
      }
      onSuccess(phoneNumber);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "خطا در ارسال کد تایید";
      toast.error(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^09[0-9]{9}$/.test(phoneNumber)) {
      toast.error("شماره تلفن نامعتبر است");
      return;
    }

    sendOTPMutation.mutate(phoneNumber);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          شماره موبایل
        </label>
        <div className="relative">
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="09123456789"
            className="w-full px-4 py-3 border bg-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={sendOTPMutation.isPending}
            maxLength={11}
          />
          <Icon
            icon="mdi:phone"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            width={20}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={sendOTPMutation.isPending}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {sendOTPMutation.isPending ? (
          <>
            <Icon icon="mdi:loading" className="animate-spin" width={20} />
            در حال ارسال...
          </>
        ) : (
          <>
            <Icon icon="mdi:send" width={20} />
            ارسال کد تایید
          </>
        )}
      </button>
    </form>
  );
}
