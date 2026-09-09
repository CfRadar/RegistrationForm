"use client";

import React from 'react';
import Image from 'next/image';
import { TranslationSchema } from '@/lib/translations';

interface NssLogoLoaderProps {
  t?: TranslationSchema;
  message?: string;
}

export default function NssLogoLoader({ t, message }: NssLogoLoaderProps) {
  return (
    <div className="bg-[#e6edf5] rounded-3xl p-8 sm:p-14 text-center neu-card shadow-[16px_16px_36px_#c2cfd6,-16px_-16px_36px_#ffffff] border border-white/80 max-w-lg mx-auto flex flex-col items-center justify-center my-6">
      
      {/* GDGoC Stacked Dark Logo Container with Subtle Pulse */}
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-6 p-4 rounded-3xl bg-[#e6edf5] neu-card shadow-[8px_8px_16px_#c2cfd6,-8px_-8px_16px_#ffffff] animate-pulse">
        <Image
          src="/tech.png"
          alt="Tech Unleash 4.0"
          width={180}
          height={180}
          className="object-contain"
          priority
        />
      </div>

      {/* Title & Subtitle */}
      <h3 className="text-lg sm:text-xl font-black text-[#0B1B3D] tracking-wide mb-1">
        GDGoC IET DAVV
      </h3>
      <p className="text-xs sm:text-sm font-bold text-[#D90429] mb-4">
        {message || (t?.header?.orgTitle?.includes('GOOGLE DEVELOPER') ? 'Verifying registration status...' : 'पंजीकरण स्थिति की जाँच की जा रही है...')}
      </p>

      {/* Shimmering Loading Dots */}
      <div className="flex items-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC04] animate-bounce" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] animate-bounce [animation-delay:0.15s]" />
      </div>
    </div>
  );
}
