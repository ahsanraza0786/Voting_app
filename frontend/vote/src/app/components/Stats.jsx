"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const stats = [
  {
    number: 100000,
    suffix: "+",
    title: "Registered Voters",
    description: "Active users on our platform"
  },
  {
    number: 99.9,
    suffix: "%",
    title: "Success Rate",
    description: "In vote recording accuracy"
  },
  {
    number: 500,
    suffix: "+",
    title: "Elections Conducted",
    description: "Successfully managed elections"
  },
  {
    number: 50,
    suffix: "M+",
    title: "Votes Counted",
    description: "Secure votes processed"
  }
];

const Stats = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold sm:text-4xl mb-4"
          >
            Our Impact in Numbers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-blue-100"
          >
            Trusted by organizations worldwide
          </motion.p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="stat-card bg-white/10 backdrop-blur-lg"
            >
              <h3 className="text-4xl font-bold mb-2">
                {inView && (
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    decimals={stat.number % 1 !== 0 ? 1 : 0}
                    suffix={stat.suffix}
                  />
                )}
              </h3>
              <p className="text-xl font-semibold mb-2">{stat.title}</p>
              <p className="text-blue-100">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;