import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Testimonial } from "@/components/ui/testimonial";

const testimonials = [
  {
    quote:
      "Three Star Estimating completely transformed our bidding process. Their certified estimators delivered detailed quantity surveys that helped us land a $12M commercial office project.",
    highlightedText: "Three Star Estimating",
    authorName: "Sarah Jenkins",
    authorPosition: "Director of Preconstruction, BuildCorp Structures",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face&q=80",
  },
  {
    quote:
      "Precision, speed, and accuracy. Their cost takeoff services are stellar. Every item was meticulously cataloged, making bid day completely stress-free.",
    highlightedText: "cost takeoff services",
    authorName: "Marcus Vance",
    authorPosition: "Founder & CEO, Vance Development Group",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&q=80",
  },
  {
    quote:
      "Their detailed material takeoff reports are incredibly accurate. They integrate seamlessly with our structural designs, helping keep clients on budget from day one.",
    highlightedText: "material takeoff reports",
    authorName: "Elena Rostova",
    authorPosition: "Lead Architect, Rostova & Partners",
    authorImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&q=80",
  },
  {
    quote:
      "If you are looking for the best contractor estimation support in the USA, look no further. Their certified team understands local labor rates and compliance standards, delivering bids we can always rely on.",
    highlightedText: "best contractor estimation support",
    authorName: "David Kim",
    authorPosition: "Senior Project Manager, Apex Commercial Builders",
    authorImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&q=80",
  },
];

const AUTOPLAY_DELAY = 3000;

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number, dir?: number) => {
      setDirection(dir ?? (index > current ? 1 : -1));
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => goTo((current + 1) % testimonials.length, 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    const timer = setTimeout(next, AUTOPLAY_DELAY);
    return () => clearTimeout(timer);
  }, [current, next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section
      id="testimonials"
      className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#151314]"
    >

      <div className="max-w-[1300px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="text-white font-medium text-sm tracking-wide font-poppins">
              - Client Reviews
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-extrabold leading-[1.15] text-white mb-6 font-poppins"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Testimonials
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base text-gray-400 font-poppins"
          >
            See how our precise cost takeoff and construction estimating
            services help general contractors win bids and secure projects
            nationwide.
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden min-h-[320px] flex items-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              className="w-full"
            >
              <Testimonial
                quote={testimonials[current].quote}
                highlightedText={testimonials[current].highlightedText}
                authorName={testimonials[current].authorName}
                authorPosition={testimonials[current].authorPosition}
                authorImage={testimonials[current].authorImage}
                className="py-4"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2.5 bg-gray-200"
                  : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
