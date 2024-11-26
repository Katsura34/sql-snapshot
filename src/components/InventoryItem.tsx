import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UpdateItemDialog } from "./UpdateItemDialog";

interface InventoryItemProps {
  item: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
  };
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

export const InventoryItem = ({ item, onUpdate, onDelete }: InventoryItemProps) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  return (
    <Card className="inventory-card animate-scale-in">
      <div className="aspect-square overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <div className="mt-1 flex items-center justify-between text-sm text-gray-600">
          <span>Quantity: {item.quantity}</span>
          <span>${item.price.toFixed(2)}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setIsUpdateDialogOpen(true)}
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Update
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <UpdateItemDialog
        item={item}
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        onSubmit={() => {
          onUpdate(item.id);
          setIsUpdateDialogOpen(false);
        }}
      />
    </Card>
  );
};