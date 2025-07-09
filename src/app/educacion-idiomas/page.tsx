"use client";

import { useState } from "react";
import {
  GraduationCap,
  Languages,
  Users,
  School,
  BookOpen,
  Globe,
  BarChart3,
  AlertCircle,
  CheckCircle,
  XCircle,
  MapPin,
  Target,
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
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
} from "recharts";

// Datos del censo 2012 organizados por departamento
const educacionIdiomasData = {
  chuquisaca: {
    nombre: "Chuquisaca",
    color: "#EF4444",
    educacion: {
      total_escolar: 181370,
      publica: 121503,
      privada: 14578,
      convenio: 16168,
      no_asiste: 27080,
      sin_especificar: 2041,
    },
    idiomas: {
      total_idioma: 581347,
      castellano: 307055,
      quechua: 234231,
      aymara: 1709,
      guarani: 5141,
      otros_oficiales: 204,
      otros_idiomas: 3,
      extranjero: 1025,
      sin_especificar: 8354,
      no_habla: 23625,
    },
  },
  la_paz: {
    nombre: "La Paz",
    color: "#3B82F6",
    educacion: {
      total_escolar: 762536,
      publica: 542113,
      privada: 88993,
      convenio: 47950,
      no_asiste: 78012,
      sin_especificar: 5468,
    },
    idiomas: {
      total_idioma: 2719344,
      castellano: 1677374,
      quechua: 76681,
      aymara: 809845,
      guarani: 953,
      otros_oficiales: 5242,
      otros_idiomas: 48,
      extranjero: 6382,
      sin_especificar: 47034,
      no_habla: 95785,
    },
  },
  cochabamba: {
    nombre: "Cochabamba",
    color: "#10B981",
    educacion: {
      total_escolar: 524539,
      publica: 346347,
      privada: 54580,
      convenio: 55273,
      no_asiste: 63605,
      sin_especificar: 4734,
    },
    idiomas: {
      total_idioma: 1762761,
      castellano: 941226,
      quechua: 642565,
      aymara: 52902,
      guarani: 1002,
      otros_oficiales: 4424,
      otros_idiomas: 9,
      extranjero: 7375,
      sin_especificar: 42272,
      no_habla: 70986,
    },
  },
  oruro: {
    nombre: "Oruro",
    color: "#F59E0B",
    educacion: {
      total_escolar: 137915,
      publica: 103192,
      privada: 10457,
      convenio: 8685,
      no_asiste: 13922,
      sin_especificar: 1659,
    },
    idiomas: {
      total_idioma: 494587,
      castellano: 319856,
      quechua: 60494,
      aymara: 81595,
      guarani: 203,
      otros_oficiales: 2204,
      otros_idiomas: 0,
      extranjero: 380,
      sin_especificar: 11057,
      no_habla: 18798,
    },
  },
  potosi: {
    nombre: "Potosí",
    color: "#8B5CF6",
    educacion: {
      total_escolar: 256426,
      publica: 192876,
      privada: 13157,
      convenio: 16583,
      no_asiste: 30966,
      sin_especificar: 2844,
    },
    idiomas: {
      total_idioma: 828093,
      castellano: 334929,
      quechua: 415563,
      aymara: 26180,
      guarani: 121,
      otros_oficiales: 599,
      otros_idiomas: 4,
      extranjero: 801,
      sin_especificar: 13761,
      no_habla: 36135,
    },
  },
  tarija: {
    nombre: "Tarija",
    color: "#EC4899",
    educacion: {
      total_escolar: 136577,
      publica: 93973,
      privada: 10980,
      convenio: 9750,
      no_asiste: 20347,
      sin_especificar: 1527,
    },
    idiomas: {
      total_idioma: 483518,
      castellano: 419210,
      quechua: 24733,
      aymara: 3017,
      guarani: 3718,
      otros_oficiales: 5455,
      otros_idiomas: 74,
      extranjero: 3263,
      sin_especificar: 6458,
      no_habla: 17590,
    },
  },
  santa_cruz: {
    nombre: "Santa Cruz",
    color: "#06B6D4",
    educacion: {
      total_escolar: 808718,
      publica: 461563,
      privada: 111359,
      convenio: 110734,
      no_asiste: 115322,
      sin_especificar: 9740,
    },
    idiomas: {
      total_idioma: 2657762,
      castellano: 2122610,
      quechua: 195183,
      aymara: 27901,
      guarani: 42612,
      otros_oficiales: 17703,
      otros_idiomas: 1197,
      extranjero: 76801,
      sin_especificar: 62494,
      no_habla: 111261,
    },
  },
  beni: {
    nombre: "Beni",
    color: "#84CC16",
    educacion: {
      total_escolar: 136311,
      publica: 91944,
      privada: 11196,
      convenio: 10820,
      no_asiste: 20489,
      sin_especificar: 1862,
    },
    idiomas: {
      total_idioma: 422008,
      castellano: 360864,
      quechua: 5824,
      aymara: 4422,
      guarani: 195,
      otros_oficiales: 18479,
      otros_idiomas: 53,
      extranjero: 2469,
      sin_especificar: 10678,
      no_habla: 19024,
    },
  },
  pando: {
    nombre: "Pando",
    color: "#F97316",
    educacion: {
      total_escolar: 35992,
      publica: 25487,
      privada: 2515,
      convenio: 1310,
      no_asiste: 6343,
      sin_especificar: 337,
    },
    idiomas: {
      total_idioma: 110436,
      castellano: 95129,
      quechua: 1704,
      aymara: 2161,
      guarani: 26,
      otros_oficiales: 1701,
      otros_idiomas: 1,
      extranjero: 2601,
      sin_especificar: 1462,
      no_habla: 5651,
    },
  },
};

