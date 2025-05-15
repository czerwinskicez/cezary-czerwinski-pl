import React from 'react';
import { UserIcon, BriefcaseIcon, GraduationCapIcon, AwardIcon, CodeIcon, GlobeIcon, HeartIcon, CoffeeIcon, BrainIcon } from 'lucide-react';
import { LinkedIn, GitHub } from './SMIcons';

export function About() {
  return <section id="about" className="pt-16 pb-40 bg-black relative">
      <div className="absolute -top-5 left-0 w-full h-32 bg-zinc-900 transform -skew-y-2" />
      <div className="container mx-auto max-w-5xl px-4 relative">
        <div className="text-center mb-16">
          <span className="text-red-500 font-medium">Get to know me</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-2">About Me</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-12 gap-12">
          {/* Left Column - Image and Quick Facts */}
          <div className="md:col-span-5">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-red-600 transform translate-x-3 translate-y-3" />
              <img src="/src/static/img/profile.png" alt="Cezary Czerwiński Profile" className="relative z-10 w-full h-[400px] object-cover grayscale-[.32] hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 p-4 group hover:bg-red-600 transition-colors">
                <CodeIcon className="w-6 h-6 mb-2 text-red-500 group-hover:text-white" />
                <h4 className="font-semibold text-white">Favourite Language</h4>
                <p className="text-gray-400 text-sm group-hover:text-white">
                  TypeScript, Node.js
                </p>
              </div>
              <div className="bg-zinc-900 p-4 group hover:bg-red-600 transition-colors">
                <GlobeIcon className="w-6 h-6 mb-2 text-red-500 group-hover:text-white" />
                <h4 className="font-semibold text-white">Location</h4>
                <p className="text-gray-400 text-sm group-hover:text-white">
                  Poland
                </p>
              </div>
              <div className="bg-zinc-900 p-4 group hover:bg-red-600 transition-colors">
                <HeartIcon className="w-6 h-6 mb-2 text-red-500 group-hover:text-white" />
                <h4 className="font-semibold text-white">Interests</h4>
                <p className="text-gray-400 text-sm group-hover:text-white">
                  Business, Science, Future, AI Behaviour
                </p>
              </div>
              <div className="bg-zinc-900 p-4 group hover:bg-red-600 transition-colors">
                <CoffeeIcon className="w-6 h-6 mb-2 text-red-500 group-hover:text-white" />
                <h4 className="font-semibold text-white">Coffee</h4>
                <p className="text-gray-400 text-sm group-hover:text-white">
                  Black, Always
                </p>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-8">
              <LinkedIn />
              {/* <a href="#" className="w-12 h-12 bg-zinc-900 flex items-center justify-center hover:bg-red-600 transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-red-500 group-hover:text-white" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </a> */}
              <GitHub />
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="md:col-span-7 space-y-8">
            <div>
              <div className="flex items-center mb-4">
                <UserIcon className="text-red-500 mr-3" size={24} />
                <h3 className="text-2xl font-bold text-white">Who I Am</h3>
              </div>
              <div className="bg-zinc-900 p-6">
                <p className="text-gray-300 leading-relaxed">
                  Hey there! I'm a tech enthusiast and consultant who loves
                  turning complex problems into elegant solutions. When I'm not
                  deep diving into code or architecting cloud solutions, you'll
                  find me writing about the latest tech trends and sharing
                  insights from my decade-long journey in the digital world.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900 p-6">
                <div className="flex items-center mb-4">
                  <BriefcaseIcon className="text-red-500 mr-3" size={24} />
                  <h3 className="text-xl font-bold text-white">Experience</h3>
                </div>
                <ul className="space-y-4 text-gray-300">
                  <li>
                    <span className="text-red-500 font-medium">
                      2025 - Present
                    </span>
                    <p className="font-medium mt-1">PPH Kostrzewa - Technology Lead</p>
                    <p className="text-sm text-gray-400">
                      Helping to navigate into digital transformation and innovation
                    </p>
                  </li>
                  <li>
                    <span className="text-red-500 font-medium">
                      2021 - 2024
                    </span>
                    <p className="font-medium mt-1">PwC - Marketing Cloud Consultant</p>
                    <p className="text-sm text-gray-400">
                      Understanding client needs, consulting on best practices, and delivering best available solutions
                    </p>
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-900 p-6">
                <div className="flex items-center mb-4">
                  <GraduationCapIcon className="text-red-500 mr-3" size={24} />
                  <h3 className="text-xl font-bold text-white">Education</h3>
                </div>
                <ul className="space-y-4 text-gray-300">
                  <li>
                    <span className="text-red-500 font-medium">
                      Day of birth - Current
                    </span>
                    <p className="font-medium mt-1">Life learner</p>
                    <p className="text-sm text-gray-400">Always thirsty for acquiring knowledge</p>
                  </li>
                  <li>
                    <span className="text-red-500 font-medium">
                      2021 - 2023
                    </span>
                    <p className="font-medium mt-1">WIT Academy</p>
                    <p className="text-sm text-gray-400">IT Management</p>
                  </li>
                  <li>
                    <span className="text-red-500 font-medium">
                      2018 - 2021
                    </span>
                    <p className="font-medium mt-1">Military Univeristy of Technology</p>
                    <p className="text-sm text-gray-400">Information Technology</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-zinc-900 p-6">
              <div className="flex items-center mb-4">
                <BrainIcon className="text-red-500 mr-3" size={24} />
                <h3 className="text-xl font-bold text-white">Fields of interest</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-1 bg-red-600"></div>
                  <p className="font-medium text-white">Business analysis</p>
                  <p className="text-sm text-gray-400">Internal & External Communication, Risk Management, Optimal Solution Analysis, Market Analysis</p>
                </div>
                <div className="space-y-2">
                  <div className="h-1 bg-red-600"></div>
                  <p className="font-medium text-white">Web Development</p>
                  <p className="text-sm text-gray-400">
                    Frontend, Backend, Cloud, Serverless, Microservices, Applications, Ubuntu
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="h-1 bg-red-600"></div>
                  <p className="font-medium text-white">Leadership</p>
                  <p className="text-sm text-gray-400">Team Management, Public Presentations, Project Organization, Networking Conferences</p>
                </div>
                <div className="space-y-2">
                  <div className="h-1 bg-red-600"></div>
                  <p className="font-medium text-white">Research & Development</p>
                  <p className="text-sm text-gray-400">
                    Quantum Computing, Machine Learning, LLM, AI Agents, Polymorphic System Architectures
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-full h-32 bg-zinc-900 transform skew-y-2" />
    </section>;
}