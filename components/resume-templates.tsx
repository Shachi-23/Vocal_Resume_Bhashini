"use client"

interface ResumeData {
  name?: string
  email?: string
  phone?: string
  address?: string
  summary?: string
  experience?: Array<{
    title: string
    company: string
    duration: string
    description: string
  }>
  skills?: string[]
  education?: Array<{
    degree: string
    institution: string
    year: string
  }>
}

interface ResumeTemplateProps {
  data: ResumeData
  isSelected: boolean
  onClick: () => void
  templateName: string
}

export const ModernTemplate = ({ data, isSelected, onClick, templateName }: ResumeTemplateProps) => (
  <div
    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
      isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
    }`}
    onClick={onClick}
  >
    <div className="text-sm font-medium text-gray-500 mb-4">{templateName}</div>
    <div className="space-y-4">
      <div className="border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">{data.name || "Your Name"}</h1>
        <div className="text-gray-600 text-sm mt-1">
          {data.email || "email@example.com"} • {data.phone || "+91 XXXXX XXXXX"}
        </div>
        <div className="text-gray-600 text-sm">{data.address || "Your Address"}</div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Professional Summary</h2>
        <p className="text-gray-600 text-sm">{data.summary || "Professional summary will appear here..."}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Experience</h2>
        {data.experience?.slice(0, 2).map((exp, idx) => (
          <div key={idx} className="mb-3">
            <div className="font-medium text-gray-800">{exp.title}</div>
            <div className="text-sm text-gray-600">
              {exp.company} • {exp.duration}
            </div>
            <div className="text-sm text-gray-600 mt-1">{exp.description}</div>
          </div>
        )) || <div className="text-gray-500 text-sm">Experience details will appear here...</div>}
      </div>
    </div>
  </div>
)

export const ClassicTemplate = ({ data, isSelected, onClick, templateName }: ResumeTemplateProps) => (
  <div
    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
      isSelected ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
    }`}
    onClick={onClick}
  >
    <div className="text-sm font-medium text-gray-500 mb-4">{templateName}</div>
    <div className="space-y-3">
      <div className="text-center border-b pb-3">
        <h1 className="text-xl font-bold text-gray-900">{data.name || "YOUR NAME"}</h1>
        <div className="text-gray-600 text-sm mt-1">
          {data.email || "email@example.com"} | {data.phone || "+91 XXXXX XXXXX"}
        </div>
        <div className="text-gray-600 text-sm">{data.address || "Your Address"}</div>
      </div>

      <div>
        <h2 className="text-base font-bold text-gray-800 mb-1 uppercase tracking-wide">Objective</h2>
        <p className="text-gray-600 text-sm">{data.summary || "Career objective will appear here..."}</p>
      </div>

      <div>
        <h2 className="text-base font-bold text-gray-800 mb-1 uppercase tracking-wide">Work Experience</h2>
        {data.experience?.slice(0, 2).map((exp, idx) => (
          <div key={idx} className="mb-2">
            <div className="font-medium text-gray-800 text-sm">
              {exp.title} - {exp.company}
            </div>
            <div className="text-xs text-gray-600">{exp.duration}</div>
            <div className="text-xs text-gray-600 mt-1">{exp.description}</div>
          </div>
        )) || <div className="text-gray-500 text-sm">Work experience will appear here...</div>}
      </div>
    </div>
  </div>
)

export const CreativeTemplate = ({ data, isSelected, onClick, templateName }: ResumeTemplateProps) => (
  <div
    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
      isSelected ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
    }`}
    onClick={onClick}
  >
    <div className="text-sm font-medium text-gray-500 mb-4">{templateName}</div>
    <div className="space-y-4">
      <div className="bg-gray-900 text-white p-4 rounded-lg">
        <h1 className="text-xl font-bold">{data.name || "Your Name"}</h1>
        <div className="text-gray-300 text-sm mt-1">
          {data.email || "email@example.com"} • {data.phone || "+91 XXXXX XXXXX"}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2 border-l-4 border-purple-500 pl-3">About Me</h2>
        <p className="text-gray-600 text-sm">{data.summary || "Professional summary will appear here..."}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2 border-l-4 border-purple-500 pl-3">Experience</h2>
        {data.experience?.slice(0, 2).map((exp, idx) => (
          <div key={idx} className="mb-3 bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-800">{exp.title}</div>
            <div className="text-sm text-purple-600">
              {exp.company} • {exp.duration}
            </div>
            <div className="text-sm text-gray-600 mt-1">{exp.description}</div>
          </div>
        )) || <div className="text-gray-500 text-sm">Experience details will appear here...</div>}
      </div>
    </div>
  </div>
)

export const MinimalTemplate = ({ data, isSelected, onClick, templateName }: ResumeTemplateProps) => (
  <div
    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
      isSelected ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"
    }`}
    onClick={onClick}
  >
    <div className="text-sm font-medium text-gray-500 mb-4">{templateName}</div>
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-light text-gray-900">{data.name || "Your Name"}</h1>
        <div className="text-gray-500 text-sm mt-2 space-y-1">
          <div>{data.email || "email@example.com"}</div>
          <div>{data.phone || "+91 XXXXX XXXXX"}</div>
          <div>{data.address || "Your Address"}</div>
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          {data.summary || "Professional summary will appear here..."}
        </p>
      </div>

      <div className="border-t pt-4">
        <h2 className="text-sm font-medium text-gray-800 mb-3 uppercase tracking-wider">Experience</h2>
        {data.experience?.slice(0, 2).map((exp, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-gray-800">{exp.title}</div>
                <div className="text-sm text-gray-600">{exp.company}</div>
              </div>
              <div className="text-xs text-gray-500">{exp.duration}</div>
            </div>
            <div className="text-sm text-gray-600 mt-2">{exp.description}</div>
          </div>
        )) || <div className="text-gray-500 text-sm">Experience details will appear here...</div>}
      </div>
    </div>
  </div>
)

export const ProfessionalTemplate = ({ data, isSelected, onClick, templateName }: ResumeTemplateProps) => (
  <div
    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
      isSelected ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
    }`}
    onClick={onClick}
  >
    <div className="text-sm font-medium text-gray-500 mb-4">{templateName}</div>
    <div className="space-y-4">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
          <span className="text-indigo-600 font-bold text-lg">{data.name?.charAt(0) || "Y"}</span>
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">{data.name || "Your Name"}</h1>
          <div className="text-gray-600 text-sm mt-1">{data.email || "email@example.com"}</div>
          <div className="text-gray-600 text-sm">
            {data.phone || "+91 XXXXX XXXXX"} • {data.address || "Your Address"}
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-4 rounded-lg">
        <h2 className="text-base font-semibold text-indigo-800 mb-2">Professional Summary</h2>
        <p className="text-indigo-700 text-sm">{data.summary || "Professional summary will appear here..."}</p>
      </div>

      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-2">Professional Experience</h2>
        {data.experience?.slice(0, 2).map((exp, idx) => (
          <div key={idx} className="mb-3 border-l-2 border-indigo-200 pl-4">
            <div className="font-medium text-gray-800">{exp.title}</div>
            <div className="text-sm text-indigo-600">
              {exp.company} • {exp.duration}
            </div>
            <div className="text-sm text-gray-600 mt-1">{exp.description}</div>
          </div>
        )) || <div className="text-gray-500 text-sm">Experience details will appear here...</div>}
      </div>
    </div>
  </div>
)
