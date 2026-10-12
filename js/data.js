// MediTrack AI - Clinical Dataset & Mock Electronic Health Record
// Patient: Ravi Kumar (Age 42) | ABHA ID: 91-4521-8842-1093

const PATIENT_DATA = {
  profile: {
    id: "PAT-914521",
    name: "Ravi Kumar",
    age: 42,
    gender: "Male",
    bloodGroup: "B+ Positive",
    dob: "1984-06-15",
    phone: "+91 98490 12345",
    email: "ravi.kumar@example.com",
    city: "Hyderabad, Telangana",
    abhaId: "91-4521-8842-1093",
    abhaAddress: "ravi.kumar@abdm",
    emergencyContact: "Sunita Kumar (Wife) - +91 98490 54321",
    allergies: ["Penicillin (Moderate rash)", "Sulfa drugs (Reported hives)"],
    primaryPhysician: "Dr. S. Ranganathan, MD, FACC (Apollo Clinics)",
    insuranceProvider: "Star Health Comprehensive (Policy: SH-HYD-99420)",
    healthScore: 78,
    lastCheckup: "Oct 08, 2026",
    nextAppointment: "Nov 12, 2026",
    activeConditions: [
      "Type 2 Diabetes Mellitus (ICD-10 E11.9)",
      "Essential Hypertension - Stage 1 (ICD-10 I10)",
      "Mixed Dyslipidemia (ICD-10 E78.2)"
    ]
  },

  // 1-Click Evaluation Presets for Ingestion & Multimodal OCR
  presets: {
    bloodPanel: {
      id: "preset-blood-panel",
      title: "Sample Blood Panel (Lipid & HbA1c)",
      documentType: "Diagnostic Laboratory Report (PDF / Image)",
      facility: "Apollo Diagnostics & Metropolis Reference Lab",
      date: "Oct 08, 2026",
      ocrConfidence: "99.1% Confidence (Multi-pass Vision OCR)",
      summary: "Comprehensive metabolic panel demonstrating elevated glycated hemoglobin (HbA1c 7.6%) and dyslipidemia with elevated LDL-C (154 mg/dL). Renal markers (creatinine 1.02 mg/dL) remain well-preserved.",
      biomarkers: [
        {
          name: "HbA1c (Glycated Hemoglobin)",
          loinc: "4548-4",
          value: "7.6",
          unit: "%",
          range: "< 5.7% (Normal), 5.7-6.4% (Pre-diabetic), > 6.5% (Diabetic)",
          status: "high",
          flag: "HIGH ABNORMAL",
          plainExplanation: "Reflects average blood sugar levels over the past 90 days. A reading of 7.6% indicates ongoing glucose exposure higher than the typical target of under 7.0%.",
          clinicalSignificance: "Elevated glycated hemoglobin increases risk of microvascular complications (retinopathy, diabetic nephropathy)."
        },
        {
          name: "Fasting Blood Glucose",
          loinc: "1558-6",
          value: "142",
          unit: "mg/dL",
          range: "70 - 99 mg/dL",
          status: "high",
          flag: "HIGH",
          plainExplanation: "Blood sugar after an overnight 8-hour fast. 142 mg/dL shows hepatic glucose production remains active overnight.",
          clinicalSignificance: "Early morning dawn phenomenon or insufficient basal glucose regulation."
        },
        {
          name: "LDL Cholesterol (Calculated)",
          loinc: "13457-7",
          value: "154",
          unit: "mg/dL",
          range: "< 100 mg/dL (Optimal < 70 for Diabetics)",
          status: "high",
          flag: "HIGH ABNORMAL",
          plainExplanation: "The 'bad' cholesterol that deposits in arterial walls. Target for diabetic patients with vascular risk is under 70-100 mg/dL.",
          clinicalSignificance: "Primary atherogenic driver. Requires statin therapy adherence to prevent endothelial plaque formation."
        },
        {
          name: "Triglycerides",
          loinc: "2571-8",
          value: "198",
          unit: "mg/dL",
          range: "< 150 mg/dL",
          status: "high",
          flag: "BORDERLINE HIGH",
          plainExplanation: "Fat circulating in your bloodstream, strongly influenced by dietary carbohydrates and refined grains.",
          clinicalSignificance: "Associated with insulin resistance and metabolic syndrome."
        },
        {
          name: "HDL Cholesterol",
          loinc: "2085-9",
          value: "41",
          unit: "mg/dL",
          range: "> 40 mg/dL (Male Target > 50)",
          status: "normal",
          flag: "NORMAL (LOW-BORDERLINE)",
          plainExplanation: "The protective 'good' cholesterol that clears excess lipids from vascular walls.",
          clinicalSignificance: "Acceptable but can be improved with aerobic exercise and omega-3 intake."
        },
        {
          name: "Serum Creatinine",
          loinc: "2160-0",
          value: "1.02",
          unit: "mg/dL",
          range: "0.74 - 1.35 mg/dL",
          status: "normal",
          flag: "NORMAL",
          plainExplanation: "A key waste product filtered by the kidneys. Indicates stable renal filtration function.",
          clinicalSignificance: "eGFR calculated at 88 mL/min/1.73m² (Normal renal clearance)."
        },
        {
          name: "SGPT / ALT (Liver Enzyme)",
          loinc: "1742-6",
          value: "38",
          unit: "U/L",
          range: "9 - 48 U/L",
          status: "normal",
          flag: "NORMAL",
          plainExplanation: "An enzyme found mainly in liver cells. Normal levels confirm your current medications have not strained liver function.",
          clinicalSignificance: "Hepatic tolerance of current statin and biguanide regimen is intact."
        }
      ],
      medications: [
        {
          name: "Metformin Hydrochloride",
          brand: "Glycomet-SR",
          dose: "500 mg",
          frequency: "Twice daily (1 tablet with breakfast, 1 with dinner)",
          timing: "With Meals",
          class: "Biguanide Antidiabetic",
          mechanism: "Decreases hepatic gluconeogenesis (glucose production by the liver), decreases intestinal glucose absorption, and enhances peripheral insulin sensitivity by increasing glucose uptake in skeletal muscle.",
          instructions: "Take with food to reduce stomach upset. Swallow whole; do not crush or chew extended-release formulation."
        },
        {
          name: "Atorvastatin Calcium",
          brand: "Atorva",
          dose: "10 mg",
          frequency: "Once daily at bedtime",
          timing: "Bedtime",
          class: "HMG-CoA Reductase Inhibitor (Statin)",
          mechanism: "Competitively inhibits HMG-CoA reductase, the rate-limiting enzyme in hepatic cholesterol biosynthesis. Upregulates hepatic LDL receptors to accelerate clearance of atherogenic particles.",
          instructions: "Take once daily in the evening. Report unexplained muscle aches or weakness immediately."
        },
        {
          name: "Telmisartan",
          brand: "Telma",
          dose: "40 mg",
          frequency: "Once daily in the morning",
          timing: "Morning (7:30 AM)",
          class: "Angiotensin II Receptor Blocker (ARB)",
          mechanism: "Blocks AT1 receptors to prevent vasoconstriction and aldosterone release. Promotes vasodilation and renal nephroprotection in diabetic patients.",
          instructions: "Take consistently at the same time each morning. Monitor sitting and standing blood pressure."
        }
      ],
      foodAlerts: [
        {
          severity: "CRITICAL WARNING",
          type: "Food-Drug Metabolism Inhibition",
          title: "Grapefruit & Seville Oranges with Atorvastatin",
          detail: "Grapefruit juice contains furanocoumarins that strongly inhibit the intestinal CYP3A4 enzyme. Consuming it multiplies Atorvastatin blood concentration by up to 300%, triggering dangerous muscle toxicity (rhabdomyolysis) and elevated liver enzymes.",
          recommendation: "Completely avoid grapefruit juice, pomelos, and Seville marmalade while taking Atorvastatin."
        },
        {
          severity: "TIMING GUIDANCE",
          type: "Gastrointestinal Protection",
          title: "Metformin Meal Pairing",
          detail: "Metformin can cause transient nausea, bloating, or loose stools if taken on an empty stomach.",
          recommendation: "Always take Metformin mid-meal or immediately following food with a full glass of water."
        }
      ]
    },

    prescriptionOCR: {
      id: "preset-prescription",
      title: "Sample Clinic Prescription (Handwritten OCR)",
      documentType: "Handwritten Doctor Prescription Slip",
      facility: "Apollo Sugar Clinic - Banjara Hills",
      date: "Oct 05, 2026",
      ocrConfidence: "97.8% Confidence (Clinical HTR Model)",
      summary: "Prescription slip issued by Dr. Sunita Rao, MD (Endocrinology) adjusting Metformin SR to twice daily and adding Vitamin D3 supplementation for borderline 25-OH Vitamin D (18 ng/mL).",
      biomarkers: [
        {
          name: "Blood Pressure (Office Reading)",
          loinc: "85354-9",
          value: "134 / 86",
          unit: "mmHg",
          range: "< 120/80 mmHg (Target < 130/80)",
          status: "moderate",
          flag: "BORDERLINE ELEVATED",
          plainExplanation: "Office blood pressure reading. Top number (systolic) is mildly elevated above the recommended 130 mmHg goal for patients with diabetes.",
          clinicalSignificance: "Stage 1 essential hypertension currently maintained on Telmisartan 40mg monotherapy."
        },
        {
          name: "25-OH Vitamin D Total",
          loinc: "62292-8",
          value: "18.4",
          unit: "ng/mL",
          range: "30.0 - 100.0 ng/mL",
          status: "moderate",
          flag: "DEFICIENT",
          plainExplanation: "Lower than the recommended level of 30 ng/mL. Vitamin D helps calcium absorption and supports immune and metabolic health.",
          clinicalSignificance: "Hypovitaminosis D. Oral replacement protocol initiated."
        }
      ],
      medications: [
        {
          name: "Metformin SR 500mg",
          brand: "Glycomet SR",
          dose: "500 mg",
          frequency: "1-0-1 (Morning & Night)",
          timing: "After Meals",
          class: "Antidiabetic",
          mechanism: "Reduces liver sugar output and enhances cell sensitivity to insulin.",
          instructions: "Continue regular twice-daily schedule."
        },
        {
          name: "Vitamin D3 (Cholecalciferol)",
          brand: "Calcirol 60K",
          dose: "60,000 IU",
          frequency: "Once weekly for 8 weeks",
          timing: "Sunday Morning with Milk",
          class: "Fat-soluble Vitamin",
          mechanism: "Promotes intestinal absorption of calcium and modulates pancreatic beta-cell insulin secretion.",
          instructions: "Must take with a fat-containing meal or warm milk for optimal intestinal absorption."
        }
      ],
      foodAlerts: [
        {
          severity: "ABSORPTION ALERT",
          type: "Bioavailability Optimization",
          title: "Vitamin D3 Fat Dependency",
          detail: "Cholecalciferol is fat-soluble and is very poorly absorbed on an empty stomach.",
          recommendation: "Take your weekly 60,000 IU capsule with breakfast containing healthy fats (such as eggs, nuts, or milk)."
        }
      ]
    },

    dischargeNote: {
      id: "preset-discharge",
      title: "Sample Discharge Note",
      documentType: "Hospital Discharge Summary & Inpatient Note",
      facility: "Care Hospitals Hi-Tech City, Hyderabad",
      date: "Aug 14, 2026",
      ocrConfidence: "99.4% Confidence (HL7 CDA Parsed)",
      summary: "Patient was observed for 24 hours for acute gastroenteritis with mild dehydration. Discharged with stable vitals (BP 122/78 mmHg, HR 74 bpm), rehydrated with IV Ringer's lactate, and instructed to resume normal oral maintenance therapy.",
      biomarkers: [
        {
          name: "Serum Sodium (Na+)",
          loinc: "2951-2",
          value: "139",
          unit: "mEq/L",
          range: "135 - 145 mEq/L",
          status: "normal",
          flag: "NORMAL",
          plainExplanation: "Critical electrolyte maintaining total body water balance and nerve conductivity.",
          clinicalSignificance: "Normal post-infusion electrolyte balance restored."
        },
        {
          name: "Serum Potassium (K+)",
          loinc: "2823-3",
          value: "4.2",
          unit: "mEq/L",
          range: "3.5 - 5.1 mEq/L",
          status: "normal",
          flag: "NORMAL",
          plainExplanation: "Electrolyte that regulates muscle contraction and cardiac rhythm.",
          clinicalSignificance: "Adequate potassium buffer while taking Telmisartan."
        }
      ],
      medications: [
        {
          name: "Oral Rehydration Salts (WHO formula)",
          brand: "Electral",
          dose: "1 sachet in 1 Litre water",
          frequency: "As needed over 48 hours",
          timing: "Sip throughout day",
          class: "Electrolyte Replacement",
          mechanism: "Exploits sodium-glucose co-transport in the intestinal brush border to rapidly hydrate tissues.",
          instructions: "Prepare in clean boiled and cooled water. Discard unused portion after 24 hours."
        }
      ],
      foodAlerts: [
        {
          severity: "DIETARY RECOVERY",
          type: "GI Recovery Protocol",
          title: "BRAT Diet Transition",
          detail: "After gastroenteritis, high-fiber raw vegetables or spicy foods can trigger secondary diarrhea.",
          recommendation: "Focus on soft, easily digestible foods: curd rice, bananas, steamed idlis, and clear broths for 48 hours."
        }
      ]
    }
  },

  // 7-Day Continuous Monitoring & Trend Data
  vitalsHistory: {
    dates: ["Oct 06", "Oct 07", "Oct 08", "Oct 09", "Oct 10", "Oct 11", "Oct 12 (Today)"],
    bloodPressure: {
      systolic: [136, 134, 138, 132, 130, 128, 126],
      diastolic: [88, 86, 88, 84, 82, 80, 80],
      current: "126 / 80 mmHg",
      status: "Optimal Stage",
      trend: "Improving - Down 8 mmHg Systolic post Telmisartan adherence"
    },
    heartRate: {
      bpm: [76, 78, 82, 74, 72, 70, 71],
      current: "71 BPM",
      restingAvg: "73 BPM",
      status: "Normal Sinus Rhythm",
      trend: "Stable across 7-day baseline"
    },
    glucoseCGM: {
      times: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "24:00"],
      values: [142, 168, 135, 128, 162, 138, 130, 172, 145, 132],
      current: "132 mg/dL",
      timeInRange: "74%",
      targetRange: "70 - 140 mg/dL",
      trend: "Post-prandial evening peak at 172 mg/dL (Dinner spike)"
    }
  },

  // Medication Schedule with Daily Reminders
  medicationSchedule: [
    {
      id: "med-1",
      name: "Telmisartan",
      dose: "40 mg",
      slot: "Morning",
      time: "08:00 AM",
      foodInstruction: "Before Breakfast",
      status: "taken",
      takenAt: "08:05 AM",
      category: "Blood Pressure"
    },
    {
      id: "med-2",
      name: "Metformin ER",
      dose: "500 mg",
      slot: "Morning",
      time: "08:45 AM",
      foodInstruction: "With Breakfast",
      status: "taken",
      takenAt: "08:50 AM",
      category: "Blood Sugar"
    },
    {
      id: "med-3",
      name: "Metformin ER",
      dose: "500 mg",
      slot: "Evening",
      time: "08:30 PM",
      foodInstruction: "With Dinner",
      status: "pending",
      countdown: "Due in ~6 hours",
      category: "Blood Sugar"
    },
    {
      id: "med-4",
      name: "Atorvastatin",
      dose: "10 mg",
      slot: "Bedtime",
      time: "10:30 PM",
      foodInstruction: "At Bedtime",
      status: "pending",
      countdown: "Due in ~8 hours",
      category: "Cholesterol"
    }
  ],

  // Symptom Triage Clinical Decision Engine Knowledge
  triageProtocols: {
    "fever-cough": {
      chipLabel: "Fever & Dry Cough (2 days)",
      urgency: "MODERATE",
      urgencyColor: "amber",
      urgencyText: "Moderate Urgency - Consult a General Physician within 24-48 hrs",
      considerations: [
        "Consistent with acute upper respiratory viral tract infection (URI) or early bronchitis.",
        "Because you have Type 2 Diabetes, acute infections can trigger stress hormone release and cause glucose spikes.",
        "Check blood glucose twice daily while febrile to monitor for illness-associated hyperglycemia."
      ],
      questionsForDoctor: [
        "Given my diabetes and Telmisartan medication, which antipyretic (e.g. Paracetamol 650mg) is safest for my kidneys?",
        "Should we perform an influenza rapid antigen or COVID-19 RT-PCR panel?",
        "At what temperature threshold or oxygen level should I visit the acute care facility?"
      ],
      supportiveCare: [
        "Hydration: Drink at least 2.5 to 3.0 Litres of warm fluids (herbal teas, clear vegetable broths).",
        "Steam inhalation with eucalyptus drops twice daily for 10 minutes to loosen airway secretions.",
        "Avoid OTC multi-symptom cold syrups containing pseudoephedrine or hidden sugars, as they elevate blood pressure and glucose."
      ]
    },

    "abdominal-pain": {
      chipLabel: "Sharp Right Abdominal Pain",
      urgency: "HIGH",
      urgencyColor: "rose",
      urgencyText: "HIGH URGENCY - Seek Emergency Medical Attention Immediately",
      considerations: [
        "Acute sharp pain in the right lower quadrant or right upper quadrant requires urgent clinical exclusion of acute appendicitis, cholecystitis, or acute renal colic.",
        "Do NOT take pain-masking narcotics or strong NSAIDs before doctor evaluation, as this can obscure physical examination signs (e.g. McBurney's point tenderness).",
        "Do NOT consume solid foods until evaluated in case immediate surgical or ultrasound triage is indicated."
      ],
      questionsForDoctor: [
        "Is an immediate ultrasound of the whole abdomen or contrast CT scan indicated?",
        "Are my inflammatory markers (CRP and complete blood count with differential) elevated?",
        "Could this be related to hepatobiliary issues or diabetic gastroparesis?"
      ],
      supportiveCare: [
        "Lie still in a comfortable position with knees flexed.",
        "Fast from solid meals; take only small sips of water if absolutely necessary.",
        "Proceed promptly to the nearest Emergency Department (e.g., Apollo or Care Hospital Emergency)."
      ]
    },

    "joint-stiffness": {
      chipLabel: "Joint Stiffness",
      urgency: "LOW",
      urgencyColor: "emerald",
      urgencyText: "Routine Care - Schedule Non-Urgent Outpatient Review",
      considerations: [
        "Morning joint stiffness lasting under 30 minutes is often related to mechanical wear or early osteoarthritis.",
        "Important to ensure stiffness is not related to statin-associated muscle symptoms (SAMS) from Atorvastatin.",
        "Evaluate serum uric acid level to rule out hyperuricemia or gouty arthritis."
      ],
      questionsForDoctor: [
        "Could my joint soreness be related to Atorvastatin, and should we test Serum Creatine Kinase (CPK)?",
        "Would gentle low-impact physical therapy or knee quadriceps strengthening help?",
        "Should we order a baseline serum uric acid and ESR test?"
      ],
      supportiveCare: [
        "Apply a warm compress for 15 minutes in the morning to increase blood circulation to affected joints.",
        "Engage in low-impact movement such as water aerobics or stationary cycling rather than high-impact running.",
        "Ensure adequate hydration and include anti-inflammatory foods like turmeric and ginger in your diet."
      ]
    },

    "dizziness-standing": {
      chipLabel: "Occasional Dizziness when Standing",
      urgency: "MODERATE",
      urgencyColor: "amber",
      urgencyText: "Moderate Urgency - Review Blood Pressure & Medication Dosing",
      considerations: [
        "Symptoms point toward orthostatic (postural) hypotension, where blood pressure temporarily drops upon rising.",
        "May be influenced by Telmisartan 40mg therapy, especially if hydration is sub-optimal in warm weather.",
        "Autonomic neuropathy from long-standing diabetes can also impair postural vascular reflexes."
      ],
      questionsForDoctor: [
        "Can we check my lying-to-standing orthostatic blood pressure in the clinic?",
        "Should we consider adjusting the dosage or timing of Telmisartan 40mg?",
        "Could dehydration or electrolyte shifts be contributing to this lightheadedness?"
      ],
      supportiveCare: [
        "Transition slowly: Sit at the edge of the bed for 1-2 minutes before standing up.",
        "Stay consistently hydrated with 2.8L of water daily; avoid sudden large carbohydrate meals.",
        "Perform calf raises and ankle rotations while seated to pump venous blood back up to the heart."
      ]
    }
  },

  // Holistic Recovery & Lifestyle Guidance
  holisticProtocols: {
    hydrationTarget: "2,800 mL / day",
    sleepTarget: "7.5 - 8.0 Hours / night",
    nutritionDos: [
      "Soluble Fiber: Soak 1 tsp methi (fenugreek) seeds overnight in water for morning consumption.",
      "Green Leafy Vegetables: Incorporate palak, methi leaves, and bitter gourd (karela) 3x/week.",
      "Whole Legumes: Prefer unpolished moong dal, chana, and sprouted pulses over refined pulses.",
      "Lean Proteins: Steamed fish, paneer, tofu, and egg whites to support glycemic stability.",
      "Healthy Fats: Handful of soaked almonds and walnuts; use cold-pressed mustard or olive oil in moderation."
    ],
    nutritionDonts: [
      "White Rice & Maida: Avoid high-glycemic polished grains; replace with foxtail millet, jowar, or brown rice.",
      "Sugary Drinks & Sodas: 100% eliminate packaged fruit juices, sweetened chai, and carbonated beverages.",
      "Trans Fats & Re-fried Oils: Avoid deep-fried street snacks (samosas, pakodas) to protect against LDL oxidation.",
      "Excessive Table Salt: Cap sodium intake at 2,000 mg/day (less than 1 level teaspoon) to protect kidney vasculature."
    ]
  },

  // Longitudinal Timeline
  timeline: [
    {
      id: "time-1",
      date: "Oct 08, 2026",
      type: "lab",
      badge: "Diagnostic Report",
      color: "emerald",
      title: "Comprehensive Metabolic & Lipid Panel",
      facility: "Apollo Diagnostics, Jubilee Hills",
      summary: "HbA1c observed at 7.6%, LDL at 154 mg/dL. Renal function normal (Creatinine 1.02 mg/dL).",
      details: "Report digitally signed and synced to ABDM Locker."
    },
    {
      id: "time-2",
      date: "Sep 24, 2026",
      type: "consult",
      badge: "Specialist Visit",
      color: "indigo",
      title: "Cardiology Follow-Up & Resting ECG",
      facility: "Apollo Heart Centre - Dr. S. Ranganathan",
      summary: "12-lead ECG confirmed Normal Sinus Rhythm. Telmisartan 40mg continued. Advised 30 mins brisk walking.",
      details: "No ischemic changes noted. Blood pressure in office 128/82 mmHg."
    },
    {
      id: "time-3",
      date: "Sep 15, 2026",
      type: "rx",
      badge: "Prescription Renewal",
      color: "teal",
      title: "Prescription Refill - Telmisartan & Metformin",
      facility: "Apollo Sugar Clinic",
      summary: "90-day supply dispensed. Verified zero drug-drug interaction conflicts.",
      details: "Medication adherence monitored at 94% over previous quarter."
    },
    {
      id: "time-4",
      date: "Aug 14, 2026",
      type: "hospital",
      badge: "Inpatient Observation",
      color: "rose",
      title: "Hospital Discharge - Acute Gastroenteritis",
      facility: "Care Hospitals Hi-Tech City",
      summary: "24-hr rehydration protocol completed. Oral medications resumed without complication.",
      details: "Discharge summary shared via ABDM Health Information Exchange (HIE)."
    },
    {
      id: "time-5",
      date: "Jun 10, 2026",
      type: "eye",
      badge: "Preventive Screening",
      color: "indigo",
      title: "Annual Diabetic Retinal Screening",
      facility: "L.V. Prasad Eye Institute (LVPEI)",
      summary: "Dilated fundus examination revealed no signs of diabetic retinopathy or macular edema.",
      details: "Next annual fundus exam scheduled for June 2027."
    }
  ],

  // ABDM Consent Records
  abdmConsents: [
    {
      id: "CNS-2026-881",
      requester: "Apollo Hospitals Enterprise (HIU-0012)",
      purpose: "Care Management & Periodic Review",
      dataTypes: ["DiagnosticReport", "MedicationRequest", "Condition"],
      status: "ACTIVE (Granted)",
      validUntil: "2027-01-15",
      icon: "shield-check"
    },
    {
      id: "CNS-2026-904",
      requester: "Max Healthcare Digital (HIU-0099)",
      purpose: "Second Opinion Tele-Consultation",
      dataTypes: ["DiagnosticReport"],
      status: "PENDING CONSENT",
      validUntil: "Awaiting Patient OTP",
      icon: "clock"
    }
  ],

  // Multi-Language Strings (English, Telugu, Hindi)
  translations: {
    en: {
      heroGreeting: "Welcome back, Ravi Kumar",
      healthStatusBadge: "Clinical Status: Stable with Metabolic Risk",
      lastCheckup: "Last clinical visit: Oct 08, 2026 (Apollo Diagnostics)",
      nextDosage: "Next dosage: Metformin 500mg ER with Dinner (08:30 PM)",
      ocrSectionTitle: "Section 1: Clinical Ingestion & Multimodal OCR",
      ocrSectionSub: "Drop prescriptions, doctor slips, or lab PDFs to extract LOINC biomarkers and RxNorm medications.",
      triageSectionTitle: "Section 2: Interactive Symptom Triage & Question Prep",
      triageSectionSub: "Live clinical decision support and question preparation for your doctor visit.",
      holisticSectionTitle: "Section 3: Holistic Recovery, Food Safety & Doctor Advices",
      holisticSectionSub: "Evidence-backed home care protocols and active food-drug interaction guards.",
      copilotTitle: "MediTrack AI Clinical Copilot",
      copilotSub: "Ask medical questions regarding your active report and medications",
      disclaimer: "Medical Disclaimer: MediTrack AI is an educational health copilot and clinical decision support prototype. It does not provide medical diagnoses or replace licensed clinical judgment. Always consult a qualified physician."
    },
    te: {
      heroGreeting: "తిరిగి స్వాగతం, రవి కుమార్ గారు",
      healthStatusBadge: "ఆరోగ్య స్థితి: స్థిరంగా ఉంది (జీవక్రియ సంరక్షణ అవసరం)",
      lastCheckup: "చివరి పరీక్ష తేదీ: అక్టోబర్ 08, 2026 (అపోలో డయాగ్నోస్టిక్స్)",
      nextDosage: "తదుపరి మందు: మెట్‌ఫార్మిన్ 500mg రాత్రి భోజనంతో (08:30 PM)",
      ocrSectionTitle: "విభాగం 1: క్లినికల్ ఇన్‌జెషన్ & మల్టీమోడల్ OCR",
      ocrSectionSub: "ప్రిస్క్రిప్షన్లు, డాక్టర్ చీటీలు లేదా ల్యాబ్ రిపోర్టులను అప్‌లోడ్ చేసి బయోమార్కర్లను పరిశీలించండి.",
      triageSectionTitle: "విభాగం 2: రోగ లక్షణాల విశ్లేషణ & డాక్టర్ ప్రశ్నల తయారీ",
      triageSectionSub: "మీ లక్షణాలను నమోదు చేసి తగిన అత్యవసర స్థాయి మరియు డాక్టర్‌ను అడగవలసిన ప్రశ్నలను తెలుసుకోండి.",
      holisticSectionTitle: "విభాగం 3: సమగ్ర సంరక్షణ, ఆహార భద్రత & వైద్యుల సలహాలు",
      holisticSectionSub: "మందులు-ఆహారాల మధ్య ప్రతిచర్యల హెచ్చరికలు మరియు ఆరోగ్యకరమైన జీవనశైలి మార్గదర్శకాలు.",
      copilotTitle: "మెడిట్రాక్ AI క్లినికల్ కోపైలట్",
      copilotSub: "మీ ల్యాబ్ నివేదికలు మరియు మందుల గురించి తెలుగులో అడగండి",
      disclaimer: "వైద్య నిరాకరణ: MediTrack AI అనేది అవగాహన మరియు క్లినికల్ మద్దతు కోసం మాత్రమే. ఇది వైద్య నిర్ధారణ కాదు. ఎల్లప్పుడూ అర్హత కలిగిన వైద్యుడిని సంప్రదించండి."
    },
    hi: {
      heroGreeting: "वापसी पर स्वागत है, रवि कुमार",
      healthStatusBadge: "स्वास्थ्य स्थिति: स्थिर (मेटाबोलिक देखभाल सक्रिय)",
      lastCheckup: "अंतिम जांच: 08 अक्टूबर, 2026 (अपोलो डायग्नोस्टिक्स)",
      nextDosage: "अगली खुराक: मेटफॉर्मिन 500mg रात के भोजन के साथ (08:30 PM)",
      ocrSectionTitle: "खंड 1: क्लिनिकल इनजेशन एवं मल्टीमॉडल OCR",
      ocrSectionSub: "प्रिस्क्रिप्शन या लैब रिपोर्ट अपलोड करें और बायोमार्कर व दवाओं की स्वचालित व्याख्या प्राप्त करें।",
      triageSectionTitle: "खंड 2: इंटरएक्टिव लक्षण ट्राइएज एवं डॉक्टर प्रश्न तैयारी",
      triageSectionSub: "अपने लक्षणों की जांच करें और अपने डॉक्टर से पूछने योग्य आवश्यक प्रश्नों की सूची प्राप्त करें।",
      holisticSectionTitle: "खंड 3: समग्र रिकवरी, आहार सुरक्षा एवं डॉक्टरी सलाह",
      holisticSectionSub: "प्रमाण-आधारित घरेलू देखभाल प्रोटोकॉल और सक्रिय दवा-आहार अंतःक्रिया चेतावनी।",
      copilotTitle: "मेडीट्रैक AI क्लिनिकल कोपायलट",
      copilotSub: "अपनी रिपोर्ट और दवाओं के बारे में हिंदी में कोई भी प्रश्न पूछें",
      disclaimer: "चिकित्सा अस्वीकरण: MediTrack AI एक शैक्षिक स्वास्थ्य कोपायलट और क्लिनिकल निर्णय समर्थन प्रोटोटाइप है। यह कोई चिकित्सा निदान नहीं करता। हमेशा योग्य चिकित्सक से परामर्श लें।"
    }
  }
};
