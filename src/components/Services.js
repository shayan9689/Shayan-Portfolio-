import React from 'react';
import { FaChartLine, FaHandshake, FaUsers, FaLightbulb, FaFileExcel, FaFilePowerpoint } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: FaChartLine,
      title: 'Market Research & Analysis',
      description: 'Conducting comprehensive market research to identify opportunities, analyze trends, and provide data-driven insights. Expertise in competitive analysis, market segmentation, and strategic planning to support business growth initiatives.',
      features: ['Market Analysis', 'Competitive Research', 'Trend Identification', 'Data Collection', 'Strategic Insights', 'Opportunity Assessment'],
      delay: 0,
    },
    {
      icon: FaHandshake,
      title: 'Client Relationship Management',
      description: 'Building and maintaining strong relationships with clients through effective communication and negotiation. Focus on understanding client needs, delivering value, and fostering long-term partnerships.',
      features: ['Client Communication', 'Negotiation', 'Relationship Building', 'Account Management', 'Customer Satisfaction', 'Partnership Development'],
      delay: 100,
    },
    {
      icon: FaUsers,
      title: 'Team Collaboration',
      description: 'Working effectively within cross-functional teams to achieve business objectives. Strong interpersonal skills and ability to coordinate with various stakeholders to drive collaborative success.',
      features: ['Cross-functional Teams', 'Stakeholder Management', 'Project Coordination', 'Team Communication', 'Collaborative Problem-solving', 'Leadership Support'],
      delay: 200,
    },
    {
      icon: FaLightbulb,
      title: 'Strategic Problem-Solving',
      description: 'Applying critical thinking and analytical skills to identify challenges, develop solutions, and implement strategic initiatives. Focus on data-driven decision making and innovative approaches to business problems.',
      features: ['Critical Thinking', 'Analytical Skills', 'Solution Development', 'Strategic Planning', 'Innovation', 'Decision Making'],
      delay: 300,
    },
    {
      icon: FaFileExcel,
      title: 'Data Management & Reporting',
      description: 'Utilizing MS Office and Excel skills to organize data, create reports, and present insights. Ability to manage spreadsheets, analyze data, and create professional presentations for stakeholders.',
      features: ['Excel Analysis', 'Data Organization', 'Report Creation', 'Presentation Development', 'Data Visualization', 'Documentation'],
      delay: 400,
    },
    {
      icon: FaFilePowerpoint,
      title: 'Presentation & Communication',
      description: 'Delivering compelling presentations and clear communication to various audiences. Strong presentation skills to effectively convey ideas, proposals, and strategic recommendations.',
      features: ['Public Speaking', 'Presentation Design', 'Clear Communication', 'Stakeholder Presentations', 'Proposal Development', 'Professional Communication'],
      delay: 500,
    },
  ];

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-blue-50/30 to-white dark:from-[#0f172a] dark:to-[#0b1220]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h4 className="text-base sm:text-lg text-accent font-normal uppercase tracking-wider mb-3 sm:mb-4 inline-block">
            What I can do for you
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-3 sm:mb-4 text-dark dark:text-[#e5e7eb]">
            My Services
          </h2>
          <p className="text-sm sm:text-base text-accent dark:text-[#94a3b8] max-w-2xl mx-auto mb-4">
            Business development services focused on market research, client relations, and strategic growth
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#0f172a] p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden z-10 group hover:-translate-y-2.5 border border-blue-100 dark:border-blue-900/30"
                data-aos="fade-up"
                data-aos-delay={service.delay}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-primary/10 group-hover:bg-white/20 flex items-center justify-center text-primary group-hover:text-white text-xl sm:text-2xl mb-4 sm:mb-5 transition-all">
                    <IconComponent />
                  </div>
                  <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 text-dark dark:text-[#e5e7eb] group-hover:text-white transition-colors font-semibold">
                    {service.title}
                  </h3>
                  <p className="mb-4 sm:mb-5 text-sm sm:text-base text-accent dark:text-[#94a3b8] group-hover:text-white/90 transition-colors leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="flex flex-col gap-2 sm:gap-2.5">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-xs sm:text-sm text-secondary dark:text-[#e2e8f0] group-hover:text-white flex items-center gap-2 transition-colors"
                      >
                        <i className="fas fa-check text-primary group-hover:text-white transition-colors text-xs"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
