import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Protocol, NetworkType, TestType, InspectionStatus } from "@/types/protocol";
import { toast } from "sonner";
import { Save } from "lucide-react";
import MeasurementTable from "./MeasurementTable";

interface ProtocolFormProps {
  onSubmit: (protocol: Omit<Protocol, "id" | "createdAt" | "updatedAt">) => void;
  initialData?: Protocol;
  isEditing?: boolean;
}

const ProtocolForm = ({ onSubmit, initialData, isEditing }: ProtocolFormProps) => {
  const [formData, setFormData] = useState<Omit<Protocol, "id" | "createdAt" | "updatedAt">>({
    auftraggeber: initialData?.auftraggeber || "",
    auftragNr: initialData?.auftragNr || "",
    kundenNr: initialData?.kundenNr || "",
    auftragnehmer: initialData?.auftragnehmer || "",
    ort: initialData?.ort || "",
    adresse: initialData?.adresse || "",
    anlage: initialData?.anlage || "",
    inventarNr: initialData?.inventarNr || "",
    testType: initialData?.testType || "wiederholungspruefung",
    netzspannung: initialData?.netzspannung || "230/400",
    netzform: initialData?.netzform || "TN-C-S",
    netzbetreiber: initialData?.netzbetreiber || "",
    besichtigungItems: initialData?.besichtigungItems || {
      betriebsmittel: "na",
      trennSchalten: "na",
      brandabschottungen: "na",
      gebaeude: "na",
      kabel: "na",
      kennzeichnung: "na",
      funktionspruefung: "na",
      rcd: "na",
      schraubverbindungen: "na",
      kennzeichnungLeiter: "na",
      leiterverbindungen: "na",
      schutzeinrichtungen: "na",
      basisschutz: "na",
      zugaenglichkeit: "na",
      schutzpotential: "na",
      funktionSchutz: "na",
      rechtsdrehfeld: "na",
      drehrichtung: "na",
      reinigung: "na",
      dokumentation: "na",
      gebaeudeTechnik: "na",
    },
    standards: initialData?.standards || {
      vde0100_700: true,
      vde0100_0600: true,
      vde0105_0100: false,
      dguv_v3: true,
    },
    messgeraet: initialData?.messgeraet || {
      fabrikat: "",
      typ: "",
      identNr: "",
      kalibrierung: "",
    },
    ergebnis: initialData?.ergebnis || "keine-maengel",
    pruefplakette: initialData?.pruefplakette ?? true,
    naechstePruefung: initialData?.naechstePruefung || "",
    bemerkung: initialData?.bemerkung || "",
    measurements: initialData?.measurements || [],
    stromkreisverteilerNr: initialData?.stromkreisverteilerNr || "",
    einspeisung: initialData?.einspeisung || "",
    erdungswiderstand: initialData?.erdungswiderstand || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.auftraggeber || !formData.auftragNr || !formData.anlage) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus");
      return;
    }

    if (formData.auftraggeber.length > 200) {
      toast.error("Auftraggeber darf maximal 200 Zeichen lang sein");
      return;
    }

    if (formData.anlage.length > 100) {
      toast.error("Anlage darf maximal 100 Zeichen lang sein");
      return;
    }

    onSubmit(formData);
    toast.success(isEditing ? "Protokoll aktualisiert" : "Protokoll erstellt");
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateInspectionItem = (key: string, value: InspectionStatus) => {
    setFormData(prev => ({
      ...prev,
      besichtigungItems: {
        ...prev.besichtigungItems,
        [key]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Grundinformationen</CardTitle>
          <CardDescription>Auftraggeber und Auftragsinformationen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="auftraggeber">Auftraggeber *</Label>
              <Input
                id="auftraggeber"
                value={formData.auftraggeber}
                onChange={(e) => updateField("auftraggeber", e.target.value)}
                placeholder="z.B. Volkswagen AG"
                required
                maxLength={200}
              />
            </div>
            <div>
              <Label htmlFor="auftragNr">Auftrags-Nr. *</Label>
              <Input
                id="auftragNr"
                value={formData.auftragNr}
                onChange={(e) => updateField("auftragNr", e.target.value)}
                placeholder="z.B. EMH"
                required
                maxLength={50}
              />
            </div>
            <div>
              <Label htmlFor="kundenNr">Kunden-Nr.</Label>
              <Input
                id="kundenNr"
                value={formData.kundenNr}
                onChange={(e) => updateField("kundenNr", e.target.value)}
                placeholder="z.B. 1406"
                maxLength={50}
              />
            </div>
            <div>
              <Label htmlFor="auftragnehmer">Auftragnehmer</Label>
              <Input
                id="auftragnehmer"
                value={formData.auftragnehmer}
                onChange={(e) => updateField("auftragnehmer", e.target.value)}
                placeholder="z.B. EAW Wolfsburg"
                maxLength={200}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Standort</CardTitle>
          <CardDescription>Ort und Adresse der Anlage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ort">Ort</Label>
            <Input
              id="ort"
              value={formData.ort}
              onChange={(e) => updateField("ort", e.target.value)}
              placeholder="z.B. Volkswagen AG, Werk Wolfsburg"
              maxLength={200}
            />
          </div>
          <div>
            <Label htmlFor="adresse">Adresse</Label>
            <Input
              id="adresse"
              value={formData.adresse}
              onChange={(e) => updateField("adresse", e.target.value)}
              placeholder="z.B. Berliner Ring 2, 38436 Wolfsburg"
              maxLength={300}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Anlageninformationen</CardTitle>
          <CardDescription>Details zur zu prüfenden Anlage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="anlage">Anlage *</Label>
              <Input
                id="anlage"
                value={formData.anlage}
                onChange={(e) => updateField("anlage", e.target.value)}
                placeholder="z.B. LVUM-123"
                required
                maxLength={100}
              />
            </div>
            <div>
              <Label htmlFor="inventarNr">Inventar-Nr.</Label>
              <Input
                id="inventarNr"
                value={formData.inventarNr}
                onChange={(e) => updateField("inventarNr", e.target.value)}
                placeholder="z.B. E03150AP170000"
                maxLength={50}
              />
            </div>
          </div>

          <div>
            <Label>Art der Prüfung</Label>
            <RadioGroup
              value={formData.testType}
              onValueChange={(value) => updateField("testType", value as TestType)}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neuanlage" id="neuanlage" />
                <Label htmlFor="neuanlage" className="font-normal cursor-pointer">Neuanlage</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="erweiterung" id="erweiterung" />
                <Label htmlFor="erweiterung" className="font-normal cursor-pointer">Erweiterung</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="aenderung" id="aenderung" />
                <Label htmlFor="aenderung" className="font-normal cursor-pointer">Änderung</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="instandsetzung" id="instandsetzung" />
                <Label htmlFor="instandsetzung" className="font-normal cursor-pointer">Instandsetzung</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wiederholungspruefung" id="wiederholung" />
                <Label htmlFor="wiederholung" className="font-normal cursor-pointer">Wiederholungsprüfung</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Netzinformationen</CardTitle>
          <CardDescription>Elektrische Netzparameter</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="netzspannung">Netzspannung (V)</Label>
              <Input
                id="netzspannung"
                value={formData.netzspannung}
                onChange={(e) => updateField("netzspannung", e.target.value)}
                placeholder="z.B. 230/400"
                maxLength={20}
              />
            </div>
            <div>
              <Label>Netzform</Label>
              <RadioGroup
                value={formData.netzform}
                onValueChange={(value) => updateField("netzform", value as NetworkType)}
                className="grid grid-cols-3 gap-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TN-C" id="tn-c" />
                  <Label htmlFor="tn-c" className="font-normal cursor-pointer">TN-C</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TN-S" id="tn-s" />
                  <Label htmlFor="tn-s" className="font-normal cursor-pointer">TN-S</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TN-C-S" id="tn-c-s" />
                  <Label htmlFor="tn-c-s" className="font-normal cursor-pointer">TN-C-S</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TT" id="tt" />
                  <Label htmlFor="tt" className="font-normal cursor-pointer">TT</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="IT" id="it" />
                  <Label htmlFor="it" className="font-normal cursor-pointer">IT</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div>
            <Label htmlFor="netzbetreiber">Netzbetreiber</Label>
            <Input
              id="netzbetreiber"
              value={formData.netzbetreiber}
              onChange={(e) => updateField("netzbetreiber", e.target.value)}
              maxLength={200}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prüfnormen</CardTitle>
          <CardDescription>Angewandte Standards und Normen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vde0100-700"
              checked={formData.standards.vde0100_700}
              onCheckedChange={(checked) =>
                updateField("standards", { ...formData.standards, vde0100_700: !!checked })
              }
            />
            <Label htmlFor="vde0100-700" className="font-normal cursor-pointer">
              DIN VDE 0100 Gruppe 700
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vde0100-0600"
              checked={formData.standards.vde0100_0600}
              onCheckedChange={(checked) =>
                updateField("standards", { ...formData.standards, vde0100_0600: !!checked })
              }
            />
            <Label htmlFor="vde0100-0600" className="font-normal cursor-pointer">
              DIN VDE 0100-0600
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vde0105-0100"
              checked={formData.standards.vde0105_0100}
              onCheckedChange={(checked) =>
                updateField("standards", { ...formData.standards, vde0105_0100: !!checked })
              }
            />
            <Label htmlFor="vde0105-0100" className="font-normal cursor-pointer">
              DIN VDE 0105-0100
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="dguv-v3"
              checked={formData.standards.dguv_v3}
              onCheckedChange={(checked) =>
                updateField("standards", { ...formData.standards, dguv_v3: !!checked })
              }
            />
            <Label htmlFor="dguv-v3" className="font-normal cursor-pointer">
              DGUV V3
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Messgerät</CardTitle>
          <CardDescription>Verwendete Prüfgeräte nach DIN VDE 0413</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fabrikat">Fabrikat</Label>
              <Input
                id="fabrikat"
                value={formData.messgeraet.fabrikat}
                onChange={(e) =>
                  updateField("messgeraet", { ...formData.messgeraet, fabrikat: e.target.value })
                }
                placeholder="z.B. Fluke"
                maxLength={100}
              />
            </div>
            <div>
              <Label htmlFor="typ">Typ</Label>
              <Input
                id="typ"
                value={formData.messgeraet.typ}
                onChange={(e) =>
                  updateField("messgeraet", { ...formData.messgeraet, typ: e.target.value })
                }
                placeholder="z.B. 1654b"
                maxLength={100}
              />
            </div>
            <div>
              <Label htmlFor="identNr">Ident-Nr.</Label>
              <Input
                id="identNr"
                value={formData.messgeraet.identNr}
                onChange={(e) =>
                  updateField("messgeraet", { ...formData.messgeraet, identNr: e.target.value })
                }
                placeholder="z.B. 4312061"
                maxLength={50}
              />
            </div>
            <div>
              <Label htmlFor="kalibrierung">Nächste Kalibrierung</Label>
              <Input
                id="kalibrierung"
                type="date"
                value={formData.messgeraet.kalibrierung}
                onChange={(e) =>
                  updateField("messgeraet", { ...formData.messgeraet, kalibrierung: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <MeasurementTable
        measurements={formData.measurements}
        onChange={(measurements) => updateField("measurements", measurements)}
        stromkreisverteilerNr={formData.stromkreisverteilerNr}
        onStromkreisverteilerNrChange={(value) => updateField("stromkreisverteilerNr", value)}
        einspeisung={formData.einspeisung}
        onEinspeisungChange={(value) => updateField("einspeisung", value)}
        erdungswiderstand={formData.erdungswiderstand}
        onErdungswiderstandChange={(value) => updateField("erdungswiderstand", value)}
      />

      <Card>
        <CardHeader>
          <CardTitle>Prüfungsergebnis</CardTitle>
          <CardDescription>Ergebnis und weitere Informationen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Ergebnis</Label>
            <RadioGroup
              value={formData.ergebnis}
              onValueChange={(value) => updateField("ergebnis", value)}
              className="grid grid-cols-2 gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="keine-maengel" id="keine-maengel" />
                <Label htmlFor="keine-maengel" className="font-normal cursor-pointer">
                  Keine Mängel festgestellt
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="maengel" id="maengel" />
                <Label htmlFor="maengel" className="font-normal cursor-pointer">
                  Mängel festgestellt
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pruefplakette"
                checked={formData.pruefplakette}
                onCheckedChange={(checked) => updateField("pruefplakette", !!checked)}
              />
              <Label htmlFor="pruefplakette" className="font-normal cursor-pointer">
                Prüfplakette angebracht
              </Label>
            </div>
            <div>
              <Label htmlFor="naechstePruefung">Nächster Prüfungstermin</Label>
              <Input
                id="naechstePruefung"
                type="date"
                value={formData.naechstePruefung}
                onChange={(e) => updateField("naechstePruefung", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bemerkung">Bemerkung</Label>
            <Textarea
              id="bemerkung"
              value={formData.bemerkung}
              onChange={(e) => updateField("bemerkung", e.target.value)}
              placeholder="Zusätzliche Anmerkungen..."
              rows={4}
              maxLength={2000}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="submit" size="lg" className="gap-2">
          <Save className="h-5 w-5" />
          {isEditing ? "Protokoll aktualisieren" : "Protokoll speichern"}
        </Button>
      </div>
    </form>
  );
};

export default ProtocolForm;
