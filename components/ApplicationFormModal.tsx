"use client";

import React from 'react';
import Image from 'next/image';

export interface ApplicationFormData {
  enrollmentNo: string;
  name: string;
  branch: string;
  section?: string;
  year?: string;
  contactNo: string;
  gender: string;
  email: string;
  linkedinId: string;
  githubId?: string;
  instagramId?: string;
  interests: string;
}

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ApplicationFormData;
}

export default function ApplicationFormModal({ isOpen, onClose, data }: ApplicationFormModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedPhone = data.contactNo
    ? data.contactNo.startsWith('+91')
      ? data.contactNo
      : `+91 ${data.contactNo}`
    : 'N/A';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-black/70 backdrop-blur-sm print-modal-backdrop">
      
      {/* Embedded Print CSS Rules */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0 !important;
        }
        @media print {
          /* Hide non-printable website elements */
          header, footer, main, .no-print {
            display: none !important;
          }
          
          /* Prepare page container */
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Convert modal overlay into static container for print */
          .print-modal-backdrop {
            position: static !important;
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            display: block !important;
            width: 100% !important;
            height: auto !important;
          }

          .print-modal-container {
            position: static !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            background: #ffffff !important;
          }

          #application-form-print-area {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            min-height: 277mm !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 10mm 15mm !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
            color: #000000 !important;
          }
        }
      `}</style>

      {/* Container Card */}
      <div className="relative bg-white text-black w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto print-modal-container">
        
        {/* Top Control Bar (Hidden during print) */}
        <div className="no-print bg-[#0B1B3D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-8 rounded-full bg-[#D90429] flex items-center justify-center font-bold text-xs px-2">
              GDGoC
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">GDGoC Tech Unleash 4.0 Registration Form</h3>
              <p className="text-xs text-white/70">टेक अनलीश 4.0 (GDGoC IET DAVV) पंजीकरण विवरण</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#D90429] hover:bg-[#b00320] text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Download PDF / Print</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer text-sm font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Form Content */}
        <div id="application-form-print-area" className="p-6 sm:p-10 font-sans text-black bg-white flex flex-col justify-between min-h-[650px]">
          
          <div>
            {/* Form Header */}
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6">
              {/* Left GDGoC Emblem */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/Copy of GDG On Campus - Stacked - Dark.png"
                  alt="GDGoC Emblem"
                  width={72}
                  height={72}
                  className="object-contain w-14 h-14 sm:w-18 sm:h-18"
                />
              </div>

              {/* Center Heading */}
              <div className="text-center flex-1 px-2">
                <h1 className="text-lg sm:text-xl font-black text-black mb-0.5 tracking-wide">
                  GOOGLE DEVELOPER GROUPS ON CAMPUS (GDGoC)
                </h1>
                <h2 className="text-sm sm:text-base font-bold text-black mb-0.5">
                  Institute of Engineering & Technology, DAVV Indore
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-[#D90429]">
                  Tech Unleash 4.0 Registration Application (Session 2026-27)
                </p>
              </div>

              {/* Right DAVV Emblem */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/davv_logo.png"
                  alt="DAVV Emblem"
                  width={72}
                  height={72}
                  className="object-contain w-14 h-14 sm:w-18 sm:h-18"
                />
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="space-y-4 text-xs sm:text-sm font-medium leading-relaxed">
              
              {/* 1. Enrollment Number */}
              <div className="flex items-baseline border-b border-gray-300 pb-1.5">
                <span className="font-bold min-w-[180px] text-black">1. Enrollment Number:</span>
                <span className="flex-1 font-semibold text-black uppercase tracking-wider">
                  {data.enrollmentNo || 'N/A'}
                </span>
              </div>

              {/* 2. Full Name */}
              <div className="flex items-baseline border-b border-gray-300 pb-1.5">
                <span className="font-bold min-w-[180px] text-black">2. Full Name:</span>
                <span className="flex-1 font-semibold text-black uppercase tracking-wider">
                  {data.name || 'N/A'}
                </span>
              </div>

              {/* 3. Branch */}
              <div className="flex items-baseline border-b border-gray-300 pb-1.5">
                <span className="font-bold min-w-[180px] text-black">3. Branch:</span>
                <span className="flex-1 font-semibold text-black">
                  {data.branch || 'N/A'}
                </span>
              </div>

              {/* 4. Section */}
              <div className="flex items-baseline border-b border-gray-300 pb-1.5">
                <span className="font-bold min-w-[180px] text-black">4. Section:</span>
                <span className="flex-1 font-semibold text-black uppercase">
                  {data.section ? `Section ${data.section}` : 'N/A'}
                </span>
              </div>

              {/* 5. Year of Study */}
              <div className="flex items-baseline border-b border-gray-300 pb-1.5">
                <span className="font-bold min-w-[180px] text-black">5. Year of Study:</span>
                <span className="flex-1 font-semibold text-black">
                  {data.year || 'N/A'}
                </span>
              </div>

              {/* 6. Contact Number */}
              <div className="flex items-baseline border-b border-gray-300 pb-1.5">
                <span className="font-bold min-w-[180px] text-black">6. Contact Number:</span>
                <span className="flex-1 font-semibold text-black">
                  {formattedPhone}
                </span>
              </div>

              {/* 7. Gender */}
              <div className="flex items-baseline border-b border-gray-300 pb-1.5">
                <span className="font-bold min-w-[180px] text-black">7. Gender:</span>
                <span className="flex-1 font-semibold text-black">
                  {data.gender || 'N/A'}
                </span>
              </div>

              {/* 8. Email ID */}
              <div className="flex items-baseline border-b border-gray-300 pb-1.5">
                <span className="font-bold min-w-[180px] text-black">8. Email ID:</span>
                <span className="flex-1 font-semibold text-black">
                  {data.email || 'N/A'}
                </span>
              </div>

              {/* 9. LinkedIn ID */}
              <div className="flex items-baseline border-b border-gray-300 pb-1.5">
                <span className="font-bold min-w-[180px] text-black">9. LinkedIn ID / Profile:</span>
                <span className="flex-1 font-semibold text-blue-700 underline break-all">
                  {data.linkedinId || 'N/A'}
                </span>
              </div>

              {/* 10. GitHub ID */}
              <div className="flex items-baseline border-b border-gray-300 pb-1.5">
                <span className="font-bold min-w-[180px] text-black">10. GitHub ID (if any):</span>
                <span className="flex-1 font-semibold text-black break-all">
                  {data.githubId || 'N/A (Not Provided)'}
                </span>
              </div>

              {/* 11. Instagram ID */}
              <div className="flex items-baseline border-b border-gray-300 pb-1.5">
                <span className="font-bold min-w-[180px] text-black">11. Instagram ID (if any):</span>
                <span className="flex-1 font-semibold text-black break-all">
                  {data.instagramId || 'N/A (Not Provided)'}
                </span>
              </div>

              {/* 12. Interest & Skills */}
              <div className="flex items-baseline border-b border-gray-300 pb-1.5">
                <span className="font-bold min-w-[180px] text-black">12. Interest & Skills:</span>
                <span className="flex-1 font-semibold text-black">
                  {data.interests || 'N/A'}
                </span>
              </div>

            </div>
          </div>

          {/* Bottom Signatures Section */}
          <div className="mt-12 pt-6 flex items-end justify-between text-xs sm:text-sm font-bold text-black border-t border-gray-400">
            <div className="text-center">
              <p className="mb-1">Applicant Signature</p>
              <div className="w-48 border-b border-black mb-1"></div>
              <p className="text-xs font-normal text-gray-700">{data.name}</p>
            </div>
            <div className="text-center">
              <p className="mb-1">Organizer / Lead Signature</p>
              <div className="w-48 border-b border-black mb-1"></div>
              <p className="text-xs font-normal text-gray-700">GDGoC IET DAVV</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
