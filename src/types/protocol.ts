export type NetworkType = "TN-C" | "TN-S" | "TN-C-S" | "TT" | "IT";
export type TestType = "neuanlage" | "erweiterung" | "aenderung" | "instandsetzung" | "wiederholungspruefung";
export type InspectionStatus = "io" | "nio" | "na";
export type TestResult = "keine-maengel" | "maengel";

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
  
  // Inspection Items
  besichtigungItems: {
    [key: string]: InspectionStatus;
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
}
