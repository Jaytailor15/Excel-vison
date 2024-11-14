"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import * as XLSX from 'xlsx';
import { useDataStore } from '@/lib/store';

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const { setData, setColumns, clearData } = useDataStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      if (!uploadedFile.name.match(/\.(xlsx|xls|csv)$/)) {
        toast({
          title: "Invalid file type",
          description: "Please upload an Excel or CSV file",
          variant: "destructive"
        });
        return;
      }

      setFile(uploadedFile);
      simulateUpload();
      processExcelFile(uploadedFile);
    }
  }, [toast, setData, setColumns]);

  const simulateUpload = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const processExcelFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        
        if (jsonData.length > 0) {
          const columns = Object.keys(jsonData[0]);
          setColumns(columns);
          setData(jsonData);
          
          toast({
            title: "File processed successfully",
            description: `Found ${jsonData.length} rows of data`
          });
        } else {
          toast({
            title: "Empty file",
            description: "The uploaded file contains no data",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Error processing file",
          description: "There was an error reading your Excel file",
          variant: "destructive"
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    multiple: false
  });

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    clearData();
  };

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200 ease-in-out
          ${isDragActive ? 'border-primary bg-secondary/50' : 'border-border'}
          ${file ? 'bg-secondary/50' : 'hover:bg-secondary/50'}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <Upload className="h-12 w-12 text-muted-foreground" />
          {file ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">{file.name}</p>
              <Progress value={progress} className="w-[60%] mx-auto" />
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-lg font-medium">
                {isDragActive ? "Drop your file here" : "Drag & drop your Excel file"}
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse (.xlsx, .xls, .csv)
              </p>
            </div>
          )}
        </div>
      </div>

      {file && (
        <div className="flex justify-center space-x-2">
          <Button onClick={() => processExcelFile(file)}>Process File</Button>
          <Button variant="outline" onClick={removeFile}>
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}