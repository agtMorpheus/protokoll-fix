import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Measurement } from "@/types/protocol";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface MeasurementTableProps {
  measurements: Measurement[];
  onChange: (measurements: Measurement[]) => void;
  stromkreisverteilerNr: string;
  onStromkreisverteilerNrChange: (value: string) => void;
  einspeisung: string;
  onEinspeisungChange: (value: string) => void;
  erdungswiderstand: string;
  onErdungswiderstandChange: (value: string) => void;
}

const MeasurementTable = ({
  measurements,
  onChange,
  stromkreisverteilerNr,
  onStromkreisverteilerNrChange,
  einspeisung,
  onEinspeisungChange,
  erdungswiderstand,
  onErdungswiderstandChange,
}: MeasurementTableProps) => {
  const addMeasurement = () => {
    const newMeasurement: Measurement = {
      id: crypto.randomUUID(),
      posNr: "",
      nr: "",
      zielbezeichnung: "",
      leitungTyp: "",
      leitungAnzahl: "",
      leitungQuerschnitt: "",
      un: "230",
      fn: "50",
      schutzArt: "",
      schutzCharakteristik: "",
      schutzIn: "",
      zsOhm: "",
      znOhm: "",
      ikKa: "",
      risoOhne: "",
      risoMit: "",
      rcdArt: "",
      rcdRpe: "",
      rcdIn: "",
      rcdIDeltaN: "",
      rcdImess: "",
      rcdAusloesezeitIn: "",
      rcdAuslosezeittA: "",
      rcdUl: "",
      rcdUmess: "",
      rcdDiffstrom: "",
    };
    onChange([...measurements, newMeasurement]);
    toast.success("Messung hinzugefügt");
  };

  const removeMeasurement = (id: string) => {
    onChange(measurements.filter((m) => m.id !== id));
    toast.success("Messung entfernt");
  };

  const updateMeasurement = (id: string, field: keyof Measurement, value: string) => {
    onChange(
      measurements.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messungen</CardTitle>
        <CardDescription>Elektrische Messungen und Prüfwerte</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Stromkreisverteiler Nr.</label>
            <Input
              value={stromkreisverteilerNr}
              onChange={(e) => onStromkreisverteilerNrChange(e.target.value)}
              placeholder="z.B. LVUM-"
              maxLength={50}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Einspeisung</label>
            <Input
              value={einspeisung}
              onChange={(e) => onEinspeisungChange(e.target.value)}
              maxLength={100}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Erdungswiderstand RE (Ω)</label>
            <Input
              value={erdungswiderstand}
              onChange={(e) => onErdungswiderstandChange(e.target.value)}
              placeholder="z.B. <0.5"
              maxLength={20}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Messreihen</h3>
          <Button type="button" onClick={addMeasurement} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Messung hinzufügen
          </Button>
        </div>

        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px]">Pos.Nr.</TableHead>
                <TableHead className="min-w-[80px]">Nr.</TableHead>
                <TableHead className="min-w-[200px]">Zielbezeichnung</TableHead>
                <TableHead className="min-w-[100px]">Leitung Typ</TableHead>
                <TableHead className="min-w-[80px]">Anzahl</TableHead>
                <TableHead className="min-w-[100px]">Querschnitt</TableHead>
                <TableHead className="min-w-[80px]">Un (V)</TableHead>
                <TableHead className="min-w-[80px]">fn (Hz)</TableHead>
                <TableHead className="min-w-[100px]">Schutz Art</TableHead>
                <TableHead className="min-w-[120px]">Charakteristik</TableHead>
                <TableHead className="min-w-[80px]">In (A)</TableHead>
                <TableHead className="min-w-[80px]">ZS (Ω)</TableHead>
                <TableHead className="min-w-[80px]">ZN (Ω)</TableHead>
                <TableHead className="min-w-[80px]">Ik (kA)</TableHead>
                <TableHead className="min-w-[120px]">Riso ohne (MΩ)</TableHead>
                <TableHead className="min-w-[120px]">Riso mit (MΩ)</TableHead>
                <TableHead className="min-w-[100px]">RCD Art</TableHead>
                <TableHead className="min-w-[100px]">RCD RPE (Ω)</TableHead>
                <TableHead className="min-w-[80px]">IN (A)</TableHead>
                <TableHead className="min-w-[100px]">IΔn (mA)</TableHead>
                <TableHead className="min-w-[100px]">Imess (mA)</TableHead>
                <TableHead className="min-w-[120px]">Zeit &lt;In (ms)</TableHead>
                <TableHead className="min-w-[100px]">tA (ms)</TableHead>
                <TableHead className="min-w-[100px]">UL (V)</TableHead>
                <TableHead className="min-w-[100px]">Umess (V)</TableHead>
                <TableHead className="min-w-[120px]">Diffstrom (mA)</TableHead>
                <TableHead className="min-w-[60px]">Aktion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {measurements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={27} className="text-center text-muted-foreground py-8">
                    Keine Messungen vorhanden. Klicken Sie auf "Messung hinzufügen".
                  </TableCell>
                </TableRow>
              ) : (
                measurements.map((measurement) => (
                  <TableRow key={measurement.id}>
                    <TableCell>
                      <Input
                        value={measurement.posNr}
                        onChange={(e) => updateMeasurement(measurement.id, "posNr", e.target.value)}
                        className="min-w-[100px]"
                        maxLength={50}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.nr}
                        onChange={(e) => updateMeasurement(measurement.id, "nr", e.target.value)}
                        className="min-w-[80px]"
                        maxLength={20}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.zielbezeichnung}
                        onChange={(e) => updateMeasurement(measurement.id, "zielbezeichnung", e.target.value)}
                        className="min-w-[200px]"
                        maxLength={100}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.leitungTyp}
                        onChange={(e) => updateMeasurement(measurement.id, "leitungTyp", e.target.value)}
                        className="min-w-[100px]"
                        maxLength={50}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.leitungAnzahl}
                        onChange={(e) => updateMeasurement(measurement.id, "leitungAnzahl", e.target.value)}
                        className="min-w-[80px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.leitungQuerschnitt}
                        onChange={(e) => updateMeasurement(measurement.id, "leitungQuerschnitt", e.target.value)}
                        className="min-w-[100px]"
                        placeholder="mm²"
                        maxLength={20}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.un}
                        onChange={(e) => updateMeasurement(measurement.id, "un", e.target.value)}
                        className="min-w-[80px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.fn}
                        onChange={(e) => updateMeasurement(measurement.id, "fn", e.target.value)}
                        className="min-w-[80px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.schutzArt}
                        onChange={(e) => updateMeasurement(measurement.id, "schutzArt", e.target.value)}
                        className="min-w-[100px]"
                        maxLength={20}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.schutzCharakteristik}
                        onChange={(e) => updateMeasurement(measurement.id, "schutzCharakteristik", e.target.value)}
                        className="min-w-[120px]"
                        maxLength={20}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.schutzIn}
                        onChange={(e) => updateMeasurement(measurement.id, "schutzIn", e.target.value)}
                        className="min-w-[80px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.zsOhm}
                        onChange={(e) => updateMeasurement(measurement.id, "zsOhm", e.target.value)}
                        className="min-w-[80px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.znOhm}
                        onChange={(e) => updateMeasurement(measurement.id, "znOhm", e.target.value)}
                        className="min-w-[80px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.ikKa}
                        onChange={(e) => updateMeasurement(measurement.id, "ikKa", e.target.value)}
                        className="min-w-[80px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.risoOhne}
                        onChange={(e) => updateMeasurement(measurement.id, "risoOhne", e.target.value)}
                        className="min-w-[120px]"
                        maxLength={20}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.risoMit}
                        onChange={(e) => updateMeasurement(measurement.id, "risoMit", e.target.value)}
                        className="min-w-[120px]"
                        maxLength={20}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.rcdArt}
                        onChange={(e) => updateMeasurement(measurement.id, "rcdArt", e.target.value)}
                        className="min-w-[100px]"
                        maxLength={20}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.rcdRpe}
                        onChange={(e) => updateMeasurement(measurement.id, "rcdRpe", e.target.value)}
                        className="min-w-[100px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.rcdIn}
                        onChange={(e) => updateMeasurement(measurement.id, "rcdIn", e.target.value)}
                        className="min-w-[80px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.rcdIDeltaN}
                        onChange={(e) => updateMeasurement(measurement.id, "rcdIDeltaN", e.target.value)}
                        className="min-w-[100px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.rcdImess}
                        onChange={(e) => updateMeasurement(measurement.id, "rcdImess", e.target.value)}
                        className="min-w-[100px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.rcdAusloesezeitIn}
                        onChange={(e) => updateMeasurement(measurement.id, "rcdAusloesezeitIn", e.target.value)}
                        className="min-w-[120px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.rcdAuslosezeittA}
                        onChange={(e) => updateMeasurement(measurement.id, "rcdAuslosezeittA", e.target.value)}
                        className="min-w-[100px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.rcdUl}
                        onChange={(e) => updateMeasurement(measurement.id, "rcdUl", e.target.value)}
                        className="min-w-[100px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.rcdUmess}
                        onChange={(e) => updateMeasurement(measurement.id, "rcdUmess", e.target.value)}
                        className="min-w-[100px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={measurement.rcdDiffstrom}
                        onChange={(e) => updateMeasurement(measurement.id, "rcdDiffstrom", e.target.value)}
                        className="min-w-[120px]"
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeMeasurement(measurement.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeasurementTable;
