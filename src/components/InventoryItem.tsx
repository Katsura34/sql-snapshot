import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Card, Button } from "react-bootstrap";
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
    <Card className="inventory-card h-100">
      <div className="ratio ratio-1x1">
        <Card.Img
          variant="top"
          src={item.image}
          alt={item.name}
          className="object-fit-cover"
        />
      </div>
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <div className="d-flex justify-content-between text-muted mb-3">
          <small>Quantity: {item.quantity}</small>
          <small>${item.price.toFixed(2)}</small>
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            className="w-50"
            onClick={() => setIsUpdateDialogOpen(true)}
          >
            <Edit2 size={14} className="me-1" />
            Update
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            className="w-50"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 size={14} className="me-1" />
            Delete
          </Button>
        </div>
      </Card.Body>

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