import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-primary-dark text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-accent-blue mb-6">Contact Us</h1>
        <p className="text-lg leading-relaxed mb-6">
          We'd love to hear from you! Please fill out the form below or reach out to us through the provided contact details.
        </p>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-300">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full p-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:ring-accent-blue focus:border-accent-blue text-white placeholder-gray-400 outline-none"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-300">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:ring-accent-blue focus:border-accent-blue text-white placeholder-gray-400 outline-none"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-300">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="mt-1 block w-full p-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:ring-accent-blue focus:border-accent-blue text-white placeholder-gray-400 outline-none"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-accent-blue text-white p-3 rounded-md font-semibold hover:bg-blue-500 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-accent-blue mb-3">Other Ways to Reach Us</h2>
          <p className="text-lg">Email: <a href="mailto:info@veavai.com" className="text-accent-blue hover:underline">info@veavai.com</a></p>
          <p className="text-lg">Phone: +1 (123) 456-7890</p>
          <p className="text-lg">Address: 123 AI Street, Future City, AI 90210</p>
        </div>
      </div>
    </div>
  );
};

export default Contact; 