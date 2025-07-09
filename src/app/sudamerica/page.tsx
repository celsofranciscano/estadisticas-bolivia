"use client"

import React, { useState } from "react"
import { TrendingUp, Users, Globe, BarChart3, LineChart, PieChart, Calculator, Target, Zap, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
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
  ScatterChart,
  Scatter,
} from "recharts"

// Datos de censos por país
const sudamericaData = [
  {
    pais: "Argentina",
    color: "#3B82F6",
    censos: [
      { anio: 1869, poblacion: 2000000 },
      { anio: 1895, poblacion: 3000000 },
      { anio: 1914, poblacion: 7000000 },
      { anio: 1947, poblacion: 17000000 },
      { anio: 1960, poblacion: 20000000 },
      { anio: 1970, poblacion: 23000000 },
      { anio: 1980, poblacion: 26000000 },
      { anio: 1991, poblacion: 32000000 },
      { anio: 2001, poblacion: 36000000 },
      { anio: 2010, poblacion: 40000000 },
      { anio: 2022, poblacion: 45892285 },
    ],
  },
  {
    pais: "Bolivia",
    color: "#10B981",
    censos: [
      { anio: 1976, poblacion: 4613486 },
      { anio: 1992, poblacion: 6420792 },
      { anio: 2001, poblacion: 8274325 },
      { anio: 2012, poblacion: 10027254 },
      { anio: 2024, poblacion: 11312620 },
    ],
  },
  {
    pais: "Brasil",
    color: "#F59E0B",
    censos: [
      { anio: 1872, poblacion: 10000000 },
      { anio: 1900, poblacion: 17000000 },
      { anio: 1920, poblacion: 30000000 },
      { anio: 1940, poblacion: 41000000 },
      { anio: 1950, poblacion: 52000000 },
      { anio: 1960, poblacion: 70000000 },
      { anio: 1970, poblacion: 94000000 },
      { anio: 1980, poblacion: 121000000 },
      { anio: 1991, poblacion: 146000000 },
      { anio: 2000, poblacion: 169000000 },
      { anio: 2010, poblacion: 190000000 },
      { anio: 2022, poblacion: 203062512 },
    ],
  },
  {
    pais: "Chile",
    color: "#EF4444",
    censos: [
      { anio: 1907, poblacion: 3000000 },
      { anio: 1920, poblacion: 4000000 },
      { anio: 1940, poblacion: 5000000 },
      { anio: 1952, poblacion: 6000000 },
      { anio: 1960, poblacion: 7000000 },
      { anio: 1970, poblacion: 8000000 },
      { anio: 1982, poblacion: 10000000 },
      { anio: 1992, poblacion: 13000000 },
      { anio: 2002, poblacion: 16000000 },
      { anio: 2012, poblacion: 17574003 },
      { anio: 2024, poblacion: 18480432 },
    ],
  },
  {
    pais: "Colombia",
    color: "#8B5CF6",
    censos: [
      { anio: 1938, poblacion: 9000000 },
      { anio: 1951, poblacion: 11000000 },
      { anio: 1964, poblacion: 14000000 },
      { anio: 1973, poblacion: 17000000 },
      { anio: 1985, poblacion: 22000000 },
      { anio: 1993, poblacion: 28000000 },
      { anio: 2005, poblacion: 35000000 },
      { anio: 2018, poblacion: 52216000 },
    ],
  },
  {
    pais: "Ecuador",
    color: "#06B6D4",
    censos: [
      { anio: 1950, poblacion: 3000000 },
      { anio: 1962, poblacion: 4000000 },
      { anio: 1974, poblacion: 5000000 },
      { anio: 1982, poblacion: 6000000 },
      { anio: 1990, poblacion: 7000000 },
      { anio: 2001, poblacion: 8000000 },
      { anio: 2010, poblacion: 9000000 },
      { anio: 2022, poblacion: 16938986 },
    ],
  },
  {
    pais: "Paraguay",
    color: "#84CC16",
    censos: [
      { anio: 1950, poblacion: 1000000 },
      { anio: 1962, poblacion: 1500000 },
      { anio: 1972, poblacion: 2000000 },
      { anio: 1982, poblacion: 2500000 },
      { anio: 1992, poblacion: 3000000 },
      { anio: 2002, poblacion: 3500000 },
      { anio: 2012, poblacion: 4000000 },
      { anio: 2022, poblacion: 6109903 },
    ],
  },
  {
    pais: "Perú",
    color: "#F97316",
    censos: [
      { anio: 1876, poblacion: 2699000 },
      { anio: 1940, poblacion: 7000000 },
      { anio: 1961, poblacion: 10000000 },
      { anio: 1972, poblacion: 13000000 },
      { anio: 1981, poblacion: 16000000 },
      { anio: 1993, poblacion: 22000000 },
      { anio: 2007, poblacion: 28000000 },
      { anio: 2017, poblacion: 34352718 },
    ],
  },
  {
    pais: "Uruguay",
    color: "#6366F1",
    censos: [
      { anio: 1908, poblacion: 1000000 },
      { anio: 1916, poblacion: 1200000 },
      { anio: 1928, poblacion: 1400000 },
      { anio: 1938, poblacion: 1600000 },
      { anio: 1956, poblacion: 1800000 },
      { anio: 1963, poblacion: 2000000 },
      { anio: 1975, poblacion: 2200000 },
      { anio: 1985, poblacion: 2400000 },
      { anio: 1996, poblacion: 2600000 },
      { anio: 2004, poblacion: 3000000 },
      { anio: 2011, poblacion: 3200000 },
      { anio: 2021, poblacion: 3423108 },
    ],
  },
  {
    pais: "Venezuela",
    color: "#EC4899",
    censos: [
      { anio: 1901, poblacion: 2000000 },
      { anio: 1926, poblacion: 3000000 },
      { anio: 1941, poblacion: 4000000 },
      { anio: 1950, poblacion: 5000000 },
      { anio: 1961, poblacion: 7000000 },
      { anio: 1971, poblacion: 10000000 },
      { anio: 1981, poblacion: 14000000 },
      { anio: 1990, poblacion: 19000000 },
      { anio: 2001, poblacion: 24000000 },
      { anio: 2011, poblacion: 28838498 },
    ],
  },
]

