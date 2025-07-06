import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useBusiness } from '../context/BusinessContext';

const BusinessCard = () => {
  const { businessData, loading, regenerateHeadline } = useBusiness();

  if (!businessData) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    
    return stars.join('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{businessData.name}</h2>
        <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
          📍 {businessData.location}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
          <h3 className="font-semibold text-gray-700 mb-2">Google Rating</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-yellow-600">{businessData.rating}</span>
            <span className="text-yellow-500 text-lg">{renderStars(businessData.rating)}</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <h3 className="font-semibold text-gray-700 mb-2">Reviews</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">{businessData.reviews}</span>
            <span className="text-sm text-gray-600">reviews</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
        <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
          <span className="mr-2">🚀</span>
          AI-Generated SEO Headline
        </h3>
        <p className="text-lg text-gray-800 mb-4 italic">"{businessData.headline}"</p>
        
        <button
          onClick={regenerateHeadline}
          disabled={loading}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Regenerating...
            </>
          ) : (
            <>
              
              Regenerate SEO Headline
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BusinessCard;