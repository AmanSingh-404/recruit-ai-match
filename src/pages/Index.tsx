
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CircleCheck, FileText, Star, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b flex items-center justify-between bg-white">
        <div className="flex items-center space-x-2">
          <div className="font-bold text-2xl bg-gradient-to-r from-recruit-blue to-recruit-purple bg-clip-text text-transparent">
            RecruitAI
          </div>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 md:py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-recruit-blue to-recruit-purple bg-clip-text text-transparent">
                AI-Powered Recruitment Made Simple
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Match the right candidates to your job openings with intelligent resume parsing 
                and AI-powered skill matching.
              </p>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <Button size="lg" asChild>
                  <Link to="/dashboard">Start Matching</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#features">Learn More</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-100 rounded w-3/4 animate-pulse-light"></div>
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="text-recruit-blue h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-100 rounded w-full mb-2 animate-pulse-light"></div>
                      <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse-light"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-medium text-gray-500">Match Score</div>
                    <div className="h-4 bg-gradient-to-r from-recruit-blue to-recruit-purple rounded w-4/5"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="h-3 bg-gray-100 rounded w-full mb-1 animate-pulse-light"></div>
                      <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse-light"></div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="h-3 bg-gray-100 rounded w-full mb-1 animate-pulse-light"></div>
                      <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse-light"></div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="h-3 bg-gray-100 rounded w-full mb-1 animate-pulse-light"></div>
                      <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse-light"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                <Star className="text-yellow-400 h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                <CircleCheck className="text-green-500 h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How RecruitAI Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <div className="bg-recruit-blue text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Document Upload</h3>
              <p className="text-gray-700">
                Upload job descriptions and resumes in PDF or DOCX format. Our AI extracts key information automatically.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
              <div className="bg-recruit-purple text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Matching</h3>
              <p className="text-gray-700">
                Our advanced NLP algorithms compare resumes to job descriptions, generating accurate match scores.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <div className="bg-recruit-blue text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <CircleCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Interview Scheduling</h3>
              <p className="text-gray-700">
                Schedule interviews with top candidates directly through our platform with Google Calendar integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-recruit-blue to-recruit-purple text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Recruitment Process?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of companies using RecruitAI to find the perfect candidates faster.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/dashboard">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-xl bg-gradient-to-r from-recruit-blue to-recruit-purple bg-clip-text text-transparent">
                RecruitAI
              </div>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} RecruitAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
