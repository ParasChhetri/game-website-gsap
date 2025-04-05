import { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

const BentoCard = ({ src, title, description, isComingSoon }) => {
    return (
        <div className="relative size-full">
            <video
                src={src}
                loop
                muted
                autoPlay
                className="absolute top-0 left-0 size-full object-center object-cover"
            />
            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                    <h1 className="bento-title special-font">{title}</h1>
                    {description && (
                        <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
                    )}
                </div>
            </div>

        </div>
    );
}

const BentoTilt = ({ children, className = '' }) => {
    const [transformStyle, setTransformStyle] = useState("");
    const refItem = useRef();
    const handelMouseMove = (event) => {
        if (!refItem.current) return;

        const { left, top, width, height } =
            refItem.current.getBoundingClientRect();

        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
        setTransformStyle(newTransform);
    }

    const handelMouseLeave = () => {
        setTransformStyle("");
    }
    return (
        <div className={className} ref={refItem} onMouseMove={handelMouseMove} onMouseLeave={handelMouseLeave} style={{ transform: transformStyle }}>
            {children}
        </div>
    );
}

export const Features = () => {
    return (
        <section className="bg-black pb-52">
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5 py-32">
                    <p className="font-circular-web text-lg text-blue-50">Into the Metagame Layer</p>
                    <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                        Immerse yourself in a rich and ever-expanding universe where a vibrant arry of products converge into an interconnected overlay experience on your world.
                    </p>
                </div>
                <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                    <BentoCard
                        src="videos/feature-1.mp4"
                        title={
                            <>radie<b>n</b>t</>
                        }
                        description="A cross platform app, turning your activity into rewarding adventure."
                        isComingSoon
                    />
                </BentoTilt>
                <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
                    <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                        <BentoCard
                            src="videos/feature-2.mp4"
                            title={<><b>Zigma</b></>}
                            description="An anime and games combined for your fun only."
                        />
                    </BentoTilt>
                    <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 ms:ms-0">
                        <BentoCard
                            src="videos/feature-3.mp4"
                            title={<><b>nexux</b></>}
                            description="A gaming solocal hub for players all arround the world."
                        />
                    </BentoTilt>
                    <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                        <BentoCard
                            src="videos/feature-4.mp4"
                            title={<><b>azul</b></>}
                            description="An AI agent to increase your fun, gameplay and productivity."
                        />
                    </BentoTilt>
                    <BentoTilt className="bento-tilt_2">
                        <div className="flex flex-col size-full justify-between bg-violet-300 p-5">
                            <h1 className="bento-title special-font max-w-64 text-center"><b>More Coming Soon!</b></h1>
                            <TiLocationArrow className="m-5 scale-[5] self-end" />
                        </div>
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_2">
                        <video
                            src="videos/hero-2.mp4"
                            loop
                            autoPlay
                            muted
                            className="size-full object-center object-cover"
                        />
                    </BentoTilt>
                </div>
            </div>
        </section>
    );
}
