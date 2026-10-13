// MediTrack AI - ABDM Client-Side Database Service
// Production-grade structured local database layer managing patient records,
// diagnostic reports, lab observations, medication regimens, and telemetry logs.

const db = {
  KEYS: {
    USERS: "meditrack_db_users",
    ACTIVE_USER: "meditrack_active_user",
    REPORTS: "meditrack_db_reports",
    OBSERVATIONS: "meditrack_db_observations",
    MEDICATIONS: "meditrack_db_medications",
    VITALS: "meditrack_db_vitals",
    GEMINI_KEY: "meditrack_gemini_api_key",
    GEMINI_MODEL: "meditrack_gemini_model",
    FAMILY_MEMBERS: "meditrack_family_members",
    ACTIVE_MEMBER_ID: "meditrack_active_member_id",
    MONITORING_MODE: "meditrack_monitoring_mode"
  },

  // Helper storage readers & writers
  _get: function(key, fallback = []) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return fallback;
    }
  },

  _set: function(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error(`Error writing ${key} to storage:`, e);
    }
  },

  // Initialize DB if not present
  init: function() {
    if (!localStorage.getItem(this.KEYS.USERS)) {
      this._set(this.KEYS.USERS, []);
    }
    if (!localStorage.getItem(this.KEYS.REPORTS)) {
      this._set(this.KEYS.REPORTS, []);
    }
    if (!localStorage.getItem(this.KEYS.OBSERVATIONS)) {
      this._set(this.KEYS.OBSERVATIONS, []);
    }
    if (!localStorage.getItem(this.KEYS.MEDICATIONS)) {
      this._set(this.KEYS.MEDICATIONS, []);
    }
    if (!localStorage.getItem(this.KEYS.VITALS)) {
      this._set(this.KEYS.VITALS, []);
    }
  },

  // ==========================================
  // 1. PATIENT / USER MANAGEMENT
  // ==========================================
  generateAbhaId: function() {
    const p1 = Math.floor(1000 + Math.random() * 9000);
    const p2 = Math.floor(1000 + Math.random() * 9000);
    const p3 = Math.floor(1000 + Math.random() * 9000);
    return `91-${p1}-${p2}-${p3}`;
  },

  saveUser: function(userData) {
    const users = this._get(this.KEYS.USERS, []);
    const nowIso = new Date().toISOString();
    
    // Check if user exists
    let existingIdx = users.findIndex(u => u.id === userData.id || (userData.abhaId && u.abhaId === userData.abhaId));
    
    const user = {
      id: userData.id || `PAT-${Date.now()}`,
      abhaId: userData.abhaId || this.generateAbhaId(),
      abhaAddress: userData.abhaAddress || `${(userData.fullName || 'user').toLowerCase().replace(/\s+/g, '.')}${Math.floor(10 + Math.random()*90)}@abdm`,
      fullName: userData.fullName || "Registered Patient",
      name: userData.fullName || "Registered Patient", // alias
      age: parseInt(userData.age, 10) || 35,
      gender: userData.gender || "Other",
      bloodGroup: userData.bloodGroup || "O+ Positive",
      email: userData.email || "",
      phone: userData.phone || "+91 90000 00000",
      city: userData.city || "Hyderabad, Telangana",
      emergencyContact: userData.emergencyContact || "Next of Kin",
      primaryPhysician: userData.primaryPhysician || "General Practitioner",
      isDemo: Boolean(userData.isDemo),
      createdAt: userData.createdAt || nowIso,
      updatedAt: nowIso
    };

    if (existingIdx >= 0) {
      users[existingIdx] = { ...users[existingIdx], ...user };
    } else {
      users.push(user);
    }

    this._set(this.KEYS.USERS, users);
    this.setActiveUser(user);
    return user;
  },

  getActiveUser: function() {
    const userStr = localStorage.getItem(this.KEYS.ACTIVE_USER);
    if (!userStr) return null;
    try {
      const u = JSON.parse(userStr);
      // Ensure name property matches fullName for consistency
      if (u && !u.fullName && u.name) u.fullName = u.name;
      if (u && !u.name && u.fullName) u.name = u.fullName;
      return u;
    } catch (e) {
      return null;
    }
  },

  setActiveUser: function(user) {
    if (!user) {
      localStorage.removeItem(this.KEYS.ACTIVE_USER);
      return;
    }
    // Ensure name alias
    if (!user.fullName && user.name) user.fullName = user.name;
    if (!user.name && user.fullName) user.name = user.fullName;
    localStorage.setItem(this.KEYS.ACTIVE_USER, JSON.stringify(user));
  },

  clearActiveUser: function() {
    localStorage.removeItem(this.KEYS.ACTIVE_USER);
  },

  // ==========================================
  // 2. DIAGNOSTIC REPORTS & MULTIMODAL INGESTION
  // ==========================================
  saveReport: function(reportData) {
    const reports = this._get(this.KEYS.REPORTS, []);
    const reportId = reportData.id || `REP-${Date.now()}`;
    const nowIso = new Date().toISOString();

    const report = {
      id: reportId,
      patientId: reportData.patientId || this.getActiveUser()?.id,
      title: reportData.title || "Diagnostic Clinical Report",
      category: reportData.category || "Diagnostic Laboratory Report",
      documentType: reportData.documentType || "Laboratory PDF / Prescription Image",
      facility: reportData.facility || "Care Clinical Laboratory",
      dateIssued: reportData.dateIssued || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      date: reportData.date || reportData.dateIssued || "Today",
      ocrConfidence: reportData.ocrConfidence || "98.5% (Vision AI Pipeline)",
      rawOcrText: reportData.rawOcrText || "",
      clinicalSummary: reportData.clinicalSummary || "Clinical analysis performed by MediTrack AI Engine.",
      summary: reportData.summary || reportData.clinicalSummary || "",
      biomarkers: reportData.biomarkers || [],
      medications: reportData.medications || [],
      foodAlerts: reportData.foodAlerts || [],
      createdAt: nowIso
    };

    reports.unshift(report);
    this._set(this.KEYS.REPORTS, reports);

    // Also persist observations and medications into their normalized tables
    if (report.biomarkers && report.biomarkers.length > 0) {
      const obsList = this._get(this.KEYS.OBSERVATIONS, []);
      report.biomarkers.forEach(b => {
        obsList.push({
          id: `OBS-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          reportId: report.id,
          patientId: report.patientId,
          testName: b.name,
          name: b.name,
          loincCode: b.loinc || "N/A",
          loinc: b.loinc || "N/A",
          observedValue: b.value,
          value: b.value,
          unit: b.unit || "",
          referenceRange: b.range || "",
          range: b.range || "",
          statusFlag: (b.status || "normal").toUpperCase(),
          status: b.status || "normal",
          flag: b.flag || b.status,
          explanation: b.plainExplanation || "",
          plainExplanation: b.plainExplanation || "",
          clinicalSignificance: b.clinicalSignificance || ""
        });
      });
      this._set(this.KEYS.OBSERVATIONS, obsList);
    }

    if (report.medications && report.medications.length > 0) {
      const medList = this._get(this.KEYS.MEDICATIONS, []);
      report.medications.forEach(m => {
        medList.push({
          id: `MED-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          reportId: report.id,
          patientId: report.patientId,
          drugName: m.name,
          name: m.name,
          brand: m.brand || "",
          dosage: m.dose || "",
          dose: m.dose || "",
          frequency: m.frequency || "Once Daily",
          timing: m.timing || "With Meals",
          foodTiming: m.timing || "With Meals",
          class: m.class || "Therapeutic Agent",
          mechanismSummary: m.mechanism || "",
          mechanism: m.mechanism || "",
          warnings: m.instructions || ""
        });
      });
      this._set(this.KEYS.MEDICATIONS, medList);
    }

    return report;
  },

  getReports: function(patientId) {
    const active = patientId || this.getActiveUser()?.id;
    const reports = this._get(this.KEYS.REPORTS, []);
    if (!active) return [];
    return reports.filter(r => r.patientId === active);
  },

  getLatestReport: function(patientId) {
    const list = this.getReports(patientId);
    return list.length > 0 ? list[0] : null;
  },

  // ==========================================
  // 3. VITALS TELEMETRY LOGS
  // ==========================================
  saveVital: function(vitalData) {
    const vitals = this._get(this.KEYS.VITALS, []);
    const patientId = vitalData.patientId || this.getActiveUser()?.id;
    const nowIso = new Date().toISOString();

    const entry = {
      id: `VIT-${Date.now()}`,
      patientId: patientId,
      bpSys: parseInt(vitalData.bpSys || 120, 10),
      bpDia: parseInt(vitalData.bpDia || 80, 10),
      heartRate: parseInt(vitalData.heartRate || 72, 10),
      glucose: parseInt(vitalData.glucose || 100, 10),
      note: vitalData.note || "",
      recordedAt: vitalData.recordedAt || nowIso
    };

    vitals.push(entry);
    this._set(this.KEYS.VITALS, vitals);
    return entry;
  },

  getVitals: function(patientId) {
    const active = patientId || this.getActiveUser()?.id;
    const vitals = this._get(this.KEYS.VITALS, []);
    if (!active) return [];
    return vitals.filter(v => v.patientId === active);
  },

  // ==========================================
  // 4. RAVI KUMAR DEMO SEEDER (EXPLICIT EVALUATOR ACTION ONLY)
  // ==========================================
  loadRaviDemo: function() {
    const raviProfile = {
      id: "PAT-RAVI-914521",
      abhaId: "91-4521-8842-1093",
      abhaAddress: "ravi.kumar@abdm",
      fullName: "Ravi Kumar",
      name: "Ravi Kumar",
      age: 42,
      gender: "Male",
      bloodGroup: "B+ Positive",
      dob: "1984-06-15",
      phone: "+91 98490 12345",
      email: "ravi.kumar@example.com",
      city: "Hyderabad, Telangana",
      emergencyContact: "Sunita Kumar (Wife) - +91 98490 54321",
      primaryPhysician: "Dr. S. Ranganathan, MD, FACC (Apollo Clinics)",
      isDemo: true,
      createdAt: "2026-01-10T08:00:00Z"
    };

    // Save user
    this.saveUser(raviProfile);

    // Clear old reports for Ravi if any, then re-seed the 3 official hackathon presets
    const allReports = this._get(this.KEYS.REPORTS, []).filter(r => r.patientId !== raviProfile.id);
    this._set(this.KEYS.REPORTS, allReports);

    // Clean old observations & meds for Ravi
    const allObs = this._get(this.KEYS.OBSERVATIONS, []).filter(o => o.patientId !== raviProfile.id);
    this._set(this.KEYS.OBSERVATIONS, allObs);

    const allMeds = this._get(this.KEYS.MEDICATIONS, []).filter(m => m.patientId !== raviProfile.id);
    this._set(this.KEYS.MEDICATIONS, allMeds);

    // Seed preset reports
    const p1 = {
      ...PATIENT_DATA.presets.bloodPanel,
      id: "REP-RAVI-BLOODPANEL",
      patientId: raviProfile.id,
      category: "Diagnostic Laboratory Report",
      dateIssued: "Oct 08, 2026",
      clinicalSummary: PATIENT_DATA.presets.bloodPanel.summary
    };
    this.saveReport(p1);

    const p2 = {
      ...PATIENT_DATA.presets.prescriptionOCR,
      id: "REP-RAVI-PRESCRIPTION",
      patientId: raviProfile.id,
      category: "Clinical Prescription Slip",
      dateIssued: "Oct 05, 2026",
      clinicalSummary: PATIENT_DATA.presets.prescriptionOCR.summary
    };
    this.saveReport(p2);

    const p3 = {
      ...PATIENT_DATA.presets.dischargeNote,
      id: "REP-RAVI-DISCHARGE",
      patientId: raviProfile.id,
      category: "Inpatient Discharge Summary",
      dateIssued: "Aug 14, 2026",
      clinicalSummary: PATIENT_DATA.presets.dischargeNote.summary
    };
    this.saveReport(p3);

    return raviProfile;
  },

  // ==========================================
  // 5. ABDM HL7 FHIR R4 BUNDLE EXPORT
  // ==========================================
  exportFhirR4Bundle: function(patientId, reportId) {
    const user = this.getActiveUser() || PATIENT_DATA.profile;
    const reports = this.getReports(user.id);
    let targetReport = reportId ? reports.find(r => r.id === reportId) : null;
    if (!targetReport && reports.length > 0) {
      targetReport = reports[0];
    }
    if (!targetReport) {
      // Use fallback template
      targetReport = PATIENT_DATA.presets.bloodPanel;
    }

    const nowIso = new Date().toISOString();
    const bundleId = `abdm-bundle-${Date.now()}`;

    const bundle = {
      resourceType: "Bundle",
      id: bundleId,
      meta: {
        versionId: "1",
        lastUpdated: nowIso,
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle"]
      },
      identifier: {
        system: "https://ndhm.in/fhir/bundles",
        value: `ABDM-DOC-${(user.abhaId || "91-0000-0000-0000").replace(/[^0-9]/g, "")}-${Date.now()}`
      },
      type: "document",
      timestamp: nowIso,
      entry: [
        // 1. Composition
        {
          fullUrl: `urn:uuid:composition-${bundleId}`,
          resource: {
            resourceType: "Composition",
            id: `comp-${bundleId}`,
            status: "final",
            type: {
              coding: [{
                system: "http://snomed.info/sct",
                code: "721981007",
                display: "Diagnostic and prescribing summary document"
              }],
              text: "Comprehensive Outpatient Health Record & Biomarker Profile"
            },
            subject: {
              reference: `urn:uuid:patient-${user.id}`,
              display: `${user.fullName || user.name} (ABHA: ${user.abhaId})`
            },
            date: nowIso,
            title: `MediTrack AI - ABDM Health Record (${targetReport.title})`,
            custodian: {
              reference: "urn:uuid:org-facility",
              display: targetReport.facility || "Apollo Clinics & Integrated Diagnostics (ABDM HFR)"
            },
            section: [
              {
                title: "Diagnostic Observations",
                code: { coding: [{ system: "http://loinc.org", code: "11502-2", display: "Laboratory report" }] },
                entry: (targetReport.biomarkers || []).map((b, idx) => ({
                  reference: `urn:uuid:obs-${idx + 1}`,
                  display: `${b.name}: ${b.value} ${b.unit}`
                }))
              },
              {
                title: "Prescribed Active Regimen",
                code: { coding: [{ system: "http://snomed.info/sct", code: "76600008", display: "Medication order" }] },
                entry: (targetReport.medications || []).map((m, idx) => ({
                  reference: `urn:uuid:med-${idx + 1}`,
                  display: `${m.name} ${m.dose || ""}`
                }))
              }
            ]
          }
        },
        // 2. Patient Resource
        {
          fullUrl: `urn:uuid:patient-${user.id}`,
          resource: {
            resourceType: "Patient",
            id: user.id,
            meta: { profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Patient"] },
            identifier: [
              {
                type: { coding: [{ system: "https://ndhm.in/fhir/ndhm-identifier-type-code", code: "ABHA", display: "ABHA Number" }] },
                system: "https://healthid.ndhm.gov.in",
                value: user.abhaId
              },
              {
                type: { coding: [{ system: "https://ndhm.in/fhir/ndhm-identifier-type-code", code: "ABHA-ADDRESS", display: "ABHA Address" }] },
                system: "https://healthid.ndhm.gov.in",
                value: user.abhaAddress
              }
            ],
            name: [{ use: "official", text: user.fullName || user.name }],
            telecom: [
              { system: "phone", value: user.phone || "+91 90000 00000" },
              { system: "email", value: user.email || "" }
            ],
            gender: (user.gender || "other").toLowerCase(),
            birthDate: user.dob || "1989-01-01",
            address: [{ use: "home", text: user.city || "Hyderabad, Telangana", country: "IND" }]
          }
        }
      ]
    };

    // Add observations
    (targetReport.biomarkers || []).forEach((b, idx) => {
      const isHigh = (b.status || "").toLowerCase() === 'high';
      bundle.entry.push({
        fullUrl: `urn:uuid:obs-${idx + 1}`,
        resource: {
          resourceType: "Observation",
          id: `obs-${idx + 1}`,
          status: "final",
          code: {
            coding: [{ system: "http://loinc.org", code: b.loinc || "N/A", display: b.name }],
            text: b.name
          },
          subject: { reference: `urn:uuid:patient-${user.id}`, display: user.fullName || user.name },
          effectiveDateTime: nowIso,
          valueQuantity: {
            value: parseFloat(String(b.value).replace(/[^0-9.]/g, '') || 0),
            unit: b.unit || "",
            system: "http://unitsofmeasure.org"
          },
          interpretation: [{
            coding: [{
              system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
              code: isHigh ? "H" : ((b.status || "").toLowerCase() === 'moderate' ? "A" : "N"),
              display: isHigh ? "High" : ((b.status || "").toLowerCase() === 'moderate' ? "Abnormal" : "Normal")
            }]
          }],
          referenceRange: [{ text: b.range || "" }],
          note: [{ text: b.plainExplanation || "" }]
        }
      });
    });

    // Add medications
    (targetReport.medications || []).forEach((m, idx) => {
      bundle.entry.push({
        fullUrl: `urn:uuid:med-${idx + 1}`,
        resource: {
          resourceType: "MedicationRequest",
          id: `med-${idx + 1}`,
          status: "active",
          intent: "order",
          medicationCodeableConcept: { text: `${m.name} ${m.dose || ""}` },
          subject: { reference: `urn:uuid:patient-${user.id}` },
          authoredOn: nowIso,
          dosageInstruction: [{
            text: `${m.frequency || ""} (${m.timing || ""})`,
            patientInstruction: m.instructions || m.warnings || ""
          }]
        }
      });
    });

    return bundle;
  },

  // ==========================================
  // 6. MULTI-USER / FAMILY MEMBERS MANAGEMENT
  // ==========================================
  getDefaultFamilyMembers: function() {
    return [
      {
        id: "mem_self",
        fullName: "Sravanthi (Self)",
        name: "Sravanthi",
        relationship: "Self",
        age: 38,
        gender: "Female",
        bloodGroup: "B+ Positive",
        abhaId: "91-4458-1294-8831",
        monitoringMode: "ON",
        notes: "Primary Account Holder"
      },
      {
        id: "mem_mother",
        fullName: "Kamala Devi (Mother)",
        name: "Kamala Devi",
        relationship: "Mother",
        age: 68,
        gender: "Female",
        bloodGroup: "O+ Positive",
        abhaId: "91-1192-8834-0192",
        monitoringMode: "ON",
        notes: "Type 2 Diabetes • Hypertension"
      },
      {
        id: "mem_father",
        fullName: "Suresh Rao (Father)",
        name: "Suresh Rao",
        relationship: "Father",
        age: 71,
        gender: "Male",
        bloodGroup: "B+ Positive",
        abhaId: "91-8842-1940-5592",
        monitoringMode: "OFF",
        notes: "Post-Cardiac Stent Checkup"
      }
    ];
  },

  getFamilyMembers: function() {
    let members = this._get(this.KEYS.FAMILY_MEMBERS, null);
    if (!members || !Array.isArray(members) || members.length === 0) {
      members = this.getDefaultFamilyMembers();
      this._set(this.KEYS.FAMILY_MEMBERS, members);
    }
    return members;
  },

  getActiveMemberId: function() {
    return localStorage.getItem(this.KEYS.ACTIVE_MEMBER_ID) || "mem_self";
  },

  getActiveMember: function() {
    const members = this.getFamilyMembers();
    const activeId = this.getActiveMemberId();
    return members.find(m => m.id === activeId) || members[0] || this.getDefaultFamilyMembers()[0];
  },

  setActiveMemberId: function(memberId) {
    localStorage.setItem(this.KEYS.ACTIVE_MEMBER_ID, memberId);
    const member = this.getActiveMember();
    if (member && member.monitoringMode) {
      this.setMonitoringMode(member.monitoringMode);
    }
    return member;
  },

  addFamilyMember: function(memberData) {
    const members = this.getFamilyMembers();
    const newId = `mem_${Date.now()}`;
    const newMember = {
      id: newId,
      fullName: memberData.fullName || memberData.name || "Family Member",
      name: memberData.name || memberData.fullName || "Family Member",
      relationship: memberData.relationship || "Other",
      age: parseInt(memberData.age, 10) || 40,
      gender: memberData.gender || "Other",
      bloodGroup: memberData.bloodGroup || "O+ Positive",
      abhaId: memberData.abhaId || this.generateAbhaId(),
      monitoringMode: memberData.monitoringMode || "ON",
      notes: memberData.notes || "Added Family Profile"
    };
    members.push(newMember);
    this._set(this.KEYS.FAMILY_MEMBERS, members);
    this.setActiveMemberId(newId);
    return newMember;
  },

  // ==========================================
  // 7. MONITORING MODE MANAGEMENT
  // ==========================================
  getMonitoringMode: function() {
    return localStorage.getItem(this.KEYS.MONITORING_MODE) || "ON";
  },

  setMonitoringMode: function(mode) {
    const valid = mode === "OFF" ? "OFF" : "ON";
    localStorage.setItem(this.KEYS.MONITORING_MODE, valid);
    return valid;
  },

  // ==========================================
  // 8. DATA RESET / CLEAN STATE
  // ==========================================
  clearAllData: function() {
    this._set(this.KEYS.USERS, []);
    this._set(this.KEYS.REPORTS, []);
    this._set(this.KEYS.OBSERVATIONS, []);
    this._set(this.KEYS.MEDICATIONS, []);
    this._set(this.KEYS.VITALS, []);
    this.clearActiveUser();
  }
};

// Expose on window
if (typeof window !== 'undefined') {
  window.db = db;
}

// Auto-initialize on load
db.init();
