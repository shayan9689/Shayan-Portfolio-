import React from 'react';
import { FaCertificate } from 'react-icons/fa';

const Certifications = () => {
  const certifications = [
    {
      title: 'Core Python',
      description: '01/2024 - 03/2024 — Comprehensive certification covering Python programming fundamentals, data structures, algorithms, and object-oriented programming. Developed strong technical problem-solving skills.',
      delay: 0,
    },
    {
      title: 'MERN Stack',
      description: '05/2024 - 11/2024 — Full-stack web development certification covering MongoDB, Express.js, React, and Node.js. Gained expertise in building modern web applications and RESTful APIs.',
      delay: 100,
    },
  ];

  return (
    <section id="certifications" className="section-padding bg-white dark:bg-[#0b1220]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h4 className="text-base sm:text-lg text-accent font-normal uppercase tracking-wider mb-3 sm:mb-4 inline-block">
            Credentials & Certifications
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-3 sm:mb-4 text-dark dark:text-[#e5e7eb]">
            Professional Certifications
          </h2>
          <p className="text-sm sm:text-base text-accent dark:text-[#94a3b8] max-w-2xl mx-auto mb-4">
            Validated expertise through industry-recognized certifications
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#0f172a] rounded-xl shadow-md hover:shadow-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 border border-blue-100 dark:border-blue-900/30"
              data-aos="fade-up"
              data-aos-delay={cert.delay}
            >
              <div className="flex items-center gap-3 mb-3 text-dark dark:text-[#e5e7eb]">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <FaCertificate className="text-xl" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">{cert.title}</h3>
              </div>
              <p className="text-sm sm:text-base text-accent dark:text-[#94a3b8] leading-relaxed">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
