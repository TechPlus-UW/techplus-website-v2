'use client';

import React, { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Navbar from '@/components/navigation/Navbar';

// Dummy event data
const dummyEvents = [
  {
    id: '1',
    title: 'Tech+ Workshop: Resume Building',
    start: new Date().toISOString().split('T')[0] + 'T10:00:00',
    end: new Date().toISOString().split('T')[0] + 'T12:00:00',
    backgroundColor: '#76a36d',
  },
  {
    id: '2',
    title: 'Mentorship Program Kickoff',
    start: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0] + 'T14:00:00',
    end: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0] + 'T16:00:00',
    backgroundColor: '#76a36d',
  },
  {
    id: '3',
    title: 'Coffee Chat Session',
    start: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0] + 'T15:00:00',
    end: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0] + 'T16:30:00',
    backgroundColor: '#76a36d',
  },
  {
    id: '4',
    title: 'Tech+ Social Event',
    start: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0] + 'T18:00:00',
    end: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0] + 'T20:00:00',
    backgroundColor: '#76a36d',
  },
];

export default function CalendarPage() {
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    // Load FullCalendar CSS dynamically
    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = 'https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.15/main.min.css';
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = 'https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@6.1.15/main.min.css';
    document.head.appendChild(link2);

    const link3 = document.createElement('link');
    link3.rel = 'stylesheet';
    link3.href = 'https://cdn.jsdelivr.net/npm/@fullcalendar/timegrid@6.1.15/main.min.css';
    document.head.appendChild(link3);

    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(link2);
      document.head.removeChild(link3);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="py-10 px-5" style={{ backgroundColor: '#050a1f', minHeight: '100vh' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="mb-8 text-4xl font-semibold text-white text-center">Events Calendar</h1>
          <div className="bg-white rounded-lg p-4">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={dummyEvents}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              height="auto"
              eventClick={(info) => {
                alert(`Event: ${info.event.title}\nStart: ${info.event.start?.toLocaleString()}`);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
