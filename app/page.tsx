"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomSelect from '@/components/CustomSelect';
import ApplicationFormModal, { ApplicationFormData } from '@/components/ApplicationFormModal';
import { translations, Language } from '@/lib/translations';

export default function RegistrationPage() {
  const [lang, setLang] = useState<Language>('en');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'already_submitted'>('idle');
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [draftSaved, setDraftSaved] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<ApplicationFormData | null>(null);

  const [form, setForm] = useState({
    enrollmentNo: '',
    name: '',
    branch: '',
    section: '',
    year: '',
    contactNo: '',
    gender: '',
    email: '',
    linkedinId: '',
    githubId: '',
    instagramId: '',
    interests: '',
    otherInterest: '',
  });

  const t = translations[lang];
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved local draft & check if user previously submitted
  useEffect(() => {
    const localSubmitted = localStorage.getItem('gdgoc_submitted_form_data');
    if (localSubmitted) {
      try {
        const parsed = JSON.parse(localSubmitted);
        setSubmittedData(parsed);
        setStatus('already_submitted');
        return;
      } catch (e) {}
    }

    const localDraft = localStorage.getItem('gdgoc_draft_form');
    if (localDraft) {
      try {
        const parsed = JSON.parse(localDraft);
        setForm((prev) => ({ ...prev, ...parsed }));
      } catch (e) {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced local autosave
  useEffect(() => {
    if (status === 'success' || status === 'already_submitted') return;

    const hasData = Object.entries(form).some(([key, val]) => Boolean(val.trim()));
    if (!hasData) return;

    localStorage.setItem('gdgoc_draft_form', JSON.stringify(form));
    setDraftSaved(true);
  }, [form, status]);

  const checkSubmissionStatus = async (emailToCheck: string) => {
    if (!emailToCheck || !emailToCheck.includes('@')) return;
    setIsCheckingEmail(true);
    try {
      const res = await fetch(`/api/check-submission?email=${encodeURIComponent(emailToCheck)}`);
      const data = await res.json();

      if (data.submitted) {
        setStatus('already_submitted');
        if (data.submission) {
          setSubmittedData(data.submission);
        }
      }
    } catch (err) {
      console.error('Failed to check submission', err);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!form.year || !form.section) {
      setErrorMessage(t.status.errorRequired);
      return;
    }

    // Phone number digit validation
    const cleanPhone = form.contactNo.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMessage(t.status.errorPhonePrefix);
      return;
    }

    // Email validation
    if (!form.email.includes('@') || !form.email.includes('.')) {
      setErrorMessage(t.status.errorCollegeEmail);
      return;
    }

    const finalInterests = form.interests === 'Other'
      ? (form.otherInterest.trim() ? `Other: ${form.otherInterest.trim()}` : 'Other')
      : form.interests;

    const fullContactNo = `+91 ${cleanPhone}`;

    setStatus('submitting');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          googleEmail: form.email.trim(),
          enrollmentNo: form.enrollmentNo.trim(),
          name: form.name.trim(),
          branch: form.branch,
          section: form.section,
          year: form.year,
          contactNo: fullContactNo,
          gender: form.gender,
          email: form.email.trim(),
          linkedinId: form.linkedinId.trim(),
          githubId: form.githubId.trim(),
          instagramId: form.instagramId.trim(),
          interests: finalInterests,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const finalSubmissionData: ApplicationFormData = {
          enrollmentNo: form.enrollmentNo.trim(),
          name: form.name.trim(),
          branch: form.branch,
          section: form.section,
          year: form.year,
          contactNo: fullContactNo,
          gender: form.gender,
          email: form.email.trim(),
          linkedinId: form.linkedinId.trim(),
          githubId: form.githubId.trim(),
          instagramId: form.instagramId.trim(),
          interests: finalInterests,
        };
        setStatus('success');
        setSubmittedData(finalSubmissionData);
        localStorage.setItem('gdgoc_submitted_form_data', JSON.stringify(finalSubmissionData));
        localStorage.removeItem('gdgoc_draft_form');
      } else if (res.status === 409 || data.error === 'ALREADY_SUBMITTED') {
        setStatus('already_submitted');
      } else {
        setErrorMessage(data.error || t.status.errorGeneral);
        setStatus('idle');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(t.status.errorGeneral);
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e6edf5] text-[#0B1B3D] selection:bg-[#0B1B3D] selection:text-white">
      
      {/* Top Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        t={t}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:px-8 sm:py-10 flex flex-col justify-center">
        
        {/* Banner Section */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-full min-h-56 sm:min-h-72 flex items-center justify-center mb-5">
            <Image
              src="/tech.png"
              alt="Tech Unleash 4.0"
              width={180}
              height={180}
              className="object-contain w-82 h-82 sm:w-102 sm:h-102"
              priority
            />
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0B1B3D] tracking-tight uppercase leading-tight mb-2">
            {t.header.orgTitle}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
            <h2 className="text-base sm:text-2xl font-black text-[#D90429] tracking-wide">
              {t.header.orgSubtitle}
            </h2>
            <span className="bg-[#0B1B3D] text-[#FFB703] text-xs sm:text-sm px-3.5 py-1 rounded-full font-black uppercase tracking-wider shadow-md border border-[#FFB703]/30">
              {t.header.sessionTag}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] max-w-lg mx-auto font-medium">
            {t.header.formSubtitle}
          </p>
        </div>

        {status === 'success' ? (
          /* Status Screen: Success */
          /* Status Screen: Success */
          <div className="bg-[#e6edf5] rounded-3xl p-6 sm:p-12 text-center neu-card shadow-[16px_16px_36px_#c2cfd6,-16px_-16px_36px_#ffffff] border border-white/80">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 neu-knob">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] mb-3">
              {t.status.successTitle}
            </h3>
            <p className="text-sm sm:text-lg text-[#475569] max-w-lg mx-auto leading-relaxed mb-6 font-medium">
              {t.status.successMsg}
            </p>
            <button
              onClick={() => setIsFormModalOpen(true)}
              className="px-6 py-3.5 rounded-full bg-[#D90429] text-white text-xs uppercase tracking-widest font-black transition neu-btn-primary cursor-pointer shadow-lg hover:scale-105 mb-6 flex items-center justify-center space-x-2 mx-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{t.status.downloadFormBtn}</span>
            </button>
            <div className="p-4 rounded-2xl bg-[#e6edf5] neu-input text-xs font-bold text-[#0B1B3D] max-w-xs mx-auto">
               (Tech-Unleash 4.0 Registration form)
            </div>
          </div>
        ) : status === 'already_submitted' ? (
          /* Status Screen: Already Submitted */
          <div className="bg-[#e6edf5] rounded-3xl p-6 sm:p-12 text-center neu-card shadow-[16px_16px_36px_#c2cfd6,-16px_-16px_36px_#ffffff] border border-white/80">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 neu-knob">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] mb-3">
              {t.status.alreadySubmittedTitle}
            </h3>
            <p className="text-sm sm:text-base text-[#475569] max-w-lg mx-auto leading-relaxed mb-8 font-medium">
              {t.status.alreadySubmittedMsg}
            </p>
            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsFormModalOpen(true)}
                className="px-6 py-3.5 rounded-full bg-[#D90429] text-white text-xs uppercase tracking-widest font-black transition neu-btn-primary cursor-pointer shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{t.status.downloadFormBtn}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Main Neumorphic Registration Form Card */
          <div className="bg-[#e6edf5] p-6 sm:p-10 rounded-3xl neu-card shadow-[18px_18px_40px_#beccd9,-18px_-18px_40px_#ffffff] border border-white/80 relative">
            
            {draftSaved && (
              <div className="mb-6 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Draft auto-saved locally</span>
                </div>
              </div>
            )}

            {/* General Error Message Alert */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-[#D90429]/10 border border-[#D90429]/30 text-[#D90429] text-xs sm:text-sm font-bold flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Enrollment Number */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.enrollmentNoLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={form.enrollmentNo}
                    onChange={(e) => setForm({ ...form, enrollmentNo: e.target.value })}
                    placeholder={t.form.enrollmentNoPlaceholder}
                    className="w-full p-4 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium uppercase"
                  />
                </div>

                {/* 2. Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.nameLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.form.namePlaceholder}
                    className="w-full p-4 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium"
                  />
                </div>

                {/* 3. Branch Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.branchLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <CustomSelect
                    required
                    value={form.branch}
                    onChange={(val) => setForm({ ...form, branch: val })}
                    options={t.options.branches}
                    placeholder={t.form.branchPlaceholder}
                  />
                </div>

                {/* 4. Section Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.sectionLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <CustomSelect
                    required
                    value={form.section}
                    onChange={(val) => setForm({ ...form, section: val })}
                    options={t.options.sections}
                    placeholder={t.form.sectionPlaceholder}
                  />
                </div>

                {/* 5. Year of Study Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.yearLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <CustomSelect
                    required
                    value={form.year}
                    onChange={(val) => setForm({ ...form, year: val })}
                    options={t.options.years}
                    placeholder={t.form.yearPlaceholder}
                  />
                </div>

                {/* 4. Contact Number (+91 visual prefix) */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.contactLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <div className="flex items-center rounded-2xl bg-[#e6edf5] neu-input overflow-hidden">
                    <span className="px-4 py-4 text-sm font-black text-[#0B1B3D] border-r border-[#c2cfd6]/50 bg-[#c2cfd6]/20 select-none">
                      +91
                    </span>
                    <input
                      required
                      type="tel"
                      maxLength={10}
                      value={form.contactNo}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, '');
                        setForm({ ...form, contactNo: digitsOnly });
                      }}
                      placeholder={t.form.contactPlaceholder}
                      className="w-full p-4 bg-transparent text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium"
                    />
                  </div>
                  <p className="text-[11px] text-[#475569] font-medium ml-1">{t.form.contactNote}</p>
                </div>

                {/* 5. Gender Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.genderLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <CustomSelect
                    required
                    value={form.gender}
                    onChange={(val) => setForm({ ...form, gender: val })}
                    options={t.options.genders}
                    placeholder={t.form.genderPlaceholder}
                  />
                </div>

                {/* 6. College Email ID */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                      {t.form.emailLabel} <span className="text-[#D90429]">*</span>
                    </label>
                    {isCheckingEmail && (
                      <span className="text-[11px] font-bold text-blue-600 flex items-center space-x-1.5 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                        <span>Verifying...</span>
                      </span>
                    )}
                  </div>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onBlur={(e) => checkSubmissionStatus(e.target.value)}
                    placeholder={t.form.emailPlaceholder}
                    className="w-full p-4 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium"
                  />
                  <p className="text-[11px] text-[#475569] font-medium ml-1">{t.form.emailNote}</p>
                </div>

                {/* 7. LinkedIn ID */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.linkedinLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={form.linkedinId}
                    onChange={(e) => setForm({ ...form, linkedinId: e.target.value })}
                    placeholder={t.form.linkedinPlaceholder}
                    className="w-full p-4 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium"
                  />
                </div>

                {/* 8. GitHub ID (if any) */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.githubLabel}
                  </label>
                  <input
                    type="text"
                    value={form.githubId}
                    onChange={(e) => setForm({ ...form, githubId: e.target.value })}
                    placeholder={t.form.githubPlaceholder}
                    className="w-full p-4 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium"
                  />
                </div>

                {/* 9. Instagram ID (if any) */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.instagramLabel}
                  </label>
                  <input
                    type="text"
                    value={form.instagramId}
                    onChange={(e) => setForm({ ...form, instagramId: e.target.value })}
                    placeholder={t.form.instagramPlaceholder}
                    className="w-full p-4 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium"
                  />
                </div>

                {/* 10. Interest & Skills Dropdown */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.interestsLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <CustomSelect
                    required
                    value={form.interests}
                    onChange={(val) => setForm({ ...form, interests: val })}
                    options={t.options.interests}
                    placeholder={t.form.interestsPlaceholder}
                  />
                  {form.interests === 'Other' && (
                    <input
                      type="text"
                      value={form.otherInterest}
                      onChange={(e) => setForm({ ...form, otherInterest: e.target.value })}
                      placeholder={t.form.otherInterestPlaceholder}
                      className="w-full mt-2 p-4 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium"
                    />
                  )}
                </div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-5 text-white font-black text-base sm:text-lg uppercase tracking-widest rounded-full neu-btn-primary cursor-pointer mt-4 flex items-center justify-center space-x-2"
              >
                {status === 'submitting' ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.form.submittingButton}</span>
                  </div>
                ) : (
                  <span>{t.form.submitButton}</span>
                )}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer t={t} />

      {/* Printable Modal */}
      {submittedData && (
        <ApplicationFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          data={submittedData}
        />
      )}
    </div>
  );
}
