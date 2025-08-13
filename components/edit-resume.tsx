"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Save,
  Plus,
  Trash2,
  ArrowLeft,
  User,
  Building,
  GraduationCap,
  Languages,
  Briefcase,
  AlertCircle,
  CheckCircle,
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
}

// Multi-language content for edit form
const editContent = {
  en: {
    title: "Complete Your Resume",
    subtitle: "Fill in missing information to make your resume complete",
    personalInfo: "Personal Information",
    summary: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    languages: "Languages",
    name: "Full Name",
    jobTitle: "Job Title",
    email: "Email Address",
    phone: "Phone Number",
    location: "Location",
    linkedin: "LinkedIn Profile",
    summaryPlaceholder: "Write a brief professional summary...",
    addExperience: "Add Experience",
    addEducation: "Add Education",
    addProject: "Add Project",
    addCertification: "Add Certification",
    addSkill: "Add Skill",
    addLanguage: "Add Language",
    company: "Company",
    position: "Position",
    dates: "Dates",
    description: "Description",
    degree: "Degree",
    institution: "Institution",
    projectName: "Project Name",
    technologies: "Technologies",
    projectLink: "Project Link",
    certName: "Certification Name",
    issuer: "Issuer",
    date: "Date",
    skillName: "Skill",
    languageName: "Language",
    save: "Save Changes",
    cancel: "Cancel",
    backToResume: "Back to Resume",
    required: "Required",
    optional: "Optional",
    validationErrors: "Please fix the following errors:",
    saveSuccess: "Resume updated successfully!",
  },
  hi: {
    title: "अपना रिज्यूमे पूरा करें",
    subtitle: "अपना रिज्यूमे पूरा करने के लिए अनुपस्थित जानकारी भरें",
    personalInfo: "व्यक्तिगत जानकारी",
    summary: "पेशेवर सारांश",
    experience: "कार्य अनुभव",
    education: "शिक्षा",
    skills: "कौशल",
    projects: "परियोजनाएं",
    certifications: "प्रमाणपत्र",
    languages: "भाषाएं",
    name: "पूरा नाम",
    jobTitle: "नौकरी का शीर्षक",
    email: "ईमेल पता",
    phone: "फोन नंबर",
    location: "स्थान",
    linkedin: "लिंक्डइन प्रोफाइल",
    summaryPlaceholder: "एक संक्षिप्त पेशेवर सारांश लिखें...",
    addExperience: "अनुभव जोड़ें",
    addEducation: "शिक्षा जोड़ें",
    addProject: "परियोजना जोड़ें",
    addCertification: "प्रमाणपत्र जोड़ें",
    addSkill: "कौशल जोड़ें",
    addLanguage: "भाषा जोड़ें",
    company: "कंपनी",
    position: "पद",
    dates: "तारीखें",
    description: "विवरण",
    degree: "डिग्री",
    institution: "संस्थान",
    projectName: "परियोजना का नाम",
    technologies: "तकनीकें",
    projectLink: "परियोजना लिंक",
    certName: "प्रमाणपत्र का नाम",
    issuer: "जारीकर्ता",
    date: "तारीख",
    skillName: "कौशल",
    languageName: "भाषा",
    save: "परिवर्तन सहेजें",
    cancel: "रद्द करें",
    backToResume: "रिज्यूमे पर वापस जाएं",
    required: "आवश्यक",
    optional: "वैकल्पिक",
    validationErrors: "कृपया निम्नलिखित त्रुटियों को ठीक करें:",
    saveSuccess: "रिज्यूमे सफलतापूर्वक अपडेट हो गया!",
  },
  bn: {
    title: "আপনার রিজিউমে সম্পূর্ণ করুন",
    subtitle: "আপনার রিজিউমে সম্পূর্ণ করতে অনুপস্থিত তথ্য পূরণ করুন",
    personalInfo: "ব্যক্তিগত তথ্য",
    summary: "পেশাদার সারসংক্ষেপ",
    experience: "কাজের অভিজ্ঞতা",
    education: "শিক্ষা",
    skills: "দক্ষতা",
    projects: "প্রকল্প",
    certifications: "সার্টিফিকেশন",
    languages: "ভাষা",
    name: "পূর্ণ নাম",
    jobTitle: "চাকরির শিরোনাম",
    email: "ইমেইল ঠিকানা",
    phone: "ফোন নম্বর",
    location: "অবস্থান",
    linkedin: "লিংকডইন প্রোফাইল",
    summaryPlaceholder: "একটি সংক্ষিপ্ত পেশাদার সারসংক্ষেপ লিখুন...",
    addExperience: "অভিজ্ঞতা যোগ করুন",
    addEducation: "শিক্ষা যোগ করুন",
    addProject: "প্রকল্প যোগ করুন",
    addCertification: "সার্টিফিকেশন যোগ করুন",
    addSkill: "দক্ষতা যোগ করুন",
    addLanguage: "ভাষা যোগ করুন",
    company: "কোম্পানি",
    position: "পদ",
    dates: "তারিখ",
    description: "বিবরণ",
    degree: "ডিগ্রি",
    institution: "প্রতিষ্ঠান",
    projectName: "প্রকল্পের নাম",
    technologies: "প্রযুক্তি",
    projectLink: "প্রকল্প লিংক",
    certName: "সার্টিফিকেশনের নাম",
    issuer: "প্রদানকারী",
    date: "তারিখ",
    skillName: "দক্ষতা",
    languageName: "ভাষা",
    save: "পরিবর্তন সংরক্ষণ করুন",
    cancel: "বাতিল",
    backToResume: "রিজিউমেতে ফিরে যান",
    required: "প্রয়োজনীয়",
    optional: "ঐচ্ছিক",
    validationErrors: "অনুগ্রহ করে নিম্নলিখিত ত্রুটিগুলি ঠিক করুন:",
    saveSuccess: "রিজিউমে সফলভাবে আপডেট হয়েছে!",
  },
  te: {
    title: "మీ రెజ్యూమ్‌ను పూర్తి చేయండి",
    subtitle: "మీ రెజ్యూమ్‌ను పూర్తి చేయడానికి తప్పిపోయిన సమాచారాన్ని పూరించండి",
    personalInfo: "వ్యక్తిగత సమాచారం",
    summary: "వృత్తిపరమైన సారాంశం",
    experience: "పని అనుభవం",
    education: "విద్య",
    skills: "నైపుణ్యాలు",
    projects: "ప్రాజెక్ట్‌లు",
    certifications: "సర్టిఫికేషన్‌లు",
    languages: "భాషలు",
    name: "పూర్తి పేరు",
    jobTitle: "ఉద్యోగ శీర్షిక",
    email: "ఇమెయిల్ చిరునామా",
    phone: "ఫోన్ నంబర్",
    location: "స్థానం",
    linkedin: "లింక్డ్‌ఇన్ ప్రొఫైల్",
    summaryPlaceholder: "సంక్షిప్త వృత్తిపరమైన సారాంశం రాయండి...",
    addExperience: "అనుభవం జోడించండి",
    addEducation: "విద్య జోడించండి",
    addProject: "ప్రాజెక్ట్ జోడించండి",
    addCertification: "సర్టిఫికేషన్ జోడించండి",
    addSkill: "నైపుణ్యం జోడించండి",
    addLanguage: "భాష జోడించండి",
    company: "కంపెనీ",
    position: "పదవి",
    dates: "తేదీలు",
    description: "వివరణ",
    degree: "డిగ్రీ",
    institution: "సంస్థ",
    projectName: "ప్రాజెక్ట్ పేరు",
    technologies: "సాంకేతికతలు",
    projectLink: "ప్రాజెక్ట్ లింక్",
    certName: "సర్టిఫికేషన్ పేరు",
    issuer: "జారీ చేసేవారు",
    date: "తేదీ",
    skillName: "నైపుణ్యం",
    languageName: "భాష",
    save: "మార్పులను సేవ్ చేయండి",
    cancel: "రద్దు చేయండి",
    backToResume: "రెజ్యూమ్‌కు తిరిగి వెళ్లండి",
    required: "అవసరం",
    optional: "ఐచ్ఛికం",
    validationErrors: "దయచేసి ఈ క్రింది లోపాలను సరిచేయండి:",
    saveSuccess: "రెజ్యూమ్ విజయవంతంగా అప్‌డేట్ చేయబడింది!",
  },
  ta: {
    title: "உங்கள் ரெஸ்யூமேவை முடிக்கவும்",
    subtitle: "உங்கள் ரெஸ்யூமேவை முடிக்க விடுபட்ட தகவலை நிரப்பவும்",
    personalInfo: "தனிப்பட்ட தகவல்",
    summary: "தொழில்முறை சுருக்கம்",
    experience: "பணி அனுபவம்",
    education: "கல்வி",
    skills: "திறன்கள்",
    projects: "திட்டங்கள்",
    certifications: "சான்றிதழ்கள்",
    languages: "மொழிகள்",
    name: "முழு பெயர்",
    jobTitle: "வேலை தலைப்பு",
    email: "மின்னஞ்சல் முகவரி",
    phone: "தொலைபேசி எண்",
    location: "இடம்",
    linkedin: "லிங்க்ட்இன் சுயவிவரம்",
    summaryPlaceholder: "ஒரு சுருக்கமான தொழில்முறை சுருக்கம் எழுதுங்கள்...",
    addExperience: "அனுபவம் சேர்க்கவும்",
    addEducation: "கல்வி சேர்க்கவும்",
    addProject: "திட்டம் சேர்க்கவும்",
    addCertification: "சான்றிதழ் சேர்க்கவும்",
    addSkill: "திறன் சேர்க்கவும்",
    addLanguage: "மொழி சேர்க்கவும்",
    company: "நிறுவனம்",
    position: "பதவி",
    dates: "தேதிகள்",
    description: "விளக்கம்",
    degree: "பட்டம்",
    institution: "நிறுவனம்",
    projectName: "திட்ட பெயர்",
    technologies: "தொழில்நுட்பங்கள்",
    projectLink: "திட்ட இணைப்பு",
    certName: "சான்றிதழ் பெயர்",
    issuer: "வழங்குபவர்",
    date: "தேதி",
    skillName: "திறன்",
    languageName: "மொழி",
    save: "மாற்றங்களை சேமிக்கவும்",
    cancel: "ரத்து செய்",
    backToResume: "ரெஸ்யூமேக்கு திரும்பு",
    required: "தேவையான",
    optional: "விருப்பமான",
    validationErrors: "தயவுசெய்து பின்வரும் பிழைகளை சரிசெய்யவும்:",
    saveSuccess: "ரெஸ்யூமே வெற்றிகரமாக புதுப்பிக்கப்பட்டது!",
  },
}

