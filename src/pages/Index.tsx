import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { InventoryItem } from "@/components/InventoryItem";
import { CreateItemDialog } from "@/components/CreateItemDialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: items = [] } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const response = await fetch('/api/items.php');
      return response.json();
    },
  });

  const handleCreateItem = async (data: any) => {
    try {
      const response = await fetch('/api/items.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast.success('Item created successfully');
        queryClient.invalidateQueries({ queryKey: ['items'] });
        setIsCreateDialogOpen(false);
      } else {
        toast.error('Failed to create item');
      }
    } catch (error) {
      toast.error('Error creating item');
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Inventory</h1>
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
        {items
          .filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item) => (
            <Col key={item.id}>
              <InventoryItem
                item={item}
                onUpdate={async (id) => {
                  // Update logic will be implemented here
                  toast.success(`Updated item #${id}`);
                }}
                onDelete={async (id) => {
                  try {
                    const response = await fetch(`/api/items.php?id=${id}`, {
                      method: 'DELETE',
                    });
                    
                    if (response.ok) {
                      toast.success('Item deleted successfully');
                      queryClient.invalidateQueries({ queryKey: ['items'] });
                    } else {
                      toast.error('Failed to delete item');
                    }
                  } catch (error) {
                    toast.error('Error deleting item');
                  }
                }}
              />
            </Col>
          ))}
      </Row>

      <CreateItemDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateItem}
      />
    </Container>
  );
};

export default Index;