import React, { useState, useMemo } from 'react';

interface ExperienceItem {
  company: string;
  period: string;
  websiteUrl: string;
  description: string;
  expertiseTags: string[];
  timePeriod: 'post-grad' | 'college' | 'high-school';
}

interface RoleItem {
  title: string;
  experiences: ExperienceItem[];
}

const roleItems: RoleItem[] = [
  {
    title: "Software Engineer, Member of Technical Staff (MTS)",
    experiences: [
      {
        company: "Salesforce",
        period: "Aug. 2024 - Present",
        websiteUrl: "https://www.salesforceben.com/service-assistant-the-newest-game-changing-agentforce-skill/",
        description: [
          "• Led LLM strategy for <a href='https://www.salesforceben.com/service-assistant-the-newest-game-changing-agentforce-skill/' target='_blank' rel='noopener noreferrer'>Service Assistant</a>, designing prompts and aligning AI behaviors across teams\n",
          "• Built backend systems for customer data integration, reducing database calls and improving AI accuracy\n",
          "• Implemented prompt engineering security measures to prevent injection attacks\n",
          "• Developed Service Assistant setup page with intuitive onboarding experience\n",
          "• Served as Prompt Engineering Champion, managing cross-team approvals and QA coordination\n",
          "• Migrated Service Assistant licensing from pilot to GA, ensuring proper Salesforce integration\n"
        ].join(''),
        expertiseTags: ["Java", "Python", "Javascript", "LWC", "AI/ML", "Engineering"],
        timePeriod: "post-grad"
      }
    ]
  },
  {
    title: "Associate Software Engineer, Member of Technical Staff (MTS)",
    experiences: [
      {
        company: "Salesforce",
        period: "Jul. 2023 - Aug. 2024",
        websiteUrl: "",
        description: [
          "• Enhanced <a href='https://www.salesforce.com/news/stories/unified-knowledge-news/' target='_blank' rel='noopener noreferrer'>Unified Knowledge</a> platform by improving sync history page for better content visibility and tracking\n",
          "• Contributed to backend and frontend updates, streamlining data flow and user interaction\n",
          "• Collaborated with teams to integrate third-party systems and optimize data syncing\n",
          "• Developed drag-and-drop components for data management in Salesforce Communities\n",
          "• Built components enabling users to organize data into categories and <a href='https://help.salesforce.com/s/articleView?id=release-notes.rn_data_categories_subcategories_list_component.htm&release=248&type=5' target='_blank' rel='noopener noreferrer'> subcategories</a>\n",
          "• Created modular Lightning Web Components (LWC) for seamless platform integration\n"
        ].join(''),
        expertiseTags: ["Java", "Javascript", "LWC", "UI/UX"],
        timePeriod: "post-grad"
      }
    ]
  },
  {
    title: "Research and Data Management Intern",
    experiences: [
      {
        company: "The Posse Foundation",
        period: "Feb 2023 - Apr 2023",
        websiteUrl: "",
        description: [
          "• Supported the Posse Institute, the organization's research and data management division\n",
          "• Converted student contact records and Excel sheets to custom Salesforce objects\n",
          "• Created a trigger with APEX code that renames document uploads for better organization for program coordinators\n",
          "• Supported the Posse Boston office with career programs and administrative tasks\n"
        ].join(''),
        expertiseTags: ["Salesforce", "APEX", "Data Management", "Research"],
        timePeriod: "college"
      }
    ]
  },
  {
    title: "Data Science and Machine Learning Fellow",
    experiences: [
      {
        company: "Bryn Mawr College - Center for Science of Information & Foundations of Data Science Institute",
        period: "Sep 2022 - Dec 2022",
        websiteUrl: "https://soihub.org",
        description: [
          "• Conducted research for <a href='https://soihub.org' target='_blank' rel='noopener noreferrer'>Center for Science of Information</a> and <a href='https://fodsi.us' target='_blank' rel='noopener noreferrer'>Foundations of Data Science Institute</a> under Professor Deepak Kumar's guidance\n",
          "• Led a self-directed project in Sports Data Analytics with weekly presentations\n",
          "• Applied machine learning and data science techniques to analyze sports datasets\n"
        ].join(''),
        expertiseTags: ["AI/ML", "Data Science", "Research", "Python"],
        timePeriod: "college"
      }
    ]
  },
  {
    title: "Software Engineering Intern",
    experiences: [
      {
        company: "Salesforce",
        period: "Jun 2022 - Aug 2022",
        websiteUrl: "",
        description: [
          "• Engineered a fundamental frontend search for fulfillment flows in the Service Catalog product\n",
          "• Created a custom lightning web component using JavaScript, HTML and CSS that allowed the user to filter fulfillment flows using label, description with usability in mind\n",
          "• Created production ready code through 100% test coverage that is to be released\n"
        ].join(''),
        expertiseTags: ["Javascript", "LWC", "HTML/CSS", "UI/UX"],
        timePeriod: "college"
      },
      {
        company: "Salesforce",
        period: "Jun 2021 - Aug 2021",
        websiteUrl: "",
        description: [
          "• Architected and built an auditing application that continuously pulls information from Github REST API, stores the information on Salesforce's platform, and displays the information to be filtered\n",
          "• Assisted in automation such as creating a scheduled CircleCI build for previously manual task\n"
        ].join(''),
        expertiseTags: ["Javascript", "CircleCI", "REST API", "DevOps"],
        timePeriod: "college"
      }
    ]
  },
  {
    title: "Software Development Intern",
    experiences: [
      {
        company: "Putnam Investments",
        period: "Jun 2020 - Aug 2020",
        websiteUrl: "",
        description: [
          "• Created scripts and pipelines using Jenkins and Harness for continuous integration and deployment to migrate 2 risk application to Amazon Web Services (AWS) EC2\n",
          "• Analyzed, tested, and improved pain points of existing applications to achieve digital transformation\n",
          "• Designed and documented workflows for 2 risk application processes to be referenced by all engineers\n"
        ].join(''),
        expertiseTags: ["Jenkins", "AWS", "CI/CD", "DevOps"],
        timePeriod: "college"
      }
    ]
  },
  {
    title: "Lead Help Desk Technician (Student Manager)",
    experiences: [
      {
        company: "Bryn Mawr College - IT Services",
        period: "May 2022 - Sep 2022",
        websiteUrl: "",
        description: [
          "• Designed and facilitated training programs for help desk technicians with other leads and managers\n",
          "• Provided on-call support for escalated technical cases\n",
          "• Collaborated with support professionals on high-priority network, hardware, software, and security issues\n",
          "• Managed ticket system, resolving an average of 30 tickets per week\n",
          "• Led troubleshooting efforts for client issues via phone and email support\n"
        ].join(''),
        expertiseTags: ["Leadership", "Technical Support", "Network Security"],
        timePeriod: "college"
      }
    ]
  },
  {
    title: "Help Desk Technician",
    experiences: [
      {
        company: "Bryn Mawr College - IT Services",
        period: "Sep 2020 - May 2022",
        websiteUrl: "",
        description: [
          "• Collaborated with support professionals on network, hardware, software, and security issues\n",
          "• Provided technical support and troubleshooting via phone and email\n",
          "• Managed ticket system, resolving an average of 30 tickets per week\n",
          "• Assisted clients with technical problems and maintained detailed documentation\n"
        ].join(''),
        expertiseTags: ["Technical Support", "Problem Solving", "Documentation"],
        timePeriod: "college"
      }
    ]
  },
  {
    title: "Computer Science Teaching Assistant",
    experiences: [
      {
        company: "Bryn Mawr College - Computer Science Department",
        period: "Sep 2020 - Aug 2022",
        websiteUrl: "",
        description: [
          "• Assisted students in Data Structures (206) and Introduction to Computer Science (113, 110), total 110 students\n",
          "• Efficiently explaining computer science fundamentals and adapting teaching style to varying class sizes\n",
          "• Coordinated with professors to identify and address student learning challenges\n",
          "• Provided one-on-one support to ensure all students could learn productively\n"
        ].join(''),
        expertiseTags: ["Teaching", "Data Structures", "Computer Science"],
        timePeriod: "college"
      }
    ]
  },
  {
    title: "Hall Advisor",
    experiences: [
      {
        company: "Bryn Mawr College - New Dorm",
        period: "May 2022 - May 2023",
        websiteUrl: "",
        description: [
          "• Served as a support for students living in the dorm, New Dorm\n",
          "• Coordinated events for residents to ensure a welcoming and inclusive environment\n",
          "• Assisted in the orientation of new students through Custom Week events\n",
          "• Communicate with managers with any issues and problems that may arise\n"
        ].join(''),
        expertiseTags: ["Leadership", "Event Planning", "Student Support"],
        timePeriod: "college"
      }
    ]
  },
  {
    title: "Computer Science Major Representative",
    experiences: [
      {
        company: "Bryn Mawr College - Computer Science Department",
        period: "Sep 2021 - May 2023",
        websiteUrl: "",
        description: [
          "• Started initiatives to boost the community within the CS department\n",
          "• Served as a student representative in the faculty interview and search process\n",
          "• Helped lead and create the Professor Fireside Chat series to get to know professors in a more informal atmosphere\n",
          "• Started office hours offering resume and career help, with a student securing an internship directly through this process\n",
          "• Designed, proposed, and advocated for free computer science merch for students and facilitated the distribution for two years\n"
        ].join(''),
        expertiseTags: ["Leadership", "Community Building", "Project Management"],
        timePeriod: "college"
      }
    ]
  },
  {
    title: "Baker",
    experiences: [
      {
        company: "Bryn Mawr College - New Dorm Dining",
        period: "Sep 2019 - Feb 2020",
        websiteUrl: "",
        description: [
          "• Prepared and baked various items for the dining hall\n",
          "• Maintained food safety and quality standards\n",
          "• Worked in a fast-paced environment serving the college community\n"
        ].join(''),
        expertiseTags: ["Food Service", "Time Management", "Teamwork"],
        timePeriod: "college"
      }
    ]
  },
  {
    title: "Peer Leader",
    experiences: [
      {
        company: "Boston Children's Hospital",
        period: "Jan 2018 - Sep 2019",
        websiteUrl: "",
        description: [
          "• Organized and conducted 20+ mock patient interviews on-site and at conferences to give feedback to doctors in order for them to be prepared to assist teen patients\n",
          "• Created 15 blog posts and educational documents for Center for Young Women's Health website focused on personal health and wellness experiences\n",
          "• Coordinated and managed multiple events to create community in BHC such as Voice Health Hackathon with Amazon and BHC Prom\n"
        ].join(''),
        expertiseTags: ["Healthcare", "Content Creation", "Event Planning"],
        timePeriod: "high-school"
      }
    ]
  },
  {
    title: "Lead Photographer/Sales Representative",
    experiences: [
      {
        company: "Photogenic Inc.",
        period: "May 2018 - Aug 2019",
        websiteUrl: "",
        description: [
          "• Led groups of 10-15 workers and ensured smooth operations\n",
          "• Captured and sold memorable pictures for passengers on Boston Harbor Cruises and Boston Duck Tours\n",
          "• Managed and compiled final financial reports at the end of the day\n"
        ].join(''),
        expertiseTags: ["Leadership", "Sales", "Photography"],
        timePeriod: "high-school"
      }
    ]
  },
  {
    title: "President",
    experiences: [
      {
        company: "South Boston Youth Council",
        period: "Mar 2017 - Aug 2019",
        websiteUrl: "",
        description: [
          "• Led a group of 10 motivated youth to create a positive impact on community\n",
          "• Developed strong relationships with several youth organizations to create an educational commercial with the South Boston Public Health Commission\n",
          "• Created and organized the first ever recycling program which scaled to four client offices\n",
          "• Partnered with Samaritan Foundation to read books to 80 disadvantaged children\n"
        ].join(''),
        expertiseTags: ["Leadership", "Community Outreach", "Project Management"],
        timePeriod: "high-school"
      }
    ]
  },
  {
    title: "Office Assistant",
    experiences: [
      {
        company: "South Boston Families Advocating Neighborhood Strength",
        period: "Jun 2015 - Aug 2018",
        websiteUrl: "",
        description: [
          "• Informed guests of organizational services and maintained a relationship with community organizations\n",
          "• Served as a representative at community events to discuss available programming for low-income families\n",
          "• Completed office tasks, prepared rooms for weekly events\n"
        ].join(''),
        expertiseTags: ["Administrative", "Community Relations", "Event Support"],
        timePeriod: "high-school"
      }
    ]
  },
  {
    title: "Event Assistant",
    experiences: [
      {
        company: "South Boston Family Nurturing Program",
        period: "Apr 2018 - Jun 2018",
        websiteUrl: "",
        description: [
          "• Created relationships and shared resources to attendees\n",
          "• Set up tables and chairs for meetings regarding building positive family relationships\n",
          "• Ran front desk during meetings\n"
        ].join(''),
        expertiseTags: ["Event Planning", "Customer Service", "Administrative"],
        timePeriod: "high-school"
      }
    ]
  },
  {
    title: "Receptionist",
    experiences: [
      {
        company: "South Boston Action Center",
        period: "Aug 2015 - Dec 2017",
        websiteUrl: "",
        description: [
          "• Greeted and assisted walk-in clients; updated social media pages and controlled recycling\n",
          "• Performed clerical duties such as answering calls, directing customers, filing and organizing paperwork\n"
        ].join(''),
        expertiseTags: ["Administrative", "Customer Service", "Social Media"],
        timePeriod: "high-school"
      }
    ]
  },
  {
    title: "Healthy Community Champion",
    experiences: [
      {
        company: "Let's Get Healthy, Boston!",
        period: "Aug 2016 - Sep 2016",
        websiteUrl: "",
        description: [
          "• Informed public of smoke-free housing availability; updated social media accounts with upcoming events\n",
          "• Worked with peers to raise awareness of healthy habits like sugar-free drinks and active transit\n"
        ].join(''),
        expertiseTags: ["Public Health", "Community Outreach", "Social Media"],
        timePeriod: "high-school"
      }
    ]
  }
];