const departamentos = Object.keys(educacionIdiomasData);

// Funciones de cálculo
const calcularPorcentaje = (valor: number, total: number): number => {
  return total > 0 ? (valor / total) * 100 : 0;
};

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

// Datos procesados para análisis
const asistenciaAnalysis = departamentos.map((key) => {
  const data = educacionIdiomasData[key as keyof typeof educacionIdiomasData];
  const totalPoblacionEscolar =
    data.educacion.total_escolar +
    data.educacion.no_asiste +
    data.educacion.sin_especificar;

  return {
    departamento: data.nombre,
    color: data.color,
    total_escolar: data.educacion.total_escolar,
    tasa_asistencia: calcularPorcentaje(
      data.educacion.total_escolar,
      totalPoblacionEscolar
    ),
    publica_pct: calcularPorcentaje(
      data.educacion.publica,
      data.educacion.total_escolar
    ),
    privada_pct: calcularPorcentaje(
      data.educacion.privada,
      data.educacion.total_escolar
    ),
    convenio_pct: calcularPorcentaje(
      data.educacion.convenio,
      data.educacion.total_escolar
    ),
    no_asiste_pct: calcularPorcentaje(
      data.educacion.no_asiste,
      totalPoblacionEscolar
    ),
    poblacion_escolar: totalPoblacionEscolar,
  };
});

const idiomasAnalysis = departamentos.map((key) => {
  const data = educacionIdiomasData[key as keyof typeof educacionIdiomasData];
  const totalHablantes =
    data.idiomas.total_idioma -
    data.idiomas.no_habla -
    data.idiomas.sin_especificar;

  return {
    departamento: data.nombre,
    color: data.color,
    total_idioma: data.idiomas.total_idioma,
    castellano_pct: calcularPorcentaje(data.idiomas.castellano, totalHablantes),
    quechua_pct: calcularPorcentaje(data.idiomas.quechua, totalHablantes),
    aymara_pct: calcularPorcentaje(data.idiomas.aymara, totalHablantes),
    guarani_pct: calcularPorcentaje(data.idiomas.guarani, totalHablantes),
    extranjero_pct: calcularPorcentaje(data.idiomas.extranjero, totalHablantes),
    no_habla_pct: calcularPorcentaje(
      data.idiomas.no_habla,
      data.idiomas.total_idioma
    ),
    diversidad_linguistica:
      100 - calcularPorcentaje(data.idiomas.castellano, totalHablantes),
    idiomas_originarios:
      data.idiomas.quechua +
      data.idiomas.aymara +
      data.idiomas.guarani +
      data.idiomas.otros_oficiales,
    idiomas_originarios_pct: calcularPorcentaje(
      data.idiomas.quechua +
        data.idiomas.aymara +
        data.idiomas.guarani +
        data.idiomas.otros_oficiales,
      totalHablantes
    ),
  };
});

// Datos nacionales
const nacionalData = {
  total_escolar: asistenciaAnalysis.reduce(
    (sum, dept) => sum + dept.total_escolar,
    0
  ),
  total_poblacion_escolar: asistenciaAnalysis.reduce(
    (sum, dept) => sum + dept.poblacion_escolar,
    0
  ),
  total_idioma: idiomasAnalysis.reduce(
    (sum, dept) => sum + dept.total_idioma,
    0
  ),
};

nacionalData.tasa_asistencia_nacional = calcularPorcentaje(
  nacionalData.total_escolar,
  nacionalData.total_poblacion_escolar
);

