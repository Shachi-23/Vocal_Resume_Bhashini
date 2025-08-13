"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const indianLanguages = [
  { code: "hi", name: "हिंदी", english: "Hindi" },
  { code: "en", name: "English", english: "English" },
  { code: "bn", name: "বাংলা", english: "Bengali" },
  { code: "te", name: "తెలుగు", english: "Telugu" },
  { code: "mr", name: "मराठी", english: "Marathi" },
  { code: "ta", name: "தமிழ்", english: "Tamil" },
  { code: "gu", name: "ગુજરાતી", english: "Gujarati" },
  { code: "kn", name: "ಕನ್ನಡ", english: "Kannada" },
  { code: "ml", name: "മലയാളം", english: "Malayalam" },
  { code: "pa", name: "ਪੰਜਾਬੀ", english: "Punjabi" },
  { code: "or", name: "ଓଡ଼ିଆ", english: "Odia" },
  { code: "as", name: "অসমীয়া", english: "Assamese" },
  { code: "ur", name: "اردو", english: "Urdu" },
  { code: "sa", name: "संस्कृत", english: "Sanskrit" },
  { code: "ne", name: "नेपाली", english: "Nepali" },
]

export function LanguageSelection() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const router = useRouter()

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    // Store selected language in localStorage or context
    localStorage.setItem("selectedLanguage", languageCode)

    setTimeout(() => {
      router.push("/profession-selection")
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 110 2h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 4h2V3H9v1zm-4 2v9a1 1 0 001 1h8a1 1 0 001-1V6H5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Vocal Resume</h1>
        </div>

        <Button
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Language</h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Select your preferred language to create your resume. You can record your experience in your native
              language.
            </p>
          </div>

          {/* Language Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {indianLanguages.map((language) => (
              <Button
                key={language.code}
                variant="outline"
                className={`
                  h-20 flex flex-col items-center justify-center space-y-1 
                  bg-white/10 border-white/20 text-white hover:bg-white/20 
                  transition-all duration-300 hover:scale-105
                  ${selectedLanguage === language.code ? "bg-blue-600/50 border-blue-400" : ""}
                `}
                onClick={() => handleLanguageSelect(language.code)}
              >
                <span className="text-lg font-semibold">{language.name}</span>
                <span className="text-xs text-gray-300">{language.english}</span>
              </Button>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-white">Voice Recording in Your Language</h3>
            </div>
            <p className="text-gray-300 text-center">
              Once you select a language, you can record your work experience, skills, and achievements in that
              language. Our AI will help format it into a professional resume.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
