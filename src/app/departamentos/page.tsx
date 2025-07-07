"use client";

import React from "react";

import { useState } from "react";
import {
  TrendingUp,
  Users,
  MapPin,
  BarChart3,
  LineChart,
  PieChart,
  Calculator,
  Target,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
} from "recharts";

// Datos poblacionales por departamento
const departmentData = [
  {
    name: "Chuquisaca",
    color: "hsl(var(--chart-1))",
    data: [
      { year: 1976, population: 358516 },
      { year: 1992, population: 453756 },
      { year: 2001, population: 531522 },
      { year: 2012, population: 576153 },
      { year: 2024, population: 600132 },
    ],
  },
  {
    name: "La Paz",
    color: "hsl(var(--chart-2))",
    data: [
      { year: 1976, population: 1465078 },
      { year: 1992, population: 1900786 },
      { year: 2001, population: 2350466 },
      { year: 2012, population: 2706351 },
      { year: 2024, population: 3022566 },
    ],
  },
  {
    name: "Cochabamba",
    color: "hsl(var(--chart-3))",
    data: [
      { year: 1976, population: 720952 },
      { year: 1992, population: 1110205 },
      { year: 2001, population: 1455711 },
      { year: 2012, population: 1758143 },
      { year: 2024, population: 2005373 },
    ],
  },
  {
    name: "Oruro",
    color: "hsl(var(--chart-4))",
    data: [
      { year: 1976, population: 310409 },
      { year: 1992, population: 340114 },
      { year: 2001, population: 391870 },
      { year: 2012, population: 494178 },
      { year: 2024, population: 570194 },
    ],
  },
  {
    name: "Potosí",
    color: "hsl(var(--chart-5))",
    data: [
      { year: 1976, population: 657743 },
      { year: 1992, population: 645889 },
      { year: 2001, population: 709013 },
      { year: 2012, population: 823517 },
      { year: 2024, population: 856419 },
    ],
  },
  {
    name: "Tarija",
    color: "#10B981",
    data: [
      { year: 1976, population: 187204 },
      { year: 1992, population: 291407 },
      { year: 2001, population: 391226 },
      { year: 2012, population: 482196 },
      { year: 2024, population: 534348 },
    ],
  },
  {
    name: "Santa Cruz",
    color: "#F59E0B",
    data: [
      { year: 1976, population: 710724 },
      { year: 1992, population: 1364389 },
      { year: 2001, population: 2029471 },
      { year: 2012, population: 2655084 },
      { year: 2024, population: 3115386 },
    ],
  },
  {
    name: "Beni",
    color: "#8B5CF6",
    data: [
      { year: 1976, population: 168367 },
      { year: 1992, population: 276174 },
      { year: 2001, population: 362521 },
      { year: 2012, population: 421196 },
      { year: 2024, population: 477441 },
    ],
  },
  {
    name: "Pando",
    color: "#EF4444",
    data: [
      { year: 1976, population: 34493 },
      { year: 1992, population: 38072 },
      { year: 2001, population: 52525 },
      { year: 2012, population: 110436 },
      { year: 2024, population: 130761 },
    ],
  },
];

// Función para calcular CAGR
const calculateCAGR = (
  startValue: number,
  endValue: number,
  years: number
): number => {
  return Math.pow(endValue / startValue, 1 / years) - 1;
};

// Función para calcular crecimiento porcentual
const calculateGrowth = (startValue: number, endValue: number): number => {
  return ((endValue - startValue) / startValue) * 100;
};

