import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, Lightbulb, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Tip {
  id: number;
  text: string;
  category: string;
  icon: string;
  language: {
    en: string;
    hi: string;
    ta: string;
    te: string;
    kn: string;
    ml: string;
  };
}

interface TipsPopupProps {
  selectedLanguage: string;
}

export function TipsPopup({ selectedLanguage }: TipsPopupProps) {
  const [currentTip, setCurrentTip] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [tipHistory, setTipHistory] = useState<number[]>([]);

  const farmingTips: Tip[] = [
    {
      id: 1,
      text: "Loamy soil is best for wheat, while sandy soil suits groundnut perfectly.",
      category: "Soil",
      icon: "🌱",
      language: {
        en: "Loamy soil is best for wheat, while sandy soil suits groundnut perfectly.",
        hi: "गेहूं के लिए दोमट मिट्टी सबसे अच्छी है, जबकि रेतीली मिट्टी मूंगफली के लिए उपयुक्त है।",
        ta: "கோதுமைக்கு களிமண் மண் சிறந்தது, மணல் மண் நிலக்கடலைக்கு ஏற்றது.",
        te: "గోధుమలకు లోమీ మట్టి ఉత్తమం, ఇసుక మట్టి వేరుశెనగకు అనుకూలం.",
        kn: "ಗೋಧಿಗೆ ಮೆಕ್ಕೆ ಮಣ್ಣು ಉತ್ತಮ, ಮರಳು ಮಣ್ಣು ಕಡಲೆಕಾಯಿಗೆ ಸೂಕ್ತ.",
        ml: "ഗോതമ്പിന് കളിമണ്ണ് നല്ലത്, മണൽ മണ്ണ് നിലക്കടലയ്ക്ക് അനുയോജ്യം."
      }
    },
    {
      id: 2,
      text: "Save water with drip irrigation - earn +50 sustainability points!",
      category: "Water",
      icon: "💧",
      language: {
        en: "Save water with drip irrigation - earn +50 sustainability points!",
        hi: "ड्रिप सिंचाई से पानी बचाएं - +50 स्थिरता अंक अर्जित करें!",
        ta: "துளி நீர்ப்பாசனத்தால் தண்ணீர் மிச்சப்படுத்துங்கள் - +50 நிலையான புள்ளிகள்!",
        te: "డ్రిప్ ఇరిగేషన్‌తో నీరు ఆదా చేయండి - +50 స్థిరత్వ పాయింట్లు!",
        kn: "ಡ್ರಿಪ್ ನೀರಾವರಿಯಿಂದ ನೀರು ಉಳಿಸಿ - +50 ಸಮರ್ಥತೆ ಅಂಕಗಳು!",
        ml: "ഡ്രിപ്പ് ജലസേചനത്തിൽ വെള്ളം ലാഭിക്കൂ - +50 സുസ്ഥിരത പോയിന്റുകൾ!"
      }
    },
    {
      id: 3,
      text: "Plant marigold near tomatoes to reduce pests naturally.",
      category: "Pest Control",
      icon: "🐞",
      language: {
        en: "Plant marigold near tomatoes to reduce pests naturally.",
        hi: "टमाटर के पास गेंदा लगाएं - प्राकृतिक कीट नियंत्रण के लिए।",
        ta: "தக்காளிக்கு அருகில் செம்பருத்தி நடவு - இயற்கை பூச்சி கட்டுப்பாடு.",
        te: "టమోటాల దగ్గర బంతిపువ్వు నాటండి - సహజ కీట నియంత్రణ.",
        kn: "ಟೊಮೇಟೊ ಬಳಿ ಮಾರಿಗೋಲ್ಡ್ ನಾಟಿ - ನೈಸರ್ಗಿಕ ಕೀಟ ನಿಯಂತ್ರಣ.",
        ml: "തക്കാളിയുടെ അടുത്ത് ചെന്തുമല്ലി നടാൻ - പ്രകൃതിദത്ത കീട നിയന്ത്രണം."
      }
    },
    {
      id: 4,
      text: "Cow dung compost improves soil fertility and adds yield bonus.",
      category: "Organic",
      icon: "🐄",
      language: {
        en: "Cow dung compost improves soil fertility and adds yield bonus.",
        hi: "गोबर की खाद मिट्टी की उर्वरता बढ़ाती है और फसल बोनस देती है।",
        ta: "மாட்டு சாணம் மண் வளத்தை அதிகரிக்கும் மற்றும் விளைச்சல் போனஸ் தரும்.",
        te: "ఆవు పేడ కంపోస్ట్ మట్టి సారవంతత పెంచుతుంది మరియు దిగుబడి బోనస్ ఇస్తుంది.",
        kn: "ಹಸುವಿನ ಸಗಣಿ ಕಂಪೋಸ್ಟ್ ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ಹೆಚ್ಚಿಸುತ್ತದೆ.",
        ml: "പശുവിൻ ചാണകം മണ്ണിന്റെ ഫലഭൂയിഷ്ഠത വർധിപ്പിക്കുന്നു."
      }
    },
    {
      id: 5,
      text: "Best time to sow paddy is just after the first monsoon rains.",
      category: "Timing",
      icon: "🌤️",
      language: {
        en: "Best time to sow paddy is just after the first monsoon rains.",
        hi: "धान बोने का सबसे अच्छा समय पहली मानसूनी बारिश के तुरंत बाद है।",
        ta: "நெல் விதைப்பதற்கான சிறந்த நேரம் முதல் பருவமழைக்குப் பிறகு.",
        te: "వరి విత్తడానికి మంచి సమయం మొదటి వర్షాల తర్వాత.",
        kn: "ಭತ್ತ ಬಿತ್ತಲು ಮೊದಲ ಮಳೆಯ ನಂತರ ಉತ್ತಮ ಸಮಯ.",
        ml: "നെല്ല് വിത്തിന് ആദ്യ മഴയ്ക്ക് ശേഷം മികച്ച സമയം."
      }
    },
    {
      id: 6,
      text: "Rotate crops to break pest cycles and improve soil health.",
      category: "Rotation",
      icon: "🔄",
      language: {
        en: "Rotate crops to break pest cycles and improve soil health.",
        hi: "कीट चक्र तोड़ने और मिट्टी स्वास्थ्य में सुधार के लिए फसल चक्र अपनाएं।",
        ta: "பூச்சி சுழற்சியை முறியடிக்க மற்றும் மண் ஆரோக்யத்தை மேம்படுத்த பயிர் சுழற்சி செய்யுங்கள்.",
        te: "కీట చక్రాలను విచ్ఛిన్నం చేయడానికి మరియు మట్టి ఆరోగ్యాన్ని మెరుగుపరచడానికి పంట మార్పిడి చేయండి.",
        kn: "ಕೀಟ ಚಕ್ರಗಳನ್ನು ಮುರಿಯಲು ಮತ್ತು ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸುಧಾರಿಸಲು ಬೆಳೆ ಸರದಿ ಮಾಡಿ.",
        ml: "കീട ചക്രങ്ങൾ തകർക്കാൻ വിള ഭ്രമണം ചെയ്യുക."
      }
    },
    {
      id: 7,
      text: "Mulching retains soil moisture and reduces weed growth by 70%.",
      category: "Soil Care",
      icon: "🌿",
      language: {
        en: "Mulching retains soil moisture and reduces weed growth by 70%.",
        hi: "मल्चिंग मिट्टी की नमी बनाए रखती है और खरपतवार को 70% तक कम करती है।",
        ta: "மண் பொத்தல் மண்ணின் ஈரப்பதத்தை பராமரிக்கும் மற்றும் களை வளர்ச்சியை 70% குறைக்கும்.",
        te: "మల్చింగ్ మట్టిలో తేమను నిలుపుకుంటుంది మరియు కుంకుడు పెరుగుదలను 70% తగ్గిస్తుంది.",
        kn: "ಮಲ್ಚಿಂಗ್ ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಉಳಿಸುತ್ತದೆ ಮತ್ತು 70% ಕಳೆ ಬೆಳವಣಿಗೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.",
        ml: "മൾച്ചിംഗ് മണ്ണിന്റെ ഈർപ്പം നിലനിർത്തുകയും കളകളുടെ വളർച്ച 70% കുറയ്ക്കുകയും ചെയ്യുന്നു."
      }
    },
    {
      id: 8,
      text: "Neem oil is a natural pesticide that protects crops without harming beneficial insects.",
      category: "Natural Pest Control",
      icon: "🌳",
      language: {
        en: "Neem oil is a natural pesticide that protects crops without harming beneficial insects.",
        hi: "नीम का तेल एक प्राकृतिक कीटनाशक है जो फायदेमंद कीड़ों को नुकसान पहुंचाए बिना फसलों की रक्षा करता है।",
        ta: "வேப்ப எண்ணெய் ஒரு இயற்கை பூச்சிக்கொல்லி, பயனுள்ள பூச்சிகளுக்கு தீங்கு விளைவிக்காமல் பயிர்களைப் பாதுகாக்கும்.",
        te: "వేప నూనె ఒక సహజ కీటనాశిని, ఇది ఉపయోగకరమైన కీటకాలను హాని చేయకుండా పంటలను రక్షిస్తుంది.",
        kn: "ಬೇವಿನ ಎಣ್ಣೆ ನೈಸರ್ಗಿಕ ಕೀಟನಾಶಕ, ಉಪಯೋಗಕರ ಕೀಟಗಳಿಗೆ ಹಾನಿಯಾಗದೆ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸುತ್ತದೆ.",
        ml: "വേപ്പെണ്ണ പ്രകൃതിദത്ത കീടനാശിനിയാണ്, ഉപകാരപ്രദമായ പുഴുക്കൾക്ക് ദോഷം വരുത്താതെ വിളകളെ സംരക്ഷിക്കുന്നു."
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isVisible) {
        let nextTip;
        do {
          nextTip = Math.floor(Math.random() * farmingTips.length);
        } while (tipHistory.includes(nextTip) && tipHistory.length < farmingTips.length - 1);
        
        setCurrentTip(nextTip);
        setTipHistory(prev => [...prev.slice(-3), nextTip]);
      }
    }, 8000); // Change tip every 8 seconds

    return () => clearInterval(interval);
  }, [isVisible, tipHistory, farmingTips.length]);

  if (!isVisible) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsVisible(true)}
          className="rounded-full w-12 h-12 bg-green-600 hover:bg-green-700 shadow-lg"
        >
          <Lightbulb className="w-5 h-5" />
        </Button>
      </motion.div>
    );
  }

  const tip = farmingTips[currentTip];
  const tipText = tip.language[selectedLanguage as keyof typeof tip.language] || tip.text;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="fixed bottom-6 right-6 z-50 w-80"
      >
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{tip.icon}</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                  <Lightbulb className="w-3 h-3 mr-1" />
                  Krishi Tip
                </Badge>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-green-100"
                  onClick={() => {
                    const nextTip = (currentTip + 1) % farmingTips.length;
                    setCurrentTip(nextTip);
                  }}
                >
                  <ChevronRight className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-green-100"
                  onClick={() => setIsVisible(false)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs">
                {tip.category}
              </Badge>
              <p className="text-sm text-green-800 leading-relaxed">
                {tipText}
              </p>
            </div>

            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-green-600">
                Tip {currentTip + 1} of {farmingTips.length}
              </span>
              <div className="flex space-x-1">
                {farmingTips.slice(0, 3).map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === currentTip % 3 ? 'bg-green-500' : 'bg-green-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}