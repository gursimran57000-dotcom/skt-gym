import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Services", "Gallery", "Testimonials", "Contact"];

const SERVICES = [
  { icon: "🏋️", title: "Strength Training", desc: "Full range of free weights, barbells, and machines for building raw power and muscle." },
  { icon: "🔥", title: "Cardio Zone", desc: "Treadmills, cycles, and ellipticals to torch calories and boost endurance." },
  { icon: "🥊", title: "Boxing & MMA", desc: "Heavy bags, speed bags, and combat fitness equipment for fighters." },
  { icon: "🧘", title: "Yoga & Flexibility", desc: "Dedicated stretch area and guided yoga sessions for recovery and mobility." },
  { icon: "💪", title: "Personal Training", desc: "Expert trainers who design customized programs to hit your exact goals fast." },
  { icon: "🥗", title: "Diet & Nutrition", desc: "Personalized nutrition guidance to fuel your transformation inside and out." },
];

const TESTIMONIALS = [
  { name: "Shubhneet Goyal", rating: 5, text: "One of the best gyms in the area. The environment is very motivating, equipment is well maintained, and the trainers are supportive and knowledgeable. Clean space, good crowd, and positive vibes every day. Perfect place for anyone serious about fitness and health. Highly recommended!" },
  { name: "Deepak Soni", rating: 5, text: "Budget friendly but gives luxurious look. And all equipments are there ❤️ The pricing is unbeatable and the quality of machines rivals high-end gyms." },
  { name: "Rattanjot Singh", rating: 5, text: "Everything's good 👍 The staff is friendly, facility is clean, and the atmosphere keeps you motivated. One of my best decisions to join SKT!" },
  { name: "Priya Sharma", rating: 5, text: "The personal trainers here really understand your goals. I've lost 12 kgs in just 4 months with their guidance. Incredible place!" },
];

const GALLERY_ITEMS = [
  { label: "Weightlifting Zone", color: "#1a1a2e" },
  { label: "Cardio Area", color: "#16213e" },
  { label: "Boxing Ring", color: "#0f3460" },
  { label: "Yoga Studio", color: "#1a1a2e" },
  { label: "Locker Room", color: "#16213e" },
  { label: "Members Lounge", color: "#0f3460" },
];

const FAQS = [
  { q: "What are the gym timings?", a: "We're open from 5:00 AM to 9:30 PM, seven days a week. Early birds and night owls are equally welcome!" },
  { q: "Do you offer trial sessions?", a: "Yes! We offer a free one-day trial pass. Visit us at Dadi Poti Park area, Bathinda to claim yours." },
  { q: "Are personal trainers available?", a: "Absolutely. All our certified trainers are available for one-on-one sessions. Ask at the front desk to schedule." },
  { q: "What membership plans are available?", a: "We offer monthly, quarterly, and annual memberships at highly affordable rates. Contact us or visit for current pricing." },
  { q: "Is parking available?", a: "Yes, parking is conveniently available near Dadi Poti Park where the gym is located." },
];

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#f59e0b", fontSize: 16 }}>★</span>
      ))}
    </div>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

