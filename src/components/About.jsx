import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// for staring the scroll trigger import it fist and then register it
import { ScrollTrigger } from "gsap/all";
import { AnimatedTitle } from "./AnimatedTitle";
gsap.registerPlugin(ScrollTrigger);

export const About = () => {
    // for animating the clip on scroll
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger : {
                trigger : '#clip',
                start : 'center center',
                end : '+=800 center',
                scrub : 0.5,
                pin: true,
                pinSpacing : true,
            }
        })
        clipAnimation.to('.mask-clip-path', {
            width : '100vw',
            height : '100vh',
            borderRadius : 0
        })
    });
    return (
        <div id="about" className="min-h-screen w-screen">
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
                <h2 className="font-general text-sm uppercase md:text-[18px]">Welcome to Game adventure</h2>

                <AnimatedTitle title="unc<b>o</b>ver the biggest <b>a</b>dventures <b>o</b>f the c<b>o</b>sm<b>o</b>s" containerClass="mt-5 !text-black text-center"/>
                <div className="about-subtext">
                    <p>The Game of Winter is comming to Life</p>
                    <p>Unite every player from countless games and platforms</p>
                </div>
            </div>
            {/* animated image that will take the full screen width on the scroll */}
            <div className="h-dvh w-screen" id="clip">
                <div className="mask-clip-path about-image">
                    <img src="img/about.webp" alt="background" 
                    className="absolute left-0 top-0 size-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};
