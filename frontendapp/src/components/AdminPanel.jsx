import React, { useState, useEffect } from 'react';
import API_BASE_URL from "../config";
import { Plus, Trash2, Eye, Home, FolderOpen, Users, MessageSquare, Mail } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  
  const [projectForm, setProjectForm] = useState({ name: '', description: '', imageUrl: '' });
  const [clientForm, setClientForm] = useState({ name: '', description: '', designation: '', imageUrl: '' });

  useEffect(() => {
    fetchProjects();
    fetchClients();
    fetchContacts();
    fetchNewsletters();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clients`);
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchNewsletters = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter`);
      const data = await response.json();
      setNewsletters(data);
    } catch (error) {
      console.error('Error fetching newsletters:', error);
    }
  };

  const handleAddProject = async () => {
    if (!projectForm.name || !projectForm.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectForm)
      });
      if (response.ok) {
        alert('Project added successfully!');
        setProjectForm({ name: '', description: '', imageUrl: '' });
        fetchProjects();
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Error adding project. Please try again.');
    }
  };

  const handleAddClient = async () => {
    if (!clientForm.name || !clientForm.description || !clientForm.designation) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientForm)
      });
      if (response.ok) {
        alert('Client added successfully!');
        setClientForm({ name: '', description: '', designation: '', imageUrl: '' });
        fetchClients();
      }
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Error adding client. Please try again.');
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Project deleted successfully!');
          fetchProjects();
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/clients/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Client deleted successfully!');
          fetchClients();
        }
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Error deleting client. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-blue-100 mt-1">Manage your website content</p>
            </div>
            <a 
              href="/" 
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
            >
              <Home size={20} />
              View Site
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Projects</p>
                <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
              </div>
              <FolderOpen size={40} className="text-blue-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Clients</p>
                <p className="text-3xl font-bold text-green-600">{clients.length}</p>
              </div>
              <Users size={40} className="text-green-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Contact Submissions</p>
                <p className="text-3xl font-bold text-purple-600">{contacts.length}</p>
              </div>
              <MessageSquare size={40} className="text-purple-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Subscribers</p>
                <p className="text-3xl font-bold text-orange-600">{newsletters.length}</p>
              </div>
              <Mail size={40} className="text-orange-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-4 font-semibold transition flex items-center gap-2 ${
                activeTab === 'projects' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <FolderOpen size={20} />
              Projects
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-6 py-4 font-semibold transition flex items-center gap-2 ${
                activeTab === 'clients' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Users size={20} />
              Clients
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-6 py-4 font-semibold transition flex items-center gap-2 ${
                activeTab === 'contacts' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <MessageSquare size={20} />
              Contacts
            </button>
            <button
              onClick={() => setActiveTab('newsletters')}
              className={`px-6 py-4 font-semibold transition flex items-center gap-2 ${
                activeTab === 'newsletters' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Mail size={20} />
              Newsletters
            </button>
          </div>

          <div className="p-6">
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Projects</h2>
                
                {/* Add Project Form */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-8 border border-blue-200">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Project</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Project Name *</label>
                      <input
                        type="text"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Enter project name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                      <input
                        type="text"
                        value={projectForm.imageUrl}
                        onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      rows="4"
                      placeholder="Enter project description"
                    />
                  </div>
                  <button
                    onClick={handleAddProject}
                    className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2 transform hover:scale-105"
                  >
                    <Plus size={20} />
                    Add Project
                  </button>
                </div>

                {/* Projects List */}
                <h3 className="text-xl font-semibold mb-4 text-gray-800">All Projects ({projects.length})</h3>
                {projects.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FolderOpen size={64} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">No projects yet. Add your first project above!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition">
                        <div className="flex items-center gap-4 flex-1">
                          <img 
                            src={project.imageUrl || 'https://via.placeholder.com/100'} 
                            alt={project.name} 
                            className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200" 
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg text-gray-800">{project.name}</h4>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{project.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Clients Tab */}
            {activeTab === 'clients' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Clients</h2>
                
                {/* Add Client Form */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-8 border border-green-200">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Client</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Client Name *</label>
                      <input
                        type="text"
                        value={clientForm.name}
                        onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Enter client name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Designation *</label>
                      <input
                        type="text"
                        value={clientForm.designation}
                        onChange={(e) => setClientForm({...clientForm, designation: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="e.g. CEO, Designer, Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                      <input
                        type="text"
                        value={clientForm.imageUrl}
                        onChange={(e) => setClientForm({...clientForm, imageUrl: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Testimonial *</label>
                      <textarea
                        value={clientForm.description}
                        onChange={(e) => setClientForm({...clientForm, description: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        rows="3"
                        placeholder="Enter client testimonial"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleAddClient}
                    className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2 transform hover:scale-105"
                  >
                    <Plus size={20} />
                    Add Client
                  </button>
                </div>

                {/* Clients List */}
                <h3 className="text-xl font-semibold mb-4 text-gray-800">All Clients ({clients.length})</h3>
                {clients.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Users size={64} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">No clients yet. Add your first client testimonial above!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div key={client.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition">
                        <div className="flex items-center gap-4 flex-1">
                          <img 
                            src={client.imageUrl || 'https://via.placeholder.com/80'} 
                            alt={client.name} 
                            className="w-20 h-20 object-cover rounded-full border-2 border-gray-200" 
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg text-gray-800">{client.name}</h4>
                            <p className="text-green-600 text-sm font-medium">{client.designation}</p>
                            <p className="text-gray-600 text-sm mt-1 italic">"{client.description}"</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteClient(client.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Form Submissions</h2>
                {contacts.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <MessageSquare size={64} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">No contact submissions yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                    <table className="w-full">
                      <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Full Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Mobile</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">City</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((contact, index) => (
                          <tr 
                            key={contact.id} 
                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}
                          >
                            <td className="px-6 py-4 text-gray-800 font-medium">{contact.fullName}</td>
                            <td className="px-6 py-4 text-gray-600">{contact.email}</td>
                            <td className="px-6 py-4 text-gray-600">{contact.mobile}</td>
                            <td className="px-6 py-4 text-gray-600">{contact.city}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Newsletters Tab */}
            {activeTab === 'newsletters' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Newsletter Subscriptions</h2>
                {newsletters.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Mail size={64} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">No newsletter subscribers yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {newsletters.map((newsletter, index) => (
                      <div key={newsletter.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition">
                        <div className="bg-gradient-to-r from-orange-100 to-red-100 p-3 rounded-full">
                          <Mail className="text-orange-600" size={24} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{newsletter.email}</p>
                          <p className="text-sm text-gray-500">Subscriber #{index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;