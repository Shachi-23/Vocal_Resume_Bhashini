"use client"
import { Button } from "@/components/ui/button"
import {
  DriverTemplate1,
  TailorTemplate1,
  ElectricianTemplate1,
  professionReferenceData,
} from "./profession-resume-templates"

interface ProfessionTemplateSelectionProps {
  profession: string
  language: string
  onTemplateSelect: (templateId: string) => void
  resumeData: any
}

// Template configurations for each profession
const professionTemplates = {
  driver: [
    { id: "p1", name: "Professional Driver", component: DriverTemplate1, color: "blue" },
    { id: "p2", name: "Modern Driver", component: DriverTemplate1, color: "green" },
    { id: "p3", name: "Classic Driver", component: DriverTemplate1, color: "gray" },
  ],
  tailor: [
    { id: "c1", name: "Creative Tailor", component: TailorTemplate1, color: "pink" },
    { id: "c2", name: "Professional Tailor", component: TailorTemplate1, color: "purple" },
    { id: "c3", name: "Elegant Tailor", component: TailorTemplate1, color: "rose" },
  ],
  electrician: [
    { id: "e1", name: "Technical Electrician", component: ElectricianTemplate1, color: "yellow" },
    { id: "e2", name: "Professional Electrician", component: ElectricianTemplate1, color: "orange" },
    { id: "e3", name: "Modern Electrician", component: ElectricianTemplate1, color: "amber" },
  ],
  cook: [
    { id: "m1", name: "Chef Professional", component: DriverTemplate1, color: "red" },
    { id: "m2", name: "Culinary Expert", component: DriverTemplate1, color: "orange" },
    { id: "m3", name: "Kitchen Master", component: DriverTemplate1, color: "yellow" },
  ],
  delivery: [
    { id: "m4", name: "Delivery Pro", component: DriverTemplate1, color: "blue" },
    { id: "m5", name: "Courier Expert", component: DriverTemplate1, color: "green" },
    { id: "e4", name: "Logistics Partner", component: DriverTemplate1, color: "teal" },
  ],
  security: [
    { id: "e5", name: "Security Professional", component: DriverTemplate1, color: "gray" },
    { id: "p4", name: "Guard Expert", component: DriverTemplate1, color: "slate" },
    { id: "p5", name: "Safety Specialist", component: DriverTemplate1, color: "zinc" },
  ],
  sales: [
    { id: "c4", name: "Sales Professional", component: DriverTemplate1, color: "indigo" },
    { id: "c5", name: "Retail Expert", component: DriverTemplate1, color: "violet" },
    { id: "p6", name: "Customer Service Pro", component: DriverTemplate1, color: "purple" },
  ],
  marketing: [
    { id: "p7", name: "Marketing Professional", component: DriverTemplate1, color: "cyan" },
    { id: "p8", name: "Promoter Expert", component: DriverTemplate1, color: "sky" },
    { id: "p9", name: "Field Marketing Pro", component: DriverTemplate1, color: "blue" },
  ],
  mechanic: [
    { id: "p10", name: "Mechanic Professional", component: DriverTemplate1, color: "stone" },
    { id: "p11", name: "Auto Expert", component: DriverTemplate1, color: "neutral" },
    { id: "p12", name: "Vehicle Specialist", component: DriverTemplate1, color: "gray" },
  ],
}

export function ProfessionTemplateSelection({
  profession,
  language,
  onTemplateSelect,
  resumeData,
}: ProfessionTemplateSelectionProps) {
  const templates = professionTemplates[profession as keyof typeof professionTemplates] || professionTemplates.driver

  // Use reference data if no resume data available yet
  const displayData =
    resumeData ||
    professionReferenceData[profession as keyof typeof professionReferenceData] ||
    professionReferenceData.driver

  console.log("[v0] Profession template selection - profession:", profession)
  console.log("[v0] Available templates:", templates.length)
  console.log("[v0] Display data:", displayData ? "Available" : "Not available")

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Resume Template</h2>
          <p className="text-gray-600">Select a template that best represents your {profession} profession</p>
          {!resumeData && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-blue-700 text-sm">Processing your audio... Preview templates with sample data</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {templates.map((template) => {
            const TemplateComponent = template.component

            return (
              <div key={template.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600">Template ID: {template.id}</p>
                </div>

                <div className="p-4 bg-gray-50">
                  <div className="transform scale-50 origin-top-left w-[200%] h-96 overflow-hidden">
                    <TemplateComponent data={displayData} />
                  </div>
                </div>

                <div className="p-4">
                  <Button
                    onClick={() => {
                      console.log("[v0] Template selected:", template.id)
                      onTemplateSelect(template.id)
                    }}
                    className="w-full"
                    variant="default"
                  >
                    Select This Template
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
