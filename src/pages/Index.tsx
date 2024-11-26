import { useState } from "react";
import { Plus, Search, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InventoryItem } from "@/components/InventoryItem";
import { CreateItemDialog } from "@/components/CreateItemDialog";
import { CsvImportDialog } from "@/components/CsvImportDialog";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCsvImportOpen, setIsCsvImportOpen] = useState(false);
  const { toast } = useToast();

  // Placeholder data - will be replaced with API calls
  const items = [
    { id: 1, name: "Laptop", quantity: 5, price: 999.99, image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=300" },
    { id: 2, name: "Smartphone", quantity: 10, price: 699.99, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300" },
    { id: 3, name: "Tablet", quantity: 8, price: 499.99, image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&h=300" },
  ];

  const handleCreateItem = (data: any) => {
    toast({
      title: "Item Created",
      description: `Successfully created ${data.name}`,
    });
    setIsCreateDialogOpen(false);
  };

  const handleCsvImportSuccess = () => {
    // Refresh the items list after successful import
    toast({
      title: "Import Complete",
      description: "Successfully imported items from CSV",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Inventory</h1>
          <div className="flex gap-2">
            <Button onClick={() => setIsCsvImportOpen(true)} variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import CSV
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="btn-primary">
              <Plus className="mr-2 h-4 w-4" />
              Create Item
            </Button>
          </div>
        </div>

        <div className="mb-8 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input pl-10"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <InventoryItem
              key={item.id}
              item={item}
              onUpdate={(id) => {
                toast({
                  title: "Item Updated",
                  description: `Successfully updated item #${id}`,
                });
              }}
              onDelete={(id) => {
                toast({
                  title: "Item Deleted",
                  description: `Successfully deleted item #${id}`,
                });
              }}
            />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button variant="outline" className="btn-secondary">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-gray-600">Page 1 of 1</span>
          <Button variant="outline" className="btn-secondary">
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <CreateItemDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateItem}
      />

      <CsvImportDialog
        open={isCsvImportOpen}
        onOpenChange={setIsCsvImportOpen}
        onImportSuccess={handleCsvImportSuccess}
      />
    </div>
  );
};

export default Index;