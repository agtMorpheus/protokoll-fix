import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProtocolList from "@/components/ProtocolList";
import ProtocolForm from "@/components/ProtocolForm";
import { Protocol } from "@/types/protocol";

const Index = () => {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProtocol, setEditingProtocol] = useState<Protocol | null>(null);

  const handleCreateProtocol = (protocol: Omit<Protocol, "id" | "createdAt" | "updatedAt">) => {
    if (editingProtocol) {
      setProtocols(protocols.map(p => 
        p.id === editingProtocol.id 
          ? { ...protocol, id: p.id, createdAt: p.createdAt, updatedAt: new Date().toISOString() }
          : p
      ));
      setEditingProtocol(null);
    } else {
      const newProtocol: Protocol = {
        ...protocol,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProtocols([newProtocol, ...protocols]);
    }
    setShowForm(false);
  };

  const handleEdit = (protocol: Protocol) => {
    setEditingProtocol(protocol);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setProtocols(protocols.filter(p => p.id !== id));
  };

  const filteredProtocols = protocols.filter(protocol =>
    protocol.anlage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    protocol.auftraggeber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    protocol.auftragNr.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ElektroProtokolle</h1>
                <p className="text-sm text-muted-foreground">VDE 0100 Prüfprotokoll Manager</p>
              </div>
            </div>
            <Button onClick={() => { setShowForm(true); setEditingProtocol(null); }} size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Neues Protokoll
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {showForm ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => { setShowForm(false); setEditingProtocol(null); }}
              >
                ← Zurück zur Übersicht
              </Button>
            </div>
            <ProtocolForm 
              onSubmit={handleCreateProtocol}
              initialData={editingProtocol || undefined}
              isEditing={!!editingProtocol}
            />
          </div>
        ) : (
          <div>
            {/* Search and Stats */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Suche nach Anlage, Auftraggeber oder Auftragsnummer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Gesamt Protokolle</div>
                  <div className="text-3xl font-bold text-foreground">{protocols.length}</div>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Keine Mängel</div>
                  <div className="text-3xl font-bold text-success">
                    {protocols.filter(p => p.ergebnis === "keine-maengel").length}
                  </div>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Mängel festgestellt</div>
                  <div className="text-3xl font-bold text-destructive">
                    {protocols.filter(p => p.ergebnis === "maengel").length}
                  </div>
                </div>
              </div>
            </div>

            {/* Protocol List */}
            {protocols.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Keine Protokolle vorhanden
                </h3>
                <p className="text-muted-foreground mb-6">
                  Erstellen Sie Ihr erstes Prüfprotokoll, um loszulegen.
                </p>
                <Button onClick={() => setShowForm(true)} size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  Neues Protokoll erstellen
                </Button>
              </div>
            ) : (
              <ProtocolList 
                protocols={filteredProtocols}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
