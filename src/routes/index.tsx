import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Baby,
  HeartPulse,
  Stethoscope,
  ShieldPlus,
  Activity,
  Phone,
  MapPin,
  Mail,
  Clock,
  ArrowRight,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import { MeshDriftShader } from "@/components/mesh-drift-shader";
import { HeartbeatEcg } from "@/components/heartbeat-ecg";
import { ContainerScroll } from "@/components/container-scroll";
import logo from "@/assets/omolemo-logo.png";
import heroAsset from "@/assets/clinician-chuene.jpeg.asset.json";
const hero = heroAsset.url;
import posterAwareness from "@/assets/poster-awareness.jpg";
import posterServices from "@/assets/poster-services.jpg";
import galBaby from "@/assets/gallery-baby.jpg";
import galSteth from "@/assets/gallery-stethoscope.jpg";
import galRoom from "@/assets/gallery-clinic-room.jpg";
import galAntenatal from "@/assets/gallery-antenatal.jpg";
import galBp from "@/assets/gallery-bp.jpg";
import galFlat from "@/assets/gallery-flatlay.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const WHATSAPP = "27614236255"; // international format for wa.me
const WA_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "Hi Omolemo Health Care Clinic, I'd like to book a virtual consultation.",
)}`;
const AMAZON_BOOK = "https://www.amazon.com.au/Story-Life-Fifi-Dreamer/dp/B0CVG5Q8QR";

const services = [
  {
    icon: HeartPulse,
    title: "Women's Wellness Health",
    desc: "Guidance on how often a Pap smear should be done, interpretation of results, and referral to the right hospital when needed.",
    img: galSteth,
  },
  {
    icon: Baby,
    title: "Antenatal Advice",
    desc: "Early pregnancy guidance and referrals to relevant clinics tailored to your affordability and needs.",
    img: galAntenatal,
  },
  {
    icon: Stethoscope,
    title: "Minor Illness",
    desc: "Virtual consultations with referrals, prescriptions and sick notes where clinically relevant.",
    img: galRoom,
  },
  {
    icon: ShieldPlus,
    title: "Baby Clinic Advice",
    desc: "Growth check guidance, immunisation schedules and new-parent support — all delivered virtually.",
    img: galBaby,
  },
  {
    icon: Activity,
    title: "Chronic Illness Support",
    desc: "Ongoing virtual consultation, diet, lifestyle planning and connection to the right care pathway.",
    img: galBp,
  },
  {
    icon: Stethoscope,
    title: "Health Education",
    desc: "Confidential health advice, screening reminders and preventative care for the whole family.",
    img: galFlat,
  },
];

function Home() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      {/* Global shader background */}
      <div className="fixed inset-0 z-0">
        <MeshDriftShader />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      <div className="relative z-10">
        <Nav />
        <Hero />
        <MarqueeBar />
        <About />
        <Services />
        <Gallery />
        <ScrollSection />
        <Awareness />
        <BookSection />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

function Gallery() {
  const items = [
    { src: galBaby, alt: "Baby clinic care", span: "row-span-2", label: "Baby Clinic" },
    { src: galSteth, alt: "Stethoscope on scrubs", span: "", label: "Every Heartbeat" },
    { src: galRoom, alt: "Modern consultation room", span: "", label: "Our Space" },
    { src: galAntenatal, alt: "Antenatal consultation", span: "row-span-2", label: "Antenatal" },
    { src: galBp, alt: "Chronic illness consultation", span: "", label: "Chronic Care" },
    { src: galFlat, alt: "Medical flat lay", span: "", label: "Preparedness" },
  ];
  return (
    <section id="gallery" className="relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="text-[11px] uppercase tracking-[0.4em] text-white/50">Inside the clinic</div>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl font-light leading-tight md:text-6xl">
              Moments of <em className="text-[#e11d2f]">care</em>, captured.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/60">
            A quiet look at the people, hands and rooms behind every consultation at Omolemo.
          </p>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {items.map((it, i) => (
            <motion.figure
              key={it.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${it.span}`}
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <figcaption className="absolute inset-x-4 bottom-3 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/80">
                <span>{it.label}</span>
                <span className="text-[#e11d2f]">✚</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="Omolemo Health Care Clinic" className="h-10 w-auto md:h-12" />
          <span className="hidden text-xs uppercase tracking-[0.3em] text-white/70 md:block">
            Visual Consultation
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#awareness" className="hover:text-white">Awareness</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#e11d2f] hover:text-white"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Book on WhatsApp</span>
          <span className="sm:hidden">Book</span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-16 md:grid-cols-2 md:gap-16 md:px-8 md:pb-28 md:pt-24">
        <div className="relative">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white/70 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#e11d2f]" />
            Practice 0716839 · Virtual Consultations
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-serif text-[13vw] font-light leading-[0.9] tracking-tight md:text-[6.2vw]"
          >
            <span className="block text-white">Compassionate</span>
            <span className="block italic text-white/60">care.</span>
            <span className="mt-2 block text-[#e11d2f]">Every heartbeat.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 max-w-md text-base leading-relaxed text-white/70"
          >
            Omolemo Health Care Clinic offers professional, confidential and accessible
            healthcare for you and your family — led by Sr. R.A Chuene in Roodekrans.
          </motion.p>

          {/* ECG line */}
          <div className="mt-8 h-16 w-full max-w-md text-white/40">
            <HeartbeatEcg className="h-full" bpm={72} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-[#e11d2f] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-[0_0_40px_-8px_rgba(225,29,47,0.8)] transition hover:bg-white hover:text-black"
            >
              <MessageCircle className="h-4 w-4" />
              Book on WhatsApp
            </a>
            <a
              href="tel:+27614236255"
              className="inline-flex items-center gap-3 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white/90 backdrop-blur transition hover:border-white hover:text-white"
            >
              <Phone className="h-4 w-4" /> 061 423 6255
            </a>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-6 text-xs uppercase tracking-widest text-white/50">
            <div><div className="text-2xl font-light text-white">18+</div>Years experience</div>
            <div><div className="text-2xl font-light text-white">2</div>Clinic sessions daily</div>
            <div><div className="text-2xl font-light text-white">100%</div>Confidential</div>
          </div>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_120px_-20px_rgba(225,29,47,0.35)]">
            <img
              src={hero}
              alt="Sr. R.A Chuene, clinician at Omolemo Health Care Clinic"
              width={1536}
              height={1536}
              className="h-[560px] w-full object-cover md:h-[640px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* floating logo card */}
            <div className="absolute left-5 top-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-black/40 px-3 py-2 backdrop-blur-xl">
              <img src={logo} alt="" className="h-10 w-auto" />
            </div>

            {/* bottom info strip */}
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-black/50 p-4 backdrop-blur-xl">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">Clinician</div>
              <div className="mt-1 flex items-end justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">Sr. Refilwe A. Chuene</div>
                  <div className="text-xs text-white/60">Dip Nursing · Dip Nursery (PHC)</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">Live</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-[#e11d2f]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#e11d2f]" />
                    72 BPM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MarqueeBar() {
  const items = [
    "Compassionate Care",
    "Quality Health",
    "Every Time",
    "Confidential",
    "Accessible",
    "Patient-Centered",
  ];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black/50 py-4 backdrop-blur">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-6 text-xs uppercase tracking-[0.5em] text-white/40">
            {t} <span className="text-[#e11d2f]">✚</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.4em] text-white/50">About the clinic</div>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-6xl">
              A quiet place for <em className="text-[#e11d2f]">real</em> healing.
            </h2>
          </div>
          <div className="md:col-span-7 md:pl-12">
            <p className="text-lg leading-relaxed text-white/80">
              Sr. Refilwe A. Chuene is a dedicated healthcare professional with over
              <span className="text-white"> 18 years </span> of clinical experience, having served
              as a clinician and <span className="text-white">Operational Manager Pro</span>.
            </p>
            <p className="mt-5 text-base leading-relaxed text-white/70">
              Since <span className="text-white">2018</span>, Omolemo Health Care Clinic operated
              from its home at <span className="text-white">Florida</span>. Today, Sr. Chuene
              focuses exclusively on <span className="text-[#e11d2f]">virtual consultations</span> —
              bringing the same warmth, discretion and clinical rigour into your home, wherever you
              are.
            </p>
            <p className="mt-5 text-base leading-relaxed text-white/70">
              Beyond the clinic, she is also a published author of the children's ebook
              <em className="text-white"> Fifi the Dreamer</em> — a story about hope, imagination
              and quiet courage.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={AMAZON_BOOK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur transition hover:border-[#e11d2f] hover:text-[#e11d2f]"
              >
                <BookOpen className="h-4 w-4" /> Read Fifi the Dreamer on Amazon
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 text-sm text-white/70 sm:grid-cols-4">
              {["18 yrs clinical", "Operational Manager Pro", "Virtual consultations", "Published author"].map((t) => (
                <div key={t} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#e11d2f]" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="text-[11px] uppercase tracking-[0.4em] text-white/50">Our services</div>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl font-light leading-tight md:text-6xl">
              Full-spectrum care, delivered with warmth.
            </h2>
          </div>
          <div className="max-w-sm text-sm text-white/60">
            Visual consultations Monday–Friday 9AM–3PM · Saturday 10AM–2PM · Consultation fees from
            R150.
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden bg-black/70 backdrop-blur transition"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <s.icon className="absolute left-6 top-6 h-8 w-8 text-[#e11d2f] drop-shadow-[0_0_10px_rgba(225,29,47,0.6)]" strokeWidth={1.4} />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
              </div>
              <ArrowRight className="absolute right-6 top-6 h-4 w-4 -translate-x-2 text-white/60 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollSection() {
  return (
    <section className="relative">
      <ContainerScroll
        titleComponent={
          <div>
            <div className="text-[11px] uppercase tracking-[0.4em] text-white/50">Book in seconds</div>
            <h2 className="mt-4 font-serif text-4xl font-light leading-none md:text-7xl">
              Your consultation, <br />
              <span className="italic text-[#e11d2f]">one message away.</span>
            </h2>
          </div>
        }
      >
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={hero}
            alt="Inside Omolemo Health Care Clinic"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end gap-6 p-8 text-center md:p-16">
            <div className="text-[10px] uppercase tracking-[0.5em] text-white/60">Visual Consultation via WhatsApp</div>
            <div className="font-serif text-3xl md:text-5xl">
              Send us a message — get a booking in minutes.
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#e11d2f] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-[0_0_60px_-10px_rgba(225,29,47,1)] hover:bg-white hover:text-black"
            >
              <MessageCircle className="h-4 w-4" /> Book on WhatsApp
            </a>
            <div className="mt-4 h-8 w-full max-w-md text-white/30">
              <HeartbeatEcg className="h-full" bpm={90} />
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}

function Awareness() {
  return (
    <section id="awareness" className="relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <div className="text-[11px] uppercase tracking-[0.4em] text-white/50">Community awareness</div>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-6xl">
              Don't normalize what is <span className="text-[#e11d2f]">harmful.</span>
            </h2>
            <p className="mt-6 max-w-md text-white/70">
              Protecting the family. Silence protects the problem — not you. Speaking up today can
              prevent pain tomorrow.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/70">
              {[
                "Awareness before harm becomes normal.",
                "Truth protects. Silence can enable harm.",
                "Your discomfort may be a warning — be awakened.",
                "Exposure takes courage, time and light.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-6 bg-[#e11d2f]" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src={posterAwareness}
              alt="Be Aware — Don't normalize what is harmful or dangerous"
              loading="lazy"
              className="col-span-2 w-full rounded-3xl border border-white/10 shadow-2xl"
            />
            <img
              src={posterServices}
              alt="Omolemo services flyer"
              loading="lazy"
              className="w-full rounded-2xl border border-white/10 object-cover"
            />
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Live monitor</div>
              <div className="text-3xl font-light">72 <span className="text-sm text-white/50">bpm</span></div>
              <div className="h-10 text-[#e11d2f]"><HeartbeatEcg className="h-full" bpm={72} /></div>
              <div className="text-xs text-white/50">"Walk in the light, protect one another, and choose truth over fear."</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <div className="text-[11px] uppercase tracking-[0.4em] text-white/50">Visit / call / message</div>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-6xl">
              Let's talk. <em className="text-[#e11d2f]">Today.</em>
            </h2>

            <div className="mt-10 space-y-5 text-white/80">
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-[#e11d2f]">
                <MessageCircle className="h-6 w-6 text-[#25D366]" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/50">WhatsApp</div>
                  <div className="text-lg">061 423 6255</div>
                </div>
              </a>
              <a href="tel:+27614236255" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white">
                <Phone className="h-6 w-6 text-white" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/50">Call</div>
                  <div className="text-lg">061 423 6255 · 061 500 4776</div>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <MapPin className="h-6 w-6 text-[#e11d2f]" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/50">Address</div>
                  <div className="text-lg">85 Vuurlelie Street, Roodekrans</div>
                </div>
              </div>
              <a href="mailto:omolemojermiahhealthcare@gmail.com" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white">
                <Mail className="h-6 w-6" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/50">Email</div>
                  <div className="text-lg break-all">omolemojermiahhealthcare@gmail.com</div>
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/50">
              <Clock className="h-4 w-4" /> Consulting hours
            </div>
            <div className="mt-6 divide-y divide-white/10">
              {[
                ["Monday – Friday", "9:00 AM – 3:00 PM"],
                ["Saturday", "10:00 AM – 2:00 PM"],
                ["Public Holidays", "10:00 AM – 2:00 PM"],
                ["Sunday", "Closed"],
              ].map(([d, h]) => (
                <div key={d} className="flex items-center justify-between py-4">
                  <div className="text-white/80">{d}</div>
                  <div className="font-mono text-sm text-white/60">{h}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-[#e11d2f]/30 bg-[#e11d2f]/10 p-5">
              <div className="text-xs uppercase tracking-[0.3em] text-[#e11d2f]">Consultation fees</div>
              <div className="mt-2 flex items-baseline gap-6">
                <div><div className="text-3xl font-light text-white">R200</div><div className="text-xs text-white/60">Minor & chronic illness</div></div>
                <div><div className="text-3xl font-light text-white">R150</div><div className="text-xs text-white/60">Diet & health advice</div></div>
              </div>
            </div>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-white py-4 text-sm font-semibold uppercase tracking-widest text-black transition hover:bg-[#e11d2f] hover:text-white"
            >
              <MessageCircle className="h-4 w-4" /> Book on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookSection() {
  return (
    <section id="book" className="relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto w-full max-w-sm"
            >
              <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-[#e11d2f]/30 via-transparent to-white/10 blur-2xl" />
              <div className="relative rounded-[24px] border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#050505] p-10 shadow-[0_40px_120px_-20px_rgba(225,29,47,0.35)]">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/50">
                  <BookOpen className="h-3.5 w-3.5" /> Ebook
                </div>
                <div className="mt-8 font-serif text-4xl font-light italic leading-none text-white">
                  Fifi
                </div>
                <div className="mt-2 font-serif text-xl text-white/80">the Dreamer</div>
                <div className="mt-8 h-px w-full bg-white/10" />
                <div className="mt-6 text-xs uppercase tracking-[0.3em] text-[#e11d2f]">
                  A story of life
                </div>
                <div className="mt-2 text-sm text-white/60">by Refilwe A. Chuene</div>
              </div>
            </motion.div>
          </div>
          <div className="md:col-span-7 md:pl-8">
            <div className="text-[11px] uppercase tracking-[0.4em] text-white/50">From the author</div>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-6xl">
              Meet <em className="text-[#e11d2f]">Fifi</em> — a little dreamer with a big heart.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Sr. Refilwe A. Chuene's debut ebook, <em className="text-white">The Story of Life:
              Fifi the Dreamer</em>, follows a gentle, curious child whose imagination becomes the
              quiet courage that carries her through the hardest and brightest days of growing up.
              A tender read for families, dreamers, and anyone who believes that hope is a form of
              healing.
            </p>
            <p className="mt-4 max-w-xl text-sm text-white/50">
              Available on Amazon. Read the full story and support the author.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={AMAZON_BOOK}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[#FF9900] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-black shadow-[0_0_40px_-8px_rgba(255,153,0,0.7)] transition hover:bg-white"
              >
                <BookOpen className="h-4 w-4" />
                Get it on Amazon
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href={AMAZON_BOOK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/60 underline-offset-4 hover:text-white hover:underline"
              >
                amazon.com.au/Fifi-the-Dreamer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="mb-6 h-8 w-full text-[#e11d2f]"><HeartbeatEcg className="h-full" bpm={60} /></div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <img src={logo} alt="Omolemo Health Care Clinic" className="h-10 w-auto" />
          <div className="text-center text-xs uppercase tracking-[0.4em] text-white/50">
            Compassionate Care · Quality Health · Every Time
          </div>
          <div className="text-xs text-white/40">© {new Date().getFullYear()} Omolemo Health Care Clinic</div>
        </div>
      </div>
    </footer>
  );
}
