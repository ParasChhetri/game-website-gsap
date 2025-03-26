import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { TiLocationArrow } from "react-icons/ti";

// nav menu items are written here so that our code dosen't become messy
const navItems = ['Nexus', 'Vault', 'Prolouge', 'About', 'Contact'];

export const Navbar = () => {
    const navContainerRef = useRef(null);

    // for the audio 
    const audioElementRef = useRef(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(true);
    const [isIndicatorActive, setIsIndicatorActive] = useState(true);

    // for the music playing button 
    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    }

    useEffect(() => {
        if(isAudioPlaying) {
            audioElementRef.current.play();
        }
        else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying])

    return (
        <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
            <nav className="flex size-full items-center justify-between p-4">
                {/* left section */}
                <div className=" flex items-center gap-7">
                    <img src="/img/logo.png" alt="logo" className="w-10"/>
                    <Button 
                    id="product-button"
                    title="Products"
                    rightIcon={<TiLocationArrow />}
                    containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"/>
                </div>

                {/* right section */}
                <div className="flex h-full items-center">
                    <div className="hidden md:block">
                        {navItems.map((item) => (
                            <a key={item} 
                            href={`#${item.toLowerCase()}`}
                            className="nav-hover-btn">{item}
                            </a>
                        ))}
                    </div>
                   
                    {/* music playing button */}
                    <button className="ml-10 flex items-center space-x-0.5 cursor-pointer" onClick={toggleAudioIndicator}>
                        <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
                        {[1,2,3,4].map((bar) => (
                            <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} style={{animationDelay : `${bar * 0.1}s`}}/>
                        ))}
                    </button>
                </div>
            </nav>
            </header>
        </div>
    );
}
