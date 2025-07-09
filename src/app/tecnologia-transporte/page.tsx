"use client";

import { useState } from "react";
import {
  Smartphone,
  Wifi,
  Car,
  Bike,
  Truck,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  Zap,
  Globe,
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  ScatterChart,
  Scatter,
} from "recharts";

// Datos del censo 2012 organizados por departamento
const departamentosData = {
  bolivia: {
    nombre: "BOLIVIA (Total Nacional)",
    hogares: 2803982,
    color: "#1F2937",
    tecnologia: {
      internet: { si: 268334, no: 2535648, porcentaje: 9.57 },
      telefono: { si: 1825374, no: 978608, porcentaje: 65.11 },
    },
    transporte: {
      vehiculo: { si: 614383, no: 2189599, porcentaje: 21.92 },
      bicicleta: { si: 854404, no: 1949578, porcentaje: 30.47 },
      motocicleta: { si: 319813, no: 2484169, porcentaje: 11.41 },
      carreta: { si: 112619, no: 2691363, porcentaje: 4.02 },
    },
  },
  chuquisaca: {
    nombre: "Chuquisaca",
    hogares: 150202,
    color: "#EF4444",
    tecnologia: {
      internet: { si: 12136, no: 138066, porcentaje: 8.08 },
      telefono: { si: 82761, no: 67441, porcentaje: 55.11 },
    },
    transporte: {
      vehiculo: { si: 26571, no: 123631, porcentaje: 17.69 },
      bicicleta: { si: 32777, no: 117425, porcentaje: 21.82 },
      motocicleta: { si: 11183, no: 139019, porcentaje: 7.44 },
      carreta: { si: 2322, no: 147880, porcentaje: 1.55 },
    },
  },
  la_paz: {
    nombre: "La Paz",
    hogares: 852573,
    color: "#3B82F6",
    tecnologia: {
      internet: { si: 67552, no: 785021, porcentaje: 7.92 },
      telefono: { si: 561765, no: 290808, porcentaje: 65.89 },
    },
    transporte: {
      vehiculo: { si: 164140, no: 688433, porcentaje: 19.25 },
      bicicleta: { si: 239198, no: 613375, porcentaje: 28.06 },
      motocicleta: { si: 35675, no: 816898, porcentaje: 4.18 },
      carreta: { si: 59701, no: 792872, porcentaje: 7.0 },
    },
  },
  cochabamba: {
    nombre: "Cochabamba",
    hogares: 516608,
    color: "#10B981",
    tecnologia: {
      internet: { si: 47762, no: 468846, porcentaje: 9.25 },
      telefono: { si: 339200, no: 177408, porcentaje: 65.66 },
    },
    transporte: {
      vehiculo: { si: 129536, no: 387072, porcentaje: 25.07 },
      bicicleta: { si: 195877, no: 320731, porcentaje: 37.92 },
      motocicleta: { si: 62676, no: 453932, porcentaje: 12.13 },
      carreta: { si: 17702, no: 498906, porcentaje: 3.43 },
    },
  },
  oruro: {
    nombre: "Oruro",
    hogares: 152061,
    color: "#F59E0B",
    tecnologia: {
      internet: { si: 10095, no: 141966, porcentaje: 6.64 },
      telefono: { si: 93603, no: 58458, porcentaje: 61.55 },
    },
    transporte: {
      vehiculo: { si: 33369, no: 118692, porcentaje: 21.94 },
      bicicleta: { si: 72916, no: 79145, porcentaje: 47.94 },
      motocicleta: { si: 11408, no: 140653, porcentaje: 7.5 },
      carreta: { si: 5859, no: 146202, porcentaje: 3.85 },
    },
  },
  potosi: {
    nombre: "Potosí",
    hogares: 242181,
    color: "#8B5CF6",
    tecnologia: {
      internet: { si: 7670, no: 234511, porcentaje: 3.17 },
      telefono: { si: 110993, no: 131188, porcentaje: 45.83 },
    },
    transporte: {
      vehiculo: { si: 36416, no: 205765, porcentaje: 15.04 },
      bicicleta: { si: 66847, no: 175334, porcentaje: 27.61 },
      motocicleta: { si: 10858, no: 231323, porcentaje: 4.48 },
      carreta: { si: 4794, no: 237387, porcentaje: 1.98 },
    },
  },
  tarija: {
    nombre: "Tarija",
    hogares: 126248,
    color: "#EC4899",
    tecnologia: {
      internet: { si: 12164, no: 114084, porcentaje: 9.64 },
      telefono: { si: 90696, no: 35552, porcentaje: 71.84 },
    },
    transporte: {
      vehiculo: { si: 33407, no: 92841, porcentaje: 26.46 },
      bicicleta: { si: 44038, no: 82210, porcentaje: 34.88 },
      motocicleta: { si: 20699, no: 105549, porcentaje: 16.4 },
      carreta: { si: 2916, no: 123332, porcentaje: 2.31 },
    },
  },
  santa_cruz: {
    nombre: "Santa Cruz",
    hogares: 644854,
    color: "#06B6D4",
    tecnologia: {
      internet: { si: 103402, no: 541452, porcentaje: 16.03 },
      telefono: { si: 480881, no: 163973, porcentaje: 74.58 },
    },
    transporte: {
      vehiculo: { si: 178074, no: 466780, porcentaje: 27.61 },
      bicicleta: { si: 180595, no: 464259, porcentaje: 28.0 },
      motocicleta: { si: 104311, no: 540543, porcentaje: 16.17 },
      carreta: { si: 15054, no: 629800, porcentaje: 2.33 },
    },
  },
  beni: {
    nombre: "Beni",
    hogares: 93890,
    color: "#84CC16",
    tecnologia: {
      internet: { si: 5887, no: 88003, porcentaje: 6.27 },
      telefono: { si: 53298, no: 40592, porcentaje: 56.76 },
    },
    transporte: {
      vehiculo: { si: 9708, no: 84182, porcentaje: 10.34 },
      bicicleta: { si: 18681, no: 75209, porcentaje: 19.9 },
      motocicleta: { si: 48761, no: 45129, porcentaje: 51.94 },
      carreta: { si: 3955, no: 89935, porcentaje: 4.21 },
    },
  },
  pando: {
    nombre: "Pando",
    hogares: 25365,
    color: "#F97316",
    tecnologia: {
      internet: { si: 1666, no: 23699, porcentaje: 6.57 },
      telefono: { si: 12177, no: 13188, porcentaje: 47.99 },
    },
    transporte: {
      vehiculo: { si: 3162, no: 22203, porcentaje: 12.46 },
      bicicleta: { si: 3475, no: 21890, porcentaje: 13.7 },
      motocicleta: { si: 14242, no: 11123, porcentaje: 56.15 },
      carreta: { si: 316, no: 25049, porcentaje: 1.25 },
    },
  },
};

