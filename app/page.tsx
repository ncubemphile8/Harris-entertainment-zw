"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, Instagram, Menu, MessageCircle, Play, X } from "lucide-react";
import { useState } from "react";

const media = {
  "video": "https://d2ol7oe51mr4n9.cloudfront.net/user_3JlBxAyut4hiS7XHQife3mH61Ba/8e9c8bf8-0fc1-474a-9cc9-30a6725f2788.mp4",
  "logo": "https://2ccc54b4-b781-495c-ba1d-e3a8e2ed69e1.sandbox.floot.app/_cdn/static/a99a918f-450c-4158-a2a6-f5367b3f624e-harris-official-logo.png",
  "artist1": "https://2ccc54b4-b781-495c-ba1d-e3a8e2ed69e1.sandbox.floot.app/_cdn/static/87e4e4a0-b1df-4993-afe7-1808dcfe00b1-artist-stage-01.webp",
  "artist2": "https://2ccc54b4-b781-495c-ba1d-e3a8e2ed69e1.sandbox.floot.app/_cdn/static/d114d31f-af1e-479b-b313-3c5d427937fd-artist-stage-02.webp",
  "crowd1": "https://2ccc54b4-b781-495c-ba1d-e3a8e2ed69e1.sandbox.floot.app/_cdn/static/449f6945-1df2-422d-bbaa-2f0fabfbc249-crowd-01.webp",
  "crowd2": "https://2ccc54b4-b781-495c-ba1d-e3a8e2ed69e1.sandbox.floot.app/_cdn/static/2e732779-3b9f-41da-94bc-a22ab3ad0f4b-crowd-02.webp",
  "festival": "https://2ccc54b4-b781-495c-ba1d-e3a8e2ed69e1.sandbox.floot.app/_cdn/static/0414f087-6205-49eb-986d-6a940e4bc261-harris-music-festival.webp",
  "stance": "https://2ccc54b4-b781-495c-ba1d-e3a8e2ed69e1.sandbox.floot.app/_cdn/static/257e60ab-2076-4265-9be0-9e94d5752867-stance-nation.webp",
  "installation": "https://2ccc54b4-b781-495c-ba1d-e3a8e2ed69e1.sandbox.floot.app/_cdn/static/cf106865-e912-4fb2-a683-151bf6516ac4-harris-live-installation.webp"
};
const whatsapp = (message: string) => "https://wa.me/263772399483?text=" + encodeURIComponent(message);

const upcoming = [
  {title:"DJ MAPHORISA", meta:"UPCOMING · DETAILS TO BE ANNOUNCED", kind:"video", image:media.video},
  {title:"HARRIS MUSIC FESTIVAL", meta:"05 DEC 2026 · MUSIC FESTIVAL", kind:"image", image:media.festival},
  {title:"STANCE NATION", meta:"12 DEC 2026 · CAR CULTURE", kind:"image", image:media.stance}
];

