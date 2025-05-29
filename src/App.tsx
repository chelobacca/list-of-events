import React, { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';


interface Event {
  id: number;
  title: string;
  date: string;
}

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleAddEvent = (event: { title: string; date: string }) => {
    const newEvent: Event = {
      id: Date.now(),
      title: event.title,
      date: event.date,
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleEditEvent = (event: { title: string; date: string }) => {
    if (editingEvent) {
      const updatedEvent: Event = {
        ...editingEvent,
        title: event.title,
        date: event.date,
      };
      setEvents((prevEvents) =>
        prevEvents.map((e) => (e.id === editingEvent.id ? updatedEvent : e))
      );
      setEditingEvent(null);
    }
  };

  const handleDeleteEvent = (id: number) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <div>
      <h1>Список мероприятий</h1>
      <EventForm onSubmit={editingEvent ? handleEditEvent : handleAddEvent} initialData={editingEvent} />
      <EventList events={events} onEdit={setEditingEvent} onDelete={handleDeleteEvent} />
    </div>
  );
};

export default App;