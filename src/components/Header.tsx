import { useRef } from 'react';
import { Ticket } from '../types';
import { exportTickets, importTickets } from '../utils/storage';

interface Props {
  tickets: Ticket[];
  onAddClick: () => void;
  onImport: (tickets: Ticket[]) => void;
}

export function Header({ tickets, onAddClick, onImport }: Props) {
  const importRef = useRef<HTMLInputElement>(null);

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importTickets(file);
      onImport(imported);
    } catch {
      alert('Could not import file. Make sure it is a valid tickets JSON export.');
    }
    e.target.value = '';
  }

  return (
    <header className="header">
      <div className="header__brand">
        <svg className="header__logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="#6366f1"/>
          <rect x="6" y="8" width="20" height="3" rx="1.5" fill="white"/>
          <rect x="6" y="14" width="14" height="3" rx="1.5" fill="white"/>
          <rect x="6" y="20" width="17" height="3" rx="1.5" fill="white"/>
        </svg>
        <span className="header__title">Ticketing System</span>
        <span className="header__version">v{__APP_VERSION__}</span>
      </div>
      <div className="header__actions">
        <input
          ref={importRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
        <button className="btn btn--ghost" onClick={() => importRef.current?.click()}>
          Import
        </button>
        <button className="btn btn--ghost" onClick={() => exportTickets(tickets)}>
          Export
        </button>
        <button className="btn btn--primary" onClick={onAddClick}>
          + New Ticket
        </button>
      </div>
    </header>
  );
}
