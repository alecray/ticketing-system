import { Draggable } from '@hello-pangea/dnd';
import { Ticket } from '../types';

interface Props {
  ticket: Ticket;
  index: number;
  onDelete: (id: string) => void;
  onEdit: (ticket: Ticket) => void;
}

const PRIORITY_CLASS: Record<string, string> = {
  critical: 'priority-critical',
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low',
};

const PRIORITY_LABEL: Record<string, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export function TicketCard({ ticket, index, onDelete, onEdit }: Props) {
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`ticket-card ${snapshot.isDragging ? 'ticket-card--dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onEdit(ticket)}
        >
          <div className="ticket-card__header">
            <div className="ticket-card__badges">
              <span className={`badge badge--type badge--${ticket.type}`}>
                {ticket.type === 'bug' ? '🐛 Bug' : '✅ Task'}
              </span>
              <span className={`badge badge--priority ${PRIORITY_CLASS[ticket.priority]}`}>
                {PRIORITY_LABEL[ticket.priority]}
              </span>
            </div>
            <button
              className="ticket-card__delete"
              onClick={(e) => { e.stopPropagation(); if (window.confirm(`Delete "${ticket.title}"?`)) onDelete(ticket.id); }}
              title="Delete ticket"
              aria-label="Delete ticket"
            >
              ×
            </button>
          </div>
          <h3 className="ticket-card__title">{ticket.title}</h3>
          {ticket.description && (
            <p className="ticket-card__description">{ticket.description}</p>
          )}
          <div className="ticket-card__footer">
            <span className="ticket-card__date">
              {new Date(ticket.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
}