const chartConfig = {
  asistencia: { label: "Asistencia", color: "#10B981" },
  publica: { label: "Pública", color: "#3B82F6" },
  privada: { label: "Privada", color: "#F59E0B" },
  convenio: { label: "Convenio", color: "#8B5CF6" },
  castellano: { label: "Castellano", color: "#EF4444" },
  quechua: { label: "Quechua", color: "#10B981" },
  aymara: { label: "Aymara", color: "#3B82F6" },
  guarani: { label: "Guaraní", color: "#F59E0B" },
};

export default function EducacionIdiomasDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState("la_paz");
  const [selectedMetric, setSelectedMetric] = useState("asistencia");

  const currentData =
    educacionIdiomasData[
      selectedDepartment as keyof typeof educacionIdiomasData
    ];
  const currentAsistencia = asistenciaAnalysis.find(
    (d) => d.departamento === currentData.nombre
  )!;
  const currentIdiomas = idiomasAnalysis.find(
    (d) => d.departamento === currentData.nombre
  )!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Educación e Idiomas en Bolivia
              </h1>
              <p className="text-gray-600 mt-1">
                ¿Cómo estudian y qué idiomas hablan los niños bolivianos?
                Análisis del Censo 2012
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Explicación Simple */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Users className="h-5 w-5" />
              ¿Qué nos dicen estos datos?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-900 mb-3">
                  🎓 Asistencia Escolar
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                    <School className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium text-sm">Escuela Pública</div>
                      <div className="text-xs text-gray-600">
                        Educación gratuita del Estado
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                    <BookOpen className="h-5 w-5 text-orange-500" />
                    <div>
                      <div className="font-medium text-sm">Escuela Privada</div>
                      <div className="text-xs text-gray-600">
                        Educación de pago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                    <GraduationCap className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-medium text-sm">Convenio</div>
                      <div className="text-xs text-gray-600">
                        Escuelas con acuerdo especial
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-3">
                  🗣️ Primer Idioma Aprendido
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                    <Languages className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="font-medium text-sm">Castellano</div>
                      <div className="text-xs text-gray-600">
                        Idioma oficial principal
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                    <Globe className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium text-sm">
                        Idiomas Originarios
                      </div>
                      <div className="text-xs text-gray-600">
                        Quechua, Aymara, Guaraní
                      </div>
                    </div>
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
                Niños en la Escuela
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {nacionalData.tasa_asistencia_nacional.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {(nacionalData.total_escolar / 1000000).toFixed(1)}M de{" "}
                {(nacionalData.total_poblacion_escolar / 1000000).toFixed(1)}M
                niños
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Hablan Castellano
              </CardTitle>
              <Languages className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {(
                  (idiomasAnalysis.reduce(
                    (sum, dept) =>
                      sum + (dept.castellano_pct * dept.total_idioma) / 100,
                    0
                  ) /
                    nacionalData.total_idioma) *
                  100
                ).toFixed(1)}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                Como primer idioma
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Idiomas Originarios
              </CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {(
                  (idiomasAnalysis.reduce(
                    (sum, dept) => sum + dept.idiomas_originarios,
                    0
                  ) /
                    nacionalData.total_idioma) *
                  100
                ).toFixed(1)}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                Quechua, Aymara, Guaraní
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Educación Pública
              </CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {(
                  (asistenciaAnalysis.reduce(
                    (sum, dept) =>
                      sum + (dept.publica_pct * dept.total_escolar) / 100,
                    0
                  ) /
                    nacionalData.total_escolar) *
                  100
                ).toFixed(1)}
                %
              </div>
              <p className="text-xs text-muted-foreground">De estudiantes</p>
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
              Explora la situación educativa y lingüística de cada región
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {departamentos.map((key) => {
                const data =
                  educacionIdiomasData[
                    key as keyof typeof educacionIdiomasData
                  ];
                const asistencia = asistenciaAnalysis.find(
                  (d) => d.departamento === data.nombre
                )!;
                const isSelected = selectedDepartment === key;
                return (
                  <Button
                    key={key}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-auto p-3 flex flex-col items-center gap-2 ${
                      isSelected ? "ring-2 ring-green-500" : ""
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
                      {asistencia.tasa_asistencia.toFixed(1)}% asistencia
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Información del Departamento Seleccionado */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: currentData.color }}
              />
              {currentData.nombre}
            </CardTitle>
            <CardDescription>
              Situación educativa y lingüística actual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold text-blue-900 mb-3">
                  📊 Educación
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Asistencia escolar:</span>
                    <Badge
                      className={getColorByPercentage(
                        currentAsistencia.tasa_asistencia
                      )}
                    >
                      {currentAsistencia.tasa_asistencia.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Educación pública:</span>
                    <span className="font-bold">
                      {currentAsistencia.publica_pct.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Educación privada:</span>
                    <span className="font-bold">
                      {currentAsistencia.privada_pct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-green-900 mb-3">
                  🗣️ Idiomas
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Castellano:</span>
                    <span className="font-bold">
                      {currentIdiomas.castellano_pct.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quechua:</span>
                    <span className="font-bold">
                      {currentIdiomas.quechua_pct.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aymara:</span>
                    <span className="font-bold">
                      {currentIdiomas.aymara_pct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-purple-900 mb-3">
                  📈 Indicadores
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Diversidad lingüística:</span>
                    <Badge
                      className={getColorByPercentage(
                        currentIdiomas.diversidad_linguistica
                      )}
                    >
                      {currentIdiomas.diversidad_linguistica.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Idiomas originarios:</span>
                    <span className="font-bold">
                      {currentIdiomas.idiomas_originarios_pct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-orange-900 mb-3">
                  👥 Población
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Estudiantes:</span>
                    <span className="font-bold">
                      {(currentAsistencia.total_escolar / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>No asiste:</span>
                    <span className="font-bold text-red-600">
                      {currentAsistencia.no_asiste_pct.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>No habla:</span>
                    <span className="font-bold text-red-600">
                      {currentIdiomas.no_habla_pct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs para diferentes análisis */}
        <Tabs defaultValue="asistencia" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="asistencia">Asistencia Escolar</TabsTrigger>
            <TabsTrigger value="idiomas">Diversidad Lingüística</TabsTrigger>
            <TabsTrigger value="comparacion">
              Comparar Departamentos
            </TabsTrigger>
            <TabsTrigger value="analisis">Análisis Nacional</TabsTrigger>
          </TabsList>

          {/* Tab: Asistencia Escolar */}
          <TabsContent value="asistencia" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de asistencia por departamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Asistencia Escolar por Departamento
                  </CardTitle>
                  <CardDescription>
                    ¿Qué porcentaje de niños va a la escuela?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={asistenciaAnalysis}
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
                                        Asistencia:
                                      </span>{" "}
                                      {data.tasa_asistencia.toFixed(1)}%
                                    </p>
                                    <p className="text-sm">
                                      <span className="text-red-600">
                                        No asiste:
                                      </span>{" "}
                                      {data.no_asiste_pct.toFixed(1)}%
                                    </p>
                                    <p className="text-sm">
                                      <span className="text-gray-600">
                                        Total estudiantes:
                                      </span>{" "}
                                      {(data.total_escolar / 1000).toFixed(0)}k
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar
                          dataKey="tasa_asistencia"
                          fill="#10B981"
                          name="Asistencia"
                          radius={[4, 4, 0, 0]}
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Tipos de educación */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Tipos de Educación en {currentData.nombre}
                  </CardTitle>
                  <CardDescription>¿Dónde estudian los niños?</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[
                            {
                              name: "Pública",
                              value: currentAsistencia.publica_pct,
                              color: "#3B82F6",
                            },
                            {
                              name: "Privada",
                              value: currentAsistencia.privada_pct,
                              color: "#F59E0B",
                            },
                            {
                              name: "Convenio",
                              value: currentAsistencia.convenio_pct,
                              color: "#8B5CF6",
                            },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) =>
                            `${name}: ${value.toFixed(1)}%`
                          }
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            {
                              name: "Pública",
                              value: currentAsistencia.publica_pct,
                              color: "#3B82F6",
                            },
                            {
                              name: "Privada",
                              value: currentAsistencia.privada_pct,
                              color: "#F59E0B",
                            },
                            {
                              name: "Convenio",
                              value: currentAsistencia.convenio_pct,
                              color: "#8B5CF6",
                            },
                          ].map((entry, index) => (
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
                                  <p
                                    className="text-lg font-bold"
                                    style={{ color: data.color }}
                                  >
                                    {data.value.toFixed(1)}%
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    de estudiantes
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
            </div>

            {/* Ranking de asistencia */}
            <Card>
              <CardHeader>
                <CardTitle>Ranking de Asistencia Escolar</CardTitle>
                <CardDescription>
                  Departamentos ordenados por porcentaje de niños que van a la
                  escuela
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {asistenciaAnalysis
                    .sort((a, b) => b.tasa_asistencia - a.tasa_asistencia)
                    .map((dept, index) => (
                      <div
                        key={dept.departamento}
                        className="flex items-center gap-4 p-4 rounded-lg bg-gray-50"
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
                            {(dept.total_escolar / 1000).toFixed(0)}k
                            estudiantes de{" "}
                            {(dept.poblacion_escolar / 1000).toFixed(0)}k niños
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            {getIconByPercentage(dept.tasa_asistencia)}
                            <div className="font-bold text-lg">
                              {dept.tasa_asistencia.toFixed(1)}%
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            asistencia
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Análisis de inasistencia */}
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">
                  ⚠️ Niños que No Van a la Escuela
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2">
                      🚨 Mayor Inasistencia
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {asistenciaAnalysis
                        .sort((a, b) => b.no_asiste_pct - a.no_asiste_pct)
                        .slice(0, 3)
                        .map((dept) => (
                          <li
                            key={dept.departamento}
                            className="flex items-center gap-2"
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                            <span>
                              {dept.departamento}:{" "}
                              {dept.no_asiste_pct.toFixed(1)}% no asiste
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-900 mb-2">
                      📊 Datos Nacionales
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total estudiantes:</span>
                        <span className="font-bold">
                          {(nacionalData.total_escolar / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Asistencia nacional:</span>
                        <span className="font-bold">
                          {nacionalData.tasa_asistencia_nacional.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Niños sin escuela:</span>
                        <span className="font-bold text-red-600">
                          {(
                            (nacionalData.total_poblacion_escolar -
                              nacionalData.total_escolar) /
                            1000
                          ).toFixed(0)}
                          k
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">
                      ✅ Mejor Asistencia
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {asistenciaAnalysis
                        .sort((a, b) => b.tasa_asistencia - a.tasa_asistencia)
                        .slice(0, 3)
                        .map((dept) => (
                          <li
                            key={dept.departamento}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>
                              {dept.departamento}:{" "}
                              {dept.tasa_asistencia.toFixed(1)}% asistencia
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Diversidad Lingüística */}
          <TabsContent value="idiomas" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mapa de idiomas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    Primer Idioma por Departamento
                  </CardTitle>
                  <CardDescription>
                    ¿Qué idioma aprendieron primero los niños?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={idiomasAnalysis}
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
                          dataKey="castellano_pct"
                          fill="#EF4444"
                          name="Castellano"
                        />
                        <Bar
                          dataKey="quechua_pct"
                          fill="#10B981"
                          name="Quechua"
                        />
                        <Bar
                          dataKey="aymara_pct"
                          fill="#3B82F6"
                          name="Aymara"
                        />
                        <Bar
                          dataKey="guarani_pct"
                          fill="#F59E0B"
                          name="Guaraní"
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Diversidad lingüística */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Diversidad Lingüística en {currentData.nombre}
                  </CardTitle>
                  <CardDescription>
                    Distribución de idiomas como primer idioma aprendido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[
                            {
                              name: "Castellano",
                              value: currentIdiomas.castellano_pct,
                              color: "#EF4444",
                            },
                            {
                              name: "Quechua",
                              value: currentIdiomas.quechua_pct,
                              color: "#10B981",
                            },
                            {
                              name: "Aymara",
                              value: currentIdiomas.aymara_pct,
                              color: "#3B82F6",
                            },
                            {
                              name: "Guaraní",
                              value: currentIdiomas.guarani_pct,
                              color: "#F59E0B",
                            },
                            {
                              name: "Otros",
                              value: currentIdiomas.extranjero_pct,
                              color: "#8B5CF6",
                            },
                          ].filter((item) => item.value > 0.5)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) =>
                            value > 5 ? `${name}: ${value.toFixed(1)}%` : ""
                          }
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            {
                              name: "Castellano",
                              value: currentIdiomas.castellano_pct,
                              color: "#EF4444",
                            },
                            {
                              name: "Quechua",
                              value: currentIdiomas.quechua_pct,
                              color: "#10B981",
                            },
                            {
                              name: "Aymara",
                              value: currentIdiomas.aymara_pct,
                              color: "#3B82F6",
                            },
                            {
                              name: "Guaraní",
                              value: currentIdiomas.guarani_pct,
                              color: "#F59E0B",
                            },
                            {
                              name: "Otros",
                              value: currentIdiomas.extranjero_pct,
                              color: "#8B5CF6",
                            },
                          ]
                            .filter((item) => item.value > 0.5)
                            .map((entry, index) => (
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
                                  <p
                                    className="text-lg font-bold"
                                    style={{ color: data.color }}
                                  >
                                    {data.value.toFixed(1)}%
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    primer idioma
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
            </div>

            {/* Preservación de idiomas originarios */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Preservación de Idiomas Originarios
                </CardTitle>
                <CardDescription>
                  Departamentos donde más se conservan las lenguas ancestrales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {idiomasAnalysis
                    .sort(
                      (a, b) =>
                        b.idiomas_originarios_pct - a.idiomas_originarios_pct
                    )
                    .map((dept, index) => (
                      <div key={dept.departamento} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-lg font-bold text-gray-400 w-6">
                              {index + 1}
                            </div>
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: dept.color }}
                            />
                            <span className="font-medium">
                              {dept.departamento}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getIconByPercentage(dept.idiomas_originarios_pct)}
                            <Badge
                              className={getColorByPercentage(
                                dept.idiomas_originarios_pct
                              )}
                            >
                              {dept.idiomas_originarios_pct.toFixed(1)}%
                              originarios
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs ml-10">
                          <div className="flex justify-between">
                            <span>Quechua:</span>
                            <span className="font-bold">
                              {dept.quechua_pct.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Aymara:</span>
                            <span className="font-bold">
                              {dept.aymara_pct.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Guaraní:</span>
                            <span className="font-bold">
                              {dept.guarani_pct.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={dept.idiomas_originarios_pct}
                          className="h-2 ml-10"
                        />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Análisis de diversidad */}
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">
                  🌍 Riqueza Lingüística de Bolivia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2">
                      🏆 Más Diversos
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {idiomasAnalysis
                        .sort(
                          (a, b) =>
                            b.diversidad_linguistica - a.diversidad_linguistica
                        )
                        .slice(0, 3)
                        .map((dept) => (
                          <li
                            key={dept.departamento}
                            className="flex items-center gap-2"
                          >
                            <Globe className="h-4 w-4 text-purple-600" />
                            <span>
                              {dept.departamento}:{" "}
                              {dept.diversidad_linguistica.toFixed(1)}% no
                              castellano
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      📊 Idiomas Principales
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Castellano:</span>
                        <span className="font-bold">
                          {(
                            (idiomasAnalysis.reduce(
                              (sum, dept) =>
                                sum +
                                (dept.castellano_pct * dept.total_idioma) / 100,
                              0
                            ) /
                              nacionalData.total_idioma) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quechua:</span>
                        <span className="font-bold">
                          {(
                            (idiomasAnalysis.reduce(
                              (sum, dept) =>
                                sum +
                                (dept.quechua_pct * dept.total_idioma) / 100,
                              0
                            ) /
                              nacionalData.total_idioma) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Aymara:</span>
                        <span className="font-bold">
                          {(
                            (idiomasAnalysis.reduce(
                              (sum, dept) =>
                                sum +
                                (dept.aymara_pct * dept.total_idioma) / 100,
                              0
                            ) /
                              nacionalData.total_idioma) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">
                      💡 Conclusión
                    </h4>
                    <p className="text-sm text-green-700">
                      Bolivia es un país multilingüe donde{" "}
                      {(
                        (idiomasAnalysis.reduce(
                          (sum, dept) => sum + dept.idiomas_originarios,
                          0
                        ) /
                          nacionalData.total_idioma) *
                        100
                      ).toFixed(1)}
                      % de la población aprendió un idioma originario como
                      primera lengua, preservando la riqueza cultural ancestral.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Comparación Departamental */}
          <TabsContent value="comparacion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Comparación Completa por Departamentos
                </CardTitle>
                <CardDescription>
                  Educación e idiomas en una vista integral
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
                          Asistencia
                        </th>
                        <th className="text-center p-3 font-semibold">
                          Ed. Pública
                        </th>
                        <th className="text-center p-3 font-semibold">
                          Ed. Privada
                        </th>
                        <th className="text-center p-3 font-semibold">
                          Castellano
                        </th>
                        <th className="text-center p-3 font-semibold">
                          Quechua
                        </th>
                        <th className="text-center p-3 font-semibold">
                          Aymara
                        </th>
                        <th className="text-center p-3 font-semibold">
                          Diversidad
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {departamentos
                        .map((key) => {
                          const data =
                            educacionIdiomasData[
                              key as keyof typeof educacionIdiomasData
                            ];
                          const asistencia = asistenciaAnalysis.find(
                            (d) => d.departamento === data.nombre
                          )!;
                          const idiomas = idiomasAnalysis.find(
                            (d) => d.departamento === data.nombre
                          )!;
                          return { data, asistencia, idiomas };
                        })
                        .sort(
                          (a, b) =>
                            b.asistencia.tasa_asistencia -
                            a.asistencia.tasa_asistencia
                        )
                        .map(({ data, asistencia, idiomas }, index) => (
                          <tr
                            key={data.nombre}
                            className="border-b hover:bg-gray-50"
                          >
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
                            <td className="p-3 text-center">
                              <Badge
                                className={getColorByPercentage(
                                  asistencia.tasa_asistencia
                                )}
                              >
                                {asistencia.tasa_asistencia.toFixed(1)}%
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <Badge
                                className={getColorByPercentage(
                                  asistencia.publica_pct
                                )}
                              >
                                {asistencia.publica_pct.toFixed(1)}%
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <Badge
                                className={getColorByPercentage(
                                  asistencia.privada_pct
                                )}
                              >
                                {asistencia.privada_pct.toFixed(1)}%
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <Badge
                                className={getColorByPercentage(
                                  idiomas.castellano_pct
                                )}
                              >
                                {idiomas.castellano_pct.toFixed(1)}%
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <Badge
                                className={getColorByPercentage(
                                  idiomas.quechua_pct
                                )}
                              >
                                {idiomas.quechua_pct.toFixed(1)}%
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <Badge
                                className={getColorByPercentage(
                                  idiomas.aymara_pct
                                )}
                              >
                                {idiomas.aymara_pct.toFixed(1)}%
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center gap-2">
                                {getIconByPercentage(
                                  idiomas.diversidad_linguistica
                                )}
                                <span className="font-bold">
                                  {idiomas.diversidad_linguistica.toFixed(1)}%
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

            {/* Correlaciones */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relación Educación vs Idioma</CardTitle>
                  <CardDescription>
                    ¿Hay relación entre asistencia escolar y primer idioma?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        data={departamentos.map((key) => {
                          const data =
                            educacionIdiomasData[
                              key as keyof typeof educacionIdiomasData
                            ];
                          const asistencia = asistenciaAnalysis.find(
                            (d) => d.departamento === data.nombre
                          )!;
                          const idiomas = idiomasAnalysis.find(
                            (d) => d.departamento === data.nombre
                          )!;
                          return {
                            departamento: data.nombre,
                            asistencia: asistencia.tasa_asistencia,
                            castellano: idiomas.castellano_pct,
                            color: data.color,
                          };
                        })}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="castellano"
                          type="number"
                          tickFormatter={(value) => `${value}%`}
                          name="Castellano"
                        />
                        <YAxis
                          dataKey="asistencia"
                          type="number"
                          tickFormatter={(value) => `${value}%`}
                          name="Asistencia"
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
                                    Asistencia: {data.asistencia.toFixed(1)}%
                                  </p>
                                  <p className="text-sm">
                                    Castellano: {data.castellano.toFixed(1)}%
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Scatter dataKey="asistencia" fill="#8884d8">
                          {departamentos.map((key, index) => {
                            const data =
                              educacionIdiomasData[
                                key as keyof typeof educacionIdiomasData
                              ];
                            return (
                              <Cell key={`cell-${index}`} fill={data.color} />
                            );
                          })}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Educación Pública vs Privada</CardTitle>
                  <CardDescription>
                    Distribución por departamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={asistenciaAnalysis.sort(
                          (a, b) => b.publica_pct - a.publica_pct
                        )}
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
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
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
                        <Area
                          type="monotone"
                          dataKey="publica_pct"
                          stackId="1"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="privada_pct"
                          stackId="1"
                          stroke="#F59E0B"
                          fill="#F59E0B"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="convenio_pct"
                          stackId="1"
                          stroke="#8B5CF6"
                          fill="#8B5CF6"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Análisis Nacional */}
          <TabsContent value="analisis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Radar de indicadores nacionales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Perfil Nacional Educativo-Lingüístico
                  </CardTitle>
                  <CardDescription>
                    Indicadores clave de Bolivia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        data={[
                          {
                            indicador: "Asistencia Escolar",
                            valor: nacionalData.tasa_asistencia_nacional,
                            fullMark: 100,
                          },
                          {
                            indicador: "Educación Pública",
                            valor:
                              (asistenciaAnalysis.reduce(
                                (sum, dept) =>
                                  sum +
                                  (dept.publica_pct * dept.total_escolar) / 100,
                                0
                              ) /
                                nacionalData.total_escolar) *
                              100,
                            fullMark: 100,
                          },
                          {
                            indicador: "Castellano",
                            valor:
                              (idiomasAnalysis.reduce(
                                (sum, dept) =>
                                  sum +
                                  (dept.castellano_pct * dept.total_idioma) /
                                    100,
                                0
                              ) /
                                nacionalData.total_idioma) *
                              100,
                            fullMark: 100,
                          },
                          {
                            indicador: "Idiomas Originarios",
                            valor:
                              (idiomasAnalysis.reduce(
                                (sum, dept) => sum + dept.idiomas_originarios,
                                0
                              ) /
                                nacionalData.total_idioma) *
                              100,
                            fullMark: 100,
                          },
                          {
                            indicador: "Diversidad Lingüística",
                            valor:
                              100 -
                              (idiomasAnalysis.reduce(
                                (sum, dept) =>
                                  sum +
                                  (dept.castellano_pct * dept.total_idioma) /
                                    100,
                                0
                              ) /
                                nacionalData.total_idioma) *
                                100,
                            fullMark: 100,
                          },
                        ]}
                      >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="indicador" />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 100]}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <Radar
                          name="Bolivia"
                          dataKey="valor"
                          stroke="#10B981"
                          fill="#10B981"
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
                                    {data.indicador}
                                  </p>
                                  <p className="text-lg font-bold text-green-600">
                                    {data.valor.toFixed(1)}%
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

              {/* Rankings nacionales */}
              <Card>
                <CardHeader>
                  <CardTitle>Rankings Nacionales</CardTitle>
                  <CardDescription>
                    Los mejores y más desafiados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-green-800 mb-2">
                      🏆 Líderes en Educación
                    </h5>
                    <div className="space-y-1">
                      {asistenciaAnalysis
                        .sort((a, b) => b.tasa_asistencia - a.tasa_asistencia)
                        .slice(0, 3)
                        .map((dept, index) => (
                          <div
                            key={dept.departamento}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className="font-bold text-gray-400 w-4">
                              {index + 1}
                            </span>
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: dept.color }}
                            />
                            <span>
                              {dept.departamento}:{" "}
                              {dept.tasa_asistencia.toFixed(1)}%
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h5 className="font-semibold text-blue-800 mb-2">
                      🌍 Más Diversos Lingüísticamente
                    </h5>
                    <div className="space-y-1">
                      {idiomasAnalysis
                        .sort(
                          (a, b) =>
                            b.diversidad_linguistica - a.diversidad_linguistica
                        )
                        .slice(0, 3)
                        .map((dept, index) => (
                          <div
                            key={dept.departamento}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className="font-bold text-gray-400 w-4">
                              {index + 1}
                            </span>
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: dept.color }}
                            />
                            <span>
                              {dept.departamento}:{" "}
                              {dept.diversidad_linguistica.toFixed(1)}% no
                              castellano
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h5 className="font-semibold text-purple-800 mb-2">
                      📚 Mayor Educación Privada
                    </h5>
                    <div className="space-y-1">
                      {asistenciaAnalysis
                        .sort((a, b) => b.privada_pct - a.privada_pct)
                        .slice(0, 3)
                        .map((dept, index) => (
                          <div
                            key={dept.departamento}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className="font-bold text-gray-400 w-4">
                              {index + 1}
                            </span>
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: dept.color }}
                            />
                            <span>
                              {dept.departamento}: {dept.privada_pct.toFixed(1)}
                              % privada
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
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
                      <li>
                        • {nacionalData.tasa_asistencia_nacional.toFixed(1)}% de
                        asistencia escolar nacional
                      </li>
                      <li>• Educación pública predominante (75%)</li>
                      <li>• Rica diversidad lingüística preservada</li>
                      <li>• Idiomas originarios activos (37.9%)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-900 mb-2">
                      ⚠️ Desafíos
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>
                        •{" "}
                        {(
                          (nacionalData.total_poblacion_escolar -
                            nacionalData.total_escolar) /
                          1000
                        ).toFixed(0)}
                        k niños sin escuela
                      </li>
                      <li>• Brechas departamentales significativas</li>
                      <li>• Riesgo de pérdida de idiomas minoritarios</li>
                      <li>• Necesidad de educación intercultural</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      🎯 Oportunidades
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Educación intercultural bilingüe</li>
                      <li>• Reducir brechas regionales</li>
                      <li>• Preservar patrimonio lingüístico</li>
                      <li>• Aprovechar multilingüismo</li>
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
                      <div className="font-bold text-green-600">
                        {nacionalData.tasa_asistencia_nacional.toFixed(1)}%
                      </div>
                      <div className="text-gray-600">Asistencia escolar</div>
                    </div>
                    <div>
                      <div className="font-bold text-red-600">
                        {(
                          (idiomasAnalysis.reduce(
                            (sum, dept) =>
                              sum +
                              (dept.castellano_pct * dept.total_idioma) / 100,
                            0
                          ) /
                            nacionalData.total_idioma) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                      <div className="text-gray-600">Hablan castellano</div>
                    </div>
                    <div>
                      <div className="font-bold text-blue-600">
                        {(
                          (idiomasAnalysis.reduce(
                            (sum, dept) => sum + dept.idiomas_originarios,
                            0
                          ) /
                            nacionalData.total_idioma) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                      <div className="text-gray-600">Idiomas originarios</div>
                    </div>
                    <div>
                      <div className="font-bold text-purple-600">
                        {(
                          (asistenciaAnalysis.reduce(
                            (sum, dept) =>
                              sum +
                              (dept.publica_pct * dept.total_escolar) / 100,
                            0
                          ) /
                            nacionalData.total_escolar) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                      <div className="text-gray-600">Educación pública</div>
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
              Nacional de Estadística (INE) • Análisis de Asistencia Escolar y
              Primer Idioma Aprendido por Departamentos
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
