'use client';

import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Navbar from '@/components/navigation/Navbar';

const dummyEvents = [
  {
    id: '1',
    title: 'Tech+ Workshop: Resume Building',
    start: new Date().toISOString().split('T')[0] + 'T10:00:00',
    end: new Date().toISOString().split('T')[0] + 'T12:00:00',
    backgroundColor: '#76a36d',
    borderColor: '#5e8a56',
  },
  {
    id: '2',
    title: 'Mentorship Program Kickoff',
    start: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0] + 'T14:00:00',
    end: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0] + 'T16:00:00',
    backgroundColor: '#4e7a8a',
    borderColor: '#3d6270',
  },
  {
    id: '3',
    title: 'Coffee Chat Session',
    start: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0] + 'T15:00:00',
    end: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0] + 'T16:30:00',
    backgroundColor: '#76a36d',
    borderColor: '#5e8a56',
  },
  {
    id: '4',
    title: 'Tech+ Social Event',
    start: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0] + 'T18:00:00',
    end: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0] + 'T20:00:00',
    backgroundColor: '#a37a6d',
    borderColor: '#8a6256',
  },
];

const upcomingEvents = dummyEvents
  .map(e => ({ ...e, startDate: new Date(e.start) }))
  .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

const eventIcons: Record<string, string> = {
  '1': '📋',
  '2': '🚀',
  '3': '☕',
  '4': '🎉',
};

