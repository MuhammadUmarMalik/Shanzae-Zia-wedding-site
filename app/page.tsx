"use client";

/**
 * Black + Beige design reminder: this page uses cinematic black, warm beige, and cream contrast,
 * Bodoni Moda display moments, Manrope interface rhythm, bold image frames, and measured motion.
 */
import { useEffect, useRef, useState, type TouchEvent } from "react";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Clock3,
  Loader2,
  MapPin,
  Menu,
  Quote,
  Send,
  X,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";
import { CustomCursor } from "@/components/CustomCursor";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FocusCards } from "@/components/ui/focus-cards";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import { EditorialImage } from "@/components/EditorialImage";
import { cn } from "@/lib/utils";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const socialLinks = {
  instagram: "https://www.instagram.com/shanzae.zia",
  whatsapp: "https://wa.me/923095921582",
  facebook: "https://web.facebook.com/profile.php?id=100093684345361&mibextid=wwXIfr&rdid=jvVymqPxal1qmv77&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1BhxBYzeFS%2F%3Fmibextid%3DwwXIfr%26utm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26_rdc%3D1%26_rdr%23",
  tiktok: "https://www.tiktok.com/@shanzu.photoworks?_r=1&_t=ZS-92NKUYwFHYW&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaebZ80SnLFRBT8u-HePBECmJxPPPVVTDqjpbdc1sNIkVzXAXEHsbVeDoeBhjA_aem_ltcUyFn-XgVUlN1bX0HpTA",
} as const;

const filmChannels = [
  { key: "public", label: "Public Reels", meta: "TikTok collection", copy: "A running archive of reels and highlights from recent weddings.", href: socialLinks.tiktok, external: true, cta: "Watch latest reels" },
  { key: "private", label: "Private Films", meta: "On request", copy: "A private preview of complete wedding films, shaped for your day.", href: "#book", external: false, cta: "Request a film preview" },
] as const;

type FilmChannelKey = (typeof filmChannels)[number]["key"];

const Calendar = dynamic(
  () => import("@/components/ui/calendar").then((module) => module.Calendar),
  { ssr: false },
);

const portfolioCategories = ["Weddings", "Cinematic", "Portraits", "Events", "Corporate", "Travel", "Aerial", "Documentary"] as const;
type PortfolioCategory = (typeof portfolioCategories)[number];

const portfolioItems: Array<{
  src: string;
  title: string;
  category: string;
  categories: PortfolioCategory[];
  ratio: string;
}> = [
  { src: "/images/shanzae/wedding-story-03.jpg", title: "A quiet glance before the room fills", category: "Wedding", categories: ["Weddings", "Cinematic", "Documentary"], ratio: "aspect-[4/5]" },
  { src: "/images/shanzae/still-frame-story-01.jpg", title: "The pause before the ceremony", category: "Bridal portrait", categories: ["Weddings", "Portraits", "Cinematic"], ratio: "aspect-[3/4]" },
  { src: "/images/shanzae/wedding-story-01.jpg", title: "Held in the smallest details", category: "Wedding", categories: ["Weddings", "Documentary"], ratio: "aspect-square" },
  { src: "/images/shanzae/shanzae-faisal-mosque-wedding.jpeg", title: "A new chapter beneath the minarets", category: "Wedding", categories: ["Weddings", "Portraits", "Travel"], ratio: "aspect-[4/5]" },
  { src: "/images/shanzae/wedding-story-04.jpg", title: "A celebration in full colour", category: "Wedding", categories: ["Weddings", "Events", "Cinematic"], ratio: "aspect-[3/4]" },
  { src: "/images/shanzae/still-frame-story-02.jpg", title: "When the families become one frame", category: "Ceremony", categories: ["Weddings", "Events", "Cinematic", "Documentary"], ratio: "aspect-[3/2]" },
  { src: "/images/shanzae/wedding-story-05.jpg", title: "Light, laughter, and the long table", category: "Wedding", categories: ["Weddings", "Events", "Documentary"], ratio: "aspect-[4/5]" },
  { src: "/images/shanzae/shanzae-portrait-story.jpeg", title: "A portrait with a sense of place", category: "Portrait", categories: ["Portraits", "Corporate", "Travel"], ratio: "aspect-[4/5]" },
  { src: "/images/shanzae/wedding-story-02.jpg", title: "The first turn on the dance floor", category: "Wedding", categories: ["Weddings", "Events", "Cinematic"], ratio: "aspect-[2/3]" },
  { src: "/images/shanzae/still-frame-studio-portrait.jpg", title: "The observer and the instrument", category: "Studio portrait", categories: ["Portraits", "Corporate", "Documentary"], ratio: "aspect-square" },
  { src: "/images/shanzae/wedding-story-06.jpg", title: "A moment worth coming back to", category: "Wedding", categories: ["Weddings", "Events", "Documentary"], ratio: "aspect-[4/5]" },
];

const services = [
  { title: "Wedding Photography", detail: "Ceremonies & celebrations", description: "From the smallest details to the biggest celebrations, your day is captured naturally and creatively." },
  { title: "Cinematic Photography & Videography", detail: "Motion & atmosphere", description: "Carefully captured footage, emotional highlights, and creative visual direction turn memories into cinematic stories." },
  { title: "Portrait Photography", detail: "Personal & professional", description: "Professional and personal portrait sessions designed to capture your personality, expressions, and individual style." },
  { title: "Travel Photography", detail: "Place & passing light", description: "Exploring places, people, cultures, and experiences through photography and visual storytelling." },
  { title: "Corporate Photography", detail: "Teams & occasions", description: "Professional photography and video coverage for businesses, corporate events, campaigns, and professional projects." },
  { title: "Content Creation", detail: "Campaigns & digital platforms", description: "Visual content designed for brands, social media, campaigns, and digital platforms." },
  { title: "Aerial Photography", detail: "A different perspective", description: "Capture locations, venues, events, and large-scale moments from a different perspective with aerial photography." },
  { title: "Documentary Photography", detail: "Real people & experiences", description: "Authentic visual storytelling focused on real people, real moments, and real experiences." },
];

const packages = [
  {
    name: "One Day",
    price: "Rs. 45,000/-",
    duration: "For one considered celebration",
    includes: ["1 photographer", "Indoor coverage", "Outdoor shoot", "1 videographer", "Cinematic highlights", "Couple title song", "Unlimited pictures", "Raw data", "50 edited pictures", "1 album"],
  },
  {
    name: "Two Day",
    price: "Rs. 85,000/-",
    duration: "For the whole unfolding story",
    includes: ["1 photographer — 2 days", "Indoor coverage", "Outdoor shoot", "1 videographer — 2 days", "Drone coverage — 1 day", "Cinematic highlights", "Couple title song", "Unlimited pictures", "50 edited pictures", "Raw data", "1 album"],
    signature: true,
  },
  {
    name: "Three Day",
    price: "Rs. 135,000/-",
    duration: "For an expansive family archive",
    includes: ["1 photographer — 3 days", "Indoor coverage", "Outdoor shoot", "1 videographer — 3 days", "Drone coverage — 2 days", "Cinematic highlights", "Couple title song", "Unlimited pictures", "50 edited pictures", "Raw data", "2 albums"],
  },
];

const whyChoose = [
  { title: "Experience", copy: "With 3+ years of photography experience and 800+ wedding shoots, every project is approached with planning, creativity, and attention to detail." },
  { title: "Complete Coverage", copy: "From photography and videography to cinematic highlights, drone coverage, edited photographs, raw data, and albums, wedding packages provide complete event coverage." },
  { title: "Story-Driven Photography", copy: "The focus goes beyond posed photographs. Real emotions, relationships, details, and memorable moments become part of your final story." },
  { title: "Professional Approach", copy: "Every shoot is handled with attention to timing, communication, composition, and the overall client experience." },
];

const processNotes = [
  { number: "01", title: "Tell me the shape of the day", copy: "A short note about the occasion, people, and feeling you want to remember is enough to begin." },
  { number: "02", title: "Make room for the real thing", copy: "Direction is clear and unobtrusive, giving the day space to stay recognisably yours." },
  { number: "03", title: "Return to the frame", copy: "Images and films are edited as an archive—made for today and for the future you will revisit." },
];

