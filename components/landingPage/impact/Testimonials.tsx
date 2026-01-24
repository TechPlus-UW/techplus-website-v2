'use client';

import React from 'react';
import { Typography } from '@mui/material';
import Testimonial from '../Testimonial/Testimonial';

const testimonials = [
  {
    participantName: 'Rayan Roy',
    testimonial:
      '"I enjoyed learning more about transitioning into software development and data science. I enjoyed learning more about transitioning into software development and data science. They were really helpful in guiding me on what projects to do, how to approach side projects, as well as Cali culture."',
    picture: '/assets/images/people/Rayan.png',
  },
  {
    participantName: 'Alice Li',
    testimonial:
      '"My mentor was super supportive of navigating me through challenges during my first co-op, which influenced me a lot with setting my own goals. I also learned a lot about working and studying abroad, something I always dreamed of."',
    picture: '/assets/images/people/AliceL.png',
  },
  {
    participantName: 'Prithika Hariharan',
    testimonial:
      '"My mentor helped connect me to other upper years who were involved in different roles in the tech industry and this opened me up to new opportunities."',
    picture: '/assets/images/people/Prithika.png',
  },
  {
    participantName: 'Linna Luo',
    testimonial:
      '"My mentor helped me build confidence in my technical skills and navigate a balanced lifestyle."',
    picture: '/assets/images/people/Linna.png',
  },
  {
    participantName: 'Mapendo Ngilinga de Carvalho',
    testimonial: '"It\'s like having your own personal guide for your tech journey!"',
    picture: '/assets/images/people/mapendo.png',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#FFF0CB] mt-16">
      {/* “move it down” + match screenshot breathing room */}
      <div className="mx-auto max-w-6xl px-6 md:px-10 pt-20 md:pt-24 pb-16 md:pb-20">
        <Typography className="font-semibold text-[40px] md:text-[48px] leading-[1.15] md:leading-[72px] text-navy">
          Testimonials from our Participants
        </Typography>

        {/* Use CSS grid for screenshot-like placement */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
          {testimonials.map((participant, index) => {
            const isRightColumn = index % 2 === 1;
            const isLast = index === testimonials.length - 1;

            return (
              <div
                key={index}
                className={[
                  // stagger right column a bit like the screenshot
                  isRightColumn ? 'md:translate-y-6' : '',
                  // last one sits on the left column
                  isLast ? 'md:col-start-1' : '',
                ].join(' ')}
              >
                <Testimonial
                  participantName={participant.participantName}
                  testimonial={participant.testimonial}
                  picture={participant.picture}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
