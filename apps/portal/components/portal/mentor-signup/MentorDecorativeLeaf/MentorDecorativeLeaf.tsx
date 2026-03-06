import Image from 'next/image';

const leftLeafPath = "/assets/images/left-leaf-portal.svg";
const rightLeafPath = "/assets/images/right-leaf-portal.svg";

export default function MentorDecorativeLeaf() {
    return (
        <div>
        {/* LEFT LEAVES */}
            <div className="absolute top-[30vh] left-0">
                <Image
                    src={leftLeafPath}
                    alt="decorative leaf"
                    width={456}
                    height={554}
                    className="h-[50vh] w-auto opacity-30 pointer-events-none"
                    unoptimized
                />
                <Image
                    src={leftLeafPath}
                    alt="decorative leaf"
                    width={456}
                    height={554}
                    className="h-[50vh] w-auto mt-[30vh] opacity-30 pointer-events-none"
                    unoptimized
                />
            </div>
    
            {/* RIGHT LEAVES */}
            <div className="absolute top-0 right-0 -mt-[15vh]">
                <Image
                    src={rightLeafPath}
                    alt="decorative leaf"
                    width={451}
                    height={615}
                    className="h-[50vh] w-auto opacity-30 pointer-events-none"
                    unoptimized
                />
                <Image
                    src={rightLeafPath}
                    alt="decorative leaf"
                    width={451}
                    height={615}
                    className="h-[50vh] w-auto mt-[40vh] opacity-30 pointer-events-none"
                    unoptimized
                />
            </div>
        </div>
    )
}