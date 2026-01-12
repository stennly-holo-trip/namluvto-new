
import React, { useState } from 'react';
import { Briefcase, User, Eye } from 'lucide-react';
import { MOCK_JOBS_CUSTOMER, MOCK_JOBS_INTERPRETER, MOCK_PUBLIC_JOBS } from '../constants';
import { Job, JobStatus } from '../types';

type Tab = 'customer' | 'interpreter' | 'public';

const statusColors: { [key in JobStatus]: string } = {
  [JobStatus.Open]: 'bg-light text-primary',
  [JobStatus.InProgress]: 'bg-yellow-100 text-yellow-800',
  [JobStatus.InReview]: 'bg-accent text-tertiary',
  [JobStatus.Completed]: 'bg-green-100 text-green-800',
  [JobStatus.Cancelled]: 'bg-red-100 text-red-800',
};

const JobCard: React.FC<{ job: Job }> = ({ job }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold text-tertiary">{job.title}</h3>
        <p className="text-sm text-tertiary/70">
          {job.interpreterName ? `Interpret: ${job.interpreterName}` : `Zákazník: ${job.customerName}`}
        </p>
      </div>
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[job.status]}`}>
        {job.status}
      </span>
    </div>
    <p className="text-sm text-tertiary/90 mt-2">{job.description}</p>
    <div className="flex justify-between items-end mt-4">
      <p className="text-lg font-bold text-primary">{job.price.toLocaleString('cs-CZ')} Kč</p>
      <p className="text-sm text-tertiary/70">Deadline: {job.deadline}</p>
    </div>
  </div>
);

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('customer');

  const renderJobs = () => {
    switch (activeTab) {
      case 'customer':
        return MOCK_JOBS_CUSTOMER.map(job => <JobCard key={job.id} job={job} />);
      case 'interpreter':
        return MOCK_JOBS_INTERPRETER.map(job => <JobCard key={job.id} job={job} />);
      case 'public':
        return MOCK_PUBLIC_JOBS.map(job => <JobCard key={job.id} job={job} />);
      default:
        return null;
    }
  };

  const getTabClass = (tab: Tab) => {
    return activeTab === tab
      ? 'border-primary text-primary'
      : 'border-transparent text-tertiary/70 hover:text-tertiary hover:border-gray-300';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-tertiary mb-6">Můj panel</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('customer')} className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${getTabClass('customer')}`}>
              <Briefcase className="mr-2 h-5 w-5" /> Moje poptávky
            </button>
            <button onClick={() => setActiveTab('interpreter')} className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${getTabClass('interpreter')}`}>
              <User className="mr-2 h-5 w-5" /> Moje zakázky
            </button>
            <button onClick={() => setActiveTab('public')} className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${getTabClass('public')}`}>
              <Eye className="mr-2 h-5 w-5" /> Veřejné poptávky
            </button>
          </nav>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderJobs()}
      </div>
    </div>
  );
};

export default DashboardPage;
