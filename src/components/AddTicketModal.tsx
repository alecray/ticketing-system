import { useState, useEffect, useRef } from 'react';
import { Ticket, Priority, TicketType } from '../types';

interface TicketFormData {
  type: TicketType;
  title: string;
  description: string;
  priority: Priority;
}

interface Props {
  ticket?: Ticket;
  onSave: (data: TicketFormData) => void;
  onClose: () => void;
}

export function TicketModal({ ticket, onSave, onClose }: Props) {
  const isEditing = ticket !== undefined;
  const [type, setType] = useState<TicketType>(ticket?.type ?? 'task');
  const [title, setTitle] = useState(ticket?.title ?? '');
  const [description, setDescription] = useState(ticket?.description ?? '');
  const [priority, setPriority] = useState<Priority>(ticket?.priority ?? 'medium');
  const [error, setError] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    onSave({ type, title: title.trim(), description: description.trim(), priority });
    onClose();
  }

  return (
    <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal__header">
          <h2 className="modal__title">{isEditing ? 'Edit Ticket' : 'New Ticket'}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal__form">
          <div className="form-group">
            <label className="form-label">Type</label>
            <div className="type-toggle">
              <button
                type="button"
                className={`type-btn ${type === 'task' ? 'type-btn--active' : ''}`}
                onClick={() => setType('task')}
              >
                ✅ Task
              </button>
              <button
                type="button"
                className={`type-btn ${type === 'bug' ? 'type-btn--active type-btn--bug' : ''}`}
                onClick={() => setType('bug')}
              >
                🐛 Bug
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="ticket-title">Title *</label>
            <input
              id="ticket-title"
              ref={titleRef}
              className={`form-input ${error ? 'form-input--error' : ''}`}
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError(''); }}
              placeholder="What needs to be done?"
              maxLength={120}
            />
            {error && <span className="form-error">{error}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="ticket-description">Description</label>
            <textarea
              id="ticket-description"
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more detail (optional)"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="ticket-priority">Priority</label>
            <select
              id="ticket-priority"
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="modal__actions">
            <button type="button" className="btn btn--secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn--primary">
              {isEditing ? 'Save Changes' : 'Add Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
