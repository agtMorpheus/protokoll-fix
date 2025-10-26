import { Protocol } from "@/types/protocol";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, FileText, Calendar, CheckCircle2, AlertCircle, Download } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { toast } from "sonner";

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
  const exportAsJSON = (protocol: Protocol) => {
    const dataStr = JSON.stringify(protocol, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `protokoll-${protocol.anlage}-${format(new Date(protocol.createdAt), "yyyy-MM-dd")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Protokoll als JSON exportiert");
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {protocols.map((protocol) => (
        <Card key={protocol.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 md:gap-4">
              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <FileText className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-foreground truncate">
                      {protocol.anlage}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">
                      {protocol.auftraggeber}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mt-3 md:mt-4">
                  <div>
                    <div className="text-[10px] md:text-xs text-muted-foreground mb-0.5 md:mb-1">Auftrag-Nr.</div>
                    <div className="font-medium text-xs md:text-sm truncate">{protocol.auftragNr}</div>
                  </div>
                  <div>
                    <div className="text-[10px] md:text-xs text-muted-foreground mb-0.5 md:mb-1">Prüfart</div>
                    <Badge variant="secondary" className="text-[10px] md:text-xs">
                      {testTypeLabels[protocol.testType]}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-[10px] md:text-xs text-muted-foreground mb-0.5 md:mb-1">Netzform</div>
                    <div className="font-medium text-xs md:text-sm">{protocol.netzform}</div>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <div className="text-[10px] md:text-xs text-muted-foreground mb-0.5 md:mb-1">Erstellt</div>
                    <div className="flex items-center gap-1 text-xs md:text-sm">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{format(new Date(protocol.createdAt), "dd.MM.yyyy", { locale: de })}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-4 mt-3 md:mt-4">
                  {protocol.ergebnis === "keine-maengel" ? (
                    <div className="flex items-center gap-1.5 md:gap-2 text-success">
                      <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                      <span className="text-xs md:text-sm font-medium">Keine Mängel</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 md:gap-2 text-destructive">
                      <AlertCircle className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                      <span className="text-xs md:text-sm font-medium">Mängel festgestellt</span>
                    </div>
                  )}
                  
                  {protocol.naechstePruefung && (
                    <div className="text-xs md:text-sm text-muted-foreground">
                      Nächste Prüfung:{" "}
                      {format(new Date(protocol.naechstePruefung), "dd.MM.yyyy", { locale: de })}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => exportAsJSON(protocol)}
                  title="Als JSON exportieren"
                  className="flex-1 sm:flex-none"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(protocol)}
                  title="Bearbeiten"
                  className="flex-1 sm:flex-none"
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
                  className="flex-1 sm:flex-none"
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
