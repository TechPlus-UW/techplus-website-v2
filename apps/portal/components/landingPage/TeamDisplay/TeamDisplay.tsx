'use client';

import React from 'react';

interface Member {
  name: string;
  role: string;
  linkedin: string;
}

interface TeamGroup {
  teamName: string;
  members: Member[];
}

interface TeamDisplayProps {
  teams: TeamGroup[];
}

export default function TeamDisplay({ teams }: TeamDisplayProps) {
  return (
    <div>
      {teams.map((team) => (
        <div key={team.teamName} className="mb-14">

          {/* Team header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="w-1 h-6 rounded bg-[#76A36D]" />
            <h2 className="text-white font-bold uppercase tracking-widest text-sm">
              {team.teamName}
            </h2>
            <span className="text-xs text-[#93C18B] border border-[#76A36D]/30 rounded-full px-3 py-0.5">
              {team.members.length} members
            </span>
          </div>

          {/* Members */}
          <div className="flex flex-wrap gap-4">
            {team.members.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl w-36 border border-white/10 bg-white/5 hover:bg-[#76A36D]/10 hover:border-[#76A36D]/30 transition-all duration-200 hover:-translate-y-1"
              >
                {/* Empty circle */}
                <div className="w-20 h-20 rounded-full border-2 border-[#76A36D]/50 bg-white/5" />

                <p className="text-white font-semibold text-sm text-center leading-tight">
                  {member.name}
                </p>
                <p className="text-[#93C18B] text-xs text-center">
                  {member.role}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  className="text-xs text-[#93C18B] border border-[#76A36D]/30 rounded-full px-3 py-1 hover:bg-[#76A36D]/20 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
