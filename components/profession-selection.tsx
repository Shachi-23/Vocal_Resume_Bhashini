"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Volume2, VolumeX } from "lucide-react"
import { ModeSelectionModal } from "./mode-selection-modal"

// Profession data with translations
const professions = [
  {
    id: "driver",
    icon: "🚗",
    subcategories: ["Car", "Truck", "Auto-rickshaw", "Delivery Van"],
    translations: {
      en: { name: "Driver", subcategories: ["Car", "Truck", "Auto-rickshaw", "Delivery Van"] },
      hi: { name: "ड्राइवर", subcategories: ["कार", "ट्रक", "ऑटो-रिक्शा", "डिलीवरी वैन"] },
      bn: { name: "চালক", subcategories: ["গাড়ি", "ট্রাক", "অটো-রিক্ষা", "ডেলিভারি ভ্যান"] },
      te: { name: "డ్రైవర్", subcategories: ["కార్", "ట్రక్", "ఆటో-రిక్షా", "డెలివరి వ్యాన్"] },
      ta: { name: "ஓட்டுநர்", subcategories: ["கார்", "டிரக்", "ஆட்டோ-ரிக்ஷா", "டெலிவரி வேன்"] },
      mr: { name: "चालक", subcategories: ["कार", "ट्रक", "ऑटो-रिक्षा", "डिलिव्हरी व्हॅन"] },
      gu: { name: "ડ્રાઇવર", subcategories: ["કાર", "ટ્રક", "ઓટો-રિક્ષા", "ડિલિવરી વેન"] },
      kn: { name: "ಚಾಲಕ", subcategories: ["ಕಾರ್", "ಟ್ರಕ್", "ಆಟೋ-ರಿಕ್ಷಾ", "ಡೆಲಿವರಿ ವ್ಯಾನ್"] },
      ml: { name: "ഡ്രൈവർ", subcategories: ["കാർ", "ട്രക്ക്", "ഓട്ടോ-റിക്ഷ", "ഡെലിവറി വാൻ"] },
      pa: { name: "ਡਰਾਈਵਰ", subcategories: ["ਕਾਰ", "ਟਰੱਕ", "ਆਟੋ-ਰਿਕਸ਼ਾ", "ਡਿਲੀਵਰੀ ਵੈਨ"] },
      or: { name: "ଡ୍ରାଇଭର", subcategories: ["କାର", "ଟ୍ରକ", "ଅଟୋ-ରିକ୍ସା", "ଡେଲିଭରୀ ଭ୍ୟାନ"] },
      as: { name: "চালক", subcategories: ["গাড়ী", "ট্ৰাক", "অটো-ৰিক্সা", "ডেলিভাৰী ভেন"] },
      ur: { name: "ڈرائیور", subcategories: ["کار", "ٹرک", "آٹو رکشہ", "ڈیلیوری وین"] },
    },
  },
  {
    id: "delivery",
    icon: "🛵",
    subcategories: ["Food Delivery", "Courier"],
    translations: {
      en: { name: "Delivery Partner", subcategories: ["Food Delivery", "Courier"] },
      hi: { name: "डिलीवरी पार्टनर", subcategories: ["खाना डिलीवरी", "कूरियर"] },
      bn: { name: "ডেলিভারি পার্টনার", subcategories: ["খাবার ডেলিভারি", "কুরিয়ার"] },
      te: { name: "డెలివరీ పార్టనర్", subcategories: ["ఫుడ్ డెలివరీ", "కొరియర్"] },
      ta: { name: "டெலிவரி பார்ட்னர்", subcategories: ["உணவு டெலிவரி", "கூரியர்"] },
      mr: { name: "डिलिव्हरी पार्टनर", subcategories: ["अन्न डिलिव्हरी", "कुरिअर"] },
      gu: { name: "ડિલિવરી પાર્ટનર", subcategories: ["ફૂડ ડિલિવરી", "કુરિયર"] },
      kn: { name: "ಡೆಲಿವರಿ ಪಾರ್ಟ್ನರ್", subcategories: ["ಫುಡ್ ಡೆಲಿವರಿ", "ಕೊರಿಯರ್"] },
      ml: { name: "ഡെലിവറി പാർട്ണർ", subcategories: ["ഫുഡ് ഡെലിവറി", "കൊറിയർ"] },
      pa: { name: "ਡਿਲੀਵਰੀ ਪਾਰਟਨਰ", subcategories: ["ਫੂਡ ਡਿਲੀਵਰੀ", "ਕੁਰੀਅਰ"] },
      or: { name: "ଡେଲିଭରୀ ପାର୍ଟନର", subcategories: ["ଖାଦ୍ୟ ଡେଲିଭରୀ", "କୁରିଅର"] },
      as: { name: "ডেলিভাৰী পাৰ্টনাৰ", subcategories: ["খাদ্য ডেলিভাৰী", "কুৰিয়াৰ"] },
      ur: { name: "ڈیلیوری پارٹنر", subcategories: ["فوڈ ڈیلیوری", "کوریئر"] },
    },
  },
  {
    id: "electrician",
    icon: "⚡",
    subcategories: ["Home Electrician", "Industrial"],
    translations: {
      en: { name: "Electrician", subcategories: ["Home Electrician", "Industrial"] },
      hi: { name: "इलेक्ट्रीशियन", subcategories: ["घरेलू इलेक्ट्रीशियन", "औद्योगिक"] },
      bn: { name: "ইলেকট্রিশিয়ান", subcategories: ["বাড়ির ইলেকট্রিশিয়ান", "শিল্প"] },
      te: { name: "ఎలక్ట్రీషియన్", subcategories: ["హోম్ ఎలక్ట్రీషియన్", "ఇండస్ట్రియల్"] },
      ta: { name: "மின்சாரத் தொழிலாளி", subcategories: ["வீட்டு மின்சாரம்", "தொழில்துறை"] },
      mr: { name: "इलेक्ट्रिशियन", subcategories: ["घरगुती इलेक्ट्रिशियन", "औद्योगिक"] },
      gu: { name: "ઇલેક્ટ્રિશિયન", subcategories: ["ઘરેલું ઇલેક્ટ્રિશિયન", "ઔદ્યોગિક"] },
      kn: { name: "ಎಲೆಕ್ಟ್ರಿಷಿಯನ್", subcategories: ["ಮನೆ ಎಲೆಕ್ಟ್ರಿಷಿಯನ್", "ಕೈಗಾರಿಕಾ"] },
      ml: { name: "ഇലക്ട്രീഷ്യൻ", subcategories: ["ഹോം ഇലക്ട്രീഷ്യൻ", "ഇൻഡസ്ട്രിയൽ"] },
      pa: { name: "ਇਲੈਕਟ੍ਰੀਸ਼ਿਅਨ", subcategories: ["ਘਰੇਲੂ ਇਲੈਕਟ੍ਰੀਸ਼ਿਅਨ", "ਉਦਯੋਗਿਕ"] },
      or: { name: "ଇଲେକ୍ଟ୍ରିସିଆନ", subcategories: ["ଘର ଇଲେକ୍ଟ୍ରିସିଆନ", "ଶିଲ୍ପ"] },
      as: { name: "ইলেকট্ৰিচিয়ান", subcategories: ["ঘৰুৱা ইলেকট্ৰিচিয়ান", "ঔদ্যোগিক"] },
      ur: { name: "الیکٹریشن", subcategories: ["گھریلو الیکٹریشن", "صنعتی"] },
    },
  },
  {
    id: "tailor",
    icon: "✂️",
    subcategories: ["Clothing Tailor", "Alteration"],
    translations: {
      en: { name: "Tailor", subcategories: ["Clothing Tailor", "Alteration"] },
      hi: { name: "दर्जी", subcategories: ["कपड़े का दर्जी", "सुधार"] },
      bn: { name: "দর্জি", subcategories: ["পোশাক দর্জি", "পরিবর্তন"] },
      te: { name: "దర్జీ", subcategories: ["దుస్తుల దర్జీ", "మార్పు"] },
      ta: { name: "தையல்காரர்", subcategories: ["ஆடை தையல்", "மாற்றம்"] },
      mr: { name: "शिंपी", subcategories: ["कपड्यांचा शिंपी", "दुरुस्ती"] },
      gu: { name: "દરજી", subcategories: ["કપડાંનો દરજી", "ફેરફાર"] },
      kn: { name: "ಟೇಲರ್", subcategories: ["ಬಟ್ಟೆ ಟೇಲರ್", "ಬದಲಾವಣೆ"] },
      ml: { name: "തയ്യൽക്കാരൻ", subcategories: ["വസ്ത്ര തയ്യൽ", "മാറ്റം"] },
      pa: { name: "ਦਰਜ਼ੀ", subcategories: ["ਕੱਪੜੇ ਦਾ ਦਰਜ਼ੀ", "ਸੁਧਾਰ"] },
      or: { name: "ଦର୍ଜି", subcategories: ["ପୋଷାକ ଦର୍ଜି", "ପରିବର୍ତ୍ତନ"] },
      as: { name: "দৰ্জী", subcategories: ["কাপোৰৰ দৰ্জী", "সলনি"] },
      ur: { name: "درزی", subcategories: ["کپڑے کا درزی", "تبدیلی"] },
    },
  },
  {
    id: "cook",
    icon: "👨‍🍳",
    subcategories: ["Home Cook", "Restaurant Cook"],
    translations: {
      en: { name: "Cook / Chef", subcategories: ["Home Cook", "Restaurant Cook"] },
      hi: { name: "रसोइया / शेफ", subcategories: ["घरेलू रसोइया", "रेस्टोरेंट रसोइया"] },
      bn: { name: "রাঁধুনি / শেফ", subcategories: ["বাড়ির রাঁধুনি", "রেস্তোরাঁর রাঁধুনি"] },
      te: { name: "వంటవాడు / చెఫ్", subcategories: ["ఇంటి వంటవాడు", "రెస్టారెంట్ వంటవాడు"] },
      ta: { name: "சமையல்காரர் / செஃப்", subcategories: ["வீட்டு சமையல்", "உணவகம்"] },
      mr: { name: "स्वयंपाकी / शेफ", subcategories: ["घरगुती स्वयंपाकी", "रेस्टॉरंट स्वयंपाकी"] },
      gu: { name: "રસોઇયો / શેફ", subcategories: ["ઘરેલું રસોઇયો", "રેસ્ટોરન્ટ રસોઇયો"] },
      kn: { name: "ಅಡುಗೆಯವರು / ಶೆಫ್", subcategories: ["ಮನೆ ಅಡುಗೆ", "ರೆಸ್ಟೋರೆಂಟ್ ಅಡುಗೆ"] },
      ml: { name: "പാചകക്കാരൻ / ഷെഫ്", subcategories: ["വീട്ടിലെ പാചകം", "റെസ്റ്റോറന്റ് പാചകം"] },
      pa: { name: "ਰਸੋਈਆ / ਸ਼ੈੱਫ", subcategories: ["ਘਰੇਲੂ ਰਸੋਈਆ", "ਰੈਸਟੋਰੈਂਟ ਰਸੋਈਆ"] },
      or: { name: "ରାନ୍ଧୁଣୀ / ଶେଫ", subcategories: ["ଘର ରାନ୍ଧୁଣୀ", "ରେଷ୍ଟୁରାଣ୍ଟ ରାନ୍ଧୁଣୀ"] },
      as: { name: "ৰান্ধনী / শ্বেফ", subcategories: ["ঘৰুৱা ৰান্ধনী", "ৰেষ্টুৰেণ্ট ৰান্ধনী"] },
      ur: { name: "باورچی / شیف", subcategories: ["گھریلو باورچی", "ریسٹورنٹ باورچی"] },
    },
  },
  {
    id: "security",
    icon: "🛡️",
    subcategories: ["Building Security", "Event Security"],
    translations: {
      en: { name: "Security Guard", subcategories: ["Building Security", "Event Security"] },
      hi: { name: "सिक्योरिटी गार्ड", subcategories: ["बिल्डिंग सिक्योरिटी", "इवेंट सिक्योरिटी"] },
      bn: { name: "নিরাপত্তা প্রহরী", subcategories: ["বিল্ডিং নিরাপত্তা", "ইভেন্ট নিরাপত্তা"] },
      te: { name: "సెక్యూరిటీ గార్డ్", subcategories: ["బిల్డింగ్ సెక్యూరిటీ", "ఈవెంట్ సెక్యూరిటీ"] },
      ta: { name: "பாதுகாப்பு காவலர்", subcategories: ["கட்டிட பாதுகாப்பு", "நிகழ்வு பாதுகாப்பு"] },
      mr: { name: "सिक्युरिटी गार्ड", subcategories: ["बिल्डिंग सिक्युरिटी", "इव्हेंट सिक्युरिटी"] },
      gu: { name: "સિક્યુરિટી ગાર્ડ", subcategories: ["બિલ્ડિંગ સિક્યુરિટી", "ઇવેન્ટ સિક્યુરિટી"] },
      kn: { name: "ಸೆಕ್ಯುರಿಟಿ ಗಾರ್ಡ್", subcategories: ["ಕಟ್ಟಡ ಭದ್ರತೆ", "ಈವೆಂಟ್ ಭದ್ರತೆ"] },
      ml: { name: "സെക്യൂરിറ്റി ഗാർഡ്", subcategories: ["ബിൽഡിംഗ് സെക്യൂരിറ്റി", "ഇവന്റ് സെക്യൂരിറ്റി"] },
      pa: { name: "ਸਿਕਿਉਰਿਟੀ ਗਾਰਡ", subcategories: ["ਬਿਲਡਿੰਗ ਸਿਕਿਉਰਿਟੀ", "ਇਵੈਂਟ ਸਿਕਿਉਰਿਟੀ"] },
      or: { name: "ସିକ୍ୟୁରିଟି ଗାର୍ଡ", subcategories: ["ବିଲଡିଂ ସିକ୍ୟୁରିଟି", "ଇଭେଣ୍ଟ ସିକ୍ୟୁରିଟି"] },
      as: { name: "নিৰাপত্তা প্ৰহৰী", subcategories: ["বিল্ডিং নিৰাপত্তা", "ইভেণ্ট নিৰাপত্তা"] },
      ur: { name: "سیکیورٹی گارڈ", subcategories: ["بلڈنگ سیکیورٹی", "ایونٹ سیکیورٹی"] },
    },
  },
  {
    id: "sales",
    icon: "🛒",
    subcategories: ["Shop Worker", "Cashier"],
    translations: {
      en: { name: "Sales Assistant", subcategories: ["Shop Worker", "Cashier"] },
      hi: { name: "सेल्स असिस्टेंट", subcategories: ["दुकान कर्मचारी", "कैशियर"] },
      bn: { name: "বিক্রয় সহায়ক", subcategories: ["দোকান কর্মী", "ক্যাশিয়ার"] },
      te: { name: "సేల్స్ అసిస్టెంట్", subcategories: ["షాప్ వర్కర్", "క్యాషియర్"] },
      ta: { name: "விற்பனை உதவியாளர்", subcategories: ["கடை ஊழியர்", "காசாளர்"] },
      mr: { name: "सेल्स असिस्टंट", subcategories: ["दुकान कामगार", "कॅशियर"] },
      gu: { name: "સેલ્સ આસિસ્ટન્ટ", subcategories: ["દુકાન કામદાર", "કેશિયર"] },
      kn: { name: "ಸೇಲ್ಸ್ ಅಸಿಸ್ಟೆಂಟ್", subcategories: ["ಅಂಗಡಿ ಕೆಲಸಗಾರ", "ಕ್ಯಾಷಿಯರ್"] },
      ml: { name: "സെയിൽസ് അസിസ്റ്ടന്റ്", subcategories: ["ഷോപ്പ് വർക്കർ", "കാഷിയർ"] },
      pa: { name: "ਸੇਲਜ਼ ਅਸਿਸਟੈਂਟ", subcategories: ["ਦੁਕਾਨ ਕਰਮਚਾਰੀ", "ਕੈਸ਼ੀਅਰ"] },
      or: { name: "ସେଲ୍ସ ଆସିଷ୍ଟାଣ୍ଟ", subcategories: ["ଦୋକାନ କର୍ମଚାରୀ", "କ୍ୟାସିଅର"] },
      as: { name: "বিক্ৰয় সহায়ক", subcategories: ["দোকান কৰ্মী", "কেছিয়াৰ"] },
      ur: { name: "سیلز اسسٹنٹ", subcategories: ["دکان ورکر", "کیشیئر"] },
    },
  },
  {
    id: "marketing",
    icon: "📢",
    subcategories: ["Field Marketing", "Promoter"],
    translations: {
      en: { name: "Field Marketing Worker", subcategories: ["Field Marketing", "Promoter"] },
      hi: { name: "फील्ड मार्केटिंग वर्कर", subcategories: ["फील्ड मार्केटिंग", "प्रमोटर"] },
      bn: { name: "ফিল্ড মার্কেটিং কর্মী", subcategories: ["ফিল্ড মার্কেটিং", "প্রমোটার"] },
      te: { name: "ఫీల్డ్ మార్కెటింగ్ వర్కర్", subcategories: ["ఫీల్డ్ మార్కెటింగ్", "ప్రమోటర్"] },
      ta: { name: "கள சந்தைப்படுத்தல் தொழிலாளி", subcategories: ["கள சந்தைப்படுத்தல்", "விளம்பரதாரர்"] },
      mr: { name: "फील्ड मार्केटिंग वर्कर", subcategories: ["फील्ड मार्केटिंग", "प्रमोटर"] },
      gu: { name: "ફીલ્ડ માર્કેટિંગ વર્કર", subcategories: ["ફીલ્ડ માર્કેટિંગ", "પ્રમોટર"] },
      kn: { name: "ಫೀಲ್ಡ್ ಮಾರ್ಕೆಟಿಂಗ್ ವರ್ಕರ್", subcategories: ["ಫೀಲ್ಡ್ ಮಾರ್ಕೆಟಿಂಗ್", "ಪ್ರಮೋಟರ್"] },
      ml: { name: "ഫീൽഡ് മാർക്കറ്റിംഗ് വർക്കർ", subcategories: ["ഫീൽഡ് മാർക്കറ്റിംഗ്", "പ്രമോട്ടർ"] },
      pa: { name: "ਫੀਲਡ ਮਾਰਕੀਟਿੰਗ ਵਰਕਰ", subcategories: ["ਫੀਲਡ ਮਾਰਕੀਟਿੰਗ", "ਪ੍ਰਮੋਟਰ"] },
      or: { name: "ଫିଲ୍ଡ ମାର୍କେଟିଂ ୱର୍କର", subcategories: ["ଫିଲ୍ଡ ମାର୍କେଟିଂ", "ପ୍ରମୋଟର"] },
      as: { name: "ফিল্ড মাৰ্কেটিং ৱৰ্কাৰ", subcategories: ["ফিল্ড মাৰ্কেটিং", "প্ৰমোটাৰ"] },
      ur: { name: "فیلڈ مارکیٹنگ ورکر", subcategories: ["فیلڈ مارکیٹنگ", "پروموٹر"] },
    },
  },
  {
    id: "mechanic",
    icon: "🔧",
    subcategories: ["Two-wheeler", "Four-wheeler"],
    translations: {
      en: { name: "Mechanic", subcategories: ["Two-wheeler", "Four-wheeler"] },
      hi: { name: "मैकेनिक", subcategories: ["दो पहिया", "चार पहिया"] },
      bn: { name: "মেকানিক", subcategories: ["দুই চাকা", "চার চাকা"] },
      te: { name: "మెకానిక్", subcategories: ["రెండు చక్రాలు", "నాలుగు చక్రాలు"] },
      ta: { name: "மெக்கானிக்", subcategories: ["இரு சக்கர வாகனம்", "நான்கு சக்கர வாகனம்"] },
      mr: { name: "मेकॅनिक", subcategories: ["दुचाकी", "चारचाकी"] },
      gu: { name: "મિકેનિક", subcategories: ["બે ચક્કા", "ચાર ચક્કા"] },
      kn: { name: "ಮೆಕ್ಯಾನಿಕ್", subcategories: ["ಎರಡು ಚಕ್ರ", "ನಾಲ್ಕು ಚಕ್ರ"] },
      ml: { name: "മെക്കാനിക്", subcategories: ["രണ്ട് ചക്രം", "നാല് ചക്രം"] },
      pa: { name: "ਮਕੈਨਿਕ", subcategories: ["ਦੋ ਪਹੀਆ", "ਚਾਰ ਪਹੀਆ"] },
      or: { name: "ମେକାନିକ", subcategories: ["ଦୁଇ ଚକ୍ର", "ଚାରି ଚକ୍ର"] },
      as: { name: "মেকানিক", subcategories: ["দুই চকা", "চাৰি চকা"] },
      ur: { name: "مکینک", subcategories: ["دو پہیہ", "چار پہیہ"] },
    },
  },
]

