import { Protocol } from "@/types/protocol";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, FileText, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface ProtocolListProps {
  protocols: Protocol[];
  onEdit: (protocol: Protocol) => void;
  onDelete: (id: string) => void;
}

const testTypeLabels: Record<string, string> = {
  neuanlage: "Neuanlage",
  erweiterung: "Erweiterung",
  aenderung: "Änderung",
  instandsetzung: "Instandsetzung",
  wiederholungspruefung: "Wiederholungsprüfung",
};

const ProtocolList = ({ protocols, onEdit, onDelete }: ProtocolListProps) => {
  return (
    <div className="space-y-4">
      {protocols.map((protocol) => (
        <Card key={protocol.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {protocol.anlage}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {protocol.auftraggeber}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Auftrag-Nr.</div>
                    <div className="font-medium text-sm">{protocol.auftragNr}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Prüfart</div>
                    <Badge variant="secondary" className="text-xs">
                      {testTypeLabels[protocol.testType]}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Netzform</div>
                    <div className="font-medium text-sm">{protocol.netzform}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Erstellt</div>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(protocol.createdAt), "dd.MM.yyyy", { locale: de })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  {protocol.ergebnis === "keine-maengel" ? (
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-sm font-medium">Keine Mängel</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Mängel festgestellt</span>
                    </div>
                  )}
                  
                  {protocol.naechstePruefung && (
                    <div className="text-sm text-muted-foreground">
                      Nächste Prüfung:{" "}
                      {format(new Date(protocol.naechstePruefung), "dd.MM.yyyy", { locale: de })}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(protocol)}
                  title="Bearbeiten"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (confirm("Möchten Sie dieses Protokoll wirklich löschen?")) {
                      onDelete(protocol.id);
                    }
                  }}
                  title="Löschen"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProtocolList;
