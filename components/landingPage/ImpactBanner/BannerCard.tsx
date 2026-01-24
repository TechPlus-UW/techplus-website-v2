'use client';

import React from 'react';
import { Card, CardMedia, Typography } from '@mui/material';

interface BannerCardProps {
  count: string;
  desc: string;
  img: string;
  boxStyleClassname: string; // controls left panel width (55%, 35%, etc)
}

export default function BannerCard({ count, desc, img, boxStyleClassname }: BannerCardProps) {
  return (
    <Card className="flex rounded-none m-[10px] mb-0 h-full">
      {/* LEFT NAVY PANEL */}
      <div className={`${boxStyleClassname} bg-[#050b2a] text-white flex flex-col justify-end`}>
        <div className="border-l border-white m-[10%] pl-[10%] mb-[5%]">
          <div
            className="
              font-[600]
              text-[3vw]
              leading-normal
              text-white
            "
          >
            {count}
          </div>
          <div
            className="
              font-[600]
              text-[1.5vw]
              leading-normal
              text-white
            "
          >
            {desc}
          </div>
        </div>
      </div>
      {/* RIGHT IMAGE */}
      <CardMedia
        image={img}
        className="w-full"
        sx={{
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Card>
  );
}
