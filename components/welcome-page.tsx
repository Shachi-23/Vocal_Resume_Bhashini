// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { LoginModal } from "@/components/login-modal"
// import { SignupModal } from "@/components/signup-modal"
// import { useRouter } from "next/navigation"

// export function WelcomePage() {
//   const [showLogin, setShowLogin] = useState(false)
//   const [showSignup, setShowSignup] = useState(false)
//   const router = useRouter()

//   const handleContinueWithoutSignup = () => {
//     router.push("/language-selection")
//   }

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Animated background with cycling professional images */}
//       <div className="absolute inset-0">
//         {/* Animated background with multiple professional scenes */}
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-indigo-900/90"></div>

//         {/* Animated floating elements representing different professions */}
//         <div className="absolute inset-0 overflow-hidden">
//           {/* Floating professional icons with animation */}
//           <div className="absolute top-20 left-10 animate-bounce delay-0">
//             <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//               <svg className="w-8 h-8 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
//               </svg>
//             </div>
//           </div>

//           <div className="absolute top-32 right-20 animate-bounce delay-300">
//             <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//               <svg className="w-10 h-10 text-green-300" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9zm2 0a1 1 0 100 2h.01a1 1 0 100-2H11z"
//                 />
//               </svg>
//             </div>
//           </div>

//           <div className="absolute bottom-32 left-20 animate-bounce delay-700">
//             <div className="w-18 h-18 bg-yellow-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//               <svg className="w-9 h-9 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
//                 />
//               </svg>
//             </div>
//           </div>

//           <div className="absolute top-40 left-1/2 animate-bounce delay-1000">
//             <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//               <svg className="w-7 h-7 text-red-300" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" />
//               </svg>
//             </div>
//           </div>

//           <div className="absolute bottom-20 right-10 animate-bounce delay-500">
//             <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//               <svg className="w-8 h-8 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
//                 />
//               </svg>
//             </div>
//           </div>

//           {/* Animated gradient overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
//         </div>

//         {/* Professional background pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//               animation: "float 20s ease-in-out infinite",
//             }}
//           ></div>
//         </div>
//       </div>

//       {/* Header */}
//       <header className="relative z-10 flex justify-between items-center p-6">
//         <div className="flex items-center space-x-2">
//           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//             <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 110 2h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 4h2V3H9v1zm-4 2v9a1 1 0 001 1h8a1 1 0 001-1V6H5z" />
//             </svg>
//           </div>
//           <h1 className="text-2xl font-bold text-white">Vocal Resume</h1>
//         </div>

//         <div className="flex space-x-4">
//           <Button
//             variant="outline"
//             className="bg-white/10 border-white/20 text-white hover:bg-white/20"
//             onClick={() => setShowLogin(true)}
//           >
//             Login
//           </Button>
//           <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowSignup(true)}>
//             Sign Up
//           </Button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center px-6">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
//             Create Your Resume
//             <br />
//             <span className="text-blue-400">With Your Voice</span>
//           </h2>

//           <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
//             Transform your career story into a professional resume using the power of voice. Perfect for tailors,
//             drivers, electricians, security guards, and all skilled professionals.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Button
//               size="lg"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
//               onClick={handleContinueWithoutSignup}
//             >
//               Continue Without Sign Up
//             </Button>
//             <p className="text-gray-300 text-sm">Or create an account to save your resumes</p>
//           </div>
//         </div>

//         {/* Features */}
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//           <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
//             <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-white mb-2">Voice-Powered</h3>
//             <p className="text-gray-300 text-sm">
//               Simply speak your experience and skills - we'll format it professionally
//             </p>
//           </div>

//           <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
//             <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-white mb-2">Professional Templates</h3>
//             <p className="text-gray-300 text-sm">
//               Choose from multiple resume templates designed for different industries
//             </p>
//           </div>

//           <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
//             <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-white mb-2">Multi-Language</h3>
//             <p className="text-gray-300 text-sm">Create resumes in multiple languages to reach more opportunities</p>
//           </div>
//         </div>
//       </main>

//       {/* Modals */}
//       <LoginModal
//         isOpen={showLogin}
//         onClose={() => setShowLogin(false)}
//         onSwitchToSignup={() => {
//           setShowLogin(false)
//           setShowSignup(true)
//         }}
//       />
//       <SignupModal
//         isOpen={showSignup}
//         onClose={() => setShowSignup(false)}
//         onSwitchToLogin={() => {
//           setShowSignup(false)
//           setShowLogin(true)
//         }}
//       />

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           33% { transform: translateY(-10px) rotate(1deg); }
//           66% { transform: translateY(5px) rotate(-1deg); }
//         }
//       `}</style>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LoginModal } from "@/components/login-modal"
import { SignupModal } from "@/components/signup-modal"
import { useRouter } from "next/navigation"

export function WelcomePage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const router = useRouter()

  const handleContinueWithoutSignup = () => {
    router.push("/language-selection")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 110 2h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 4h2V3H9v1zm-4 2v9a1 1 0 001 1h8a1 1 0 001-1V6H5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Vocal Resume</h1>
        </div>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            onClick={() => setShowLogin(true)}
          >
            Login
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowSignup(true)}>
            Sign Up
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Create Your Resume
            <br />
            <span className="text-blue-600">With Your Voice</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your career story into a professional resume using the power of voice. Perfect for tailors,
            drivers, electricians, security guards, and all skilled professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
              onClick={handleContinueWithoutSignup}
            >
              Continue Without Sign Up
            </Button>
            <p className="text-gray-500 text-sm">Or create an account to save your resumes</p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice-Powered</h3>
            <p className="text-gray-600 text-sm">
              Simply speak your experience and skills - we'll format it professionally
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Templates</h3>
            <p className="text-gray-600 text-sm">
              Choose from multiple resume templates designed for different industries
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Language</h3>
            <p className="text-gray-600 text-sm">Create resumes in multiple languages to reach more opportunities</p>
          </div>
        </div>
      </main>

      {/* Modals */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false)
          setShowSignup(true)
        }}
      />
      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false)
          setShowLogin(true)
        }}
      />
    </div>
  )
}
