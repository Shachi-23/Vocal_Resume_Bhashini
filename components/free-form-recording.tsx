// // "use client"

// // import { useState, useEffect, useRef } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Card } from "@/components/ui/card"
// // import { Mic, Square, Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react"
// // import { useRouter } from "next/navigation"

// // // Multi-language content for free form recording
// // const recordingContent = {
// //   en: {
// //     title: "Tell Us Your Story",
// //     subtitle: "Speak freely about your professional journey",
// //     audioPrompt:
// //       "Please tell us about your professional journey. Share how much you have studied, how you landed in your current role, how many years you have been working in this profession, and any other jobs you have done before. Take your time and speak naturally.",
// //     instructions: [
// //       "Share your educational background",
// //       "Tell us how you got into your profession",
// //       "Mention your years of experience",
// //       "Talk about any previous jobs or roles",
// //       "Speak naturally - we'll organize everything",
// //     ],
// //     startRecording: "Start Recording",
// //     stopRecording: "Stop Recording",
// //     recording: "Recording...",
// //     processing: "Processing your story...",
// //     silenceDetected: "We noticed you paused. Please continue speaking about your experience.",
// //     recordingComplete: "Recording Complete",
// //     playback: "Play Recording",
// //     reRecord: "Record Again",
// //     continue: "Continue to Resume",
// //   },
// //   hi: {
// //     title: "अपनी कहानी बताएं",
// //     subtitle: "अपनी पेशेवर यात्रा के बारे में स्वतंत्र रूप से बोलें",
// //     audioPrompt:
// //       "कृपया अपनी पेशेवर यात्रा के बारे में बताएं। साझा करें कि आपने कितनी पढ़ाई की है, आप अपनी वर्तमान भूमिका में कैसे पहुंचे, आप इस पेशे में कितने साल से काम कर रहे हैं, और पहले कोई अन्य नौकरी की है या नहीं। अपना समय लें और स्वाभाविक रूप से बोलें।",
// //     instructions: [
// //       "अपनी शैक्षणिक पृष्ठभूमि साझा करें",
// //       "बताएं कि आप अपने पेशे में कैसे आए",
// //       "अपने अनुभव के वर्षों का उल्लेख करें",
// //       "पिछली नौकरियों या भूमिकाओं के बारे में बात करें",
// //       "स्वाभाविक रूप से बोलें - हम सब कुछ व्यवस्थित करेंगे",
// //     ],
// //     startRecording: "रिकॉर्डिंग शुरू करें",
// //     stopRecording: "रिकॉर्डिंग बंद करें",
// //     recording: "रिकॉर्डिंग हो रही है...",
// //     processing: "आपकी कहानी प्रोसेस हो रही है...",
// //     silenceDetected: "हमने देखा कि आपने रुका है। कृपया अपने अनुभव के बारे में बोलना जारी रखें।",
// //     recordingComplete: "रिकॉर्डिंग पूरी हुई",
// //     playback: "रिकॉर्डिंग सुनें",
// //     reRecord: "फिर से रिकॉर्ड करें",
// //     continue: "रिज्यूमे पर जाएं",
// //   },
// //   bn: {
// //     title: "আপনার গল্প বলুন",
// //     subtitle: "আপনার পেশাগত যাত্রা সম্পর্কে স্বাধীনভাবে কথা বলুন",
// //     audioPrompt:
// //       "অনুগ্রহ করে আপনার পেশাগত যাত্রা সম্পর্কে বলুন। শেয়ার করুন আপনি কতটুকু পড়াশোনা করেছেন, কীভাবে আপনার বর্তমান ভূমিকায় এসেছেন, এই পেশায় কত বছর ধরে কাজ করছেন, এবং আগে অন্য কোনো কাজ করেছেন কিনা। আপনার সময় নিন এবং স্বাভাবিকভাবে কথা বলুন।",
// //     instructions: [
// //       "আপনার শিক্ষাগত পটভূমি শেয়ার করুন",
// //       "বলুন কীভাবে আপনি আপনার পেশায় এসেছেন",
// //       "আপনার অভিজ্ঞতার বছরগুলি উল্লেখ করুন",
// //       "আগের কোনো কাজ বা ভূমিকা সম্পর্কে কথা বলুন",
// //       "স্বাভাবিকভাবে কথা বলুন - আমরা সবকিছু সাজিয়ে দেব",
// //     ],
// //     startRecording: "রেকর্ডিং শুরু করুন",
// //     stopRecording: "রেকর্ডিং বন্ধ করুন",
// //     recording: "রেকর্ডিং হচ্ছে...",
// //     processing: "আপনার গল্প প্রক্রিয়া করা হচ্ছে...",
// //     silenceDetected: "আমরা লক্ষ্য করেছি আপনি থেমেছেন। অনুগ্রহ করে আপনার অভিজ্ঞতা সম্পর্কে কথা বলা চালিয়ে যান।",
// //     recordingComplete: "রেকর্ডিং সম্পূর্ণ",
// //     playback: "রেকর্ডিং শুনুন",
// //     reRecord: "আবার রেকর্ড করুন",
// //     continue: "রিজিউমেতে যান",
// //   },
// //   te: {
// //     title: "మీ కథను చెప్పండి",
// //     subtitle: "మీ వృత్తిపరమైన ప్రయాణం గురించి స్వేచ్ఛగా మాట్లాడండి",
// //     audioPrompt:
// //       "దయచేసి మీ వృత్తిపరమైన ప్రయాణం గురించి చెప్పండి. మీరు ఎంత చదువుకున్నారు, మీ ప్రస్తుత పాత్రలో ఎలా వచ్చారు, ఈ వృత్తిలో ఎన్ని సంవత్సరాలు పని చేస్తున్నారు, మరియు ఇంతకు మునుపు ఏవైనా ఇతర ఉద్యోగాలు చేశారా అని పంచుకోండి. మీ సమయం తీసుకోండి మరియు సహజంగా మాట్లాడండి।",
// //     instructions: [
// //       "మీ విద్యా నేపథ్యాన్ని పంచుకోండి",
// //       "మీరు మీ వృత్తిలోకి ఎలా వచ్చారో చెప్పండి",
// //       "మీ అనుభవ సంవత్సరాలను పేర్కొనండి",
// //       "మునుపటి ఉద్యోగాలు లేదా పాత్రల గురించి మాట్లాడండి",
// //       "సహజంగా మాట్లాడండి - మేము అన్నింటినీ నిర్వహిస్తాము",
// //     ],
// //     startRecording: "రికార్డింగ్ ప్రారంభించండి",
// //     stopRecording: "రికార్డింగ్ ఆపండి",
// //     recording: "రికార్డింగ్ అవుతోంది...",
// //     processing: "మీ కథ ప్రాసెస్ అవుతోంది...",
// //     silenceDetected: "మీరు ఆగిపోయారని మేము గమనించాము. దయచేసి మీ అనుభవం గురించి మాట్లాడటం కొనసాగించండి।",
// //     recordingComplete: "రికార్డింగ్ పూర్తయింది",
// //     playback: "రికార్డింగ్ వినండి",
// //     reRecord: "మళ్లీ రికార్డ్ చేయండి",
// //     continue: "రెజ్యూమ్‌కు వెళ్లండి",
// //   },
// //   ta: {
// //     title: "உங்கள் கதையைச் சொல்லுங்கள்",
// //     subtitle: "உங்கள் தொழில்முறை பயணத்தைப் பற்றி சுதந்திரமாக பேசுங்கள்",
// //     audioPrompt:
// //       "தயவுசெய்து உங்கள் தொழில்முறை பயணத்தைப் பற்றி சொல்லுங்கள். நீங்கள் எவ்வளவு படித்திருக்கிறீர்கள், உங்கள் தற்போதைய பாத்திரத்தில் எப்படி வந்தீர்கள், இந்த தொழிலில் எத்தனை ஆண்டுகள் வேலை செய்கிறீர்கள், மற்றும் முன்பு வேறு ஏதேனும் வேலைகள் செய்திருக்கிறீர்களா என்பதைப் பகிருங்கள். உங்கள் நேரத்தை எடுத்துக்கொண்டு இயல்பாக பேசுங்கள்.",
// //     instructions: [
// //       "உங்கள் கல்வி பின்னணியைப் பகிருங்கள்",
// //       "நீங்கள் உங்கள் தொழிலில் எப்படி வந்தீர்கள் என்று சொல்லுங்கள்",
// //       "உங்கள் அனுபவ ஆண்டுகளைக் குறிப்பிடுங்கள்",
// //       "முந்தைய வேலைகள் அல்லது பாத்திரங்களைப் பற்றி பேசுங்கள்",
// //       "இயல்பாக பேசுங்கள் - நாங்கள் எல்லாவற்றையும் ஒழுங்கமைப்போம்",
// //     ],
// //     startRecording: "பதிவு தொடங்கவும்",
// //     stopRecording: "பதிவு நிறுத்தவும்",
// //     recording: "பதிவு செய்யப்படுகிறது...",
// //     processing: "உங்கள் கதை செயலாக்கப்படுகிறது...",
// //     silenceDetected: "நீங்கள் இடைநிறுத்தம் செய்ததை நாங்கள் கவனித்தோம். தயவுசெய்து உங்கள் அனுபவத்தைப் பற்றி தொடர்ந்து பேசுங்கள்.",
// //     recordingComplete: "பதிவு முடிந்தது",
// //     playback: "பதிவைக் கேளுங்கள்",
// //     reRecord: "மீண்டும் பதிவு செய்யுங்கள்",
// //     continue: "ரெஸ்யூமேக்கு செல்லுங்கள்",
// //   },
// // }

