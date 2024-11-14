"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExcelData } from '@/lib/types';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DataVisualizationProps {
  data: ExcelData[];
  columns: string[];
}

export function DataVisualization({ data, columns }: DataVisualizationProps) {
  const numericColumn = columns.find(col => 
    data.some(row => typeof row[col] === 'number')
  );

  if (!numericColumn || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Data Visualization</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">
            No numeric data available for visualization
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.slice(0, 10).map(row => ({
    name: String(row[columns[0]]),
    value: Number(row[numericColumn]),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Visualization</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}