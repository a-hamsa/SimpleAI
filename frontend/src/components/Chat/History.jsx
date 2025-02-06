import React from 'react';

const History = ({ history }) => {
  return (
    <div className="flex flex-col h-screen">
      <div 
        className="flex-1 overflow-y-auto flex flex-col-reverse p-4"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="mb-4 text-right">
          <div className="inline-block p-3 rounded-lg bg-blue-600 text-white">
            {history.question}
          </div>
        </div>
        <div className="mb-4 text-left">
          <div className="inline-block p-3 rounded-lg bg-gray-200 text-black">
            {history.message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