// Audio prompts in different languages
const audioPrompts = {
  en: "Please choose the job that you do for work",
  hi: "कृपया वह काम चुनें जो आप काम के लिए करते हैं",
  bn: "অনুগ্রহ করে আপনি কাজের জন্য যে কামটি করেন তা বেছে নিন",
  te: "దయచేసి మీరు పని కోసం చేసే ఉద్యోగాన్ని ఎంచుకోండి",
  ta: "தயவுசெய்து நீங்கள் வேலைக்காக செய்யும் வேலையைத் தேர்ந்தெடுக்கவும்",
  mr: "कृपया तुम्ही कामासाठी करत असलेले काम निवडा",
  gu: "કૃપા કરીને તમે કામ માટે જે કામ કરો છો તે પસંદ કરો",
  kn: "ದಯವಿಟ್ಟು ನೀವು ಕೆಲಸಕ್ಕಾಗಿ ಮಾಡುವ ಕೆಲಸವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  ml: "ദയവായി നിങ്ങൾ ജോലിക്കായി ചെയ്യുന്ന ജോലി തിരഞ്ഞെടുക്കുക",
  pa: "ਕਿਰਪਾ ਕਰਕੇ ਉਹ ਕੰਮ ਚੁਣੋ ਜੋ ਤੁਸੀਂ ਕੰਮ ਲਈ ਕਰਦੇ ਹੋ",
  or: "ଦୟାକରି ଆପଣ କାମ ପାଇଁ କରୁଥିବା କାମ ବାଛନ୍ତୁ",
  as: "অনুগ্ৰহ কৰি আপুনি কামৰ বাবে কৰা কামটো বাছনি কৰক",
  ur: "براہ کرم وہ کام منتخب کریں جو آپ کام کے لیے کرتے ہیں",
}

