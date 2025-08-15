// "use client"

// import {
//   ModernTemplate,
//   ClassicTemplate,
//   CreativeTemplate,
//   MinimalTemplate,
//   ProfessionalTemplate,
// } from "./resume-templates"

// interface FinalResumeProps {
//   data: any
//   templateId: string
// }

// export default function FinalResume({ data, templateId }: FinalResumeProps) {
//   const getTemplateComponent = (id: string) => {
//     switch (id) {
//       case "modern":
//         return ModernTemplate
//       case "classic":
//         return ClassicTemplate
//       case "creative":
//         return CreativeTemplate
//       case "minimal":
//         return MinimalTemplate
//       case "professional":
//         return ProfessionalTemplate
//       default:
//         return ModernTemplate
//     }
//   }

//   const TemplateComponent = getTemplateComponent(templateId)

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Resume is Ready!</h1>
//           <p className="text-gray-600">Generated from your audio recording</p>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <TemplateComponent data={data} isSelected={true} onClick={() => {}} templateName="Your Resume" />
//         </div>

//         <div className="text-center mt-8 space-x-4">
//           <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Download PDF</button>
//           <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">Edit Resume</button>
//           <button
//             className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
//             onClick={() => window.location.reload()}
//           >
//             Create New Resume
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }






"use client"

import { ModernTemplate, CreativeTemplate, MinimalTemplate, ProfessionalTemplate } from "./resume-templates"

interface FinalResumeProps {
  data: any
  templateId: string
}

export default function FinalResume({ data, templateId }: FinalResumeProps) {
  const transformData = (backendData: any) => {
    console.log("[v0] Transforming backend data:", backendData)

    return {
      name: backendData.personalInfo?.name || "Your Name",
      email: backendData.personalInfo?.email || "email@example.com",
      phone: backendData.personalInfo?.phone || "+91 XXXXX XXXXX",
      address: backendData.personalInfo?.location || "Your Address",
      summary: backendData.summary || "Professional summary will appear here...",
      experience:
        backendData.projects?.map((project: any) => ({
          title: project.role || project.name,
          company: project.name,
          duration: project.dates || "Present",
          description: project.description || "",
        })) || [],
      skills: backendData.skills || [],
      education:
        backendData.education?.map((edu: any) => ({
          degree: edu.degree,
          institution: edu.institution || "Institution",
          year: edu.dates || "Year",
        })) || [],
    }
  }

  const transformedData = transformData(data)
  console.log("[v0] Transformed data for template:", transformedData)

  const getTemplateComponent = (id: string) => {
    switch (id) {
      case "p1":
      case "p2":
      case "p3":
      case "p4":
      case "p5":
        return ProfessionalTemplate
      case "c1":
      case "c2":
      case "c3":
      case "c4":
      case "c5":
        return CreativeTemplate
      case "m1":
      case "m2":
      case "m3":
      case "m4":
      case "m5":
        return MinimalTemplate
      case "e1":
      case "e2":
      case "e3":
      case "e4":
      case "e5":
        return ModernTemplate
      default:
        return ProfessionalTemplate
    }
  }

  const TemplateComponent = getTemplateComponent(templateId)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Resume is Ready!</h1>
          <p className="text-gray-600">Generated from your audio recording</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <TemplateComponent data={transformedData} isSelected={true} onClick={() => {}} templateName="Your Resume" />
        </div>

        <div className="text-center mt-8 space-x-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Download PDF</button>
          <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">Edit Resume</button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            onClick={() => window.location.reload()}
          >
            Create New Resume
          </button>
        </div>
      </div>
    </div>
  )
}
