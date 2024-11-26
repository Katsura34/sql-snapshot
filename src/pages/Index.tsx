import { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { InventoryItem } from "@/components/InventoryItem";
import { CreateItemDialog } from "@/components/CreateItemDialog";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  // Placeholder data - will be replaced with PHP/SQL API calls
  const items = [
    { id: 1, name: "Laptop", quantity: 5, price: 999.99, image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=300" },
    { id: 2, name: "Smartphone", quantity: 10, price: 699.99, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300" },
    { id: 3, name: "Tablet", quantity: 8, price: 499.99, image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&h=300" },
  ];

  const handleCreateItem = (data: any) => {
    // This will be replaced with a PHP API call
    toast({
      title: "Item Created",
      description: `Successfully created ${data.name}`,
    });
    setIsCreateDialogOpen(false);
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">Inventory</h1>
        <Button variant="primary" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="me-2" size={16} />
          Create Item
        </Button>
      </div>

      <div className="mb-4">
        <Form.Group className="position-relative">
          <Search className="position-absolute top-50 translate-middle-y ms-3" size={16} />
          <Form.Control
            type="search"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ps-5"
          />
        </Form.Group>
      </div>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
        {items.map((item) => (
          <Col key={item.id}>
            <InventoryItem
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
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <Button variant="outline-secondary" disabled>Previous</Button>
        <span className="text-muted">Page 1 of 1</span>
        <Button variant="outline-secondary" disabled>Next</Button>
      </div>

      <CreateItemDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateItem}
      />
    </Container>
  );
};

export default Index;