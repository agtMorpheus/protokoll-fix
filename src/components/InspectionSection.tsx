import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InspectionStatus } from "@/types/protocol";

interface InspectionItem {
  key: string;
  label: string;
}

interface InspectionSectionProps {
  besichtigungItems: { [key: string]: InspectionStatus };
  onUpdate: (key: string, value: InspectionStatus) => void;
}

const besichtigungItems: InspectionItem[] = [
  { key: "betriebsmittel", label: "Auswahl der Betriebsmittel" },
  { key: "trennSchalten", label: "Trenn- und Schaltgeräte" },
  { key: "brandabschottungen", label: "Brandabschottungen" },
  { key: "gebaeudeTechnik", label: "Gebäudesystemtechnik" },
  { key: "kabel", label: "Kabel, Leitungen, Stromschienen" },
  { key: "kennzeichnung", label: "Kennz., Stromkr., Betriebsmittel" },
];

const erprobungItems: InspectionItem[] = [
  { key: "funktionspruefung", label: "Funktionsprüfung der Anlage" },
  { key: "rcd", label: "RCD-Schutzschalter" },
  { key: "schraubverbindungen", label: "Schraubverb. u. Klemmstellen auf festen Sitz" },
];

const besichtigungItems2: InspectionItem[] = [
  { key: "kennzeichnungLeiter", label: "Kennzeichnung N- und PE-Leiter" },
  { key: "leiterverbindungen", label: "Leiterverbindungen" },
  { key: "schutzeinrichtungen", label: "Schutz- und Überwachungseinrichtungen" },
  { key: "basisschutz", label: "Basisschutz, Schutz gegen direkt. Berühren" },
  { key: "zugaenglichkeit", label: "Zugänglichkeit" },
  { key: "schutzpotential", label: "Schutzpotentialausgleich" },
];

const erprobungItems2: InspectionItem[] = [
  { key: "funktionSchutz", label: "Funktion der Schutz-, Sicherheits- und Überwachungseinrichtungen" },
  { key: "drehrichtung", label: "Drehrichtung der Motoren" },
];

const besichtigungItems3: InspectionItem[] = [
  { key: "schutzpotentialZusatz", label: "zus. örtl. Potentialausgleich" },
  { key: "dokumentation", label: "Dokumentation" },
  { key: "reinigung", label: "Reinigung des Schaltschranks" },
];

const erprobungItems3: InspectionItem[] = [
  { key: "rechtsdrehfeld", label: "Rechtsdrehfelder der Drehstromsteckdose" },
  { key: "gebaeudeTechnikTest", label: "Gebäudesystemtechnik" },
];

const InspectionSection = ({ besichtigungItems: items, onUpdate }: InspectionSectionProps) => {
  const renderInspectionItem = (item: InspectionItem) => (
    <div key={item.key} className="space-y-1.5 md:space-y-2">
      <Label className="text-xs md:text-sm font-medium">{item.label}</Label>
      <RadioGroup
        value={items[item.key]}
        onValueChange={(value) => onUpdate(item.key, value as InspectionStatus)}
        className="flex gap-3 md:gap-4"
      >
        <div className="flex items-center space-x-1.5 md:space-x-2">
          <RadioGroupItem value="io" id={`${item.key}-io`} />
          <Label htmlFor={`${item.key}-io`} className="font-normal cursor-pointer text-xs md:text-sm">i.O.</Label>
        </div>
        <div className="flex items-center space-x-1.5 md:space-x-2">
          <RadioGroupItem value="nio" id={`${item.key}-nio`} />
          <Label htmlFor={`${item.key}-nio`} className="font-normal cursor-pointer text-xs md:text-sm">n.i.O.</Label>
        </div>
        <div className="flex items-center space-x-1.5 md:space-x-2">
          <RadioGroupItem value="na" id={`${item.key}-na`} />
          <Label htmlFor={`${item.key}-na`} className="font-normal cursor-pointer text-xs md:text-sm">n.a.</Label>
        </div>
      </RadioGroup>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Besichtigung & Erproben</CardTitle>
        <CardDescription className="text-xs md:text-sm">Visuelle Inspektion und funktionelle Erprobung der Anlage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        {/* First Column */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-primary">Besichtigung</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3 md:space-y-4">
              {besichtigungItems.map(renderInspectionItem)}
            </div>
            <div className="space-y-3 md:space-y-4">
              {besichtigungItems2.map(renderInspectionItem)}
            </div>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          {besichtigungItems3.map(renderInspectionItem)}
        </div>

        {/* Second Column */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-primary">Erproben</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3 md:space-y-4">
              {erprobungItems.map(renderInspectionItem)}
            </div>
            <div className="space-y-3 md:space-y-4">
              {erprobungItems2.map(renderInspectionItem)}
            </div>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          {erprobungItems3.map(renderInspectionItem)}
        </div>
      </CardContent>
    </Card>
  );
};

export default InspectionSection;
