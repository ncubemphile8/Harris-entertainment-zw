"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown, ArrowDownRight, ArrowRight, CalendarDays, Check, ChevronLeft,
  ChevronRight, Clock3, Instagram, MapPin, Menu, Music2, Play, Ticket,
  X, MessageCircle, Sparkles, ExternalLink
} from "lucide-react";

type EventItem = {
  id: string; title: string; label: string; dateLabel: string; date?: string;
  venue: string; category: string; description: string; image: string;
  tickets?: { name: string; price: number }[]; status: "upcoming" | "past";
};

const events: EventItem[] = [
  {
    id: "maporisa", title: "DJ MAPHORISA", label: "UPCOMING EVENT",
    dateLabel: "COMING SOON", venue: "Details to be announced", category: "LIVE MUSIC",
    description: "A major night is on the horizon. Stay close for official event details and ticket announcements.",
    image: "/media/dj-maphorisa-red-car.mp4", status: "upcoming"
  },
  {
    id: "harris-festival", title: "HARRIS MUSIC FESTIVAL", label: "THE BIG ONE",
    dateLabel: "05 DEC 2026", date: "2026-12-05", venue: "Venue to be announced",
    category: "MUSIC FESTIVAL",
    description: "One stage. Big energy. A day made for music, connection and unforgettable memories.",
    image: "/media/harris-music-festival.jpg",
    tickets: [{ name: "General Admission", price: 15 }, { name: "VIP", price: 40 }, { name: "VVIP", price: 60 }],
    status: "upcoming"
  },
  {
    id: "stance-nation", title: "STANCE NATION", label: "CITY OF KINGS & QUEENS",
    dateLabel: "12 DEC 2026", date: "2026-12-12", venue: "B.A.C. — full venue details to be confirmed",
    category: "CAR CULTURE",
    description: "City of Kings and Queens Edition. More event information and ticket details coming soon.",
    image: "/media/stance-nation.jpg", status: "upcoming"
  },
];

const gallery = [
  { title: "Artist moments", type: "image", src: "/media/artist-stage-01.jpg", className: "", tag: "ARTISTS" },
  { title: "Live energy", type: "video", src: "/media/hero-event.mp4", className: "gallery-tall", tag: "LIVE" },
  { title: "The crowd", type: "image", src: "/media/gallery-01.jpg", className: "", tag: "CROWD" },
  { title: "On stage", type: "image", src: "/media/gallery-02.jpg", className: "gallery-wide", tag: "STAGE" },
  { title: "After dark", type: "image", src: "/media/gallery-03.jpg", className: "", tag: "NIGHTS" },
];

