import { useState, useCallback } from 'react';
import { Ticket, Priority, Status, TicketType } from '../types';
import { loadTickets, saveTickets } from '../utils/storage';

function generateId(): string {
  return `ticket-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>(loadTickets);

  const persist = useCallback((next: Ticket[]) => {
    setTickets(next);
    saveTickets(next);
  }, []);

  const addTicket = useCallback(
    (data: { type: TicketType; title: string; description: string; priority: Priority }) => {
      const ticket: Ticket = {
        id: generateId(),
        ...data,
        status: 'todo',
        createdAt: new Date().toISOString(),
      };
      persist([...tickets, ticket]);
    },
    [tickets, persist]
  );

  const updateStatus = useCallback(
    (id: string, status: Status) => {
      persist(tickets.map((t) => (t.id === id ? { ...t, status } : t)));
    },
    [tickets, persist]
  );

  const deleteTicket = useCallback(
    (id: string) => {
      persist(tickets.filter((t) => t.id !== id));
    },
    [tickets, persist]
  );

  const updateTicket = useCallback(
    (id: string, data: { type: TicketType; title: string; description: string; priority: Priority }) => {
      persist(tickets.map((t) => (t.id === id ? { ...t, ...data } : t)));
    },
    [tickets, persist]
  );

  const replaceAll = useCallback(
    (next: Ticket[]) => {
      persist(next);
    },
    [persist]
  );

  return { tickets, addTicket, updateTicket, updateStatus, deleteTicket, replaceAll };
}
