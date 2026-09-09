export type Language = 'en' | 'hi';

export interface TranslationSchema {
  header: {
    orgTitle: string;
    orgSubtitle: string;
    sessionTag: string;
    formTitle: string;
    formSubtitle: string;
    switchLang: string;
  };
  form: {
    enrollmentNoLabel: string;
    enrollmentNoPlaceholder: string;
    nameLabel: string;
    namePlaceholder: string;
    branchLabel: string;
    branchPlaceholder: string;
    sectionLabel: string;
    sectionPlaceholder: string;
    yearLabel: string;
    yearPlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    contactNote: string;
    genderLabel: string;
    genderPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailNote: string;
    linkedinLabel: string;
    linkedinPlaceholder: string;
    githubLabel: string;
    githubPlaceholder: string;
    instagramLabel: string;
    instagramPlaceholder: string;
    interestsLabel: string;
    interestsPlaceholder: string;
    otherInterestLabel: string;
    otherInterestPlaceholder: string;
    submitButton: string;
    submittingButton: string;
    requiredField: string;
  };
  options: {
    branches: { value: string; label: string }[];
    sections: { value: string; label: string }[];
    years: { value: string; label: string }[];
    genders: { value: string; label: string }[];
    interests: { value: string; label: string }[];
  };
  status: {
    alreadySubmittedTitle: string;
    alreadySubmittedMsg: string;
    successTitle: string;
    successMsg: string;
    errorCollegeEmail: string;
    errorPhonePrefix: string;
    errorRequired: string;
    errorGeneral: string;
    downloadFormBtn: string;
    viewFormBtn: string;
  };
  footer: {
    copyright: string;
    contactPrefix: string;
    adminEmail: string;
    credits: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    header: {
      orgTitle: 'Tech Unleash 4.0 Registration Form',
      orgSubtitle: 'IET DAVV, Indore',
      sessionTag: 'Session 2026-27',
      formTitle: 'Tech Unleash 4.0 Registration Form',
      formSubtitle: 'Join us at Tech Unleash 4.0 by GDGoC IET DAVV to innovate, build, and excel!',
      switchLang: 'हिंदी',
    },
    form: {
      enrollmentNoLabel: 'Enrollment Number',
      enrollmentNoPlaceholder: 'e.g. DE24101',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      branchLabel: 'Branch',
      branchPlaceholder: 'Select your branch',
      sectionLabel: 'Section',
      sectionPlaceholder: 'Select section (A / B)',
      yearLabel: 'Year of Study',
      yearPlaceholder: 'Select your year',
      contactLabel: 'Contact Number (with +91)',
      contactPlaceholder: '9876543210',
      contactNote: 'Format: Must start with +91 followed by 10 digits',
      genderLabel: 'Gender',
      genderPlaceholder: 'Select gender',
      emailLabel: 'Email ID (College Email Preferred)',
      emailPlaceholder: 'yourname@ietdavv.edu.in or personal email',
      emailNote: 'Enter your email address (Official college email ID preferred)',
      linkedinLabel: 'LinkedIn ID / Profile URL',
      linkedinPlaceholder: 'https://linkedin.com/in/username',
      githubLabel: 'GitHub ID / Profile URL (if any)',
      githubPlaceholder: 'https://github.com/username (Optional)',
      instagramLabel: 'Instagram ID / Handle (if any)',
      instagramPlaceholder: '@username or profile link (Optional)',
      interestsLabel: 'Interest & Skills',
      interestsPlaceholder: 'Select your primary interest/skill',
      otherInterestLabel: 'Specify Other Skill / Interest',
      otherInterestPlaceholder: 'Enter your skill or interest...',
      submitButton: 'Submit Tech Unleash 4.0 Registration Form',
      submittingButton: 'Recording Response...',
      requiredField: 'This field is required',
    },
    options: {
      branches: [
        { value: 'CS', label: 'Computer Science (CS)' },
        { value: 'IT', label: 'Information Technology (IT)' },
        { value: 'ETC', label: 'Electronics & Telecommunication (ETC)' },
        { value: 'EI', label: 'Electrical & Instrumentation (EI)' },
        { value: 'EEE', label: 'Electrical & Electronics (EEE)' },
        { value: 'Mech', label: 'Mechanical (Mech)' },
        { value: 'Civil', label: 'Civil' },
        { value: 'CSBS', label: 'Computer Science & Business System (CSBS)' },
        { value: 'IP', label: 'Industrial & Production (IP)' },
        { value: 'B.Design', label: 'Bachelor of Design (B.Design)' },
        { value: 'Other', label: 'Other' },
      ],
      sections: [
        { value: 'A', label: 'Section A' },
        { value: 'B', label: 'Section B' },
      ],
      years: [
        { value: '1st Year', label: '1st Year (First Year)' },
        { value: '2nd Year', label: '2nd Year (Second Year)' },
        { value: '3rd Year', label: '3rd Year (Third Year)' },
        { value: '4th Year', label: '4th Year (Fourth Year)' },
      ],
      genders: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
      ],
      interests: [
        { value: 'Web Development', label: 'Web Development' },
        { value: 'Android & Mobile Dev', label: 'Android & Mobile Dev' },
        { value: 'AI / Machine Learning', label: 'AI / Machine Learning' },
        { value: 'Cloud & DevOps', label: 'Cloud & DevOps' },
        { value: 'UI/UX & Design', label: 'UI/UX & Design' },
        { value: 'Competitive Programming', label: 'Competitive Programming' },
        { value: 'Cybersecurity', label: 'Cybersecurity' },
        { value: 'Management & Event Ops', label: 'Management & Event Ops' },
        { value: 'Content & Social Media', label: 'Content & Social Media' },
        { value: 'Other', label: 'Other' },
      ],
    },
    status: {
      alreadySubmittedTitle: 'Response Recorded',
      alreadySubmittedMsg: 'Your response has been recorded. Thank you! You have already submitted a form with this email address.',
      successTitle: 'Thank You!',
      successMsg: "Your response has been recorded thank you! You'll get information soon.",
      errorCollegeEmail: 'Please enter a valid email address.',
      errorPhonePrefix: 'Contact number must be a 10-digit number with +91 prefix.',
      errorRequired: 'Please fill in all mandatory fields correctly.',
      errorGeneral: 'An error occurred while submitting your registration. Please try again.',
      downloadFormBtn: 'Download / Print Application Form',
      viewFormBtn: 'View Application Form',
    },
    footer: {
      copyright: 'All rights reserved to GDGoC IET DAVV.',
      contactPrefix: 'If you have any query, contact us at',
      adminEmail: 'gdgoc@ietdavv.edu.in',
      credits: 'Original Creator: Utkarsh Mandloi',
    },
  },
  hi: {
    header: {
      orgTitle: 'Tech Unleash 4.0 Registration Form',
      orgSubtitle: 'आई.ई.टी. डी.ए.वी.वी., इंदौर',
      sessionTag: 'सत्र 2026-27',
      formTitle: 'टेक अनलीश 4.0 पंजीकरण फॉर्म',
      formSubtitle: 'GDGoC IET DAVV के Tech Unleash 4.0 में हमारे साथ जुड़ें!',
      switchLang: 'English',
    },
    form: {
      enrollmentNoLabel: 'नामांकन संख्या (Enrollment No.)',
      enrollmentNoPlaceholder: 'उदा. DE24101',
      nameLabel: 'पूरा नाम',
      namePlaceholder: 'अपना पूरा नाम दर्ज करें',
      branchLabel: 'शाखा (Branch)',
      branchPlaceholder: 'अपनी शाखा चुनें',
      sectionLabel: 'अनुभाग (Section)',
      sectionPlaceholder: 'अनुभाग चुनें (A / B)',
      yearLabel: 'वर्ष (Year of Study)',
      yearPlaceholder: 'वर्ष चुनें',
      contactLabel: 'संपर्क नंबर (+91 के साथ)',
      contactPlaceholder: '9876543210',
      contactNote: 'प्रारूप: +91 के साथ 10 अंकों का मोबाइल नंबर होना चाहिए',
      genderLabel: 'लिंग',
      genderPlaceholder: 'लिंग चुनें',
      emailLabel: 'ईमेल आईडी (कॉलेज ईमेल अधिमान्य)',
      emailPlaceholder: 'yourname@ietdavv.edu.in या व्यक्तिगत ईमेल',
      emailNote: 'अपना ईमेल पता दर्ज करें (आधिकारिक कॉलेज ईमेल आईडी अधिमान्य)',
      linkedinLabel: 'लिंक्डइन आईडी / प्रोफाइल यूआरएल',
      linkedinPlaceholder: 'https://linkedin.com/in/username',
      githubLabel: 'गिटहब आईडी / प्रोफाइल यूआरएल (यदि हो तो)',
      githubPlaceholder: 'https://github.com/username (वैकल्पिक)',
      instagramLabel: 'इंस्टाग्राम आईडी / हैंडल (यदि हो तो)',
      instagramPlaceholder: '@username या प्रोफाइल लिंक (वैकल्पिक)',
      interestsLabel: 'अभिरुचि एवं कौशल',
      interestsPlaceholder: 'अपनी प्राथमिक अभिरुचि/कौशल चुनें',
      otherInterestLabel: 'अन्य कौशल / अभिरुचि दर्ज करें',
      otherInterestPlaceholder: 'अपना कौशल या अभिरुचि दर्ज करें...',
      submitButton: 'टेक अनलीश पंजीकरण फॉर्म सबमिट करें',
      submittingButton: 'प्रतिक्रिया दर्ज की जा रही है...',
      requiredField: 'यह क्षेत्र अनिवार्य है',
    },
    options: {
      branches: [
        { value: 'CS', label: 'कंप्यूटर साइंस (CS)' },
        { value: 'IT', label: 'इन्फॉर्मेशन टेक्नोलॉजी (IT)' },
        { value: 'ETC', label: 'इलेक्ट्रॉनिक्स एंड टेलीकम्युनिकेशन (ETC)' },
        { value: 'EI', label: 'इलेक्ट्रिकल एंड इंस्ट्रूमेंटेशन (EI)' },
        { value: 'EEE', label: 'इलेक्ट्रिकल एंड इलेक्ट्रॉनिक्स (EEE)' },
        { value: 'Mech', label: 'मैकेनिकल (Mech)' },
        { value: 'Civil', label: 'सिविल (Civil)' },
        { value: 'CSBS', label: 'कंप्यूटर साइंस एंड बिजनेस सिस्टम (CSBS)' },
        { value: 'IP', label: 'इंडस्ट्रियल एंड प्रोडक्शन (IP)' },
        { value: 'B.Design', label: 'बैचलर ऑफ डिजाइन (B.Design)' },
        { value: 'Other', label: 'अन्य' },
      ],
      sections: [
        { value: 'A', label: 'अनुभाग A (Section A)' },
        { value: 'B', label: 'अनुभाग B (Section B)' },
      ],
      years: [
        { value: '1st Year', label: 'प्रथम वर्ष (1st Year)' },
        { value: '2nd Year', label: 'द्वितीय वर्ष (2nd Year)' },
        { value: '3rd Year', label: 'तृतीय वर्ष (3rd Year)' },
        { value: '4th Year', label: 'चतुर्थ वर्ष (4th Year)' },
      ],
      genders: [
        { value: 'Male', label: 'पुरुष' },
        { value: 'Female', label: 'महिला' },
        { value: 'Other', label: 'अन्य' },
      ],
      interests: [
        { value: 'Web Development', label: 'वेब डेवलपमेंट (Web Dev)' },
        { value: 'Android & Mobile Dev', label: 'एंड्रॉइड एवं मोबाइल (Android & Mobile)' },
        { value: 'AI / Machine Learning', label: 'एआई एवं मशीन लर्निंग (AI & ML)' },
        { value: 'Cloud & DevOps', label: 'क्लाउड एवं देवऑप्स (Cloud & DevOps)' },
        { value: 'UI/UX & Design', label: 'यूआई/यूएक्स एवं डिजाइन (UI/UX & Design)' },
        { value: 'Competitive Programming', label: 'कंपैटिटिव प्रोग्रामिंग (CP)' },
        { value: 'Cybersecurity', label: 'साइबर सिक्योरिटी (Cybersecurity)' },
        { value: 'Management & Event Ops', label: 'मैनेजमेंट एवं इवेंट्स (Management & Events)' },
        { value: 'Content & Social Media', label: 'कंटेंट एवं सोशल मीडिया (Content & PR)' },
        { value: 'Other', label: 'अन्य' },
      ],
    },
    status: {
      alreadySubmittedTitle: 'प्रतिक्रिया दर्ज की गई',
      alreadySubmittedMsg: 'आपकी प्रतिक्रिया दर्ज कर ली गई है। धन्यवाद! आप इस ईमेल पते से पहले ही फॉर्म सबमिट कर चुके हैं।',
      successTitle: 'धन्यवाद!',
      successMsg: 'आपकी प्रतिक्रिया दर्ज कर ली गई है। धन्यवाद! आपको जल्द ही जानकारी मिलेगी।',
      errorCollegeEmail: 'कृपया एक मान्य ईमेल पता दर्ज करें।',
      errorPhonePrefix: 'संपर्क नंबर +91 प्रीफिक्स के साथ 10 अंकों का होना चाहिए।',
      errorRequired: 'कृपया सभी अनिवार्य फ़ील्ड सही ढंग से भरें।',
      errorGeneral: 'आपका पंजीकरण जमा करते समय एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
      downloadFormBtn: 'आवेदन पत्र डाउनलोड / प्रिंट करें',
      viewFormBtn: 'आवेदन पत्र देखें',
    },
    footer: {
      copyright: 'सर्वाधिकार सुरक्षित - गूगल डेवलपर ग्रुप्स ऑन कैंपस, आई.ई.टी. डी.ए.वी.वी.',
      contactPrefix: 'यदि आपके पास कोई प्रश्न है, तो हमसे संपर्क करें:',
      adminEmail: 'gdgoc@ietdavv.edu.in',
      credits: 'मूल रचयिता: उत्कर्ष मंडलोई (Utkarsh Mandloi)',
    },
  },
};