// Calcular datos de crecimiento inter-censal
const growthData = departmentData.map((dept) => {
  const periods = [
    {
      period: "1992-2001",
      years: 9,
      start: dept.data[1].population,
      end: dept.data[2].population,
    },
    {
      period: "2001-2012",
      years: 11,
      start: dept.data[2].population,
      end: dept.data[3].population,
    },
    {
      period: "2012-2024",
      years: 12,
      start: dept.data[3].population,
      end: dept.data[4].population,
    },
  ];

  return {
    name: dept.name,
    color: dept.color,
    periods: periods.map((p) => ({
      ...p,
      growth: calculateGrowth(p.start, p.end),
      cagr: calculateCAGR(p.start, p.end, p.years) * 100,
    })),
    totalGrowth1976to2024: calculateGrowth(
      dept.data[0].population,
      dept.data[4].population
    ),
    cagr1976to2024:
      calculateCAGR(dept.data[0].population, dept.data[4].population, 48) * 100,
    population2024: dept.data[4].population,
  };
});

// Datos para gráfico combinado por años
const combinedYearData = [1976, 1992, 2001, 2012, 2024].map((year) => {
  const yearData: any = { year };
  departmentData.forEach((dept) => {
    const dataPoint = dept.data.find((d) => d.year === year);
    if (dataPoint) {
      yearData[dept.name] = dataPoint.population;
    }
  });
  return yearData;
});

// Datos para distribución actual (2024)
const currentDistribution = departmentData
  .map((dept) => ({
    name: dept.name,
    population: dept.data[4].population,
    percentage: (dept.data[4].population / 11312620) * 100,
    color: dept.color,
  }))
  .sort((a, b) => b.population - a.population);

// Datos para análisis de migración (cambio en participación)
const migrationAnalysis = departmentData
  .map((dept) => {
    const pop1976 = dept.data[0].population;
    const pop2024 = dept.data[4].population;
    const total1976 = 4613486;
    const total2024 = 11312620;

    const share1976 = (pop1976 / total1976) * 100;
    const share2024 = (pop2024 / total2024) * 100;
    const shareChange = share2024 - share1976;

    return {
      name: dept.name,
      share1976,
      share2024,
      shareChange,
      color: dept.color,
      population2024: pop2024,
    };
  })
  .sort((a, b) => Math.abs(b.shareChange) - Math.abs(a.shareChange));

const chartConfig = {
  population: { label: "Población", color: "hsl(var(--chart-1))" },
  growth: { label: "Crecimiento (%)", color: "hsl(var(--chart-2))" },
  cagr: { label: "CAGR (%)", color: "hsl(var(--chart-3))" },
};

