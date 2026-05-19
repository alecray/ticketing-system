import { useState } from 'react';
import { Header } from './components/Header';
import { Board } from './components/Board';
import { TicketModal } from './components/AddTicketModal';
import { useTickets } from './hooks/useTickets';
import { Ticket } from './types';

export default function App() {
  const { tickets, addTicket, updateTicket, updateStatus, deleteTicket, replaceAll } = useTickets();
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  function handleImport(imported: Ticket[]) {
    if (window.confirm(`Import ${imported.length} tickets? This will replace all current tickets.`)) {
      replaceAll(imported);
    }
  }

  return (
    <div className="app">
      <Header
        tickets={tickets}
        onAddClick={() => setShowAddModal(true)}
        onImport={handleImport}
      />
      <main className="main">
        <Board
          tickets={tickets}
          onStatusChange={updateStatus}
          onDelete={deleteTicket}
          onEdit={setEditingTicket}
        />
      </main>
      {showAddModal && (
        <TicketModal
          onSave={addTicket}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {editingTicket && (
        <TicketModal
          ticket={editingTicket}
          onSave={(data) => updateTicket(editingTicket.id, data)}
          onClose={() => setEditingTicket(null)}
        />
      )}
    </div>
  );
}
