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

  const handleUpdateItem = async (id: number, data: any) => {
    try {
      const response = await fetch(`/api/update_item.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, id }),
      });

      if (!response.ok) throw new Error('Failed to update item');

      toast({
        title: "Item Updated",
        description: `Successfully updated item #${id}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      });
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      const response = await fetch(`/api/delete_item.php?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete item');

      toast({
        title: "Item Deleted",
        description: `Successfully deleted item #${id}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Inventory Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage your products and stock levels efficiently
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => setIsCsvImportOpen(true)} 
              variant="outline"
              className="bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-200"
            >
              <Upload className="mr-2 h-4 w-4" />
              Import CSV
            </Button>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Item
            </Button>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/50 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <InventoryItem
              key={item.id}
              item={item}
              onUpdate={handleUpdateItem}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button 
            variant="outline" 
            className="bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-200"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-gray-600">Page 1 of 1</span>
          <Button 
            variant="outline"
            className="bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-200"
          >
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