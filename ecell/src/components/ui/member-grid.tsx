import React from 'react';
import { Button } from './button';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Linkedin, Instagram } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

export interface Member {
    name: string;
    role: string;
    image?: string;
    linkedin?: string;
    instagram?: string;
}

interface MemberGridProps {
    members: Member[];
}

export function MemberGrid({ members }: MemberGridProps) {
    return (
        <div
            role="list"
            aria-label="Team members"
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6"
        >
            {members.map((member, index) => (
                <HoverCard key={index} openDelay={150}>
                    {/* Chip trigger */}
                    <HoverCardTrigger
                        className={[
                            "grid cursor-pointer grid-cols-[auto_1fr] items-center gap-3",
                            "rounded-xl border bg-black p-3 shadow-sm ring-1 ring-white/10",
                            "transition-all hover:bg-neutral-900 focus:outline-none hover:border-green-500/50",
                            "data-[state=open]:ring-2 data-[state=open]:ring-green-500/20 data-[state=open]:border-green-500/50",
                        ].join(" ")}
                    >
                        <Avatar className="size-10 border border-green-500/20 shadow">
                            <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                            <AvatarFallback className="text-sm bg-neutral-900 text-green-500">
                                {member.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <span className="text-white block truncate text-[15px] font-semibold">
                            {member.name}
                        </span>
                    </HoverCardTrigger>

                    {/* Popover card */}
                    <HoverCardContent
                        align="start"
                        sideOffset={8}
                        className={[
                            "w-80 rounded-xl p-4",
                            "border border-green-500/20 bg-neutral-950 shadow-xl shadow-green-900/10 ring-1 ring-white/5",
                        ].join(" ")}
                    >
                        <div className="space-y-3">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-12 border border-green-500/30">
                                        <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                        <AvatarFallback className="bg-neutral-900 text-green-500">
                                            {member.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <div className="text-white truncate text-sm font-semibold sm:text-base">
                                            {member.name}
                                        </div>
                                        <div className="text-green-500 truncate text-xs sm:text-sm">
                                            {member.role}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    asChild
                                    className="h-8 w-8 rounded-full border-white/10 bg-white/5 hover:bg-green-600 hover:text-white hover:border-green-500 transition-colors"
                                >
                                    <a href={member.linkedin || "#"} target="_blank" rel="noopener noreferrer">
                                        <Linkedin className="size-4" />
                                    </a>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    asChild
                                    className="h-8 w-8 rounded-full border-white/10 bg-white/5 hover:bg-pink-600 hover:text-white hover:border-pink-500 transition-colors"
                                >
                                    <a href={member.instagram || "#"} target="_blank" rel="noopener noreferrer">
                                        <Instagram className="size-4" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            ))}
        </div>
    );
}
