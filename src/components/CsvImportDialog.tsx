import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

interface CsvImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportSuccess: () => void;
}

export const CsvImportDialog = ({ open, onOpenChange, onImportSuccess }: CsvImportDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "text/csv") {
        toast({
          title: "Invalid file type",
          description: "Please select a CSV file",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const rows = text.split("\n");
        const headers = rows[0].split(",");
        const items = rows.slice(1).map((row) => {
          const values = row.split(",");
          return {
            name: values[0],
            quantity: parseInt(values[1]),
            price: parseFloat(values[2]),
            image: values[3],
          };
        });

        // Here you would typically send the items to your backend
        // For now, we'll just show a success message
        toast({
          title: "Import Successful",
          description: `Imported ${items.length} items`,
        });
        onImportSuccess();
        onOpenChange(false);
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Failed to process CSV file",
          variant: "destructive",
        });
      }
    };

    reader.readAsText(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Items from CSV</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="glass-input"
            />
            <p className="text-sm text-gray-500">
              CSV should have columns: name, quantity, price, image
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={!file}>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};