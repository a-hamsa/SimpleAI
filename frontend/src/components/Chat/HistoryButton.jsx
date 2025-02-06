import React from 'react';

const HistoryButton = ({ history, onClick, onDelete }) => {
  const truncatedQuestion = history.question?.slice(0, 25) + '...' || 'No question';

  return (
    <div className="flex items-center justify-between mb-2 p-2 bg-gray-700 rounded hover:bg-gray-600">
      <button
        onClick={onClick}
        className="flex-1 text-left text-sm"
      >
        {truncatedQuestion}
      </button>
      {history.id && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(history.id);
          }}
          className="ml-2 px-2 text-red-400 hover:text-red-300"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default HistoryButton;