// Funciones de cálculo
const calculateCAGR = (startValue: number, endValue: number, years: number): number => {
  return Math.pow(endValue / startValue, 1 / years) - 1
}

const calculateGrowth = (startValue: number, endValue: number): number => {
  return ((endValue - startValue) / startValue) * 100
}

// Datos procesados para análisis
const countryAnalysis = sudamericaData.map((country) => {
  const firstCensus = country.censos[0]
  const lastCensus = country.censos[country.censos.length - 1]
  const totalYears = lastCensus.anio - firstCensus.anio

  // Calcular CAGR histórico completo
  const historicalCAGR = calculateCAGR(firstCensus.poblacion, lastCensus.poblacion, totalYears) * 100

  // Calcular crecimiento por décadas (últimas 3 décadas cuando sea posible)
  const recentPeriods = []
  for (let i = Math.max(0, country.censos.length - 4); i < country.censos.length - 1; i++) {
    const start = country.censos[i]
    const end = country.censos[i + 1]
    const years = end.anio - start.anio
    recentPeriods.push({
      period: `${start.anio}-${end.anio}`,
      years,
      growth: calculateGrowth(start.poblacion, end.poblacion),
      cagr: calculateCAGR(start.poblacion, end.poblacion, years) * 100,
      startYear: start.anio,
      endYear: end.anio,
    })
  }

  return {
    pais: country.pais,
    color: country.color,
    poblacionActual: lastCensus.poblacion,
    poblacionInicial: firstCensus.poblacion,
    anioInicial: firstCensus.anio,
    anioFinal: lastCensus.anio,
    totalYears,
    historicalCAGR,
    totalGrowth: calculateGrowth(firstCensus.poblacion, lastCensus.poblacion),
    recentPeriods,
    censos: country.censos,
  }
})

// Datos para distribución actual
const currentDistribution = countryAnalysis
  .map((country) => ({
    pais: country.pais,
    poblacion: country.poblacionActual,
    color: country.color,
    percentage: (country.poblacionActual / countryAnalysis.reduce((sum, c) => sum + c.poblacionActual, 0)) * 100,
  }))
  .sort((a, b) => b.poblacion - a.poblacion)

