import { collection, addDoc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from './firebase';

const defaultProjects = [
  {
    title: 'Student Career Management System',
    date: 'May 2025',
    description: 'Developed a unified student management system to track performance, attendance, admissions, and skills using SharePoint and Power Automate. Implemented automated workflows for student data collection and updates, processing large volumes of academic and administrative records. Created interactive Power BI dashboards for real-time monitoring of student performance and progress.',
    technologies: ['SharePoint', 'Power Automate', 'Excel', 'Power BI'],
    order: 1
  },
  {
    title: 'Fitness Analytics Dashboard',
    date: 'July 2026',
    description: 'Designed and developed an interactive Power BI dashboard to analyze fitness and health metrics. Performed data cleaning and transformation using Power Query and built an optimized data model. Created DAX measures and KPIs to track key fitness indicators, trends, and overall performance. Built interactive dashboards with slicers, filters, and drill-through capabilities.',
    technologies: ['Power BI', 'Power Query', 'DAX', 'Excel'],
    order: 2
  },
  {
    title: 'Trader Behaviour Analysis',
    date: 'July 2026',
    description: 'Developed an interactive trader behaviour analysis dashboard to analyze trading patterns, performance metrics, and user activity insights. Performed data preprocessing and EDA using Python. Applied machine learning techniques to understand relationships between trading behaviour and performance outcomes.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Plotly', 'Streamlit', 'Machine Learning'],
    order: 3
  },
  {
    title: 'Exploratory Data Analysis (Forex Trading)',
    date: 'July 2026',
    description: 'Developed an interactive analytics application to evaluate forex trading performance using Python and Streamlit. Performed data cleaning, preprocessing, and EDA using Pandas and NumPy to identify trading patterns and performance trends. Created interactive visualizations with Plotly.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Plotly', 'Streamlit'],
    order: 4
  }
];

const defaultSkills = [
  { category: 'Programming', name: 'Python' },
  { category: 'Programming', name: 'Java' },
  { category: 'Database', name: 'SQL' },
  { category: 'Database', name: 'Snowflake' },
  { category: 'Analytics', name: 'Data Analytics' },
  { category: 'Analytics', name: 'Data Interpretation' },
  { category: 'Analytics', name: 'Data Preprocessing' },
  { category: 'Analytics', name: 'Business Intelligence' },
  { category: 'Analytics', name: 'Dashboard Development' },
  { category: 'Analytics', name: 'Reporting' },
  { category: 'Analytics', name: 'Analytical Thinking' },
  { category: 'Visualization', name: 'Power BI' },
  { category: 'Visualization', name: 'Excel' },
  { category: 'Visualization', name: 'Power Query' },
  { category: 'Visualization', name: 'DAX' },
  { category: 'Automation / Microsoft Power Platform', name: 'Power Apps' },
  { category: 'Automation / Microsoft Power Platform', name: 'Power Pages' },
  { category: 'Automation / Microsoft Power Platform', name: 'Power Automate' },
  { category: 'Automation / Microsoft Power Platform', name: 'SharePoint' },
  { category: 'Other', name: 'Problem Solving' },
  { category: 'Other', name: 'Documentation' },
  { category: 'Other', name: 'Workflow Automation' }
];

const defaultCertifications = [
  { name: 'Snow Pro Associate Platform Certificate', order: 1 },
  { name: 'UiPath Automation Business Analyst Training Certificate', order: 2 },
  { name: 'Data Science for Beginner Certificate', order: 3 },
  { name: 'Java Foundations Certificate', order: 4 },
  { name: 'Java Fundamentals Certificate', order: 5 },
  { name: 'Java Programming Certificate', order: 6 },
  { name: 'Cyber Security Essentials Certificate', order: 7 },
  { name: 'Oracle Cloud Infrastructure Generative AI Professional Certificate', order: 8 },
  { name: 'Power Platform Developer Associate certification', order: 9 }
];

export const seedDatabase = async () => {
  const batch = writeBatch(db);
  
  const addItemsToBatch = async (collectionName, items) => {
    const colRef = collection(db, collectionName);
    const existing = await getDocs(colRef);
    if (existing.empty) {
      items.forEach(item => {
        const newDocRef = doc(colRef);
        batch.set(newDocRef, { ...item, createdAt: new Date().toISOString() });
      });
    }
  };

  try {
    const projRef = collection(db, 'projects');
    const existingProjs = await getDocs(projRef);
    if (existingProjs.empty) {
      for (const p of defaultProjects) {
        await addDoc(projRef, { ...p, createdAt: new Date().toISOString() });
      }
    }

    const skillsRef = collection(db, 'skills');
    const existingSkills = await getDocs(skillsRef);
    if (existingSkills.empty) {
      for (const s of defaultSkills) {
        await addDoc(skillsRef, { ...s, createdAt: new Date().toISOString() });
      }
    }

    const certRef = collection(db, 'certifications');
    const existingCerts = await getDocs(certRef);
    if (existingCerts.empty) {
      for (const c of defaultCertifications) {
        await addDoc(certRef, { ...c, createdAt: new Date().toISOString() });
      }
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
