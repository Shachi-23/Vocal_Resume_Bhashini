"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Mic, Play, Pause, MicOff, RotateCcw } from "lucide-react"

const recordingContent = {
  en: {
    title: "Tell Us About Yourself",
    subtitle: "Speak freely in your preferred language. We're here to listen to your story.",
    instructions: [
      "Share your background and where you're from",
      "Tell us about your education and skills",
      "Describe your work experience and journey",
      "Mention your age and any other details you'd like to share",
    ],
    startRecording: "Start Speaking",
    stopRecording: "Stop Recording",
    recording: "Recording...",
    paused: "Paused",
    encouragements: [
      "You're doing great! Tell us more about your experience.",
      "What about your education? We'd love to hear about it.",
      "Can you share more about your skills and abilities?",
      "Tell us about your work journey and what you've learned.",
      "What are you most proud of in your career?",
      "Share any other experiences that shaped who you are today.",
    ],
    silencePrompt: "We're still listening. Feel free to continue sharing your story.",
    completed: "Thank you for sharing your story!",
    playback: "Listen to Recording",
    restart: "Start Over",
    continue: "Continue to Next Step",
    backButton: "Back",
    whatToShare: "What to share:",
    tip: "Tip: Speak naturally and don't worry about pauses. We'll help guide you if needed.",
  },
  hi: {
    title: "अपने बारे में बताएं",
    subtitle: "अपनी पसंदीदा भाषा में खुलकर बोलें। हम आपकी कहानी सुनने के लिए यहाँ हैं।",
    instructions: [
      "अपनी पृष्ठभूमि और आप कहाँ से हैं, इसके बारे में बताएं",
      "अपनी शिक्षा और कौशल के बारे में बताएं",
      "अपने कार्य अनुभव और यात्रा का वर्णन करें",
      "अपनी उम्र और अन्य विवरण जो आप साझा करना चाहते हैं, बताएं",
    ],
    startRecording: "बोलना शुरू करें",
    stopRecording: "रिकॉर्डिंग बंद करें",
    recording: "रिकॉर्ड हो रहा है...",
    paused: "रुका हुआ",
    encouragements: [
      "आप बहुत अच्छा कर रहे हैं! अपने अनुभव के बारे में और बताएं।",
      "आपकी शिक्षा के बारे में क्या? हम इसके बारे में सुनना चाहेंगे।",
      "क्या आप अपने कौशल और क्षमताओं के बारे में और बता सकते हैं?",
      "अपनी कार्य यात्रा और आपने क्या सीखा है, इसके बारे में बताएं।",
      "अपने करियर में आपको किस बात पर सबसे ज्यादा गर्व है?",
      "कोई अन्य अनुभव साझा करें जिसने आपको आज जो आप हैं, बनाया है।",
    ],
    silencePrompt: "हम अभी भी सुन रहे हैं। अपनी कहानी साझा करना जारी रखें।",
    completed: "आपकी कहानी साझा करने के लिए धन्यवाद!",
    playback: "रिकॉर्डिंग सुनें",
    restart: "फिर से शुरू करें",
    continue: "अगले चरण पर जाएं",
    backButton: "वापस",
    whatToShare: "क्या साझा करें:",
    tip: "सुझाव: स्वाभाविक रूप से बोलें और रुकने की चिंता न करें। जरूरत पड़ने पर हम आपकी मदद करेंगे।",
  },
  bn: {
    title: "আপনার সম্পর্কে বলুন",
    subtitle: "আপনার পছন্দের ভাষায় স্বাধীনভাবে কথা বলুন। আমরা আপনার গল্প শোনার জন্য এখানে আছি।",
    instructions: [
      "আপনার পটভূমি এবং আপনি কোথা থেকে এসেছেন তা শেয়ার করুন",
      "আপনার শিক্ষা এবং দক্ষতা সম্পর্কে বলুন",
      "আপনার কাজের অভিজ্ঞতা এবং যাত্রা বর্ণনা করুন",
      "আপনার বয়স এবং অন্যান্য বিবরণ যা আপনি শেয়ার করতে চান তা উল্লেখ করুন",
    ],
    startRecording: "কথা বলা শুরু করুন",
    stopRecording: "রেকর্ডিং বন্ধ করুন",
    recording: "রেকর্ড হচ্ছে...",
    paused: "বিরতি",
    encouragements: [
      "আপনি দুর্দান্ত করছেন! আপনার অভিজ্ঞতা সম্পর্কে আরও বলুন।",
      "আপনার শিক্ষার বিষয়ে কী? আমরা এটি সম্পর্কে শুনতে চাই।",
      "আপনি কি আপনার দক্ষতা এবং ক্ষমতা সম্পর্কে আরও শেয়ার করতে পারেন?",
      "আপনার কাজের যাত্রা এবং আপনি যা শিখেছেন তা সম্পর্কে বলুন।",
      "আপনার ক্যারিয়ারে আপনি কিসের জন্য সবচেয়ে গর্বিত?",
      "অন্য কোনো অভিজ্ঞতা শেয়ার করুন যা আজকে আপনাকে তৈরি করেছে।",
    ],
    silencePrompt: "আমরা এখনও শুনছি। আপনার গল্প শেয়ার করা চালিয়ে যেতে দ্বিধা করবেন না।",
    completed: "আপনার গল্প শেয়ার করার জন্য ধন্যবাদ!",
    playback: "রেকর্ডিং শুনুন",
    restart: "আবার শুরু করুন",
    continue: "পরবর্তী ধাপে চালিয়ে যান",
    backButton: "পিছনে",
    whatToShare: "কী শেয়ার করবেন:",
    tip: "টিপ: স্বাভাবিকভাবে কথা বলুন এবং বিরতি নিয়ে চিন্তা করবেন না। প্রয়োজনে আমরা আপনাকে সাহায্য করব।",
  },
  te: {
    title: "మీ గురించి చెప్పండి",
    subtitle: "మీకు ఇష్టమైన భాషలో స్వేచ్ఛగా మాట్లాడండి. మీ కథను వినడానికి మేము ఇక్కడ ఉన్నాము.",
    instructions: [
      "మీ నేపథ్యం మరియు మీరు ఎక్కడ నుండి వచ్చారో చెప్పండి",
      "మీ విద్య మరియు నైపుణ్యాల గురించి చెప్పండి",
      "మీ పని అనుభవం మరియు ప్రయాణాన్ని వివరించండి",
      "మీ వయస్సు మరియు మీరు పంచుకోవాలని అనుకునే ఇతర వివరాలను పేర్కొనండి",
    ],
    startRecording: "మాట్లాడటం ప్రారంభించండి",
    stopRecording: "రికార్డింగ్ ఆపండి",
    recording: "రికార్డ్ అవుతోంది...",
    paused: "పాజ్ చేయబడింది",
    encouragements: [
      "మీరు చాలా బాగా చేస్తున్నారు! మీ అనుభవం గురించి మరింత చెప్పండి.",
      "మీ విద్య గురించి ఏమిటి? మేము దాని గురించి వినాలని అనుకుంటున్నాము.",
      "కీటి మీ నైపుణ్యాలు మరియు సామర్థ్యాల గురించి మరింత పంచుకోగలరా?",
      "మీ పని ప్రయాణాన్ని మరియు మీరు నేర్చుకున్న వాటి గురించి చెప్పండి.",
      "మీ కెరీర్‌లో మీరు దేనిపై అత్యంత గర్వపడుతున్నారు?",
      "ఈ రోజు మిమ్మల్ని తీర్చిదిద్దిన ఇతర అనుభవాలను పంచుకోండి.",
    ],
    silencePrompt: "మేము ఇంకా వింటున్నాము. మీ కథను పంచుకోవడం కొనసాగించడానికి సంకోచించకండి.",
    completed: "మీ కథను పంచుకున్నందుకు ధన్యవాదాలు!",
    playback: "రికార్డింగ్ వినండి",
    restart: "మళ్లీ ప్రారంభించండి",
    continue: "తదుపరి దశకు కొనసాగంచండి",
    backButton: "వెనుకకు",
    whatToShare: "ఏమి పంచుకోవాలి:",
    tip: "చిట్కా: సహజంగా మాట్లాడండి మరియు విరామాల గురించి ఆందోళన చెందకండి. అవసరమైతే మేము మీకు సహాయం చేస్తాము.",
  },
  mr: {
    title: "आपल्याबद्दल सांगा",
    subtitle: "आपल्या आवडत्या भाषेत मुक्तपणे बोला. आम्ही आपली कहाणी ऐकण्यासाठी येथे आहोत.",
    instructions: [
      "आपली पार्श्वभूमी आणि आपण कुठून आहात ते सांगा",
      "आपले शिक्षण आणि कौशल्ये सांगा",
      "आपला कामाचा अनुभव आणि प्रवास वर्णन करा",
      "आपले वय आणि इतर तपशील जे आपण सामायिक करू इच्छिता ते नमूद करा",
    ],
    startRecording: "बोलणे सुरू करा",
    stopRecording: "रेकॉर्डिंग थांबवा",
    recording: "रेकॉर्ड होत आहे...",
    paused: "थांबवले",
    encouragements: [
      "आपण खूप चांगले करत आहात! आपल्या अनुभवाबद्दल अधिक सांगा.",
      "आपल्या शिक्षणाबद्दल काय? आम्हाला त्याबद्दल ऐकायला आवडेल.",
      "आपण आपली कौशल्ये आणि क्षमता अधिक सामायिक करू शकता का?",
      "आपल्या कामाच्या प्रवासाबद्दल आणि आपण काय शिकलात ते सांगा.",
      "आपल्या करिअरमध्ये आपल्याला कशाचा सर्वात जास्त अभिमान आहे?",
      "आजच्या आपल्याला आकार देणारे इतर अनुभव सामायिक करा.",
    ],
    silencePrompt: "आम्ही अजूनही ऐकत आहोत. आपली कहाणी सामायिक करणे सुरू ठेवण्यास मोकळ्या मनाने करा.",
    completed: "आपली कहाणी सामायिक केल्याबद्दल धन्यवाद!",
    playback: "रेकॉर्डिंग ऐका",
    restart: "पुन्हा सुरू करा",
    continue: "पुढील पायरीवर जा",
    backButton: "मागे",
    whatToShare: "काय सामायिक करावे:",
    tip: "टीप: नैसर्गिकपणे बोला आणि विरामांची चिंता करू नका. गरज पडल्यास आम्ही आपली मदत करू.",
  },
  ta: {
    title: "உங்களைப் பற்றி சொல்லுங்கள்",
    subtitle: "உங்கள் விருப்பமான மொழியில் சுதந்திரமாக பேசுங்கள். உங்கள் கதையைக் கேட்க நாங்கள் இங்கே இருக்கிறோம்.",
    instructions: [
      "உங்கள் பின்னணி மற்றும் நீங்கள் எங்கிருந்து வருகிறீர்கள் என்பதைப் பகிருங்கள்",
      "உங்கள் கல்வி மற்றும் திறமைகளைப் பற்றி சொல்லுங்கள்",
      "உங்கள் பணி அనுபவம் மற்றும் பயணத்தை விவரிக்கவும்",
      "உங்கள் வயது மற்றும் நீங்கள் பகிர விரும்பும் பிற விவரங்களைக் குறிப்பிடுங்கள்",
    ],
    startRecording: "பேசத் தொடங்குங்கள்",
    stopRecording: "பதிவை நிறுத்துங்கள்",
    recording: "பதிவு செய்யப்படுகிறது...",
    paused: "இடைநிறுத்தப்பட்டது",
    encouragements: [
      "நீங்கள் நன்றாக செய்கிறீர்கள்! உங்கள் அனுபவத்தைப் பற்றி மேலும் சொல்லுங்கள்.",
      "உங்கள் கல்வியைப் பற்றி என்ன? அதைப் பற்றி கேட்க விரும்புகிறோம்.",
      "உங்கள் திறமைகள் மற்றும் திறன்களைப் பற்றி மேலும் பகிர முடியுமா?",
      "உங்கள் பணி பயணம் மற்றும் நீங்கள் கற்றுக்கொண்டவற்றைப் பற்றி சொல்லுங்கள்.",
      "உங்கள் தொழில் வாழ்க்கையில் நீங்கள் மிகவும் பெருமைப்படுவது எது?",
      "இன்று உங்களை வடிவமைத்த பிற அనுభவங்களைப் பகிருங்கள்.",
    ],
    silencePrompt: "நாங்கள் இன்னும் கேட்டுக்கொண்டிருக்கிறோம். உங்கள் கதையைப் பகிர்ந்து கொள்ள தயங்க வேண்டாம்.",
    completed: "உங்கள் கதையைப் பகிர்ந்ததற்கு நன்றி!",
    playback: "பதிவைக் கேளுங்கள்",
    restart: "மீண்டும் தொடங்குங்கள்",
    continue: "அடுத்த படிக்கு தொடரவும்",
    backButton: "பின்னால்",
    whatToShare: "என்ன பகிர வேண்டும்:",
    tip: "குறிப்பு: இயல்பாக பேசுங்கள், இடைநிறுத்தங்களைப் பற்றி கவலைப்பட வேண்டாம். தேவைப்பட்டால் நாங்கள் உங்களுக்கு உதவுவோம்.",
  },
  gu: {
    title: "તમારા વિશે કહો",
    subtitle: "તમારી પસંદગીની ભાષામાં મુક્તપણે બોલો. અમે તમારી વાર્તા સાંભળવા માટે અહીએ છીએ.",
    instructions: [
      "તમારી પૃષ્ઠભૂમિ અને તમે ક્યાંથી આવો છો તે શેર કરો",
      "તમારા શિક્ષણ અને કૌશલ્યો વિશે કહો",
      "તમારા કામના અનુભવ અને પ્રવાસનું વર્ણન કરો",
      "તમારી ઉંમર અને અન્ય વિગતો જે તમે શેર કરવા માંગો છો તેનો ઉલ્લેખ કરો",
    ],
    startRecording: "બોલવાનું શરૂ કરો",
    stopRecording: "રેકોર્ડિંગ બંધ કરો",
    recording: "રેકોર્ડ થઈ રહ્યું છે...",
    paused: "થોભાવ્યું",
    encouragements: [
      "તમે ખૂબ સારું કરી રહ્યા છો! તમારા અનુભવ વિશે વધુ કહો.",
      "તમારા શિક્ષણ વિશે શું? અમે તે વિશે સાંભળવા માંગીએ છીએ.",
      "શું તમે તમારા કૌશલ્યો અને ક્ષમતાઓ વિશે વધુ શેર કરી શકો છો?",
      "તમારા કામના પ્રવાસ અને તમે શું શીખ્યા તે વિશે કહો.",
      "તમારા કારકિર્દીમાં તમને સૌથી વધુ ગર્વ કેની વાત છે?",
      "આજે તમને બનાવ્યા છે આના અનુભવો શેર કરો.",
    ],
    silencePrompt: "અમે હજુ પણ સાંભળી રહ્યા છીએ. તમારી વાર્તા શેર કરવાનું ચાલુ રાખવામાં સંકોચ ન કરો.",
    completed: "તમારી વાર્તા શેર કરવા બદલ આભાર!",
    playback: "રેકૉર્ડિંગ સાંભળો",
    restart: "ફરીથી શરૂ કરો",
    continue: "આગલા પગલા પર આગળ વધો",
    backButton: "પાછળ",
    whatToShare: "કિ શેર કરવું:",
    tip: "ટિપছ: સ્વાભાવિક રીતે બોલો આને વિરામની ચિંતા ન કરો. પ્રયોજન હોય તો અમે તમારી મદદ કરીશું.",
  },
  kn: {
    title: "ನಿಮ್ಮ ಬಗ್ಗೆ ಹೇಳಿ",
    subtitle: "ನಿಮ್ಮ ಇಷ್ಟದ ಭಾಷೆಯಲ್ಲಿ ಮುಕ್ತವಾಗಿ ಮಾತನಾಡಿ. ನಿಮ್ಮ ಕಥೆಯನ್ನು ಕೇಳಲು ನಾವು ಇಲ್ಲಿದ್ದೇವೆ.",
    instructions: [
      "ನಿಮ್ಮ ಹಿನ್ನೆಲೆ ಮತ್ತು ನೀವು ಎಲ್ಲಿಂದ ಬಂದಿದ್ದೀರಿ ಎಂಬುದನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
      "ನಿಮ್ಮ ಶಿಕ್ಷಣ ಮತ್ತು ಕೌಶಲ್ಯಗಳ ಬಗ್ಗೆ ಹೇಳಿ",
      "ನಿಮ್ಮ ಕೆಲಸದ ಅನುಭವ ಮತ್ತು ಪ್ರಯಾಣವನ್ನು ವಿವರಿಸಿ",
      "ನಿಮ್ಮ ವಯಸ್ಸು ಮತ್ತು ನೀವು ಹಂಚಿಕೊಳ್ಳಲು ಬಯಸುವ ಇತರ ವಿವರಗಳನ್ನು ಉಲ್ಲೇಖಿಸಿ",
    ],
    startRecording: "ಮಾತನಾಡಲು ಪ್ರಾರಂಭಿಸಿ",
    stopRecording: "ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ",
    recording: "ರೆಕಾರ್ಡ್ ಆಗುತ್ತಿದೆ...",
    paused: "ವಿರಾಮಗೊಳಿಸಲಾಗಿದೆ",
    encouragements: [
      "ನೀವು ಚೆನ್ನಾಗಿ ಮಾಡುತ್ತಿದ್ದೀರಿ! ನಿಮ್ಮ ಅನುಭವದ ಬಗ್ಗೆ ಹೆಚ್ಚು ಹೇಳಿ.",
      "ನಿಮ್ಮ ಶಿಕ್ಷಣದ ಬಗ್ಗೆ ಏನು? ಅದರ ಬಗ್ಗೆ ಕೇಡಲು ನಾವು ಇষ್ಟಪಡುತ್ತೇವೆ.",
      "ನಿಮ್ಮ ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಸಾಮರ್ಥ್ಯಗಳ ಬಗ್ಗೆ ಹೆಚ್ಚು ಹಂಚಿಕೊಳ್ಳಬಹುದೇ?",
      "ನಿಮ್ಮ ಕೆಲಸದ ಪ್ರಯಾಣ ಮತ್ತು ನೀವು ಕಲಿತದ್ದರ ಬಗ್ಗೆ ಹೇಳಿ.",
      "ನಿಮ್ಮ ವೃತ್ತಿಜೀವನದಲ್ಲಿ ನೀವು ಹೆಚ್ಚು ಹೆಮ್ಮೆಪಡುವುದು ಯಾವುದು?",
      "ಇಂದು ನಿಮ್ಮನ್ನು ರೂಪಿಸಿದ ಇತರ ಅನುಭವಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
    ],
    silencePrompt: "ನಾವು ಇನ್ನೂ ಕೇಳುತ್ತಿದ್ದೇವೆ. ನಿಮ್ಮ ಕಥೆಯನ್ನು ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು!",
    completed: "ನಿಮ್ಮ ಕಥೆಯನ್ನು ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು!",
    playback: "ರೆಕಾರ್ಡಿಂಗ್ ಕೇಳಿ",
    restart: "ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ",
    continue: "ಮುಂದಿನ ಹಂತಕ್ಕೆ ಮುಂದುವರಿಯಿರಿ",
    backButton: "ಹಿಂದೆ",
    whatToShare: "ಏನನ್ನು ಹಂಚಿಕೊಳ್ಳಬೇಕು:",
    tip: "ಸಲಹೆ: ಸ್ವಾಭಾವಿಕವಾಗಿ ಮಾತನಾಡಿ ಮತ್ತು ವಿರಾಮಗಳ ಬಗ್ಗೆ ಚಿಂತಿಸಬೇಡಿ. ಅಗತ್ಯವಿದ್ದರೆ ನಾವು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",
  },
  ml: {
    title: "നിങ്ങളെക്കുറിച്ച് പറയൂ",
    subtitle: "നിങ്ങളുടെ ഇഷ്ടഭാഷയിൽ സ്വതന്ത്രമായി സംസാരിക്കൂ. നിങ്ങളുടെ കഥ കേൾക്കാൻ ഞങ്ങൾ ഇവിടെയുണ്ട്.",
    instructions: [
      "നിങ്ങളുടെ പശ്ചാത്തലവും നിങ്ങൾ എവിടെ നിന്നാണെന്നും പങ്കിടൂ",
      "നിങ്ങളുടെ വിദ്യാഭ്യാസത്തെയും കഴിവുകളെയും കുറിച്ച് പറയൂ",
      "നിങ്ങളുടെ ജോലി അനുഭവവും യാത്രയും വിവരിക്കൂ",
      "നിങ്ങളുടെ പ്രായവും നിങ്ങൾ പങ്കിടാൻ ആഗ്രഹിക്കുന്ന മറ്റ് വിശദാംശങ്ങളും പരാമർശിക്കൂ",
    ],
    startRecording: "സംസാരിക്കാൻ തുടങ്ങൂ",
    stopRecording: "റെക്കോർഡിംഗ് നിർത്തൂ",
    recording: "റെക്കോർഡ് ചെയ്യുന്നു...",
    paused: "താൽക്കാലികമായി നിർത്തി",
    encouragements: [
      "നിങ്ങൾ നന്നായി ചെയ്യുന്നു! നിങ്ങളുടെ അനുഭവത്തെക്കുറിച്ച് കൂടുതൽ പറയൂ.",
      "നിങ്ങളുടെ വിദ്യാഭ്യാസത്തെക്കുറിച്ച് എന്താണ്? അതിനെക്കുറിച്ച് കേൾക്കാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു.",
      "നിങ്ങൾ ആപ്പെ കഴിവുകളെയും കഴിവുകളെയും കുറിച്ച് കൂടുതൽ പങ്കിടാമോ?",
      "നിങ്ങളുടെ ജോലി യാത്രയെയും നിങ്ങൾ പഠിച്ചതിനെയും കുറിച്ച് പറയൂ.",
      "നിങ്ങളുടെ കരിയറിൽ നിങ്ങൾ ഏറ്റവും അഭിമാനിക്കുന്നത് എന്താണ്?",
      "ഇന്ന് നിങ്ങളെ രൂപപ്പെടുത്തിയ മറ്റ് അനുഭവങ്ങൾ പങ്കിടൂ.",
    ],
    silencePrompt: "ഞങ്ങൾ ഇപ്പോഴും കേൾക്കുന്നു. നിങ്ങളുടെ കഥ പങ്കിട്ടത് തുടരാൻ മടിക്കരുത്.",
    completed: "നിങ്ങളുടെ കഥ പങ്കിട്ടതിന് നന്ദി!",
    playback: "റെക്കോർഡിംഗ് കേൾക്കൂ",
    restart: "വീണ്ടും ആരംഭിക്കൂ",
    continue: "അടുത്ത ഘട്ടത്തിലേക്ക് തുടരൂ",
    backButton: "പിന്നിലേക്ക്",
    whatToShare: "എന്ത് പങ്കിടണം:",
    tip: "നുറുങ്ങ്: സ്വാഭാവികമായി സംസാരിക്കൂ, ഇടവേളകളെക്കുറിച്ച് വിഷമിക്കരുത്. ആവശ്യമെങ്കിൽ ഞങ്ങൾ നിങ്ങളെ സഹായിക്കും.",
  },
  pa: {
    title: "ਆਪਣੇ ਬਾਰੇ ਦੱਸੋ",
    subtitle: "ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਵਿੱਚ ਖੁੱਲ੍ਹ ਕੇ ਬੋਲੋ। ਅਸੀਂ ਤੁਹਾਡੀ ਕਹਾਣੀ ਸੁਣਨ ਲਈ ਇੱਥੇ ਹਾਂ।",
    instructions: [
      "ਆਪਣਾ ਪਿਛੋਕੜ ਅਤੇ ਤੁਸੀਂ ਕਿੱਥੋਂ ਹੋ ਸਾਂਝਾ ਕਰੋ",
      "ਆਪਣੀ ਸਿੱਖਿਆ ਅਤੇ ਹੁਨਰਾਂ ਬਾਰੇ ਦੱਸੋ",
      "ਆਪਣੇ ਕੰਮ ਦੇ ਤਜਰਬੇ ਅਤੇ ਸਫ਼ਰ ਦਾ ਵਰਣਨ ਕਰੋ",
      "ਆਪਣੀ ਉਮਰ ਅਤੇ ਹੋਰ ਵੇਰਵੇ ਜੋ ਤੁਸੀਂ ਸਾਂਝੇ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ ਦਾ ਜ਼ਿਕਰ ਕਰੋ",
    ],
    startRecording: "ਬੋਲਣਾ ਸ਼ੁਰੂ ਕਰੋ",
    stopRecording: "ਰਿਕਾਰਡਿੰਗ ਬੰਦ ਕਰੋ",
    recording: "ਰਿਕਾਰਡ ਹੋ ਰਿਹਾ ਹੈ...",
    paused: "ਰੋਕਿਆ ਗਿਆ",
    encouragements: [
      "ਤੁਸੀਂ ਬਹੁਤ ਵਧੀਆ ਕਰ ਰਹੇ ਹੋ! ਆਪਣੇ ਤਜਰਬੇ ਬਾਰੇ ਹੋਰ ਦੱਸੋ।",
      "ਤੁਹਾਡੀ ਸਿੱਖਿਆ ਬਾਰੇ ਕੀ? ਅਸੀਂ ਇਸ ਬਾਰੇ ਸੁਣਨਾ ਚਾਹਾਂਗੇ।",
      "ਕੀ ਤੁਸੀਂ ਆਪਣੇ ਹੁਨਰਾਂ ਅਤੇ ਯੋਗਤਾਵਾਂ ਬਾਰੇ ਹੋਰ ਸਾਂਝਾ ਕਰ ਸਕਦੇ ਹੋ?",
      "ਆਪਣੇ ਕੰਮ ਦੇ ਸਫ਼ਰ ਅਤੇ ਤੁਸੀਂ ਜੋ ਸਿੱਖਿਆ ਹੈ ਉਸ ਬਾਰੇ ਦੱਸੋ।",
      "ਆਪਣੇ ਕਰੀਅਰ ਵਿੱਚ ਤੁਹਾਨੂੰ ਸਭ ਤੋਂ ਜ਼ਿਆਦਾ ਮਾਣ ਕਿਸ ਗੱਲ ਦਾ ਹੈ?",
      "ਹੋਰ ਤਜਰਬੇ ਸਾਂਝੇ ਕਰੋ ਜਿਨ੍ਹਾਂ ਨੇ ਅੱਜ ਤੁਹਾਨੂੰ ਬਣਾਇਆ ਹੈ।",
    ],
    silencePrompt: "ਅਸੀਂ ਅਜੇ ਵੀ ਸੁਣ ਰਹੇ ਹਾਂ। ਆਪਣੀ ਕਹਾਣੀ ਸਾਂਝੀ ਕਰਨਾ ਜਾਰੀ ਰੱਖਣ ਵਿੱਚ ਝਿਜਕ ਨਾ ਕਰੋ।",
    completed: "ਆਪਣੀ ਕਹਾਣੀ ਸਾਂਝੀ ਕਰਨ ਲਈ ਧੰਨਵਾਦ!",
    playback: "ਰਿਕਾਰਡਿੰਗ ਸੁਣੋ",
    restart: "ਦੁਬਾਰਾ ਸ਼ੁਰੂ ਕਰੋ",
    continue: "ਅਗਲੇ ਕਦਮ 'ਤੇ ਜਾਰੀ ਰੱਖੋ",
    backButton: "ਵਾਪਸ",
    whatToShare: "ਕੀ ਸਾਂਝਾ ਕਰਨਾ ਹੈ:",
    tip: "ਸੁਝਾਅ: ਕੁਦਰਤੀ ਤੌਰ 'ਤੇ ਬੋਲੋ ਅਤੇ ਰੁਕਣ ਦੀ ਚਿੰਤਾ ਨਾ ਕਰੋ। ਲੋੜ ਪੈਣ 'ਤੇ ਅਸੀਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰਾਂਗੇ।",
  },
  or: {
    title: "ଆପଣଙ୍କ ବିଷୟରେ କୁହନ୍ତୁ",
    subtitle: "ଆପଣଙ୍କ ପସନ୍ଦର ଭାଷାରେ ମୁକ୍ତଭାବେ କୁହନ୍ତୁ। ଆମେ ଆପଣଙ୍କ କାହାଣୀ ଶୁଣିବା ପାଇଁ ଏଠାରେ ଅଛୁ।",
    instructions: [
      "ଆପଣଙ୍କ ପୃଷ୍ଠଭୂମି ଏବଂ ଆପଣ କେଉଁଠାରୁ ଆସିଛନ୍ତି ତାହା ସେୟାର କରନ୍ତୁ",
      "ଆପଣଙ୍କ ଶିକ୍ଷା ଏବଂ କୌଶଳ ବିଷୟରେ କୁହନ୍ତୁ",
      "ଆପଣଙ୍କ କାର୍ଯ୍ୟ ଅଭିଜ୍ଞତା ଏବং ଯାତ୍ରାର ବର୍ଣ୍ଣନା କରନ୍ତୁ",
      "ଆପଣଙ୍କ ବୟସ ଏବଂ ଅନ୍ୟାନ୍ୟ ବିବରଣୀ ଯାହା ଆପଣ ସେୟାର କରିବାକୁ ଚାହାଁନ୍ତି ତାହା ଉଲ୍ଲେଖ କରନ୍ତୁ",
    ],
    startRecording: "କହିବା ଆରମ୍ଭ କରନ୍ତୁ",
    stopRecording: "ରେକର୍ଡିଂ ବନ୍ଦ କରନ୍ତୁ",
    recording: "ରେକର୍ଡ ହେଉଛି...",
    paused: "ବିରତ",
    encouragements: [
      "ଆପଣ ବହୁତ ଭଲ କରୁଛନ୍ତି! ଆପଣଙ୍କ ଅଭିଜ୍ଞତା ବିଷୟରେ ଅଧିକ କୁହନ୍ତୁ।",
      "ଆପଣଙ୍କ ଶିକ୍ଷା ବିଷୟରେ କଣ? ଆମେ ଏହା ବିଷୟରେ ଶୁଣିବାକୁ ଚାହିଁବୁ।",
      "ଆପଣ ଆପଣଙ୍କ କୌଶଳ ଏବଂ ସାମର୍ଥ୍ୟ ବିଷୟରେ ଅଧିକ ସେୟାର କରିାରିବେ କି?",
      "ଆପଣଙ୍କ କାର୍ଯ୍ୟ ଯାତ୍ରା ଏବং ଆପଣ ଯାହା ଶିଖିଛନ୍ତି ତାହା ବିଷୟରେ କୁହନ୍ତୁ।",
      "ଆପଣଙ୍କ କ୍ୟାରିୟରରେ ଆପଣ କଣ ପାଇଁ ସବୁଠାରୁ ଗର୍ବିତ?",
      "ଅନ୍ୟାନ୍ୟ ଅଭିଜ୍ଞତା ସେୟାର କରନ୍ତୁ ଯାହା ଆଜି ଆପଣଙ୍କୁ ଗଢ଼ିଛି।",
    ],
    silencePrompt: "ଆମେ ଏପର୍ଯ୍ୟନ୍ତ ଶୁଣୁଛୁ। ଆପଣଙ୍କ କାହାଣୀ ସେୟାର କରିବା ଜାରି ରଖିବାକୁ ଦ୍ୱିଧା କରନ୍ତୁ ନାହିଁ।",
    completed: "ଆପଣଙ୍କ କାହାଣୀ ସେୟାର କରିଥିବାରୁ ଧନ୍ୟବାଦ!",
    playback: "ରେକର୍ଡିଂ ଶୁଣନ୍ତୁ",
    restart: "ପୁନର୍ବାର ଆରମ୍ଭ କରନ୍ତୁ",
    continue: "ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପକୁ ଚାଲନ୍ତୁ",
    backButton: "ପଛକୁ",
    whatToShare: "କଣ ସେୟାର କରିବେ:",
    tip: "ଟିପ୍ସ: ସ୍ୱାଭାବିକ ଭାବରେ କୁହନ୍ତୁ ଏବଂ ବିରତି ନେଇ ଚିନ୍ତା କରନ୍ତୁ ନାହିଁ। ଆବଶ୍ୟକ ହେଲେ ଆମେ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିବୁ।",
  },
  ur: {
    title: "اپنے بارے میں بتائیں",
    subtitle: "اپنی پسندیدہ زبان میں آزادانہ طور پر بولیں۔ ہم آپ کی کہانی سننے کے لیے یہاں ہیں۔",
    instructions: [
      "اپنا پس منظر اور آپ کہاں سے ہیں اس کا اشتراک کریں",
      "اپنی تعلیم اور مہارتوں کے بارے میں بتائیں",
      "اپنے کام کے تجربے اور سفر کی وضاحت کریں",
      "اپنی عمر اور دیگر تفصیلات جو آپ شیئر کرنا چاہتے ہیں کا ذکر کریں",
    ],
    startRecording: "بولنا شروع کریں",
    stopRecording: "ریکارڈنگ بند کریں",
    recording: "ریکارڈ ہو رہا ہے...",
    paused: "رک گیا",
    encouragements: [
      "آپ بہت اچھا کر رہے ہیں! اپنے تجربے کے بارے میں مزید بتائیں۔",
      "آپ کی تعلیم کے بارے میں کیا؟ ہم اس کے بارے میں سننا چاہیں گے۔",
      "کیا آپ اپنی مہارتوں اور صلاحیات کے بارے میں مزید شیئر کر سکتے ہیں؟",
      "اپنے کام کے سفر اور آپ نے جو کچھ سیکھا ہے اس کے بارے میں بتائیں۔",
      "اپنے کیریئر میں آپ کو کس بات پر سب سے زیادہ فخر ہے؟",
      "دیگر تجربات شیئر کریں جنہوں نے آج آپ کو بنایا ہے۔",
    ],
    silencePrompt: "ہم اب بھی سن رہے ہیں۔ اپنی کہانی شیئر کرنا جاری رکھنے میں ہچکچاہٹ محسوس نہ کریں۔",
    completed: "آپ کی کہانی شیئر کرنے کے لیے شکریہ!",
    playback: "ریکارڈنگ سنیں",
    restart: "دوبارہ شروع کریں",
    continue: "اگلے قدم پر جاری رکھیں",
    backButton: "واپس",
    whatToShare: "کیا شیئر کرنا ہے:",
    tip: "توجویز: فطری طور پر بولیں اور وقفوں کی فکر نہ کریں۔ ضرورت پڑنے پر ہم آپ کی مدد کریں گے۔",
  },
  sa: {
    title: "आत्मविषये कथयतु",
    subtitle: "स्वप्रियभाषायां स्वतन्त्रतया वदतु। वयं भवतः कथां श्रोतुम् अत्र स्थिताः।",
    instructions: [
      "स्वपृष्ठभूमिं च कुतः आगतः इति साझां करोतु",
      "स्वशिक्षा कौशलानि च कथयतु",
      "स्वकार्यानुभवं यात्रां च वर्णयतु",
      "स्ववಯसं अन्यविवरणानि च यानि साझां कर्तुम् इच्छति तानि उल्लिखतु",
    ],
    startRecording: "वक्तुम् आરभताम्",
    stopRecording: "अभिलेखनं स्थगयतु",
    recording: "अभिलेखनं भवति...",
    paused: "विरामितम्",
    encouragements: [
      "भवान् उत्तमं करोति! स्वानुभवे अधिकं कथयतु।",
      "भवतः शिक्षाविषये किम्? वयं तत् श्रोतुम् इच्छामः।",
      "भवान् स्वकौशलानि सामर्थ्यानि च अधिकं साझां कर्तुं शक्नोति किम्?",
      "स्वकार्ययात्रां यत् शिकषितवान् तत् च कथयतु।",
      "स्वव्यवसाये कस्मिन् विषये सर्वाधिकं गर्वं करोति?",
      "अन्यानुभवान् साझां करोतु याः अद्य भवन्तं निर्मितवन्ति।",
    ],
    silencePrompt: "वयम् अद्यापि शृण्वमः। स्वकथां साझां कर्तुं संकोचं न करोतु।",
    completed: "स्वकथां साझां कृतवान् इति धन्यवादः!",
    playback: "अभिलेखनं शृणोतु",
    restart: "पुनः आरभताम्",
    continue: "अग्रिमे पदे गच्छतु",
    backButton: "पश्चात्",
    whatToShare: "किं साझां करणीयम्:",
    tip: "सूचना: सहजतया वदतु विरामविषये चिन्तां न करोतु। आवश्यकतायां वयं साहाय्यं करिष्यामः।",
  },
  ne: {
    title: "आफ्नो बारेमा भन्नुहोस्",
    subtitle: "आफ्नो मनपर्ने भाषामा स्वतन्त्र रूपमा बोल्नुहोस्। हामी तपाईंको कथा सुन्न यहाँ छौं।",
    instructions: [
      "आफ्नो पृष्ठभूमि र तपाईं कहाँबाट आउनुभएको छ त्यो साझा गर्नुहोस्",
      "आफ्नो शिक्षा र सीपहरूको ब���रेमा भन्नुहोस्",
      "आफ्नो कामको अनुभव र यात्राको वर्णन गर्नुहोस्",
      "आफ्नो उमेर र अन्य विवरणहरू जुन तपाईं साझा गर्न चाहनुहुन्छ उल्लेख गर्नुहोस्",
    ],
    startRecording: "बोल्न सुरु गर्नुहोस्",
    stopRecording: "रेकर्डिङ बन्ध गर्नुहोस्",
    recording: "रेकर्ड भइरहेको छ...",
    paused: "रोकिएको",
    encouragements: [
      "तपाईं धेरै राम्रो गरिरहनुभएको छ! आफ्नो अनुभवको बारेमा थप भन्नुहोस्।",
      "तपाईंको शिक्षाको बारेमा के छ? हामी त्यसको बारेमा सुन्न चाहन्छौं।",
      "के तपाईं आफ्ना सीपहरू र क्षमताहरूको बारेमा थप साझा गर्न सक्नुहुन्छ?",
      "आफ्नो कामको यात्रा र तपाईंले के सिक्नुभएको छ त्यसको बारेमा भन्नुहोस्।",
      "आफ्नो करियरमा तपाईं के कुरामा सबैभन्दा गर्व गर्नुहुन्छ?",
      "आजको तपाईंलाई आकार दिने अन्य अनुभवहरू साझा गर्नुहोस्।",
    ],
    silencePrompt: "हामी अझै सुनिरहेका छौं। आफ्नो कथा साझा गर्न जारी राख्न नहिचकिचाउनुहोस्।",
    completed: "तपाईंको कथा साझा गर्नुभएकोमा धन्यवाद!",
    playback: "रेकर्डिङ सुन्नुहोस्",
    restart: "फेरि सुरु गर्नुहोस्",
    continue: "अर्को चरणमा जारी राख्नुहोस्",
    backButton: "पछाडि",
    whatToShare: "के साझा गर्ने:",
    tip: "सुझाव: प्राकृतिक रूपमा बोल्नुहोस् र विरामको चिन्ता नगर्नुहोस्। आवश्यक परेमा हामी तपाईंलाई मद्दत गर्नेछौं।",
  },
  as: {
    title: "আপোনাৰ বিষয়ে কওক",
    subtitle: "আপোনাৰ পছন্দৰ ভাষাত মুক্তভাৱে কথা কওক। আমি আপোনাৰ কাহিনী শুনিবলৈ ইয়াত আছোঁ।",
    instructions: [
      "আপোনাৰ পটভূমি আৰু আপুনি ক'ৰ পৰা আহিছে সেয়া শ্বেয়াৰ কৰক",
      "আপোনাৰ শিক্ষা আৰু দক্ষতাৰ বিষয়ে কওক",
      "আপোনাৰ কামৰ অভিজ্ঞতা আৰু যাত্ৰাৰ বৰ্ণনা কৰক",
      "আপোনাৰ বয়স আৰু আন বিৱৰণ যিবোৰ আপুনি শ্বেয়াৰ কৰিব বিচাৰে সেইবোৰ উল্লেখ কৰক",
    ],
    startRecording: "কথা কোৱা আৰম্ভ কৰক",
    stopRecording: "ৰেকৰ্ডিং বন্ধ কৰক",
    recording: "ৰেকৰ্ড হৈ আছে...",
    paused: "বিৰতি",
    encouragements: [
      "আপুনি বহুত ভাল কৰি আছে! আপোনাৰ অভিজ্ঞতাৰ বিষয়ে অধিক কওক।",
      "আপোনাৰ শিক্ষাৰ বিষয়ে কি? আমি সেয়া শুনিব বিচাৰোঁ।",
      "আপুনি আপোনাৰ দক্ষতা আৰু সামৰ্থ্যৰ বিষয়ে অধিক শ্বেয়াৰ কৰিব পাৰিবনে?",
      "আপোনাৰ কামৰ যাত্ৰা আৰু আপুনি কি শিকিছে সেয়া কওক।",
      "আপোনাৰ কেৰিয়াৰত আপুনি কিহৰ বাবে সৰ্বাধিক গৰ্ব কৰে?",
      "আজি আপোনাক গঢ় দিয়া আন অভিজ্ঞতাবোৰ শ্বেয়াৰ কৰক।",
    ],
    silencePrompt: "আমি এতিয়াও শুনি আছোঁ। আপোনাৰ কাহিনী শ্বেয়াৰ কৰা অব্যাহত ৰাখিবলৈ দ্বিধা নকৰিব।",
    completed: "আপোনাৰ কাহিনী শ্বেয়াৰ কৰাৰ বাবে ধন্যবাদ!",
    playback: "ৰেকৰ্ডিং শুনক",
    restart: "আকৌ আৰম্ভ করক",
    continue: "পৰৱৰ্তী পদক্ষেপলৈ আগবাঢ়ক",
    backButton: "পিছলৈ",
    whatToShare: "কি শ্বেয়াৰ কৰিব:",
    tip: "টিপছ: স্বাভাৱিকভাৱে কথা কওক আৰু বিৰতিৰ বিষয়ে চিন্তা নকৰিব। প্ৰয়োজন হ'লে আমি আপোনাক সহায় কৰিম।",
  },
}

