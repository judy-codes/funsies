import React, { useState, useMemo } from 'react';

interface ExperienceItem {
  company: string;
  period: string;
  imageUrl: string;
  websiteUrl: string;
  description: string;
  expertiseTags: string[];
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
        imageUrl: "https://via.placeholder.com/150",
        websiteUrl: "https://example.com",
        description: [
          "• Led LLM strategy for Service Assistant, designing prompts and aligning AI behaviors across teams\n",
          "• Built backend systems for customer data integration, reducing database calls and improving AI accuracy\n",
          "• Implemented prompt engineering security measures to prevent injection attacks\n",
          "• Developed Service Assistant setup page with intuitive onboarding experience\n",
          "• Served as Prompt Engineering Champion, managing cross-team approvals and QA coordination\n",
          "• Migrated Service Assistant licensing from pilot to GA, ensuring proper Salesforce integration\n"
        ].join(''),
        expertiseTags: ["Java", "Python", "Javascript", "LWC", "Prompt Engineering", "Jupyter Notebook"]
      }
    ]
  }
];

const Experience: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  // Filter experiences based on selected tags
  const filteredRoleItems = useMemo(() => {
    if (selectedTags.length === 0) return roleItems;

    return roleItems.map(role => ({
      ...role,
      experiences: role.experiences.filter(exp =>
        selectedTags.every(tag => exp.expertiseTags.includes(tag))
      )
    })).filter(role => role.experiences.length > 0);
  }, [selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="page-container">
      <div className="experience-layout">
        <div className="filter-sidebar">
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
          {selectedTags.length > 0 && (
            <div className="filter-section active-filters">
              <h3>Active Filters</h3>
              <div className="active-tags">
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
                  <div className="experience-image">
                    <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer">
                      <img src={item.imageUrl} alt={`${item.company} logo`} />
                    </a>
                  </div>
                  <div className="experience-content">
                    <h3>{item.company}</h3>
                    <p className="period">{item.period}</p>
                    <p className="description">{item.description}</p>
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