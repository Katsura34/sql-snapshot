import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { toast } from "sonner";

interface CreateItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export const CreateItemDialog = ({ open, onOpenChange, onSubmit }: CreateItemDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });
  const [imageUploadType, setImageUploadType] = useState<'url' | 'file'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imageUploadType === 'file' && fileInputRef.current?.files?.[0]) {
      const formData = new FormData();
      formData.append('image', fileInputRef.current.files[0]);
      
      const response = await fetch('/api/upload-image.php', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      if (result.success) {
        onSubmit({ ...formData, image: result.path });
      } else {
        toast.error('Failed to upload image');
        return;
      }
    } else {
      onSubmit(formData);
    }
    
    setFormData({ name: "", quantity: "", price: "", image: "" });
  };

  const handleCsvImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    const formData = new FormData();
    formData.append('csvFile', e.target.files[0]);
    
    try {
      const response = await fetch('/api/import-csv.php', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      if (result.success) {
        toast.success('CSV data imported successfully');
        onOpenChange(false);
      } else {
        toast.error('Failed to import CSV data');
      }
    } catch (error) {
      toast.error('Error importing CSV data');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="modal-dialog">
        <DialogHeader>
          <DialogTitle>Create New Item</DialogTitle>
        </DialogHeader>
        <Form onSubmit={handleSubmit} className="space-y-4">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <div className="mb-2">
              <Form.Check
                inline
                type="radio"
                label="URL"
                name="imageType"
                checked={imageUploadType === 'url'}
                onChange={() => setImageUploadType('url')}
              />
              <Form.Check
                inline
                type="radio"
                label="Upload File"
                name="imageType"
                checked={imageUploadType === 'file'}
                onChange={() => setImageUploadType('file')}
              />
            </div>
            {imageUploadType === 'url' ? (
              <Form.Control
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Enter image URL"
                required
              />
            ) : (
              <Form.Control
                type="file"
                ref={fileInputRef}
                accept="image/*"
                required
              />
            )}
          </Form.Group>
          
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <input
                type="file"
                ref={csvInputRef}
                accept=".csv"
                style={{ display: 'none' }}
                onChange={handleCsvImport}
              />
              <Button
                variant="secondary"
                onClick={() => csvInputRef.current?.click()}
              >
                Import CSV
              </Button>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create Item
              </Button>
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};