const Experience: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    roleItems.forEach(role => {
      role.experiences.forEach(exp => {
        exp.expertiseTags.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags).sort();
  }, []);

  // Filter experiences based on selected tags and time period
  const filteredRoleItems = useMemo(() => {
    let filtered = roleItems;

    // Filter by time period
    if (selectedTimePeriod) {
      filtered = filtered.map(role => ({
        ...role,
        experiences: role.experiences.filter(exp => exp.timePeriod === selectedTimePeriod)
      })).filter(role => role.experiences.length > 0);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.map(role => ({
        ...role,
        experiences: role.experiences.filter(exp =>
          selectedTags.every(tag => exp.expertiseTags.includes(tag))
        )
      })).filter(role => role.experiences.length > 0);
    }

    return filtered;
  }, [selectedTags, selectedTimePeriod]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const toggleTimePeriod = (period: string) => {
    setSelectedTimePeriod(prev => prev === period ? null : period);
  };

  return (
    <div className="page-container">
      <div className="experience-layout">
        <div className="filter-sidebar">
          <div className="filter-section">
            <h3>Time Period</h3>
            <div className="tag-filters">
              {['post-grad', 'college', 'high-school'].map(period => (
                <button
                  key={period}
                  className={`filter-tag ${selectedTimePeriod === period ? 'selected' : ''}`}
                  onClick={() => toggleTimePeriod(period)}
                >
                  {period.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-section">
            <h3>Skills</h3>
            <div className="tag-filters">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`filter-tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          {(selectedTags.length > 0 || selectedTimePeriod) && (
            <div className="filter-section active-filters">
              <h3>Active Filters</h3>
              <div className="active-tags">
                {selectedTimePeriod && (
                  <button
                    className="active-tag"
                    onClick={() => setSelectedTimePeriod(null)}
                  >
                    {selectedTimePeriod.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    <span className="remove-tag">×</span>
                  </button>
                )}
                {selectedTags.map(tag => (
                  <button
                    key={tag}
                    className="active-tag"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    <span className="remove-tag">×</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="experience-container">
          {filteredRoleItems.map((role, roleIndex) => (
            <div key={roleIndex} className="role-section">
              <h4 className="role-title">{role.title}</h4>
              {role.experiences.map((item, itemIndex) => (
                <div key={itemIndex} className="experience-item">
                  <div className="experience-content">
                    <h3>{item.company}</h3>
                    <p className="period">{item.period}</p>
                    <div className="description" dangerouslySetInnerHTML={{ __html: item.description }} />
                    <div className="expertise-tags">
                      {item.expertiseTags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="expertise-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience; 