const whatsappNumber = "263772399483";
const whatsappUrl = (message: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

function EventArtwork({ event, hero = false }: { event: EventItem; hero?: boolean }) {
  const isVideo = event.image.endsWith(".mp4");
  return (
    <div className={`event-artwork ${hero ? "event-artwork-hero" : ""}`}>
      {isVideo ? (
        <video className="artwork-media" src={event.image} autoPlay muted loop playsInline poster="/media/dj-maphorisa-poster.jpg" />
      ) : (
        <div className="artwork-placeholder" style={{ backgroundImage: `linear-gradient(145deg, rgba(7,8,10,.1), rgba(7,8,10,.78)), url('${event.image}')` }} />
      )}
      <div className="artwork-grain" />
      <div className="artwork-glow" />
      <span className="artwork-tag"><span className="live-dot" />{event.label}</span>
      {hero && <div className="artwork-watermark">HE<span>.</span></div>}
    </div>
  );
}

function CalendarPanel({ onSelect }: { onSelect: (event: EventItem) => void }) {
  const [month, setMonth] = useState(new Date(2026, 10, 1));
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const days = new Date(year, monthIndex + 1, 0).getDate();
  const eventMap = useMemo(() => {
    const map = new Map<number, EventItem[]>();
    events.filter(e => e.date && e.status === "upcoming").forEach(e => {
      const d = new Date(`${e.date}T12:00:00`);
      if (d.getFullYear() === year && d.getMonth() === monthIndex) {
        map.set(d.getDate(), [...(map.get(d.getDate()) || []), e]);
      }
    });
    return map;
  }, [year, monthIndex]);
  return (
    <div className="calendar-shell">
      <div className="calendar-top">
        <div><span className="eyebrow">SAVE THE DATE</span><h3>{month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h3></div>
        <div className="calendar-controls">
          <button aria-label="Previous month" onClick={() => setMonth(new Date(year, monthIndex - 1, 1))}><ChevronLeft size={18}/></button>
          <button aria-label="Next month" onClick={() => setMonth(new Date(year, monthIndex + 1, 1))}><ChevronRight size={18}/></button>
        </div>
      </div>
      <div className="calendar-grid">
        {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(d => <div key={d} className="calendar-weekday">{d}</div>)}
        {Array.from({ length: firstDay }, (_, i) => <div key={`empty-${i}`} className="calendar-day empty" />)}
        {Array.from({ length: days }, (_, i) => {
          const day = i + 1;
          const dayEvents = eventMap.get(day) || [];
          return <button key={day} className={`calendar-day ${dayEvents.length ? "has-event" : ""}`} onClick={() => dayEvents[0] && onSelect(dayEvents[0])} aria-label={dayEvents.length ? `${day}: ${dayEvents.map(e => e.title).join(", ")}` : String(day)}>
            <span>{day}</span>{dayEvents.length > 0 && <i />}
          </button>;
        })}
      </div>
      <p className="calendar-note"><span className="calendar-legend" /> Confirmed dates · Select a marked date for details</p>
    </div>
  );
}

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [ticketEvent, setTicketEvent] = useState<EventItem | null>(null);
  const [ticketType, setTicketType] = useState("General Admission");
  const [quantity, setQuantity] = useState(1);
  const [galleryItem, setGalleryItem] = useState<(typeof gallery)[number] | null>(null);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [transitionLabel, setTransitionLabel] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    setMobileMenu(false);
    const labels: Record<string, string> = { home: "THE MOMENT", events: "LIVE EXPERIENCES", calendar: "SAVE THE DATE", gallery: "THE MEMORIES", about: "HARRIS ENTERTAINMENT" };
    const target = document.getElementById(id);
    if (!target) return;
    setTransitionLabel(labels[id] || "HARRIS ENTERTAINMENT");
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => setTransitionLabel(null), 480);
    }, 260);
  };

  const startTicket = (event: EventItem) => {
    if (!event.tickets?.length) {
      window.open(whatsappUrl(`Hi Harris Entertainment, I'd like ticket information for ${event.title}.`), "_blank", "noopener,noreferrer");
      return;
    }
    setTicketType(event.tickets[0].name);
    setQuantity(1);
    setTicketEvent(event);
  };

  const selectedTicket = ticketEvent?.tickets?.find(t => t.name === ticketType);
  const formatPrice = (n: number) => `US$${n.toFixed(2)}`;

  return (
    <main>
      <AnimatePresence>
        {transitionLabel && <motion.div className="page-transition" initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: .32, ease: [0.76, 0, 0.24, 1] }} aria-hidden="true"><div className="transition-orbit transition-orbit-a"/><div className="transition-orbit transition-orbit-b"/><div className="transition-brand">H<span>E</span><i>.</i></div><div className="transition-copy"><span>HARRIS ENTERTAINMENT / ZW</span><strong>{transitionLabel}<b>.</b></strong><span className="transition-rule"/></div></motion.div>}
      </AnimatePresence>
      <div className="announcement"><span className="announcement-pulse" /> THE NEXT EXPERIENCE IS CLOSER THAN YOU THINK <Link href="/events">DISCOVER EVENTS <ArrowRight size={12}/></Link></div>
      <header className="site-header">
        <button className="brand" onClick={() => scrollTo("home")} aria-label="Harris Entertainment home">
          <span className="brand-mark">H<span>E</span></span><span className="brand-word">HARRIS<span>ENTERTAINMENT</span></span>
        </button>
        <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"}>
          <Link href="/events" onClick={() => setMobileMenu(false)}>Events</Link>
          <Link href="/calendar" onClick={() => setMobileMenu(false)}>Calendar</Link>
          <Link href="/gallery" onClick={() => setMobileMenu(false)}>Gallery</Link>
          <Link href="/about" onClick={() => setMobileMenu(false)}>About</Link>
          <a href={whatsappUrl("Hi Harris Entertainment, I'd like to make an enquiry.")} target="_blank" rel="noreferrer">Contact <ExternalLink size={12}/></a>
        </nav>
        <Link className="header-cta" href="/events">FIND YOUR EVENT <ArrowRight size={15}/></Link>
        <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
      </header>

      <section className="hero" id="home">
        <div className="hero-video-wrap">
          <video className="hero-video" autoPlay muted loop playsInline poster="/media/dj-maphorisa-poster.jpg">
            <source src="/media/dj-maphorisa-red-car.mp4" type="video/mp4"/>
          </video>
          <div className="hero-shade" />
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        </div>
        <div className="hero-content">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="hero-kicker"><span className="live-dot"/> ZIMBABWE. FEEL THE MOMENT.</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .1 }}>WE MAKE<br/><span>THE MOMENT.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .25 }}>Unforgettable nights. Electric crowds. Experiences that stay with you.</motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .35 }} className="hero-actions">
            <button className="button button-primary" onClick={() => scrollTo("events")}>EXPLORE EVENTS <ArrowDownRight size={17}/></button>
            <button className="button button-ghost" onClick={() => scrollTo("gallery")}><Play size={14} fill="currentColor"/> FEEL THE ENERGY</button>
          </motion.div>
        </div>
        <div className="hero-bottom"><span>INDEPENDENT SPIRIT. BIG MOMENTS.</span><span className="hero-scroll">SCROLL TO EXPLORE <ArrowDown size={13}/></span><span>BY HARRIS ENTERTAINMENT <b>© 2026</b></span></div>
        <div className="hero-side-label">LIVE CULTURE / LIVE MUSIC / LIVE MOMENTS</div>
      </section>

      <section className="ticker" aria-label="Harris Entertainment statement"><div className="ticker-track">{Array.from({length: 4}, (_, i) => <span key={i}>MUSIC <i>✳</i> CULTURE <i>✳</i> COMMUNITY <i>✳</i> UNFORGETTABLE <i>✳</i></span>)}</div></section>

      <section className="section events-section" id="events">
        <div className="section-heading">
          <div><span className="eyebrow">YOUR NEXT STORY STARTS HERE</span><h2>DON'T JUST<br/><span>HEAR ABOUT IT.</span></h2></div>
          <div className="heading-aside"><p>Find your next unforgettable experience. Pick a date, bring your people, and meet us there.</p><div className="event-tabs"><button className={activeTab === "upcoming" ? "active" : ""} onClick={() => setActiveTab("upcoming")}>UPCOMING <span>03</span></button><button className={activeTab === "past" ? "active" : ""} onClick={() => setActiveTab("past")}>PAST EVENTS <span>ARCHIVE</span></button></div></div>
        </div>
        {activeTab === "upcoming" ? (
          <div className="event-grid">
            {events.filter(e => e.status === "upcoming").map((event, i) => (
              <motion.article key={event.id} className={`event-card ${i === 0 ? "event-card-featured" : ""}`} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .55, delay: i * .12 }}>
                <button className="event-image-button" onClick={() => setSelectedEvent(event)} aria-label={`View ${event.title}`}><EventArtwork event={event}/><span className="image-arrow"><ArrowUpRightIcon/></span></button>
                <div className="event-card-meta"><span>{event.category}</span><span><CalendarDays size={12}/> {event.dateLabel}</span></div>
                <button className="event-title-button" onClick={() => setSelectedEvent(event)}><h3>{event.title}</h3><ArrowRight size={18}/></button>
                <div className="event-card-bottom"><span><MapPin size={12}/>{event.venue}</span><button onClick={() => startTicket(event)}>{event.tickets?.length ? "GET TICKETS" : "GET UPDATES"} <ArrowRight size={13}/></button></div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="archive-panel"><div className="archive-icon"><Music2 size={26}/></div><div><h3>THE MEMORIES ARE JUST GETTING STARTED.</h3><p>Our past-event archive is being curated. Event photos and highlight films will appear here as the collection is prepared.</p></div><button className="text-link" onClick={() => scrollTo("gallery")}>EXPLORE GALLERY <ArrowRight size={15}/></button></div>
        )}
      </section>

      <section className="feature-strip">
        <div className="feature-strip-copy"><span className="eyebrow">MORE THAN AN EVENT</span><h2>IT'S A<br/><span>WHOLE FEELING.</span></h2><p>From the first beat to the last song, we bring people together through music, culture and shared experiences.</p><button className="button button-light" onClick={() => scrollTo("about")}>MEET HARRIS <ArrowRight size={15}/></button></div>
        <div className="feature-visual artist-feature-visual"><img className="artist-feature-photo" src="/media/artist-stage-01.jpg" alt="Artist performing live on stage" /><div className="feature-visual-inner"><div className="feature-ring ring-a"/><div className="feature-ring ring-b"/><span className="feature-stamp">HARRIS<br/>ENTERTAINMENT<br/><b>EST. ZW</b></span><span className="feature-big-type">LIVE<br/>LOUD<br/>TOGETHER<span>.</span></span><span className="feature-coordinates">20°09' S / 28°35' E</span></div></div>
      </section>

      <section className="section calendar-section" id="calendar">
        <div className="section-heading calendar-heading"><div><span className="eyebrow">PLAN YOUR NEXT NIGHT OUT</span><h2>MARK YOUR<br/><span>CALENDAR.</span></h2></div><p>Dates worth looking forward to. Browse the calendar and select a marked event to explore the details.</p></div>
        <div className="calendar-layout"><CalendarPanel onSelect={setSelectedEvent}/><div className="calendar-up-next"><span className="eyebrow">COMING UP</span>{events.filter(e => e.date).sort((a,b) => (a.date || "").localeCompare(b.date || "")).map(event => <button key={event.id} className="up-next-item" onClick={() => setSelectedEvent(event)}><span className="up-next-date">{event.dateLabel.split(" ")[0]}<small>{event.dateLabel.split(" ")[1]}</small></span><span className="up-next-info"><b>{event.title}</b><small>{event.venue}</small></span><ArrowUpRightIcon/></button>)}<div className="calendar-help"><CalendarDays size={16}/><span>Want to know when the next event drops?</span><a href={whatsappUrl("Hi Harris Entertainment, please keep me updated about upcoming events.")} target="_blank" rel="noreferrer">GET UPDATES <ArrowRight size={12}/></a></div></div></div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="gallery-heading"><div><span className="eyebrow">THE MOMENTS THAT STAY</span><h2>WE WERE<br/><span>THERE.</span></h2></div><p>Big stages. Real energy. Memories made together.</p><button className="button button-ghost" onClick={() => setGalleryItem(gallery[0])}>OPEN GALLERY <ArrowUpRightIcon/></button></div>
        <div className="gallery-grid">{gallery.map((item, i) => <motion.button key={item.title} className={`gallery-tile ${item.className}`} onClick={() => setGalleryItem(item)} initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .5, delay: i * .08 }}>
          {item.type === "video" ? <video src={item.src} muted loop autoPlay playsInline /> : <div className="gallery-image" style={{ backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.6),transparent 65%),url('${item.src}')` }}/>}
          <span className="gallery-tile-tag">{item.tag}</span><span className="gallery-tile-title">{item.title}</span><span className="gallery-open">{item.type === "video" ? <Play size={16} fill="currentColor"/> : <ArrowUpRightIcon/>}</span>
        </motion.button>)}</div>
        <div className="gallery-foot"><span>HARRIS ENTERTAINMENT / MOMENTS ARCHIVE</span><span>MADE FOR THE MEMORIES <Sparkles size={13}/></span></div>
      </section>

      <section className="sponsor-section" id="about"><div className="sponsor-mark"><span className="brand-mark">H<span>E</span></span></div><div className="sponsor-copy"><span className="eyebrow">LET'S MAKE SOMETHING BIG</span><h2>GOOD PEOPLE.<br/><span>BIG ENERGY.</span></h2><p>Have a partnership idea, a brand to bring to life, or a question about an upcoming event? Let's talk.</p><div className="sponsor-actions"><a className="button button-primary" href={whatsappUrl("Hi Harris Entertainment, I'd like to discuss a partnership.")} target="_blank" rel="noreferrer">PARTNER WITH US <ArrowRight size={15}/></a><a className="button button-outline" href={whatsappUrl("Hi Harris Entertainment, I have an event enquiry.")} target="_blank" rel="noreferrer">MAKE AN ENQUIRY <MessageCircle size={15}/></a></div></div><div className="sponsor-orb"><div className="orb-core">HE<span>✳</span></div><div className="orb-ring orb-ring-one"/><div className="orb-ring orb-ring-two"/></div></section>

      <footer className="site-footer"><div className="footer-main"><button className="brand footer-brand" onClick={() => scrollTo("home")}><span className="brand-mark">H<span>E</span></span><span className="brand-word">HARRIS<span>ENTERTAINMENT</span></span></button><p>Creating moments that move people.<br/>Bulawayo, Zimbabwe.</p><div className="footer-social"><a href="https://www.instagram.com/Harris_entertainment_zw/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href={whatsappUrl("Hi Harris Entertainment!")} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a></div></div><div className="footer-bottom"><span>© 2026 HARRIS ENTERTAINMENT. ALL RIGHTS RESERVED.</span><span>BUILT WITH INTENTION BY <b>VANILLAWEBZ</b></span><button onClick={() => scrollTo("home")}>BACK TO TOP ↑</button></div></footer>

      <a className="whatsapp-float" href={whatsappUrl("Hi Harris Entertainment, I'd like to make an enquiry.")} target="_blank" rel="noreferrer" aria-label="Chat with Harris Entertainment on WhatsApp"><MessageCircle size={22}/><span>CHAT WITH US</span></a>

      <AnimatePresence>
        {selectedEvent && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedEvent(null)}><motion.div className="event-modal" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelectedEvent(null)} aria-label="Close"><X/></button><EventArtwork event={selectedEvent}/><div className="modal-content"><span className="eyebrow">{selectedEvent.category} / {selectedEvent.label}</span><h2>{selectedEvent.title}</h2><p>{selectedEvent.description}</p><div className="modal-detail"><span><CalendarDays size={15}/>{selectedEvent.dateLabel}</span><span><MapPin size={15}/>{selectedEvent.venue}</span></div>{selectedEvent.tickets && <div className="modal-ticket-prices">{selectedEvent.tickets.map(t => <span key={t.name}>{t.name}<b>{formatPrice(t.price)}</b></span>)}</div>}<button className="button button-primary modal-main-cta" onClick={() => { startTicket(selectedEvent); if (!selectedEvent.tickets?.length) setSelectedEvent(null); }}>{selectedEvent.tickets?.length ? "CHOOSE TICKETS" : "ASK FOR EVENT UPDATES"} <ArrowRight size={15}/></button><small className="modal-disclaimer">Event details are subject to official confirmation.</small></div></motion.div></motion.div>}
        {ticketEvent && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setTicketEvent(null)}><motion.div className="ticket-modal" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setTicketEvent(null)} aria-label="Close"><X/></button><span className="eyebrow">TICKETS / {ticketEvent.dateLabel}</span><h2>YOUR NIGHT<br/><span>STARTS HERE.</span></h2><p>{ticketEvent.title}</p><label className="form-label">CHOOSE YOUR TICKET</label><div className="ticket-options">{ticketEvent.tickets?.map(t => <button key={t.name} className={ticketType === t.name ? "ticket-option selected" : "ticket-option"} onClick={() => setTicketType(t.name)}><span>{t.name}</span><b>{formatPrice(t.price)}</b>{ticketType === t.name && <Check size={15}/>}</button>)}</div><label className="form-label">QUANTITY</label><div className="quantity-control"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button><span>{quantity}</span><button onClick={() => setQuantity(Math.min(10, quantity + 1))} aria-label="Increase quantity">+</button></div><div className="ticket-total"><span>ORDER TOTAL</span><b>{formatPrice((selectedTicket?.price || 0) * quantity)}</b></div><a className="button button-primary ticket-checkout" href={whatsappUrl(`Hi Harris Entertainment, I want to purchase ${quantity} x ${ticketType} ticket(s) for ${ticketEvent.title}. Estimated total: ${formatPrice((selectedTicket?.price || 0) * quantity)}. Please confirm availability and payment instructions.`)} target="_blank" rel="noreferrer" onClick={() => setTicketEvent(null)}>CONTINUE TO BOOKING <ArrowRight size={15}/></a><p className="checkout-note">This initial booking flow sends your request to the official team on WhatsApp. Online payment and automatic ticket issuance will be enabled after the payment gateway and ticket inventory are configured.</p></motion.div></motion.div>}
        {galleryItem && <motion.div className="gallery-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setGalleryItem(null)}><button className="lightbox-close" onClick={() => setGalleryItem(null)} aria-label="Close gallery"><X size={25}/></button><div className="lightbox-content" onClick={e => e.stopPropagation()}>{galleryItem.type === "video" ? <video src={galleryItem.src} controls autoPlay playsInline /> : <div className="lightbox-image" style={{ backgroundImage: `url('${galleryItem.src}')` }}/>}<span>{galleryItem.title.toUpperCase()} / HARRIS ENTERTAINMENT</span></div></motion.div>}
      </AnimatePresence>
    </main>
  );
}

function ArrowUpRightIcon() {
  return <ArrowUpRightFallback />;
}
function ArrowUpRightFallback() {
  return <ArrowRight className="arrow-up-right-fallback" size={17} />;
}