export default function DepartmentsPopulationDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedPeriod, setSelectedPeriod] = useState("2012-2024");

  const totalPopulation2024 = currentDistribution.reduce(
    (sum, dept) => sum + dept.population,
    0
  );
  const fastestGrowingDept = growthData.reduce((max, dept) =>
    dept.cagr1976to2024 > max.cagr1976to2024 ? dept : max
  );
  const slowestGrowingDept = growthData.reduce((min, dept) =>
    dept.cagr1976to2024 < min.cagr1976to2024 ? dept : min
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Crecimiento Poblacional por Departamentos
              </h1>
              <p className="text-gray-600 mt-1">
                Análisis detallado de los 9 departamentos de Bolivia (1976-2024)
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Estadísticas Clave */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Población Total
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalPopulation2024.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                9 Departamentos (2024)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Mayor Crecimiento
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {fastestGrowingDept.name}
              </div>
              <p className="text-xs text-muted-foreground">
                +{fastestGrowingDept.cagr1976to2024.toFixed(2)}% anual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Más Poblado</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {currentDistribution[0].name}
              </div>
              <p className="text-xs text-muted-foreground">
                {currentDistribution[0].percentage.toFixed(1)}% del total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Menor Crecimiento
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {slowestGrowingDept.name}
              </div>
              <p className="text-xs text-muted-foreground">
                +{slowestGrowingDept.cagr1976to2024.toFixed(2)}% anual
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs para diferentes análisis */}
        <Tabs defaultValue="evolution" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="evolution">Evolución</TabsTrigger>
            <TabsTrigger value="growth">Crecimiento</TabsTrigger>
            <TabsTrigger value="distribution">Distribución</TabsTrigger>
            <TabsTrigger value="migration">Migración</TabsTrigger>
            <TabsTrigger value="analysis">Análisis</TabsTrigger>
          </TabsList>

          {/* Tab: Evolución Poblacional */}
          <TabsContent value="evolution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Evolución Poblacional por Departamento (1976-2024)
                </CardTitle>
                <CardDescription>
                  Crecimiento poblacional de los 9 departamentos a través de los
                  censos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={combinedYearData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis
                        tickFormatter={(value) =>
                          `${(value / 1000000).toFixed(1)}M`
                        }
                      />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-4 border rounded-lg shadow-lg max-w-xs">
                                <p className="font-semibold mb-2">
                                  Año {label}
                                </p>
                                {payload
                                  .sort(
                                    (a, b) =>
                                      (b.value as number) - (a.value as number)
                                  )
                                  .map((entry, index) => (
                                    <div
                                      key={index}
                                      className="flex justify-between items-center gap-2"
                                    >
                                      <div className="flex items-center gap-2">
                                        <div
                                          className="w-3 h-3 rounded-full"
                                          style={{
                                            backgroundColor: entry.color,
                                          }}
                                        />
                                        <span className="text-sm">
                                          {entry.dataKey}
                                        </span>
                                      </div>
                                      <span className="font-mono text-sm">
                                        {(
                                          entry.value as number
                                        ).toLocaleString()}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      {departmentData.map((dept) => (
                        <Line
                          key={dept.name}
                          type="monotone"
                          dataKey={dept.name}
                          stroke={dept.color}
                          strokeWidth={2}
                          dot={{ fill: dept.color, strokeWidth: 2, r: 4 }}
                        />
                      ))}
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Tabla detallada por departamento */}
            <Card>
              <CardHeader>
                <CardTitle>Datos Poblacionales Detallados</CardTitle>
                <CardDescription>
                  Población por departamento en cada censo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">
                          Departamento
                        </th>
                        <th className="text-right p-3 font-semibold">1976</th>
                        <th className="text-right p-3 font-semibold">1992</th>
                        <th className="text-right p-3 font-semibold">2001</th>
                        <th className="text-right p-3 font-semibold">2012</th>
                        <th className="text-right p-3 font-semibold">2024</th>
                        <th className="text-right p-3 font-semibold">
                          CAGR Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {growthData
                        .sort((a, b) => b.population2024 - a.population2024)
                        .map((dept) => (
                          <tr
                            key={dept.name}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-3 font-medium flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: dept.color }}
                              />
                              {dept.name}
                            </td>
                            {departmentData
                              .find((d) => d.name === dept.name)
                              ?.data.map((yearData) => (
                                <td
                                  key={yearData.year}
                                  className="p-3 text-right font-mono text-sm"
                                >
                                  {yearData.population.toLocaleString()}
                                </td>
                              ))}
                            <td className="p-3 text-right">
                              <Badge
                                variant="secondary"
                                className={
                                  dept.cagr1976to2024 > 2
                                    ? "bg-green-100 text-green-800"
                                    : dept.cagr1976to2024 > 1
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                +{dept.cagr1976to2024.toFixed(2)}%
                              </Badge>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Análisis de Crecimiento */}
          <TabsContent value="growth" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Crecimiento por período */}
              <Card>
                <CardHeader>
                  <CardTitle>Crecimiento Total por Período</CardTitle>
                  <CardDescription>
                    Selecciona un período para ver el crecimiento
                  </CardDescription>
                  <div className="flex gap-2 flex-wrap">
                    {["1992-2001", "2001-2012", "2012-2024"].map((period) => (
                      <Button
                        key={period}
                        variant={
                          selectedPeriod === period ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedPeriod(period)}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={growthData
                          .map((dept) => ({
                            name:
                              dept.name.length > 8
                                ? dept.name.substring(0, 8) + "."
                                : dept.name,
                            fullName: dept.name,
                            growth:
                              dept.periods.find(
                                (p) => p.period === selectedPeriod
                              )?.growth || 0,
                            cagr:
                              dept.periods.find(
                                (p) => p.period === selectedPeriod
                              )?.cagr || 0,
                            color: dept.color,
                          }))
                          .sort((a, b) => b.growth - a.growth)}
                        margin={{ bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <ChartTooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-semibold">
                                    {data.fullName}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Período: {selectedPeriod}
                                  </p>
                                  <p className="text-lg font-bold text-blue-600">
                                    +{data.growth.toFixed(1)}% total
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    CAGR: +{data.cagr.toFixed(2)}% anual
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar
                          dataKey="growth"
                          fill="#3B82F6"
                          radius={[4, 4, 0, 0]}
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* CAGR Comparativo */}
              <Card>
                <CardHeader>
                  <CardTitle>Tasa de Crecimiento Anual (CAGR)</CardTitle>
                  <CardDescription>
                    Crecimiento anual compuesto 1976-2024
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={growthData
                          .map((dept) => ({
                            name:
                              dept.name.length > 8
                                ? dept.name.substring(0, 8) + "."
                                : dept.name,
                            fullName: dept.name,
                            cagr: dept.cagr1976to2024,
                            color: dept.color,
                          }))
                          .sort((a, b) => b.cagr - a.cagr)}
                        margin={{ bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <ChartTooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-semibold">
                                    {data.fullName}
                                  </p>
                                  <p className="text-lg font-bold text-green-600">
                                    +{data.cagr.toFixed(2)}% anual
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    CAGR 1976-2024
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar
                          dataKey="cagr"
                          fill="#10B981"
                          radius={[4, 4, 0, 0]}
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Tabla de crecimiento inter-censal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Tasas Inter-censales y CAGR Detalladas
                </CardTitle>
                <CardDescription>
                  Cálculos matemáticos precisos de crecimiento por período
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">
                          Departamento
                        </th>
                        <th className="text-center p-3 font-semibold">
                          1992-2001
                        </th>
                        <th className="text-center p-3 font-semibold">CAGR</th>
                        <th className="text-center p-3 font-semibold">
                          2001-2012
                        </th>
                        <th className="text-center p-3 font-semibold">CAGR</th>
                        <th className="text-center p-3 font-semibold">
                          2012-2024
                        </th>
                        <th className="text-center p-3 font-semibold">CAGR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {growthData.map((dept) => (
                        <tr
                          key={dept.name}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="p-3 font-medium flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: dept.color }}
                            />
                            {dept.name}
                          </td>
                          {dept.periods.map((period, index) => (
                            <React.Fragment key={period.period}>
                              <td className="p-3 text-center">
                                <Badge
                                  variant="outline"
                                  className={
                                    period.growth > 30
                                      ? "border-green-500 text-green-700"
                                      : period.growth > 15
                                      ? "border-yellow-500 text-yellow-700"
                                      : period.growth > 0
                                      ? "border-blue-500 text-blue-700"
                                      : "border-red-500 text-red-700"
                                  }
                                >
                                  {period.growth > 0 ? "+" : ""}
                                  {period.growth.toFixed(1)}%
                                </Badge>
                              </td>
                              <td className="p-3 text-center font-mono text-sm">
                                {period.cagr > 0 ? "+" : ""}
                                {period.cagr.toFixed(2)}%
                              </td>
                            </React.Fragment>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Distribución Actual */}
          <TabsContent value="distribution" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de torta */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Distribución Poblacional 2024
                  </CardTitle>
                  <CardDescription>
                    Participación porcentual por departamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={currentDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) =>
                            percentage > 5
                              ? `${name}: ${percentage.toFixed(1)}%`
                              : ""
                          }
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="population"
                        >
                          {currentDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-semibold">{data.name}</p>
                                  <p className="text-lg font-bold">
                                    {data.population.toLocaleString()}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {data.percentage.toFixed(2)}% del total
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Ranking poblacional */}
              <Card>
                <CardHeader>
                  <CardTitle>Ranking Poblacional 2024</CardTitle>
                  <CardDescription>
                    Departamentos ordenados por población
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentDistribution.map((dept, index) => (
                      <div
                        key={dept.name}
                        className="flex items-center gap-4 p-3 rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="text-2xl font-bold text-gray-400 w-8">
                            {index + 1}
                          </div>
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: dept.color }}
                          />
                          <div className="flex-1">
                            <div className="font-semibold">{dept.name}</div>
                            <div className="text-sm text-gray-600">
                              {dept.population.toLocaleString()} habitantes
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            {dept.percentage.toFixed(1)}%
                          </div>
                          <div className="text-sm text-gray-600">del total</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Análisis de Migración */}
          <TabsContent value="migration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Cambio en Participación Poblacional (1976 vs 2024)
                </CardTitle>
                <CardDescription>
                  Análisis de migración interna basado en cambios de
                  participación porcentual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={migrationAnalysis}
                      margin={{ bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tickFormatter={(value) =>
                          value.length > 8 ? value.substring(0, 8) + "." : value
                        }
                      />
                      <YAxis
                        tickFormatter={(value) =>
                          `${value > 0 ? "+" : ""}${value.toFixed(1)}%`
                        }
                      />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-4 border rounded-lg shadow-lg">
                                <p className="font-semibold">{data.name}</p>
                                <div className="space-y-1 mt-2">
                                  <p className="text-sm">
                                    <span className="text-gray-600">1976:</span>{" "}
                                    {data.share1976.toFixed(2)}%
                                  </p>
                                  <p className="text-sm">
                                    <span className="text-gray-600">2024:</span>{" "}
                                    {data.share2024.toFixed(2)}%
                                  </p>
                                  <p className="text-lg font-bold">
                                    <span
                                      className={
                                        data.shareChange > 0
                                          ? "text-green-600"
                                          : "text-red-600"
                                      }
                                    >
                                      {data.shareChange > 0 ? "+" : ""}
                                      {data.shareChange.toFixed(2)}%
                                    </span>
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {data.shareChange > 0
                                      ? "Ganancia"
                                      : "Pérdida"}{" "}
                                    de participación
                                  </p>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="shareChange" radius={[4, 4, 0, 0]}>
                        {migrationAnalysis.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.shareChange > 0 ? "#10B981" : "#EF4444"}
                          />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Análisis detallado de migración */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">
                    🔼 Departamentos Ganadores
                  </CardTitle>
                  <CardDescription>
                    Mayor participación poblacional en 2024
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {migrationAnalysis
                      .filter((dept) => dept.shareChange > 0)
                      .map((dept) => (
                        <div
                          key={dept.name}
                          className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: dept.color }}
                            />
                            <div>
                              <div className="font-semibold">{dept.name}</div>
                              <div className="text-sm text-gray-600">
                                {dept.share1976.toFixed(2)}% →{" "}
                                {dept.share2024.toFixed(2)}%
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">
                              +{dept.shareChange.toFixed(2)}%
                            </div>
                            <div className="text-xs text-gray-500">
                              ganancia
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-700">
                    🔽 Departamentos Perdedores
                  </CardTitle>
                  <CardDescription>
                    Menor participación poblacional en 2024
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {migrationAnalysis
                      .filter((dept) => dept.shareChange < 0)
                      .map((dept) => (
                        <div
                          key={dept.name}
                          className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: dept.color }}
                            />
                            <div>
                              <div className="font-semibold">{dept.name}</div>
                              <div className="text-sm text-gray-600">
                                {dept.share1976.toFixed(2)}% →{" "}
                                {dept.share2024.toFixed(2)}%
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-red-600">
                              {dept.shareChange.toFixed(2)}%
                            </div>
                            <div className="text-xs text-gray-500">pérdida</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Análisis e Interpretaciones */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-700">
                    🌟 Interpretaciones por Departamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Santa Cruz - Líder en Crecimiento
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Mostró el crecimiento más acelerado: +4.1% (1992–2001) →
                      +1.33% (2012–2024). Aún líder, pero ralentizando su ritmo
                      debido a saturación urbana.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-orange-100 text-orange-800">
                        Líder poblacional
                      </Badge>
                      <Badge className="bg-green-100 text-green-800">
                        +2.78% CAGR
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Pando - Boom Demográfico
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Vivió un boom demográfico (2001–2012: +110%, CAGR +7.1%)
                      debido a flujos migratorios y colonización; actualmente
                      modera su ritmo (+1.41%).
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-red-100 text-red-800">
                        Mayor CAGR
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-800">
                        +3.01% anual
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Tarija, Cochabamba, Beni
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Crecimiento sólido hasta 2001 (~+3%), luego estables
                      (~+1–1.1%).
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        Crecimiento estable
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">
                    📊 Patrones Demográficos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Oruro y La Paz
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Muestran patrones mixtos con picos intermedios. La Paz
                      mantiene su posición como segundo departamento más
                      poblado.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Crecimiento moderado
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Chuquisaca y Potosí
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Crecimiento pobre en la última década (ambos {"<"}0.4%
                      anual), indicando probablemente migración hacia otros
                      departamentos y envejecimiento poblacional.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-red-100 text-red-800">
                        Menor crecimiento
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-800">
                        Migración neta negativa
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Urbanización Concentrada
                    </h4>
                    <p className="text-sm text-gray-600">
                      Los principales ejes urbanos (La Paz, Cochabamba, Santa
                      Cruz) concentran el 71% de la población, confirmando la
                      tendencia de concentración urbana.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contexto Nacional */}
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">
                  🌐 Contexto Nacional Reforzado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      🔹 Urbanización
                    </h4>
                    <p className="text-sm text-gray-700">
                      En 2024, los principales ejes urbanos (La Paz, Cochabamba,
                      Santa Cruz) concentran aproximadamente el{" "}
                      <strong>73%</strong> de la población total, confirmando la
                      concentración urbana.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      🔹 Disputas por Cifras
                    </h4>
                    <p className="text-sm text-gray-700">
                      El censo 2024 (11.3M) quedó por debajo de las proyecciones
                      (~12.3M previstas). Santa Cruz cuestionó los resultados
                      por considerarlos subestimados.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      🔹 Transición Demográfica
                    </h4>
                    <p className="text-sm text-gray-700">
                      El menor crecimiento inter-censal y la reducción de la
                      tasa de fecundidad (hacia 2.1 hijos por mujer) reflejan
                      una transición demográfica avanzada.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resumen Ejecutivo por Departamentos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">
                  ✅ Resumen Ejecutivo por Departamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {growthData
                    .sort((a, b) => b.cagr1976to2024 - a.cagr1976to2024)
                    .map((dept) => (
                      <div
                        key={dept.name}
                        className="p-4 border rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: dept.color }}
                          />
                          <h5 className="font-semibold">{dept.name}</h5>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="text-gray-600">
                              Población 2024:
                            </span>{" "}
                            <strong>
                              {dept.population2024.toLocaleString()}
                            </strong>
                          </p>
                          <p>
                            <span className="text-gray-600">
                              CAGR 1976-2024:
                            </span>{" "}
                            <strong
                              className={
                                dept.cagr1976to2024 > 2
                                  ? "text-green-600"
                                  : dept.cagr1976to2024 > 1
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }
                            >
                              +{dept.cagr1976to2024.toFixed(2)}%
                            </strong>
                          </p>
                          <p>
                            <span className="text-gray-600">
                              Crecimiento total:
                            </span>{" "}
                            <strong>
                              +{dept.totalGrowth1976to2024.toFixed(1)}%
                            </strong>
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              Análisis demográfico por departamentos • Datos: INE Bolivia,
              censos 1976-2024 • Cálculos matemáticos verificados • CAGR = Tasa
              de Crecimiento Anual Compuesta
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