// Page titles in different languages
const pageTitles = {
  en: "Choose Your Profession",
  hi: "अपना पेशा चुनें",
  bn: "আপনার পেশা বেছে নিন",
  te: "మీ వృత్తిని ఎంచుకోండి",
  ta: "உங்கள் தொழிலைத் தேர்ந்தெடுக்கவும்",
  mr: "तुमचा व्यवसाय निवडा",
  gu: "તમારો વ્યવસાય પસંદ કરો",
  kn: "ನಿಮ್ಮ ವೃತ್ತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  ml: "നിങ്ങളുടെ തൊഴിൽ തിരഞ്ഞെടുക്കുക",
  pa: "ਆਪਣਾ ਪੇਸ਼ਾ ਚੁਣੋ",
  or: "ଆପଣଙ୍କର ବୃତ୍ତି ବାଛନ୍ତୁ",
  as: "আপোনাৰ পেছা বাছনি কৰক",
  ur: "اپنا پیشہ منتخب کریں",
}

export function ProfessionSelection() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en")
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [showModeModal, setShowModeModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Get selected language from localStorage
    const language = localStorage.getItem("selectedLanguage") || "en"
    setSelectedLanguage(language)

    // Play audio prompt when page loads
    if (audioEnabled) {
      playAudioPrompt(language)
    }
  }, [audioEnabled])

  const playAudioPrompt = (language: string) => {
    if (!audioEnabled) return

    setIsAudioPlaying(true)
    const prompt = audioPrompts[language as keyof typeof audioPrompts] || audioPrompts.en

    // Use Web Speech API for text-to-speech
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(prompt)

      // Set language for speech synthesis
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

      utterance.lang = speechLangMap[language] || "en-US"
      utterance.rate = 0.8
      utterance.pitch = 1

      utterance.onend = () => {
        setIsAudioPlaying(false)
      }

      utterance.onerror = () => {
        setIsAudioPlaying(false)
      }

      speechSynthesis.speak(utterance)
    } else {
      setIsAudioPlaying(false)
    }
  }

  const handleProfessionSelect = (professionId: string) => {
    setSelectedProfession(professionId)

    // Store selected profession
    localStorage.setItem("selectedProfession", professionId)

    setShowModeModal(true)
  }

  const handleModeSelect = (mode: "guided" | "freeform") => {
    localStorage.setItem("selectedMode", mode)
    setShowModeModal(false)

    // Navigate to resume creation with selected mode
    setTimeout(() => {
      router.push("/resume-creation")
    }, 300)
  }

  const toggleAudio = () => {
    if (isAudioPlaying) {
      speechSynthesis.cancel()
      setIsAudioPlaying(false)
    }
    setAudioEnabled(!audioEnabled)
  }

  const replayAudio = () => {
    if (audioEnabled) {
      speechSynthesis.cancel()
      playAudioPrompt(selectedLanguage)
    }
  }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