const testimonials = [
  { name: "Ayesha Malik", quote: "Shanzae is an incredibly talented photographer. Her attention to detail and creative eye make her the perfect choice for capturing special moments." },
  { name: "Fatima Khan", quote: "I hired Shanzae for my wedding photography, and I couldn't be happier with the results. She made us feel comfortable and captured every moment beautifully." },
  { name: "Sana Ahmed", quote: "Shanzae is not only a skilled photographer but also a pleasure to work with. Her professionalism and dedication shine through in every shot." },
  { name: "Zainab Hussain", quote: "I recently had a newborn photoshoot with Shanzae, and I'm amazed at how she managed to capture the innocence and sweetness of my baby." },
  { name: "Aisha Ali", quote: "Shanzae has a remarkable ability to capture the emotions of the moment in her photographs. Her work speaks volumes about her talent and dedication." },
  { name: "Nimra Shah", quote: "I've had the pleasure of working with Shanzae on multiple occasions, and each time she delivers exceptional results. She truly has a gift for photography." },
  { name: "Hira Mahmood", quote: "If you're looking for a photographer who will go above and beyond to capture the essence of your special day, Shanzae is simply outstanding." },
  { name: "Mariam Ali", quote: "Shanzae's professionalism and creativity shine through in every photograph she takes. She has a unique ability to make even the simplest moments look extraordinary." },
  { name: "Sadia Khan", quote: "I highly recommend Shanzae for any photography needs. Her passion for her craft is evident in the stunning images she produces." },
  { name: "Ayesha Siddiqui", quote: "Shanzae has a natural talent for capturing the beauty of life through her lens. Her photographs are not just pictures, but stories waiting to be told." },
  { name: "Amna Haider", quote: "Working with Shanzae was an absolute pleasure. She has a calming presence that puts her subjects at ease, resulting in beautiful, natural-looking photographs." },
  { name: "Hafsa Raza", quote: "I couldn't be happier with the photos Shanzae took of my family. She managed to capture the love and connection between us in a way that exceeded my expectations." },
  { name: "Mehwish Khan", quote: "Shanzae's dedication to her craft is inspiring. She pours her heart and soul into every shoot, ensuring that her clients receive nothing but the best." },
  { name: "Saima Ali", quote: "I've had the pleasure of attending one of Shanzae's photography workshops, and it was a transformative experience. She is not only a talented photographer but also an excellent teacher." },
  { name: "Aiza Butt", quote: "Shanzae has a keen eye for detail that sets her apart from other photographers. She knows how to capture the little moments that make life beautiful." },
  { name: "Nazia Khan", quote: "I'm constantly amazed by Shanzae's ability to capture the essence of a moment in her photographs. She has a rare gift for storytelling through her lens." },
  { name: "Sarah Hussain", quote: "Shanzae's photographs have a magical quality to them. She has a way of making ordinary moments look extraordinary." },
  { name: "Bushra Ahmed", quote: "Shanzae's passion for photography shines through in every image she captures. Her love for her craft is evident in the breathtaking photographs she produces." },
  { name: "Nadia Akhtar", quote: "I hired Shanzae for my daughter's birthday party, and I couldn't have made a better choice. She captured the joy and excitement of the day perfectly." },
  { name: "Hina Iqbal", quote: "Shanzae has a gift for capturing the beauty of nature in her photographs. Her landscape shots are nothing short of stunning." },
];

const faqGroups = ["General", "Wedding Packages", "Coverage & Delivery", "Booking & Support"] as const;

const faqs = [
  { group: "General", q: "What types of photography do you offer?", a: "The studio works across wedding, portrait, cinematic, travel, corporate, event, aerial, documentary, and brand-content photography." },
  { group: "General", q: "Do you provide both photography and videography?", a: "Yes. Wedding packages include photography and videography coverage, with cinematic highlights and services tailored to the selected package." },
  { group: "Wedding Packages", q: "Do you offer wedding photography packages?", a: "Yes. Three wedding packages are currently available: One Day, Two Day, and Three Day." },
  { group: "Wedding Packages", q: "What is the price of the One Day wedding package?", a: "The One Day package is Rs. 45,000/-." },
  { group: "Wedding Packages", q: "What is included in the Two Day package?", a: "Two days of photography and videography, one day of drone coverage, cinematic highlights, a couple title song, unlimited pictures, 50 edited pictures, raw data, and one album." },
  { group: "Wedding Packages", q: "What is included in the Three Day package?", a: "Three days of photography and videography, two days of drone coverage, cinematic highlights, a couple title song, unlimited pictures, 50 edited pictures, raw data, and two albums." },
  { group: "Coverage & Delivery", q: "Do you provide raw photographs?", a: "Yes. Raw data is included in all three wedding packages." },
  { group: "Coverage & Delivery", q: "Do you provide edited photographs?", a: "Yes. Each wedding package includes 50 edited pictures." },
  { group: "Coverage & Delivery", q: "Do you provide albums?", a: "Yes. The One Day and Two Day packages include one album, while the Three Day package includes two albums." },
  { group: "Coverage & Delivery", q: "Is drone coverage available?", a: "Drone coverage is included for one day in the Two Day package and two days in the Three Day package. It is not included in the One Day package." },
  { group: "Booking & Support", q: "How do I book a photography session?", a: "Use the booking form below to share your name, location, contact details, preferred date and time, and the kind of story you would like to create." },
] as const;

const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  location: z.string().min(2, "Please share the shoot location."),
  date: z.date(),
  time: z.enum(["morning", "afternoon", "evening"]),
  message: z.string().min(12, "Tell me a little more about the occasion."),
});

type BookingValues = z.infer<typeof bookingSchema>;

function BookingField({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-ui text-[0.6875rem] font-normal tracking-[0.1em] text-foreground/80 uppercase">
        {label}
      </Label>
      {children}
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  );
}

