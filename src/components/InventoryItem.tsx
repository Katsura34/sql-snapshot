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
  onUpdate: (id: number, data: any) => void;
  onDelete: (id: number) => void;
}

export const InventoryItem = ({ item, onUpdate, onDelete }: InventoryItemProps) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  return (
    <Card className="group overflow-hidden rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <div className="flex items-center justify-between text-sm">
          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-800">
            Stock: {item.quantity}
          </span>
          <span className="font-medium text-gray-900">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-purple-50 hover:text-purple-700"
            onClick={() => setIsUpdateDialogOpen(true)}
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
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
          onUpdate(item.id, item);
          setIsUpdateDialogOpen(false);
        }}
      />
    </Card>
  );
};