//       {/* Background pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}
//         ></div>
//       </div>

//       {/* Header */}
//       <header className="relative z-10 flex justify-between items-center p-6">
//         <div className="flex items-center space-x-2">
//           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//             <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 110 2h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 4h2V3H9v1zm-4 2v9a1 1 0 001 1h8a1 1 0 001-1V6H5z" />
//             </svg>
//           </div>
//           <h1 className="text-2xl font-bold text-white">Vocal Resume</h1>
//         </div>

//         <div className="flex items-center space-x-2">
//           {/* Audio controls */}
//           <Button
//             variant="outline"
//             size="sm"
//             className="bg-white/10 border-white/20 text-white hover:bg-white/20"
//             onClick={replayAudio}
//             disabled={isAudioPlaying}
//           >
//             <Volume2 className="w-4 h-4 mr-1" />
//             {isAudioPlaying ? "Playing..." : "Replay"}
//           </Button>

//           <Button
//             variant="outline"
//             size="sm"
//             className="bg-white/10 border-white/20 text-white hover:bg-white/20"
//             onClick={toggleAudio}
//           >
//             {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
//           </Button>

//           <Button
//             variant="outline"
//             className="bg-white/10 border-white/20 text-white hover:bg-white/20"
//             onClick={() => router.back()}
//           >
//             Back
//           </Button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">
//         <div className="max-w-6xl mx-auto text-center">
//           <div className="mb-8">
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               {pageTitles[selectedLanguage as keyof typeof pageTitles] || pageTitles.en}
//             </h2>
//             <p className="text-xl text-gray-200 max-w-2xl mx-auto">
//               {selectedLanguage === "hi" && "अपना पेशा चुनें और अपना रिज्यूमे बनाना शुरू करें"}
//               {selectedLanguage === "bn" && "আপনার পেশা বেছে নিন এবং আপনার রিজিউমে তৈরি করা শুরু করুন"}
//               {selectedLanguage === "te" && "మీ వృత్తిని ఎంచుకోండి మరియు మీ రెజ్యూమ్ను రూపొందించడం ప్రారంభించండి"}
//               {selectedLanguage === "ta" && "உங்கள் தொழிலைத் தேர்ந்தெடுத்து உங்கள் ரெஸ்யூம�� உருவாக்கத் தொடங்குங்கள்"}
//               {selectedLanguage === "mr" && "तुमचा व्यवसाय निवडा आणि तुमचा रिझ्यूमे तयार करण्यास सुरुवात करा"}
//               {selectedLanguage === "gu" && "તમારો વ્યવસાય પસંદ કરો અને તમારો રિઝ્યૂમે બનાવવાનું શરૂ કરો"}
//               {selectedLanguage === "kn" && "ನಿಮ್ಮ ವೃತ್ತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ರೆಸ್ಯೂಮ್ ಅನ್ನು ರಚಿಸಲು ಪ್ರಾರಂಭಿಸಿ"}
//               {selectedLanguage === "ml" && "നിങ്ങളുടെ തൊഴിൽ തിരഞ്ഞെടുത്ത് നിങ്ങളുടെ റെസ്യൂമെ സൃഷ്ടിക്കാൻ ആരംഭിക്കുക"}
//               {selectedLanguage === "pa" && "ਆਪਣਾ ਪੇਸ਼ਾ ਚੁਣੋ ਅਤੇ ਆਪਣਾ ਰਿਜ਼ਿਊਮੇ ਬਣਾਉਣਾ ਸ਼ੁਰੂ ਕਰੋ"}
//               {selectedLanguage === "or" && "ଆପଣଙ୍କର ବୃତ୍ତି ବାଛନ୍ତୁ ଏବଂ ଆପଣଙ୍କର ରିଜ୍ୟୁମ୍ ତିଆରି କରିବା ଆରମ୍ଭ କରନ୍ତୁ"}
//               {selectedLanguage === "as" && "আপোনাৰ পেছা বাছনি কৰক আৰু আপোনাৰ ৰিজিউমে সৃষ্টি কৰা আৰম্ভ কৰক"}
//               {selectedLanguage === "ur" && "اپنا پیشہ منتخب کریں اور اپنا ریزیومے بنانا شروع کریں"}
//               {(selectedLanguage === "en" || !selectedLanguage) &&
//                 "Select your profession and start creating your resume"}
//             </p>
//           </div>

