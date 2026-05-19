import { Droppable } from '@hello-pangea/dnd';
import { Ticket, Status, PRIORITY_ORDER } from '../types';
import { TicketCard } from './TicketCard';

interface Props {
  id: Status;
  label: string;
  tickets: Ticket[];
  onDelete: (id: string) => void;
  onEdit: (ticket: Ticket) => void;
}

export function Column({ id, label, tickets, onDelete, onEdit }: Props) {
  const sorted = [...tickets].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  );

  return (
    <div className="column">
      <div className="column__header">
        <h2 className="column__title">{label}</h2>
        <span className="column__count">{tickets.length}</span>
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={`column__body ${snapshot.isDraggingOver ? 'column__body--over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sorted.map((ticket, index) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                index={index}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
            {provided.placeholder}
            {tickets.length === 0 && !snapshot.isDraggingOver && (
              <div className="column__empty">No tickets</div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
