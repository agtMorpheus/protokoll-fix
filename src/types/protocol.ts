export type NetworkType = "TN-C" | "TN-S" | "TN-C-S" | "TT" | "IT";
export type TestType = "neuanlage" | "erweiterung" | "aenderung" | "instandsetzung" | "wiederholungspruefung";
export type InspectionStatus = "io" | "nio" | "na";
export type TestResult = "keine-maengel" | "maengel";

export interface Measurement {
  id: string;
  posNr: string;
  nr: string;
  zielbezeichnung: string;
  leitungTyp: string;
  leitungAnzahl: string;
  leitungQuerschnitt: string;
  un: string;
  fn: string;
  schutzArt: string;
  schutzCharakteristik: string;
  schutzIn: string;
  zsOhm: string;
  znOhm: string;
  ikKa: string;
  risoOhne: string;
  risoMit: string;
  rcdArt: string;
  rcdRpe: string;
  rcdIn: string;
  rcdIDeltaN: string;
  rcdImess: string;
  rcdAusloesezeitIn: string;
  rcdAuslosezeittA: string;
  rcdUl: string;
  rcdUmess: string;
  rcdDiffstrom: string;
}

export interface Protocol {
  id: string;
  createdAt: string;
  updatedAt: string;
  
  // Basic Information
  auftraggeber: string;
  auftragNr: string;
  kundenNr: string;
  auftragnehmer: string;
  
  // Location
  ort: string;
  adresse: string;
  
  // Installation Details
  anlage: string;
  inventarNr?: string;
  testType: TestType;
  
  // Network Information
  netzspannung: string;
  netzform: NetworkType;
  netzbetreiber?: string;
  
  // Inspection Items - Besichtigung & Erproben
  besichtigungItems: {
    betriebsmittel: InspectionStatus;
    trennSchalten: InspectionStatus;
    brandabschottungen: InspectionStatus;
    gebaeudeTechnik: InspectionStatus;
    kabel: InspectionStatus;
    kennzeichnung: InspectionStatus;
    funktionspruefung: InspectionStatus;
    rcd: InspectionStatus;
    schraubverbindungen: InspectionStatus;
    kennzeichnungLeiter: InspectionStatus;
    leiterverbindungen: InspectionStatus;
    schutzeinrichtungen: InspectionStatus;
    basisschutz: InspectionStatus;
    zugaenglichkeit: InspectionStatus;
    schutzpotential: InspectionStatus;
    funktionSchutz: InspectionStatus;
    drehrichtung: InspectionStatus;
    schutzpotentialZusatz: InspectionStatus;
    dokumentation: InspectionStatus;
    reinigung: InspectionStatus;
    rechtsdrehfeld: InspectionStatus;
    gebaeudeTechnikTest: InspectionStatus;
  };
  
  // Test Standards
  standards: {
    vde0100_700: boolean;
    vde0100_0600: boolean;
    vde0105_0100: boolean;
    dguv_v3: boolean;
  };
  
  // Test Equipment
  messgeraet: {
    fabrikat: string;
    typ: string;
    identNr: string;
    kalibrierung: string;
  };
  
  // Result
  ergebnis: TestResult;
  pruefplakette: boolean;
  naechstePruefung?: string;
  bemerkung?: string;
  
  // Measurements
  measurements: Measurement[];
  stromkreisverteilerNr: string;
  einspeisung: string;
  erdungswiderstand: string;
}