//           {/* Profession Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
//             {professions.map((profession) => {
//               const translation =
//                 profession.translations[selectedLanguage as keyof typeof profession.translations] ||
//                 profession.translations.en

//               return (
//                 <Button
//                   key={profession.id}
//                   variant="outline"
//                   className={`
//                     h-32 flex flex-col items-center justify-center space-y-2 p-4
//                     bg-white/10 border-white/20 text-white hover:bg-white/20 
//                     transition-all duration-300 hover:scale-105
//                     ${selectedProfession === profession.id ? "bg-blue-600/50 border-blue-400" : ""}
//                   `}
//                   onClick={() => handleProfessionSelect(profession.id)}
//                 >
//                   <div className="text-4xl mb-2">{profession.icon}</div>
//                   <span className="text-sm font-semibold text-center leading-tight">{translation.name}</span>
//                   <div className="text-xs text-gray-300 text-center">
//                     {translation.subcategories.slice(0, 2).join(", ")}
//                   </div>
//                 </Button>
//               )
//             })}
//           </div>

//           {/* Audio Status */}
//           {isAudioPlaying && (
//             <div className="mt-8 bg-blue-600/20 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
//               <div className="flex items-center justify-center space-x-2">
//                 <Volume2 className="w-5 h-5 text-blue-400 animate-pulse" />
//                 <span className="text-white">
//                   {selectedLanguage === "hi" && "ऑडियो चल रहा है..."}
//                   {selectedLanguage === "bn" && "অডিও চলছে..."}
//                   {selectedLanguage === "te" && "ఆడియో ప్లే అవుతోంది..."}
//                   {selectedLanguage === "ta" && "ஆடியோ இயங்குகிறது..."}
//                   {selectedLanguage === "mr" && "ऑડिओ चालू आहे..."}
//                   {selectedLanguage === "gu" && "ઓડિયો ચાલી રહ્યો છે..."}
//                   {selectedLanguage === "kn" && "ಆಡಿಯೋ ಪ್ಲೇ ಆಗುತ್ತಿದೆ..."}
//                   {selectedLanguage === "ml" && "ഓഡിയോ പ്ലേ ചെയ്യുന്നു..."}
//                   {selectedLanguage === "pa" && "ਆਡੀਓ ਚੱਲ ਰਿਹਾ ਹੈ..."}
//                   {selectedLanguage === "or" && "ଅଡିଓ ଚାଲୁଛି..."}
//                   {selectedLanguage === "as" && "অଡিঅ' চলি আছে..."}
//                   {selectedLanguage === "ur" && "آڈیو چل رہا ہے..."}
//                   {(selectedLanguage === "en" || !selectedLanguage) && "Audio playing..."}
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Mode Selection Modal */}
//       <ModeSelectionModal
//         isOpen={showModeModal}
//         onClose={() => setShowModeModal(false)}
//         onModeSelect={handleModeSelect}
//         selectedLanguage={selectedLanguage}
//       />
//     </div>
//   )
// }

 return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <header className="relative z-10 flex justify-between items-center p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 110 2h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 4h2V3H9v1zm-4 2v9a1 1 0 001 1h8a1 1 0 001-1V6H5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Vocal Resume</h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
            onClick={replayAudio}
            disabled={isAudioPlaying}
          >
            <Volume2 className="w-4 h-4 mr-1" />
            {isAudioPlaying ? "Playing..." : "Replay"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
            onClick={toggleAudio}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>

          <Button
            variant="outline"
            className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {pageTitles[selectedLanguage as keyof typeof pageTitles] || pageTitles.en}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {selectedLanguage === "hi" && "अपना पेशा चुनें और अपना रिज्यूमे बनाना शुरू करें"}
              {selectedLanguage === "bn" && "আপনার পেশা বেছে নিন এবং আপনার রিজিউমে তৈরি করা শুরু করুন"}
              {selectedLanguage === "te" && "మీ వృత్తిని ఎంచుకోండి మరియు మీ రెజ్యూమ్ను రూపొందించడం ప్రారంభించండి"}
              {selectedLanguage === "ta" && "உங்கள் தொழிலைத் தேர்ந்தெடுத்து உங்கள் ரெஸ்யூமே உருவாக்கத் தொடங்குங்கள்"}
              {selectedLanguage === "mr" && "तुमचा व्यवसाय निवडा आणि तुमचा रिझ्यूमे तयार करण्यास सुरुवात करा"}
              {selectedLanguage === "gu" && "તમારો વ્યવસાય પસંદ કરો અને તમારો રિઝ્યૂમે બનાવવાનું શરૂ કરો"}
              {selectedLanguage === "kn" && "ನಿಮ್ಮ ವೃತ್ತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ರೆಸ್ಯೂಮ್ ಅನ್ನು ರಚಿಸಲು ಪ್ರಾರಂಭಿಸಿ"}
              {selectedLanguage === "ml" && "നിങ്ങളുടെ തൊഴിൽ തിരഞ്ഞെടുത്ത് നിങ്ങളുടെ റെസ്യൂമെ സൃഷ്ടിക്കാൻ ആരംഭിക്കുക"}
              {selectedLanguage === "pa" && "ਆਪਣਾ ਪੇਸ਼ਾ ਚੁਣੋ ਅਤੇ ਆਪਣਾ ਰਿਜ਼ਿਊਮੇ ਬਣਾਉਣਾ ਸ਼ੁਰੂ ਕਰੋ"}
              {selectedLanguage === "or" && "ଆପଣଙ୍କର ବୃତ୍ତି ବାନ୍ତୁ ଏବଂ ଆପଣଙ୍କର ରିଜ୍ୟୁମ୍ ତିଆରି କରିବା ଆରମ୍ଭ କରନ୍ତୁ"}
              {selectedLanguage === "as" && "আপোনাৰ পেছা বাছনি কৰক আৰু আপোনাৰ ৰিজিউমে সৃষ্টি কৰা আৰম্ভ কৰক"}
              {selectedLanguage === "ur" && "اپنا پیشہ منتخب کریں اور اپنا ریزیومے بنانا شروع کریں"}
              {(selectedLanguage === "en" || !selectedLanguage) &&
                "Select your profession and start creating your resume"}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            {professions.map((profession) => {
              const translation =
                profession.translations[selectedLanguage as keyof typeof profession.translations] ||
                profession.translations.en

              return (
                <Button
                  key={profession.id}
                  variant="outline"
                  className={`
                    h-36 flex flex-col items-center justify-center space-y-2 p-4
                    bg-white border-gray-300 text-gray-700 hover:bg-gray-50 
                    transition-all duration-300 hover:scale-105 shadow-sm
                    ${selectedProfession === profession.id ? "bg-blue-50 border-blue-400 text-blue-700" : ""}
                  `}
                  onClick={() => handleProfessionSelect(profession.id)}
                >
                  <div className="text-4xl mb-2">{profession.icon}</div>
                  <span className="text-sm font-semibold text-center leading-tight">{translation.name}</span>
                  <div className="text-xs text-gray-500 text-center">
                    {translation.subcategories.slice(0, 2).join(", ")}
                  </div>
                </Button>
              )
            })}
          </div>

          {isAudioPlaying && (
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <Volume2 className="w-5 h-5 text-blue-600 animate-pulse" />
                <span className="text-blue-700">
                  {selectedLanguage === "hi" && "ऑडियो चल रहा है..."}
                  {selectedLanguage === "bn" && "অডিও চলছে..."}
                  {selectedLanguage === "te" && "ఆడియో ప్లే అవుతోంది..."}
                  {selectedLanguage === "ta" && "ஆடியோ இயங்குகிறது..."}
                  {selectedLanguage === "mr" && "ऑडिओ चालू आहे..."}
                  {selectedLanguage === "gu" && "ઓડિયો ચાલી રહ્યો છે..."}
                  {selectedLanguage === "kn" && "ಆಡಿಯೋ ಪ್ಲೇ ಆಗುತ್ತಿದೆ..."}
                  {selectedLanguage === "ml" && "ഓഡിയോ പ്ലേ ചെയ്യുന്നു..."}
                  {selectedLanguage === "pa" && "ਆਡੀਓ ਚੱਲ ਰਿਹਾ ਹੈ..."}
                  {selectedLanguage === "or" && "ଅଡିଓ ଚାଲୁଛି..."}
                  {selectedLanguage === "as" && "অডিঅ' চলি আছে..."}
                  {selectedLanguage === "ur" && "آڈیو چل رہا ہے..."}
                  {(selectedLanguage === "en" || !selectedLanguage) && "Audio playing..."}
                </span>
              </div>
            </div>
          )}
        </div>
      </main>

      <ModeSelectionModal
        isOpen={showModeModal}
        onClose={() => setShowModeModal(false)}
        onModeSelect={handleModeSelect}
        selectedLanguage={selectedLanguage}
      />
    </div>
  )
}

