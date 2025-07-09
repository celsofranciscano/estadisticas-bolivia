"use client";

import { useState } from "react";
import {
  Home,
  Droplets,
  Zap,
  Wifi,
  Trash2,
  Phone,
  Monitor,
  Tv,
  MapPin,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  BarChart3,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

// Datos simplificados y organizados del censo
const serviciosData = {
  cochabamba: {
    nombre: "Cochabamba (Capital)",
    viviendas: 177376,
    poblacion: 621184,
    servicios: {
      agua: 60.8,
      energia: 96.1,
      bano: 87.0,
      alcantarillado: 63.4,
      gas: 72.9,
    },
    tecnologia: {
      televisor: 95.2,
      telefono: 87.1,
      computadora: 84.3,
      internet: 39.1,
    },
    basura: {
      basurero_publico: 28.7,
      recoleccion: 61.2,
      terreno_baldio: 0.8,
      rio: 1.4,
      queman: 7.1,
    },
    cobertura: {
      agua: 65.5,
      saneamiento: 63.5,
      energia: 97.2,
    },
  },
  quillacollo: {
    nombre: "Quillacollo",
    viviendas: 35931,
    poblacion: 134859,
    servicios: {
      agua: 70.8,
      energia: 96.4,
      bano: 89.2,
      alcantarillado: 59.9,
      gas: 67.1,
    },
    tecnologia: {
      televisor: 92.8,
      telefono: 87.0,
      computadora: 82.1,
      internet: 30.5,
    },
    basura: {
      basurero_publico: 12.3,
      recoleccion: 63.9,
      terreno_baldio: 1.9,
      rio: 2.6,
      queman: 17.6,
    },
    cobertura: {
      agua: 80.3,
      saneamiento: 61.6,
      energia: 97.0,
    },
  },
  sacaba: {
    nombre: "Sacaba",
    viviendas: 47536,
    poblacion: 169736,
    servicios: {
      agua: 59.1,
      energia: 90.8,
      bano: 78.4,
      alcantarillado: 51.2,
      gas: 65.3,
    },
    tecnologia: {
      televisor: 85.5,
      telefono: 78.3,
      computadora: 76.2,
      internet: 29.1,
    },
    basura: {
      basurero_publico: 13.5,
      recoleccion: 52.7,
      terreno_baldio: 3.1,
      rio: 5.9,
      queman: 22.4,
    },
    cobertura: {
      agua: 72.7,
      saneamiento: 57.8,
      energia: 93.3,
    },
  },
  villa_tunari: {
    nombre: "Villa Tunari",
    viviendas: 26725,
    poblacion: 69205,
    servicios: {
      agua: 18.4,
      energia: 44.1,
      bano: 60.9,
      alcantarillado: 7.2,
      gas: 11.9,
    },
    tecnologia: {
      televisor: 36.6,
      telefono: 28.7,
      computadora: 31.3,
      internet: 3.6,
    },
    basura: {
      basurero_publico: 1.5,
      recoleccion: 8.4,
      terreno_baldio: 10.4,
      rio: 3.9,
      queman: 59.0,
    },
    cobertura: {
      agua: 36.3,
      saneamiento: 64.2,
      energia: 54.7,
    },
  },
  independencia: {
    nombre: "Independencia",
    viviendas: 7347,
    poblacion: 23392,
    servicios: {
      agua: 33.0,
      energia: 47.9,
      bano: 15.4,
      alcantarillado: 6.8,
      gas: 44.0,
    },
    tecnologia: {
      televisor: 26.5,
      telefono: 28.0,
      computadora: 34.3,
      internet: 4.0,
    },
    basura: {
      basurero_publico: 1.4,
      recoleccion: 8.3,
      terreno_baldio: 19.5,
      rio: 22.4,
      queman: 41.7,
    },
    cobertura: {
      agua: 60.4,
      saneamiento: 14.3,
      energia: 49.1,
    },
  },
};

const municipios = Object.keys(serviciosData);

// Función para obtener color según el porcentaje
const getColorByPercentage = (percentage: number) => {
  if (percentage >= 80) return "text-green-600 bg-green-100";
  if (percentage >= 60) return "text-yellow-600 bg-yellow-100";
  if (percentage >= 40) return "text-orange-600 bg-orange-100";
  return "text-red-600 bg-red-100";
};

// Función para obtener icono según el nivel
const getIconByPercentage = (percentage: number) => {
  if (percentage >= 80)
    return <CheckCircle className="h-4 w-4 text-green-600" />;
  if (percentage >= 60)
    return <AlertCircle className="h-4 w-4 text-yellow-600" />;
  return <XCircle className="h-4 w-4 text-red-600" />;
};

const chartConfig = {
  agua: { label: "Agua", color: "#3B82F6" },
  energia: { label: "Energía", color: "#F59E0B" },
  bano: { label: "Baño", color: "#10B981" },
  alcantarillado: { label: "Alcantarillado", color: "#8B5CF6" },
  gas: { label: "Gas", color: "#EF4444" },
};

export default function ServiciosBasicosDashboard() {
  const [selectedMunicipio, setSelectedMunicipio] = useState("cochabamba");
  const [selectedCategory, setSelectedCategory] = useState("servicios");

  const currentData =
    serviciosData[selectedMunicipio as keyof typeof serviciosData];

  // Datos para comparación
  const comparisonData = municipios.map((key) => {
    const data = serviciosData[key as keyof typeof serviciosData];
    return {
      municipio: data.nombre,
      agua: data.servicios.agua,
      energia: data.servicios.energia,
      bano: data.servicios.bano,
      alcantarillado: data.servicios.alcantarillado,
      gas: data.servicios.gas,
      internet: data.tecnologia.internet,
      poblacion: data.poblacion,
    };
  });

  // Datos para radar chart
  const radarData = [
    { servicio: "Agua", porcentaje: currentData.servicios.agua, fullMark: 100 },
    {
      servicio: "Energía",
      porcentaje: currentData.servicios.energia,
      fullMark: 100,
    },
    { servicio: "Baño", porcentaje: currentData.servicios.bano, fullMark: 100 },
    {
      servicio: "Alcantarillado",
      porcentaje: currentData.servicios.alcantarillado,
      fullMark: 100,
    },
    { servicio: "Gas", porcentaje: currentData.servicios.gas, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Home className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Servicios Básicos en Bolivia
              </h1>
              <p className="text-gray-600 mt-1">
                ¿Cómo viven las familias bolivianas? Datos del Censo 2012
                explicados de forma simple
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Explicación Simple */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Users className="h-5 w-5" />
              ¿Qué son los Servicios Básicos?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Droplets className="h-6 w-6 text-blue-500" />
                <div>
                  <div className="font-semibold text-sm">Agua Potable</div>
                  <div className="text-xs text-gray-600">
                    Agua limpia en casa
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Zap className="h-6 w-6 text-yellow-500" />
                <div>
                  <div className="font-semibold text-sm">Electricidad</div>
                  <div className="text-xs text-gray-600">Luz en el hogar</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Home className="h-6 w-6 text-green-500" />
                <div>
                  <div className="font-semibold text-sm">Baño</div>
                  <div className="text-xs text-gray-600">Sanitario en casa</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Wifi className="h-6 w-6 text-purple-500" />
                <div>
                  <div className="font-semibold text-sm">Internet</div>
                  <div className="text-xs text-gray-600">
                    Conexión a internet
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Trash2 className="h-6 w-6 text-orange-500" />
                <div>
                  <div className="font-semibold text-sm">Basura</div>
                  <div className="text-xs text-gray-600">
                    Recolección de basura
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selector de Municipio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Selecciona un Municipio de Cochabamba
            </CardTitle>
            <CardDescription>
              Haz clic en un municipio para ver cómo viven sus habitantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {municipios.map((key) => {
                const data = serviciosData[key as keyof typeof serviciosData];
                const isSelected = selectedMunicipio === key;
                return (
                  <Button
                    key={key}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-auto p-4 flex flex-col items-center gap-2 ${
                      isSelected ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedMunicipio(key)}
                  >
                    <div className="font-semibold text-sm">{data.nombre}</div>
                    <div className="text-xs text-gray-600">
                      {(data.poblacion / 1000).toFixed(0)}k habitantes
                    </div>
                    <div className="text-xs">
                      {data.viviendas.toLocaleString()} viviendas
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Información del Municipio Seleccionado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Población Total
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentData.poblacion.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                personas viven aquí
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Viviendas</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentData.viviendas.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                casas y departamentos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Promedio por Vivienda
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(currentData.poblacion / currentData.viviendas).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">personas por casa</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs para diferentes categorías */}
        <Tabs defaultValue="servicios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="servicios">Servicios Básicos</TabsTrigger>
            <TabsTrigger value="tecnologia">Tecnología</TabsTrigger>
            <TabsTrigger value="basura">Manejo de Basura</TabsTrigger>
            <TabsTrigger value="comparacion">Comparar Municipios</TabsTrigger>
          </TabsList>

          {/* Tab: Servicios Básicos */}
          <TabsContent value="servicios" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Servicios Básicos en {currentData.nombre}
                  </CardTitle>
                  <CardDescription>
                    ¿Qué porcentaje de casas tiene cada servicio?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="servicio" />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 100]}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <Radar
                          name="Cobertura"
                          dataKey="porcentaje"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-semibold">
                                    {data.servicio}
                                  </p>
                                  <p className="text-lg font-bold text-blue-600">
                                    {data.porcentaje.toFixed(1)}%
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    de las viviendas
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Detalles por servicio */}
              <Card>
                <CardHeader>
                  <CardTitle>Detalles por Servicio</CardTitle>
                  <CardDescription>
                    Situación actual en {currentData.nombre}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(currentData.servicios).map(([key, value]) => {
                    const icons = {
                      agua: <Droplets className="h-5 w-5 text-blue-500" />,
                      energia: <Zap className="h-5 w-5 text-yellow-500" />,
                      bano: <Home className="h-5 w-5 text-green-500" />,
                      alcantarillado: (
                        <Droplets className="h-5 w-5 text-purple-500" />
                      ),
                      gas: <Zap className="h-5 w-5 text-red-500" />,
                    };
                    const labels = {
                      agua: "Agua Potable",
                      energia: "Electricidad",
                      bano: "Baño",
                      alcantarillado: "Alcantarillado",
                      gas: "Gas",
                    };

                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {icons[key as keyof typeof icons]}
                            <span className="font-medium">
                              {labels[key as keyof typeof labels]}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getIconByPercentage(value)}
                            <Badge className={getColorByPercentage(value)}>
                              {value.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={value} className="h-2" />
                        <p className="text-xs text-gray-600">
                          {Math.round(
                            (value / 100) * currentData.viviendas
                          ).toLocaleString()}{" "}
                          de {currentData.viviendas.toLocaleString()} viviendas
                        </p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Interpretación simple */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">
                  💡 ¿Qué significa esto?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">
                      ✅ Servicios Buenos
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {Object.entries(currentData.servicios)
                        .filter(([_, value]) => value >= 70)
                        .map(([key, value]) => (
                          <li key={key} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>
                              {key === "agua" && "Agua Potable"}
                              {key === "energia" && "Electricidad"}
                              {key === "bano" && "Baño"}
                              {key === "alcantarillado" && "Alcantarillado"}
                              {key === "gas" && "Gas"}: {value.toFixed(1)}% de
                              casas
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-2">
                      ⚠️ Necesita Mejorar
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {Object.entries(currentData.servicios)
                        .filter(([_, value]) => value < 70)
                        .map(([key, value]) => (
                          <li key={key} className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            <span>
                              {key === "agua" && "Agua Potable"}
                              {key === "energia" && "Electricidad"}
                              {key === "bano" && "Baño"}
                              {key === "alcantarillado" && "Alcantarillado"}
                              {key === "gas" && "Gas"}: solo {value.toFixed(1)}%
                              de casas
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Tecnología */}
          <TabsContent value="tecnologia" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de barras para tecnología */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Tecnología en {currentData.nombre}
                  </CardTitle>
                  <CardDescription>
                    ¿Qué tecnología tienen las familias?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={Object.entries(currentData.tecnologia).map(
                          ([key, value]) => ({
                            tecnologia:
                              key === "televisor"
                                ? "TV"
                                : key === "telefono"
                                ? "Teléfono"
                                : key,
                            porcentaje: value,
                            color:
                              key === "televisor"
                                ? "#3B82F6"
                                : key === "telefono"
                                ? "#10B981"
                                : key === "computadora"
                                ? "#F59E0B"
                                : "#8B5CF6",
                          })
                        )}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tecnologia" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <ChartTooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-semibold">{label}</p>
                                  <p
                                    className="text-lg font-bold"
                                    style={{ color: data.color }}
                                  >
                                    {data.porcentaje.toFixed(1)}%
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    de las viviendas
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar
                          dataKey="porcentaje"
                          fill="#3B82F6"
                          radius={[4, 4, 0, 0]}
                        >
                          {Object.entries(currentData.tecnologia).map(
                            (entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  entry[0] === "televisor"
                                    ? "#3B82F6"
                                    : entry[0] === "telefono"
                                    ? "#10B981"
                                    : entry[0] === "computadora"
                                    ? "#F59E0B"
                                    : "#8B5CF6"
                                }
                              />
                            )
                          )}
                        </Bar>
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Detalles de tecnología */}
              <Card>
                <CardHeader>
                  <CardTitle>Acceso a Tecnología</CardTitle>
                  <CardDescription>
                    Equipos que tienen las familias
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(currentData.tecnologia).map(
                    ([key, value]) => {
                      const icons = {
                        televisor: <Tv className="h-5 w-5 text-blue-500" />,
                        telefono: <Phone className="h-5 w-5 text-green-500" />,
                        computadora: (
                          <Monitor className="h-5 w-5 text-orange-500" />
                        ),
                        internet: <Wifi className="h-5 w-5 text-purple-500" />,
                      };
                      const labels = {
                        televisor: "Televisor",
                        telefono: "Teléfono",
                        computadora: "Computadora",
                        internet: "Internet",
                      };

                      return (
                        <div key={key} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {icons[key as keyof typeof icons]}
                              <span className="font-medium">
                                {labels[key as keyof typeof labels]}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {getIconByPercentage(value)}
                              <Badge className={getColorByPercentage(value)}>
                                {value.toFixed(1)}%
                              </Badge>
                            </div>
                          </div>
                          <Progress value={value} className="h-2" />
                          <p className="text-xs text-gray-600">
                            {Math.round(
                              (value / 100) * currentData.viviendas
                            ).toLocaleString()}{" "}
                            familias tienen{" "}
                            {labels[key as keyof typeof labels].toLowerCase()}
                          </p>
                        </div>
                      );
                    }
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Brecha digital */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">
                  📱 Brecha Digital
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-3">
                      Tecnología Básica
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Televisor</span>
                        <span className="font-bold">
                          {currentData.tecnologia.televisor.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Teléfono</span>
                        <span className="font-bold">
                          {currentData.tecnologia.telefono.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-3">
                      Tecnología Avanzada
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Computadora</span>
                        <span className="font-bold">
                          {currentData.tecnologia.computadora.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Internet</span>
                        <span className="font-bold">
                          {currentData.tecnologia.internet.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <p className="text-sm text-purple-700">
                  <strong>Conclusión:</strong> Mientras que la mayoría tiene TV
                  y teléfono, el acceso a internet es limitado. Esto muestra la
                  brecha digital que existe en {currentData.nombre}.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Manejo de Basura */}
          <TabsContent value="basura" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de torta para basura */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trash2 className="h-5 w-5" />
                    ¿Cómo eliminan la basura?
                  </CardTitle>
                  <CardDescription>
                    Métodos que usan las familias en {currentData.nombre}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={Object.entries(currentData.basura).map(
                            ([key, value], index) => ({
                              name:
                                key === "basurero_publico"
                                  ? "Basurero Público"
                                  : key === "recoleccion"
                                  ? "Carro Basurero"
                                  : key === "terreno_baldio"
                                  ? "Terreno Baldío"
                                  : key === "rio"
                                  ? "Al Río"
                                  : "La Queman",
                              value,
                              color: [
                                "#3B82F6",
                                "#10B981",
                                "#F59E0B",
                                "#EF4444",
                                "#8B5CF6",
                              ][index],
                            })
                          )}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) =>
                            typeof value === "number" && value > 5
                              ? `${name}: ${value.toFixed(1)}%`
                              : ""
                          }
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {Object.entries(currentData.basura).map(
                            (entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  [
                                    "#3B82F6",
                                    "#10B981",
                                    "#F59E0B",
                                    "#EF4444",
                                    "#8B5CF6",
                                  ][index]
                                }
                              />
                            )
                          )}
                        </Pie>

                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-semibold">{data.name}</p>
                                  <p
                                    className="text-lg font-bold"
                                    style={{ color: data.color }}
                                  >
                                    {data.value.toFixed(1)}%
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    de las familias
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

              {/* Análisis ambiental */}
              <Card>
                <CardHeader>
                  <CardTitle>Impacto Ambiental</CardTitle>
                  <CardDescription>
                    ¿Qué tan limpio es el manejo de basura?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-800">
                          Métodos Buenos
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Carro Basurero</span>
                          <span className="font-bold">
                            {currentData.basura.recoleccion.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Basurero Público</span>
                          <span className="font-bold">
                            {currentData.basura.basurero_publico.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="font-semibold text-red-800">
                          Métodos Dañinos
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>La Queman</span>
                          <span className="font-bold">
                            {currentData.basura.queman.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Al Río</span>
                          <span className="font-bold">
                            {currentData.basura.rio.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Terreno Baldío</span>
                          <span className="font-bold">
                            {currentData.basura.terreno_baldio.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h5 className="font-semibold text-blue-800 mb-2">
                      Resumen
                    </h5>
                    <p className="text-sm text-blue-700">
                      {(
                        currentData.basura.recoleccion +
                        currentData.basura.basurero_publico
                      ).toFixed(1)}
                      % de las familias usa métodos seguros para eliminar la
                      basura.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Comparación */}
          <TabsContent value="comparacion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Comparación entre Municipios
                </CardTitle>
                <CardDescription>
                  ¿Cuál municipio tiene mejores servicios?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={comparisonData}
                      margin={{ bottom: 80 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="municipio"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tickFormatter={(value) =>
                          value.length > 10
                            ? value.substring(0, 10) + "..."
                            : value
                        }
                      />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-4 border rounded-lg shadow-lg max-w-xs">
                                <p className="font-semibold mb-2">{label}</p>
                                {payload.map((entry, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between items-center gap-2"
                                  >
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: entry.color }}
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
                      <Bar dataKey="agua" fill="#3B82F6" name="Agua" />
                      <Bar dataKey="energia" fill="#F59E0B" name="Energía" />
                      <Bar dataKey="internet" fill="#8B5CF6" name="Internet" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Ranking de municipios */}
            <Card>
              <CardHeader>
                <CardTitle>Ranking de Municipios</CardTitle>
                <CardDescription>
                  Ordenados por calidad de servicios básicos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comparisonData
                    .sort(
                      (a, b) =>
                        (a.agua + a.energia + a.bano) / 3 -
                        (b.agua + b.energia + b.bano) / 3
                    )
                    .reverse()
                    .map((municipio, index) => {
                      const promedio =
                        (municipio.agua + municipio.energia + municipio.bano) /
                        3;
                      return (
                        <div
                          key={municipio.municipio}
                          className="flex items-center gap-4 p-4 rounded-lg bg-gray-50"
                        >
                          <div className="text-2xl font-bold text-gray-400 w-8">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">
                              {municipio.municipio}
                            </div>
                            <div className="text-sm text-gray-600">
                              {(municipio.poblacion / 1000).toFixed(0)}k
                              habitantes
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {promedio.toFixed(1)}%
                            </div>
                            <div className="text-sm text-gray-600">
                              promedio servicios
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {getIconByPercentage(promedio)}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Conclusiones Generales */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">
              🎯 Conclusiones Principales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-green-900 mb-2">
                  ✅ Lo Bueno
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• La mayoría tiene electricidad</li>
                  <li>• Muchas familias tienen TV</li>
                  <li>• Hay recolección de basura en ciudades</li>
                  <li>• El agua llega a más del 50% en la mayoría</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-orange-900 mb-2">
                  ⚠️ Desafíos
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Internet muy limitado (menos del 40%)</li>
                  <li>• Alcantarillado insuficiente</li>
                  <li>• Diferencias grandes entre municipios</li>
                  <li>• Algunos queman basura (contamina)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  🎯 Oportunidades
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Expandir internet a más familias</li>
                  <li>• Mejorar alcantarillado rural</li>
                  <li>• Más puntos de recolección de basura</li>
                  <li>• Llevar agua potable a zonas rurales</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              Datos del Censo Nacional de Población y Vivienda 2012 • Instituto
              Nacional de Estadística (INE) • Departamento de Cochabamba,
              Bolivia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