export function EditResume() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [newLanguage, setNewLanguage] = useState("")

  const content = editContent[selectedLanguage as keyof typeof editContent] || editContent.en

  useEffect(() => {
    // Get stored data
    const storedResumeData = localStorage.getItem("resumeData")
    const storedLanguage = localStorage.getItem("selectedLanguage") || "en"

    setSelectedLanguage(storedLanguage)

    if (storedResumeData) {
      try {
        const parsedData = JSON.parse(storedResumeData)
        setResumeData(parsedData)
      } catch (error) {
        console.error("Error parsing resume data:", error)
        router.push("/")
      }
    } else {
      router.push("/")
    }
  }, [router])

  const validateForm = (): boolean => {
    const errors: string[] = []

    if (!resumeData?.personalInfo.name?.trim()) {
      errors.push("Name is required")
    }
    if (!resumeData?.personalInfo.email?.trim()) {
      errors.push("Email is required")
    }
    if (resumeData?.personalInfo.email && !isValidEmail(resumeData.personalInfo.email)) {
      errors.push("Please enter a valid email address")
    }
    if (!resumeData?.personalInfo.phone?.trim()) {
      errors.push("Phone number is required")
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSave = () => {
    if (!validateForm()) {
      return
    }

    // Save updated resume data
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
      router.push("/resume-display")
    }, 2000)
  }

  const updatePersonalInfo = (field: string, value: string) => {
    if (!resumeData) return
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    })
  }

  const updateSummary = (value: string) => {
    if (!resumeData) return
    setResumeData({
      ...resumeData,
      summary: value,
    })
  }

  const addExperience = () => {
    if (!resumeData) return
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          title: "",
          company: "",
          dates: "",
          location: "",
          description: "",
        },
      ],
    })
  }

  const updateExperience = (index: number, field: string, value: string) => {
    if (!resumeData) return
    const updatedExperience = [...resumeData.experience]
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    }
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    })
  }

  const removeExperience = (index: number) => {
    if (!resumeData) return
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index),
    })
  }

  const addEducation = () => {
    if (!resumeData) return
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          degree: "",
          institution: "",
          dates: "",
          location: "",
        },
      ],
    })
  }

  const updateEducation = (index: number, field: string, value: string) => {
    if (!resumeData) return
    const updatedEducation = [...resumeData.education]
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    }
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    })
  }

  const removeEducation = (index: number) => {
    if (!resumeData) return
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index),
    })
  }

  const addSkill = () => {
    if (!resumeData || !newSkill.trim()) return
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, newSkill.trim()],
    })
    setNewSkill("")
  }

  const removeSkill = (index: number) => {
    if (!resumeData) return
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index),
    })
  }

  const addLanguageItem = () => {
    if (!resumeData || !newLanguage.trim()) return
    setResumeData({
      ...resumeData,
      languages: [...resumeData.languages, newLanguage.trim()],
    })
    setNewLanguage("")
  }

  const removeLanguage = (index: number) => {
    if (!resumeData) return
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.filter((_, i) => i !== index),
    })
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume editor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
            <p className="text-lg text-gray-600">{content.subtitle}</p>
          </div>
          <Button onClick={() => router.push("/resume-display")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {content.backToResume}
          </Button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <Card className="p-4 mb-6 border-green-200 bg-green-50">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-medium">{content.saveSuccess}</p>
            </div>
          </Card>
        )}

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <Card className="p-4 mb-6 border-red-200 bg-red-50">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-2">{content.validationErrors}</h3>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm text-red-700">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-8">
          {/* Personal Information */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              {content.personalInfo}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">
                  {content.name}{" "}
                  <Badge variant="destructive" className="ml-1 text-xs">
                    {content.required}
                  </Badge>
                </Label>
                <Input
                  id="name"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo("name", e.target.value)}
                  placeholder={content.name}
                />
              </div>
              <div>
                <Label htmlFor="title">
                  {content.jobTitle}{" "}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {content.optional}
                  </Badge>
                </Label>
                <Input
                  id="title"
                  value={resumeData.personalInfo.title}
                  onChange={(e) => updatePersonalInfo("title", e.target.value)}
                  placeholder={content.jobTitle}
                />
              </div>
              <div>
                <Label htmlFor="email">
                  {content.email}{" "}
                  <Badge variant="destructive" className="ml-1 text-xs">
                    {content.required}
                  </Badge>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                  placeholder={content.email}
                />
              </div>
              <div>
                <Label htmlFor="phone">
                  {content.phone}{" "}
                  <Badge variant="destructive" className="ml-1 text-xs">
                    {content.required}
                  </Badge>
                </Label>
                <Input
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                  placeholder={content.phone}
                />
              </div>
              <div>
                <Label htmlFor="location">
                  {content.location}{" "}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {content.optional}
                  </Badge>
                </Label>
                <Input
                  id="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo("location", e.target.value)}
                  placeholder={content.location}
                />
              </div>
              <div>
                <Label htmlFor="linkedin">
                  {content.linkedin}{" "}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {content.optional}
                  </Badge>
                </Label>
                <Input
                  id="linkedin"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                  placeholder={content.linkedin}
                />
              </div>
            </div>
          </Card>

          {/* Professional Summary */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">{content.summary}</h3>
            <Textarea
              value={resumeData.summary}
              onChange={(e) => updateSummary(e.target.value)}
              placeholder={content.summaryPlaceholder}
              rows={4}
            />
          </Card>

          {/* Work Experience */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Building className="w-5 h-5 mr-2" />
                {content.experience}
              </h3>
              <Button onClick={addExperience} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                {content.addExperience}
              </Button>
            </div>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
                    <Button onClick={() => removeExperience(index)} size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>{content.position}</Label>
                      <Input
                        value={exp.title}
                        onChange={(e) => updateExperience(index, "title", e.target.value)}
                        placeholder={content.position}
                      />
                    </div>
                    <div>
                      <Label>{content.company}</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                        placeholder={content.company}
                      />
                    </div>
                    <div>
                      <Label>{content.dates}</Label>
                      <Input
                        value={exp.dates}
                        onChange={(e) => updateExperience(index, "dates", e.target.value)}
                        placeholder="2020 - 2023"
                      />
                    </div>
                    <div>
                      <Label>{content.location}</Label>
                      <Input
                        value={exp.location}
                        onChange={(e) => updateExperience(index, "location", e.target.value)}
                        placeholder={content.location}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>{content.description}</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(index, "description", e.target.value)}
                      placeholder={content.description}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Education */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                {content.education}
              </h3>
              <Button onClick={addEducation} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                {content.addEducation}
              </Button>
            </div>
            <div className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
                    <Button onClick={() => removeEducation(index)} size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>{content.degree}</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                        placeholder={content.degree}
                      />
                    </div>
                    <div>
                      <Label>{content.institution}</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, "institution", e.target.value)}
                        placeholder={content.institution}
                      />
                    </div>
                    <div>
                      <Label>{content.dates}</Label>
                      <Input
                        value={edu.dates}
                        onChange={(e) => updateEducation(index, "dates", e.target.value)}
                        placeholder="2016 - 2020"
                      />
                    </div>
                    <div>
                      <Label>{content.location}</Label>
                      <Input
                        value={edu.location}
                        onChange={(e) => updateEducation(index, "location", e.target.value)}
                        placeholder={content.location}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Skills */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              {content.skills}
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {resumeData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-2">
                  <span>{skill}</span>
                  <button onClick={() => removeSkill(index)} className="ml-2 text-gray-500 hover:text-red-500">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder={content.skillName}
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
              />
              <Button onClick={addSkill} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                {content.addSkill}
              </Button>
            </div>
          </Card>

          {/* Languages */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Languages className="w-5 h-5 mr-2" />
              {content.languages}
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {resumeData.languages.map((language, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-2">
                  <span>{language}</span>
                  <button onClick={() => removeLanguage(index)} className="ml-2 text-gray-500 hover:text-red-500">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder={content.languageName}
                onKeyPress={(e) => e.key === "Enter" && addLanguageItem()}
              />
              <Button onClick={addLanguageItem} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                {content.addLanguage}
              </Button>
            </div>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8 pb-8">
          <Button onClick={handleSave} size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
            <Save className="w-4 h-4 mr-2" />
            {content.save}
          </Button>
        </div>
      </div>
    </div>
  )
}
