// "use client"

// import { useState } from "react"
// import {
//   ModernTemplate,
//   ClassicTemplate,
//   CreativeTemplate,
//   MinimalTemplate,
//   ProfessionalTemplate,
// } from "./resume-templates"

// interface TemplateSelectionProps {
//   profession: string
//   language: string
//   onTemplateSelect: (templateId: string) => void
//   resumeData?: any
// }

// export default function TemplateSelection({
//   profession,
//   language,
//   onTemplateSelect,
//   resumeData,
// }: TemplateSelectionProps) {
//   const [selectedTemplate, setSelectedTemplate] = useState<string>("modern")

//   const handleTemplateSelect = (templateId: string) => {
//     setSelectedTemplate(templateId)
//     onTemplateSelect(templateId)
//   }

//   const getTemplatesForProfession = (prof: string) => {
//     const professionLower = prof.toLowerCase()

//     if (professionLower.includes("driver") || professionLower.includes("transport")) {
//       return [
//         { id: "modern", name: "Modern Driver Resume", component: ModernTemplate },
//         { id: "classic", name: "Classic Transport Resume", component: ClassicTemplate },
//         { id: "professional", name: "Professional Driver Resume", component: ProfessionalTemplate },
//         { id: "minimal", name: "Clean Driver Resume", component: MinimalTemplate },
//       ]
//     } else if (professionLower.includes("tailor") || professionLower.includes("fashion")) {
//       return [
//         { id: "creative", name: "Creative Tailor Resume", component: CreativeTemplate },
//         { id: "modern", name: "Modern Fashion Resume", component: ModernTemplate },
//         { id: "professional", name: "Professional Tailor Resume", component: ProfessionalTemplate },
//         { id: "classic", name: "Traditional Tailor Resume", component: ClassicTemplate },
//       ]
//     } else if (professionLower.includes("welder") || professionLower.includes("mechanic")) {
//       return [
//         { id: "professional", name: "Professional Welder Resume", component: ProfessionalTemplate },
//         { id: "modern", name: "Modern Technical Resume", component: ModernTemplate },
//         { id: "classic", name: "Classic Trade Resume", component: ClassicTemplate },
//         { id: "minimal", name: "Clean Technical Resume", component: MinimalTemplate },
//       ]
//     } else {
//       return [
//         { id: "modern", name: "Modern Resume", component: ModernTemplate },
//         { id: "professional", name: "Professional Resume", component: ProfessionalTemplate },
//         { id: "classic", name: "Classic Resume", component: ClassicTemplate },
//         { id: "creative", name: "Creative Resume", component: CreativeTemplate },
//         { id: "minimal", name: "Minimal Resume", component: MinimalTemplate },
//       ]
//     }
//   }

//   const templates = getTemplatesForProfession(profession)

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
//             <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//             <span className="text-sm font-medium">Processing your audio...</span>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Resume Template</h1>
//           <p className="text-gray-600">
//             Select a template for your <span className="font-semibold">{profession}</span> resume while we process your
//             audio
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {templates.map((template) => {
//             const TemplateComponent = template.component
//             return (
//               <TemplateComponent
//                 key={template.id}
//                 data={resumeData || {}}
//                 isSelected={selectedTemplate === template.id}
//                 onClick={() => handleTemplateSelect(template.id)}
//                 templateName={template.name}
//               />
//             )
//           })}
//         </div>

//         <div className="text-center mt-8">
//           <div className="text-sm text-gray-500">
//             Selected: <span className="font-medium">{templates.find((t) => t.id === selectedTemplate)?.name}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }












"use client"

import { useState } from "react"
import {
  ModernTemplate,
  ClassicTemplate,
  CreativeTemplate,
  MinimalTemplate,
  ProfessionalTemplate,
} from "./resume-templates"

interface TemplateSelectionProps {
  profession: string
  language: string
  onTemplateSelect: (templateId: string) => void
  resumeData?: any
}

export default function TemplateSelection({
  profession,
  language,
  onTemplateSelect,
  resumeData,
}: TemplateSelectionProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("p1")

  const handleTemplateSelect = (templateId: string) => {
    console.log("[v0] Template selected:", templateId)
    setSelectedTemplate(templateId)
    onTemplateSelect(templateId)
  }

  const getTemplatesForProfession = (prof: string) => {
    const professionLower = prof.toLowerCase()

    if (professionLower.includes("driver") || professionLower.includes("transport")) {
      return [
        { id: "p1", name: "Professional Corporate", component: ProfessionalTemplate },
        { id: "p2", name: "Professional Business", component: ClassicTemplate },
        { id: "m3", name: "Essentials", component: MinimalTemplate },
        { id: "c1", name: "Creative Designer", component: CreativeTemplate },
      ]
    } else if (professionLower.includes("tailor") || professionLower.includes("fashion")) {
      return [
        { id: "c1", name: "Creative Designer", component: CreativeTemplate },
        { id: "c2", name: "Creative Artistic", component: ModernTemplate },
        { id: "p1", name: "Professional Corporate", component: ProfessionalTemplate },
        { id: "p3", name: "Professional Executive Pro", component: ClassicTemplate },
      ]
    } else if (professionLower.includes("welder") || professionLower.includes("mechanic")) {
      return [
        { id: "p1", name: "Professional Corporate", component: ProfessionalTemplate },
        { id: "p4", name: "Professional Modern Professional", component: ModernTemplate },
        { id: "m1", name: "Clean", component: MinimalTemplate },
        { id: "e1", name: "Leadership", component: ClassicTemplate },
      ]
    } else {
      return [
        { id: "p1", name: "Professional Corporate", component: ProfessionalTemplate },
        { id: "c1", name: "Creative Designer", component: CreativeTemplate },
        { id: "m3", name: "Essentials", component: MinimalTemplate },
        { id: "e1", name: "Leadership", component: ModernTemplate },
        { id: "p5", name: "Professional Classic", component: ClassicTemplate },
      ]
    }
  }

  const templates = getTemplatesForProfession(profession)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Processing your audio...</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Resume Template</h1>
          <p className="text-gray-600">
            Select a template for your <span className="font-semibold">{profession}</span> resume while we process your
            audio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => {
            const TemplateComponent = template.component
            return (
              <TemplateComponent
                key={template.id}
                data={resumeData || {}}
                isSelected={selectedTemplate === template.id}
                onClick={() => handleTemplateSelect(template.id)}
                templateName={template.name}
              />
            )
          })}
        </div>

        <div className="text-center mt-8">
          <div className="text-sm text-gray-500">
            Selected: <span className="font-medium">{templates.find((t) => t.id === selectedTemplate)?.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
