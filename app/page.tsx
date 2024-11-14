"use client";

import { DataTable } from '@/components/data-table';
import { DataVisualization } from '@/components/data-visualization';
import { FileUpload } from '@/components/file-upload';
import { Header } from '@/components/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataStore } from '@/lib/store';

export default function Home() {
  const { data, columns } = useDataStore();

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Transform Your Excel Data Into
              <span className="block text-primary">Actionable Insights</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Upload your Excel files and instantly visualize your data with our powerful analytics platform. 
              Simple, fast, and secure.
            </p>
          </div>
          <div className="mx-auto w-full max-w-2xl">
            <FileUpload />
          </div>
        </section>

        {data.length > 0 && (
          <>
            <section className="mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="text-sm font-medium">Total Rows</h3>
                  </div>
                  <div className="text-2xl font-bold">{data.length}</div>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="text-sm font-medium">Total Columns</h3>
                  </div>
                  <div className="text-2xl font-bold">{columns.length}</div>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="text-sm font-medium">Column Names</h3>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {columns.join(', ')}
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <Tabs defaultValue="table" className="w-full">
                <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                  <TabsTrigger value="table">Table View</TabsTrigger>
                  <TabsTrigger value="visualization">Visualization</TabsTrigger>
                </TabsList>
                <TabsContent value="table" className="mt-6">
                  <DataTable data={data} columns={columns} />
                </TabsContent>
                <TabsContent value="visualization" className="mt-6">
                  <DataVisualization data={data} columns={columns} />
                </TabsContent>
              </Tabs>
            </section>
          </>
        )}
      </div>
    </main>
  );
}