function PortfolioTile({ item, onOpen, reduceMotion }: { item: (typeof portfolioItems)[number]; onOpen: () => void; reduceMotion: boolean | null }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={reduceMotion ? false : { opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: EASE }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      className="image-frame group mb-3 block w-full overflow-hidden bg-card text-left focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Open ${item.title}`}
    >
      <div className={cn("relative overflow-hidden bg-card", item.ratio)}>
        <EditorialImage
          src={item.src}
          alt={`Shanzae Zia photography — ${item.title}`}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center border border-background/65 bg-foreground/20 text-background opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 -translate-y-2">
          <ArrowUpRight size={15} strokeWidth={1.6} />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background/90 via-background/25 to-transparent px-4 pb-4 pt-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <p className="section-label text-foreground/65">{item.category}</p>
          <div className="mt-2 flex items-end justify-between gap-3"><p className="font-display text-base leading-snug text-foreground">{item.title}</p><span className="shrink-0 font-ui text-[0.57rem] font-bold tracking-[0.12em] text-primary uppercase">View frame</span></div>
        </div>
      </div>
    </motion.button>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activePortfolioCategory, setActivePortfolioCategory] = useState<PortfolioCategory>("Weddings");
  const [activeImage, setActiveImage] = useState<(typeof portfolioItems)[number] | null>(null);
  const [lightboxDirection, setLightboxDirection] = useState<1 | -1>(1);
  const lightboxTouchStart = useRef<{ x: number; y: number } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaqGroup, setActiveFaqGroup] = useState<(typeof faqGroups)[number]>("General");
  const [activeFilmChannel, setActiveFilmChannel] = useState<FilmChannelKey>("public");
  const activeChannel = filmChannels.find((channel) => channel.key === activeFilmChannel) ?? filmChannels[0];
  const filmSectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: filmSectionRef, offset: ["start end", "end start"] });
  const filmParallax = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const reduceMotion = useReducedMotion();
  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: "", email: "", phone: "", location: "", time: "morning", message: "" },
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section:not([data-static-motion])"));
    if (reduceMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => { section.dataset.sectionVisible = "true"; });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.sectionVisible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [reduceMotion]);

  const submitBooking = async (_values: BookingValues) => {
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    toast.success("Your details are ready to send.", {
      description: "Connect this static form to your preferred inbox before accepting live enquiries.",
    });
    form.reset({ name: "", email: "", phone: "", location: "", time: "morning", message: "" });
  };

  const navItems = [
    ["Home", "#top"],
    ["About", "#about"],
    ["Services", "#services"],
    ["Portfolio", "#work"],
    ["Packages", "#packages"],
    ["Testimonials", "#testimonials"],
    ["Book a Call", "#book"],
  ] as const;
  const visibleFaqs = faqs.filter((faq) => faq.group === activeFaqGroup);
  const filteredPortfolioItems = portfolioItems.filter((item) => item.categories.includes(activePortfolioCategory));
  const activeImageIndex = activeImage ? filteredPortfolioItems.findIndex((item) => item.src === activeImage.src) : -1;

  const moveLightbox = (direction: 1 | -1) => {
    if (activeImageIndex < 0) return;
    const nextIndex = (activeImageIndex + direction + filteredPortfolioItems.length) % filteredPortfolioItems.length;
    setLightboxDirection(direction);
    setActiveImage(filteredPortfolioItems[nextIndex]);
  };

  const handleLightboxTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    lightboxTouchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const handleLightboxTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = lightboxTouchStart.current;
    const touch = event.changedTouches[0];
    lightboxTouchStart.current = null;
    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 56 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
    moveLightbox(deltaX < 0 ? 1 : -1);
  };

  useEffect(() => {
    if (!activeImage) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveLightbox(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveLightbox(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, activeImageIndex]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <CustomCursor />
      <GrainOverlay />

      <header
        className={cn(
          "editorial-dark fixed inset-x-0 top-0 z-40 border-b border-border transition-all duration-300",
          scrolled ? "bg-background/95 backdrop-blur-md" : "bg-background/90",
        )}
      >
        <div className="editorial-shell flex h-[5.25rem] items-center justify-between">
          <a href="#top" className="flex items-center focus-visible:ring-2 focus-visible:ring-foreground/50" aria-label="Shanzae Zia home">
            <img src="/images/shanzae/shanzae-supplied-logo.png" alt="Shanzae Zia Photography" className="h-14 w-auto rounded-xl bg-transparent object-contain p-1" />
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="font-ui text-[0.75rem] font-medium tracking-[0.055em] text-foreground/70 uppercase transition-colors duration-200 hover:text-primary hover:underline hover:decoration-primary hover:underline-offset-4">
                {label}
              </a>
            ))}
          </nav>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-none text-foreground hover:bg-foreground/5 lg:hidden" aria-label="Open navigation">
                <Menu size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-l border-border bg-background p-0 text-foreground sm:max-w-md">
              <div className="flex h-[5.25rem] items-center justify-between border-b border-border px-8">
                <span className="font-ui text-[0.8125rem] font-medium tracking-[0.12em] uppercase">Shanzae Zia</span>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-none text-foreground hover:bg-foreground/5" aria-label="Close navigation">
                    <X size={21} />
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col px-8 pt-10" aria-label="Mobile navigation">
                {navItems.map(([label, href], index) => (
                  <SheetClose asChild key={href}>
                    <a href={href} className="border-b border-border py-5 font-display text-3xl font-semibold tracking-[-0.04em] text-foreground transition-colors hover:text-primary" style={{ transitionDelay: `${index * 40}ms` }}>
                      {label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="absolute bottom-8 left-8 right-8 border-t border-border pt-6">
                <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-ui text-[0.6875rem] tracking-[0.1em] text-muted-foreground uppercase hover:text-foreground">
                  <FaWhatsapp size={16} /> WhatsApp booking
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main id="top">
        <section data-static-motion className="editorial-dark hero-grid relative min-h-[790px] overflow-hidden bg-background text-foreground" aria-labelledby="hero-heading">
          <div className="editorial-shell relative flex min-h-[100svh] flex-col justify-center pb-10 pt-28 lg:pt-32">
            <div className="flex items-end">
              <motion.p initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1, ease: EASE }} className="font-ui text-[0.6875rem] font-semibold tracking-[0.12em] text-primary uppercase">
                Wedding Photographer • Videographer • Visual Storyteller
              </motion.p>
            </div>
            <h1 id="hero-heading" aria-label="Capturing Your Moments. Telling Your Story." className="mt-8 max-w-[13ch] font-display text-[clamp(2.5rem,7.1vw,6.75rem)] font-medium leading-[1.1] tracking-[-0.012em] text-foreground sm:mt-10">
              <span className="block">Capturing Your</span>
              <span className="block"><span className="text-primary">Moments.</span> Telling</span>
              <span className="block">Your Story.</span>
            </h1>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.76, ease: EASE }} className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
                <Button asChild className="group h-auto min-h-15 justify-between rounded-[0.65rem] bg-primary px-4 py-3.5 text-left font-ui text-primary-foreground shadow-[0_16px_32px_-16px_oklch(0.14_0.003_80/0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_20px_36px_-16px_oklch(0.14_0.003_80/0.68)] sm:min-w-60 sm:px-5">
                  <a href="#book"><span className="flex flex-col gap-0.5"><span className="text-[0.75rem] font-bold tracking-[0.1em] uppercase">Plan your day</span><span className="text-[0.625rem] font-medium tracking-[0.075em] text-primary-foreground/75 uppercase">Start an enquiry</span></span><span className="ml-6 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight size={16} /></span></a>
                </Button>
                <Button asChild variant="outline" className="group h-auto min-h-15 justify-between rounded-[0.65rem] border-foreground/20 bg-background px-4 py-3.5 text-left font-ui text-foreground shadow-[0_12px_26px_-22px_oklch(0.15_0.01_285/0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5 sm:min-w-60 sm:px-5">
                  <a href="#work"><span className="flex flex-col gap-0.5"><span className="text-[0.75rem] font-bold tracking-[0.1em] uppercase">See the stories</span><span className="text-[0.625rem] font-medium tracking-[0.075em] text-muted-foreground uppercase">Explore selected work</span></span><ArrowDown size={17} className="ml-6 shrink-0 text-primary transition-transform duration-300 group-hover:translate-y-1" /></a>
                </Button>
              </div>
              <p className="max-w-xs font-ui text-[0.625rem] font-medium leading-5 tracking-[0.1em] text-muted-foreground uppercase sm:pb-1 sm:text-right">Islamabad based · available across Pakistan</p>
            </motion.div>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.85, delay: 0.56, ease: EASE }} className="relative mt-8 sm:mt-10">
              <div aria-hidden="true" className="pointer-events-none absolute -inset-x-8 top-[18%] h-[70%] rounded-full bg-primary/25 blur-[80px] sm:-inset-x-16 sm:blur-[100px]" />
              <figure className="image-frame group relative z-10 overflow-hidden border border-primary/30 bg-card shadow-[0_32px_88px_-34px_oklch(0.8_0.05_75/0.42)]">
                <div className="aspect-[1.6/1] min-h-80 overflow-hidden"><EditorialImage src="/images/shanzae/shanzae-hero-modern-warm-glow.png" alt="Modern cinematic wedding ceremony photography by Shanzae Zia" priority sizes="(min-width: 1280px) 1150px, (min-width: 768px) 88vw, 100vw" className="h-full w-full object-cover object-center" /><div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/15 to-transparent" /><div className="absolute inset-0 z-10 ring-1 ring-inset ring-primary/20" /></div>
                <figcaption className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-between gap-4 p-4 text-secondary-foreground sm:flex-row sm:items-end sm:p-7"><div><p className="font-ui text-[0.625rem] font-medium leading-[1.4] tracking-[0.09em] text-primary uppercase sm:tracking-[0.12em]">Islamabad · wedding & cinematic photography</p><p className="mt-2 max-w-xl text-[0.8125rem] font-light leading-5 text-secondary-foreground/88 sm:text-sm sm:leading-6">From wedding celebrations and intimate portraits to cinematic films and unforgettable events, Shanzae Zia creates photographs and films that preserve the moments you want to remember.</p></div><p className="hidden shrink-0 font-ui text-[0.625rem] font-medium tracking-[0.12em] text-secondary-foreground/65 uppercase sm:block">Photo & film · 2026</p></figcaption>
              </figure>
            </motion.div>
            <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={reduceMotion ? undefined : { opacity: 1 }} transition={{ duration: 0.55, delay: 0.95, ease: EASE }} className="mt-5 flex items-center justify-between"><p className="font-ui text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">Shanzae Zia · 2026</p><motion.a href="#work" aria-label="Scroll to selected work" animate={reduceMotion ? undefined : { x: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="inline-flex items-center gap-2 font-ui text-[0.625rem] tracking-[0.1em] text-foreground uppercase">Scroll to work <ArrowDown size={14} /></motion.a></motion.div>
          </div>
        </section>

        <section className="border-b border-border py-16 md:py-20" aria-label="Studio milestones">
          <div className="editorial-shell grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-border">
            {[ ["800+", "Wedding shoots"], ["1000+", "Projects completed"], ["3+", "Years of experience"], ["1000+", "Happy clients"] ].map(([value, label], index) => (
              <div key={label} className={cn("px-0 md:px-8", index === 0 && "md:pl-0")}>
                <p className="font-display text-4xl text-foreground md:text-5xl">{value}</p>
                <p className="mt-2 font-ui text-[0.6875rem] font-light tracking-[0.1em] text-muted-foreground uppercase">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="editorial-dark py-16 md:py-24" aria-labelledby="work-heading">
          <div className="editorial-shell">
            <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
              <div>
                <p className="section-label">Featured work</p>
                <h2 id="work-heading" className="mt-5 max-w-2xl font-display text-4xl leading-tight md:text-6xl">Stories I&apos;ve captured.</h2>
              </div>
              <p className="max-w-sm text-sm font-light leading-7 text-foreground/70">Every photograph tells a story. Explore selected wedding celebrations, portraits, cinematic moments, events, travel experiences, and creative projects.</p>
            </div>
            <div role="tablist" aria-label="Filter portfolio by category" className="mb-8 -mx-1 flex max-w-full gap-1 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {portfolioCategories.map((category) => {
                const isActive = activePortfolioCategory === category;
                return <button key={category} id={`portfolio-tab-${category.toLowerCase()}`} type="button" role="tab" aria-selected={isActive} aria-controls="portfolio-gallery" onClick={() => { setActivePortfolioCategory(category); setActiveImage(null); }} className={cn("shrink-0 px-3.5 py-3 font-ui text-[0.625rem] font-medium tracking-[0.08em] uppercase transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background", isActive ? "bg-primary text-primary-foreground" : "text-foreground/45 hover:bg-foreground/5 hover:text-foreground")}>{category}</button>;
              })}
            </div>
            <div id="portfolio-gallery" role="tabpanel" aria-labelledby={`portfolio-tab-${activePortfolioCategory.toLowerCase()}`} aria-live="polite">
              {filteredPortfolioItems.length > 0 ? <FocusCards key={activePortfolioCategory} className="columns-1 gap-3 sm:columns-2 lg:columns-3">
                {filteredPortfolioItems.map((item) => <PortfolioTile key={item.src} item={item} onOpen={() => { setLightboxDirection(1); setActiveImage(item); }} reduceMotion={reduceMotion} />)}
              </FocusCards> : <div className="flex min-h-72 flex-col items-start justify-end border border-border bg-foreground/[0.03] p-6 md:p-8"><p className="section-label">{activePortfolioCategory}</p><p className="mt-4 max-w-md font-display text-3xl leading-tight text-foreground">Aerial stories are being prepared.</p><p className="mt-3 max-w-md text-sm font-light leading-6 text-muted-foreground">No aerial photograph is currently included in this selected portfolio. This gallery only shows work that belongs to the chosen category.</p></div>}
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-border py-16 md:py-24" aria-labelledby="about-heading">
          <div className="editorial-shell grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1fr)] lg:gap-20">
            <motion.div initial={reduceMotion ? false : { opacity: 0, x: -24 }} whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: EASE }} className="image-frame group relative aspect-square overflow-hidden bg-card">
              <EditorialImage src="/images/shanzae/shanzae-profile.jpg" alt="Shanzae Zia, photographer and visual storyteller" className="h-full w-full object-cover object-center" />
              <div className="absolute bottom-0 left-0 bg-background/90 px-4 py-3 backdrop-blur-sm"><p className="section-label text-foreground/70" style={{ paddingLeft: "21px", paddingTop: "6px" }}>Shanzae Zia · Behind the frame</p></div>
            </motion.div>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, ease: EASE }} className="self-center">
              <p className="section-label">About me</p>
              <h2 id="about-heading" className="mt-5 font-display text-4xl leading-tight md:text-5xl">Meet Shanzae Zia.</h2>
              <p className="mt-4 font-display text-xl leading-8 text-foreground/75">شانزۓ ضیاء ارمغان</p><p className="mt-2 font-ui text-[0.625rem] tracking-[0.1em] text-muted-foreground uppercase">Marketing Head · Wedding Photographer · Corporate · Blogger · Traveler</p>
              <p className="mt-6 text-base font-light leading-8 text-foreground/80">I&apos;m Shanzae Zia, a photographer and visual storyteller passionate about capturing real emotions, meaningful moments, and unforgettable experiences.</p>
              <p className="mt-5 text-base font-light leading-8 text-foreground/75">My work covers weddings, cinematic photography, portraits, travel, corporate projects, content creation, aerial photography, and documentary storytelling.</p>
              <TextRevealCard className="mt-8 font-display text-xl italic leading-9 text-muted-foreground md:text-2xl">Photography for me is about more than taking pictures. It&apos;s about preserving emotions, details, people, and moments that you can return to years later.</TextRevealCard>
              <p className="mt-5 max-w-xl text-base font-light leading-8 text-foreground/75">Whether it&apos;s your wedding day, a family celebration, a personal portrait session, or a professional project, my goal is to create visual memories that feel authentic and personal to you.</p>
              <Button asChild variant="outline" className="outline-button mt-8 h-auto"><a href="#book">Let&apos;s create something meaningful <ArrowUpRight size={15} /></a></Button>
            </motion.div>
          </div>
        </section>

        <section id="services" className="border-t border-border py-16 md:py-24" aria-labelledby="services-heading">
          <div className="editorial-shell">
            <div className="max-w-2xl">
              <p className="section-label">Photography & visual storytelling</p>
              <h2 id="services-heading" className="mt-5 font-display text-4xl leading-tight md:text-6xl">Photography & visual storytelling.</h2>
            </div>
            <div className="mt-12 border-t border-border md:mt-16">
              {services.map((service, index) => (
                <motion.div key={service.title} initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-7 md:grid-cols-[4.5rem_minmax(12rem,0.8fr)_minmax(13rem,1.2fr)] md:gap-8 md:py-8">
                  <p className="section-label pt-1">{String(index + 1).padStart(2, "0")}</p>
                  <div><h3 className="font-display text-2xl leading-tight text-foreground md:text-3xl">{service.title}</h3><p className="mt-2 font-ui text-[0.625rem] tracking-[0.1em] text-muted-foreground uppercase">{service.detail}</p></div>
                  <p className="max-w-md text-sm font-light leading-7 text-foreground/70">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-16 md:py-24" aria-label="A photographic interruption">
          <div className="editorial-shell grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <div className="grid grid-cols-[1.15fr_0.85fr] gap-3">
              <div className="image-frame group relative aspect-[4/5] overflow-hidden bg-card"><EditorialImage src="/images/shanzae/still-frame-story-02.jpg" alt="Cinematic wedding ceremony captured in black and white" className="h-full w-full object-cover" /></div>
              <div className="image-frame group mt-12 aspect-[3/4] overflow-hidden bg-card lg:mt-20"><EditorialImage src="/images/shanzae/wedding-story-05.jpg" alt="Shanzae Zia wedding photography detail" className="h-full w-full object-cover" /></div>
            </div>
            <div className="flex flex-col justify-end pb-3 lg:pb-10"><p className="section-label">A note on the work</p><h2 className="mt-5 font-display text-4xl italic leading-tight md:text-5xl">More than a posed beginning.</h2><p className="mt-6 max-w-md text-base font-light leading-8 text-foreground/75">The best photographs tend to happen in the edges: in the morning’s quiet, in a room changing hands, in the glance made only when no one is looking.</p><div className="mt-8 flex items-center gap-4"><div className="film-rule" /><p className="section-label text-foreground/60">Available across Pakistan</p></div></div>
          </div>
        </section>

        <section id="packages" className="border-t border-border py-16 md:py-24" aria-labelledby="packages-heading">
          <div className="editorial-shell">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
              <div className="lg:pt-2">
                <p className="section-label">Wedding photography packages</p>
                <h2 id="packages-heading" className="mt-5 max-w-xl font-display text-4xl italic leading-[0.98] md:text-6xl">Choose your wedding package.</h2>
              </div>
              <p className="max-w-md self-end text-base font-light leading-8 text-foreground/70">Every wedding is different. Choose the package that fits your celebration and coverage requirements.</p>
            </div>
            <div className="mt-12 border-t border-border md:mt-16">
              {packages.map((item, index) => (
                <motion.article key={item.name} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }} className={cn("group relative grid grid-cols-1 gap-8 border-b border-border px-5 py-8 transition-colors duration-300 sm:px-8 md:gap-10 md:py-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-10 lg:py-12", item.signature ? "editorial-dark bg-background text-foreground" : "bg-background hover:bg-muted/35")}>
                  <div className="flex flex-col justify-between gap-7">
                    <div>
                      <div className="flex items-center justify-between gap-4"><p className={cn("font-ui text-[0.625rem] font-medium tracking-[0.16em] uppercase", item.signature ? "text-primary" : "text-muted-foreground")}>0{index + 1} / {item.name}</p>{item.signature ? <span className="border border-primary/70 px-2.5 py-1 font-ui text-[0.5625rem] font-medium tracking-[0.12em] text-primary uppercase">Most chosen</span> : null}</div>
                      <h3 className={cn("mt-7 font-display text-4xl leading-none md:text-5xl", item.signature ? "text-foreground" : "text-foreground")}>{item.name}</h3>
                      <p className={cn("mt-3 max-w-xs text-sm font-light leading-6", item.signature ? "text-foreground/68" : "text-muted-foreground")}>{item.duration}</p>
                    </div>
                    <p className={cn("font-display text-3xl leading-none sm:text-4xl", item.signature ? "text-primary" : "text-foreground")}>{item.price}</p>
                  </div>
                  <div className="flex flex-col justify-between gap-8 lg:gap-10">
                    <ul className={cn("grid grid-cols-1 gap-x-8 gap-y-3 border-t pt-6 text-sm font-light leading-6 sm:grid-cols-2", item.signature ? "border-foreground/20 text-foreground/78" : "border-border text-foreground/72")}>
                      {item.includes.map((entry) => <li key={entry} className="flex gap-3"><Check size={15} className={cn("mt-1 shrink-0", item.signature ? "text-primary" : "text-foreground")} />{entry}</li>)}
                    </ul>
                    <div><Button asChild variant="outline" className={cn("group/button h-auto rounded-none px-0 py-0 font-ui text-[0.6875rem] font-medium tracking-[0.1em] uppercase", item.signature ? "border-0 text-primary hover:bg-transparent hover:text-foreground" : "border-0 text-foreground hover:bg-transparent hover:text-primary")}><a href="#book">Choose this plan <ArrowUpRight size={15} className="transition-transform duration-200 group-hover/button:translate-x-1 group-hover/button:-translate-y-1" /></a></Button></div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section data-static-motion className="relative overflow-hidden border-t border-border bg-background py-16 md:py-24" aria-labelledby="why-heading">
          <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full border-[28px] border-primary/10 sm:h-96 sm:w-96" />
          <div className="editorial-shell relative">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
              <div className="flex min-h-72 flex-col justify-end lg:pb-5">
                <p className="section-label">Why choose Shanzae</p>
                <h2 id="why-heading" className="mt-5 max-w-xl font-display text-4xl leading-[0.98] md:text-6xl">Your moments deserve to be remembered.</h2>
                <p className="mt-6 max-w-md text-sm font-light leading-7 text-foreground/70">A considered mix of planning, complete coverage, story-led direction, and a calm professional approach—designed around the way your day actually unfolds.</p>
              </div>
              <div>
                <motion.figure initial={reduceMotion ? false : { opacity: 0, x: 26 }} whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: EASE }} className="image-frame group relative aspect-[1.34/1] overflow-hidden bg-card shadow-[0_24px_54px_-38px_oklch(0.14_0.003_80/0.45)]"><EditorialImage src="/images/shanzae/wedding-story-04.jpg" alt="A vibrant wedding celebration photographed by Shanzae Zia" sizes="(min-width: 1024px) 52vw, 100vw" className="h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" /><figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-secondary-foreground md:p-6"><div><p className="font-display text-2xl leading-none md:text-3xl">Documented with care.</p><p className="mt-2 font-ui text-[0.625rem] font-medium tracking-[0.11em] text-primary uppercase">A visual story, not just coverage</p></div><ArrowUpRight size={18} className="mb-1 shrink-0 text-primary" /></figcaption></motion.figure>
                <div className="mt-3 divide-y divide-border border-y border-border">{whyChoose.slice(0, 2).map((item, index) => <div key={item.title} className="flex items-center justify-between gap-5 py-4"><div className="flex items-center gap-4"><span className="font-ui text-[0.625rem] tracking-[0.12em] text-primary">0{index + 1}</span><p className="font-display text-xl leading-none md:text-2xl">{item.title}</p></div><ArrowUpRight size={16} className="shrink-0 text-primary" /></div>)}</div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">{whyChoose.map((item, index) => <motion.article key={item.title} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }} className="border border-border bg-card p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-30px_oklch(0.14_0.003_80/0.42)]"><p className="font-ui text-[0.625rem] font-medium tracking-[0.13em] text-primary uppercase">0{index + 1}</p><h3 className="mt-5 font-display text-2xl leading-none text-foreground">{item.title}</h3><p className="mt-4 text-sm font-light leading-6 text-foreground/70">{item.copy}</p></motion.article>)}</div>
          </div>
        </section>

        <section data-static-motion className="relative overflow-hidden border-t border-border bg-background py-16 md:py-24" aria-labelledby="motion-heading">
          <div className="editorial-shell">
            <div className="flex items-end justify-between gap-6">
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-10 bg-primary" />
                <p className="section-label">Cinematic films</p>
              </div>
              <p className="hidden shrink-0 font-ui text-[0.625rem] font-medium tracking-[0.2em] text-muted-foreground uppercase sm:block">01 — 08 Films</p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-12 lg:items-start lg:gap-16">
              <div className="lg:col-span-4">
                <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: EASE }}>
                  <h2 id="motion-heading" className="max-w-md font-display text-[clamp(2.25rem,3.5vw,3.75rem)] font-medium leading-[0.98] text-foreground">Films made to be <em className="font-display italic">remembered.</em></h2>
                  <p className="mt-6 max-w-sm text-base font-light leading-8 text-foreground/75">Cinematic wedding films shaped around real moments, emotion, movement, and the atmosphere of the day.</p>
                </motion.div>

                <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.12, ease: EASE }} className="mt-10">
                  <p className="section-label">Browse the archive</p>
                  <ul className="mt-2 border-t border-border">
                    {filmChannels.map((channel, index) => {
                      const isActive = activeFilmChannel === channel.key;
                      return (
                        <li key={channel.key}>
                          <button type="button" onClick={() => setActiveFilmChannel(channel.key)} aria-pressed={isActive} className="group relative block w-full text-left focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                            {isActive ? <motion.span layoutId="film-channel-marker" aria-hidden="true" className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 bg-primary" transition={{ duration: 0.45, ease: EASE }} /> : null}
                            <span className="flex items-baseline gap-4 border-b border-border py-4 pl-5">
                              <span className="font-ui text-[0.625rem] font-medium tracking-[0.2em] text-muted-foreground">0{index + 1}</span>
                              <span className={cn("font-display text-2xl leading-none transition-colors duration-300 md:text-[1.75rem]", isActive ? "text-foreground" : "text-foreground/40 group-hover:text-foreground/75")}>{channel.label}</span>
                              <span className={cn("ml-auto font-ui text-[0.625rem] font-medium tracking-[0.14em] uppercase transition-colors duration-300", isActive ? "text-primary" : "text-muted-foreground")}>{channel.meta}</span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <p key={activeChannel.key} className="mt-5 max-w-sm text-sm font-light leading-7 text-foreground/70">{activeChannel.copy}</p>
                </motion.div>

                <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.22, ease: EASE }} className="mt-8">
                  <a key={activeChannel.key} href={activeChannel.href} target={activeChannel.external ? "_blank" : undefined} rel={activeChannel.external ? "noreferrer" : undefined} className="group inline-flex items-center gap-3 bg-primary px-5 py-3.5 font-ui text-[0.6875rem] font-medium tracking-[0.12em] text-primary-foreground uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                    {activeChannel.key === "public" ? <FaTiktok size={16} /> : <CirclePlay size={16} />}
                    <span>{activeChannel.cta}</span>
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </motion.div>
              </div>

              <div className="lg:col-span-8">
                <motion.div initial={reduceMotion ? false : { opacity: 0, y: 30 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.85, delay: 0.1, ease: EASE }}>
                  <figure ref={filmSectionRef} className="group relative overflow-hidden rounded-[1.25rem] bg-card shadow-[0_48px_100px_-56px_oklch(0.14_0.003_80/0.5)]">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <motion.div aria-hidden="true" style={reduceMotion ? undefined : { y: filmParallax }} className="absolute inset-0 scale-[1.12]">
                        <EditorialImage src="/images/shanzae/wedding-story-04.jpg" alt="Cinematic wedding celebration by Shanzae Zia" sizes="(min-width: 1280px) 68vw, (min-width: 768px) 60vw, 100vw" className="h-full w-full object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]" />
                      </motion.div>
                      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent" />
                      <div className="pointer-events-none absolute inset-0 z-10 bg-foreground/0 transition-colors duration-700 group-hover:bg-foreground/20" />
                      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-6 md:p-8">
                        <p className="font-ui text-[0.625rem] font-medium tracking-[0.16em] text-background/90 uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Shanzae Zia Films</p>
                        <p className="font-ui text-[0.625rem] font-medium tracking-[0.16em] text-background/80 uppercase">2026 Reel</p>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-5 p-6 md:p-8">
                        <div>
                          <p className="font-ui text-[0.625rem] font-medium tracking-[0.16em] text-primary uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Cinematic edit · Real moments</p>
                          <p className="mt-3 font-display text-3xl leading-none text-background drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] md:text-5xl">Wedding Highlights.</p>
                        </div>
                        <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" aria-label="Watch Shanzae Zia's latest TikTok reels" className="group/play relative z-30 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-background/60 bg-background/10 text-background backdrop-blur-sm transition-all duration-500 group-hover:scale-105 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-foreground md:h-[4.5rem] md:w-[4.5rem]">
                          <CirclePlay size={26} className="transition-transform duration-500 group-hover/play:scale-110" />
                          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full border border-background/40 transition-all duration-500 group-hover/play:scale-110 group-hover/play:border-transparent group-hover/play:opacity-0" />
                        </a>
                      </div>
                    </div>
                  </figure>
                </motion.div>

                <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }} className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-4">
                  {[["Featured film", "2026 Reel"], ["Category", "Wedding"], ["Location", "Islamabad"], ["Runtime", "03:42"]].map(([label, value]) => (
                    <div key={label}>
                      <p className="font-ui text-[0.5625rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">{label}</p>
                      <p className="mt-2 font-display text-lg leading-none text-foreground">{value}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="relative overflow-hidden bg-foreground py-16 text-background md:py-28" aria-labelledby="testimonials-heading">
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-background/10" /><div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-background/10" />
          <div className="editorial-shell relative"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="font-ui text-[0.625rem] tracking-[0.22em] text-background/55 uppercase">Client notes · 20 stories</p><h2 id="testimonials-heading" className="mt-5 font-display text-4xl italic leading-tight text-background md:text-6xl">What my clients say.</h2></div><p className="max-w-sm text-sm font-light leading-7 text-background/60">A living collection of kind words from weddings, family celebrations, newborn sessions, events, and photography workshops.</p></div>
            <motion.article initial={reduceMotion ? false : { opacity: 0, y: 30 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: EASE }} className="relative mt-12 grid overflow-hidden border border-background/25 bg-background/[0.055] md:mt-16 lg:grid-cols-[0.34fr_1fr]">
              <div className="relative flex min-h-60 flex-col justify-between border-b border-background/20 p-7 md:p-10 lg:min-h-[28rem] lg:border-b-0 lg:border-r"><Quote size={54} strokeWidth={0.8} className="text-primary" aria-hidden="true" /><div><p className="font-ui text-[0.625rem] tracking-[0.2em] text-background/55 uppercase">Featured note</p><p className="mt-3 font-display text-3xl italic text-background">{testimonials[0].name}</p><p className="mt-3 font-ui text-[0.625rem] tracking-[0.2em] text-primary uppercase">★★★★★</p></div><span className="absolute bottom-0 left-0 h-1 w-28 bg-primary" /></div>
              <div className="flex min-h-60 flex-col justify-between p-7 md:p-10 lg:min-h-[28rem] lg:p-14"><p className="max-w-4xl font-display text-[clamp(1.8rem,3.25vw,3.8rem)] italic leading-[1.16] tracking-[-0.03em] text-background">“{testimonials[0].quote}”</p><p className="mt-10 font-ui text-[0.625rem] tracking-[0.18em] text-background/45 uppercase">Shanzae Zia Photography · Client collection</p></div>
            </motion.article>
            <div className="mt-6"><div className="mb-4 flex items-center justify-between"><p className="font-ui text-[0.625rem] tracking-[0.18em] text-background/55 uppercase">More client notes</p><p className="hidden font-ui text-[0.625rem] tracking-[0.14em] text-background/45 uppercase sm:block">Swipe or scroll to explore</p></div><div className="-mr-4 overflow-x-auto pb-4 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-mr-8 md:pr-8"><div className="flex w-max gap-3">{testimonials.slice(1).map((testimonial, index) => <motion.article key={testimonial.name} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} whileHover={reduceMotion ? undefined : { y: -5 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: Math.min(index * 0.035, 0.24), ease: EASE }} className="flex min-h-80 w-[min(78vw,23rem)] flex-col justify-between border border-background/20 bg-background/[0.045] p-6 transition-colors hover:bg-background/[0.09] md:w-[25rem] md:p-7"><p className="font-display text-lg italic leading-8 text-background/85">“{testimonial.quote}”</p><div className="mt-7 flex items-end justify-between border-t border-background/15 pt-4"><div><p className="font-ui text-[0.625rem] tracking-[0.18em] text-primary uppercase">★★★★★</p><p className="mt-2 font-ui text-[0.6875rem] font-medium tracking-[0.14em] text-background uppercase">{testimonial.name}</p></div><span className="font-ui text-[0.625rem] tracking-[0.14em] text-background/35">{String(index + 2).padStart(2, "0")}</span></div></motion.article>)}</div></div></div>
            <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-background/20 pt-8 sm:flex-row sm:items-center"><div><p className="font-display text-2xl italic text-background">Want your story captured?</p><p className="mt-2 text-sm font-light text-background/60">Tell Shanzae about the day, the people, and the moments you want to remember.</p></div><Button asChild className="h-auto rounded-none bg-primary px-6 py-3 font-ui text-[0.75rem] font-medium tracking-[0.14em] text-primary-foreground uppercase hover:bg-primary/90"><a href="#book">Book your shoot <ArrowUpRight size={15} /></a></Button></div>
          </div>
        </section>

        <section className="border-t border-border py-16 md:py-24" aria-labelledby="process-heading">
          <div className="editorial-shell">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div><p className="section-label">The studio process</p><h2 id="process-heading" className="mt-5 font-display text-4xl leading-tight md:text-5xl">A calm way through a big day.</h2></div>
              <Quote size={32} strokeWidth={1} className="text-muted-foreground" aria-hidden="true" />
            </div>
            <div className="mt-12 grid grid-cols-1 border-t border-border md:mt-16 md:grid-cols-3">
              {processNotes.map((note, index) => (
                <div key={note.number} className={cn("py-8 md:px-8 md:py-10", index > 0 && "md:border-l md:border-border", index === 0 && "md:pl-0")}>
                  <p className="section-label">{note.number}</p>
                  <h3 className="mt-5 font-display text-2xl leading-tight">{note.title}</h3>
                  <p className="mt-4 max-w-sm text-sm font-light leading-7 text-foreground/70">{note.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary px-8 py-24 text-secondary-foreground md:px-16 md:py-32" aria-labelledby="cta-heading">
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <motion.figure initial={reduceMotion ? false : { opacity: 0, x: -28, rotate: -1.5 }} whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, rotate: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: EASE }} whileHover={reduceMotion ? undefined : { y: -4 }} className="image-frame group relative mx-auto w-full max-w-sm overflow-hidden border border-secondary-foreground/25 bg-foreground shadow-[0_20px_40px_-24px_oklch(0.08_0.03_170/0.9)] lg:mx-0 lg:max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden"><EditorialImage src="/images/shanzae/wedding-story-04.jpg" alt="Wedding celebration photographed by Shanzae Zia" className="h-full w-full object-cover object-center" /><div className="absolute inset-0 z-10 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" /></div>
            </motion.figure>
            <div><h2 id="cta-heading" className="font-display text-[clamp(3.2rem,6vw,5.5rem)] italic leading-[0.98] tracking-[-0.03em]">Your story happens once. Capture it forever.</h2><p className="mt-7 max-w-xl text-base font-light leading-8 text-secondary-foreground/70">From wedding celebrations to personal milestones, every moment deserves to be remembered. Let&apos;s create photographs and films that you will want to revisit for years to come.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild className="h-auto w-full rounded-none bg-primary px-10 py-4 font-ui text-[0.75rem] font-medium tracking-[0.15em] text-primary-foreground uppercase shadow-[0_16px_28px_-14px_oklch(0.12_0.03_170/0.9)] hover:bg-primary/90 sm:w-auto"><a href="#book">Book your shoot <ArrowDown size={15} /></a></Button><Button asChild variant="outline" className="h-auto w-full rounded-none border-secondary-foreground/45 bg-transparent px-10 py-4 font-ui text-[0.75rem] font-medium tracking-[0.15em] text-secondary-foreground uppercase hover:bg-secondary-foreground hover:text-secondary sm:w-auto"><a href="#work">View portfolio</a></Button></div></div>
          </div>
        </section>

        <section id="book" className="editorial-dark bg-background py-16 md:py-24" aria-labelledby="book-heading">
          <div className="editorial-shell grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div className="lg:pt-3"><p className="section-label">Book a call</p><h2 id="book-heading" className="mt-5 font-display text-4xl italic leading-tight text-primary md:text-6xl">Let&apos;s capture your story.</h2><p className="mt-6 max-w-sm text-base font-light leading-8 text-foreground/75">Planning a wedding, event, portrait session, or professional shoot? Tell me about your project and preferred date, and I&apos;ll get back to discuss your requirements and the right photography package.</p><div className="mt-8 max-w-sm border-t border-border pt-4"><p className="section-label mb-2">Get in touch</p><a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="contact-link"><FaWhatsapp size={18} className="text-primary" />Chat on WhatsApp with +92 309 5921582</a><a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="contact-link"><FaInstagram size={18} className="text-primary" />@shanzae.zia</a><p className="flex items-center gap-3 py-3 font-ui text-sm text-foreground"><MapPin size={18} className="text-primary" />Islamabad, Pakistan</p></div></div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitBooking)} className="grid grid-cols-1 gap-6 md:grid-cols-2" noValidate>
                <BookingField label="Name" id="name" error={form.formState.errors.name?.message}><Input id="name" {...form.register("name")} placeholder="Your name" aria-invalid={Boolean(form.formState.errors.name)} className="h-12 rounded-sm border-border bg-transparent font-ui text-sm placeholder:text-muted-foreground/70" /></BookingField>
                <BookingField label="Email" id="email" error={form.formState.errors.email?.message}><Input id="email" type="email" {...form.register("email")} placeholder="name@example.com" aria-invalid={Boolean(form.formState.errors.email)} className="h-12 rounded-sm border-border bg-transparent font-ui text-sm placeholder:text-muted-foreground/70" /></BookingField>
                <BookingField label="Phone" id="phone" error={form.formState.errors.phone?.message}><Input id="phone" {...form.register("phone")} placeholder="Your phone number" aria-invalid={Boolean(form.formState.errors.phone)} className="h-12 rounded-sm border-border bg-transparent font-ui text-sm placeholder:text-muted-foreground/70" /></BookingField>
                <BookingField label="Location" id="location" error={form.formState.errors.location?.message}><Input id="location" {...form.register("location")} placeholder="City or venue" aria-invalid={Boolean(form.formState.errors.location)} className="h-12 rounded-sm border-border bg-transparent font-ui text-sm placeholder:text-muted-foreground/70" /></BookingField>
                <BookingField label="Preferred date" id="date" error={form.formState.errors.date?.message}>
                  <Popover>
                    <PopoverTrigger asChild><Button id="date" type="button" variant="outline" className="flex h-12 w-full justify-start rounded-sm border-border bg-transparent px-3 font-ui text-sm font-normal text-foreground hover:bg-foreground/5"><CalendarDays size={16} className="mr-2 text-muted-foreground" />{form.watch("date") ? form.watch("date")?.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : <span className="text-muted-foreground">Choose a date</span>}</Button></PopoverTrigger>
                    <PopoverContent align="start" className="w-auto rounded-sm border-border bg-popover p-0 text-popover-foreground"><Calendar mode="single" selected={form.watch("date")} onSelect={(date) => { if (date) form.setValue("date", date, { shouldValidate: true }); }} disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} initialFocus /></PopoverContent>
                  </Popover>
                </BookingField>
                <BookingField label="Preferred time" id="time" error={form.formState.errors.time?.message}>
                  <Select value={form.watch("time")} onValueChange={(value) => form.setValue("time", value as BookingValues["time"], { shouldValidate: true })}>
                    <SelectTrigger id="time" className="h-12 rounded-sm border-border bg-transparent font-ui text-sm"><Clock3 size={16} className="mr-2 text-muted-foreground" /><SelectValue placeholder="Choose a time" /></SelectTrigger>
                    <SelectContent className="rounded-sm border-border bg-popover text-popover-foreground"><SelectItem value="morning">Morning</SelectItem><SelectItem value="afternoon">Afternoon</SelectItem><SelectItem value="evening">Evening</SelectItem></SelectContent>
                  </Select>
                </BookingField>
                <div className="md:col-span-2"><BookingField label="Message" id="message" error={form.formState.errors.message?.message}><Textarea id="message" {...form.register("message")} placeholder="Tell me about your event or photography requirements." aria-invalid={Boolean(form.formState.errors.message)} className="min-h-36 resize-y rounded-sm border-border bg-transparent font-ui text-sm leading-7 placeholder:text-muted-foreground/70" /></BookingField></div>
                <div className="md:col-span-2"><Button type="submit" disabled={form.formState.isSubmitting} className="primary-button h-auto w-full py-4 disabled:opacity-60">{form.formState.isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Preparing your note…</> : <><Send size={15} /> Book a call</>}</Button><p className="mt-4 text-center text-xs font-light leading-5 text-muted-foreground">This static preview validates your enquiry locally. Connect it to an inbox before accepting live submissions.</p></div>
              </form>
            </Form>
          </div>
        </section>

        <section className="border-t border-border bg-muted/35 py-20 md:py-28" aria-labelledby="faq-heading">
          <div className="editorial-shell max-w-7xl"><div className="mx-auto max-w-2xl text-center"><p className="font-ui text-[0.625rem] tracking-[0.2em] text-primary uppercase">FAQ</p><h2 id="faq-heading" className="mt-5 font-display text-4xl leading-tight md:text-6xl">Frequently asked questions.</h2><p className="mx-auto mt-5 max-w-xl text-base font-light leading-8 text-muted-foreground">A few clear answers about wedding coverage, packages, delivery, and booking. If there is anything else you need to know, send a message directly.</p></div>
            <div className="mt-12 overflow-hidden border border-border bg-background shadow-[0_28px_70px_-55px_oklch(0.22_0.024_42/0.75)] md:mt-16"><div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr]"><aside className="border-b border-border bg-muted/35 p-6 lg:border-b-0 lg:border-r lg:p-9"><p className="font-ui text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">Browse topics</p><div className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">{faqGroups.map((group) => <button key={group} type="button" aria-pressed={activeFaqGroup === group} onClick={() => setActiveFaqGroup(group)} className={cn("whitespace-nowrap px-3 py-3 text-left font-ui text-sm transition-colors", activeFaqGroup === group ? "bg-background font-medium text-foreground shadow-[0_7px_18px_-16px_oklch(0.22_0.024_42/0.8)]" : "text-muted-foreground hover:bg-background/60 hover:text-foreground")}>{group}</button>)}</div></aside>
              <div className="p-6 md:p-9"><p className="font-ui text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">{activeFaqGroup}</p><Accordion key={activeFaqGroup} type="single" collapsible defaultValue="item-1" className="mt-4 border-t border-border">{visibleFaqs.map((faq, index) => <AccordionItem value={`item-${index + 1}`} key={faq.q} className="border-border"><AccordionTrigger className="py-6 text-left font-ui text-base font-medium leading-7 text-foreground hover:no-underline">{faq.q}</AccordionTrigger><AccordionContent className="max-w-2xl pb-6 text-sm font-light leading-7 text-muted-foreground">{faq.a}</AccordionContent></AccordionItem>)}</Accordion><div className="mt-8 flex flex-col justify-between gap-4 bg-muted/55 p-5 sm:flex-row sm:items-center"><div><p className="font-ui text-sm font-medium text-foreground">Still have questions?</p><p className="mt-1 text-sm font-light text-muted-foreground">Chat with Shanzae directly about your date and coverage.</p></div><a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 border border-border bg-background px-4 py-3 font-ui text-[0.625rem] tracking-[0.14em] text-foreground uppercase transition-colors hover:border-primary hover:text-primary"><FaWhatsapp size={16} />Chat on WhatsApp</a></div></div></div></div>
          </div>
        </section>
      </main>

      <footer className="editorial-dark border-t border-border bg-background">
        <div className="editorial-shell py-12 md:py-16"><div className="grid grid-cols-1 gap-10 md:grid-cols-[1.7fr_0.8fr_0.9fr_0.85fr] md:gap-8"><div><a href="#top" className="inline-flex items-center"><img src="/images/shanzae/shanzae-supplied-logo.png" alt="Shanzae Zia Photography" className="h-28 w-auto rounded-xl bg-transparent object-contain p-1" /></a><p className="mt-6 max-w-sm text-sm font-light leading-6 text-muted-foreground">Wedding photography, cinematic videography, and visual storytelling for the occasions you want to remember clearly.</p><div className="mt-6 flex items-center gap-4"><a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Shanzae Zia on Instagram" className="text-muted-foreground transition-colors hover:text-primary"><FaInstagram size={18} /></a><a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp with +92 309 5921582" className="text-muted-foreground transition-colors hover:text-primary"><FaWhatsapp size={18} /></a><a href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Shanzae Zia on Facebook" className="text-muted-foreground transition-colors hover:text-primary"><FaFacebookF size={17} /></a><a href={socialLinks.tiktok} target="_blank" rel="noreferrer" aria-label="Shanzae Zia on TikTok" className="text-muted-foreground transition-colors hover:text-primary"><FaTiktok size={17} /></a></div></div>
          <div><p className="font-ui text-[0.6875rem] font-medium tracking-[0.04em] text-foreground">Explore</p><nav className="mt-5 flex flex-col items-start gap-3" aria-label="Footer navigation">{navItems.map(([label, href]) => <a key={href} href={href} className="text-sm font-light text-muted-foreground transition-colors hover:text-primary">{label}</a>)}</nav></div>
          <div><p className="font-ui text-[0.6875rem] font-medium tracking-[0.04em] text-foreground">Services</p><div className="mt-5 flex flex-col items-start gap-3">{services.slice(0, 4).map((service) => <a key={service.title} href="#services" className="text-sm font-light text-muted-foreground transition-colors hover:text-primary">{service.title}</a>)}</div></div>
          <div><p className="font-ui text-[0.6875rem] font-medium tracking-[0.04em] text-foreground">Connect</p><div className="mt-5 flex flex-col items-start gap-3"><a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="text-sm font-light text-muted-foreground transition-colors hover:text-primary">WhatsApp</a><a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="text-sm font-light text-muted-foreground transition-colors hover:text-primary">Instagram</a><a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="text-sm font-light text-muted-foreground transition-colors hover:text-primary">Facebook</a><a href={socialLinks.tiktok} target="_blank" rel="noreferrer" className="text-sm font-light text-muted-foreground transition-colors hover:text-primary">TikTok</a><span className="text-sm font-light text-muted-foreground">Islamabad, Pakistan</span></div></div></div><div className="mt-12 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs font-light text-muted-foreground sm:flex-row sm:items-center"><p>© 2024 Shanzae Zia. All rights reserved.</p><div className="flex flex-wrap gap-x-6 gap-y-2"><a href="#top" className="underline underline-offset-4 hover:text-primary">Privacy</a><a href="#book" className="underline underline-offset-4 hover:text-primary">Booking terms</a><a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-primary">Contact</a></div></div></div>
      </footer>

      <Dialog open={Boolean(activeImage)} onOpenChange={(open) => !open && setActiveImage(null)}>
        <DialogContent className="flex h-[100dvh] max-w-none flex-col justify-center rounded-none border-0 bg-background p-6 text-foreground sm:max-w-none md:p-12 [&>button]:right-6 [&>button]:top-6 [&>button]:rounded-none [&>button]:border [&>button]:border-foreground/35 [&>button]:p-2 [&>button]:text-foreground">
          <DialogTitle className="sr-only">{activeImage?.title ?? "Portfolio image"}</DialogTitle><DialogDescription className="sr-only">Expanded photograph from Shanzae Zia&apos;s selected portfolio. Swipe left or right on touch devices, or use the left and right arrow keys, to change images.</DialogDescription>
          {activeImage ? <><div className="image-frame relative mx-auto flex max-h-[76dvh] w-full max-w-6xl touch-pan-y items-center justify-center overflow-hidden bg-card" onTouchStart={handleLightboxTouchStart} onTouchEnd={handleLightboxTouchEnd}><motion.div key={activeImage.src} initial={reduceMotion ? false : { opacity: 0, x: lightboxDirection * 28 }} animate={reduceMotion ? undefined : { opacity: 1, x: 0 }} transition={{ duration: 0.28, ease: EASE }} className="flex max-h-[76dvh] w-full items-center justify-center"><EditorialImage key={activeImage.src} src={activeImage.src} alt={`Shanzae Zia photography — ${activeImage.title}`} sizes="(min-width: 1280px) 1152px, (min-width: 768px) 90vw, 100vw" className="max-h-[76dvh] w-auto max-w-full object-contain" /></motion.div><button type="button" onClick={() => moveLightbox(-1)} className="absolute left-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-foreground/35 bg-background/85 text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary sm:inline-flex" aria-label="Previous portfolio image"><ChevronLeft size={21} /></button><button type="button" onClick={() => moveLightbox(1)} className="absolute right-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-foreground/35 bg-background/85 text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary sm:inline-flex" aria-label="Next portfolio image"><ChevronRight size={21} /></button></div><div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-4 pt-5 sm:flex-row sm:items-center"><div><p className="section-label">{activeImage.category}</p><p className="mt-2 font-display text-xl italic">{activeImage.title}</p></div><div className="flex items-center gap-3"><button type="button" onClick={() => moveLightbox(-1)} className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary" aria-label="Previous portfolio image"><ChevronLeft size={19} /></button><p aria-live="polite" className="min-w-14 text-center font-ui text-[0.625rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">{String(activeImageIndex + 1).padStart(2, "0")} / {String(portfolioItems.length).padStart(2, "0")}</p><button type="button" onClick={() => moveLightbox(1)} className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary" aria-label="Next portfolio image"><ChevronRight size={19} /></button></div><p className="text-xs font-light tracking-[0.12em] text-muted-foreground uppercase">Swipe or use arrow keys</p></div></> : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
