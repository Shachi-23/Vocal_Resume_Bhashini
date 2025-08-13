"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  Edit,
  Globe,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Calendar,
  Building,
  GraduationCap,
  Award,
  Languages,
  User,
  FileText,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface ResumeData {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    linkedin: string
  }
  summary: string
  experience: Array<{
    title: string
    company: string
    dates: string
    location: string
    description: string
  }>
  education: Array<{
    degree: string
    institution: string
    dates: string
    location: string
  }>
  skills: string[]
  projects: Array<{
    name: string
    description: string
    technologies: string
    link: string
    dates: string
  }>
  certifications: Array<{
    name: string
    issuer: string
    date: string
  }>
  languages: string[]
  originalLanguage?: string
  originalTranscript?: string
  englishTranscript?: string
  translatedResume?: ResumeData
}

interface DisplayContent {
  title: string
  subtitle: string
  englishVersion: string
  originalVersion: string
  personalInfo: string
  summary: string
  experience: string
  education: string
  skills: string
  projects: string
  certifications: string
  languages: string
  downloadResume: string
  editResume: string
  backToRecording: string
  missingFields: string
  completeProfile: string
  transcript: string
  showTranscript: string
  hideTranscript: string
}

// Multi-language content for resume display
const displayContent: Record<string, DisplayContent> = {
  en: {
    title: "Your Professional Resume",
    subtitle: "Generated from your voice recording",
    englishVersion: "English Version",
    originalVersion: "Original Language Version",
    personalInfo: "Personal Information",
    summary: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    languages: "Languages",
    downloadResume: "Download Resume",
    editResume: "Edit Resume",
    backToRecording: "Record Again",
    missingFields: "Missing Information",
    completeProfile: "Complete Your Profile",
    transcript: "Original Recording",
    showTranscript: "Show Transcript",
    hideTranscript: "Hide Transcript",
  },
  hi: {
    title: "आपका पेशेवर रिज्यूमे",
    subtitle: "आपकी आवाज़ की रिकॉर्डिंग से तैयार किया गया",
    englishVersion: "अंग्रेजी संस्करण",
    originalVersion: "मूल भाषा संस्करण",
    personalInfo: "व्यक्तिगत जानकारी",
    summary: "पेशेवर सारांश",
    experience: "कार्य अनुभव",
    education: "शिक्षा",
    skills: "कौशल",
    projects: "परियोजनाएं",
    certifications: "प्रमाणपत्र",
    languages: "भाषाएं",
    downloadResume: "रिज्यूमे डाउनलोड करें",
    editResume: "रिज्यूमे संपादित करें",
    backToRecording: "फिर से रिकॉर्ड करें",
    missingFields: "अनुपस्थित जानकारी",
    completeProfile: "अपनी प्रोफ़ाइल पूरी करें",
    transcript: "मूल रिकॉर्डिंग",
    showTranscript: "ट्रांसक्रिप्ट दिखाएं",
    hideTranscript: "ट्रांसक्रिप्ट छुपाएं",
  },
  bn: {
    title: "আপনার পেশাদার রিজিউমে",
    subtitle: "আপনার ভয়েস রেকর্ডিং থেকে তৈরি",
    englishVersion: "ইংরেজি সংস্করণ",
    originalVersion: "মূল ভাষার সংস্করণ",
    personalInfo: "ব্যক্তিগত তথ্য",
    summary: "পেশাদার সারসংক্ষেপ",
    experience: "কাজের অভিজ্ঞতা",
    education: "শিক্ষা",
    skills: "দক্ষতা",
    projects: "প্রকল্প",
    certifications: "সার্টিফিকেশন",
    languages: "ভাষা",
    downloadResume: "রিজিউমে ডাউনলোড করুন",
    editResume: "রিজিউমে সম্পাদনা করুন",
    backToRecording: "আবার রেকর্ড করুন",
    missingFields: "অনুপস্থিত তথ্য",
    completeProfile: "আপনার প্রোফাইল সম্পূর্ণ করুন",
    transcript: "মূল রেকর্ডিং",
    showTranscript: "ট্রান্সক্রিপ্ট দেখান",
    hideTranscript: "ট্রান্সক্রিপ্ট লুকান",
  },
  te: {
    title: "మీ వృత్తిపరమైన రెజ్యూమ్",
    subtitle: "మీ వాయిస్ రికార్డింగ్ నుండి రూపొందించబడింది",
    englishVersion: "ఆంగ్ల వెర్షన్",
    originalVersion: "అసలు భాషా వెర్షన్",
    personalInfo: "వ్యక్తిగత సమాచారం",
    summary: "వృత్తిపరమైన సారాంశం",
    experience: "పని అనుభవం",
    education: "విద్య",
    skills: "నైపుణ్యాలు",
    projects: "ప్రాజెక్ట్‌లు",
    certifications: "సర్టిఫికేషన్‌లు",
    languages: "భాషలు",
    downloadResume: "రెజ్యూమ్ డౌన్‌లోడ్ చేయండి",
    editResume: "రెజ్యూమ్ సవరించండి",
    backToRecording: "మళ్లీ రికార్డ్ చేయండి",
    missingFields: "తప్పిపోయిన సమాచారం",
    completeProfile: "మీ ప్రొఫైల్‌ను పూర్తి చేయండి",
    transcript: "అసలు రికార్డింగ్",
    showTranscript: "ట్రాన్స్‌క్రిప్ట్ చూపించు",
    hideTranscript: "ట్రాన్స్‌క్రిప్ట్ దాచు",
  },
  ta: {
    title: "உங்கள் தொழில்முறை ரெஸ்யூமே",
    subtitle: "உங்கள் குரல் பதிவிலிருந்து உருவாக்கப்பட்டது",
    englishVersion: "ஆங்கில பதிப்பு",
    originalVersion: "அசல் மொழி பதிப்பு",
    personalInfo: "தனிப்பட்ட தகவல்",
    summary: "தொழில்முறை சுருக்கம்",
    experience: "பணி அனுபவம்",
    education: "கல்வி",
    skills: "திறன்கள்",
    projects: "திட்டங்கள்",
    certifications: "சான்றிதழ்கள்",
    languages: "மொழிகள்",
    downloadResume: "ரெஸ்யூமேவை பதிவிறக்கவும்",
    editResume: "ரெஸ்யூமேவை திருத்தவும்",
    backToRecording: "மீண்டும் பதிவு செய்யவும்",
    missingFields: "விடுபட்ட தகவல்",
    completeProfile: "உங்கள் சுயவிவரத்தை முடிக்கவும்",
    transcript: "அசல் பதிவு",
    showTranscript: "டிரான்ஸ்கிரிப்ட்டைக் காட்டு",
    hideTranscript: "டிரான்ஸ்கிரிப்ட்டை மறைக்கவும்",
  },
}