// // export function FreeFormRecording() {
// //   const router = useRouter()
// //   const [selectedLanguage, setSelectedLanguage] = useState("en")
// //   const [selectedProfession, setSelectedProfession] = useState("")
// //   const [isRecording, setIsRecording] = useState(false)
// //   const [recordingComplete, setRecordingComplete] = useState(false)
// //   const [isProcessing, setIsProcessing] = useState(false)
// //   const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
// //   const [isPlayingBack, setIsPlayingBack] = useState(false)
// //   const [isAudioPromptPlaying, setIsAudioPromptPlaying] = useState(false)
// //   const [isMuted, setIsMuted] = useState(false)
// //   const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout | null>(null)
// //   const [showSilencePrompt, setShowSilencePrompt] = useState(false)

// //   const mediaRecorderRef = useRef<MediaRecorder | null>(null)
// //   const audioChunksRef = useRef<Blob[]>([])
// //   const audioContextRef = useRef<AudioContext | null>(null)
// //   const analyserRef = useRef<AnalyserNode | null>(null)
// //   const silenceDetectionRef = useRef<boolean>(false)

// //   const content = recordingContent[selectedLanguage as keyof typeof recordingContent] || recordingContent.en

// //   useEffect(() => {
// //     // Get stored language and profession
// //     const storedLanguage = localStorage.getItem("selectedLanguage") || "en"
// //     const storedProfession = localStorage.getItem("selectedProfession") || ""
// //     setSelectedLanguage(storedLanguage)
// //     setSelectedProfession(storedProfession)

// //     // Play initial audio prompt
// //     if (!isMuted) {
// //       playAudioPrompt()
// //     }
// //   }, [])

// //   const playAudioPrompt = () => {
// //     if (isMuted) return

// //     setIsAudioPromptPlaying(true)

// //     if ("speechSynthesis" in window) {
// //       const utterance = new SpeechSynthesisUtterance(content.audioPrompt)

// //       const speechLangMap: { [key: string]: string } = {
// //         en: "en-US",
// //         hi: "hi-IN",
// //         bn: "bn-IN",
// //         te: "te-IN",
// //         ta: "ta-IN",
// //         mr: "mr-IN",
// //         gu: "gu-IN",
// //         kn: "kn-IN",
// //         ml: "ml-IN",
// //         pa: "pa-IN",
// //         or: "or-IN",
// //         as: "as-IN",
// //         ur: "ur-IN",
// //       }

// //       utterance.lang = speechLangMap[selectedLanguage] || "en-US"
// //       utterance.rate = 0.8
// //       utterance.pitch = 1

// //       utterance.onend = () => setIsAudioPromptPlaying(false)
// //       utterance.onerror = () => setIsAudioPromptPlaying(false)

// //       speechSynthesis.speak(utterance)
// //     } else {
// //       setIsAudioPromptPlaying(false)
// //     }
// //   }

// //   const playSilencePrompt = () => {
// //     if (isMuted) return

// //     if ("speechSynthesis" in window) {
// //       const utterance = new SpeechSynthesisUtterance(content.silenceDetected)

// //       const speechLangMap: { [key: string]: string } = {
// //         en: "en-US",
// //         hi: "hi-IN",
// //         bn: "bn-IN",
// //         te: "te-IN",
// //         ta: "ta-IN",
// //       }

// //       utterance.lang = speechLangMap[selectedLanguage] || "en-US"
// //       utterance.rate = 0.8
// //       utterance.pitch = 1

// //       speechSynthesis.speak(utterance)
// //     }
// //   }

// //   const startSilenceDetection = (stream: MediaStream) => {
// //     audioContextRef.current = new AudioContext()
// //     analyserRef.current = audioContextRef.current.createAnalyser()
// //     const source = audioContextRef.current.createMediaStreamSource(stream)
// //     source.connect(analyserRef.current)

// //     analyserRef.current.fftSize = 256
// //     const bufferLength = analyserRef.current.frequencyBinCount
// //     const dataArray = new Uint8Array(bufferLength)

// //     let silenceStart = Date.now()
// //     const silenceThreshold = 30 // Adjust this value to change sensitivity
// //     const silenceTimeout = 18000 // 18 seconds

// //     const checkAudioLevel = () => {
// //       if (!silenceDetectionRef.current) return

// //       analyserRef.current!.getByteFrequencyData(dataArray)
// //       const average = dataArray.reduce((a, b) => a + b) / bufferLength

// //       if (average < silenceThreshold) {
// //         // Silence detected
// //         if (Date.now() - silenceStart > silenceTimeout) {
// //           setShowSilencePrompt(true)
// //           playSilencePrompt()
// //           silenceStart = Date.now() // Reset timer
// //         }
// //       } else {
// //         // Sound detected
// //         silenceStart = Date.now()
// //         setShowSilencePrompt(false)
// //       }

// //       requestAnimationFrame(checkAudioLevel)
// //     }

// //     silenceDetectionRef.current = true
// //     checkAudioLevel()
// //   }

// //   const startRecording = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

// //       mediaRecorderRef.current = new MediaRecorder(stream)
// //       audioChunksRef.current = []

// //       mediaRecorderRef.current.ondataavailable = (event) => {
// //         audioChunksRef.current.push(event.data)
// //       }

// //       mediaRecorderRef.current.onstop = () => {
// //         const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
// //         setAudioBlob(audioBlob)
// //         setRecordingComplete(true)
// //         silenceDetectionRef.current = false

// //         // Clean up audio context
// //         if (audioContextRef.current) {
// //           audioContextRef.current.close()
// //         }
// //       }

// //       mediaRecorderRef.current.start()
// //       setIsRecording(true)

// //       // Start silence detection
// //       startSilenceDetection(stream)
// //     } catch (error) {
// //       console.error("Error starting recording:", error)
// //     }
// //   }

// //   const stopRecording = () => {
// //     if (mediaRecorderRef.current && isRecording) {
// //       mediaRecorderRef.current.stop()
// //       setIsRecording(false)
// //       silenceDetectionRef.current = false

// //       // Stop all tracks
// //       mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
// //     }
// //   }

// //   const playRecording = () => {
// //     if (audioBlob) {
// //       const audio = new Audio(URL.createObjectURL(audioBlob))
// //       setIsPlayingBack(true)

// //       audio.onended = () => setIsPlayingBack(false)
// //       audio.onerror = () => setIsPlayingBack(false)

// //       audio.play()
// //     }
// //   }

// //   const reRecord = () => {
// //     setRecordingComplete(false)
// //     setAudioBlob(null)
// //     setShowSilencePrompt(false)
// //   }

// //   const processRecording = async () => {
// //     if (!audioBlob) return

// //     setIsProcessing(true)

// //     try {
// //       // Create FormData to send audio file
// //       const formData = new FormData()
// //       formData.append("audio", audioBlob, "recording.wav")
// //       formData.append("language", selectedLanguage)
// //       formData.append("profession", selectedProfession)

// //       const response = await fetch("/api/process-freeform-audio", {
// //         method: "POST",
// //         body: formData,
// //       })

