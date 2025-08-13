"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Mic, MessageSquare, Volume2 } from "lucide-react"

interface ModeSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onModeSelect: (mode: "guided" | "freeform") => void
  selectedLanguage: string
}

// Mode descriptions in different languages
const modeContent = {
  en: {
    title: "Choose Your Resume Creation Mode",
    subtitle: "How would you like to create your resume?",
    guided: {
      title: "Guided Mode",
      description: "We'll ask you questions one by one to help build your resume step by step",
      features: ["Step-by-step questions", "Structured approach", "Perfect for beginners"],
    },
    freeform: {
      title: "Free Form Mode",
      description: "Speak freely about your experience and we'll organize it into a professional resume",
      features: ["Speak naturally", "Tell your story", "More flexible approach"],
    },
    audioPrompt: "Choose how you want to create your resume - guided mode or free form mode",
  },
  hi: {
    title: "अपना रिज्यूमे बनाने का तरीका चुनें",
    subtitle: "आप अपना रिज्यूमे कैसे बनाना चाहते हैं?",
    guided: {
      title: "गाइडेड मोड",
      description: "हम आपसे एक-एक करके सवाल पूछेंगे और आपका रिज्यूमे बनाने में मदद करेंगे",
      features: ["चरणबद्ध प्रश्न", "संरचित दृष्टिकोण", "शुरुआती लोगों के लिए बेहतरीन"],
    },
    freeform: {
      title: "फ्री फॉर्म मोड",
      description: "अपने अनुभव के बारे में स्वतंत्र रूप से बोलें और हम इसे एक पेशेवर रिज्यूमे में व्यवस्थित करेंगे",
      features: ["प्राकृतिक रूप से बोलें", "अपनी कहानी बताएं", "अधिक लचीला दृष्टिकोण"],
    },
    audioPrompt: "चुनें कि आप अपना रिज्यूमे कैसे बनाना चाहते हैं - गाइडेड मोड या फ्री फॉर्म मोड",
  },
  bn: {
    title: "আপনার রিজিউমে তৈরির পদ্ধতি বেছে নিন",
    subtitle: "আপনি কীভাবে আপনার রিজিউমে তৈরি করতে চাহতে চান?",
    guided: {
      title: "গাইডেড মোড",
      description: "আমরা আপনাকে একে একে প্রশ্ন করব এবং ধাপে ধাপে আপনার রিজিউমে তৈরি করতে সাহায্য করব",
      features: ["ধাপে ধাপে প্রশ্ন", "কাঠামোগত পদ্ধতি", "নতুনদের জন্য নিখুঁত"],
    },
    freeform: {
      title: "ফ্রি ফর্ম মোড",
      description: "আপনার অভিজ্ঞতা সম্পর্কে স্বাধীনভাবে কথা বলুন এবং আমরা এটি একটি পেশাদার রিজিউমেতে সাজাব",
      features: ["স্বাভাবিকভাবে কথা বলুন", "আপনার গল্প বলুন", "আরও নমনীয় পদ্ধতি"],
    },
    audioPrompt: "বেছে নিন আপনি কীভাবে আপনার রিজিউমে তৈরি করতে চান - গাইডেড মোড বা ফ্রি ফর্ম মোড",
  },
  te: {
    title: "మీ రెజ్యూమ్ సృష్టి మోడ్‌ను ఎంచుకోండి",
    subtitle: "మీరు మీ రెజ్యూమ్‌ను ఎలా సృష్టించాలని అనుకుంటున్నారు?",
    guided: {
      title: "గైడెడ్ మోడ్",
      description: "మేము మిమ్మల్ని ఒక్కొక్కటిగా ప్రశ్నలు అడుగుతాము మరియు దశలవారీగా మీ రెజ్యూమ్ నిర్మించడంలో సహాయం చేస్తాము",
      features: ["దశలవారీ ప్రశ్నలు", "నిర్మాణాత్మక విధానం", "ప్రారంభకులకు అనువైనది"],
    },
    freeform: {
      title: "ఫ్రీ ఫార్మ్ మోడ్",
      description: "మీ అనుభవం గురించి స్వేచ్ఛగా మాట్లాడండి మరియు మేము దానిని వృత్తిపరమైన రెజ్యూమ్‌గా నిర్వహిస్తాము",
      features: ["సహజంగా మాట్లాడండి", "మీ కథ చెప్పండి", "మరింత సరళమైన విధానం"],
    },
    audioPrompt: "మీరు మీ రెజ్యూమ్‌ను ఎలా సృష్టించాలనుకుంటున్నారో ఎంచుకోండి - గైడెడ్ మోడ్ లేదా ఫ్రీ ఫార్మ్ మోడ్",
  },
  ta: {
    title: "உங்கள் ரெஸ்யூமே உருவாக்கும் முறையைத் தேர்ந்தெடுக்கவும்",
    subtitle: "நீங்கள் உங்கள் ரெஸ்யூமேவை எப்படி உருவாக்க விரும்புகிறீர்கள்?",
    guided: {
      title: "வழிகாட்டப்பட்ட முறை",
      description: "நாங்கள் உங்களிடம் ஒவ்வொன்றாக கேள்விகள் கேட்டு படிப்படியாக உங்கள் ரெஸ்யூமே உருவாக்க உதவுவோம்",
      features: ["படிப்படியான கேள்விகள்", "கட்டமைக்கப்பட்ட அணுகுமுறை", "ஆரம்பநிலையாளர்களுக்கு சிறந்தது"],
    },
    freeform: {
      title: "இலவச வடிவ முறை",
      description: "உங்கள் அனுபவத்தெக்குறিച்சு சுதந்திரமாக பேசுங்கள், நாங்கள் அதை ஒரு தொழில்முறை ரெஸ்யூமேவாக ஒழுங்கமைப்போம்",
      features: ["இயல்பாக பேசுங்கள்", "உங்கள் கதையைச் சொல்லுங்கள்", "மிகவும் நெகிழ்வான அணுகுமுறை"],
    },
    audioPrompt:
      "நீங்கள் உங்கள் ரெஸ்யூமேவை எப்படி உருவாக்க விரும்புகிறீர்கள் என்பதைத் தேர்ந்தெடுக்கவும் - வழிகாட்டப்பட்ட முறை அல்லது இலவச வடிவ முறை",
  },
  mr: {
    title: "तुमचा रिझ्यूमे तयार करण्याची पद्धत निवडा",
    subtitle: "तुम्ही तुमचा रिझ्यूमे कसा तयार करू इच्छिता?",
    guided: {
      title: "गाइडेड मोड",
      description: "आम्ही तुम्हाला एकामागून एक प्रश्न विचारू आणि पायरीने तुमचा रिझ्यूमे तयार करण्यात मदत करू",
      features: ["पायरीने प्रश्न", "संरचित दृष्टिकोन", "नवशिक्यांसाठी उत्तम"],
    },
    freeform: {
      title: "फ्री फॉर्म मोड",
      description: "तुमच्या अनुभवाबद्दल मुक्तपणे बोला आणि आम्ही ते व्यावसायिक रिझ्यूमेमध्ये व्यवस्थित करू",
      features: ["नैसर्गिकरित्या बोला", "तुमची गोष्ट सांगा", "अधिक लवचिक दृष्टिकोन"],
    },
    audioPrompt: "तुम्ही तुमचा रिझ्यूमे कसा तयार करू इच्छिता ते निवडा - गाइडेड मोड किंवा फ्री फॉर्म मोड",
  },
  gu: {
    title: "તમારો રિઝ્યૂમે બનાવવાની પદ્ધતિ પસંદ કરો",
    subtitle: "તમે તમારો રિઝ્યૂમે કેવી રીતે બનાવવા માંગો છો?",
    guided: {
      title: "ગાઇડેડ મોડ",
      description: "અમે તમને એક પછી એક પ્રશ્નો પૂછીશું અને પગલે પગલે તમારો રિઝ્યૂમે બનાવવામાં મદદ કરીશું",
      features: ["પગલાબદ્ધ પ્રશ્નો", "સંરચિત અભિગમ", "શરૂઆતીઓ માટે સંપૂર્ણ"],
    },
    freeform: {
      title: "ફ્રી ફોર્મ મોડ",
      description: "તમારા અનુભવ વિશે મુક્તપણે બોલો અને અમે તેને વ્યાવસાયિક રિઝ્યૂમેમાં ગોઠવીશું",
      features: ["કુદરતી રીતે બોલો", "તમારી વાર્તા કહો", "વધુ લવચીક અભિગમ"],
    },
    audioPrompt: "તમે ���મારો રિઝ્યૂમે કેવી રીતે બનાવવા માંગો છો તે પસંદ કરો - ગાઇડેડ મોડ અથવા ફ્રી ફોર્મ મોડ",
  },
  kn: {
    title: "ನಿಮ್ಮ ರೆಸ್ಯೂಮ್ ರಚನೆಯ ವಿಧಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    subtitle: "ನೀವು ನಿಮ್ಮ ರೆಸ್ಯೂಮ್ ಅನ್ನು ಹೇಗೆ ರಚಿಸಲು ಬಯಸುತ್ತೀರಿ?",
    guided: {
      title: "ಗೈಡೆಡ್ ಮೋಡ್",
      description: "ನಾವು ನಿಮ್ಮನ್ನು ಒಂದೊಂದಾಗಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳುತ್ತೇವೆ ಮತ್ತು ಹಂತಹಂತವಾಗಿ ನಿಮ್ಮ ರೆಸ್ಯೂಮ್ ನಿರ್ಮಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ",
      features: ["ಹಂತಹಂತದ ಪ್ರಶ್ನೆಗಳು", "ರಚನಾತ್ಮಕ ವಿಧಾನ", "ಆરಂಭಿಕರಿಗೆ ಪರಿೂರ್ಣ"],
    },
    freeform: {
      title: "ಫ್ರೀ ಫಾರ್ಮ್ ಮೋಡ್",
      description: "ನಿಮ್ಮ ಅನುಭವದ ಬಗ್ಗೆ ಮುಕ್ತವಾಗಿ ಮಾತನಾಡಿ ಮತ್ತು ನಾವು ಅದನ್ನು ವೃತ್ತಿರ ರೆಸ್ಯೂಮ್ ಆಗಿ ಸಂಘಟಿಸುತ್ತೇವೆ",
      features: ["ಸ್ವಾಭಾವಿಕವಾಗಿ ಮಾತನಾಡಿ", "ನಿಮ್ಮ ಕಥೆಯನ್ನು ಹೇಳಿ", "ಹೆಚ್ಚು ಹೊಂದಿಕೊಳ್ಳುವ ವಿಧಾನ"],
    },
    audioPrompt: "ನೀವು ನಿಮ್ಮ ರೆಸ್ಯೂಮ್ ಅನ್ನು ಹೇಗೆ ರಚಿಸಲು ಬಯಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ಆಯ್ಕೆಮಾಡಿ - ಗೈಡೆಡ್ ಮೋಡ್ ಅಥವಾ ಫ್ರೀ ಫಾರ್ಮ್ ಮೋಡ್",
  },
  ml: {
    title: "നിങ്ങളുടെ റെസ്യൂമെ സൃഷ്ടിക്കൽ മോഡ് തിരഞ്ഞെടുക്കുക",
    subtitle: "നിങ്ങൾ എങ്ങനെയാണ് നിങ്ങളുടെ റെസ്യൂമെ സൃഷ്ടിക്കാൻ ആഗ്രഹിക്കുന്നത്?",
    guided: {
      title: "ഗൈഡഡ് മോഡ്",
      description: "ഞങ്ങൾ നിങ്ങളോട് ഓരോന്നായി ചോദ്യങ്ങൾ ചോദിക്കുകയും ഘട്ടം ഘട്ടമായി നിങ്ങളുടെ റെസ്യൂമെ നിർമ്മിക്കാൻ സഹായിക്കുകയും ചെയ്യും",
      features: ["ഘട്ടം ഘട്ടമായുള്ള ചോദ്യങ്ങൾ", "ഘടനാപരമായ സമീപനം", "തുടക്കക്കാർക്ക് അനുയോജ്യം"],
    },
    freeform: {
      title: "ഫ്രീ ഫോം മോಡ്",
      description: "നിങ്ങളുടെ അനുഭവത്തെക്കുറിച്ച് സ്വതന്ത്രമായി സംസാരിക്കുക, ഞങ്ങൾ അത് ഒരു പ്രൊഫഷണൽ റെസ്യൂമെയായി ക്രമീകരിക്കും",
      features: ["സ്വാഭാവികമായി സംസാരിക്കുക", "നിങ്ങളുടെ കഥ പറയുക", "കൂടുതൽ വഴക്കമുള്ള സമീപനം"],
    },
    audioPrompt: "നിങ്ങൾ എങ്ങനെയാണ് നിങ്ങളുടെ റെസ്യൂമെ സൃഷ്ടിക്കാൻ ആഗ്രഹിക്കുന്നതെന്ന് തിരഞ്ഞെടുക്കുക - ഗൈഡഡ് മോഡ് അല്ലെങ്കിൽ ഫ്രീ ഫോം മോഡ്",
  },
  pa: {
    title: "ਆਪਣਾ ਰਿਜ਼ਿਊਮੇ ਬਣਾਉਣ ਦਾ ਤਰੀਕਾ ਚੁਣੋ",
    subtitle: "ਤੁਸੀਂ ਆਪਣਾ ਰਿਜ਼ਿਊਮੇ ਕਿਵੇਂ ਬਣਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
    guided: {
      title: "ਗਾਈਡਡ ਮੋਡ",
      description: "ਅਸੀਂ ਤੁਹਾਨੂੰ ਇੱਕ-ਇੱਕ ਕਰਕੇ ਸਵਾਲ ਪੁੱਛਾਂਗੇ ਅਤੇ ਕਦਮ-ਦਰ-ਕਦਮ ਤੁਹਾਡਾ ਰਿਜ਼ਿਊਮੇ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਾਂਗੇ",
      features: ["ਕਦਮ-ਦਰ-ਕਦਮ ਸਵਾਲ", "ਢਾਂਚਾਗਤ ਪਹੁੰਚ", "ਸ਼ੁਰੂਆਤੀ ਲੋਕਾਂ ਲਈ ਸੰਪੂਰਨ"],
    },
    freeform: {
      title: "ਫ੍ਰੀ ਫਾਰਮ ਮੋਡ",
      description: "ਆਪਣੇ ਤਜਰਬੇ ਬਾਰੇ ਖੁੱਲ੍ਹ ਕੇ ਬੋਲੋ ਅਤੇ ਅਸੀਂ ਇਸਨੂੰ ਇੱਕ ਪੇਸ਼ੇਵਰ ਰਿਜ਼ਿਊਮੇ ਵਿੱਚ ਵਿਵਸਥਿਤ ਕਰਾਂਗੇ",
      features: ["ਕੁਦਰਤੀ ਤੌਰ 'ਤੇ ਬੋਲੋ", "ਆਪਣੀ ਕਹਾਣੀ ਦੱਸੋ", "ਵਧੇਰੇ ਲਚਕਦਾਰ ਪਹੁੰਚ"],
    },
    audioPrompt: "ਚੁਣੋ ਕਿ ਤੁਸੀਂ ਆਪਣਾ ਰਿਜ਼ਿਊਮੇ ਕਿਵੇਂ ਬਣਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ - ਗਾਈਡਡ ਮੋਡ ਜਾਂ ਫ੍ਰੀ ਫਾਰਮ ਮੋਡ",
  },
  or: {
    title: "ଆପଣଙ୍କର ରିଜ୍ୟୁମ୍ ସୃଷ୍ଟି ମୋଡ୍ ବାଛନ୍ତୁ",
    subtitle: "ଆପଣ କିପରି ଆପଣଙ୍କର ରିଜ୍ୟୁମ୍ ତିଆରି କରିବାକୁ ଚାହାଁନ୍ତି?",
    guided: {
      title: "ଗାଇଡେଡ୍ ମୋଡ୍",
      description: "ଆମେ ଆପଣଙ୍କୁ ଗୋଟିଏ ପରେ ଗୋଟିଏ ପ୍ରଶ୍ନ ପଚାରିବୁ ଏବଂ ପର୍ଯ୍ୟାୟକ୍ରମେ ଆପଣଙ୍କର ରିଜ୍ୟୁମ୍ ନିର୍ମାଣରେ ସାହାଯ୍ୟ କରିବୁ",
      features: ["ପର୍ଯ୍ୟାୟକ୍ରମେ ପ୍ରଶ୍ନ", "ସଂରଚିତ ଉପାୟ", "ନୂତନମାନଙ୍କ ପାଇଁ ଉପଯୁକ୍ତ"],
    },
    freeform: {
      title: "ଫ୍ରୀ ଫର୍ମ ମୋଡ୍",
      description: "ଆପଣଙ୍କର ଅଭିଜ୍ଞତା ବିଷୟରେ ମୁକ୍ତଭାବେ କୁହନ୍ତୁ ଏବଂ ଆମେ ଏହାକୁ ଏକ ବୃତ୍ତିଗତ ରିଜ୍ୟୁମ୍ରେ ସଂଗଠିତ କରିବୁ",
      features: ["ପ୍ରାକୃତିକ ଭାବରେ କୁହନ୍ତୁ", "ଆପଣଙ୍କର କାହାଣୀ କୁହନ୍ତୁ", "ଅଧିକ ନମନୀୟ ଉପାୟ"],
    },
    audioPrompt: "ଆପଣ କିପରି ଆପଣଙ୍କର ରିଜ୍ୟୁମ୍ ତିଆରି କରିବାକୁ ଚାହାଁନ୍ତି ତାହା ବାଛନ୍ତୁ - ଗାଇଡେଡ୍ ମୋଡ୍ କିମ୍ବା ଫ୍ରୀ ଫର୍ମ ମୋଡ୍",
  },
  as: {
    title: "আপোনাৰ ৰিজিউমে সৃষ্টি মোড বাছনি কৰক",
    subtitle: "আপুনি কেনেকৈ আপোনাৰ ৰিজিউমে সৃষ্টি কৰিব বিচাৰে?",
    guided: {
      title: "গাইডেড মোড",
      description: "আমি আপোনাক এটাৰ পিছত এটা প্ৰশ্ন সুধিম আৰু পৰ্যায়ক্ৰমে আপোনাৰ ৰিজিউমে নিৰ্মাণত সহায় কৰিম",
      features: ["পৰ্যায়ক্ৰমিক প্ৰশ্ন", "গঠনমূলক পদ্ধতি", "নতুনসকলৰ বাবে উপযুক্ত"],
    },
    freeform: {
      title: "ফ্ৰী ফৰ্ম মোড",
      description: "আপোনাৰ অভিজ্ঞতাৰ বিষয়ে মুক্তভাৱে কওক আৰু আমি ইয়াক এটা পেছাদাৰী ৰিজিউমেত সংগঠিত কৰিম",
      features: ["প্ৰাকৃতিকভাৱে কওক", "আপোনাৰ কাহিনী কওক", "অধিক নমনীয় পদ্ধতি"],
    },
    audioPrompt: "আপুনি কেনেকৈ আপোনাৰ ৰিজিউমে সৃষ্টি কৰিব বিচাৰে সেইটো বাছনি কৰক - গাইডেড মোড বা ফ্ৰী ফৰ্ম মোড",
  },
  ur: {
    title: "اپنا ریزیومے بنانے کا طریقہ منتخب کریں",
    subtitle: "آپ اپنا ریزیومے کیسے بنانا چاہتے ہیں؟",
    guided: {
      title: "گائیڈڈ موڈ",
      description: "ہم آپ سے ایک کے بعد ایک سوالات پوچھیں گے اور قدم بہ قدم آپ کا ریزیومے بنانے میں مدد کریں گے",
      features: ["قدم بہ قدم سوالات", "منظم نقطہ نظر", "ابتدائی افراد کے لیے بہترین"],
    },
    freeform: {
      title: "فری فارم موڈ",
      description: "اپنے تجربے کے بارے میں آزادانہ طور پر بات کریں اور ہم اسے ایک پیشہ ورانہ ریزیومے میں منظم کریں گے",
      features: ["قدرتی طور پر بات کریں", "اپنی کہانی بتائیں", "زیادہ لچکدار نقطہ نظر"],
    },
    audioPrompt: "منتخب کریں کہ آپ اپنا ریزیومے کیسے بنانا چاہتے ہیں - گائیڈڈ موڈ یا فری فارم موڈ",
  },
}

