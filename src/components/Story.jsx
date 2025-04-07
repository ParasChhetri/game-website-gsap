import { useRef } from 'react';
import { AnimatedTitle } from './AnimatedTitle'
import gsap from 'gsap/all';
import { Button } from './Button';

export const Story = () => {
    const frameRef = useRef('null');
    const hnadelMouseLeave = () => {
        const element = frameRef.current;
        gsap.to(element, {
            duration: 0.3,
            rotateX: 0,
            rotateY: 0,
            ease: 'power1.inOut'
        });
    }
    const handelMouseMove = (event) => {
        const { clientX, clientY } = event;
        const element = frameRef.current;
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * - 10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
            duration: 0.3,
            rotateX, rotateY,
            transformPerspective: 500,
            ease: 'power1.inOut'
        })
    }
    return (
        <section className="min-h-dvh w-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
            <div className="flex size-full items-center flex-col py-10 pb-24">
                <p className="text-sm md:text-[10px] font-general uppercase">the multiversal ip world</p>
                <div className='relative size-full'>
                    <AnimatedTitle
                        title="t<b>h</b>e st<b>o</b>ry o<b>f</b> <br /> a hi<b>d</b>de<b>n</b> r<b>e</b>l<b>m</b>"
                        sectionId="#story"
                        containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 text-white"
                    />
                    <div className='story-img-container'>
                        <div className='story-img-mask '>
                            <div className='story-img-content '>
                                <img
                                    onMouseLeave={hnadelMouseLeave}
                                    onMouseEnter={hnadelMouseLeave}
                                    onMouseUp={hnadelMouseLeave}
                                    onMouseMove={handelMouseMove}
                                    ref={frameRef}
                                    src="/img/entrance.webp"
                                    alt="entrance"
                                    className='object-contain'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end'>
                    <div className='flex h-full w-fit flex-col items-center md:items-start'>
                        <p className='mt-3 max-w-sm text-justify font-circular-web '>Where relms coverage, lies zentary and the boundless pillar. Dicover the secrets and shape your fate with infine oppurtunities.</p>
                        <Button
                            id="realm-button"
                            title="discover prologue"
                            containerClass="mt-5"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
