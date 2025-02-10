import React from 'react';

function Features() {
  return (
    <section className="my-8 text-center">
      <h2 className="text-3xl font-bold text-purple-700">Features</h2>
      <ul className="list-disc list-inside mt-4 text-left mx-auto max-w-md">
        <li className="text-lg text-gray-200">Interactive Chatbot</li>
        <li className="text-lg text-gray-200">Powered by Azure OpenAI</li>
        <li className="text-lg text-gray-200">Responsive Design</li>
      </ul>
    </section>
  );
}

export default Features;