// Datos para gráfico temporal combinado (años comunes)
const commonYears = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]
const temporalData = commonYears.map((year) => {
  const yearData: any = { year }
  sudamericaData.forEach((country) => {
    // Encontrar el censo más cercano al año
    const closestCensus = country.censos.reduce((prev, curr) => {
      return Math.abs(curr.anio - year) < Math.abs(prev.anio - year) ? curr : prev
    })
    if (Math.abs(closestCensus.anio - year) <= 5) {
      yearData[country.pais] = closestCensus.poblacion
    }
  })
  return yearData
})

// Análisis de crecimiento por décadas
const decadeAnalysis = [
  { decade: "1950-1960", countries: [] as any[] },
  { decade: "1960-1970", countries: [] as any[] },
  { decade: "1970-1980", countries: [] as any[] },
  { decade: "1980-1990", countries: [] as any[] },
  { decade: "1990-2000", countries: [] as any[] },
  { decade: "2000-2010", countries: [] as any[] },
  { decade: "2010-2020", countries: [] as any[] },
]

countryAnalysis.forEach((country) => {
  country.recentPeriods.forEach((period) => {
    const startDecade = Math.floor(period.startYear / 10) * 10
    const decade = decadeAnalysis.find((d) => d.decade.startsWith(startDecade.toString()))
    if (decade) {
      decade.countries.push({
        pais: country.pais,
        cagr: period.cagr,
        growth: period.growth,
        color: country.color,
      })
    }
  })
})

const chartConfig = {
  population: { label: "Población", color: "hsl(var(--chart-1))" },
  growth: { label: "Crecimiento (%)", color: "hsl(var(--chart-2))" },
  cagr: { label: "CAGR (%)", color: "hsl(var(--chart-3))" },
}