export function ModeSelectionModal({ isOpen, onClose, onModeSelect, selectedLanguage }: ModeSelectionModalProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  const content = modeContent[selectedLanguage as keyof typeof modeContent] || modeContent.en

  useEffect(() => {
    if (isOpen) {
      // Play audio prompt when modal opens
      playAudioPrompt()
    }
  }, [isOpen])

  const playAudioPrompt = () => {
    setIsAudioPlaying(true)

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(content.audioPrompt)

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

      utterance.lang = speechLangMap[selectedLanguage] || "en-US"
      utterance.rate = 0.8
      utterance.pitch = 1

      utterance.onend = () => setIsAudioPlaying(false)
      utterance.onerror = () => setIsAudioPlaying(false)

      speechSynthesis.speak(utterance)
    } else {
      setIsAudioPlaying(false)
    }
  }

  const handleModeSelect = (mode: "guided" | "freeform") => {
    localStorage.setItem("selectedMode", mode)

    if (mode === "freeform") {
      // Navigate to free form recording page
      window.location.href = "/free-form-recording"
    } else {
      // Navigate to guided mode (to be implemented)
      onModeSelect(mode)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{content.title}</h2>
            <p className="text-gray-600 mt-1">{content.subtitle}</p>
          </div>
          <div className="flex items-center space-x-2">
            {isAudioPlaying && (
              <div className="flex items-center space-x-2 text-blue-600">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span className="text-sm">Playing...</span>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mode Options */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Guided Mode */}
            <div
              className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors cursor-pointer group"
              onClick={() => handleModeSelect("guided")}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{content.guided.title}</h3>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">{content.guided.description}</p>

              <ul className="space-y-2">
                {content.guided.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                {selectedLanguage === "hi" && "गाइडेड मोड चुनें"}
                {selectedLanguage === "bn" && "গাইডেড মোড বেছে নিন"}
                {selectedLanguage === "te" && "గైడెడ్ మోడ్ ఎంచుకోండి"}
                {selectedLanguage === "ta" && "வழிகாட்டப்பட்ட முறையைத் தேர்ந்தெடுக்கவும்"}
                {selectedLanguage === "mr" && "गाइडेड मोड निवडा"}
                {selectedLanguage === "gu" && "ગાઇડેડ મોડ પસંદ કરો"}
                {selectedLanguage === "kn" && "ಗೈಡೆಡ್ ಮೋಡ್ ಆಯ್ಕೆಮಾಡಿ"}
                {selectedLanguage === "ml" && "ഗൈഡഡ് മോഡ് തിരഞ്ഞെടുക്കുക"}
                {selectedLanguage === "pa" && "ਗਾਈਡਡ ਮੋਡ ਚੁਣੋ"}
                {selectedLanguage === "or" && "ଗାଇଡେଡ୍ ମୋଡ୍ ବାଛନ୍ତୁ"}
                {selectedLanguage === "as" && "গাইডেড মোড বাছনি কৰক"}
                {selectedLanguage === "ur" && "گائیڈڈ موڈ منتخب کریں"}
                {(selectedLanguage === "en" || !selectedLanguage) && "Choose Guided Mode"}
              </Button>
            </div>

            {/* Free Form Mode */}
            <div
              className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors cursor-pointer group"
              onClick={() => handleModeSelect("freeform")}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Mic className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{content.freeform.title}</h3>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">{content.freeform.description}</p>

              <ul className="space-y-2">
                {content.freeform.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white">
                {selectedLanguage === "hi" && "फ्री फॉर्म मोड चुनें"}
                {selectedLanguage === "bn" && "ফ্রি ফর্ম মোড বেছে নিন"}
                {selectedLanguage === "te" && "ఫ్రీ ఫార్మ్ మోడ్ ఎంచుకోండి"}
                {selectedLanguage === "ta" && "இலவச வடிவ முறையைத் தேர்ந்தெடுக்கவும்"}
                {selectedLanguage === "mr" && "फ्री फॉर्म मोड निवडा"}
                {selectedLanguage === "gu" && "ફ્રી ફોર્મ મોડ પસંદ કરો"}
                {selectedLanguage === "kn" && "ಫ್ರೀ ಫಾರ್ಮ್ ಮೋಡ್ ಆಯ್ಕೆಮಾಡಿ"}
                {selectedLanguage === "ml" && "ഫ്രീ ഫോം മോಡ് തിരഞ്ഞെടുക്കുക"}
                {selectedLanguage === "pa" && "ਫ੍ਰੀ ਫਾਰਮ ਮੋਡ ਚੁਣੋ"}
                {selectedLanguage === "or" && "ଫ୍ରୀ ଫର୍ମ ମୋଡ୍ ବାଛନ୍ତୁ"}
                {selectedLanguage === "as" && "ফ্ৰী ফৰ্ম মোড বাছনি কৰক"}
                {selectedLanguage === "ur" && "فری فارم موڈ منتخب کریں"}
                {(selectedLanguage === "en" || !selectedLanguage) && "Choose Free Form Mode"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
