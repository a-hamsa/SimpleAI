import React from 'react';

function About() {
  return (
    <section className="my-16 px-4 max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <h2 className="text-4xl font-bold text-white mb-6 text-center">
          Experience AI, Simplified
        </h2>
        
        <div className="space-y-6 text-gray-100">
          <p className="text-xl leading-relaxed">
            Welcome to SimpleAI, where cutting-edge artificial intelligence meets intuitive conversation. Powered by Azure OpenAI's advanced babbage-002 model, we're transforming the way you interact with AI.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-yellow-300 mb-3">
                Smart Conversations
              </h3>
              <p className="text-gray-200">
                Engage in natural, intelligent dialogues that understand context and provide meaningful responses. Whether you're brainstorming ideas or seeking answers, SimpleAI adapts to your needs.
              </p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-yellow-300 mb-3">
                Enterprise-Grade AI
              </h3>
              <p className="text-gray-200">
                Built on Azure OpenAI's reliable infrastructure, SimpleAI offers the perfect balance of sophisticated technology and user-friendly design, making AI accessible to everyone.
              </p>
            </div>
          </div>

          <p className="text-center text-lg mt-8 text-white/90 font-medium">
            Join thousands of users who are already experiencing the future of AI conversation.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;