import { Navbar } from './components/Navbar';
import OrdersSidebar from './components/OrdersSidebar';
import OrderDetailsModal from './components/OrderDetailsModal';
import HomePage from './pages/HomePage';
import './index.css';
import { useState } from 'react';

function App() {
  const [isOrdersSidebarOpen, setIsOrdersSidebarOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);

  const handleOrdersClick = () => {
    setIsOrdersSidebarOpen(true);
  };

  const handleOrderClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsOrderDetailsModalOpen(true);
    setIsOrdersSidebarOpen(false);
  };

  const handleOrderDetailsBack = () => {
    setIsOrderDetailsModalOpen(false);
    setSelectedOrderId(null);
    setIsOrdersSidebarOpen(true);
  };

  const handleOrderDetailsClose = () => {
    setIsOrderDetailsModalOpen(false);
    setSelectedOrderId(null);
  };

  // New function to handle order creation and open modal
  const handleOrderCreated = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsOrderDetailsModalOpen(true);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden">
      <Navbar onOrdersClick={handleOrdersClick} />

      {/* Main content */}
      <main className="flex-1 z-10 w-full">
        <HomePage showHero={!isOrderDetailsModalOpen} onOrderCreated={handleOrderCreated} />
      </main>

      {/* Orders Sidebar */}
      <OrdersSidebar
        isOpen={isOrdersSidebarOpen}
        onClose={() => setIsOrdersSidebarOpen(false)}
        onOrderClick={handleOrderClick}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        orderId={selectedOrderId}
        isOpen={isOrderDetailsModalOpen}
        onClose={handleOrderDetailsClose}
        onBack={handleOrderDetailsBack}
      />
    </div>
  );
}

export default App;
