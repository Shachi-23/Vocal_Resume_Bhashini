"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Download, FileText, Printer } from "lucide-react"

interface DownloadOptionsModalProps {
  isOpen: boolean
  onClose: () => void
  onDownload: (format: "pdf" | "html" | "print") => void
  selectedLanguage: string
}

const downloadContent = {
  en: {
    title: "Download Your Resume",
    subtitle: "Choose your preferred format",
    pdfOption: {
      title: "PDF Format",
      description: "Professional PDF document ready for sharing",
      features: ["Print-ready", "Universal compatibility", "Professional formatting"],
    },
    htmlOption: {
      title: "HTML Format",
      description: "Web-friendly format for online sharing",
      features: ["Web-optimized", "Easy to customize", "Responsive design"],
    },
    printOption: {
      title: "Print Directly",
      description: "Print immediately using your browser",
      features: ["Instant printing", "No download needed", "Optimized layout"],
    },
    download: "Download",
    print: "Print Now",
  },
  hi: {
    title: "अपना रिज्यूमे डाउनलोड करें",
    subtitle: "अपना पसंदीदा प्रारूप चुनें",
    pdfOption: {
      title: "पीडीएफ प्रारूप",
      description: "साझा करने के लिए तैयार पेशेवर पीडीएफ दस्तावेज़",
      features: ["प्रिंट-तैयार", "सार्वभौमिक संगतता", "पेशेवर स्वरूपण"],
    },
    htmlOption: {
      title: "HTML प्रारूप",
      description: "ऑनलाइन साझाकरण के लिए वेब-अनुकूल प्रारूप",
      features: ["वेब-अनुकूलित", "अनुकूलित करना आसान", "उत्तरदायी डिज़ाइन"],
    },
    printOption: {
      title: "सीधे प्रिंट करें",
      description: "अपने ब्राउज़र का उपयोग करके तुरंत प्रिंट करें",
      features: ["तत्काल मुद्रण", "डाउनलोड की आवश्यकता नहीं", "अनुकूलित लेआउट"],
    },
    download: "डाउनलोड करें",
    print: "अभी प्रिंट करें",
  },
}

export function DownloadOptionsModal({ isOpen, onClose, onDownload, selectedLanguage }: DownloadOptionsModalProps) {
  const content = downloadContent[selectedLanguage as keyof typeof downloadContent] || downloadContent.en

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{content.title}</h2>
            <p className="text-gray-600 mt-1">{content.subtitle}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Download Options */}
        <div className="p-6 space-y-4">
          {/* PDF Option */}
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onDownload("pdf")}>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{content.pdfOption.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{content.pdfOption.description}</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  {content.pdfOption.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <Download className="w-4 h-4 mr-2" />
                {content.download}
              </Button>
            </div>
          </Card>

          {/* HTML Option */}
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onDownload("html")}>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{content.htmlOption.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{content.htmlOption.description}</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  {content.htmlOption.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                {content.download}
              </Button>
            </div>
          </Card>

          {/* Print Option */}
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onDownload("print")}>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Printer className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{content.printOption.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{content.printOption.description}</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  {content.printOption.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Printer className="w-4 h-4 mr-2" />
                {content.print}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
