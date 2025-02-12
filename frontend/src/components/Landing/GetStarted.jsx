import React from 'react';
import { Link } from 'react-router-dom';

function GetStarted() {
 return (
   <section className="my-16 px-4">
     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 shadow-xl max-w-4xl mx-auto text-center">
       <h2 className="text-4xl font-bold text-white mb-6">
         Ready to Experience the Future?
       </h2>
       
       <div className="max-w-2xl mx-auto space-y-6 mb-8">
         <p className="text-xl text-gray-200">
           Join SimpleAI today and discover how intelligent conversations can transform your daily interactions. No complex setup needed - just sign in and start chatting.
         </p>
         
         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
           <Link 
             to="/login"
             className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
           >
             Start Chatting Now
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
             </svg>
           </Link>
           
           <p className="text-gray-300 text-sm">
             No credit card required • Instant access
           </p>
         </div>
       </div>

       <div className="grid sm:grid-cols-3 gap-6 mt-12 text-left">
         <div className="flex items-start space-x-3">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
           </svg>
           <p className="text-gray-200">Free tier available with all essential features</p>
         </div>
         
         <div className="flex items-start space-x-3">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
           </svg>
           <p className="text-gray-200">No installation or setup required</p>
         </div>
         
         <div className="flex items-start space-x-3">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
           </svg>
           <p className="text-gray-200">24/7 AI assistance at your fingertips</p>
         </div>
       </div>
     </div>
   </section>
 );
}

export default GetStarted;