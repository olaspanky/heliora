"use client"
import React, { useState, useEffect } from 'react';
import { Search, Phone, CheckCircle, Clock, XCircle, Bell, Shield, Users, Activity } from 'lucide-react';

const HelioraApp = () => {
  const [hospitalNumber, setHospitalNumber] = useState('');
  const [claimStatus, setClaimStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [userPhone, setUserPhone] = useState('');

  // Demo data for different hospital numbers
 const demoData = {
  'HN001234': {
    patientName: 'Adaora Okafor',
    claimId: 'CLM-2024-001234',
    status: 'approved',
    treatment: 'Routine Medical Check-up',
    amount: '₦45,000',
    hmoName: 'HealthPlus HMO',
    submissionDate: '2024-07-10T10:25:00',
    lastUpdated: '2024-07-10T10:30:00',
    },
  'HN005678': {
    patientName: 'Emeka Nwosu',
    claimId: 'CLM-2024-005678',
    status: 'pending',
    treatment: 'Malaria Treatment',
    amount: '₦25,000',
    hmoName: 'CareFirst HMO',
    submissionDate: '2024-07-12T09:15:00',
    lastUpdated: '2024-07-12T09:20:00',
  },
  'HN009876': {
    patientName: 'Fatima Abdullahi',
    claimId: 'CLM-2024-009876',
    status: 'rejected',
    treatment: 'Dental Surgery',
    amount: '₦120,000',
    hmoName: 'MediGuard HMO',
    submissionDate: '2024-07-08T11:20:00',
    lastUpdated: '2024-07-08T11:50:00',
    rejectionReason: 'Pre-existing condition not covered'
  }
};

  const handleSearch = async () => {
    if (!hospitalNumber.trim()) {
      setNotification({ type: 'error', message: 'Please enter your hospital number' });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const data = demoData[hospitalNumber.toUpperCase()];
    
    if (data) {
      setClaimStatus(data);
      setNotification({ type: 'success', message: 'Claim details retrieved successfully!' });
    } else {
      setClaimStatus(null);
      setNotification({ type: 'error', message: 'Hospital number not found. Try HN001234, HN005678, or HN009876' });
    }
    
    setLoading(false);
  };

  const sendWhatsAppNotification = () => {
    if (!userPhone.trim()) {
      setNotification({ type: 'error', message: 'Please enter your phone number' });
      return;
    }

    if (!claimStatus) {
      setNotification({ type: 'error', message: 'No claim data to send notification for' });
      return;
    }

    // Demo WhatsApp notification
    const message = `🏥 *Heliora HMO Update*\n\nHello ${claimStatus.patientName},\n\nYour insurance claim (${claimStatus.claimId}) for ${claimStatus.treatment} has been *${claimStatus.status.toUpperCase()}*.\n\n${claimStatus.status === 'approved' ? '✅ Amount covered: ' + claimStatus.amount : claimStatus.status === 'rejected' ? '❌ Reason: ' + claimStatus.rejectionReason : '⏳ Your claim is being processed'}\n\nFor more details, visit our app.\n\n*Heliora - Your Health, Our Priority*`;
    
    // In a real app, this would integrate with WhatsApp Business API
    const whatsappUrl = `https://wa.me/${userPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setNotification({ type: 'success', message: 'Demo WhatsApp notification sent!' });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'pending': return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'rejected': return <XCircle className="w-6 h-6 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Heliora</h1>
                <p className="text-sm text-gray-600">HMO Claims Tracker</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <Activity className="w-5 h-5" />
                <span className="text-sm font-medium">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
          notification.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' :
          notification.type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' :
          'bg-blue-100 border border-blue-400 text-blue-700'
        }`}>
          <div className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            {notification.message}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your Insurance Claims with Heliora
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your hospital number to check the status of your HMO insurance claims in real-time
          </p>
        </div>

        {/* Search Section */}
      

        {/* Demo Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Demo Instructions</h3>
          <p className="text-blue-800 mb-3">Try these demo hospital numbers:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg">
              <p className="font-mono text-sm font-bold text-blue-900">HN001234</p>
              <p className="text-xs text-blue-700">Approved claim</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-mono text-sm font-bold text-yellow-900">HN005678</p>
              <p className="text-xs text-yellow-700">Pending claim</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-mono text-sm font-bold text-red-900">HN009876</p>
              <p className="text-xs text-red-700">Rejected claim</p>
            </div>
          </div>
        </div>

        {/* Claim Status Display */}
        {claimStatus && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Claim Details</h3>
              <div className={`px-4 py-2 rounded-full border-2 flex items-center space-x-2 ${getStatusColor(claimStatus.status)}`}>
                {getStatusIcon(claimStatus.status)}
                <span className="font-semibold capitalize">{claimStatus.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Patient Name</label>
                  <p className="text-lg font-semibold text-gray-900">{claimStatus.patientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Claim ID</label>
                  <p className="text-lg font-mono text-gray-900">{claimStatus.claimId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Treatment</label>
                  <p className="text-lg text-gray-900">{claimStatus.treatment}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Amount</label>
                  <p className="text-lg font-semibold text-gray-900">{claimStatus.amount}</p>
                </div>
                <div>
  <label className="block text-sm font-medium text-gray-600">Submission Date</label>
  <p className="text-lg text-gray-900">
    {new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date(claimStatus.submissionDate))}
  </p>
</div>
<div>
  <label className="block text-sm font-medium text-gray-600">Last Updated</label>
  <p className="text-lg text-gray-900">
    {new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date(claimStatus.lastUpdated))}
  </p>
</div>
              </div>
            </div>

            {claimStatus.status === 'rejected' && claimStatus.rejectionReason && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Rejection Reason:</h4>
                <p className="text-red-700">{claimStatus.rejectionReason}</p>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={sendWhatsAppNotification}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Send WhatsApp Update</span>
              </button>
              <button
                onClick={() => setClaimStatus(null)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Search Another Claim
              </button>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Claims</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved This Month</p>
                <p className="text-2xl font-bold text-green-600">892</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">156</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>
      </main>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col text-black sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label htmlFor="hospitalNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Number
                </label>
                <input
                  id="hospitalNumber"
                  type="text"
                  value={hospitalNumber}
                  onChange={(e) => setHospitalNumber(e.target.value)}
                  placeholder="Enter your hospital number (e.g., HN001234)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (for WhatsApp)
                </label>
                <input
                  id="userPhone"
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="e.g., +2348012345678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Search Claims</span>
                </>
              )}
            </button>
          </div>
        </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Heliora</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© 2024 Heliora. Your Health, Our Priority.</p>
              <p className="text-gray-400">Connecting Nigerians to Better Healthcare</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelioraApp;