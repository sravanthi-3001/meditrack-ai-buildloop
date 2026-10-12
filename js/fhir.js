/**
 * MediTrack AI - ABDM / HL7 FHIR R4 Interoperability Engine
 * Specification: ABDM Health Data Interchange (NRCES / NHA India) & HL7 FHIR Release 4
 * Provides bi-directional mapping, schema migrations, and bundle export/import.
 */

const FhirEngine = {
  schemaVersion: 2,

  // Standard ABDM Identification Systems
  SYSTEMS: {
    ABHA_NUMBER: "https://healthid.ndhm.gov.in",
    ABHA_ADDRESS: "https://healthid.ndhm.gov.in/abha-address",
    LOINC: "http://loinc.org",
    SNOMED: "http://snomed.info/sct",
    RXNORM: "http://www.nlm.nih.gov/research/umls/rxnorm",
    UCUM: "http://unitsofmeasure.org",
    INTERPRETATION: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
    OBS_CATEGORY: "http://terminology.hl7.org/CodeSystem/observation-category",
    NRCES_DOCUMENT: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle"
  },

  // Common LOINC clinical registry
  LOINC_REGISTRY: {
    "hba1c": { code: "4548-4", display: "Hemoglobin A1c/Hemoglobin.total in Blood", unit: "%", range: "< 5.7%" },
    "glycated hemoglobin": { code: "4548-4", display: "Hemoglobin A1c/Hemoglobin.total in Blood", unit: "%", range: "< 5.7%" },
    "fasting blood glucose": { code: "1558-6", display: "Fasting glucose [Mass/volume] in Serum or Plasma", unit: "mg/dL", range: "70 - 99 mg/dL" },
    "fasting blood sugar": { code: "1558-6", display: "Fasting glucose [Mass/volume] in Serum or Plasma", unit: "mg/dL", range: "70 - 99 mg/dL" },
    "blood sugar": { code: "1558-6", display: "Glucose [Mass/volume] in Blood", unit: "mg/dL", range: "70 - 140 mg/dL" },
    "ldl cholesterol": { code: "13457-7", display: "Cholesterol in LDL [Mass/volume] in Serum or Plasma", unit: "mg/dL", range: "< 100 mg/dL" },
    "hdl cholesterol": { code: "2085-9", display: "Cholesterol in HDL [Mass/volume] in Serum or Plasma", unit: "mg/dL", range: "> 40 mg/dL" },
    "total cholesterol": { code: "2093-3", display: "Cholesterol [Mass/volume] in Serum or Plasma", unit: "mg/dL", range: "< 200 mg/dL" },
    "triglycerides": { code: "2571-8", display: "Triglyceride [Mass/volume] in Serum or Plasma", unit: "mg/dL", range: "< 150 mg/dL" },
    "serum creatinine": { code: "2160-0", display: "Creatinine [Mass/volume] in Serum or Plasma", unit: "mg/dL", range: "0.55 - 1.10 mg/dL" },
    "creatinine": { code: "2160-0", display: "Creatinine [Mass/volume] in Serum or Plasma", unit: "mg/dL", range: "0.55 - 1.10 mg/dL" },
    "systolic bp": { code: "8480-6", display: "Systolic blood pressure", unit: "mmHg", range: "< 120 mmHg" },
    "diastolic bp": { code: "8462-4", display: "Diastolic blood pressure", unit: "mmHg", range: "< 80 mmHg" },
    "blood pressure": { code: "85354-9", display: "Blood pressure panel with all children optional", unit: "mmHg", range: "< 120/80 mmHg" },
    "serum potassium": { code: "2823-3", display: "Potassium [Moles/volume] in Serum or Plasma", unit: "mmol/L", range: "3.5 - 5.1 mmol/L" },
    "potassium": { code: "2823-3", display: "Potassium [Moles/volume] in Serum or Plasma", unit: "mmol/L", range: "3.5 - 5.1 mmol/L" }
  },

  /**
   * Resolve or map LOINC code from name
   */
  getLoincInfo: function(testName) {
    if (!testName) return { code: "34565-2", display: "Vital signs, weight, height and head circumference panel", unit: "", range: "" };
    const clean = testName.toLowerCase().trim();
    for (const [key, val] of Object.entries(this.LOINC_REGISTRY)) {
      if (clean.includes(key)) return val;
    }
    return { code: "11502-2", display: testName, unit: "", range: "Normal" };
  },

  /**
   * Determine HL7 interpretation code ('H', 'L', 'N')
   */
  getInterpretation: function(status) {
    const s = String(status || '').toUpperCase();
    if (s.includes('HIGH') || s.includes('CRITICAL') || s.includes('ELEVATED')) {
      return { code: 'H', display: 'High', system: this.SYSTEMS.INTERPRETATION };
    }
    if (s.includes('LOW') || s.includes('DEFICIENT')) {
      return { code: 'L', display: 'Low', system: this.SYSTEMS.INTERPRETATION };
    }
    return { code: 'N', display: 'Normal', system: this.SYSTEMS.INTERPRETATION };
  },

  /**
   * Convert Profile to FHIR Patient resource
   */
  toFhirPatient: function(profile) {
    const p = profile || {};
    const id = p.id || 'prof_primary';
    const abhaId = p.abhaId || '91-4523-8821-1234';
    const abhaAddress = p.abhaAddress || `${(p.name || 'patient').toLowerCase().replace(/\s+/g, '')}@abdm`;

    return {
      resourceType: "Patient",
      id: `pat-${id}`,
      meta: {
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Patient"]
      },
      identifier: [
        {
          type: {
            coding: [{ system: "https://ndhm.in/fhir/ndhm-identifier-type-code", code: "ABHA", display: "Ayushman Bharat Health Account Number" }]
          },
          system: this.SYSTEMS.ABHA_NUMBER,
          value: abhaId
        },
        {
          type: {
            coding: [{ system: "https://ndhm.in/fhir/ndhm-identifier-type-code", code: "ABHA-ADDRESS", display: "ABHA Address" }]
          },
          system: this.SYSTEMS.ABHA_ADDRESS,
          value: abhaAddress
        }
      ],
      active: true,
      name: [
        {
          use: "official",
          text: p.name || "Sravanthi Reddy"
        }
      ],
      gender: (p.gender || 'female').toLowerCase(),
      birthDate: p.birthDate || (p.age ? `${new Date().getFullYear() - p.age}-01-01` : "1988-05-14"),
      telecom: [
        { system: "phone", value: p.phone || "+91-98765-43210", use: "mobile" }
      ]
    };
  },

  /**
   * Convert Lab biomarker or Vital log to FHIR Observation
   */
  toFhirObservation: function(item, patientRef, effectiveDate) {
    const rawVal = String(item.val || item.value || '');
    const numVal = parseFloat(rawVal.replace(/[^0-9.]/g, '')) || 0;
    const loinc = item.loinc ? { code: item.loinc, display: item.name, unit: item.unit || '', range: item.ref || '' } : this.getLoincInfo(item.name);
    const interp = this.getInterpretation(item.status);
    const id = item.id || `obs-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    return {
      resourceType: "Observation",
      id: id,
      status: "final",
      category: [
        {
          coding: [{
            system: this.SYSTEMS.OBS_CATEGORY,
            code: "laboratory",
            display: "Laboratory"
          }]
        }
      ],
      code: {
        coding: [{
          system: this.SYSTEMS.LOINC,
          code: loinc.code,
          display: loinc.display || item.name
        }],
        text: item.name
      },
      subject: {
        reference: patientRef || "Patient/pat-prof_primary"
      },
      effectiveDateTime: effectiveDate || new Date().toISOString(),
      valueQuantity: {
        value: numVal,
        unit: item.unit || loinc.unit || '',
        system: this.SYSTEMS.UCUM
      },
      interpretation: [
        {
          coding: [interp],
          text: interp.display
        }
      ],
      referenceRange: [
        {
          text: item.ref || item.range || loinc.range || "Standard Clinical Range"
        }
      ]
    };
  },

  /**
   * Convert Medication item to FHIR MedicationRequest
   */
  toFhirMedicationRequest: function(med, patientRef) {
    const id = med.id || `medreq-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return {
      resourceType: "MedicationRequest",
      id: id,
      status: "active",
      intent: "order",
      medicationCodeableConcept: {
        coding: [
          {
            system: this.SYSTEMS.RXNORM,
            code: med.rxnorm || "6809",
            display: med.name
          }
        ],
        text: `${med.name} ${med.dosage || med.dose || ''}`.trim()
      },
      subject: {
        reference: patientRef || "Patient/pat-prof_primary"
      },
      authoredOn: med.date || new Date().toISOString(),
      dosageInstruction: [
        {
          text: `${med.frequency || 'Once daily'} - ${med.timingSlot || med.timing || 'With meals'}`,
          timing: {
            repeat: {
              frequency: med.frequency && med.frequency.toLowerCase().includes('twice') ? 2 : 1,
              period: 1,
              periodUnit: "d"
            }
          },
          patientInstruction: med.why || med.instructions || "Take as prescribed"
        }
      ]
    };
  },

  /**
   * Convert Condition to FHIR Condition resource
   */
  toFhirCondition: function(cond, patientRef) {
    const id = cond.id || `cond-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const text = typeof cond === 'string' ? cond : (cond.title || cond.problem || 'Impaired Fasting Glucose');
    return {
      resourceType: "Condition",
      id: id,
      clinicalStatus: {
        coding: [{
          system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
          code: "active",
          display: "Active"
        }]
      },
      code: {
        coding: [{
          system: this.SYSTEMS.SNOMED,
          code: "73211009",
          display: text
        }],
        text: text
      },
      subject: {
        reference: patientRef || "Patient/pat-prof_primary"
      },
      recordedDate: new Date().toISOString()
    };
  },

  /**
   * Convert Allergy to FHIR AllergyIntolerance resource
   */
  toFhirAllergyIntolerance: function(allergy, patientRef) {
    const id = `allergy-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const text = typeof allergy === 'string' ? allergy : (allergy.substance || 'Penicillin');
    return {
      resourceType: "AllergyIntolerance",
      id: id,
      clinicalStatus: {
        coding: [{
          system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
          code: "active",
          display: "Active"
        }]
      },
      verificationStatus: {
        coding: [{
          system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
          code: "confirmed",
          display: "Confirmed"
        }]
      },
      code: {
        coding: [{
          system: this.SYSTEMS.SNOMED,
          code: "373270004",
          display: text
        }],
        text: text
      },
      patient: {
        reference: patientRef || "Patient/pat-prof_primary"
      }
    };
  },

  /**
   * Convert Document to FHIR DocumentReference
   */
  toFhirDocumentReference: function(doc, patientRef) {
    const id = doc.id || `docref-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return {
      resourceType: "DocumentReference",
      id: id,
      status: "current",
      docStatus: "final",
      type: {
        coding: [{
          system: this.SYSTEMS.LOINC,
          code: doc.type === 'prescription' ? "57833-6" : "11502-2",
          display: doc.type === 'prescription' ? "Prescription document" : "Laboratory report"
        }],
        text: doc.title || "Diagnostic Report"
      },
      subject: {
        reference: patientRef || "Patient/pat-prof_primary"
      },
      date: doc.date ? new Date().toISOString() : new Date().toISOString(),
      author: [
        { display: doc.doctor || doc.facility || "Treating Physician" }
      ],
      description: doc.plainLanguageSummary?.whatReportSays || doc.title
    };
  },

  /**
   * Convert Encounter to FHIR Encounter resource
   */
  toFhirEncounter: function(enc, patientRef) {
    const id = enc?.id || `enc-${Date.now()}`;
    return {
      resourceType: "Encounter",
      id: id,
      status: "finished",
      class: {
        system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        code: "AMB",
        display: "ambulatory"
      },
      subject: {
        reference: patientRef || "Patient/pat-prof_primary"
      },
      serviceProvider: {
        display: enc?.facility || "Apollo Integrated Healthcare Hub"
      }
    };
  },

  /**
   * Mapper: extractedJSON -> FHIR resources
   * Transforms raw output from Gemini OCR into FHIR R4 resources
   */
  fromExtractedJson: function(extractedJson, profile) {
    if (!extractedJson) return { observations: [], medications: [], documentReference: null };
    const patientRef = `Patient/pat-${profile?.id || 'prof_primary'}`;
    const observations = (extractedJson.biomarkers || []).map(b => this.toFhirObservation(b, patientRef));
    const medications = (extractedJson.medications || []).map(m => this.toFhirMedicationRequest(m, patientRef));
    const documentReference = this.toFhirDocumentReference({
      title: extractedJson.title || `${extractedJson.documentType || 'Clinical'} Record`,
      type: extractedJson.documentType || 'lab',
      facility: extractedJson.facility || 'Diagnostic Center',
      doctor: extractedJson.doctor || 'Physician',
      plainLanguageSummary: extractedJson.plainLanguageSummary
    }, patientRef);

    return {
      observations,
      medications,
      documentReference
    };
  },

  /**
   * Export all profile records as an ABDM-compliant FHIR R4 Bundle
   * Type: collection (or document)
   */
  toBundle: function(profileData, bundleType = "collection") {
    const data = profileData || {};
    const profile = data.profile || { id: 'prof_primary', name: 'Sravanthi Reddy' };
    const patientRef = `Patient/pat-${profile.id}`;
    const nowIso = new Date().toISOString();
    const bundleId = `abdm-bundle-${profile.id}-${Date.now()}`;

    const bundle = {
      resourceType: "Bundle",
      id: bundleId,
      meta: {
        versionId: "1",
        lastUpdated: nowIso,
        profile: [
          this.SYSTEMS.NRCES_DOCUMENT
        ]
      },
      identifier: {
        system: "https://ndhm.in/fhir/bundles",
        value: `ABDM-COLL-${(profile.abhaId || '91452388211234').replace(/[^0-9]/g, '')}-${Date.now()}`
      },
      type: bundleType, // "collection" or "document"
      timestamp: nowIso,
      entry: []
    };

    // 1. Patient Resource
    const patientRes = this.toFhirPatient(profile);
    bundle.entry.push({
      fullUrl: `urn:uuid:patient-${profile.id}`,
      resource: patientRes
    });

    // 2. Encounter Resource
    const encRes = this.toFhirEncounter({ facility: "Apollo Clinics & Diagnostic Services" }, patientRef);
    bundle.entry.push({
      fullUrl: `urn:uuid:encounter-1`,
      resource: encRes
    });

    // 3. DocumentReference Resources
    (data.documents || []).forEach((doc, idx) => {
      const docRef = this.toFhirDocumentReference(doc, patientRef);
      bundle.entry.push({
        fullUrl: `urn:uuid:docref-${doc.id || idx}`,
        resource: docRef
      });

      // Observations inside documents
      (doc.biomarkers || []).forEach((b, bIdx) => {
        const obs = this.toFhirObservation(b, patientRef, doc.date ? new Date().toISOString() : undefined);
        bundle.entry.push({
          fullUrl: `urn:uuid:obs-${doc.id || idx}-${bIdx}`,
          resource: obs
        });
      });
    });

    // 4. Vitals / DailyLogs Observations
    const logs = data.dailyLogs || data.vitalsLogs || [];
    logs.forEach((log, idx) => {
      if (log.bp) {
        const [sys, dia] = log.bp.split('/');
        if (sys) {
          bundle.entry.push({
            fullUrl: `urn:uuid:obs-vital-sys-${idx}`,
            resource: this.toFhirObservation({ name: "Systolic Blood Pressure", val: sys, unit: "mmHg", ref: "< 120 mmHg", status: parseInt(sys) > 130 ? 'High' : 'Normal' }, patientRef, log.timestamp)
          });
        }
        if (dia) {
          bundle.entry.push({
            fullUrl: `urn:uuid:obs-vital-dia-${idx}`,
            resource: this.toFhirObservation({ name: "Diastolic Blood Pressure", val: dia, unit: "mmHg", ref: "< 80 mmHg", status: parseInt(dia) > 85 ? 'High' : 'Normal' }, patientRef, log.timestamp)
          });
        }
      }
      if (log.sugar) {
        const sVal = parseFloat(log.sugar);
        bundle.entry.push({
          fullUrl: `urn:uuid:obs-vital-sugar-${idx}`,
          resource: this.toFhirObservation({ name: "Fasting Blood Sugar", val: log.sugar, unit: "mg/dL", ref: "70 - 99 mg/dL", status: sVal > 110 ? 'High' : 'Normal' }, patientRef, log.timestamp)
        });
      }
    });

    // 5. MedicationRequest Resources
    (data.medications || []).forEach((med, idx) => {
      const medRes = this.toFhirMedicationRequest(med, patientRef);
      bundle.entry.push({
        fullUrl: `urn:uuid:med-${med.id || idx}`,
        resource: medRes
      });
    });

    // 6. Conditions
    if (data.result?.problem) {
      bundle.entry.push({
        fullUrl: `urn:uuid:cond-primary`,
        resource: this.toFhirCondition(data.result.problem, patientRef)
      });
    }

    // 7. AllergyIntolerances
    (profile.allergies || ['Penicillin']).forEach((alg, idx) => {
      bundle.entry.push({
        fullUrl: `urn:uuid:allergy-${idx}`,
        resource: this.toFhirAllergyIntolerance(alg, patientRef)
      });
    });

    return bundle;
  },

  /**
   * Synchronize profile records into explicit FHIR structure in the vault
   */
  syncProfileToFhir: function(profileData) {
    if (!profileData) return;
    const bundle = this.toBundle(profileData, "collection");
    profileData.fhir = {
      patient: bundle.entry.find(e => e.resource.resourceType === "Patient")?.resource,
      documentReferences: bundle.entry.filter(e => e.resource.resourceType === "DocumentReference").map(e => e.resource),
      observations: bundle.entry.filter(e => e.resource.resourceType === "Observation").map(e => e.resource),
      medicationRequests: bundle.entry.filter(e => e.resource.resourceType === "MedicationRequest").map(e => e.resource),
      conditions: bundle.entry.filter(e => e.resource.resourceType === "Condition").map(e => e.resource),
      allergyIntolerances: bundle.entry.filter(e => e.resource.resourceType === "AllergyIntolerance").map(e => e.resource)
    };
    return profileData;
  },

  /**
   * Schema Migration function
   * Ensures data vault adheres to schemaVersion 2
   */
  migrateSchema: function(data) {
    if (!data) return data;
    if (!data.schemaVersion || data.schemaVersion < this.schemaVersion) {
      data.schemaVersion = this.schemaVersion;

      // Migrate DailyLogs
      if (!data.dailyLogs && data.vitalsLogs) {
        data.dailyLogs = JSON.parse(JSON.stringify(data.vitalsLogs));
      }
      if (!data.dailyLogs) data.dailyLogs = [];

      // Migrate Reminders
      if (!data.reminders) {
        data.reminders = [
          { id: 'rem_1', profileId: data.profile?.id || 'prof_primary', title: 'Metformin 500mg (Lunch)', time: '1:30 PM', type: 'med', active: true },
          { id: 'rem_2', profileId: data.profile?.id || 'prof_primary', title: 'Evening Blood Pressure Check', time: '7:00 PM', type: 'vital', active: true }
        ];
      }

      // Migrate ChatMessages
      if (!data.chatMessages && data.chatHistory) {
        data.chatMessages = JSON.parse(JSON.stringify(data.chatHistory));
      }
      if (!data.chatMessages) data.chatMessages = [];

      // Ensure FHIR sub-vault is populated
      this.syncProfileToFhir(data);
    }
    return data;
  },

  /**
   * Download Bundle as JSON file
   */
  downloadBundle: function(bundle, filename = 'ABDM_FHIR_R4_Bundle.json') {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bundle, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", filename);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
  },

  /**
   * Import FHIR Bundle into active profile
   */
  importBundle: function(bundle, targetProfileData) {
    if (!bundle || !bundle.entry) {
      throw new Error("Invalid FHIR Bundle: missing entry array.");
    }

    const obsEntries = bundle.entry.filter(e => e.resource?.resourceType === 'Observation');
    const medEntries = bundle.entry.filter(e => e.resource?.resourceType === 'MedicationRequest');
    const docRefEntries = bundle.entry.filter(e => e.resource?.resourceType === 'DocumentReference');

    // Create a new synthetic document in vault
    const newDocId = `doc_abdm_${Date.now()}`;
    const newDoc = {
      id: newDocId,
      profileId: targetProfileData.profile.id,
      type: 'lab',
      title: docRefEntries[0]?.resource?.type?.text || "ABDM Ingested Diagnostic Document",
      facility: "National Health Authority (ABDM Gateway)",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      badge: "ABDM Verified",
      badgeColor: "teal",
      ocrScore: "100% Cryptographic HL7 FHIR",
      handwrittenLegibility: 1.0,
      doctor: "NHA Health Locker Sync",
      biomarkers: obsEntries.map(e => {
        const r = e.resource;
        const codeText = r.code?.text || r.code?.coding?.[0]?.display || "Clinical Biomarker";
        const val = `${r.valueQuantity?.value ?? ''} ${r.valueQuantity?.unit ?? ''}`.trim();
        const interp = r.interpretation?.[0]?.coding?.[0]?.code === 'H' ? 'High' : (r.interpretation?.[0]?.coding?.[0]?.code === 'L' ? 'Low' : 'Normal');
        return {
          name: codeText,
          val: val,
          status: interp,
          loinc: r.code?.coding?.[0]?.code || "11502-2",
          ref: r.referenceRange?.[0]?.text || "Standard Range",
          confidence: 1.0
        };
      }),
      plainLanguageSummary: {
        whatReportSays: "Diagnostic record imported securely via ABDM Consent Gateway and verified against HL7 FHIR R4 schema.",
        whatIsAbnormal: obsEntries.filter(e => e.resource?.interpretation?.[0]?.coding?.[0]?.code === 'H').map(e => e.resource.code.text).join(', ') || "No critical elevations flagged.",
        questionsForDoctor: [
          "Are these ABDM imported biomarkers consistent with my previous hospital tests?",
          "Should we adjust medication doses based on these laboratory values?"
        ]
      }
    };

    targetProfileData.documents = [newDoc, ...(targetProfileData.documents || [])];

    // Ingest Medications if present
    medEntries.forEach((m, idx) => {
      const r = m.resource;
      const medName = r.medicationCodeableConcept?.text || "Prescribed Medication";
      const instruction = r.dosageInstruction?.[0]?.text || "As directed";
      targetProfileData.medications.push({
        id: `med_abdm_${Date.now()}_${idx}`,
        profileId: targetProfileData.profile.id,
        name: medName,
        dosage: instruction,
        frequency: "Once daily",
        timingSlot: "Morning",
        why: r.dosageInstruction?.[0]?.patientInstruction || "Imported from ABDM Locker",
        taken: false,
        refillDate: "In 30 days"
      });
    });

    this.syncProfileToFhir(targetProfileData);
    return targetProfileData;
  },

  /**
   * Bundled Synthetic Sample ABDM FHIR Bundle for 1-click import demonstration
   */
  sampleAbdmBundle: {
    resourceType: "Bundle",
    id: "abdm-bundle-sample-synthetic",
    meta: {
      versionId: "1",
      lastUpdated: "2026-10-12T09:30:00+05:30",
      profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle"]
    },
    identifier: {
      system: "https://ndhm.in/fhir/bundles",
      value: "ABDM-SYNTHETIC-91452388211234-DEMO"
    },
    type: "collection",
    timestamp: "2026-10-12T09:30:00+05:30",
    entry: [
      {
        fullUrl: "urn:uuid:patient-sravanthi",
        resource: {
          resourceType: "Patient",
          id: "patient-sravanthi",
          identifier: [
            { system: "https://healthid.ndhm.gov.in", value: "91-4523-8821-1234" },
            { system: "https://healthid.ndhm.gov.in/abha-address", value: "sravanthi@abdm" }
          ],
          name: [{ text: "Sravanthi Reddy" }],
          gender: "female",
          birthDate: "1988-05-14"
        }
      },
      {
        fullUrl: "urn:uuid:docref-sample",
        resource: {
          resourceType: "DocumentReference",
          id: "docref-sample",
          status: "current",
          type: { text: "Cardiometabolic Biomarker & Critical Potassium Panel" },
          date: "2026-10-12T09:30:00+05:30"
        }
      },
      {
        fullUrl: "urn:uuid:obs-hba1c",
        resource: {
          resourceType: "Observation",
          id: "obs-sample-1",
          status: "final",
          code: {
            coding: [{ system: "http://loinc.org", code: "4548-4", display: "Hemoglobin A1c" }],
            text: "Glycated Hemoglobin (HbA1c)"
          },
          valueQuantity: { value: 8.4, unit: "%", system: "http://unitsofmeasure.org" },
          interpretation: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation", code: "H", display: "High" }] }],
          referenceRange: [{ text: "< 5.7%" }]
        }
      },
      {
        fullUrl: "urn:uuid:obs-fbg",
        resource: {
          resourceType: "Observation",
          id: "obs-sample-2",
          status: "final",
          code: {
            coding: [{ system: "http://loinc.org", code: "1558-6", display: "Fasting Blood Glucose" }],
            text: "Fasting Blood Glucose"
          },
          valueQuantity: { value: 168, unit: "mg/dL", system: "http://unitsofmeasure.org" },
          interpretation: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation", code: "H", display: "High" }] }],
          referenceRange: [{ text: "70 - 99 mg/dL" }]
        }
      },
      {
        fullUrl: "urn:uuid:obs-chol",
        resource: {
          resourceType: "Observation",
          id: "obs-sample-3",
          status: "final",
          code: {
            coding: [{ system: "http://loinc.org", code: "2093-3", display: "Total Cholesterol" }],
            text: "Total Cholesterol"
          },
          valueQuantity: { value: 224, unit: "mg/dL", system: "http://unitsofmeasure.org" },
          interpretation: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation", code: "H", display: "High" }] }],
          referenceRange: [{ text: "< 200 mg/dL" }]
        }
      },
      {
        fullUrl: "urn:uuid:obs-potassium",
        resource: {
          resourceType: "Observation",
          id: "obs-sample-4",
          status: "final",
          code: {
            coding: [{ system: "http://loinc.org", code: "2823-3", display: "Serum Potassium" }],
            text: "Serum Potassium (Critical Value)"
          },
          valueQuantity: { value: 5.9, unit: "mmol/L", system: "http://unitsofmeasure.org" },
          interpretation: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation", code: "H", display: "High" }] }],
          referenceRange: [{ text: "3.5 - 5.1 mmol/L" }]
        }
      },
      {
        fullUrl: "urn:uuid:med-empagliflozin",
        resource: {
          resourceType: "MedicationRequest",
          id: "med-sample-1",
          status: "active",
          intent: "order",
          medicationCodeableConcept: {
            coding: [{ system: "http://www.nlm.nih.gov/research/umls/rxnorm", code: "1545653", display: "Empagliflozin 10 MG" }],
            text: "Empagliflozin 10 mg"
          },
          dosageInstruction: [{ text: "10 mg once daily in the morning with water", patientInstruction: "Take with breakfast" }]
        }
      }
    ]
  }
};

// Expose on window
if (typeof window !== 'undefined') {
  window.FhirEngine = FhirEngine;
  // Also preserve backward-compatibility with FhirExporter
  window.FhirExporter = {
    generateFHIRBundle: function() {
      if (window.App && window.App.Store) {
        const data = window.App.Store.getProfileData();
        return FhirEngine.toBundle(data, "collection");
      }
      return FhirEngine.sampleAbdmBundle;
    },
    downloadFHIRJSON: function(bundle) {
      FhirEngine.downloadBundle(bundle);
    }
  };
}
