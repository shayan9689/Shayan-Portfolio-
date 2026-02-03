import React, { useState } from 'react';
import { FaBrain, FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const About = () => {
  const [activeTab, setActiveTab] = useState('skills');

  const tabs = [
    { id: 'skills', label: 'Main Skills', icon: FaBrain },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
  ];

  const skillsData = [
    { name: 'Market Research & Analysis', percentage: 90 },
    { name: 'Communication & Negotiation', percentage: 88 },
    { name: 'MS Office/Excel Skills', percentage: 85 },
    { name: 'Team Collaboration', percentage: 87 },
    { name: 'Problem-Solving & Critical Thinking', percentage: 89 },
    { name: 'Presentation Skills', percentage: 86 },
  ];

  const educationData = [
    {
      title: 'Bachelor of Computer Science',
      period: 'Lahore Leads University (03/2024 - Present)',
      description: 'Studied key subjects including Professional Practices, Presentation Skills, and Programming, building a strong foundation in business communication and technical problem-solving.',
    },
    {
      title: 'Intermediate',
      period: 'Punjab Group of Colleges (03/2021 - 07/2023)',
      description: 'Completed intermediate education in Lahore, focusing on foundational academic subjects.',
    },
    {
      title: 'Matriculation',
      period: 'Dar-e-Arkam School (03/2019 - 10/2021)',
      description: 'Completed matriculation education in Sargodha, establishing strong academic fundamentals.',
    },
  ];

  const experienceData = [
    {
      title: 'Sales Management',
      company: 'Moscow Mart',
      period: '04/2023 - 08/2024',
      description: 'Managed sales operations and customer relationships at Moscow Mart in Sargodha. Developed strong skills in client communication, negotiation, and business development while contributing to the company\'s growth initiatives.',
    },
  ];

  return (
    <section id="about" className="section-padding bg-white dark:bg-[#0b1220]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h4 className="text-base sm:text-lg text-accent font-normal uppercase tracking-wider mb-3 sm:mb-4 inline-block">
            Get to know me
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-3 sm:mb-4 text-dark dark:text-[#e5e7eb]">
            About Me
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12 items-center">
          <div className="flex-1 w-full" data-aos="fade-right">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#1e293b]">
              <img
                src="/profile2.png"
                alt="Shayan Umair"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 bg-gradient-to-r from-primary to-primary-dark w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-[#0f172a]">
                <div className="text-center">
                  <span className="text-xl sm:text-2xl lg:text-[2rem] font-bold block leading-none">1+</span>
                  <span className="text-xs sm:text-sm font-medium block">Year Experience</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full" data-aos="fade-left">
            <h3 className="text-xl sm:text-2xl lg:text-[1.8rem] mb-4 sm:mb-5 text-dark dark:text-[#e5e7eb] font-bold">
              Who am I?
            </h3>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed text-secondary dark:text-[#e2e8f0]">
              I'm a dedicated Computer Science student at Lahore Leads University, currently pursuing my Bachelor's degree. I'm passionate about applying my analytical, communication, and problem-solving skills to drive business growth and create meaningful impact.
            </p>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed text-secondary dark:text-[#e2e8f0]">
              With experience in Sales Management at Moscow Mart and a strong foundation in business communication and technical problem-solving, I'm eager to contribute to market research, client relationship management, and strategic growth initiatives as a Business Development Intern.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium cursor-pointer transition-all inline-flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-blue-50 dark:bg-[#0b1220] text-accent dark:text-[#cbd5e1] hover:bg-blue-100 dark:hover:bg-[#1e293b]'
                    }`}
                  >
                    <IconComponent />
                    <span>{tab.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="mb-6 sm:mb-8">
              {activeTab === 'skills' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {skillsData.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-blue-50 dark:bg-[#0f172a] rounded-lg border border-blue-100 dark:border-blue-900/30 hover:border-primary/40 dark:hover:border-primary/50 transition-all">
                      <div className="font-medium text-sm sm:text-base text-dark dark:text-[#e5e7eb]">{skill.name}</div>
                      <span className="font-bold text-primary text-sm sm:text-base">{skill.percentage}%</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'education' && (
                <div className="space-y-5 sm:space-y-6">
                  {educationData.map((edu, index) => (
                    <div key={index} className="mb-4 sm:mb-5 p-4 sm:p-5 bg-blue-50 dark:bg-[#0f172a] rounded-lg border border-blue-100 dark:border-blue-900/30">
                      <h4 className="text-base sm:text-lg mb-1 sm:mb-2 text-dark dark:text-[#e5e7eb] font-semibold">{edu.title}</h4>
                      <p className="text-xs sm:text-sm text-primary dark:text-blue-400 mb-2 font-medium">{edu.period}</p>
                      <p className="text-xs sm:text-sm text-accent dark:text-[#94a3b8] leading-relaxed">{edu.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'experience' && (
                <div className="space-y-5 sm:space-y-6">
                  {experienceData.map((exp, index) => (
                    <div key={index} className="mb-4 sm:mb-5 p-4 sm:p-5 bg-blue-50 dark:bg-[#0f172a] rounded-lg border border-blue-100 dark:border-blue-900/30">
                      <h4 className="text-base sm:text-lg mb-1 sm:mb-2 text-dark dark:text-[#e5e7eb] font-semibold">{exp.title}</h4>
                      <p className="text-xs sm:text-sm text-primary dark:text-blue-400 mb-1 font-medium">{exp.company}</p>
                      <p className="text-xs sm:text-sm text-accent dark:text-[#94a3b8] mb-2">{exp.period}</p>
                      <p className="text-xs sm:text-sm text-secondary dark:text-[#e2e8f0] leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#contact');
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-[0.95rem] bg-primary text-white border-2 border-primary hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
