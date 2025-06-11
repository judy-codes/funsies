import React from 'react';
import Timeline from '../components/Timeline';

const Proud: React.FC = () => {
  const proudMoments = [
    {
      date: "February 2025",
      title: "Set California State Raw Record",
      description: "Set the California State Raw Record in the -82.5kg weight class with a 195kg squat, demonstrating exceptional strength and dedication to the sport."
    },
    {
      date: "February 2025",
      title: "Won Powerlifting Meet in Korea",
      description: "Competed in Korea Iron Souls III powerlifting meet and won first place, achieving this while solo traveling and without prior preparation."
    },
    {
      date: "August 2024",
      title: "Promoted to Software Engineer",
      description: "Achieved promotion to Software Engineer at Salesforce, recognizing my contributions to the Service Assistant project and leadership in prompt engineering."
    },
    {
      date: "July 2023",
      title: "Started at Salesforce",
      description: "Joined Salesforce as an Associate Software Engineer, beginning my journey in enterprise software development."
    },
    {
      date: "May 2023",
      title: "Graduated from Bryn Mawr College",
      description: "Earned a Bachelor's degree in Computer Science with minors in Asian American Studies, Psychology, and Data Science, showcasing a well-rounded academic background."
    },
    {
      date: "September 2023",
      title: "Completed Senior Research Project",
      description: "Researched body ownership in VR using animal avatars (seagull, orca, deer) to study how embodiment affects human behavior and empathy in virtual environments."
    },
    {
      date: "Summer 2020",
      title: "Technology Internship at Putnam Investments",
      description: "Completed first technology internship at Putnam Investments, gaining early exposure to enterprise software development and financial technology."
    },
    {
      date: "May 2019",
      title: "Graduated from Boston Latin School",
      description: "Completed studies at Boston Latin School, one of the oldest public schools in the United States, known for its rigorous academic program and rich history."
    },
    {
      date: "December 2018",
      title: "Won Dell Foundation Scholarship",
      description: "Received a $20,000 scholarship from the Dell Foundation, supporting academic achievement and future success in technology."
    },
    {
      date: "November 2018",
      title: "Won Posse Foundation Scholarship",
      description: "Awarded a full-tuition leadership scholarship from the Posse Foundation, recognizing academic excellence and leadership potential."
    },
    {
      date: "2016-2019",
      title: "Community Impact in South Boston",
      description: "Discovered passion for nonprofit work and community service, creating meaningful impact in South Boston communities through various initiatives and programs."
    }
  ];

  return (
    <div className="page-container">
      <h1>What I'm Proud Of</h1>
      <div className="content">
        <Timeline items={proudMoments} />
      </div>
    </div>
  );
};

export default Proud; 