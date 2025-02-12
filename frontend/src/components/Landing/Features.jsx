import React from 'react';

function Features() {
 return (
   <section className="my-16 px-4 max-w-5xl mx-auto">
     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
       <h2 className="text-4xl font-bold text-white mb-8 text-center">
         Powerful Features at Your Fingertips
       </h2>

       <div className="grid md:grid-cols-3 gap-8">
         <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
           <div className="h-14 w-14 bg-purple-500/30 rounded-lg flex items-center justify-center mx-auto mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
             </svg>
           </div>
           <h3 className="text-xl font-semibold text-yellow-300 mb-3 text-center">
             Intelligent Chat Interface
           </h3>
           <p className="text-gray-200 text-center">
             Experience natural conversations with our advanced AI chatbot. Get instant responses, context-aware interactions, and human-like understanding of your queries.
           </p>
         </div>

         <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
           <div className="h-14 w-14 bg-blue-500/30 rounded-lg flex items-center justify-center mx-auto mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
             </svg>
           </div>
           <h3 className="text-xl font-semibold text-yellow-300 mb-3 text-center">
             Azure OpenAI Powered
           </h3>
           <p className="text-gray-200 text-center">
             Built on Microsoft's robust Azure OpenAI infrastructure, ensuring reliable, secure, and scalable AI interactions with industry-leading performance.
           </p>
         </div>

         <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
           <div className="h-14 w-14 bg-green-500/30 rounded-lg flex items-center justify-center mx-auto mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
             </svg>
           </div>
           <h3 className="text-xl font-semibold text-yellow-300 mb-3 text-center">
             Seamless Experience
           </h3>
           <p className="text-gray-200 text-center">
             Enjoy a responsive design that works flawlessly across all devices. Whether on desktop, tablet, or mobile, SimpleAI adapts to provide the perfect user experience.
           </p>
         </div>
       </div>

       <div className="mt-10 text-center">
         <p className="text-lg text-white/90 max-w-2xl mx-auto">
           Discover how SimpleAI's features can transform your AI interaction experience. Our platform combines power, ease of use, and reliability to deliver exactly what you need.
         </p>
       </div>
     </div>
   </section>
 );
}

export default Features;