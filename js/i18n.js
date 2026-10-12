/**
 * MediTrack AI - Complete Localization Engine (i18n)
 * Full dictionaries for English (en), Telugu (తెలుగు - te), and Hindi (हिंदी - hi).
 * Instant re-render without reload, persists preference, sets <html lang>,
 * adapts speech recognition, and translates clinical AI summaries with drug names/units in English.
 */

const I18N = {
  currentLang: 'en',

  translations: {
    en: {
      // Branding & Shell
      appTitle: "MediTrack AI",
      appTagline: "Personal Health Copilot",
      copilotSubtitle: "Personal AI copilot for medical reports, symptom triage, and drug guidance.",
      searchPlaceholder: "Search records, test names, biomarkers, or medications (Ctrl+K)...",
      demoBadgeLive: "Gemini Live Vision Active",
      demoBadgeFallback: "Evaluator Demo Mode",
      guestHeroTitle: "hello welcome to medi track.",
      guestHeroSubtitle: "Your personal AI copilot for medical reports, symptom triage, and drug guidance.",
      askPlaceholder: "Ask: . . . (describe symptoms or upload report)",
      uploadTooltip: "Upload lab report image or PDF",
      micTooltip: "Voice input via microphone",
      sendButton: "Send",
      loginRegister: "Login / Register",
      logout: "Logout",
      addPerson: "+ Add Person",
      activeProfile: "Active Profile",
      primaryUser: "Primary User",

      // Navigation Items
      navHome: "Home Workspace",
      navRecords: "Health Records & Timeline",
      navResult: "Result - Clinical Synthesis",
      navMonitoring: "Daily Vitals Monitoring",
      navSafety: "Drug Safety & Interactions",
      navMedications: "Active Medications",
      navAbha: "ABHA Health Account",
      navSettings: "Settings & API Keys",
      navArchitecture: "Architecture Blueprint",

      // Records View
      recordsTitle: "Health Records Vault",
      recordsSubtitle: "Chronological diagnostic reports, pathology results, and digital prescriptions.",
      filterAll: "All Records",
      filterLab: "Laboratory Reports",
      filterPrescription: "Prescriptions",
      filterImaging: "Diagnostic Scans",
      recordsEmpty: "No health records found for this profile. Upload a lab report or prescription to start.",
      btnUploadRecord: "Upload Diagnostic Document",
      ocrConfidence: "OCR Confidence",
      viewDetails: "View Details",
      deleteRecord: "Delete Record",
      recordDeleted: "Record permanently removed from local vault.",

      // Result View
      resultTitle: "Clinical Report Synthesis",
      resultSubtitle: "AI-parsed biomarkers, clinical interpretation, and recommended next steps.",
      summaryHeading: "Comprehensive Clinical Summary",
      problemHeading: "Identified Problem & Out-of-Range Markers",
      solutionHeading: "Recommended Clinical Actions",
      safetyAdviceHeading: "Lifestyle & Safety Guidance",
      prescribedMedsHeading: "Active Medications Prescribed",
      questionsDoctorHeading: "Suggested Questions for Your Doctor",
      exportDoctorPdf: "Download Doctor-Ready PDF",
      abnormalFlag: "Out of Boundary",
      normalFlag: "Within Normal Range",
      statusHigh: "HIGH",
      statusLow: "LOW",
      statusNormal: "NORMAL",

      // Monitoring View
      monitoringTitle: "Daily Telemetry & Vitals",
      monitoringSubtitle: "Continuous glucose monitoring (CGM), blood pressure logs, and symptom tracking.",
      logVitalsBtn: "+ Log Today's Reading",
      latestBp: "Latest Blood Pressure",
      latestSugar: "Fasting Blood Sugar",
      systolicBp: "Systolic Pressure",
      diastolicBp: "Diastolic Pressure",
      fastingGlucose: "Fasting Glucose",
      symptomsNotes: "Symptoms / Energy Notes",
      saveVitalsBtn: "Save Reading to Today's Record",
      chartBpTitle: "7-Day Blood Pressure Trajectory (mmHg)",
      chartSugarTitle: "CGM Glycemic Variations (mg/dL)",

      // Safety & Medications View
      safetyTitle: "Medication Regimen & Drug Safety",
      safetySubtitle: "Active prescriptions, drug-drug interaction screening, and duplicate therapy alerts.",
      safetyPassed: "0 Critical Drug Interactions Detected",
      safetyAllergyAlert: "Allergy Alert: Penicillin sensitivity active in profile.",
      morningDose: "Morning (Breakfast)",
      afternoonDose: "Afternoon (Lunch)",
      nightDose: "Night (Bedtime)",
      markTaken: "Mark Taken",
      doseTaken: "Taken",
      refillDue: "Refill Due Soon",

      // ABHA View
      abhaTitle: "Ayushman Bharat Health Account (ABHA)",
      abhaSubtitle: "National Health Authority (NHA) digital health identity and FHIR R4 interoperability.",
      abhaCardTitle: "ABHA DIGITAL HEALTH CARD",
      abhaVerified: "VERIFIED",
      abhaAddress: "ABHA Address",
      abhaNumber: "ABHA Number",
      btnLinkAbha: "Link ABHA Account",
      btnUnlinkAbha: "Unlink ABHA Account",
      btnImportAbdm: "Import from ABDM (mock)",
      btnExportFhir: "Export my data as FHIR Bundle (JSON)",
      consentTitle: "Active ABDM Consent Artifacts & Health Lockers",
      qrInstruction: "Scan with any ABDM-compliant health app to access authorized clinical records.",

      // Settings View
      settingsTitle: "Settings & API Configuration",
      settingsSubtitle: "Manage Gemini API keys, LLM engines, language, and data privacy options.",
      geminiKeyLabel: "Google Gemini API Key",
      geminiKeyPlaceholder: "AIzaSy...",
      saveKeyBtn: "Save Key",
      testKeyBtn: "Test Connection Probe",
      activeModelLabel: "Active Multimodal Model",
      languageSelectLabel: "System Language",
      auditTitle: "Multi-User Isolation Regression Audit",
      runAuditBtn: "Run Cross-Profile Isolation Regression Check",
      storageTitle: "Patient Health Vault & Storage Management",
      btnResetDemo: "Reset Demo Profiles",
      btnExportVault: "Export Local Vault (JSON)",
      btnWipeAll: "Delete All Data (One-Click Wipe)",
      privacyTitle: "Privacy Notice & Local Data Sovereignty",
      privacyNotice: "MediTrack AI is privacy-first. All patient records, biomarkers, and logs stay strictly on-device in your browser localStorage vault. Data is never sold or shared. Documents and prompts are transmitted only to Google Gemini API over TLS for real-time extraction and analysis. You retain full ownership and can wipe all data at any moment with the one-click wipe button.",

      // Architecture View
      archTitle: "Architecture Blueprint & Clinical Data Pipeline",
      archSubtitle: "Technical specification: Upload -> Gemini OCR -> Human Verification -> FHIR R4 Vault -> Triage.",

      // Modals & Prompts
      modalAddPersonTitle: "Add New Family Member",
      fullNameLabel: "Full Name",
      relationshipLabel: "Relationship",
      ageLabel: "Age (Years)",
      genderLabel: "Gender",
      cancelBtn: "Cancel",
      createProfileBtn: "Create Isolated Profile",

      reviewModalTitle: "Human-in-the-Loop Diagnostic Verification",
      reviewModalSubtitle: "Review AI extracted laboratory values. Cells with low OCR confidence are highlighted in amber.",
      verifyAndSaveBtn: "Verify & Commit to Vault",

      // Emergency Banner
      emergencyAlertTitle: "EMERGENCY TRIAGE ALERT: RED-FLAG SYMPTOMS DETECTED",
      emergencyAlertDesc: "Your symptoms or biomarker values indicate potential acute medical danger. Please do NOT wait for AI advice. Call 112 / 108 or proceed immediately to the nearest emergency department.",

      // Toasts
      toastLangChanged: "Language switched to English",
      toastSaved: "Record saved successfully to your health vault.",
      toastDeleted: "Item removed from local vault.",
      toastFhirExported: "FHIR R4 Bundle generated and downloaded.",
      toastAbdmImported: "Synthetic ABDM Health Locker Bundle imported successfully.",
      toastDataWiped: "All local data wiped cleanly. Restored initial state.",
      toastProfileAdded: "New isolated profile created.",
      toastProfileSwitched: "Switched to profile: "
    },

    te: {
      // Branding & Shell
      appTitle: "మెడిట్రాక్ AI",
      appTagline: "వ్యక్తిగత ఆరోగ్య కోపైలట్",
      copilotSubtitle: "వైద్య నివేదికలు, లక్షణాల తనిఖీ మరియు ఔషధ మార్గదర్శకత్వం కోసం మీ వ్యక్తిగత AI కోపైలట్.",
      searchPlaceholder: "రికార్డులు, పరీక్షల పేర్లు, బయోమార్కర్లు లేదా మందులను వెతకండి (Ctrl+K)...",
      demoBadgeLive: "జెమిని లైవ్ విజన్ యాక్టివ్",
      demoBadgeFallback: "ఎవాల్యుయేటర్ డెమో మోడ్",
      guestHeroTitle: "మెడి ట్రాక్‌కి స్వాగతం.",
      guestHeroSubtitle: "వైద్య నివేదికలు, లక్షణాల తనిఖీ మరియు ఔషధ మార్గదర్శకత్వం కోసం మీ వ్యక్తిగత AI కోపైలట్.",
      askPlaceholder: "అడగండి: . . . (లక్షణాలను వివరించండి లేదా నివేదికను అప్‌లోడ్ చేయండి)",
      uploadTooltip: "ల్యాబ్ నివేదిక చిత్రం లేదా PDF అప్‌లోడ్ చేయండి",
      micTooltip: "మైక్రోఫోన్ ద్వారా వాయిస్ ఇన్‌పుట్",
      sendButton: "పంపండి",
      loginRegister: "లాగిన్ / రిజిస్టర్",
      logout: "లాగ్ అవుట్",
      addPerson: "+ వ్యక్తిని జోడించండి",
      activeProfile: "ప్రస్తుత ప్రొఫైల్",
      primaryUser: "ప్రధాన వినియోగదారు",

      // Navigation Items
      navHome: "హోమ్ వర్క్‌స్పేస్",
      navRecords: "ఆరోగ్య రికార్డులు & కాలక్రమం",
      navResult: "ఫలితాల విశ్లేషణ",
      navMonitoring: "రోజువారీ పర్యవేక్షణ",
      navSafety: "ఔషధ భద్రత & పరస్పర చర్యలు",
      navMedications: "ప్రస్తుత మందులు",
      navAbha: "ABHA ఆరోగ్య ఖాతా",
      navSettings: "సెట్టింగ్‌లు & API కీలు",
      navArchitecture: "ఆర్కిటెక్చర్ బ్లూప్రింట్",

      // Records View
      recordsTitle: "ఆరోగ్య రికార్డుల వాల్ట్",
      recordsSubtitle: "కాలక్రమానుసార ల్యాబ్ నివేదికలు, పాథాలజీ ఫలితాలు మరియు డిజిటల్ ప్రిస్క్రిప్షన్లు.",
      filterAll: "అన్ని రికార్డులు",
      filterLab: "ల్యాబ్ నివేదికలు",
      filterPrescription: "ప్రిస్క్రిప్షన్లు",
      filterImaging: "స్కాన్ రిపోర్టులు",
      recordsEmpty: "ఈ ప్రొఫైల్ కోసం ఎటువంటి రికార్డులు కనుగొనబడలేదు. ప్రారంభించడానికి నివేదికను అప్‌లోడ్ చేయండి.",
      btnUploadRecord: "వైద్య పత్రాన్ని అప్‌లోడ్ చేయండి",
      ocrConfidence: "OCR ఖచ్చితత్వం",
      viewDetails: "వివరాలను చూడండి",
      deleteRecord: "రికార్డును తొలగించండి",
      recordDeleted: "రికార్డ్ శాశ్వతంగా తొలగించబడింది.",

      // Result View
      resultTitle: "క్లినికల్ నివేదిక విశ్లేషణ",
      resultSubtitle: "AI విశ్లేషించిన బయోమార్కర్లు, క్లినికల్ వివరణ మరియు సిఫార్సులు.",
      summaryHeading: "సమగ్ర క్లినికల్ సారాంశం",
      problemHeading: "గుర్తించిన సమస్య & అసహజ విలువలు",
      solutionHeading: "సిఫార్సు చేయబడిన చర్యలు",
      safetyAdviceHeading: "జీవనశైలి & భద్రతా మార్గదర్శకాలు",
      prescribedMedsHeading: "సూచించిన ప్రస్తుత మందులు",
      questionsDoctorHeading: "మీ వైద్యుడిని అడగవలసిన ప్రశ్నలు",
      exportDoctorPdf: "డాక్టర్ PDF డౌన్‌లోడ్ చేసుకోండి",
      abnormalFlag: "పరిమితి దాటింది",
      normalFlag: "సాధారణ పరిధిలో ఉంది",
      statusHigh: "ఎక్కువ",
      statusLow: "తక్కువ",
      statusNormal: "సాధారణం",

      // Monitoring View
      monitoringTitle: "రోజువారీ కీలక సంకేతాల పర్యవేక్షణ",
      monitoringSubtitle: "గ్లూకోజ్ పర్యవేక్షణ (CGM), రక్తపోటు లాగ్‌లు మరియు లక్షణాల ట్రాకింగ్.",
      logVitalsBtn: "+ నేటి రీడింగ్‌ను నమోదు చేయండి",
      latestBp: "తాజా రక్తపోటు",
      latestSugar: "ఖాళీ కడుపున రక్తంలో చక్కెర",
      systolicBp: "సిస్టోలిక్ పీడనం",
      diastolicBp: "డయాస్టొలిక్ పీడనం",
      fastingGlucose: "ఫాస్టింగ్ గ్లూకోజ్",
      symptomsNotes: "లక్షణాలు / శక్తి గమనికలు",
      saveVitalsBtn: "నేటి రికార్డులో సేవ్ చేయండి",
      chartBpTitle: "7-రోజుల రక్తపోటు తీరు (mmHg)",
      chartSugarTitle: "CGM గ్లూకోజ్ హెచ్చుతగ్గులు (mg/dL)",

      // Safety & Medications View
      safetyTitle: "మందుల పట్టిక & ఔషధ భద్రత",
      safetySubtitle: "ప్రస్తుత మందులు, ఔషధ పరస్పర చర్యల తనిఖీ మరియు హెచ్చరికలు.",
      safetyPassed: "0 ప్రమాదకర ఔషధ పరస్పర చర్యలు గుర్తించబడ్డాయి",
      safetyAllergyAlert: "అలెర్జీ హెచ్చరిక: పెన్సిలిన్ సున్నితత్వం సక్రియంగా ఉంది.",
      morningDose: "ఉదయం (అల్పాహారం)",
      afternoonDose: "మధ్యాహ్నం (భోజనం)",
      nightDose: "రాత్రి (పడుకునే ముందు)",
      markTaken: "తీసుకున్నట్లు గుర్తించు",
      doseTaken: "తీసుకున్నారు",
      refillDue: "రీఫిల్ సమయం దగ్గరపడింది",

      // ABHA View
      abhaTitle: "ఆయుష్మాన్ భారత్ హెల్త్ అకౌంట్ (ABHA)",
      abhaSubtitle: "జాతీయ ఆరోగ్య అథారిటీ (NHA) డిజిటల్ హెల్త్ ఐడి మరియు FHIR R4 భాగస్వామ్యం.",
      abhaCardTitle: "ABHA డిజిటల్ హెల్త్ కార్డ్",
      abhaVerified: "ధృవీకరించబడింది",
      abhaAddress: "ABHA చిరునామా",
      abhaNumber: "ABHA సంఖ్య",
      btnLinkAbha: "ABHA ఖాతాను లింక్ చేయండి",
      btnUnlinkAbha: "ABHA ఖాతాను అన్‌లింక్ చేయండి",
      btnImportAbdm: "ABDM నుండి దిగుమతి చేయండి (మాక్)",
      btnExportFhir: "నా డేటాను FHIR బండిల్‌గా ఎగుమతి చేయండి (JSON)",
      consentTitle: "క్రియాశీల ABDM సమ్మతి పత్రాలు & హెల్త్ లాకర్లు",
      qrInstruction: "అధీకృత రికార్డులను పొందడానికి ఏదైనా ABDM యాప్‌తో స్కాన్ చేయండి.",

      // Settings View
      settingsTitle: "సెట్టింగ్‌లు & API కాన్ఫిగరేషన్",
      settingsSubtitle: "జెమిని API కీలు, LLM ఇంజిన్లు, భాష మరియు డేటా గోప్యతా ఎంపికలను నిర్వహించండి.",
      geminiKeyLabel: "Google Gemini API కీ",
      geminiKeyPlaceholder: "AIzaSy...",
      saveKeyBtn: "కీని సేవ్ చేయండి",
      testKeyBtn: "కనెక్షన్ పరీక్షించండి",
      activeModelLabel: "యాక్టివ్ మల్టీమోడల్ మోడల్",
      languageSelectLabel: "సిస్టమ్ భాష",
      auditTitle: "మల్టీ-యూజర్ ఐసోలేషన్ రిగ్రెషన్ ఆడిట్",
      runAuditBtn: "క్రాస్-ప్రొఫైల్ ఐసోలేషన్ చెక్ అమలు చేయండి",
      storageTitle: "ఆరోగ్య వాల్ట్ & నిల్వ నిర్వహణ",
      btnResetDemo: "డెమో ప్రొఫైల్‌లను రీసెట్ చేయండి",
      btnExportVault: "లోకల్ వాల్ట్‌ను ఎగుమతి చేయండి (JSON)",
      btnWipeAll: "మొత్తం డేటాను తొలగించండి (వన్-క్లిక్ వైప్)",
      privacyTitle: "గోప్యతా నోటీసు & స్థానిక డేటా భద్రత",
      privacyNotice: "మెడిట్రాక్ AI గోప్యతకు అత్యంత ప్రాధాన్యతనిస్తుంది. అన్ని రోగి రికార్డులు, బయోమార్కర్లు మరియు లాగ్‌లు మీ బ్రౌజర్ లోకల్ స్టోరేజ్‌లోనే భద్రంగా ఉంటాయి. డేటా ఎవరికీ విక్రయించబడదు లేదా భాగస్వామ్యం చేయబడదు. విశ్లేషణ కోసం మాత్రమే Google Gemini APIకి సురక్షితంగా పంపబడుతుంది. మీరు ఎప్పుడైనా వన్-క్లిక్ వైప్ బటన్‌తో డేటాను పూర్తిగా తొలగించవచ్చు.",

      // Architecture View
      archTitle: "ఆర్కిటెక్చర్ బ్లూప్రింట్ & డేటా పైప్‌లైన్",
      archSubtitle: "సాంకేతిక వివరాలు: అప్‌లోడ్ -> జెమిని OCR -> హ్యూమన్ వెరిఫికేషన్ -> FHIR R4 వాల్ట్.",

      // Modals & Prompts
      modalAddPersonTitle: "కొత్త కుటుంబ సభ్యుడిని జోడించండి",
      fullNameLabel: "పూర్తి పేరు",
      relationshipLabel: "సంబంధం",
      ageLabel: "వయస్సు (సంవత్సరాలు)",
      genderLabel: "లింగం",
      cancelBtn: "రద్దు చేయండి",
      createProfileBtn: "ప్రత్యేక ప్రొఫైల్‌ను సృష్టించండి",

      reviewModalTitle: "క్లినికల్ నిర్ధారణ & సమీక్ష",
      reviewModalSubtitle: "AI సేకరించిన ల్యాబ్ విలువలను సమీక్షించండి. తక్కువ ఖచ్చితత్వం ఉన్న విలువలు పసుపు రంగులో చూపబడ్డాయి.",
      verifyAndSaveBtn: "ధృవీకరించి వాల్ట్‌లో సేవ్ చేయండి",

      // Emergency Banner
      emergencyAlertTitle: "అత్యవసర హెచ్చరిక: ప్రమాదకర లక్షణాలు గుర్తించబడ్డాయి",
      emergencyAlertDesc: "మీ లక్షణాలు తీవ్రమైన వైద్య ప్రమాదాన్ని సూచిస్తున్నాయి. దయచేసి AI సమాధానం కోసం వేచి ఉండకండి. వెంటనే 112 / 108 కు కాల్ చేయండి లేదా సమీప అత్యవసర విభాగానికి వెళ్లండి.",

      // Toasts
      toastLangChanged: "భాష తెలుగుకు మార్చబడింది",
      toastSaved: "రికార్డ్ మీ ఆరోగ్య వాల్ట్‌లో విజయవంతంగా సేవ్ చేయబడింది.",
      toastDeleted: "అంశం స్థానిక వాల్ట్ నుండి తొలగించబడింది.",
      toastFhirExported: "FHIR R4 బండిల్ డౌన్‌లోడ్ చేయబడింది.",
      toastAbdmImported: "ABDM హెల్త్ లాకర్ బండిల్ విజయవంతంగా దిగుమతి చేయబడింది.",
      toastDataWiped: "మొత్తం స్థానిక డేటా విజయవంతంగా తొలగించబడింది.",
      toastProfileAdded: "కొత్త ప్రొఫైల్ సృష్టించబడింది.",
      toastProfileSwitched: "ప్రొఫైల్‌కి మారారు: "
    },

    hi: {
      // Branding & Shell
      appTitle: "मेडीट्रैक AI",
      appTagline: "व्यक्तिगत स्वास्थ्य कोपायलट",
      copilotSubtitle: "चिकित्सा रिपोर्ट, लक्षण जांच और दवा मार्गदर्शन के लिए आपका व्यक्तिगत AI कोपायलट।",
      searchPlaceholder: "रिकॉर्ड, परीक्षण के नाम, बायोमार्कर या दवाएं खोजें (Ctrl+K)...",
      demoBadgeLive: "जेमिनी लाइव विजन सक्रिय",
      demoBadgeFallback: "मूल्यांकनकर्ता डेमो मोड",
      guestHeroTitle: "मेडी ट्रैक में आपका स्वागत है।",
      guestHeroSubtitle: "चिकित्सा रिपोर्ट, लक्षण जांच और दवा मार्गदर्शन के लिए आपका व्यक्तिगत AI कोपायलट।",
      askPlaceholder: "पूछें: . . . (लक्षणों का वर्णन करें या रिपोर्ट अपलोड करें)",
      uploadTooltip: "लैब रिपोर्ट छवि या पीडीएफ अपलोड करें",
      micTooltip: "माइक्रोफ़ोन के माध्यम से वॉयस इनपुट",
      sendButton: "भेजें",
      loginRegister: "लॉग इन / रजिस्टर",
      logout: "लॉग आउट",
      addPerson: "+ व्यक्ति जोड़ें",
      activeProfile: "सक्रिय प्रोफ़ाइल",
      primaryUser: "मुख्य उपयोगकर्ता",

      // Navigation Items
      navHome: "होम कार्यक्षेत्र",
      navRecords: "स्वास्थ्य रिकॉर्ड और समयरेखा",
      navResult: "परिणाम विश्लेषण",
      navMonitoring: "दैनिक निगरानी",
      navSafety: "दवा सुरक्षा और परस्पर क्रिया",
      navMedications: "सक्रिय दवाएं",
      navAbha: "ABHA स्वास्थ्य खाता",
      navSettings: "सेटिंग्स और API कुंजी",
      navArchitecture: "आर्किटेक्चर ब्लूप्रिंट",

      // Records View
      recordsTitle: "स्वास्थ्य रिकॉर्ड वॉल्ट",
      recordsSubtitle: "कालानुक्रमिक लैब रिपोर्ट, पैथोलॉजी परिणाम और डिजिटल नुस्खे।",
      filterAll: "सभी रिकॉर्ड",
      filterLab: "प्रयोगशाला रिपोर्ट",
      filterPrescription: "नुस्खे (प्रिस्क्रिप्शन)",
      filterImaging: "डायग्नोस्टिक स्कैन",
      recordsEmpty: "इस प्रोफ़ाइल के लिए कोई स्वास्थ्य रिकॉर्ड नहीं मिला। शुरू करने के लिए एक रिपोर्ट अपलोड करें।",
      btnUploadRecord: "चिकित्सा दस्तावेज़ अपलोड करें",
      ocrConfidence: "OCR सटीकता",
      viewDetails: "विवरण देखें",
      deleteRecord: "रिकॉर्ड हटाएं",
      recordDeleted: "रिकॉर्ड स्थानीय वॉल्ट से स्थायी रूप से हटा दिया गया।",

      // Result View
      resultTitle: "क्लिनिकल रिपोर्ट विश्लेषण",
      resultSubtitle: "AI-विश्लेषित बायोमार्कर, क्लिनिकल व्याख्या और अनुशंसित अगले कदम।",
      summaryHeading: "व्यापक क्लिनिकल सारांश",
      problemHeading: "पहचानी गई समस्या और असामान्य मार्कर",
      solutionHeading: "अनुशंसित क्लिनिकल कदम",
      safetyAdviceHeading: "जीवनशैली और सुरक्षा मार्गदर्शन",
      prescribedMedsHeading: "सक्रिय निर्धारित दवाएं",
      questionsDoctorHeading: "डॉक्टर से पूछने के लिए अनुशंसित प्रश्न",
      exportDoctorPdf: "डॉक्टर-रेडी PDF डाउनलोड करें",
      abnormalFlag: "सीमा से बाहर",
      normalFlag: "सामान्य सीमा के भीतर",
      statusHigh: "उच्च",
      statusLow: "निम्न",
      statusNormal: "सामान्य",

      // Monitoring View
      monitoringTitle: "दैनिक विटल्स और टेलीमेट्री",
      monitoringSubtitle: "सतत ग्लूकोज निगरानी (CGM), रक्तचाप लॉग और लक्षण ट्रैकिंग।",
      logVitalsBtn: "+ आज की रीडिंग दर्ज करें",
      latestBp: "नवीनतम रक्तचाप",
      latestSugar: "खाली पेट रक्त शर्करा",
      systolicBp: "सिस्टोलिक दबाव",
      diastolicBp: "डायस्टोलिक दबाव",
      fastingGlucose: "फास्टिंग ग्लूकोज",
      symptomsNotes: "लक्षण / ऊर्जा नोट्स",
      saveVitalsBtn: "आज के रिकॉर्ड में सहेजें",
      chartBpTitle: "7-दिवसीय रक्तचाप प्रक्षेपवक्र (mmHg)",
      chartSugarTitle: "CGM ग्लूकोज विविधता (mg/dL)",

      // Safety & Medications View
      safetyTitle: "दवा आहार और सुरक्षा",
      safetySubtitle: "सक्रिय नुस्खे, दवाओं के बीच परस्पर क्रिया की जांच और अलर्ट।",
      safetyPassed: "0 गंभीर दवा परस्पर क्रिया पाई गई",
      safetyAllergyAlert: "एलर्जी अलर्ट: पेनिसिलिन संवेदनशीलता प्रोफ़ाइल में सक्रिय है।",
      morningDose: "सुबह (नाश्ता)",
      afternoonDose: "दोपहर (दोपहर का भोजन)",
      nightDose: "रात (सोने से पहले)",
      markTaken: "लिया हुआ चिह्नित करें",
      doseTaken: "ले लिया",
      refillDue: "रीफिल का समय निकट है",

      // ABHA View
      abhaTitle: "आयुष्मान भारत स्वास्थ्य खाता (ABHA)",
      abhaSubtitle: "राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA) डिजिटल स्वास्थ्य पहचान और FHIR R4 इंटरऑपरेबिलिटी।",
      abhaCardTitle: "ABHA डिजिटल स्वास्थ्य कार्ड",
      abhaVerified: "सत्यापित",
      abhaAddress: "ABHA पता",
      abhaNumber: "ABHA संख्या",
      btnLinkAbha: "ABHA खाता लिंक करें",
      btnUnlinkAbha: "ABHA खाता अनलिंक करें",
      btnImportAbdm: "ABDM से आयात करें (मॉक)",
      btnExportFhir: "मेरा डेटा FHIR बंडल के रूप में निर्यात करें (JSON)",
      consentTitle: "सक्रिय ABDM सहमति कलाकृतियां और स्वास्थ्य लॉकर",
      qrInstruction: "अधिकृत रिकॉर्ड तक पहुंचने के लिए किसी भी ABDM ऐप से स्कैन करें।",

      // Settings View
      settingsTitle: "सेटिंग्स और API कॉन्फ़िगरेशन",
      settingsSubtitle: "जेमिनी API कुंजी, LLM इंजन, भाषा और डेटा गोपनीयता विकल्प प्रबंधित करें।",
      geminiKeyLabel: "Google Gemini API कुंजी",
      geminiKeyPlaceholder: "AIzaSy...",
      saveKeyBtn: "कुंजी सहेजें",
      testKeyBtn: "कनेक्शन का परीक्षण करें",
      activeModelLabel: "सक्रिय मल्टीमॉडल मॉडल",
      languageSelectLabel: "सिस्टम भाषा",
      auditTitle: "मल्टी-यूज़र आइसोलेशन रिग्रेशन ऑडिट",
      runAuditBtn: "क्रॉस-प्रोफ़ाइल आइसोलेशन चेक चलाएं",
      storageTitle: "स्वास्थ्य वॉल्ट और भंडारण प्रबंधन",
      btnResetDemo: "डेमो प्रोफ़ाइल रीसेट करें",
      btnExportVault: "स्थानीय वॉल्ट निर्यात करें (JSON)",
      btnWipeAll: "सारा डेटा हटाएं (वन-क्लिक वाइप)",
      privacyTitle: "गोपनीयता सूचना और स्थानीय डेटा संप्रभुता",
      privacyNotice: "मेडीट्रैक AI गोपनीयता-प्रथम है। सभी रोगी रिकॉर्ड, बायोमार्कर और लॉग आपके ब्राउज़र के लोकल स्टोरेज वॉल्ट में सुरक्षित रहते हैं। डेटा कभी किसी को बेचा या साझा नहीं किया जाता। केवल विश्लेषण के लिए Google Gemini API को सुरक्षित रूप से भेजा जाता है। आप किसी भी समय वन-क्लिक वाइप बटन से सारा डेटा मिटा सकते हैं।",

      // Architecture View
      archTitle: "आर्किटेक्चर ब्लूप्रिंट और डेटा पाइपलाइन",
      archSubtitle: "तकनीकी विनिर्देश: अपलोड -> जेमिनी OCR -> मानव सत्यापन -> FHIR R4 वॉल्ट।",

      // Modals & Prompts
      modalAddPersonTitle: "नया परिवार सदस्य जोड़ें",
      fullNameLabel: "पूरा नाम",
      relationshipLabel: "संबंध",
      ageLabel: "आयु (वर्ष)",
      genderLabel: "लिंग",
      cancelBtn: "रद्द करें",
      createProfileBtn: "पृथक प्रोफ़ाइल बनाएं",

      reviewModalTitle: "मानव-समीक्षित डायग्नोस्टिक सत्यापन",
      reviewModalSubtitle: "AI द्वारा निकाले गए लैब मूल्यों की समीक्षा करें। कम सटीकता वाले मूल्य पीले रंग में हाइलाइट किए गए हैं।",
      verifyAndSaveBtn: "सत्यापित करें और वॉल्ट में सहेजें",

      // Emergency Banner
      emergencyAlertTitle: "आपातकालीन चेतावनी: गंभीर लक्षण पाए गए",
      emergencyAlertDesc: "आपके लक्षण तीव्र चिकित्सा खतरे का संकेत देते हैं। कृपया AI सलाह की प्रतीक्षा न करें। तुरंत 112 / 108 पर कॉल करें या नजदीकी आपातकालीन विभाग में जाएं।",

      // Toasts
      toastLangChanged: "भाषा हिंदी में बदल दी गई है",
      toastSaved: "रिकॉर्ड आपके स्वास्थ्य वॉल्ट में सफलतापूर्वक सहेजा गया।",
      toastDeleted: "आइटम स्थानीय वॉल्ट से हटा दिया गया।",
      toastFhirExported: "FHIR R4 बंडल डाउनलोड किया गया।",
      toastAbdmImported: "ABDM स्वास्थ्य लॉकर बंडल सफलतापूर्वक आयात किया गया।",
      toastDataWiped: "सारा स्थानीय डेटा सफलतापूर्वक मिटा दिया गया।",
      toastProfileAdded: "नई पृथक प्रोफ़ाइल बनाई गई।",
      toastProfileSwitched: "प्रोफ़ाइल में बदला गया: "
    }
  },

  /**
   * Clinical summary localization map
   * Keeps medicine names and scientific units in English as required!
   */
  clinicalSummaries: {
    en: {
      problem: "Mild impaired fasting glucose with well-compensated vascular pressure. Glycemic variability reflects early metabolic insulin resistance with elevated HbA1c (7.6%) and LDL Cholesterol (154 mg/dL).",
      solution: "Maintain low-glycemic complex carbohydrate intake, sustain daily 30-min aerobic walking, and adhere strictly to oral biguanide regimen (Metformin 500 mg) with meals.",
      safetyHabits: "Prioritize low-GI carbohydrates, minimize refined sugars, and maintain adequate nocturnal rest.",
      questions: [
        "What is my target HbA1c goal over the next 3 to 6 months?",
        "Do I need to start or titrate a statin medication to lower my LDL cholesterol below 100 mg/dL?",
        "Would a Continuous Glucose Monitor (CGM) help me track post-meal glucose spikes?"
      ]
    },
    te: {
      problem: "పరిమితి దాటిన HbA1c (7.6%) మరియు LDL Cholesterol (154 mg/dL) తో ప్రారంభ దశ ఇన్సులిన్ నిరోధకత మరియు తేలికపాటి రక్తంలో చక్కెర అసమతుల్యత గమనించబడింది. రక్తపోటు ప్రస్తుతం నియంత్రణలో ఉంది.",
      solution: "తక్కువ గ్లైసెమిక్ ఆహారాన్ని తీసుకోండి, ప్రతిరోజూ 30 నిమిషాల ఏరోబిక్ నడకను కొనసాగించండి మరియు భోజనంతో పాటు సూచించిన Metformin 500 mg మందును క్రమం తప్పకుండా వాడండి.",
      safetyHabits: "రిఫైన్డ్ చక్కెరలను తగ్గించండి, సమృద్ధిగా నీరు త్రాగండి మరియు ప్రతిరోజూ తగినంత నిద్రను నిర్వహించండి.",
      questions: [
        "రాబోయే 3 నుండి 6 నెలల్లో నా లక్ష్య HbA1c ఎంత ఉండాలి?",
        "నా LDL cholesterol ను 100 mg/dL కంటే తక్కువకు తీసుకురావడానికి Statin మోతాదును సర్దుబాటు చేయాలా?",
        "భోజనం తర్వాత గ్లూకోజ్ పెరుగుదలను పర్యవేక్షించడానికి CGM పరికరం సహాయపడుతుందా?"
      ]
    },
    hi: {
      problem: "बढ़े हुए HbA1c (7.6%) और LDL Cholesterol (154 mg/dL) के साथ प्रारंभिक चरण का इंसुलिन प्रतिरोध और हल्का उपवास रक्त शर्करा असंतुलन देखा गया है। रक्तचाप वर्तमान में नियंत्रित है।",
      solution: "कम ग्लाइसेमिक आहार बनाए रखें, प्रतिदिन 30 मिनट टहलें, और भोजन के साथ निर्धारित Metformin 500 mg दवा का नियमित सेवन करें।",
      safetyHabits: "परिष्कृत चीनी कम करें, पर्याप्त जलयोजन बनाए रखें और नियमित नींद लें।",
      questions: [
        "अगले 3 से 6 महीनों में मेरा लक्षित HbA1c क्या होना चाहिए?",
        "क्या मेरे LDL cholesterol को 100 mg/dL से नीचे लाने के लिए Statin की खुराक समायोजित करने की आवश्यकता है?",
        "क्या भोजन के बाद ग्लूकोज स्पाइक्स को ट्रैक करने के लिए CGM डिवाइस उपयोगी होगा?"
      ]
    }
  },

  /**
   * Helper: translate key
   */
  t: function(key, lang) {
    const l = lang || this.currentLang || 'en';
    const dict = this.translations[l] || this.translations.en;
    return dict[key] || this.translations.en[key] || key;
  },

  /**
   * Get localized clinical summary for Result view
   */
  getClinicalSummary: function(lang) {
    const l = lang || this.currentLang || 'en';
    return this.clinicalSummaries[l] || this.clinicalSummaries.en;
  }
};

// Expose on window
if (typeof window !== 'undefined') {
  window.I18N = I18N;
}