// //       if (response.ok) {
// //         const result = await response.json()
// //         // Store the processed resume data
// //         localStorage.setItem("resumeData", JSON.stringify(result))
// //         router.push("/resume-display")
// //       } else {
// //         console.error("Failed to process recording")
// //       }
// //     } catch (error) {
// //       console.error("Error processing recording:", error)
// //     } finally {
// //       setIsProcessing(false)
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
// //       <div className="max-w-4xl mx-auto">
// //         {/* Header */}
// //         <div className="text-center mb-8">
// //           <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
// //           <p className="text-lg text-gray-600">{content.subtitle}</p>
// //         </div>

// //         {/* Audio Controls */}
// //         <div className="flex justify-center mb-6">
// //           <div className="flex items-center space-x-4">
// //             <Button
// //               variant="outline"
// //               size="sm"
// //               onClick={playAudioPrompt}
// //               disabled={isAudioPromptPlaying}
// //               className="flex items-center space-x-2 bg-transparent"
// //             >
// //               <Volume2 className="w-4 h-4" />
// //               <span>Replay Instructions</span>
// //             </Button>
// //             <Button
// //               variant="outline"
// //               size="sm"
// //               onClick={() => setIsMuted(!isMuted)}
// //               className="flex items-center space-x-2"
// //             >
// //               {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
// //               <span>{isMuted ? "Unmute" : "Mute"}</span>
// //             </Button>
// //           </div>
// //         </div>

// //         {/* Instructions Card */}
// //         <Card className="p-6 mb-8">
// //           <h3 className="text-lg font-semibold text-gray-900 mb-4">What to share:</h3>
// //           <ul className="space-y-2">
// //             {content.instructions.map((instruction, index) => (
// //               <li key={index} className="flex items-start space-x-3">
// //                 <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
// //                 <span className="text-gray-700">{instruction}</span>
// //               </li>
// //             ))}
// //           </ul>
// //         </Card>

// //         {/* Recording Interface */}
// //         <div className="text-center">
// //           {!recordingComplete ? (
// //             <div className="space-y-6">
// //               {/* Recording Button */}
// //               <div className="flex justify-center">
// //                 <Button
// //                   onClick={isRecording ? stopRecording : startRecording}
// //                   size="lg"
// //                   className={`w-32 h-32 rounded-full text-white font-semibold text-lg transition-all duration-300 ${
// //                     isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-green-500 hover:bg-green-600"
// //                   }`}
// //                 >
// //                   {isRecording ? (
// //                     <div className="flex flex-col items-center space-y-2">
// //                       <Square className="w-8 h-8" />
// //                       <span className="text-sm">{content.stopRecording}</span>
// //                     </div>
// //                   ) : (
// //                     <div className="flex flex-col items-center space-y-2">
// //                       <Mic className="w-8 h-8" />
// //                       <span className="text-sm">{content.startRecording}</span>
// //                     </div>
// //                   )}
// //                 </Button>
// //               </div>

// //               {/* Recording Status */}
// //               {isRecording && (
// //                 <div className="text-center">
// //                   <p className="text-lg font-medium text-red-600 animate-pulse">{content.recording}</p>
// //                   {showSilencePrompt && (
// //                     <p className="text-sm text-orange-600 mt-2 animate-bounce">{content.silenceDetected}</p>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           ) : (
// //             <div className="space-y-6">
// //               {/* Recording Complete */}
// //               <div className="text-center">
// //                 <h3 className="text-xl font-semibold text-green-600 mb-4">{content.recordingComplete}</h3>

// //                 {/* Playback Controls */}
// //                 <div className="flex justify-center space-x-4 mb-6">
// //                   <Button
// //                     onClick={playRecording}
// //                     disabled={isPlayingBack}
// //                     variant="outline"
// //                     className="flex items-center space-x-2 bg-transparent"
// //                   >
// //                     {isPlayingBack ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
// //                     <span>{content.playback}</span>
// //                   </Button>

// //                   <Button onClick={reRecord} variant="outline" className="flex items-center space-x-2 bg-transparent">
// //                     <RotateCcw className="w-4 h-4" />
// //                     <span>{content.reRecord}</span>
// //                   </Button>
// //                 </div>

// //                 {/* Continue Button */}
// //                 <Button
// //                   onClick={processRecording}
// //                   disabled={isProcessing}
// //                   size="lg"
// //                   className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
// //                 >
// //                   {isProcessing ? content.processing : content.continue}
// //                 </Button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }







// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Mic, Square, Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react"
// import { useRouter } from "next/navigation"