export function ResumeDisplay() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [currentView, setCurrentView] = useState<"english" | "original">("english")
  const [showTranscript, setShowTranscript] = useState(false)
  const [missingFields, setMissingFields] = useState<string[]>([])
  const [isDownloading, setIsDownloading] = useState(false)

  const content = displayContent[selectedLanguage] || displayContent.en

  useEffect(() => {
    // Get stored data
    const storedResumeData = localStorage.getItem("resumeData")
    const storedLanguage = localStorage.getItem("selectedLanguage") || "en"

    setSelectedLanguage(storedLanguage)

    if (storedResumeData) {
      try {
        const parsedData = JSON.parse(storedResumeData)
        setResumeData(parsedData)

        // Check for missing required fields
        const missing = checkMissingFields(parsedData)
        setMissingFields(missing)
      } catch (error) {
        console.error("Error parsing resume data:", error)
        router.push("/")
      }
    } else {
      router.push("/")
    }
  }, [router])

  const checkMissingFields = (data: ResumeData): string[] => {
    const missing: string[] = []

    if (!data.personalInfo.name) missing.push("Name")
    if (!data.personalInfo.email) missing.push("Email")
    if (!data.personalInfo.phone) missing.push("Phone")
    if (!data.personalInfo.location) missing.push("Location")
    if (!data.summary) missing.push("Professional Summary")
    if (!data.experience.length) missing.push("Work Experience")
    if (!data.education.length) missing.push("Education")

    return missing
  }

  const downloadResume = async () => {
    if (!resumeData) return

    setIsDownloading(true)

    try {
      const currentData =
        currentView === "original" && resumeData.translatedResume ? resumeData.translatedResume : resumeData

      // Generate HTML content for PDF
      const htmlContent = generateResumeHTML(currentData, content, currentView)

      // Create a new window for printing
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(htmlContent)
        printWindow.document.close()

        // Wait for content to load, then trigger print
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print()
            printWindow.close()
          }, 500)
        }
      } else {
        // Fallback: create downloadable HTML file
        const blob = new Blob([htmlContent], { type: "text/html" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${currentData.personalInfo.name || "Resume"}_${currentView}.html`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Error downloading resume:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const generateResumeHTML = (data: ResumeData, content: DisplayContent, view: string): string => {
    return `
<!DOCTYPE html>
<html lang="${selectedLanguage}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name || "Resume"}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
            font-size: 14px;
        }
        
        .resume-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            background: white;
        }
        
        .header {
            background: linear-gradient(135deg, #2563eb, #4f46e5);
            color: white;
            padding: 30px;
            margin: -40px -40px 30px -40px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .header .title {
            font-size: 18px;
            opacity: 0.9;
        }
        
        .contact-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
            font-size: 13px;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 15px;
            padding-bottom: 5px;
            border-bottom: 2px solid #e5e7eb;
        }
        
        .summary {
            text-align: justify;
            line-height: 1.7;
            color: #4b5563;
        }
        
        .experience-item, .education-item, .project-item {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f3f4f6;
        }
        
        .experience-item:last-child, .education-item:last-child, .project-item:last-child {
            border-bottom: none;
        }
        
        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
        }
        
        .item-title {
            font-weight: bold;
            font-size: 16px;
            color: #1f2937;
        }
        
        .item-company {
            color: #2563eb;
            font-weight: 600;
            margin-bottom: 4px;
        }
        
        .item-location {
            color: #6b7280;
            font-size: 13px;
        }
        
        .item-dates {
            color: #6b7280;
            font-size: 13px;
            white-space: nowrap;
        }
        
        .item-description {
            color: #4b5563;
            margin-top: 8px;
            text-align: justify;
        }
        
        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .skill-tag {
            background: #e5e7eb;
            color: #374151;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .languages-list {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .language-item {
            color: #4b5563;
        }
        
        .two-column {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 40px;
            margin-top: 20px;
        }
        
        .left-column .section {
            margin-bottom: 25px;
        }
        
        @media print {
            body {
                font-size: 12px;
            }
            
            .resume-container {
                padding: 20px;
                max-width: none;
            }
            
            .header {
                margin: -20px -20px 20px -20px;
                padding: 20px;
            }
            
            .header h1 {
                font-size: 28px;
            }
            
            .section {
                margin-bottom: 20px;
                page-break-inside: avoid;
            }
            
            .experience-item, .education-item {
                page-break-inside: avoid;
            }
        }
        
        @media (max-width: 768px) {
            .two-column {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .contact-info {
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
            
            .item-header {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <!-- Header -->
        <div class="header">
            <h1>${data.personalInfo.name || "Your Name"}</h1>
            <div class="title">${data.personalInfo.title || "Professional Title"}</div>
            <div class="contact-info">
                ${data.personalInfo.email ? `<div class="contact-item">📧 ${data.personalInfo.email}</div>` : ""}
                ${data.personalInfo.phone ? `<div class="contact-item">📞 ${data.personalInfo.phone}</div>` : ""}
                ${data.personalInfo.location ? `<div class="contact-item">📍 ${data.personalInfo.location}</div>` : ""}
                ${data.personalInfo.linkedin ? `<div class="contact-item">💼 ${data.personalInfo.linkedin}</div>` : ""}
            </div>
        </div>

        <div class="two-column">
            <!-- Left Column -->
            <div class="left-column">
                ${
                  data.skills && data.skills.length > 0
                    ? `
                <div class="section">
                    <h2 class="section-title">${content.skills}</h2>
                    <div class="skills-container">
                        ${data.skills.map((skill: string) => `<span class="skill-tag">${skill}</span>`).join("")}
                    </div>
                </div>
                `
                    : ""
                }

                ${
                  data.languages && data.languages.length > 0
                    ? `
                <div class="section">
                    <h2 class="section-title">${content.languages}</h2>
                    <div class="languages-list">
                        ${data.languages.map((lang: string) => `<div class="language-item">${lang}</div>`).join("")}
                    </div>
                </div>
                `
                    : ""
                }

                ${
                  data.certifications && data.certifications.length > 0
                    ? `
                <div class="section">
                    <h2 class="section-title">${content.certifications}</h2>
                    ${data.certifications
                      .map(
                        (cert: { name: string; issuer: string; date: string }) => `
                        <div class="experience-item">
                            <div class="item-header">
                                <div>
                                    <div class="item-title">${cert.name}</div>
                                    <div class="item-company">${cert.issuer}</div>
                                </div>
                                ${cert.date ? `<div class="item-dates">${cert.date}</div>` : ""}
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
                `
                    : ""
                }
            </div>

            <!-- Right Column -->
            <div class="right-column">
                ${
                  data.summary
                    ? `
                <div class="section">
                    <h2 class="section-title">${content.summary}</h2>
                    <div class="summary">${data.summary}</div>
                </div>
                `
                    : ""
                }

                ${
                  data.experience && data.experience.length > 0
                    ? `
                <div class="section">
                    <h2 class="section-title">${content.experience}</h2>
                    ${data.experience
                      .map(
                        (exp: {
                          title: string
                          company: string
                          location: string
                          dates: string
                          description: string
                        }) => `
                        <div class="experience-item">
                            <div class="item-header">
                                <div>
                                    <div class="item-title">${exp.title}</div>
                                    <div class="item-company">${exp.company}</div>
                                    ${exp.location ? `<div class="item-location">${exp.location}</div>` : ""}
                                </div>
                                ${exp.dates ? `<div class="item-dates">${exp.dates}</div>` : ""}
                            </div>
                            ${exp.description ? `<div class="item-description">${exp.description}</div>` : ""}
                        </div>
                    `,
                      )
                      .join("")}
                </div>
                `
                    : ""
                }

                ${
                  data.education && data.education.length > 0
                    ? `
                <div class="section">
                    <h2 class="section-title">${content.education}</h2>
                    ${data.education
                      .map(
                        (edu: { degree: string; institution: string; location: string; dates: string }) => `
                        <div class="education-item">
                            <div class="item-header">
                                <div>
                                    <div class="item-title">${edu.degree}</div>
                                    <div class="item-company">${edu.institution}</div>
                                    ${edu.location ? `<div class="item-location">${edu.location}</div>` : ""}
                                </div>
                                ${edu.dates ? `<div class="item-dates">${edu.dates}</div>` : ""}
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
                `
                    : ""
                }

                ${
                  data.projects && data.projects.length > 0
                    ? `
                <div class="section">
                    <h2 class="section-title">${content.projects}</h2>
                    ${data.projects
                      .map(
                        (project: { name: string; dates: string; description: string; technologies: string }) => `
                        <div class="project-item">
                            <div class="item-header">
                                <div class="item-title">${project.name}</div>
                                ${project.dates ? `<div class="item-dates">${project.dates}</div>` : ""}
                            </div>
                            ${project.description ? `<div class="item-description">${project.description}</div>` : ""}
                            ${project.technologies ? `<div class="item-description"><strong>Technologies:</strong> ${project.technologies}</div>` : ""}
                        </div>
                    `,
                      )
                      .join("")}
                </div>
                `
                    : ""
                }
            </div>
        </div>
    </div>
</body>
</html>
    `
  }

  const editResume = () => {
    // Navigate to edit page (to be implemented)
    router.push("/edit-resume")
  }

  const recordAgain = () => {
    // Clear stored data and go back to recording
    localStorage.removeItem("resumeData")
    router.push("/free-form-recording")
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your resume...</p>
        </div>
      </div>
    )
  }

  const currentData =
    currentView === "original" && resumeData.translatedResume ? resumeData.translatedResume : resumeData

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
          <p className="text-lg text-gray-600">{content.subtitle}</p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <Button
              variant={currentView === "english" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("english")}
              className="mr-1"
            >
              <Globe className="w-4 h-4 mr-2" />
              {content.englishVersion}
            </Button>
            {resumeData.originalLanguage !== "en" && (
              <Button
                variant={currentView === "original" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("original")}
              >
                <Languages className="w-4 h-4 mr-2" />
                {content.originalVersion}
              </Button>
            )}
          </div>
        </div>

        {/* Missing Fields Alert */}
        {missingFields.length > 0 && (
          <Card className="p-4 mb-6 border-orange-200 bg-orange-50">
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-800">{content.missingFields}</h3>
                <p className="text-sm text-orange-700 mb-2">{content.completeProfile}</p>
                <div className="flex flex-wrap gap-2">
                  {missingFields.map((field: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-orange-700 border-orange-300">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button onClick={downloadResume} disabled={isDownloading} className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? "Generating..." : content.downloadResume}
          </Button>
          <Button onClick={editResume} variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            {content.editResume}
          </Button>
          <Button onClick={recordAgain} variant="outline">
            <User className="w-4 h-4 mr-2" />
            {content.backToRecording}
          </Button>
          {resumeData.originalTranscript && (
            <Button onClick={() => setShowTranscript(!showTranscript)} variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              {showTranscript ? content.hideTranscript : content.showTranscript}
            </Button>
          )}
        </div>

        {/* Transcript Display */}
        {showTranscript && resumeData.originalTranscript && (
          <Card className="p-6 mb-8 bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              {content.transcript}
            </h3>
            <div className="bg-white p-4 rounded-lg border">
              <p className="text-gray-700 leading-relaxed">{resumeData.originalTranscript}</p>
            </div>
          </Card>
        )}

        {/* Resume Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info & Skills */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                {content.personalInfo}
              </h3>
              <div className="space-y-3">
                {currentData.personalInfo.email && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{currentData.personalInfo.email}</span>
                  </div>
                )}
                {currentData.personalInfo.phone && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{currentData.personalInfo.phone}</span>
                  </div>
                )}
                {currentData.personalInfo.location && (
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{currentData.personalInfo.location}</span>
                  </div>
                )}
                {currentData.personalInfo.linkedin && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Linkedin className="w-4 h-4 text-gray-500" />
                    <span>{currentData.personalInfo.linkedin}</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Skills */}
            {currentData.skills && currentData.skills.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">{content.skills}</h3>
                <div className="flex flex-wrap gap-2">
                  {currentData.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Languages */}
            {currentData.languages && currentData.languages.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Languages className="w-5 h-5 mr-2" />
                  {content.languages}
                </h3>
                <div className="space-y-2">
                  {currentData.languages.map((language: string, index: number) => (
                    <div key={index} className="text-sm text-gray-700">
                      {language}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <h1 className="text-3xl font-bold mb-2">{currentData.personalInfo.name || "Your Name"}</h1>
              <p className="text-xl opacity-90">{currentData.personalInfo.title || "Professional Title"}</p>
            </Card>

            {/* Professional Summary */}
            {currentData.summary && (
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">{content.summary}</h3>
                <p className="text-gray-700 leading-relaxed">{currentData.summary}</p>
              </Card>
            )}

            {/* Work Experience */}
            {currentData.experience && currentData.experience.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  {content.experience}
                </h3>
                <div className="space-y-6">
                  {currentData.experience.map((exp: ResumeData["experience"][0], index: number) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                          <p className="text-blue-600 font-medium">{exp.company}</p>
                          {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
                        </div>
                        {exp.dates && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.dates}
                          </div>
                        )}
                      </div>
                      {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
                      {index < currentData.experience.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Education */}
            {currentData.education && currentData.education.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  {content.education}
                </h3>
                <div className="space-y-4">
                  {currentData.education.map((edu: ResumeData["education"][0], index: number) => (
                    <div key={index}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                          <p className="text-blue-600">{edu.institution}</p>
                          {edu.location && <p className="text-sm text-gray-500">{edu.location}</p>}
                        </div>
                        {edu.dates && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {edu.dates}
                          </div>
                        )}
                      </div>
                      {index < currentData.education.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Projects */}
            {currentData.projects && currentData.projects.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">{content.projects}</h3>
                <div className="space-y-4">
                  {currentData.projects.map((project: ResumeData["projects"][0], index: number) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        {project.dates && <span className="text-sm text-gray-500">{project.dates}</span>}
                      </div>
                      {project.description && <p className="text-gray-700 text-sm mb-2">{project.description}</p>}
                      {project.technologies && (
                        <p className="text-sm text-blue-600">
                          <strong>Technologies:</strong> {project.technologies}
                        </p>
                      )}
                      {index < currentData.projects.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Certifications */}
            {currentData.certifications && currentData.certifications.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  {content.certifications}
                </h3>
                <div className="space-y-3">
                  {currentData.certifications.map((cert: ResumeData["certifications"][0], index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">{cert.name}</h4>
                        <p className="text-sm text-gray-600">{cert.issuer}</p>
                      </div>
                      {cert.date && <span className="text-sm text-gray-500">{cert.date}</span>}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
