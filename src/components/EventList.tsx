import React from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
}

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <span>{event.title} - {event.date}</span>
          <button onClick={() => onEdit(event)}>Редактировать</button>
          <button onClick={() => onDelete(event.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default EventList;