export default function Home() {
  const [menuOpen,setMenuOpen] = useState(false);
  return <main className="home-v2">
    <div className="announcement"><span className="announcement-pulse"/> THE NEXT EXPERIENCE IS CLOSER THAN YOU THINK <Link href="/events">DISCOVER EVENTS <ArrowRight size={13}/></Link></div>
    <header className="site-header home-header">
      <Link className="real-brand" href="/" aria-label="Harris Entertainment home"><img src={media.logo} alt="Harris Entertainment official logo"/><span>HARRIS <b>ENTERTAINMENT</b></span></Link>
      <nav className={menuOpen ? "home-nav nav-open":"home-nav"}>
        <Link href="/">HOME</Link><Link href="/events">UPCOMING</Link><Link href="/calendar">CALENDAR</Link><Link href="/gallery">GALLERY</Link><Link href="/about">ABOUT</Link>
      </nav>
      <Link className="header-cta" href="/events">FIND YOUR EVENT <ArrowRight size={16}/></Link>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
    </header>
    <section className="hero hero-v2" id="home">
      <div className="hero-v2-media"><video className="hero-v2-video" autoPlay muted loop playsInline poster={media.artist1} preload="auto"><source src={media.video} type="video/mp4"/></video><div className="hero-v2-shade"/></div>
      <div className="hero-v2-orbit orbit-a"/><div className="hero-v2-orbit orbit-b"/>
      <div className="hero-v2-content">
        <motion.div className="hero-kicker" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.6}}><span className="live-dot"/> ZIMBABWE · FEEL THE MOMENT</motion.div>
        <motion.h1 initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.08}}>WE MAKE<br/><span>THE MOMENT.</span></motion.h1>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.65,delay:.18}}>Unforgettable nights. Electric crowds. Experiences that stay with you.</motion.p>
        <motion.div className="hero-actions" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.65,delay:.25}}>
          <Link className="button button-primary" href="/events">EXPLORE EVENTS <ArrowDownRight size={18}/></Link>
          <Link className="button button-ghost" href="/gallery"><Play size={14} fill="currentColor"/> FEEL THE ENERGY</Link>
        </motion.div>
      </div>
      <div className="hero-v2-bottom"><span>LIVE CULTURE / LIVE MUSIC / LIVE MOMENTS</span><Link href="/gallery">ENTER THE GALLERY <ArrowRight size={13}/></Link><span>HARRIS ENTERTAINMENT · ZW</span></div>
      <div className="hero-v2-sound"><span className="sound-bars"><i/><i/><i/><i/></span> SOUND OFF · IMMERSIVE VIDEO</div>
    </section>
    <section className="artist-ribbon">
      <div className="artist-ribbon-head"><div><span className="eyebrow">THE PEOPLE. THE SOUND. THE MOMENT.</span><h2>BUILT FOR<br/><span>THE CROWD.</span></h2></div><p>From the stage to the last row, our nights are made to be felt—not just seen.</p></div>
      <div className="artist-mosaic">
        <Link href="/gallery" className="mosaic-main"><img src={media.artist1} alt="Artist performing live on stage"/><span>ON STAGE <ArrowRight size={14}/></span></Link>
        <Link href="/gallery" className="mosaic-tall"><img src={media.artist2} alt="Live artist performance"/><span>LIVE PERFORMANCE</span></Link>
        <Link href="/gallery" className="mosaic-crowd"><img src={media.crowd2} alt="Audience enjoying a Harris event"/><span>THE ENERGY</span></Link>
        <Link href="/gallery" className="mosaic-install"><img src={media.installation} alt="Harris Music Festival stage visuals"/><span>THE PRODUCTION</span></Link>
      </div>
    </section>
    <section className="home-upcoming">
      <div className="home-upcoming-head"><div><span className="eyebrow">SAVE YOUR SPOT</span><h2>WHAT'S<br/><span>COMING UP.</span></h2></div><Link className="text-link" href="/events">ALL UPCOMING EVENTS <ArrowRight size={15}/></Link></div>
      <div className="home-event-grid">{upcoming.map((e,i)=><Link href="/events" className={i===0?"home-event home-event-featured":"home-event"} key={e.title}>
        <div className="home-event-art">{e.kind==="video"?<video src={e.image} autoPlay muted loop playsInline poster={media.artist1}/>:<img src={e.image} alt={e.title}/>}<span className="home-event-index">0{i+1}</span><span className="home-event-arrow"><ArrowRight size={17}/></span></div>
        <div className="home-event-meta">{e.meta}</div><h3>{e.title}</h3>
      </Link>)}</div>
    </section>
    <section className="home-last-call"><video src={media.video} autoPlay muted loop playsInline poster={media.crowd1}/><div className="home-last-shade"/><div className="home-last-copy"><span className="eyebrow">THE NEXT NIGHT OUT IS YOURS</span><h2>MAKE IT<br/><span>MEMORABLE.</span></h2><Link className="button button-primary" href="/events">DISCOVER WHAT'S NEXT <ArrowRight size={15}/></Link></div></section>
    <footer className="site-footer home-footer"><div className="footer-main"><Link className="real-brand footer-real-brand" href="/"><img src={media.logo} alt="Harris Entertainment official logo"/><span>HARRIS <b>ENTERTAINMENT</b></span></Link><p>Creating moments that move people.<br/>Bulawayo, Zimbabwe.</p><div className="footer-social"><a href="https://www.instagram.com/Harris_entertainment_zw/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href={whatsapp("Hi Harris Entertainment!")} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a></div></div><div className="footer-bottom"><span>© 2026 HARRIS ENTERTAINMENT</span><span>DESIGNED BY <b>VANILLAWEBZ</b></span><Link href="/about">ABOUT HARRIS ↗</Link></div></footer>
    <a className="whatsapp-float" href={whatsapp("Hi Harris Entertainment, I'd like to make an enquiry.")} target="_blank" rel="noreferrer" aria-label="Chat with Harris Entertainment on WhatsApp"><MessageCircle size={22}/><span>CHAT WITH US</span></a>
  </main>;
}