export default function SKTFitnessWorld() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", goal: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ name: "", phone: "", email: "", goal: "", message: "" });
  };

  const [heroRef, heroIn] = useInView(0.1);
  const [aboutRef, aboutIn] = useInView(0.1);
  const [servicesRef, servicesIn] = useInView(0.1);
  const [testiRef, testiIn] = useInView(0.1);
  const [contactRef, contactIn] = useInView(0.1);

  const fadeUp = (visible, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <div style={{ fontFamily: "'Barlow', 'Helvetica Neue', Arial, sans-serif", background: "#0a0a0f", color: "#f0f0f0", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,10,15,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(220,38,38,0.25)" : "none",
        transition: "all 0.4s ease",
        padding: "0 5vw",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 8,
            background: "linear-gradient(135deg, #dc2626, #991b1b)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, color: "#fff",
            letterSpacing: 1,
          }}>SKT</div>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: 1, color: "#fff" }}>
            FITNESS <span style={{ color: "#dc2626" }}>WORLD</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{ background: "none", border: "none", cursor: "pointer", color: activeSection === link ? "#dc2626" : "rgba(255,255,255,0.75)", fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: 1, textTransform: "uppercase", padding: "4px 0", borderBottom: activeSection === link ? "2px solid #dc2626" : "2px solid transparent", transition: "all 0.2s" }}>
              {link}
            </button>
          ))}
          <a href="https://wa.me/918146562930" target="_blank" rel="noreferrer"
            style={{ background: "#dc2626", color: "#fff", padding: "8px 18px", borderRadius: 6, fontWeight: 700, fontSize: 13, letterSpacing: 0.5, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, textTransform: "uppercase" }}>
            Join Now
          </a>
        </div>

        {/* Mobile hamburger - shown via media query simulation */}
      </nav>

      {/* ── HERO ── */}
      <section id="home" ref={heroRef} style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #0a0a0f 0%, #1a0505 50%, #0a0a0f 100%)",
      }}>
        {/* Animated background grid */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.07, backgroundImage: "linear-gradient(rgba(220,38,38,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.8) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Big diagonal accent */}
        <div style={{ position: "absolute", right: "-10%", top: "-20%", width: "65vw", height: "140%", background: "linear-gradient(135deg, rgba(220,38,38,0.12) 0%, rgba(153,27,27,0.06) 100%)", transform: "skewX(-8deg)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, padding: "100px 7vw 80px", maxWidth: 900 }}>
          <div style={{ ...fadeUp(heroIn, 0), display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.4)", borderRadius: 100, padding: "5px 16px", marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#dc2626", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#dc2626", textTransform: "uppercase" }}>Now Open · Bathinda, Punjab</span>
          </div>

          <h1 style={{ ...fadeUp(heroIn, 0.1), fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(56px, 10vw, 110px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: -1, margin: "0 0 24px", textTransform: "uppercase" }}>
            FORGE YOUR<br />
            <span style={{ color: "#dc2626", WebkitTextStroke: "2px #dc2626", WebkitTextFillColor: "transparent" }}>STRONGEST</span><br />
            SELF
          </h1>

          <p style={{ ...fadeUp(heroIn, 0.2), fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.65)", maxWidth: 520, lineHeight: 1.6, margin: "0 0 40px" }}>
            SKT Fitness World — Bathinda's most motivating gym. Budget-friendly, fully equipped, and built for results. 5.0 ★ rated by real members.
          </p>

          <div style={{ ...fadeUp(heroIn, 0.3), display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("Contact")} style={{
              background: "#dc2626", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer",
              boxShadow: "0 0 30px rgba(220,38,38,0.4)", transition: "all 0.2s",
            }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              Start Free Trial
            </button>
            <button onClick={() => scrollTo("Services")} style={{
              background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", padding: "14px 32px", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
            }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#dc2626"; e.currentTarget.style.color = "#dc2626"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}>
              Explore Services
            </button>
          </div>

          {/* Stats */}
          <div style={{ ...fadeUp(heroIn, 0.4), display: "flex", gap: "clamp(24px,4vw,60px)", marginTop: 64, flexWrap: "wrap" }}>
            {[["5.0 ★", "Google Rating"], ["200+", "Active Members"], ["6+", "Expert Trainers"], ["12+", "Equipment Zones"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, color: "#dc2626", lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.5 }}>
          <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #dc2626, transparent)" }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" ref={aboutRef} style={{ padding: "100px 7vw", background: "#0d0d14" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div style={fadeUp(aboutIn, 0)}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#dc2626", textTransform: "uppercase", marginBottom: 12 }}>About SKT Fitness World</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, lineHeight: 1, textTransform: "uppercase", margin: "0 0 24px" }}>
              WHERE GOALS<br /><span style={{ color: "#dc2626" }}>BECOME REALITY</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>
              Nestled near Dadi Poti Park in Bathinda, SKT Fitness World is more than a gym — it's a movement. We believe elite fitness shouldn't come with an elite price tag. That's why we've built a luxurious, fully-equipped space that gives you everything you need to transform.
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: 16, marginBottom: 32 }}>
              Our community is welcoming, our trainers are certified, and our equipment is always maintained to the highest standard. Whether you're lifting for the first time or training for competition — SKT is your home.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {["LGBTQ+ Friendly", "AC Facility", "Pro Equipment", "Certified Trainers"].map(badge => (
                <span key={badge} style={{ padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(220,38,38,0.4)", color: "#dc2626", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{badge}</span>
              ))}
            </div>
          </div>
          <div style={{ ...fadeUp(aboutIn, 0.15), display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "⏰", title: "Open Daily", val: "5 AM – 9:30 PM" },
              { icon: "📍", title: "Location", val: "Dadi Poti Park, Bathinda" },
              { icon: "📞", title: "Call Us", val: "081465 62930" },
              { icon: "🏆", title: "Rating", val: "5.0 / 5 (7 reviews)" },
            ].map(card => (
              <div key={card.title} style={{
                background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 12, padding: "20px 18px",
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 4 }}>{card.title}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{card.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" ref={servicesRef} style={{ padding: "100px 7vw", background: "#0a0a0f" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...fadeUp(servicesIn, 0), textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#dc2626", textTransform: "uppercase", marginBottom: 12 }}>What We Offer</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, lineHeight: 1, textTransform: "uppercase", margin: 0 }}>
              OUR <span style={{ color: "#dc2626" }}>SERVICES</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {SERVICES.map((s, i) => (
              <div key={s.title} style={{
                ...fadeUp(servicesIn, i * 0.08),
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "28px 24px",
                transition: "border-color 0.3s, transform 0.3s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(220,38,38,0.5)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 800, textTransform: "uppercase", color: "#fff", margin: "0 0 10px" }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" style={{ padding: "100px 7vw", background: "#0d0d14" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#dc2626", textTransform: "uppercase", marginBottom: 12 }}>Inside SKT</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, lineHeight: 1, textTransform: "uppercase", margin: 0 }}>
              THE <span style={{ color: "#dc2626" }}>ARENA</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "auto auto", gap: 16 }}>
            {GALLERY_ITEMS.map((item, i) => (
              <div key={item.label} style={{
                position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: i === 0 ? "auto" : "4/3",
                gridColumn: i === 0 ? "1 / 3" : "auto",
                background: item.color,
                border: "1px solid rgba(220,38,38,0.15)",
                display: "flex", alignItems: "flex-end",
                minHeight: i === 0 ? 280 : 180,
              }}>
                {/* Placeholder visual */}
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${item.color} 0%, rgba(220,38,38,0.15) 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: i === 0 ? 64 : 40, opacity: 0.25 }}>🏋️</div>
                  </div>
                </div>
                <div style={{ position: "relative", zIndex: 2, padding: "16px 20px", background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", width: "100%", boxSizing: "border-box" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 24, color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Visit us to experience the space — photos don't do it justice.</p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" ref={testiRef} style={{ padding: "100px 7vw", background: "#0a0a0f" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...fadeUp(testiIn, 0), textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#dc2626", textTransform: "uppercase", marginBottom: 12 }}>Google Reviews</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, lineHeight: 1, textTransform: "uppercase", margin: "0 0 12px" }}>
              WHAT MEMBERS <span style={{ color: "#dc2626" }}>SAY</span>
            </h2>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
              <StarRating count={5} />
              <span style={{ fontSize: 16, fontWeight: 700, color: "#f59e0b" }}>5.0</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>· 7 reviews on Google Maps</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} style={{
                ...fadeUp(testiIn, i * 0.08),
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "28px 24px",
              }}>
                <StarRating count={t.rating} />
                <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontSize: 14, margin: "16px 0", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #dc2626, #7f1d1d)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#fff" }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Verified Google Review</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: "80px 7vw", background: "#0d0d14" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#dc2626", textTransform: "uppercase", marginBottom: 12 }}>FAQ</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(32px,5vw,54px)", fontWeight: 900, textTransform: "uppercase", margin: 0 }}>
              QUICK <span style={{ color: "#dc2626" }}>ANSWERS</span>
            </h2>
          </div>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                width: "100%", background: "none", border: "none", cursor: "pointer", color: "#fff", textAlign: "left", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 16,
              }}>
                {faq.q}
                <span style={{ color: "#dc2626", fontSize: 24, transition: "transform 0.3s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              <div style={{ maxHeight: openFaq === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, paddingBottom: 20, margin: 0 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" ref={contactRef} style={{ padding: "100px 7vw", background: "#0a0a0f" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...fadeUp(contactIn, 0), textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#dc2626", textTransform: "uppercase", marginBottom: 12 }}>Get In Touch</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, lineHeight: 1, textTransform: "uppercase", margin: 0 }}>
              START YOUR <span style={{ color: "#dc2626" }}>JOURNEY</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div style={fadeUp(contactIn, 0.1)}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 800, textTransform: "uppercase", marginBottom: 24 }}>Contact Details</h3>
              {[
                { icon: "📍", label: "Address", val: "Near Dadi Poti Park, Bathinda, Punjab 151001" },
                { icon: "📞", label: "Phone", val: "081465 62930" },
                { icon: "⏰", label: "Hours", val: "Open Daily: 5:00 AM – 9:30 PM" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#dc2626", textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 15, color: "rgba(255,255,255,0.8)" }}>{item.val}</div>
                  </div>
                </div>
              ))}

              {/* Google Maps embed */}
              <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(220,38,38,0.2)", marginTop: 8 }}>
                <iframe
                  title="SKT Fitness World Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.0!2d74.948!3d30.208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919f57a3de3fc5f%3A0x1b8b8b8b8b8b8b8b!2sDadi%20Poti%20Park%2C%20Bathinda%2C%20Punjab!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%" height="220" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy"
                />
              </div>
            </div>

            <div style={fadeUp(contactIn, 0.2)}>
              {formSent ? (
                <div style={{ textAlign: "center", padding: "60px 40px", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 14 }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 800, textTransform: "uppercase", color: "#dc2626", marginBottom: 8 }}>We Got Your Message!</h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15 }}>Our team will contact you shortly. Get ready to transform!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { key: "name", placeholder: "Your Full Name *", type: "text", required: true },
                    { key: "phone", placeholder: "Phone Number *", type: "tel", required: true },
                    { key: "email", placeholder: "Email Address", type: "email", required: false },
                  ].map(field => (
                    <input key={field.key} type={field.type} placeholder={field.placeholder} required={field.required}
                      value={formData[field.key]}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "14px 18px", color: "#fff", fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: "none", width: "100%", boxSizing: "border-box" }}
                    />
                  ))}
                  <select value={formData.goal} onChange={e => setFormData({ ...formData, goal: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "14px 18px", color: formData.goal ? "#fff" : "rgba(255,255,255,0.4)", fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: "none" }}>
                    <option value="">Select Your Goal</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="General Fitness">General Fitness</option>
                    <option value="Athletics/Competition">Athletics / Competition</option>
                  </select>
                  <textarea placeholder="Any message or questions?" rows={4} value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "14px 18px", color: "#fff", fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: "none", resize: "vertical" }}
                  />
                  <button type="submit" style={{
                    background: "#dc2626", color: "#fff", border: "none", padding: "16px", borderRadius: 8, fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer",
                    boxShadow: "0 0 30px rgba(220,38,38,0.35)", transition: "all 0.2s",
                  }}>
                    Send Message & Book Free Trial →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#050507", borderTop: "1px solid rgba(220,38,38,0.2)", padding: "48px 7vw 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: "linear-gradient(135deg, #dc2626, #991b1b)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, color: "#fff" }}>SKT</div>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: 1, color: "#fff" }}>FITNESS <span style={{ color: "#dc2626" }}>WORLD</span></span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontSize: 14, maxWidth: 280 }}>Bathinda's most motivating gym near Dadi Poti Park. Budget-friendly luxury. Real results. 5.0 ★ rated.</p>
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#dc2626", textTransform: "uppercase", marginBottom: 16 }}>Quick Links</h4>
              {NAV_LINKS.map(link => (
                <button key={link} onClick={() => scrollTo(link)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontFamily: "'Barlow', sans-serif", fontSize: 14, cursor: "pointer", padding: "4px 0", transition: "color 0.2s", textAlign: "left" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#dc2626"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
                  {link}
                </button>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#dc2626", textTransform: "uppercase", marginBottom: 16 }}>Connect</h4>
              {[
                { label: "📞 Call Us", href: "tel:+918146562930" },
                { label: "💬 WhatsApp", href: "https://wa.me/918146562930" },
                { label: "📍 Google Maps", href: "https://maps.google.com" },
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 14, textDecoration: "none", padding: "4px 0", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#dc2626"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>© 2024 SKT Fitness World, Bathinda. All rights reserved.</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Open Daily · 5:00 AM – 9:30 PM</span>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <a href="https://wa.me/918146562930?text=Hi%20SKT%20Fitness%20World%2C%20I%27m%20interested%20in%20joining%20the%20gym!" target="_blank" rel="noreferrer"
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 999,
          width: 58, height: 58, borderRadius: "50%",
          background: "#25d366", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
          textDecoration: "none", transition: "transform 0.2s",
          animation: "wpPulse 2s infinite",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        💬
      </a>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes wpPulse { 0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.5)} 50%{box-shadow:0 4px 32px rgba(37,211,102,0.8)} }
        * { box-sizing: border-box; }
        select option { background: #1a1a2e; color: #fff; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.35); }
        input:focus, textarea:focus, select:focus { border-color: rgba(220,38,38,0.5) !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 3px; }
        @media (max-width: 768px) {
          nav > div:last-child { display: none; }
        }
      `}</style>
    </div>
  );
}
