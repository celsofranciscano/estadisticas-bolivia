"use client"

import { TrendingUp, Users, Calendar, BarChart3, LineChart, PieChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"

const censusData = [
  { year: 1976, population: 4613486, date: "10 de julio" },
  { year: 1992, population: 6420792, date: "3 de junio" },
  { year: 2001, population: 8274325, date: "5 de septiembre" },
  { year: 2012, population: 10027254, date: "21 de noviembre" },
  { year: 2024, population: 11312620, date: "23 de marzo" },
]

const growthData = [
  {
    period: "1976-1992",
    years: 16,
    totalGrowth: 39.17,
    annualGrowth: 2.09,
    startPop: 4613486,
    endPop: 6420792,
  },
  {
    period: "1992-2001",
    years: 9,
    totalGrowth: 28.84,
    annualGrowth: 2.86,
    startPop: 6420792,
    endPop: 8274325,
  },
  {
    period: "2001-2012",
    years: 11,
    totalGrowth: 21.18,
    annualGrowth: 1.76,
    startPop: 8274325,
    endPop: 10027254,
  },
  {
    period: "2012-2024",
    years: 12,
    totalGrowth: 12.84,
    annualGrowth: 1.01,
    startPop: 10027254,
    endPop: 11312620,
  },
]

const chartConfig = {
  population: {
    label: "Población",
    color: "hsl(var(--chart-1))",
  },
  totalGrowth: {
    label: "Crecimiento Total (%)",
    color: "hsl(var(--chart-2))",
  },
  annualGrowth: {
    label: "Crecimiento Anual (%)",
    color: "hsl(var(--chart-3))",
  },
}

export default function BoliviaPopulationDashboard() {
  const currentPopulation = censusData[censusData.length - 1].population
  const firstPopulation = censusData[0].population
  const totalGrowthSince1976 = (((currentPopulation - firstPopulation) / firstPopulation) * 100).toFixed(1)

  const projectedPopulation2030 = Math.round(currentPopulation * Math.pow(1.0101, 6))

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Crecimiento Poblacional de Bolivia</h1>
              <p className="text-gray-600 mt-1">Análisis demográfico basado en censos oficiales (1976-2024)</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Estadísticas Clave */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Población Actual</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentPopulation.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Censo 2024</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crecimiento Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{totalGrowthSince1976}%</div>
              <p className="text-xs text-muted-foreground">Desde 1976</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa Actual</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">+1.01%</div>
              <p className="text-xs text-muted-foreground">Anual (2012-2024)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proyección 2030</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{projectedPopulation2030.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Estimación</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico Principal - Evolución Poblacional */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Evolución de la Población Boliviana (1976-2024)
            </CardTitle>
            <CardDescription>Datos oficiales de censos nacionales</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={censusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" tickFormatter={(value) => value.toString()} />
                  <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  <ChartTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white p-3 border rounded-lg shadow-lg">
                            <p className="font-semibold">{`Año ${label}`}</p>
                            <p className="text-sm text-gray-600">{data.date}</p>
                            <p className="text-lg font-bold text-green-600">
                              {data.population.toLocaleString()} habitantes
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="population"
                    stroke="var(--color-population)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-population)", strokeWidth: 2, r: 6 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráficos de Crecimiento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crecimiento Total por Período */}
          <Card>
            <CardHeader>
              <CardTitle>Crecimiento Total por Período</CardTitle>
              <CardDescription>Porcentaje de crecimiento entre censos</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white p-3 border rounded-lg shadow-lg">
                              <p className="font-semibold">{label}</p>
                              <p className="text-sm text-gray-600">{data.years} años</p>
                              <p className="text-lg font-bold text-orange-600">+{data.totalGrowth}%</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="totalGrowth" fill="var(--color-totalGrowth)" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Tasa de Crecimiento Anual */}
          <Card>
            <CardHeader>
              <CardTitle>Tasa de Crecimiento Anual (CAGR)</CardTitle>
              <CardDescription>Crecimiento anual compuesto por período</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white p-3 border rounded-lg shadow-lg">
                              <p className="font-semibold">{label}</p>
                              <p className="text-lg font-bold text-green-600">+{data.annualGrowth}% anual</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="annualGrowth"
                      stroke="var(--color-annualGrowth)"
                      fill="var(--color-annualGrowth)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico Radial - Distribución por Períodos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Intensidad de Crecimiento por Período
            </CardTitle>
            <CardDescription>Comparación visual de las tasas de crecimiento anual</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  data={growthData.map((item, index) => ({
                    ...item,
                    fill: `hsl(var(--chart-${index + 1}))`,
                  }))}
                  innerRadius={30}
                  outerRadius={150}
                >
                  <PolarGrid gridType="circle" />
                  <PolarAngleAxis type="category" dataKey="period" />
                  <PolarRadiusAxis type="number" domain={[0, 3]} tickFormatter={(value) => `${value}%`} />
                  <RadialBar dataKey="annualGrowth" cornerRadius={4} />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white p-3 border rounded-lg shadow-lg">
                            <p className="font-semibold">{data.period}</p>
                            <p className="text-lg font-bold">+{data.annualGrowth}% anual</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Tabla de Datos Detallados */}
        <Card>
          <CardHeader>
            <CardTitle>Datos Detallados de Censos</CardTitle>
            <CardDescription>Información completa de cada censo nacional</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Año</th>
                    <th className="text-left p-3 font-semibold">Fecha del Censo</th>
                    <th className="text-right p-3 font-semibold">Población</th>
                    <th className="text-right p-3 font-semibold">Crecimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {censusData.map((census, index) => {
                    const growth =
                      index > 0
                        ? (
                            ((census.population - censusData[index - 1].population) /
                              censusData[index - 1].population) *
                            100
                          ).toFixed(1)
                        : null

                    return (
                      <tr key={census.year} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{census.year}</td>
                        <td className="p-3">
                          {census.date} de {census.year}
                        </td>
                        <td className="p-3 text-right font-mono">{census.population.toLocaleString()}</td>
                        <td className="p-3 text-right">
                          {growth ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              +{growth}%
                            </Badge>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Análisis e Interpretaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">🌱 Interpretaciones Generales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Desaceleración Progresiva</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• 1976–1992: crecimiento sólido (+2.09% anual)</li>
                  <li>• 1992–2001: pico de crecimiento (+2.86%)</li>
                  <li>• 2001–2012: desaceleración (+1.76%)</li>
                  <li>• 2012–2024: ritmo más bajo (+1.01%)</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Transición Demográfica</h4>
                <p className="text-sm text-gray-600">
                  Bolivia avanza hacia una fase avanzada de transición demográfica: caída de natalidad y fertilidad,
                  mayor esperanza de vida y cambio en la estructura etaria.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-orange-700">📈 Implicaciones y Proyecciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Implicaciones Socioeconómicas</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Menor presión sobre servicios educativos y de salud</li>
                  <li>• Evidencia de envejecimiento poblacional</li>
                  <li>• Necesidad de ajustar infraestructura urbana</li>
                  <li>• Adaptación de mercados laborales y pensiones</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Proyección Futura</h4>
                <p className="text-sm text-gray-600">
                  Si se mantiene la CAGR de +1.01% anual, la población podría alcanzar cerca de{" "}
                  <strong>{projectedPopulation2030.toLocaleString()}</strong> habitantes en 2030–2032.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumen Ejecutivo */}
        <Card className="bg-gradient-to-r from-green-50 to-orange-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">✅ Resumen Ejecutivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">
                    <strong>Bolivia casi triplicó su población</strong> entre 1976 y 2024, pasando de 4.6 millones a
                    11.3 millones de habitantes.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">
                    <strong>El crecimiento más fuerte</strong> ocurrió entre 1992–2001 con una tasa anual del 2.86%.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">
                    <strong>Desde 2012</strong>, la población sigue creciendo pero a ritmo moderado (1.01% anual).
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">
                    <strong>Implicaciones clave:</strong> transición demográfica avanzada, envejecimiento y necesidad de
                    políticas adaptadas.
                  </p>
                </div>
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
              Datos basados en censos oficiales de Bolivia • Análisis demográfico 1976-2024 • Fuentes: INE Bolivia,
              Wikipedia, World Bank
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
