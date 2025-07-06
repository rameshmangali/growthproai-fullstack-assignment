import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useBusiness } from '../context/BusinessContext';

const BusinessForm = () => {
  const { fetchBusinessData, loading } = useBusiness();
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Business name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Business name must be at least 2 characters';
        } else if (value.trim().length > 50) {
          newErrors.name = 'Business name must be less than 50 characters';
        } else {
          delete newErrors.name;
        }
        break;
      case 'location':
        if (!value.trim()) {
          newErrors.location = 'Location is required';
        } else if (value.trim().length < 2) {
          newErrors.location = 'Location must be at least 2 characters';
        } else if (value.trim().length > 50) {
          newErrors.location = 'Location must be less than 50 characters';
        } else {
          delete newErrors.location;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const nameValid = validateField('name', formData.name);
    const locationValid = validateField('location', formData.location);
    
    // Mark all fields as touched
    setTouched({ name: true, location: true });
    
    if (nameValid && locationValid) {
      fetchBusinessData(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate field if it has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const isFormValid = Object.keys(errors).length === 0 && 
                     formData.name.trim() && 
                     formData.location.trim();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Business Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter business name"
            disabled={loading}
          />
          {errors.name && touched.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.location && touched.location ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter location"
            disabled={loading}
          />
          {errors.location && touched.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading || !isFormValid}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Loading...
            </>
          ) : (
            'Get Business Data'
          )}
        </button>
      </form>
    </div>
  );
};

export default BusinessForm;