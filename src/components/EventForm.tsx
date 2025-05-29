import React, { useState, useEffect } from 'react';

interface EventFormProps {
  onSubmit: (event: { title: string; date: string }) => void;
  initialData: { title: string; date: string } | null;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [errors, setErrors] = useState<{ title?: string; date?: string }>({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDate(initialData.date);
    } else {
      setTitle('');
      setDate('');
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: { title?: string; date?: string } = {};
    if (!title) {
      newErrors.title = 'Поле названия обязательно для заполнения';
    }
    if (!date) {
      newErrors.date = 'Поле даты обязательно для заполнения';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({ title, date });
    setTitle('');
    setDate('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Название:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
      </div>
      <div>
        <label>
          Дата:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
      </div>
      <button type="submit">{initialData ? 'Сохранить' : 'Добавить'}</button>
    </form>
  );
};

export default EventForm;
