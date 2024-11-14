"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataRow } from "@/lib/store";

interface DataVisualizationProps {
  data: DataRow[];
  columns: string[];
}

export function DataVisualization({ data, columns }: DataVisualizationProps) {
  // Select first numeric column for visualization
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
    name: row[columns[0]],
    value: row[numericColumn],
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