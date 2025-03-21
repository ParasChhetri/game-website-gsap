import { useState, useEffect, useRef } from "react";
import { Button } from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// for making a scroll trigger effet we have to import it at the top and also initialze it at the top of our component
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4; // presents total number of video avaliable
    const nextVideoRef = useRef(null);

    // now that we are getting next video using the handelMiniVideoClick() but when the last video comes our index number keeps on increasing. So when we react our last index we want our index should loop and react back to 1 index
    const upcommingVideoIndex = (currentIndex % totalVideos) + 1; // 0 % 4 = 0 + 1 = 1, 1 % 4 = 1 + 1 = 2

    // for getting next video when we click
    const handleMiniVideoClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcommingVideoIndex)
    }

    // to get the dymanic videos
    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    // for loading the video
    const handelVideoLoad = () => {
        setLoadedVideos(previousLoadedVideo => previousLoadedVideo + 1)
    }

    // when our video loads then we want to show loading animation
    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideos])

    // for animations realetd to video on the click
    useGSAP(() => {
        if (hasClicked) {
            gsap.set('#next-video', { visibility: 'visible' });
            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
                onStart: () => nextVideoRef.current.play(),
            })

            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power1.inOut'
            })
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true });

    // for making the video playing screen reactangle on the scroll
    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(8% 10%, 78% 3%, 83% 85%, 3% 96%)',
            borderRadius: '0 0 40% 10%',
        })
        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            }
        })
    })
    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">

            {/* this is for creating a loading three dots aniamtions */}
            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    {/* this is for creating three dots */}
                    <div className="three-body">
                        {/* this makes a dot */}
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}

            {/* for vedio  as the main frame which will be converted to reactangle on the scroll*/}
            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
                <div>
                    {/* mini video player */}
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div onClick={handleMiniVideoClick} className="origin-center scale-50 opacity-0 transition-all duration-700 ease-in hover:scale-100 hover:opacity-100">
                            <video
                                src={getVideoSrc(upcommingVideoIndex)}
                                ref={nextVideoRef}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handelVideoLoad}
                            />
                        </div>
                    </div>

                    {/* primary background video player */}
                    <video src={getVideoSrc(currentIndex)}
                        ref={nextVideoRef}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handelVideoLoad}
                    />

                    {/* Zoom effect video */}
                    <video
                        src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        autoPlay
                        loop
                        muted
                        className=" absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handelVideoLoad}
                    />
                </div>

                {/* for giving the text at the bottom in the corner */}
                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    G<b>a</b>ming
                </h1>

                {/* top bar with redefined heading*/}
                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>
                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Enter the Metagame Layer <br />Uleash the Play Economy</p>
                        {/* button imported from button component also pass the props */}
                        <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass="!bg-yellow-300 flex-center gap-1" />
                    </div>
                </div>
            </div>
            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                G<b>a</b>ming
            </h1>
        </div>
    );
}
