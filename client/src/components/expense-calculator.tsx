import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Bed, Bus, Coffee, Ticket } from "lucide-react";

interface ExpenseItem {
  icon: any;
  name: string;
  dailyCost: number;
  total: number;
}

export function ExpenseCalculator() {
  const [days, setDays] = useState(3);
  const [hotelBudget, setHotelBudget] = useState(80000); // Precio promedio por noche

  const dailyExpenses: ExpenseItem[] = [
    {
      icon: Bed,
      name: "Alojamiento",
      dailyCost: hotelBudget,
      total: hotelBudget * days
    },
    {
      icon: Coffee,
      name: "Comidas",
      dailyCost: 40000, // Aproximado para 3 comidas
      total: 40000 * days
    },
    {
      icon: Bus,
      name: "Transporte",
      dailyCost: 10000, // Metro + algunos taxis
      total: 10000 * days
    },
    {
      icon: Ticket,
      name: "Actividades",
      dailyCost: 30000, // Promedio para actividades turísticas
      total: 30000 * days
    }
  ];

  const totalBudget = dailyExpenses.reduce((acc, item) => acc + item.total, 0);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-6 w-6" />
          Calculadora de Gastos de Viaje
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="days">Días de estadía</Label>
              <Input
                id="days"
                type="number"
                min="1"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hotel">Presupuesto diario para hotel (COP)</Label>
              <Input
                id="hotel"
                type="number"
                min="30000"
                step="10000"
                value={hotelBudget}
                onChange={(e) => setHotelBudget(parseInt(e.target.value) || 30000)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Desglose de gastos estimados:</h3>
            <div className="grid gap-4">
              {dailyExpenses.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-background rounded-md">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.dailyCost.toLocaleString()} COP por día
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      ${item.total.toLocaleString()} COP
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Presupuesto Total Estimado</h3>
                <p className="text-sm text-muted-foreground">Para {days} días en Medellín</p>
              </div>
              <p className="text-2xl font-bold text-primary">
                ${totalBudget.toLocaleString()} COP
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
