import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TemplatesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = {
    Medical: [
      { name: 'AIAVA', path: '/templates/medical/aiava' },
      { name: 'Theocare', path: '/templates/medical/theocare' },
      { name: 'Claudio', path: '/templates/medical/claudio' },
      { name: 'Dr. Codix', path: '/templates/medical/dr-codix' }
    ],
    Hackathons: [
      { name: 'AI Scott', path: '/templates/hackathons/ai-scott' },
      { name: 'AI Maria', path: '/templates/hackathons/ai-maria' },
      { name: 'Evarmatch', path: '/templates/hackathons/evarmatch' },
      { name: 'Ethan Nova', path: '/templates/hackathons/ethan-nova' },
      { name: 'AI Artuso', path: '/templates/hackathons/ai-artuso' }
    ],
    General: [
      { name: 'Rayan', path: '/templates/general/rayan' }
    ],
    Education: [
      { name: 'DeanAI Lydia', path: '/templates/education/deanai-lydia' },
      { name: 'TutorAI Max', path: '/templates/education/tutorai-max' },
      { name: 'CareerAI Elara', path: '/templates/education/careerai-elara' },
      { name: 'AdminAI Leo', path: '/templates/education/adminai-leo' },
      { name: 'HelpAI Wina', path: '/templates/education/helpai-wina' }
    ]
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-accent-blue transition-colors duration-300 flex items-center"
      >
        Templates
        <svg
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50">
          {Object.entries(templates).map(([category, items]) => (
            <div key={category} className="py-2">
              <div className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50">
                {category}
              </div>
              {items.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent-blue hover:text-white transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplatesDropdown; 