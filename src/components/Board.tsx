import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Ticket, Status, COLUMNS } from '../types';
import { Column } from './Column';

interface Props {
  tickets: Ticket[];
  onStatusChange: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
  onEdit: (ticket: Ticket) => void;
}

export function Board({ tickets, onStatusChange, onDelete, onEdit }: Props) {
  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    const newStatus = result.destination.droppableId as Status;
    if (result.source.droppableId !== newStatus) {
      onStatusChange(result.draggableId, newStatus);
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            id={col.id}
            label={col.label}
            tickets={tickets.filter((t) => t.status === col.id)}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