export default function CalendarPage() {
  const calendarRef = useRef<FullCalendar>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const links = [
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Outfit:wght@300;400;500;600&display=swap',
      'https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.15/main.min.css',
      'https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@6.1.15/main.min.css',
      'https://cdn.jsdelivr.net/npm/@fullcalendar/timegrid@6.1.15/main.min.css',
    ].map(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
      return link;
    });

    return () => links.forEach(l => document.head.removeChild(l));
  }, []);

  return (
    <>
      <style>{`
        .cal-page * { font-family: 'Outfit', sans-serif; }

        /* Background */
        .cal-bg {
          background: #050a1f;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        .cal-bg::before {
          content: '';
          position: fixed;
          top: -20%;
          left: -10%;
          width: 55vw;
          height: 55vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(118,163,109,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .cal-bg::after {
          content: '';
          position: fixed;
          bottom: -15%;
          right: -10%;
          width: 50vw;
          height: 50vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(78,122,138,0.07) 0%, transparent 65%);
          pointer-events: none;
        }
        .cal-dot-grid {
          position: fixed;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* Header */
        .cal-header {
          opacity: 0;
          transform: translateY(16px);
          animation: fadeUp 0.6s ease forwards;
        }
        .cal-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          letter-spacing: 0.02em;
          line-height: 1;
        }
        .cal-accent-line {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, #76a36d, transparent);
          border-radius: 2px;
        }

        /* Calendar card */
        .cal-card {
          background: rgba(255,255,255,0.032);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 28px;
          box-shadow:
            0 0 0 1px rgba(118,163,109,0.06),
            0 32px 64px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.05);
          opacity: 0;
          animation: fadeUp 0.6s ease 0.15s forwards;
        }

        /* FullCalendar overrides */
        .cal-card .fc {
          --fc-border-color: rgba(255,255,255,0.06);
          --fc-page-bg-color: transparent;
          --fc-neutral-bg-color: transparent;
          --fc-list-event-hover-bg-color: rgba(118,163,109,0.1);
          --fc-today-bg-color: rgba(118,163,109,0.08);
          --fc-event-border-color: transparent;
        }
        .cal-card .fc-theme-standard td,
        .cal-card .fc-theme-standard th,
        .cal-card .fc-theme-standard .fc-scrollgrid {
          border-color: rgba(255,255,255,0.06);
        }
        .cal-card .fc-col-header-cell {
          padding: 12px 0;
          background: rgba(255,255,255,0.02);
        }
        .cal-card .fc-col-header-cell-cushion {
          color: #76a36d;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
        }
        .cal-card .fc-daygrid-day-number {
          color: rgba(255,255,255,0.5);
          font-size: 13px;
          font-weight: 400;
          text-decoration: none;
          padding: 6px 10px;
          transition: color 0.2s;
        }
        .cal-card .fc-daygrid-day:hover .fc-daygrid-day-number {
          color: rgba(255,255,255,0.9);
        }
        .cal-card .fc-day-today .fc-daygrid-day-number {
          color: #fff;
          background: #76a36d;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 4px;
          padding: 0;
          font-weight: 600;
        }
        .cal-card .fc-toolbar-title {
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 400;
          letter-spacing: 0.01em;
        }
        .cal-card .fc-button {
          background: rgba(255,255,255,0.06) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: rgba(255,255,255,0.7) !important;
          border-radius: 8px !important;
          font-size: 12px !important;
          font-weight: 500 !important;
          letter-spacing: 0.04em !important;
          padding: 6px 14px !important;
          text-transform: uppercase !important;
          transition: all 0.2s !important;
          box-shadow: none !important;
        }
        .cal-card .fc-button:hover {
          background: rgba(118,163,109,0.15) !important;
          border-color: rgba(118,163,109,0.4) !important;
          color: #fff !important;
        }
        .cal-card .fc-button-active,
        .cal-card .fc-button:focus {
          background: rgba(118,163,109,0.2) !important;
          border-color: rgba(118,163,109,0.5) !important;
          color: #fff !important;
          outline: none !important;
          box-shadow: none !important;
        }
        .cal-card .fc-button-primary:not(:disabled):active {
          background: rgba(118,163,109,0.25) !important;
          border-color: rgba(118,163,109,0.6) !important;
        }
        .cal-card .fc-daygrid-day-frame {
          min-height: 80px;
        }
        .cal-card .fc-event {
          border-radius: 5px !important;
          padding: 1px 6px !important;
          font-size: 11.5px !important;
          font-weight: 500 !important;
          letter-spacing: 0.01em !important;
          border: none !important;
          cursor: pointer;
          transition: filter 0.2s, transform 0.15s !important;
        }
        .cal-card .fc-event:hover {
          filter: brightness(1.15);
          transform: translateY(-1px);
        }
        .cal-card .fc-event-title {
          font-weight: 500;
          color: #fff !important;
        }
        .cal-card .fc-event-time {
          color: rgba(255,255,255,0.85) !important;
        }
        .cal-card .fc-scrollgrid {
          border-radius: 12px;
          overflow: hidden;
        }
        .cal-card .fc-daygrid-day.fc-day-other .fc-daygrid-day-number {
          color: rgba(255,255,255,0.18);
        }
        .cal-card .fc-toolbar.fc-header-toolbar {
          margin-bottom: 20px;
        }
        .cal-card .fc-prev-button .fc-icon,
        .cal-card .fc-next-button .fc-icon {
          font-size: 14px;
        }

        /* Upcoming events sidebar */
        .upcoming-card {
          background: rgba(255,255,255,0.032);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 24px 48px rgba(0,0,0,0.4);
          opacity: 0;
          animation: fadeUp 0.6s ease 0.25s forwards;
        }
        .upcoming-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #76a36d;
          margin-bottom: 18px;
        }
        .event-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: opacity 0.2s;
        }
        .event-item:last-child { border-bottom: none; }
        .event-item:hover { opacity: 0.85; }
        .event-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 5px;
          flex-shrink: 0;
        }
        .event-name {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          line-height: 1.3;
          margin-bottom: 3px;
        }
        .event-date {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.02em;
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="cal-page">
        <Navbar />
        <div className="cal-bg">
          <div className="cal-dot-grid" />
          <div style={{ position: 'relative', zIndex: 1, padding: '40px 24px 60px', maxWidth: '1400px', margin: '0 auto' }}>

            {/* Page Header */}
            <div className="cal-header" style={{ marginBottom: '36px' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#76a36d', marginBottom: '10px' }}>
                Tech+ Portal
              </p>
              <h1 className="cal-title" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', color: '#ffffff', marginBottom: '14px' }}>
                Events Calendar
              </h1>
              <div className="cal-accent-line" />
              <p style={{ marginTop: '12px', fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
                Stay up to date with workshops, meetups, and community events.
              </p>
            </div>

            {/* Main layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', alignItems: 'start' }}>

              {/* Calendar */}
              <div className="cal-card">
                {mounted && (
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
                      const start = info.event.start?.toLocaleString('en-US', {
                        weekday: 'long', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      });
                      alert(`${info.event.title}\n${start}`);
                    }}
                  />
                )}
              </div>

              {/* Upcoming Events Sidebar */}
              <div className="upcoming-card">
                <p className="upcoming-label">Upcoming Events</p>
                {upcomingEvents.map(event => (
                  <div className="event-item" key={event.id}>
                    <div className="event-dot" style={{ backgroundColor: event.backgroundColor }} />
                    <div>
                      <p className="event-name">
                        {event.title}
                      </p>
                      <p className="event-date">
                        {event.startDate.toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric',
                        })} · {event.startDate.toLocaleTimeString('en-US', {
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Stats strip */}
                <div style={{
                  marginTop: '24px',
                  padding: '16px',
                  background: 'rgba(118,163,109,0.06)',
                  borderRadius: '10px',
                  border: '1px solid rgba(118,163,109,0.12)',
                }}>
                  <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '10px' }}>
                    This Month
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '22px', fontFamily: 'Cormorant Garamond, serif', color: '#76a36d', lineHeight: 1 }}>4</p>
                      <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>Events</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '22px', fontFamily: 'Cormorant Garamond, serif', color: '#4e7a8a', lineHeight: 1 }}>2</p>
                      <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>Workshops</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '22px', fontFamily: 'Cormorant Garamond, serif', color: '#a37a6d', lineHeight: 1 }}>1</p>
                      <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>Social</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