// // Multi-language content for free form recording
// const recordingContent = {
//   en: {
//     title: "Tell Us Your Story",
//     subtitle: "Speak freely about your professional journey",
//     audioPrompt:
//       "Please tell us about your professional journey. Share how much you have studied, how you landed in your current role, how many years you have been working in this profession, and any other jobs you have done before. Take your time and speak naturally.",
//     instructions: [
//       "Share your educational background",
//       "Tell us how you got into your profession",
//       "Mention your years of experience",
//       "Talk about any previous jobs or roles",
//       "Speak naturally - we'll organize everything",
//     ],
//     startRecording: "Start Recording",
//     stopRecording: "Stop Recording",
//     recording: "Recording...",
//     processing: "Processing your story...",
//     silenceDetected: "We noticed you paused. Please continue speaking about your experience.",
//     recordingComplete: "Recording Complete",
//     playback: "Play Recording",
//     reRecord: "Record Again",
//     continue: "Continue to Resume",
//   },
//   hi: {
//     title: "अपनी कहानी बताएं",
//     subtitle: "अपनी पेशेवर यात्रा के बारे में स्वतंत्र रूप से बोलें",
//     audioPrompt:
//       "कृपया अपनी पेशेवर यात्रा के बारे में बताएं। साझा करें कि आपने कितनी पढ़ाई की है, आप अपनी वर्तमान भूमिका में कैसे पहुंचे, आप इस पेशे में कितने साल से काम कर रहे हैं, और पहले कोई अन्य नौकरी की है या नहीं। अपना समय लें और स्वाभाविक रूप से बोलें।",
//     instructions: [
//       "अपनी शैक्षणिक पृष्ठभूमि साझा करें",
//       "बताएं कि आप अपने पेशे में कैसे आए",
//       "अपने अनुभव के वर्षों का उल्लेख करें",
//       "पिछली नौकरियों या भूमिकाओं के बारे में बात करें",
//       "स्वाभाविक रूप से बोलें - हम सब कुछ व्यवस्थित करेंगे",
//     ],
//     startRecording: "रिकॉर्डिंग शुरू करें",
//     stopRecording: "रिकॉर्डिंग बंद करें",
//     recording: "रिकॉर्डिंग हो रही है...",
//     processing: "आपकी कहानी प्रोसेस हो रही है...",
//     silenceDetected: "हमने देखा कि आपने रुका है। कृपया अपने अनुभव के बारे में बोलना जारी रखें।",
//     recordingComplete: "रिकॉर्डिंग पूरी हुई",
//     playback: "रिकॉर्डिंग सुनें",
//     reRecord: "फिर से रिकॉर्ड करें",
//     continue: "रिज्यूमे पर जाएं",
//   },
//   bn: {
//     title: "আপনার গল্প বলুন",
//     subtitle: "আপনার পেশাগত যাত্রা সম্পর্কে স্বাধীনভাবে কথা বলুন",
//     audioPrompt:
//       "অনুগ্রহ করে আপনার পেশাগত যাত্রা সম্পর্কে বলুন। শেয়ার করুন আপনি কতটুকু পড়াশোনা করেছেন, আপনি আপনার বর্তমান ভূমিকায় এসেছেন, এই পেশে কত বছর ধরে কাজ করছেন, এবং আগে অন্য কোনো কাজ করেছেন কিনা। আপনার সময় নিন এবং স্বাভাবিকভাবে কথা বলুন।",
//     instructions: [
//       "আপনার শিক্ষাগত পটভূমি শেয়ার করুন",
//       "বলুন কীভাবে আপনি আপনার পেশে এসেছেন",
//       "আপনার অভিজ্ঞতার বছরগুলি উল্লেখ করুন",
//       "আগের কোনো কাজ বা ভূমিকা সম্পর্কে কথা বলুন",
//       "স্বাভাবিকভাবে কথা বলুন - আমরা সবকিছু সাজিয়ে দেব",
//     ],
//     startRecording: "রেকর্ডিং শুরু করুন",
//     stopRecording: "রেকর্ডিং বন্ধ করুন",
//     recording: "রেকর্ডিং হচ্ছে...",
//     processing: "আপনার গল্প প্রক্রিয়া করা হচ্ছে...",
//     silenceDetected: "আমরা লক্ষ্য করেছি আপনি থেমেছেন। অনুগ্রহ করে আপনার অভিজ্ঞতা সম্পর্কে বোলা চালিয়ে যান।",
//     recordingComplete: "রেকর্ডিং সম্পূর্ণ",
//     playback: "রেকর্ডিং শুনুন",
//     reRecord: "আবার রেকর্ড করুন",
//     continue: "রিজিউমেতে যান",
//   },
//   te: {
//     title: "మీ కథను చెప్పండి",
//     subtitle: "మీ వృత్తిపరమైన ప్రయాణం గురించి స్వేచ్ఛగా మాట్లాడండి",
//     audioPrompt:
//       "దయచేసి మీ వృత్తిపరమైన ప్రయాణం గురించి చెప్పండి। మీరు ఎంత చదువుకున్నారు, మీ ప్రస్తుత పాత్రలో ఎలా వచ్చారు, ఈ వృత్తిలో ఎన్ని సంవత్సరాలు పని చేస్తున్నారు, మరియు ఇంతకు మునుపు ఏవైనా ఇతర ఉద్యోగాలు చేశారా అని పంచుకోండి. మీ సమయం తీసుకోండి మరియు సహజంగా మాట్లాడండి।",
//     instructions: [
//       "మీ విద్యా నేపథ్యాన్ని పంచుకోండి",
//       "మీరు మీ వృత్తిగె ఎలా వచ్చారో చెప్పండి",
//       "మీ అనుభవ సంవత్సరాలను ఉల్లేఖిసి",
//       "మునుపటి ఉద్యోగాలు లేదా పాత్రల గురించి మాట్లాడండి",
//       "సహజంగా మాట్లాడండి - మేము ఎల్లవన్నూ నిర్వహిస్తాము",
//     ],
//     startRecording: "రికార్డింగ్ ప్రారంభించండి",
//     stopRecording: "రికార్డింగ్ ఆపండి",
//     recording: "రికార్డింగ్ అవుతోంది...",
//     processing: "మీ కథ ప్రాసెస్ అవుతోంది...",
//     silenceDetected: "మీరు ఆగిపోయారని మేము గమనించాము. దయచేసి మీ అనుభవం గురించి మాట్లాడటం కొనసాగించండి.",
//     recordingComplete: "రికార్డింగ్ పూర్తయింది",
//     playback: "రికార్డింగ్ వినండి",
//     reRecord: "మళ్లీ రికార్డ్ చేయండి",
//     continue: "రెజ్యూమ్‌కు వెళ్లండి",
//   },
//   ta: {
//     title: "உங்கள் கதையைச் சொல்லுங்கள்",
//     subtitle: "உங்கள் தொழில்முறை பயணத்தைப் பற்றி சுதந்திரமாக பேசுங்கள்",
//     audioPrompt:
//       "தயவுசெய்து உங்கள் தொழில்முறை பயணத்தைப் பற்றி சொல்லுங்கள். நீங்கள் எவ்வளவு படித்திருக்கிறீர்கள், உங்கள் தற்போதைய பாத்திரத்தில் எப்படி வந்தீர்கள், இந்த தொழிலில் எத்தனை ஆண்டுகள் வேலை செய்கிறீர்கள், மற்றும் முன்பு மற்றேதெனும் வேலைகள் செய்திருக்கிறீர்களா என்பதைப் பகிருங்கள். உங்கள் நேரத்தை எடுத்துக்கொண்டு இயல்பாக பேசுங்கள்.",
//     instructions: [
//       "உங்கள் கல்வி பின்னணியைப் பகிருங்கள்",
//       "நீங்கள் உங்கள் தொழிலில் எப்படி வந்தீர்கள் என்று சொல்லுங்கள்",
//       "உங்கள் அனுபவ ஆண்டுகளைக் குறிப்பிடுங்கள்",
//       "முந்தைய வேலைகள் அல்லது பாத்திரங்களைப் பற்றி பேசுங்கள்",
//       "இயல்பாக பேசுங்கள் - நாங்கள் எல்லாவற்றையும் ஒழுங்கமைப்போம்",
//     ],
//     startRecording: "பதிவு தொடங்கவும்",
//     stopRecording: "பதிவு நிறுத்தவும்",
//     recording: "பதிவு செய்யப்படுகிறது...",
//     processing: "உங்கள் கதை செயலாக்கப்படுகிறது...",
//     silenceDetected: "நீங்கள் இடைநிறுத்தம் செய்ததை நாங்கள் கவனித்தோம். தயவுசெய்து உங்கள் அனுபவத்தைப் பற்றி தொடர்ந்து பேசுங்கள்.",
//     recordingComplete: "பதிவு முடிந்தது",
//     playback: "பதிவைக் கேளுங்கள்",
//     reRecord: "வீண்டும் பதிவு செய்யுங்கள்",
//     continue: "ரெஸ்யூமேக்கு செல்லுங்கள்",
//   },
//   mr: {
//     title: "तुमची गोष्ट सांगा",
//     subtitle: "तुमच्या व्यावसायिक प्रवासाबद्दल मुक्तपणे बोला",
//     audioPrompt:
//       "कृपया तुमच्या व्यावसायिक प्रवासाबद्दल सांगा. तुम्ही किती अभ्यास केला आहे, तुम्ही तुमच्या सध्याच्या भूमिकेत कसे आलात, या व्यवसायात किती वर्षे काम करत आहात आणि यापूर्वी इतर कोणत्या नोकऱ्या केल्या आहेत याबद्दल सांगा. तुमचा वेळ घ्या आणि नैसर्गिकपणे बोला.",
//     instructions: [
//       "तुमची शैक्षणिक पार्श्वभूमी सामायिक करा",
//       "तुम्ही तुमच्या व्यवसायात कसे आलात ते सांगा",
//       "तुमच्या अनुभवाची वर्षे नमूद करा",
//       "मागील नोकऱ्या किंवा भूमिकांबद्दल बोला",
//       "नैसर्गिकपणे बोला - आम्ही सर्वकाही व्यवस्थित करू",
//     ],
//     startRecording: "रेकॉर्डिंग सुरू करा",
//     stopRecording: "रेकॉर्डिंग थांबवा",
//     recording: "रेकॉर्डिंग होत आहे...",
//     processing: "तुमची गोष्ट प्रक्रिया होत आहे...",
//     silenceDetected: "आम्ही लक्षात घेतले की तुम्ही थांबलात. कृपया तुमच्या अनुभवाबद्दल बोलणे सुरू ठेवा.",
//     recordingComplete: "रेकॉर्डिंग पूर्ण",
//     playback: "रेकॉर्डिंग ऐका",
//     reRecord: "पुन्हा रेकॉर्ड करा",
//     continue: "रिझ्यूमेकडे जा",
//   },
//   gu: {
//     title: "તમારી વાર્તા કહો",
//     subtitle: "તમારી વ્યાવસાયિક યાત્રા વિશે મુક્તપણે બોલો",
//     audioPrompt:
//       "કૃપા કરીને તમારી વ્યાવસાયિક યાત્રા વિશે કહો. શેર કરો કે તમે કેટલો અભ્યાસ કર્યો છે, તમે તમારી વર્તમાન ભૂમિકામાં કેવી રીતે આવ્યા, આ વ્યવસાયમાં કેટલા વર્ષથી કામ કરી રહ્યા છો, અને પહેલાં અન્ય કોઈ નોકરીઓ કરી છે કે નહીં. તમારો સમય લો અને કુદરતી રીતે બોલો.",
//     instructions: [
//       "તમારી શૈક્ષણિક પૃષ્ઠભૂમિ શેર કરો",
//       "કહો કે તમે તમારા વ્યવસાયમાં કેવી રીતે આવ્યા",
//       "તમારા અનુભવના વર્ષોનો ઉલ્લેખ કરો",
//       "અગાઉની નોકરીઓ અથવા ભૂમિકાઓ વિશે વાત કરો",
//       "કુદરતી રીતે બોલો - અમે બધું ગોઠવીશું",
//     ],
//     startRecording: "રેકોર્ડિંગ શરૂ કરો",
//     stopRecording: "રેકોર્ડિંગ બંધ કરો",
//     recording: "રેકોર્ડિંગ થઈ રહ્યું છે...",
//     processing: "તમારી વાર્તા પ્રોસેસ થઈ રહી છે...",
//     silenceDetected: "અમે નોંધ્યું છે કે તમે થોભ્યા છો. કૃપા કરીને તમારા અનુભવ વિશે બોલવાનું ચાલુ રાખો.",
//     recordingComplete: "રેકોર્ડિંગ પૂર્ણ",
//     playback: "રેકોર્ડિંગ સાંભળો",
//     reRecord: "ફરીથી રેકોર્ડ કરો",
//     continue: "રિઝ્યૂમે પર જાઓ",
//   },
//   kn: {
//     title: "ನಿಮ್ಮ ಕಥೆಯನ್ನು ಹೇಳಿ",
//     subtitle: "ನಿಮ್ಮ ವೃತ್ತಿಪರ ಪ್ರಯಾಣದ ಬಗ್ಗೆ ಮುಕ್ತವಾಗಿ ಮಾತನಾಡಿ",
//     audioPrompt:
//       "ದಯವಿಟ್ಟು ನಿಮ್ಮ ವೃತ್ತಿಪರ ಪ್ರಯಾಣದ ಬಗ್ಗೆ ಹೇಳಿ. ನೀವು ಎಷ್ಟು ಅಧ್ಯಯನ ಮಾಡಿದ್ದೀರಿ, ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಪಾತ್ರಕ್ಕೆ ಹೇಗೆ ಬಂದಿದ್ದೀರಿ, ಈ ವೃತ್ತಿಯಲ್ಲಿ ಎಷ್ಟು ವರ್ಷಗಳಿಂದ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೀರಿ, ಮತ್ತು ಮೊದಲು ಯಾವುದೇ ಇತರ ಕೆಲಸಗಳನ್ನು ಮಾಡಿದ್ದೀರಾ ಎಂಬುದನ್ನು ಹಂಚಿಕೊಳ್ಳಿ. ನಿಮ್ಮ ಸಮಯವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ ಮತ್ತು ಸ್ವಾಭಾವಿಕವಾಗಿ ಮಾತನಾಡಿ.",
//     instructions: [
//       "ನಿಮ್ಮ ಶೈಕ್ಷಣಿಕ ಹಿನ್ನೆಲೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
//       "ನೀವು ನಿಮ್ಮ ವೃತ್ತಿಗೆ ಹೇಗೆ ಬಂದಿದ್ದೀರಿ ಎಂಬುದನ್ನು ಹೇಳಿ",
//       "ನಿಮ್ಮ ಅನುಭವದ ವರ್ಷಗಳನ್ನು ಉಲ್ಲೇಖಿಸಿ",
//       "ಹಿಂದಿನ ಕೆಲಸಗಳು ಅಥವಾ ಪಾತ್ರಗಳ ಬಗ್ಗೆ ಮಾತನಾಡಿ",
//       "ಸ್ವಾಭಾವಿಕವಾಗಿ ಮಾತನಾಡಿ - ನಾವು ಎಲ್ಲವನ್ನೂ ಸಂಘಟಿಸುತ್ತೇವೆ",
//     ],
//     startRecording: "ರೆಕಾರ್ಡಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ",
//     stopRecording: "ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ",
//     recording: "ರೆಕಾರ್ಡಿಂಗ್ ಆಗುತ್ತಿದೆ...",
//     processing: "ನಿಮ್ಮ ಕಥೆಯನ್ನು ಪ್ರಕ್રಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
//     silenceDetected: "ನೀವು ವಿರಾમಗೊಳಿಸಿದ್ದೀರಿ ಎಂದು ನಾವು ಗಮನಿಸಿದ್ದೇವೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಅನುಭವದ ಬಗ್ಗೆ ಮಾತನಾಡುವುದನ್ನು ಮುಂದುವರಿಸಿ.",
//     recordingComplete: "ರೆಕಾರ್ಡಿಂಗ್ ಪೂರ್ಣಗೊಂಡಿದೆ",
//     playback: "ರೆಕಾರ್ಡಿಂಗ್ ಕೇಳಿ",
//     reRecord: "ಮತ್ತೆ ರೆಕಾರ್ಡ್ ಮಾಡಿ",
//     continue: "ರೆಸ್ಯೂಮೆಗೆ ಹೋಗಿ",
//   },
//   ml: {
//     title: "നിങ്ങളുടെ കഥ പറയുക",
//     subtitle: "നിങ്ങളുടെ പ്രൊഫഷണൽ യാത്രയെക്കുറിച്ച് സ്വതന്ത്രമായി സംസാരിക്കുക",
//     audioPrompt:
//       "ദയവായി നിങ്ങളുടെ പ്രൊഫഷണൽ യാത്രയെക്കുറിച്ച് പറയുക. നിങ്ങൾ എത്രമാത്രം പഠിച്ചിട്ടുണ്ട്, നിങ്ങളുടെ നിലവിലെ റോളിൽ എങ്ങനെ എത്തി, ഈ പ്രൊഫഷനിൽ എത്ര വർഷമായി പ്രവർത്തിക്കുന്നു, മുമ്പ് മറ്റേതെങ്കിലും ജോലികൾ ചെയ്തിട്ടുണ്ടോ എന്നിവ പങ്കിടുക. നിങ്ങളുടെ സമയമെടുത്ത് സ്വാഭാവികമായി സംസാരിക്കുക.",
//     instructions: [
//       "നിങ്ങളുടെ വിദ്യാഭ്യാസ പശ്ചാത്തലം പങ്കിടുക",
//       "നിങ്ങൾ നിങ്ങളുടെ പ്രൊഫഷനിൽ എങ്ങനെ എത്തി എന്ന് പറയുക",
//       "നിങ്ങളുടെ അനുഭവ വർഷങ്ങൾ പരാമർശിക്കുക",
//       "മുമ്പത്തെ ജോലികളോ റോളുകളോ കുറിച്ച് സംസാരിക്കുക",
//       "സ്വാഭാവികമായി സംസാരിക്കുക - ഞങ്ങൾ എല്ലാം ക്രമീകരിക്കും",
//     ],
//     startRecording: "റെക്കോർഡിംഗ് ആരംഭിക്കുക",
//     stopRecording: "റെക്കോർഡിംഗ് നിർത്തുക",
//     recording: "റെക്കോർഡിംഗ് നടക്കുന്നു...",
//     processing: "നിങ്ങളുടെ കഥ പ്രോസസ്സ് ചെയ്യുന്നു...",
//     silenceDetected: "നിങ്ങൾ താൽക്കാലികമായി നിർത്തിയതായി ഞങ്ങൾ ശ്രദ്ധിച്ചു. ദയവായി നിങ്ങളുടെ അനുഭവത്തെക്കുറിച്ച് സംസാരിക്കുന്നത് തുടരുക.",
//     recordingComplete: "റെക്കോർഡിംഗ് പൂർത്തിയായി",
//     playback: "റെക്കോർഡിംഗ് കേൾക്കുക",
//     reRecord: "വീണ്ടും റെക്കോർഡ് ചെയ്യുക",
//     continue: "റെസ്യൂമിലേക്ക് പോകുക",
//   },
//   pa: {
//     title: "ਆਪਣੀ ਕਹਾਣੀ ਦੱਸੋ",
//     subtitle: "ਆਪਣੇ ਪੇਸ਼ੇਵਰ ਸਫ਼ਰ ਬਾਰੇ ਖੁੱਲ੍ਹ ਕੇ ਗੱਲ ਕਰੋ",
//     audioPrompt:
//       "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਪੇਸ਼ੇਵਰ ਸਫ਼ਰ ਬਾਰੇ ਦੱਸੋ। ਸਾਂਝਾ ਕਰੋ ਕਿ ਤੁਸੀਂ ਕਿੰਨੀ ਪੜ੍ਹਾਈ ਕੀਤੀ ਹੈ, ਤੁਸੀਂ ਆਪਣੀ ਮੌਜੂਦਾ ਭੂਮਿਕਾ ਵਿੱਚ ਕਿਵੇਂ ਆਏ, ਇਸ ਪੇਸ਼ੇ ਵਿੱਚ ਕਿੰਨੇ ਸਾਲਾਂ ਤੋਂ ਕੰਮ ਕਰ ਰਹੇ ਹੋ, ਅਤੇ ਪਹਿਲਾਂ ਕੋਈ ਹੋਰ ਨੌਕਰੀਆਂ ਕੀਤੀਆਂ ਹਨ ਜਾਂ ਨਹੀਂ। ਆਪਣਾ ਸਮਾਂ ਲਓ ਅਤੇ ਕੁਦਰਤੀ ਤੌਰ 'ਤੇ ਬੋਲੋ।",
//     instructions: [
//       "ਆਪਣੀ ਵਿਦਿਆਰਥੀ ਪਿਛੋਕੜ ਸਾਂਝੀ ਕਰੋ",
//       "ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਆਪਣੇ ਪੇਸ਼ੇ ਵਿੱਚ ਕਿਵੇਂ ਆਏ",
//       "ਆਪਣੇ ਤਜਰਬੇ ਦੇ ਸਾਲਾਂ ਦਾ ਜ਼ਿਕਰ ਕਰੋ",
//       "ਪਿਛਲੀਆਂ ਨੌਕਰੀਆਂ ਜਾਂ ਭੂਮਿਕਾਵਾਂ ਬਾਰੇ ਗੱਲ ਕਰੋ",
//       "ਕੁਦਰਤੀ ਤੌਰ 'ਤੇ ਬੋਲੋ - ਅਸੀਂ ਸਭ ਕੁਝ ਵਿਵਸਥਿਤ ਕਰਾਂਗੇ",
//     ],
//     startRecording: "ਰਿਕਾਰਡਿੰਗ ਸ਼ੁਰੂ ਕਰੋ",
//     stopRecording: "ਰਿਕਾਰਡਿੰਗ ਬੰਦ ਕਰੋ",
//     recording: "ਰਿਕਾਰਡਿੰਗ ਹੋ ਰਹੀ ਹੈ...",
//     processing: "ਤੁਹਾਡੀ ਕਹਾਣੀ ਪ੍ਰੋਸੈਸ ਹੋ ਰਹੀ ਹੈ...",
//     silenceDetected: "ਅਸੀਂ ਦੇਖਿਆ ਹੈ ਕਿ ਤੁਸੀਂ ਰੁਕ ਗਏ ਹੋ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਤਜਰਬੇ ਬਾਰੇ ਬੋਲਣਾ ਜਾਰੀ ਰੱਖੋ।",
//     recordingComplete: "ਰਿਕਾਰਡਿੰਗ ਪੂਰੀ ਹੋਈ",
//     playback: "ਰਿਕਾਰਡਿੰਗ ਸੁਣੋ",
//     reRecord: "ਦੁਬਾਰਾ ਰਿਕਾਰਡ ਕਰੋ",
//     continue: "ਰਿਜ਼ਿਊਮੇ 'ਤੇ ਜਾਓ",
//   },
//   or: {
//     title: "ଆପଣଙ୍କ କାହାଣୀ କୁହନ୍ତୁ",
//     subtitle: "ଆପଣଙ୍କ ବୃତ୍ତିଗତ ଯାତ୍ରା ବିଷୟରେ ମୁକ୍ତଭାବେ କୁହନ୍ତୁ",
//     audioPrompt:
//       "ଦୟାକରି ଆପଣଙ୍କ ବୃତ୍ତିଗତ ଯାତ୍ରା ବିଷୟରେ କୁହନ୍ତୁ। ଆପଣ କେତେ ଅଧ୍ୟୟନ କରିଛନ୍ତି, ଆପଣଙ୍କ ବର୍ତ୍ତମାନର ଭୂମିକାରେ କିପରି ଆସିଲେ, ଏହି ବୃତ୍ତିରେ କେତେ ବର୍ଷ ଧରି କାମ କରୁଛନ୍ତି, ଏବଂ ପୂର୍ବରୁ ଅନ୍ୟ କୌଣସି କାମ କରିଛନ୍ତି କି ନାହିଁ ତାହା ଅଂଶୀଦାର କରନ୍ତୁ। ଆପଣଙ୍କ ସମୟ ନିଅନ୍ତୁ ଏବଂ ପ୍ରାକୃତିକ ଭାବରେ କୁହନ୍ତୁ।",
//     instructions: [
//       "ଆପଣଙ୍କ ଶିକ୍ଷାଗତ ପୃଷ୍ଠଭୂମି ଅଂଶୀଦାର କରନ୍ତୁ",
//       "ଆପଣ ଆପଣଙ୍କ ବୃତ୍ତିରେ କିପରି ଆସିଲେ ତାହା କୁହନ୍ତୁ",
//       "ଆପଣଙ୍କ ଅଭିଜ୍ଞତାର ବର୍ଷଗୁଡ଼ିକ ଉଲ୍ଲେଖ କରନ୍ତୁ",
//       "ପୂର୍ବ କାମ କିମ୍ବା ଭୂମିକା ବିଷୟରେ କୁହନ୍ତୁ",
//       "ପ୍ରାକୃତିକ ଭାବରେ କୁହନ୍ତୁ - ଆମେ ସବୁକିଛି ସଂଗଠିତ କରିବୁ",
//     ],
//     startRecording: "ରେକର୍ଡିଂ ଆରମ୍ଭ କରନ୍ତୁ",
//     stopRecording: "ରେକର୍ଡିଂ ବନ୍ଦ କରନ୍ତୁ",
//     recording: "ରେକର୍ଡିଂ ହେଉଛି...",
//     processing: "ଆପଣଙ୍କ କାହାଣୀ ପ୍ରକ୍ରିୟାକରଣ ହେଉଛି...",
//     silenceDetected: "ଆମେ ଲକ୍ଷ୍ୟ କଲୁ ଯେ ଆପଣ ବିରତି ନେଇଛନ୍ତି। ଦୟାକରି ଆପଣଙ୍କ ଅଭିଜ୍ଞତା ବିଷୟରେ କହିବା ଜାରି ରଖନ୍ତୁ।",
//     recordingComplete: "ରେକର୍ଡିଂ ସମ୍ପୂର୍ଣ୍ଣ",
//     playback: "ରେକର୍ଡିଂ ଶୁଣନ୍ତୁ",
//     reRecord: "ପୁନର୍ବାର ରେକର୍ଡ କରନ୍ତୁ",
//     continue: "ରିଜ୍ୟୁମେକୁ ଯାଆନ୍ତୁ",
//   },
//   as: {
//     title: "আপোনাৰ কাহিনী কওক",
//     subtitle: "আপোনাৰ পেছাদাৰী যাত্ৰাৰ বিষয়ে মুক্তভাৱে কওক",
//     audioPrompt:
//       "অনুগ্ৰহ কৰি আপোনাৰ পেছাদাৰী যাত্ৰাৰ বিষয়ে কওক। আপুনি কিমান অধ্যয়ন কৰিছে, আপোনাৰ বৰ্তমানৰ ভূমিকালৈ কেনেকৈ আহিছে, এই পেছাত কিমান বছৰ ধৰি কাম কৰি আছে, আৰু আগতে আন কোনো চাকৰি কৰিছে নে নাই সেয়া ভাগ-বতৰা কৰক। আপোনাৰ সময় লওক আৰু স্বাভাৱিকভাৱে কওক।",
//     instructions: [
//       "আপোনাৰ শিক্ষাগত পটভূমি ভাগ-বতৰা কৰক",
//       "আপুনি আপোনাৰ পেছালৈ কেনেকৈ আহিছে সেয়া কওক",
//       "আপোনাৰ অভিজ্ঞতাৰ বছৰবোৰ উল্লেখ কৰক",
//       "আগৰ চাকৰি বা ভূমিকাৰ বিষয়ে কওক",
//       "স্বাভাৱিকভাৱে কওক - আমি সকলো সংগঠিত কৰিম",
//     ],
//     startRecording: "ৰেকৰ্ডিং আৰম্ভ কৰক",
//     stopRecording: "ৰেকৰ্ডিং বন্ধ কৰক",
//     recording: "ৰেকৰ্ডিং হৈ আছে...",
//     processing: "আপোনাৰ কাহিনী প্ৰক্ৰিয়াকৰণ হৈ আছে...",
//     silenceDetected: "আমি লକ্ষ্য কৰিলোঁ যে আপুনি বিৰতি লৈছে। অনুগ্ৰহ কৰি আপোনাৰ অଭିଜ୍ଞତାৰ বিষয়ে কোৱা অব্যাহত ৰাখক।",
//     recordingComplete: "ৰেকৰ্ডিং সম্পূৰ্ণ",
//     playback: "ৰেকৰ্ডিং শুনক",
//     reRecord: "পুনৰ ৰেকৰ্ড কৰক",
//     continue: "ৰিজিউমলৈ যাওক",
//   },
//   ur: {
//     title: "اپنی کہانی بتائیں",
//     subtitle: "اپنے پیشہ ورانہ سفر کے بارے میں آزادانہ طور پر بات کریں",
//     audioPrompt:
//       "براہ کرم اپنے پیشہ ورانہ سفر کے بارے میں بتائیں۔ شیئر کریں کہ آپ نے کتنی تعلیم حاصل کی ہے، آپ اپنے موجودہ کردار میں کیسے آئے، اس پیشے میں کتنے سال سے کام کر رہے ہیں، اور پہلے کوئی اور نوکریاں کی ہیں یا نہیں۔ اپنا وقت لیں اور قدرتی طور پر بولیں۔",
//     instructions: [
//       "اپنا تعلیمی پس منظر شیئر کریں",
//       "بتائیں کہ آپ اپنے پیشے میں کیسے آئے",
//       "اپنے تجربے کے سالوں کا ذکر کریں",
//       "پچھلی نوکریوں یا کرداروں کے بارے میں بات کریں",
//       "قدرتی طور پر بولیں - ہم سب کچھ منظم کریں گے",
//     ],
//     startRecording: "ریکارڈنگ شروع کریں",
//     stopRecording: "ریکارڈنگ بند کریں",
//     recording: "ریکارڈنگ ہو رہی ہے...",
//     processing: "آپ کی کہانی پروسیس ہو رہی ہے...",
//     silenceDetected: "ہم نے دیکھا کہ آپ نے رک گئے ہیں۔ براہ کرم اپنے تجربے کے بارے میں بولنا جاری رکھیں۔",
//     recordingComplete: "ریکارڈنگ مکمل",
//     playback: "ریکارڈنگ سنیں",
//     reRecord: "دوبارہ ریکارڈ کریں",
//     continue: "ریزیومے پر جائیں",
//   },
//   sa: {
//     title: "अपनी कहानी बताएं",
//     subtitle: "अपनी पेशेवर यात्रा के बारे में स्वतंत्र रूप से बोलें",
//     audioPrompt:
//       "कृपया अपनी पेशेवर यात्रा के बारे में बताएं। साझा करें कि आपने कितनी पढ़ाई की है, आप अपनी वर्तमान भूमिका में कैसे पहुंचे, आप इस पेशे में कितने साल से काम कर रहे हैं, और पहले कोई अन्य नौकरी की है या नहीं। अपना समय लें और स्वाभाविक रूप से बोलें।",
//     instructions: [
//       "अपनी शैक्षणिक पृष्ठभूमि साझा करें",
//       "बताएं कि आप अपने पेशे में कैसे आए",
//       "अपने अनुभव के वर्षों का उल्लेख करें",
//       "पिछली नौकरियों या भूमिकाओं के बारे में बात करें",
//       "स्वाभाविक रूप से बोलें - हम सब कुछ व्यवस्थित करेंगे",
//     ],
//     startRecording: "रिकॉर्डिंग शुरू करें",
//     stopRecording: "रिकॉर्डिंग बंद करें",
//     recording: "रिकॉर्डिंग हो रही है...",
//     processing: "आपकी कहानी प्रोसेस हो रही है...",
//     silenceDetected: "हमने देखा कि आपने रुका है। कृपया अपने अनुभव के बारे में बोलना जारी रखें।",
//     recordingComplete: "रिकॉर्डिंग पूरी हुई",
//     playback: "रिकॉर्डिंग सुनें",
//     reRecord: "फिर से रिकॉर्ड करें",
//     continue: "रिज्यूमे पर जाएं",
//   },
//   ne: {
//     title: "तपाईंको कथा भन्नुहोस्",
//     subtitle: "तपाईंको व्यावसायिक यात्राको बारेमा स्वतन्त्र रूपमा बोल्नुहोस्",
//     audioPrompt:
//       "कृपया तपाईंको व्यावसायिक यात्राको बारेमा भन्नुहोस्। तपाईंले कति अध्ययन गर्नुभएको छ, तपाईं आफ्नो हालको भूमिकामा कसरी आउनुभयो, यो पेशामा कति वर्षदेखि काम गरिरहनुभएको छ, र पहिले अन्य कुनै जागिरहरू गर्नुभएको छ कि छैन भनेर साझा गर्नुहोस्। आफ्नो समय लिनुहोस् र प्राकृतिक रूपमा बोल्नुहोस्।",
//     instructions: [
//       "आफ्नो शैक्षिक पृष्ठभूमि साझा गर्नुहोस्",
//       "तपाईं आफ्नो पेशामा कसरी आउनुभयो भन्नुहोस्",
//       "आफ्नो अनुभवका वर्षहरू उल्लेख गर्नुहोस्",
//       "अघिल्लो जागिरहरू वा भूमिकाहरूको बारेमा कुरा गर्नुहोस्",
//       "प्राकृतिक रूपमा बोल्नुहोस् - हामी सबै कुरा व्यवस्थित गर्नेछौं",
//     ],
//     startRecording: "रेकर्डिङ सुरु गर्नुहोस्",
//     stopRecording: "रेकर्डिङ बन्द गर्नुहोस्",
//     recording: "रेकर्डिङ भइरहेको छ...",
//     processing: "तपाईंको कथा प्रशोधन भइरहेको छ...",
//     silenceDetected: "हामीले याद गर्यौं कि तपाईंले रोक्नुभयो। कृपया आफ्नो अनुभवको बारेमा बोल्न जारी राख्नुहोस्।",
//     recordingComplete: "रेकर्डिङ पूरा भयो",
//     playback: "रेकर्डिङ सुन्नुहोस्",
//     reRecord: "फेरि रेकर्ड गर्नुहोस्",
//     continue: "रिज्यूमेमा जानुहोस्",
//   },
// }

