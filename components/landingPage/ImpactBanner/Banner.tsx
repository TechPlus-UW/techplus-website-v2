'use client';

import React from 'react';
import BannerCard from './BannerCard';

const cards = [
  {
    containerClassname: 'col-span-6 row-span-4',
    count: '23',
    desc: 'Events',
    img: '/assets/images/impact/events.png',
    boxStyleClassname: 'w-[55%]',
  },
  {
    containerClassname: 'col-span-9 row-span-5 align-top',
    count: '500+',
    desc: 'First-years reached',
    img: '/assets/images/impact/first_year.png',
    boxStyleClassname: 'w-[35%]',
  },
  {
    containerClassname: 'col-span-6 row-span-4',
    count: '1800+',
    desc: 'Event Attendees',
    img: '/assets/images/impact/event_attend.png',
    boxStyleClassname: 'w-[55%]',
  },
  {
    containerClassname: 'col-span-5 row-span-6 flex flex-col justify-end',
    count: '573',
    desc: 'Mentorship Pairs',
    img: '/assets/images/impact/mentorship.png',
    boxStyleClassname: 'w-full',
  },
  {
    containerClassname: 'col-span-4 row-span-6 flex flex-col justify-end',
    count: '980',
    desc: 'Coffee Chat Pairings',
    img: '/assets/images/impact/coffee.png',
    boxStyleClassname: 'w-[70%]',
  },
  {
    containerClassname: 'col-span-6 row-span-3 flex flex-col justify-end',
    count: '1',
    desc: 'Community',
    img: '/assets/images/impact/community.png',
    boxStyleClassname: 'w-[60%]',
  },
];

export default function Banner() {
  return (
    <div
      className="
        p-[5%]
        grid
        grid-cols-[repeat(15,1fr)]
        grid-rows-[repeat(11,12%)]
        gap-[20px]
        h-[700px]
      "
    >
      {cards.map((card, index) => (
        <div key={index} className={card.containerClassname} h-full="true">
          <BannerCard
            count={card.count}
            desc={card.desc}
            img={card.img}
            boxStyleClassname={card.boxStyleClassname}
          />
        </div>
      ))}
    </div>
  );
}
