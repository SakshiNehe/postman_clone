import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-primary-dark text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-accent-blue mb-6">About VeavAI</h1>
        <p className="text-lg leading-relaxed mb-4">
          At VeavAI, we are revolutionizing the way businesses interact with AI. Our platform is designed to provide access to a marketplace of AI-powered expert specialists and avatars for every industry.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          From healthcare to hackathons, legal, finance, and more—select from our marketplace and install AI Specialists and Avatars alongside humans to enhance precision and efficiency in expert assessments.
        </p>
        <h2 className="text-2xl font-semibold text-accent-blue mb-3">Our Mission</h2>
        <p className="text-lg leading-relaxed mb-4">
          Our mission is to seamlessly weave AI into expert avatars and specialists across industries, fostering a future where human expertise is augmented by intelligent automation for unbiased decision-making and unparalleled customer satisfaction.
        </p>
        <h2 className="text-2xl font-semibold text-accent-blue mb-3">Why Choose VeavAI?</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed space-y-2">
          <li>One Platform. Infinite Experts.</li>
          <li>AI Avatars As A Service</li>
          <li>100% Customers Satisfaction</li>
          <li>Precision, Fairness, and Efficiency</li>
        </ul>
      </div>
    </div>
  );
};

export default About; 