const departamentos = Object.keys(departamentosData).filter(
  (key) => key !== "bolivia"
);

// Función para obtener color según el porcentaje
const getColorByPercentage = (percentage: number) => {
  if (percentage >= 50) return "text-green-600 bg-green-100";
  if (percentage >= 30) return "text-yellow-600 bg-yellow-100";
  if (percentage >= 15) return "text-orange-600 bg-orange-100";
  return "text-red-600 bg-red-100";
};

// Función para obtener icono según el nivel
const getIconByPercentage = (percentage: number) => {
  if (percentage >= 50)
    return <CheckCircle className="h-4 w-4 text-green-600" />;
  if (percentage >= 30)
    return <AlertCircle className="h-4 w-4 text-yellow-600" />;
  return <XCircle className="h-4 w-4 text-red-600" />;
};

const chartConfig = {
  internet: { label: "Internet", color: "#8B5CF6" },
  telefono: { label: "Teléfono", color: "#10B981" },
  vehiculo: { label: "Vehículo", color: "#3B82F6" },
  bicicleta: { label: "Bicicleta", color: "#F59E0B" },
  motocicleta: { label: "Motocicleta", color: "#EF4444" },
  carreta: { label: "Carreta", color: "#6B7280" },
};

export default function TecnologiaTransporteDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState("santa_cruz");
  const [selectedCategory, setSelectedCategory] = useState("tecnologia");

  const currentData =
    departamentosData[selectedDepartment as keyof typeof departamentosData];

  // Datos para comparación de tecnología
  const tecnologiaComparison = departamentos.map((key) => {
    const data = departamentosData[key as keyof typeof departamentosData];
    return {
      departamento: data.nombre,
      internet: data.tecnologia.internet.porcentaje,
      telefono: data.tecnologia.telefono.porcentaje,
      color: data.color,
      hogares: data.hogares,
    };
  });

  // Datos para comparación de transporte
  const transporteComparison = departamentos.map((key) => {
    const data = departamentosData[key as keyof typeof departamentosData];
    return {
      departamento: data.nombre,
      vehiculo: data.transporte.vehiculo.porcentaje,
      bicicleta: data.transporte.bicicleta.porcentaje,
      motocicleta: data.transporte.motocicleta.porcentaje,
      carreta: data.transporte.carreta.porcentaje,
      color: data.color,
    };
  });

  // Datos para análisis de brecha digital
  const brechaDigital = departamentos.map((key) => {
    const data = departamentosData[key as keyof typeof departamentosData];
    return {
      departamento: data.nombre,
      internet: data.tecnologia.internet.porcentaje,
      telefono: data.tecnologia.telefono.porcentaje,
      diferencia:
        data.tecnologia.telefono.porcentaje -
        data.tecnologia.internet.porcentaje,
      color: data.color,
    };
  });

  // Datos para movilidad urbana vs rural
  const movilidadAnalysis = departamentos.map((key) => {
    const data = departamentosData[key as keyof typeof departamentosData];
    const urbano =
      data.transporte.vehiculo.porcentaje +
      data.transporte.motocicleta.porcentaje;
    const rural =
      data.transporte.bicicleta.porcentaje + data.transporte.carreta.porcentaje;
    return {
      departamento: data.nombre,
      urbano,
      rural,
      vehiculo: data.transporte.vehiculo.porcentaje,
      bicicleta: data.transporte.bicicleta.porcentaje,
      color: data.color,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Tecnología y Transporte en Bolivia
              </h1>
              <p className="text-gray-600 mt-1">
                ¿Cómo se conectan y se movilizan las familias bolivianas? Censo
                2012 por departamentos
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Explicación Simple */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <Users className="h-5 w-5" />
              ¿Qué mide este análisis?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-purple-900 mb-3">
                  🌐 Tecnología de Comunicación
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                    <Wifi className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-medium text-sm">Internet</div>
                      <div className="text-xs text-gray-600">
                        Conexión a internet en casa
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                    <Smartphone className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium text-sm">Teléfono</div>
                      <div className="text-xs text-gray-600">
                        Teléfono fijo o celular
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-3">
                  🚗 Medios de Transporte
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <Car className="h-4 w-4 text-blue-500" />
                    <span className="text-xs">Auto</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <Bike className="h-4 w-4 text-orange-500" />
                    <span className="text-xs">Bicicleta</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <Zap className="h-4 w-4 text-red-500" />
                    <span className="text-xs">Moto</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <Truck className="h-4 w-4 text-gray-500" />
                    <span className="text-xs">Carreta</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas Nacionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Hogares con Internet
              </CardTitle>
              <Wifi className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {departamentosData.bolivia.tecnologia.internet.porcentaje.toFixed(
                  1
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                {departamentosData.bolivia.tecnologia.internet.si.toLocaleString()}{" "}
                de {departamentosData.bolivia.hogares.toLocaleString()} hogares
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Hogares con Teléfono
              </CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {departamentosData.bolivia.tecnologia.telefono.porcentaje.toFixed(
                  1
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                {departamentosData.bolivia.tecnologia.telefono.si.toLocaleString()}{" "}
                hogares conectados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Hogares con Vehículo
              </CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {departamentosData.bolivia.transporte.vehiculo.porcentaje.toFixed(
                  1
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                {departamentosData.bolivia.transporte.vehiculo.si.toLocaleString()}{" "}
                familias con auto
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Hogares con Bicicleta
              </CardTitle>
              <Bike className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {departamentosData.bolivia.transporte.bicicleta.porcentaje.toFixed(
                  1
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                {departamentosData.bolivia.transporte.bicicleta.si.toLocaleString()}{" "}
                familias con bici
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Selector de Departamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Selecciona un Departamento
            </CardTitle>
            <CardDescription>
              Explora cómo viven las familias en cada departamento de Bolivia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {departamentos.map((key) => {
                const data =
                  departamentosData[key as keyof typeof departamentosData];
                const isSelected = selectedDepartment === key;
                return (
                  <Button
                    key={key}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-auto p-3 flex flex-col items-center gap-2 ${
                      isSelected ? "ring-2 ring-purple-500" : ""
                    }`}
                    onClick={() => setSelectedDepartment(key)}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: data.color }}
                    />
                    <div className="font-semibold text-sm text-center">
                      {data.nombre}
                    </div>
                    <div className="text-xs text-gray-600">
                      {(data.hogares / 1000).toFixed(0)}k hogares
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Información del Departamento Seleccionado */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: currentData.color }}
              />
              {currentData.nombre}
            </CardTitle>
            <CardDescription>
              Situación actual de tecnología y transporte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-blue-900 mb-3">
                  📊 Datos Generales
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total de hogares:</span>
                    <span className="font-bold">
                      {currentData.hogares.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>% del país:</span>
                    <span className="font-bold">
                      {(
                        (currentData.hogares /
                          departamentosData.bolivia.hogares) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-purple-900 mb-3">
                  🌐 Conectividad
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Internet:</span>
                    <Badge
                      className={getColorByPercentage(
                        currentData.tecnologia.internet.porcentaje
                      )}
                    >
                      {currentData.tecnologia.internet.porcentaje.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Teléfono:</span>
                    <Badge
                      className={getColorByPercentage(
                        currentData.tecnologia.telefono.porcentaje
                      )}
                    >
                      {currentData.tecnologia.telefono.porcentaje.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-green-900 mb-3">
                  🚗 Movilidad
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Vehículo:</span>
                    <Badge
                      className={getColorByPercentage(
                        currentData.transporte.vehiculo.porcentaje
                      )}
                    >
                      {currentData.transporte.vehiculo.porcentaje.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bicicleta:</span>
                    <Badge
                      className={getColorByPercentage(
                        currentData.transporte.bicicleta.porcentaje
                      )}
                    >
                      {currentData.transporte.bicicleta.porcentaje.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs para diferentes análisis */}
        <Tabs defaultValue="tecnologia" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="tecnologia">Brecha Digital</TabsTrigger>
            <TabsTrigger value="transporte">Movilidad</TabsTrigger>
            <TabsTrigger value="comparacion">
              Comparar Departamentos
            </TabsTrigger>
            <TabsTrigger value="analisis">Análisis Nacional</TabsTrigger>
          </TabsList>

          {/* Tab: Brecha Digital */}
          <TabsContent value="tecnologia" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de brecha digital */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="h-5 w-5" />
                    Brecha Digital por Departamento
                  </CardTitle>
                  <CardDescription>
                    Diferencia entre acceso a teléfono e internet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={brechaDigital}
                        margin={{ bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="departamento"
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          tickFormatter={(value) =>
                            value.length > 8
                              ? value.substring(0, 8) + "..."
                              : value
                          }
                        />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <ChartTooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-4 border rounded-lg shadow-lg">
                                  <p className="font-semibold mb-2">{label}</p>
                                  <div className="space-y-1">
                                    <p className="text-sm">
                                      <span className="text-green-600">
                                        Teléfono:
                                      </span>{" "}
                                      {data.telefono.toFixed(1)}%
                                    </p>
                                    <p className="text-sm">
                                      <span className="text-purple-600">
                                        Internet:
                                      </span>{" "}
                                      {data.internet.toFixed(1)}%
                                    </p>
                                    <p className="text-sm font-bold">
                                      <span className="text-red-600">
                                        Brecha:
                                      </span>{" "}
                                      {data.diferencia.toFixed(1)}%
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar
                          dataKey="telefono"
                          fill="#10B981"
                          name="Teléfono"
                        />
                        <Bar
                          dataKey="internet"
                          fill="#8B5CF6"
                          name="Internet"
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Análisis de conectividad */}
              <Card>
                <CardHeader>
                  <CardTitle>Niveles de Conectividad</CardTitle>
                  <CardDescription>
                    Clasificación por acceso a tecnología
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tecnologiaComparison
                    .sort((a, b) => b.internet - a.internet)
                    .map((dept, index) => (
                      <div key={dept.departamento} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-bold text-gray-400 w-6">
                              {index + 1}
                            </div>
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: dept.color }}
                            />
                            <span className="font-medium text-sm">
                              {dept.departamento}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getIconByPercentage(dept.internet)}
                            <Badge
                              className={getColorByPercentage(dept.internet)}
                            >
                              {dept.internet.toFixed(1)}% internet
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span>Internet:</span>
                            <span className="font-bold">
                              {dept.internet.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Teléfono:</span>
                            <span className="font-bold">
                              {dept.telefono.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <Progress value={dept.internet} className="h-2" />
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>

            {/* Interpretación de brecha digital */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">
                  📱 ¿Qué nos dice la Brecha Digital?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2">
                      🏆 Mejor Conectados
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {tecnologiaComparison
                        .sort((a, b) => b.internet - a.internet)
                        .slice(0, 3)
                        .map((dept) => (
                          <li
                            key={dept.departamento}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>
                              {dept.departamento}: {dept.internet.toFixed(1)}%
                              internet
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-900 mb-2">
                      ⚠️ Brecha Más Grande
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {brechaDigital
                        .sort((a, b) => b.diferencia - a.diferencia)
                        .slice(0, 3)
                        .map((dept) => (
                          <li
                            key={dept.departamento}
                            className="flex items-center gap-2"
                          >
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            <span>
                              {dept.departamento}: {dept.diferencia.toFixed(1)}%
                              de diferencia
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      💡 Conclusión
                    </h4>
                    <p className="text-sm text-blue-700">
                      Mientras que el teléfono llegó al{" "}
                      {departamentosData.bolivia.tecnologia.telefono.porcentaje.toFixed(
                        1
                      )}
                      % de hogares, internet solo al{" "}
                      {departamentosData.bolivia.tecnologia.internet.porcentaje.toFixed(
                        1
                      )}
                      %. Esto muestra una gran brecha digital que afecta
                      especialmente a departamentos rurales.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Movilidad y Transporte */}
          <TabsContent value="transporte" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de medios de transporte */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Medios de Transporte por Departamento
                  </CardTitle>
                  <CardDescription>
                    ¿Cómo se movilizan las familias?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={transporteComparison}
                        margin={{ bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="departamento"
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          tickFormatter={(value) =>
                            value.length > 8
                              ? value.substring(0, 8) + "..."
                              : value
                          }
                        />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <ChartTooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-4 border rounded-lg shadow-lg">
                                  <p className="font-semibold mb-2">{label}</p>
                                  {payload.map((entry, index) => (
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
                                        {(entry.value as number).toFixed(1)}%
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar
                          dataKey="vehiculo"
                          fill="#3B82F6"
                          name="Vehículo"
                        />
                        <Bar
                          dataKey="bicicleta"
                          fill="#F59E0B"
                          name="Bicicleta"
                        />
                        <Bar
                          dataKey="motocicleta"
                          fill="#EF4444"
                          name="Motocicleta"
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Análisis urbano vs rural */}
              <Card>
                <CardHeader>
                  <CardTitle>Movilidad Urbana vs Rural</CardTitle>
                  <CardDescription>
                    Patrones de transporte por tipo de zona
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart data={movilidadAnalysis}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="vehiculo"
                          type="number"
                          tickFormatter={(value) => `${value}%`}
                          name="Vehículos"
                        />
                        <YAxis
                          dataKey="bicicleta"
                          type="number"
                          tickFormatter={(value) => `${value}%`}
                          name="Bicicletas"
                        />
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-semibold">
                                    {data.departamento}
                                  </p>
                                  <p className="text-sm">
                                    Vehículos: {data.vehiculo.toFixed(1)}%
                                  </p>
                                  <p className="text-sm">
                                    Bicicletas: {data.bicicleta.toFixed(1)}%
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Scatter dataKey="bicicleta" fill="#8884d8">
                          {movilidadAnalysis.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Casos especiales de transporte */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-700">
                    🏍️ Departamentos "Motorizados"
                  </CardTitle>
                  <CardDescription>
                    Donde las motocicletas son más populares
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transporteComparison
                      .sort((a, b) => b.motocicleta - a.motocicleta)
                      .slice(0, 4)
                      .map((dept, index) => (
                        <div
                          key={dept.departamento}
                          className="flex items-center gap-4 p-3 bg-red-50 rounded-lg"
                        >
                          <div className="text-2xl font-bold text-gray-400 w-8">
                            {index + 1}
                          </div>
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: dept.color }}
                          />
                          <div className="flex-1">
                            <div className="font-semibold">
                              {dept.departamento}
                            </div>
                            <div className="text-sm text-gray-600">
                              {dept.motocicleta.toFixed(1)}% de hogares con moto
                            </div>
                          </div>
                          <Zap className="h-5 w-5 text-red-500" />
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">
                    🚗 Departamentos con Más Vehículos
                  </CardTitle>
                  <CardDescription>Mayor acceso a automóviles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transporteComparison
                      .sort((a, b) => b.vehiculo - a.vehiculo)
                      .slice(0, 4)
                      .map((dept, index) => (
                        <div
                          key={dept.departamento}
                          className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg"
                        >
                          <div className="text-2xl font-bold text-gray-400 w-8">
                            {index + 1}
                          </div>
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: dept.color }}
                          />
                          <div className="flex-1">
                            <div className="font-semibold">
                              {dept.departamento}
                            </div>
                            <div className="text-sm text-gray-600">
                              {dept.vehiculo.toFixed(1)}% de hogares con auto
                            </div>
                          </div>
                          <Car className="h-5 w-5 text-blue-500" />
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Comparación Departamental */}
          <TabsContent value="comparacion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Ranking Departamental
                </CardTitle>
                <CardDescription>
                  Comparación completa de tecnología y transporte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">
                          Departamento
                        </th>
                        <th className="text-center p-3 font-semibold">
                          Hogares
                        </th>
                        <th className="text-center p-3 font-semibold">
                          Internet
                        </th>
                        <th className="text-center p-3 font-semibold">
                          Teléfono
                        </th>
                        <th className="text-center p-3 font-semibold">
                          Vehículo
                        </th>
                        <th className="text-center p-3 font-semibold">
                          Bicicleta
                        </th>
                        <th className="text-center p-3 font-semibold">
                          Motocicleta
                        </th>
                        <th className="text-center p-3 font-semibold">
                          Promedio
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {departamentos
                        .map((key) => {
                          const data =
                            departamentosData[
                              key as keyof typeof departamentosData
                            ];
                          const promedio =
                            (data.tecnologia.internet.porcentaje +
                              data.tecnologia.telefono.porcentaje +
                              data.transporte.vehiculo.porcentaje +
                              data.transporte.bicicleta.porcentaje) /
                            4;
                          return { key, data, promedio };
                        })
                        .sort((a, b) => b.promedio - a.promedio)
                        .map(({ key, data, promedio }, index) => (
                          <tr key={key} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium flex items-center gap-2">
                              <div className="text-lg font-bold text-gray-400 w-6">
                                {index + 1}
                              </div>
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: data.color }}
                              />
                              {data.nombre}
                            </td>
                            <td className="p-3 text-center font-mono">
                              {(data.hogares / 1000).toFixed(0)}k
                            </td>
                            <td className="p-3 text-center">
                              <Badge
                                className={getColorByPercentage(
                                  data.tecnologia.internet.porcentaje
                                )}
                              >
                                {data.tecnologia.internet.porcentaje.toFixed(1)}
                                %
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <Badge
                                className={getColorByPercentage(
                                  data.tecnologia.telefono.porcentaje
                                )}
                              >
                                {data.tecnologia.telefono.porcentaje.toFixed(1)}
                                %
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <Badge
                                className={getColorByPercentage(
                                  data.transporte.vehiculo.porcentaje
                                )}
                              >
                                {data.transporte.vehiculo.porcentaje.toFixed(1)}
                                %
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <Badge
                                className={getColorByPercentage(
                                  data.transporte.bicicleta.porcentaje
                                )}
                              >
                                {data.transporte.bicicleta.porcentaje.toFixed(
                                  1
                                )}
                                %
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <Badge
                                className={getColorByPercentage(
                                  data.transporte.motocicleta.porcentaje
                                )}
                              >
                                {data.transporte.motocicleta.porcentaje.toFixed(
                                  1
                                )}
                                %
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center gap-2">
                                {getIconByPercentage(promedio)}
                                <span className="font-bold">
                                  {promedio.toFixed(1)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Análisis Nacional */}
          <TabsContent value="analisis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Distribución nacional */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Distribución Nacional de Internet
                  </CardTitle>
                  <CardDescription>
                    ¿Qué departamentos concentran el acceso?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={tecnologiaComparison.map((dept) => ({
                            name: dept.departamento,
                            value: (dept.internet / 100) * dept.hogares,
                            color: dept.color,
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            typeof percent === "number" && percent > 0.05
                              ? `${name}: ${(percent * 100).toFixed(1)}%`
                              : ""
                          }
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {tecnologiaComparison.map((entry, index) => (
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
                                    {(data.value / 1000).toFixed(0)}k hogares
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    con internet
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

              {/* Tendencias por tamaño */}
              <Card>
                <CardHeader>
                  <CardTitle>Relación Tamaño vs Conectividad</CardTitle>
                  <CardDescription>
                    ¿Los departamentos más grandes están mejor conectados?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart data={tecnologiaComparison}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="hogares"
                          type="number"
                          scale="log"
                          domain={["dataMin", "dataMax"]}
                          tickFormatter={(value) =>
                            `${(value / 1000).toFixed(0)}k`
                          }
                          name="Hogares"
                        />
                        <YAxis
                          dataKey="internet"
                          type="number"
                          tickFormatter={(value) => `${value}%`}
                          name="Internet"
                        />
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-semibold">
                                    {data.departamento}
                                  </p>
                                  <p className="text-sm">
                                    Hogares: {(data.hogares / 1000).toFixed(0)}k
                                  </p>
                                  <p className="text-sm">
                                    Internet: {data.internet.toFixed(1)}%
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Scatter dataKey="internet" fill="#8884d8">
                          {tecnologiaComparison.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Conclusiones nacionales */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">
                  🎯 Conclusiones Nacionales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">
                      ✅ Fortalezas
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Teléfono llegó al 65% de hogares</li>
                      <li>• Santa Cruz lidera en conectividad</li>
                      <li>• Bicicletas populares (30% nacional)</li>
                      <li>• Motocicletas importantes en Beni/Pando</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-900 mb-2">
                      ⚠️ Desafíos
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Internet muy limitado (solo 9.6%)</li>
                      <li>• Brecha enorme entre departamentos</li>
                      <li>• Potosí muy rezagado en tecnología</li>
                      <li>• Vehículos solo para 22% de familias</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      🎯 Oportunidades
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Expandir internet rural</li>
                      <li>• Aprovechar base telefónica</li>
                      <li>• Promover transporte sostenible</li>
                      <li>• Reducir brecha digital</li>
                    </ul>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">
                    📊 Datos Clave del Censo 2012
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-bold text-purple-600">9.6%</div>
                      <div className="text-gray-600">Hogares con internet</div>
                    </div>
                    <div>
                      <div className="font-bold text-green-600">65.1%</div>
                      <div className="text-gray-600">Hogares con teléfono</div>
                    </div>
                    <div>
                      <div className="font-bold text-blue-600">21.9%</div>
                      <div className="text-gray-600">Hogares con vehículo</div>
                    </div>
                    <div>
                      <div className="font-bold text-orange-600">30.5%</div>
                      <div className="text-gray-600">Hogares con bicicleta</div>
                    </div>
                  </div>
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
              Datos del Censo Nacional de Población y Vivienda 2012 • Instituto
              Nacional de Estadística (INE) • Análisis de Tecnología y
              Transporte por Departamentos
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