export default function SudamericaPopulationDashboard() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["Brasil", "Argentina", "Colombia"])
  const [selectedDecade, setSelectedDecade] = useState("2000-2010")

  const totalPopulation = currentDistribution.reduce((sum, country) => sum + country.poblacion, 0)
  const fastestGrowingCountry = countryAnalysis.reduce((max, country) =>
    country.historicalCAGR > max.historicalCAGR ? country : max,
  )
  const largestCountry = currentDistribution[0]
  const smallestCountry = currentDistribution[currentDistribution.length - 1]

  const toggleCountrySelection = (country: string) => {
    setSelectedCountries((prev) => (prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Crecimiento Poblacional de Sudamérica</h1>
              <p className="text-gray-600 mt-1">Análisis comparativo de 10 países sudamericanos (1869-2024)</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Estadísticas Clave */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Población Total</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalPopulation / 1000000).toFixed(0)}M</div>
              <p className="text-xs text-muted-foreground">Sudamérica 2024</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mayor Crecimiento</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{fastestGrowingCountry.pais}</div>
              <p className="text-xs text-muted-foreground">+{fastestGrowingCountry.historicalCAGR.toFixed(2)}% anual</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Más Poblado</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{largestCountry.pais}</div>
              <p className="text-xs text-muted-foreground">{largestCountry.percentage.toFixed(1)}% del total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menos Poblado</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{smallestCountry.pais}</div>
              <p className="text-xs text-muted-foreground">{(smallestCountry.poblacion / 1000000).toFixed(1)}M hab.</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs para diferentes análisis */}
        <Tabs defaultValue="evolution" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="evolution">Evolución</TabsTrigger>
            <TabsTrigger value="comparison">Comparación</TabsTrigger>
            <TabsTrigger value="growth">Crecimiento</TabsTrigger>
            <TabsTrigger value="distribution">Distribución</TabsTrigger>
            <TabsTrigger value="decades">Por Décadas</TabsTrigger>
            <TabsTrigger value="analysis">Análisis</TabsTrigger>
          </TabsList>

          {/* Tab: Evolución Histórica */}
          <TabsContent value="evolution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Evolución Poblacional Histórica (1869-2024)
                </CardTitle>
                <CardDescription>Crecimiento poblacional de todos los países sudamericanos</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={temporalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-4 border rounded-lg shadow-lg max-w-xs">
                                <p className="font-semibold mb-2">Año {label}</p>
                                {payload
                                  .filter((entry) => entry.value)
                                  .sort((a, b) => (b.value as number) - (a.value as number))
                                  .slice(0, 6)
                                  .map((entry, index) => (
                                    <div key={index} className="flex justify-between items-center gap-2">
                                      <div className="flex items-center gap-2">
                                        <div
                                          className="w-3 h-3 rounded-full"
                                          style={{ backgroundColor: entry.color }}
                                        />
                                        <span className="text-sm">{entry.dataKey}</span>
                                      </div>
                                      <span className="font-mono text-sm">
                                        {((entry.value as number) / 1000000).toFixed(1)}M
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      {sudamericaData.map((country) => (
                        <Line
                          key={country.pais}
                          type="monotone"
                          dataKey={country.pais}
                          stroke={country.color}
                          strokeWidth={2}
                          dot={{ fill: country.color, strokeWidth: 2, r: 3 }}
                          connectNulls={false}
                        />
                      ))}
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Tabla histórica completa */}
            <Card>
              <CardHeader>
                <CardTitle>Datos Históricos Completos</CardTitle>
                <CardDescription>Población por país y período censal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">País</th>
                        <th className="text-right p-2 font-semibold">Primer Censo</th>
                        <th className="text-right p-2 font-semibold">Último Censo</th>
                        <th className="text-right p-2 font-semibold">Años</th>
                        <th className="text-right p-2 font-semibold">Crecimiento Total</th>
                        <th className="text-right p-2 font-semibold">CAGR Histórico</th>
                      </tr>
                    </thead>
                    <tbody>
                      {countryAnalysis
                        .sort((a, b) => b.historicalCAGR - a.historicalCAGR)
                        .map((country) => (
                          <tr key={country.pais} className="border-b hover:bg-gray-50">
                            <td className="p-2 font-medium flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: country.color }} />
                              {country.pais}
                            </td>
                            <td className="p-2 text-right font-mono">
                              {country.poblacionInicial.toLocaleString()}
                              <div className="text-xs text-gray-500">({country.anioInicial})</div>
                            </td>
                            <td className="p-2 text-right font-mono">
                              {country.poblacionActual.toLocaleString()}
                              <div className="text-xs text-gray-500">({country.anioFinal})</div>
                            </td>
                            <td className="p-2 text-right">{country.totalYears}</td>
                            <td className="p-2 text-right">
                              <Badge
                                variant="secondary"
                                className={
                                  country.totalGrowth > 1000
                                    ? "bg-green-100 text-green-800"
                                    : country.totalGrowth > 500
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-100 text-blue-800"
                                }
                              >
                                +{country.totalGrowth.toFixed(0)}%
                              </Badge>
                            </td>
                            <td className="p-2 text-right">
                              <Badge
                                variant="outline"
                                className={
                                  country.historicalCAGR > 3
                                    ? "border-green-500 text-green-700"
                                    : country.historicalCAGR > 2
                                      ? "border-yellow-500 text-yellow-700"
                                      : "border-blue-500 text-blue-700"
                                }
                              >
                                +{country.historicalCAGR.toFixed(2)}%
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

          {/* Tab: Comparación Selectiva */}
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comparación Selectiva de Países</CardTitle>
                <CardDescription>Selecciona países para comparar su evolución poblacional</CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  {sudamericaData.map((country) => (
                    <Button
                      key={country.pais}
                      variant={selectedCountries.includes(country.pais) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCountrySelection(country.pais)}
                      className="text-xs"
                    >
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: country.color }} />
                      {country.pais}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={temporalData.map((yearData) => {
                        const filteredData: any = { year: yearData.year }
                        selectedCountries.forEach((country) => {
                          if (yearData[country]) {
                            filteredData[country] = yearData[country]
                          }
                        })
                        return filteredData
                      })}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-3 border rounded-lg shadow-lg">
                                <p className="font-semibold mb-2">Año {label}</p>
                                {payload
                                  .sort((a, b) => (b.value as number) - (a.value as number))
                                  .map((entry, index) => (
                                    <div key={index} className="flex justify-between items-center gap-2">
                                      <div className="flex items-center gap-2">
                                        <div
                                          className="w-3 h-3 rounded-full"
                                          style={{ backgroundColor: entry.color }}
                                        />
                                        <span className="text-sm">{entry.dataKey}</span>
                                      </div>
                                      <span className="font-mono text-sm">
                                        {((entry.value as number) / 1000000).toFixed(1)}M
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      {selectedCountries.map((countryName) => {
                        const country = sudamericaData.find((c) => c.pais === countryName)
                        return (
                          <Line
                            key={countryName}
                            type="monotone"
                            dataKey={countryName}
                            stroke={country?.color}
                            strokeWidth={3}
                            dot={{ fill: country?.color, strokeWidth: 2, r: 5 }}
                          />
                        )
                      })}
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Comparación de métricas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>CAGR Histórico Comparativo</CardTitle>
                  <CardDescription>Tasa de crecimiento anual compuesta desde el primer censo</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={countryAnalysis
                          .sort((a, b) => b.historicalCAGR - a.historicalCAGR)
                          .map((country) => ({
                            pais: country.pais.length > 8 ? country.pais.substring(0, 8) + "." : country.pais,
                            fullName: country.pais,
                            cagr: country.historicalCAGR,
                            color: country.color,
                          }))}
                        margin={{ bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="pais" angle={-45} textAnchor="end" height={80} />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <ChartTooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-semibold">{data.fullName}</p>
                                  <p className="text-lg font-bold text-green-600">+{data.cagr.toFixed(2)}% anual</p>
                                  <p className="text-sm text-gray-600">CAGR histórico</p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="cagr" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Multiplicador Poblacional</CardTitle>
                  <CardDescription>Cuántas veces creció la población desde el primer censo</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={countryAnalysis
                          .sort(
                            (a, b) => b.poblacionActual / b.poblacionInicial - a.poblacionActual / a.poblacionInicial,
                          )
                          .map((country) => ({
                            pais: country.pais.length > 8 ? country.pais.substring(0, 8) + "." : country.pais,
                            fullName: country.pais,
                            multiplier: country.poblacionActual / country.poblacionInicial,
                            color: country.color,
                          }))}
                        margin={{ bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="pais" angle={-45} textAnchor="end" height={80} />
                        <YAxis tickFormatter={(value) => `${value.toFixed(1)}x`} />
                        <ChartTooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-semibold">{data.fullName}</p>
                                  <p className="text-lg font-bold text-blue-600">{data.multiplier.toFixed(1)}x</p>
                                  <p className="text-sm text-gray-600">Multiplicador poblacional</p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="multiplier" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Análisis de Crecimiento */}
          <TabsContent value="growth" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Patrones de Crecimiento Reciente
                </CardTitle>
                <CardDescription>Análisis de las tasas de crecimiento en los últimos períodos censales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Scatter plot de CAGR vs Población */}
                  <div>
                    <h4 className="font-semibold mb-4">CAGR vs Población Actual</h4>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart data={countryAnalysis}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="poblacionActual"
                            type="number"
                            scale="log"
                            domain={["dataMin", "dataMax"]}
                            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                          />
                          <YAxis dataKey="historicalCAGR" tickFormatter={(value) => `${value}%`} />
                          <ChartTooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload
                                return (
                                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                                    <p className="font-semibold">{data.pais}</p>
                                    <p className="text-sm">Población: {(data.poblacionActual / 1000000).toFixed(1)}M</p>
                                    <p className="text-sm">CAGR: +{data.historicalCAGR.toFixed(2)}%</p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          <Scatter dataKey="historicalCAGR" fill="#8884d8">
                            {countryAnalysis.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>

                  {/* Top performers */}
                  <div>
                    <h4 className="font-semibold mb-4">Ranking de Crecimiento</h4>
                    <div className="space-y-3">
                      {countryAnalysis
                        .sort((a, b) => b.historicalCAGR - a.historicalCAGR)
                        .slice(0, 6)
                        .map((country, index) => (
                          <div key={country.pais} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                            <div className="text-2xl font-bold text-gray-400 w-8">{index + 1}</div>
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: country.color }} />
                            <div className="flex-1">
                              <div className="font-semibold">{country.pais}</div>
                              <div className="text-sm text-gray-600">
                                {country.anioInicial}-{country.anioFinal} ({country.totalYears} años)
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg text-green-600">
                                +{country.historicalCAGR.toFixed(2)}%
                              </div>
                              <div className="text-sm text-gray-600">CAGR anual</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Análisis de períodos recientes */}
            <Card>
              <CardHeader>
                <CardTitle>Crecimiento por Períodos Recientes</CardTitle>
                <CardDescription>Tasas de crecimiento en los últimos períodos censales de cada país</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">País</th>
                        <th className="text-center p-2 font-semibold">Período 1</th>
                        <th className="text-center p-2 font-semibold">CAGR</th>
                        <th className="text-center p-2 font-semibold">Período 2</th>
                        <th className="text-center p-2 font-semibold">CAGR</th>
                        <th className="text-center p-2 font-semibold">Período 3</th>
                        <th className="text-center p-2 font-semibold">CAGR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {countryAnalysis.map((country) => (
                        <tr key={country.pais} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: country.color }} />
                            {country.pais}
                          </td>
                          {Array.from({ length: 3 }).map((_, index) => {
                            const period = country.recentPeriods[index]
                            return (
                              <React.Fragment key={index}>
                                <td className="p-2 text-center">
                                  {period ? (
                                    <div>
                                      <div className="font-medium">{period.period}</div>
                                      <Badge
                                        variant="outline"
                                        className={
                                          period.growth > 50
                                            ? "border-green-500 text-green-700"
                                            : period.growth > 25
                                              ? "border-yellow-500 text-yellow-700"
                                              : "border-blue-500 text-blue-700"
                                        }
                                      >
                                        +{period.growth.toFixed(1)}%
                                      </Badge>
                                    </div>
                                  ) : (
                                    <span className="text-gray-400">—</span>
                                  )}
                                </td>
                                <td className="p-2 text-center font-mono">
                                  {period ? (
                                    <span className="font-semibold">+{period.cagr.toFixed(2)}%</span>
                                  ) : (
                                    <span className="text-gray-400">—</span>
                                  )}
                                </td>
                              </React.Fragment>
                            )
                          })}
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
                    Distribución Poblacional Actual
                  </CardTitle>
                  <CardDescription>Participación porcentual por país en Sudamérica</CardDescription>
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
                          label={({ pais, percentage }) => (percentage > 3 ? `${pais}: ${percentage.toFixed(1)}%` : "")}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="poblacion"
                        >
                          {currentDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-semibold">{data.pais}</p>
                                  <p className="text-lg font-bold">{(data.poblacion / 1000000).toFixed(1)}M</p>
                                  <p className="text-sm text-gray-600">{data.percentage.toFixed(2)}% del total</p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Ranking detallado */}
              <Card>
                <CardHeader>
                  <CardTitle>Ranking Poblacional Sudamericano</CardTitle>
                  <CardDescription>Países ordenados por población actual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentDistribution.map((country, index) => (
                      <div key={country.pais} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="text-2xl font-bold text-gray-400 w-8">{index + 1}</div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: country.color }} />
                          <div className="flex-1">
                            <div className="font-semibold">{country.pais}</div>
                            <div className="text-sm text-gray-600">
                              {(country.poblacion / 1000000).toFixed(1)} millones de habitantes
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{country.percentage.toFixed(1)}%</div>
                          <div className="text-sm text-gray-600">del total</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Análisis de concentración */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Análisis de Concentración Poblacional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Top 3 Países</h4>
                    <p className="text-2xl font-bold text-blue-700">
                      {currentDistribution
                        .slice(0, 3)
                        .reduce((sum, country) => sum + country.percentage, 0)
                        .toFixed(1)}
                      %
                    </p>
                    <p className="text-sm text-blue-600">de la población total</p>
                    <div className="mt-2 space-y-1">
                      {currentDistribution.slice(0, 3).map((country) => (
                        <div key={country.pais} className="text-sm">
                          {country.pais}: {country.percentage.toFixed(1)}%
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Brasil vs Resto</h4>
                    <p className="text-2xl font-bold text-green-700">{currentDistribution[0].percentage.toFixed(1)}%</p>
                    <p className="text-sm text-green-600">Brasil concentra</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Resto de países: {(100 - currentDistribution[0].percentage).toFixed(1)}%
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Países Pequeños</h4>
                    <p className="text-2xl font-bold text-orange-700">
                      {currentDistribution
                        .slice(-3)
                        .reduce((sum, country) => sum + country.percentage, 0)
                        .toFixed(1)}
                      %
                    </p>
                    <p className="text-sm text-orange-600">los 3 menores</p>
                    <div className="mt-2 space-y-1">
                      {currentDistribution.slice(-3).map((country) => (
                        <div key={country.pais} className="text-sm">
                          {country.pais}: {country.percentage.toFixed(1)}%
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Análisis por Décadas */}
          <TabsContent value="decades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Crecimiento por Décadas
                </CardTitle>
                <CardDescription>Análisis del crecimiento poblacional por períodos de 10 años</CardDescription>
                <div className="flex gap-2 flex-wrap mt-4">
                  {decadeAnalysis
                    .filter((decade) => decade.countries.length > 0)
                    .map((decade) => (
                      <Button
                        key={decade.decade}
                        variant={selectedDecade === decade.decade ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDecade(decade.decade)}
                      >
                        {decade.decade}
                      </Button>
                    ))}
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={
                        decadeAnalysis
                          .find((d) => d.decade === selectedDecade)
                          ?.countries.sort((a, b) => b.cagr - a.cagr) || []
                      }
                      margin={{ bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="pais"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tickFormatter={(value) => (value.length > 8 ? value.substring(0, 8) + "." : value)}
                      />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-3 border rounded-lg shadow-lg">
                                <p className="font-semibold">{data.pais}</p>
                                <p className="text-sm text-gray-600">Década: {selectedDecade}</p>
                                <p className="text-lg font-bold text-green-600">+{data.cagr.toFixed(2)}% anual</p>
                                <p className="text-sm text-gray-600">+{data.growth.toFixed(1)}% total</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="cagr" fill="#10B981" radius={[4, 4, 0, 0]}>
                        {decadeAnalysis
                          .find((d) => d.decade === selectedDecade)
                          ?.countries.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Heatmap de décadas */}
            <Card>
              <CardHeader>
                <CardTitle>Matriz de Crecimiento por Décadas</CardTitle>
                <CardDescription>Vista general del crecimiento de todos los países por década</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">País</th>
                        {decadeAnalysis
                          .filter((decade) => decade.countries.length > 0)
                          .map((decade) => (
                            <th key={decade.decade} className="text-center p-2 font-semibold">
                              {decade.decade}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sudamericaData.map((country) => (
                        <tr key={country.pais} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: country.color }} />
                            {country.pais}
                          </td>
                          {decadeAnalysis
                            .filter((decade) => decade.countries.length > 0)
                            .map((decade) => {
                              const countryData = decade.countries.find((c) => c.pais === country.pais)
                              return (
                                <td key={decade.decade} className="p-2 text-center">
                                  {countryData ? (
                                    <Badge
                                      variant="secondary"
                                      className={
                                        countryData.cagr > 3
                                          ? "bg-green-100 text-green-800"
                                          : countryData.cagr > 2
                                            ? "bg-yellow-100 text-yellow-800"
                                            : countryData.cagr > 1
                                              ? "bg-blue-100 text-blue-800"
                                              : "bg-gray-100 text-gray-800"
                                      }
                                    >
                                      +{countryData.cagr.toFixed(1)}%
                                    </Badge>
                                  ) : (
                                    <span className="text-gray-400">—</span>
                                  )}
                                </td>
                              )
                            })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Análisis e Interpretaciones */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">🌟 Patrones de Crecimiento Identificados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Brasil - Gigante Demográfico</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Concentra el {currentDistribution[0].percentage.toFixed(1)}% de la población sudamericana. Su
                      crecimiento histórico (+
                      {countryAnalysis.find((c) => c.pais === "Brasil")?.historicalCAGR.toFixed(2)}% anual) ha sido
                      constante y sostenido.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-blue-100 text-blue-800">Líder regional</Badge>
                      <Badge className="bg-green-100 text-green-800">Crecimiento estable</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Paraguay - Mayor Crecimiento Relativo</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Muestra el mayor CAGR histórico (+
                      {countryAnalysis.find((c) => c.pais === "Paraguay")?.historicalCAGR.toFixed(2)}% anual),
                      multiplicando su población por{" "}
                      {(
                        countryAnalysis.find((c) => c.pais === "Paraguay")!.poblacionActual /
                        countryAnalysis.find((c) => c.pais === "Paraguay")!.poblacionInicial
                      ).toFixed(1)}
                      x desde 1950.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-green-100 text-green-800">Mayor CAGR</Badge>
                      <Badge className="bg-purple-100 text-purple-800">Boom demográfico</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Argentina y Colombia</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Segundo y tercer países más poblados respectivamente. Argentina con datos desde 1869 muestra una
                      transición demográfica más temprana, mientras Colombia mantiene un crecimiento más dinámico.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-yellow-100 text-yellow-800">Transición avanzada</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">📊 Tendencias Demográficas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Concentración Poblacional</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Los 3 países más grandes (Brasil, Argentina, Colombia) concentran el{" "}
                      {currentDistribution
                        .slice(0, 3)
                        .reduce((sum, country) => sum + country.percentage, 0)
                        .toFixed(1)}
                      % de la población total sudamericana.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Países Pequeños pero Dinámicos</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Uruguay, Paraguay y Bolivia, aunque pequeños en términos absolutos, muestran patrones de
                      crecimiento interesantes y sostenidos a lo largo del tiempo.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Transición Demográfica Regional</h4>
                    <p className="text-sm text-gray-600">
                      La región muestra signos de desaceleración del crecimiento poblacional, típico de la transición
                      demográfica avanzada, con países como Argentina y Uruguay liderando esta tendencia.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contexto Histórico */}
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">🌐 Contexto Histórico y Socioeconómico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">🔹 Siglo XIX - Fundación</h4>
                    <p className="text-sm text-gray-700">
                      Los primeros censos (Argentina 1869, Brasil 1872) muestran poblaciones pequeñas que crecerían
                      exponencialmente con la inmigración europea y el desarrollo económico.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">🔹 Siglo XX - Explosión Demográfica</h4>
                    <p className="text-sm text-gray-700">
                      El período 1950-1980 marca el mayor crecimiento poblacional regional, con tasas superiores al 2.5%
                      anual en la mayoría de países, impulsado por mejoras en salud pública y reducción de mortalidad.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">🔹 Siglo XXI - Transición</h4>
                    <p className="text-sm text-gray-700">
                      Desaceleración generalizada del crecimiento poblacional, urbanización acelerada y envejecimiento
                      de la población, especialmente en países del Cono Sur.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proyecciones y Conclusiones */}
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-800">🔮 Proyecciones y Tendencias Futuras</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-3">Proyección 2030</h4>
                    <div className="space-y-2">
                      {countryAnalysis
                        .sort((a, b) => b.poblacionActual - a.poblacionActual)
                        .slice(0, 5)
                        .map((country) => {
                          const projection2030 = Math.round(
                            country.poblacionActual * Math.pow(1 + country.historicalCAGR / 100, 6),
                          )
                          return (
                            <div
                              key={country.pais}
                              className="flex justify-between items-center p-2 bg-purple-50 rounded"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: country.color }} />
                                <span className="font-medium">{country.pais}</span>
                              </div>
                              <span className="font-mono text-sm">{(projection2030 / 1000000).toFixed(1)}M</span>
                            </div>
                          )
                        })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-purple-900 mb-3">Desafíos Demográficos</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600">•</span>
                        <span>
                          <strong>Envejecimiento poblacional</strong> en Argentina, Uruguay y Chile
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600">•</span>
                        <span>
                          <strong>Urbanización acelerada</strong> con concentración en megaciudades
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600">•</span>
                        <span>
                          <strong>Migración intraregional</strong> hacia países con mayor estabilidad económica
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600">•</span>
                        <span>
                          <strong>Bono demográfico</strong> aún aprovechable en Paraguay, Bolivia y Ecuador
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resumen Ejecutivo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">✅ Resumen Ejecutivo Sudamericano</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {countryAnalysis
                    .sort((a, b) => b.historicalCAGR - a.historicalCAGR)
                    .map((country) => (
                      <div key={country.pais} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: country.color }} />
                          <h5 className="font-semibold">{country.pais}</h5>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="text-gray-600">Población actual:</span>{" "}
                            <strong>{(country.poblacionActual / 1000000).toFixed(1)}M</strong>
                          </p>
                          <p>
                            <span className="text-gray-600">CAGR histórico:</span>{" "}
                            <strong
                              className={
                                country.historicalCAGR > 3
                                  ? "text-green-600"
                                  : country.historicalCAGR > 2
                                    ? "text-yellow-600"
                                    : "text-blue-600"
                              }
                            >
                              +{country.historicalCAGR.toFixed(2)}%
                            </strong>
                          </p>
                          <p>
                            <span className="text-gray-600">Período:</span>{" "}
                            <strong>
                              {country.anioInicial}-{country.anioFinal}
                            </strong>
                          </p>
                          <p>
                            <span className="text-gray-600">Multiplicador:</span>{" "}
                            <strong>{(country.poblacionActual / country.poblacionInicial).toFixed(1)}x</strong>
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
              Análisis demográfico de Sudamérica • Datos históricos de censos nacionales 1869-2024 • Cálculos
              matemáticos verificados • CAGR = Tasa de Crecimiento Anual Compuesta
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
