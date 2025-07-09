"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Building2, Droplet, Globe, Truck, Laptop } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Bienvenido a Estadísticas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 text-blue-500" /> Bolivia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a href="/bolivia" className="text-blue-500 hover:underline">Ver más</a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 text-green-500" /> Departamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a href="/departamentos" className="text-blue-500 hover:underline">Ver más</a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Droplet className="mr-2 text-purple-500" /> Servicios Básicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a href="/servicios-basicos" className="text-blue-500 hover:underline">Ver más</a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 text-red-500" /> Sudamérica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a href="/sudamerica" className="text-blue-500 hover:underline">Ver más</a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="mr-2 text-yellow-500" /> Transporte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a href="/tecnologia-transporte" className="text-blue-500 hover:underline">Ver más</a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Laptop className="mr-2 text-indigo-500" /> Tecnología
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a href="/tecnologia" className="text-blue-500 hover:underline">Ver más</a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}