export default function FreeFormRecordingPage() {
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [silenceTime, setSilenceTime] = useState(0)
  const [currentEncouragement, setCurrentEncouragement] = useState(0)
  const [showEncouragement, setShowEncouragement] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const content = recordingContent[selectedLanguage as keyof typeof recordingContent] || recordingContent.en

  const speechLangMap: { [key: string]: string } = {
    en: "en-US",
    hi: "hi-IN",
    bn: "bn-IN",
    te: "te-IN",
    ta: "ta-IN",
    mr: "mr-IN",
    gu: "gu-IN",
    kn: "kn-IN",
    ml: "ml-IN",
    pa: "pa-IN",
    or: "or-IN",
    as: "as-IN",
    ur: "ur-IN",
  }

  const speakText = (text: string, rate = 0.8) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = speechLangMap[selectedLanguage] || "en-US"
      utterance.rate = rate
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en"
    setSelectedLanguage(savedLanguage)

    setTimeout(() => {
      speakText(`${content.title}. ${content.subtitle}`)
    }, 1000)

    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current)
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current)
      if (audioContextRef.current) audioContextRef.current.close()
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel()
      }
    }
  }, [selectedLanguage])

  const speakInstructions = () => {
    const instructionsText = `${content.whatToShare} ${content.instructions.join(". ")}`
    speakText(instructionsText)
  }

  const detectSilence = () => {
    if (!analyserRef.current) return

    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const checkAudio = () => {
      if (!isRecording || isPaused) return

      analyserRef.current!.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((a, b) => a + b) / bufferLength

      if (average < 10) {
        setSilenceTime((prev) => prev + 1)

        if (silenceTime >= 15 && !showEncouragement) {
          showEncouragementMessage()
        }
      } else {
        setSilenceTime(0)
        setShowEncouragement(false)
      }

      setTimeout(checkAudio, 1000)
    }

    checkAudio()
  }

  const showEncouragementMessage = () => {
    setShowEncouragement(true)

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        content.encouragements[currentEncouragement] || content.silencePrompt,
      )
      utterance.lang = speechLangMap[selectedLanguage] || "en-US"
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }

    setCurrentEncouragement((prev) => (prev + 1) % content.encouragements.length)
    setTimeout(() => setShowEncouragement(false), 5000)
  }

  const startRecording = async () => {
    try {
      speakText(content.startRecording)

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      audioContextRef.current = new AudioContext()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
      source.connect(analyserRef.current)

      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        setAudioBlob(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
        speakText(content.completed)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setIsPaused(false)

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      detectSilence()
    } catch (error) {
      console.error("Error starting recording:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)

      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current)
      }
    }
  }

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume()
        setIsPaused(false)
        detectSilence()
      } else {
        mediaRecorderRef.current.pause()
        setIsPaused(true)
      }
    }
  }

  const playRecording = () => {
    if (audioBlob && !isPlaying) {
      const audioUrl = URL.createObjectURL(audioBlob)
      audioRef.current = new Audio(audioUrl)
      audioRef.current.play()
      setIsPlaying(true)

      audioRef.current.onended = () => {
        setIsPlaying(false)
        URL.revokeObjectURL(audioUrl)
      }
    } else if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const restartRecording = () => {
    setRecordingTime(0)
    setSilenceTime(0)
    setAudioBlob(null)
    setShowEncouragement(false)
    setCurrentEncouragement(0)
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
    speakText(content.restart)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{content.backButton}</span>
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
            <p className="text-gray-600 mt-2">{content.subtitle}</p>
          </div>
          <div className="w-20"></div>
        </div>

        {/* Instructions Card - Made clickable for audio */}
        <Card
          className="p-6 mb-8 bg-white border-2 border-gray-200 cursor-pointer hover:border-blue-300 transition-colors"
          onClick={speakInstructions}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{content.whatToShare}</h2>
            <div className="text-blue-500 text-sm flex items-center space-x-1">
              <span>🔊</span>
              <span>Click to hear</span>
            </div>
          </div>
          <ul className="space-y-3">
            {content.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 text-lg">{instruction}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recording Interface */}
        <Card className="p-8 bg-white border-2 border-gray-200">
          <div className="text-center">
            <div className="mb-6">
              {isRecording && (
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-lg font-medium">{isPaused ? content.paused : content.recording}</span>
                  <span className="text-lg font-mono">{formatTime(recordingTime)}</span>
                </div>
              )}
            </div>

            {showEncouragement && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 font-medium text-lg">
                  {content.encouragements[currentEncouragement] || content.silencePrompt}
                </p>
              </div>
            )}

            <div className="flex justify-center space-x-8 mb-8">
              {!isRecording && !audioBlob && (
                <Button
                  onClick={startRecording}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl h-auto"
                >
                  <Mic className="w-6 h-6 mr-3" />
                  {content.startRecording}
                </Button>
              )}

              {isRecording && (
                <>
                  <Button
                    onClick={pauseRecording}
                    size="lg"
                    variant="outline"
                    className="px-10 py-6 h-auto border-2 text-lg bg-transparent"
                  >
                    {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                  </Button>

                  <Button
                    onClick={stopRecording}
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white px-10 py-6 h-auto text-lg"
                  >
                    <MicOff className="w-6 h-6 mr-3" />
                    {content.stopRecording}
                  </Button>
                </>
              )}
            </div>

            {audioBlob && (
              <div className="space-y-6">
                <p className="text-xl font-medium text-gray-800 mb-6">{content.completed}</p>

                <div className="flex justify-center space-x-8">
                  <Button
                    onClick={playRecording}
                    variant="outline"
                    size="lg"
                    className="px-10 py-4 h-auto border-2 text-lg bg-transparent"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                    {content.playback}
                  </Button>

                  <Button
                    onClick={restartRecording}
                    variant="outline"
                    size="lg"
                    className="px-10 py-4 h-auto border-2 text-lg bg-transparent"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    {content.restart}
                  </Button>

                  <Button
                    onClick={() => {
                      speakText(content.continue)
                      console.log("Processing audio and moving to next step")
                    }}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 h-auto text-lg"
                  >
                    {content.continue}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Card
            className="p-4 bg-blue-50 border border-blue-200 cursor-pointer hover:border-blue-400 transition-colors"
            onClick={() => speakText(content.tip)}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>💡</span>
              <p className="text-blue-800 text-lg">{content.tip}</p>
              <span className="text-blue-500 text-sm">🔊</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
