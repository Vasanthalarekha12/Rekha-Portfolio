import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const About = () => {
  const education = [
    {
      institution: "Aditya Engineering College",
      degree: "Bachelor of Engineering And Technology in Artificial Intelligence and Machine Learning",
      period: "2023 – 2027",
      gpa: "8.67/10.0",
      location: "Surampalem, India"
    },
    {
      institution: "Sri Chaitanya Junior College",
      degree: "Intermediate",
      period: "2021 – 2023",
      gpa: "8.10/10.0",
      location: "Kakinada, India"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="prose prose-lg text-gray-600 mb-16">
          <p className="text-xl leading-relaxed">
            I am a data enthusiast with a strong interest in <span className="font-semibold text-gray-900">Data Analytics, Machine Learning, and Artificial Intelligence</span>.
          </p>
          <p className="text-xl leading-relaxed mt-4">
            I enjoy transforming raw data into meaningful insights and building data-driven solutions. My experience and interests span across Python, SQL, Excel, Power BI, Data Analytics, Machine Learning, Automation, Power Automate, SharePoint, and APIs.
          </p>
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Education</h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {education.map((edu, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Award className="w-5 h-5" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">{edu.institution}</h3>
                  </div>
                  <div className="text-blue-600 font-medium mb-3">{edu.degree}</div>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </div>
                    <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-50 text-green-700 font-medium">
                      GPA: {edu.gpa}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