// export function FreeFormRecording() {
//   const router = useRouter()
//   const [selectedLanguage, setSelectedLanguage] = useState("en")
//   const [selectedProfession, setSelectedProfession] = useState("")
//   const [isRecording, setIsRecording] = useState(false)
//   const [recordingComplete, setRecordingComplete] = useState(false)
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
//   const [isPlayingBack, setIsPlayingBack] = useState(false)
//   const [isAudioPromptPlaying, setIsAudioPromptPlaying] = useState(false)
//   const [isMuted, setIsMuted] = useState(false)
//   const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout | null>(null)
//   const [showSilencePrompt, setShowSilencePrompt] = useState(false)

//   const mediaRecorderRef = useRef<MediaRecorder | null>(null)
//   const audioChunksRef = useRef<Blob[]>([])
//   const audioContextRef = useRef<AudioContext | null>(null)
//   const analyserRef = useRef<AnalyserNode | null>(null)
//   const silenceDetectionRef = useRef<boolean>(false)

//   const content = recordingContent[selectedLanguage as keyof typeof recordingContent] || recordingContent.en

//   useEffect(() => {
//     // Get stored language and profession
//     const storedLanguage = localStorage.getItem("selectedLanguage") || "en"
//     const storedProfession = localStorage.getItem("selectedProfession") || ""
//     setSelectedLanguage(storedLanguage)
//     setSelectedProfession(storedProfession)

//     // Play initial audio prompt
//     if (!isMuted) {
//       playAudioPrompt()
//     }
//   }, [])

//   const playAudioPrompt = () => {
//     if (isMuted) return

//     setIsAudioPromptPlaying(true)

//     if ("speechSynthesis" in window) {
//       const utterance = new SpeechSynthesisUtterance(content.audioPrompt)

//       const speechLangMap: { [key: string]: string } = {
//         en: "en-US",
//         hi: "hi-IN",
//         bn: "bn-IN",
//         te: "te-IN",
//         ta: "ta-IN",
//         mr: "mr-IN",
//         gu: "gu-IN",
//         kn: "kn-IN",
//         ml: "ml-IN",
//         pa: "pa-IN",
//         or: "or-IN",
//         as: "as-IN",
//         ur: "ur-IN",
//         sa: "sa-IN", // Sanskrit
//         ne: "ne-NP", // Nepali
//       }

//       utterance.lang = speechLangMap[selectedLanguage] || "en-US"
//       utterance.rate = 0.8
//       utterance.pitch = 1

//       utterance.onend = () => setIsAudioPromptPlaying(false)
//       utterance.onerror = () => setIsAudioPromptPlaying(false)

//       speechSynthesis.speak(utterance)
//     } else {
//       setIsAudioPromptPlaying(false)
//     }
//   }

//   const playSilencePrompt = () => {
//     if (isMuted) return

//     if ("speechSynthesis" in window) {
//       const utterance = new SpeechSynthesisUtterance(content.silenceDetected)

//       const speechLangMap: { [key: string]: string } = {
//         en: "en-US",
//         hi: "hi-IN",
//         bn: "bn-IN",
//         te: "te-IN",
//         ta: "ta-IN",
//         mr: "mr-IN",
//         gu: "gu-IN",
//         kn: "kn-IN",
//         ml: "ml-IN",
//         pa: "pa-IN",
//         or: "or-IN",
//         as: "as-IN",
//         ur: "ur-IN",
//         sa: "sa-IN", // Sanskrit
//         ne: "ne-NP", // Nepali
//       }

//       utterance.lang = speechLangMap[selectedLanguage] || "en-US"
//       utterance.rate = 0.8
//       utterance.pitch = 1

//       speechSynthesis.speak(utterance)
//     }
//   }

//   const startSilenceDetection = (stream: MediaStream) => {
//     audioContextRef.current = new AudioContext()
//     analyserRef.current = audioContextRef.current.createAnalyser()
//     const source = audioContextRef.current.createMediaStreamSource(stream)
//     source.connect(analyserRef.current)

//     analyserRef.current.fftSize = 256
//     const bufferLength = analyserRef.current.frequencyBinCount
//     const dataArray = new Uint8Array(bufferLength)

//     let silenceStart = Date.now()
//     const silenceThreshold = 30 // Adjust this value to change sensitivity
//     const silenceTimeout = 18000 // 18 seconds

//     const checkAudioLevel = () => {
//       if (!silenceDetectionRef.current) return

//       analyserRef.current!.getByteFrequencyData(dataArray)
//       const average = dataArray.reduce((a, b) => a + b) / bufferLength

//       if (average < silenceThreshold) {
//         // Silence detected
//         if (Date.now() - silenceStart > silenceTimeout) {
//           setShowSilencePrompt(true)
//           playSilencePrompt()
//           silenceStart = Date.now() // Reset timer
//         }
//       } else {
//         // Sound detected
//         silenceStart = Date.now()
//         setShowSilencePrompt(false)
//       }

//       requestAnimationFrame(checkAudioLevel)
//     }

//     silenceDetectionRef.current = true
//     checkAudioLevel()
//   }

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

//       mediaRecorderRef.current = new MediaRecorder(stream)
//       audioChunksRef.current = []

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         audioChunksRef.current.push(event.data)
//       }

//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
//         setAudioBlob(audioBlob)
//         setRecordingComplete(true)
//         silenceDetectionRef.current = false

//         // Clean up audio context
//         if (audioContextRef.current) {
//           audioContextRef.current.close()
//         }
//       }

//       mediaRecorderRef.current.start()
//       setIsRecording(true)

//       // Start silence detection
//       startSilenceDetection(stream)
//     } catch (error) {
//       console.error("Error starting recording:", error)
//     }
//   }

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop()
//       setIsRecording(false)
//       silenceDetectionRef.current = false

//       // Stop all tracks
//       mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
//     }
//   }

//   const playRecording = () => {
//     if (audioBlob) {
//       const audio = new Audio(URL.createObjectURL(audioBlob))
//       setIsPlayingBack(true)

//       audio.onended = () => setIsPlayingBack(false)
//       audio.onerror = () => setIsPlayingBack(false)

//       audio.play()
//     }
//   }

//   const reRecord = () => {
//     setRecordingComplete(false)
//     setAudioBlob(null)
//     setShowSilencePrompt(false)
//   }

//   const processRecording = async () => {
//     if (!audioBlob) return

//     setIsProcessing(true)

//     try {
//       // Create FormData to send audio file
//       const formData = new FormData()
//       formData.append("audio", audioBlob, "recording.wav")
//       formData.append("language", selectedLanguage)
//       formData.append("profession", selectedProfession)

//       const response = await fetch("/api/process-freeform-audio", {
//         method: "POST",
//         body: formData,
//       })

//       if (response.ok) {
//         const result = await response.json()
//         // Store the processed resume data
//         localStorage.setItem("resumeData", JSON.stringify(result))
//         router.push("/resume-display")
//       } else {
//         console.error("Failed to process recording")
//       }
//     } catch (error) {
//       console.error("Error processing recording:", error)
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
//           <p className="text-lg text-gray-600">{content.subtitle}</p>
//         </div>

//         {/* Audio Controls */}
//         <div className="flex justify-center mb-6">
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={playAudioPrompt}
//               disabled={isAudioPromptPlaying}
//               className="flex items-center space-x-2 bg-transparent"
//             >
//               <Volume2 className="w-4 h-4" />
//               <span>Replay Instructions</span>
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setIsMuted(!isMuted)}
//               className="flex items-center space-x-2"
//             >
//               {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
//               <span>{isMuted ? "Unmute" : "Mute"}</span>
//             </Button>
//           </div>
//         </div>

//         {/* Instructions Card */}
//         <Card className="p-6 mb-8">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">What to share:</h3>
//           <ul className="space-y-2">
//             {content.instructions.map((instruction, index) => (
//               <li key={index} className="flex items-start space-x-3">
//                 <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
//                 <span className="text-gray-700">{instruction}</span>
//               </li>
//             ))}
//           </ul>
//         </Card>

//         {/* Recording Interface */}
//         <div className="text-center">
//           {!recordingComplete ? (
//             <div className="space-y-6">
//               {/* Recording Button */}
//               <div className="flex justify-center">
//                 <Button
//                   onClick={isRecording ? stopRecording : startRecording}
//                   size="lg"
//                   className={`w-32 h-32 rounded-full text-white font-semibold text-lg transition-all duration-300 ${
//                     isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-green-500 hover:bg-green-600"
//                   }`}
//                 >
//                   {isRecording ? (
//                     <div className="flex flex-col items-center space-y-2">
//                       <Square className="w-8 h-8" />
//                       <span className="text-sm">{content.stopRecording}</span>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center space-y-2">
//                       <Mic className="w-8 h-8" />
//                       <span className="text-sm">{content.startRecording}</span>
//                     </div>
//                   )}
//                 </Button>
//               </div>

//               {/* Recording Status */}
//               {isRecording && (
//                 <div className="text-center">
//                   <p className="text-lg font-medium text-red-600 animate-pulse">{content.recording}</p>
//                   {showSilencePrompt && (
//                     <p className="text-sm text-orange-600 mt-2 animate-bounce">{content.silenceDetected}</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {/* Recording Complete */}
//               <div className="text-center">
//                 <h3 className="text-xl font-semibold text-green-600 mb-4">{content.recordingComplete}</h3>

//                 {/* Playback Controls */}
//                 <div className="flex justify-center space-x-4 mb-6">
//                   <Button
//                     onClick={playRecording}
//                     disabled={isPlayingBack}
//                     variant="outline"
//                     className="flex items-center space-x-2 bg-transparent"
//                   >
//                     {isPlayingBack ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                     <span>{content.playback}</span>
//                   </Button>

//                   <Button onClick={reRecord} variant="outline" className="flex items-center space-x-2 bg-transparent">
//                     <RotateCcw className="w-4 h-4" />
//                     <span>{content.reRecord}</span>
//                   </Button>
//                 </div>

//                 {/* Continue Button */}
//                 <Button
//                   onClick={processRecording}
//                   disabled={isProcessing}
//                   size="lg"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
//                 >
//                   {isProcessing ? content.processing : content.continue}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
