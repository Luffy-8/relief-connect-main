import React from 'react'
import { Heart, Github, Mail, MapPin, Users, Award } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-primary-600 p-2 rounded-lg mr-3">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ReliefConnect</h3>
                <p className="text-sm text-gray-400">Team HopeHackers</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting disaster survivors & volunteers in real time. 
              A smart coordination platform for relief distribution during emergencies.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/saivallabha37/relief-connect-main" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </a>
              <a 
                href="mailto:saivallabhalinga@gmail.com" 
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                Contact
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/report-incident" className="text-gray-300 hover:text-white transition-colors">Report Incident</Link></li>
              <li><Link to="/donations?tab=volunteer" className="text-gray-300 hover:text-white transition-colors">Volunteer</Link></li>
              <li><Link to="/lost-found" className="text-gray-300 hover:text-white transition-colors">Lost & Found</Link></li>
              <li><Link to="/ai-assistant" className="text-gray-300 hover:text-white transition-colors">AI Assistant</Link></li>
              <li><Link to="/live-updates" className="text-gray-300 hover:text-white transition-colors">Live Updates</Link></li>
            </ul>
          </div>

          {/* Team Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Team Info</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Users className="h-4 w-4 mr-2" />
                <span>Team HopeHackers</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Vasavi College of Engineering</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Award className="h-4 w-4 mr-2" />
                <span>Hackathon 2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 ReliefConnect by Team HopeHackers. Built with ❤️ for emergency response.
            </div>
            <div className="text-gray-400 text-sm">
              Contact: <a href="mailto:saivallabhalinga@gmail.com" className="text-primary-400 hover:text-primary-300">saivallabhalinga@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer