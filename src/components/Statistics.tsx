import { motion, useSpring, useTransform, useInView } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

function Counter({ value }: { value: string }) {
  const numericValue = parseFloat(value);
  const isInteger = !value.includes('.');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, {
    stiffness: 25,
    damping: 15,
    restDelta: 0.001
  });

  const display = useTransform(spring, (current) => {
    if (isInteger) return Math.floor(current).toString();
    return current.toFixed(1);
  });

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      // Small delay to ensure user sees the start
      const timer = setTimeout(() => {
        spring.set(numericValue);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [numericValue, spring, isInView]);

  useEffect(() => {
    return display.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [display]);

  return <span ref={ref}>{displayValue}</span>;
}

const stats = [
  { label: "High Performance Ships", value: "48", suffix: "+" },
  { label: "Global Impact Clients", value: "24", suffix: "" },
  { label: "Years Engineering", value: "6.5", suffix: "" },
  { label: "Uptime Guaranteed", value: "99.9", suffix: "%" }
];

export default function Statistics() {
  return (
    <section className="py-32 px-6 border-t border-black/5 dark:border-white/5" id="stats">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex items-baseline justify-center mb-4">
                <span className="text-6xl md:text-8xl font-black tracking-tighter text-neutral-900 dark:text-white">
                  <Counter value={stat.value} />
                </span>
                <span className="text-2xl md:text-4xl font-bold text-orange-500 font-mono ml-1">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.4em] max-w-[120px] mx-auto text-center leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
