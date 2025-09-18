import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  ShoppingCart, 
  Coins, 
  Package, 
  Truck,
  Award,
  QrCode,
  CheckCircle,
  Clock,
  Percent,
  Leaf,
  Droplets,
  Wrench
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface StoreItem {
  id: number;
  name: string;
  description: string;
  coinCost: number;
  discountPercentage: number;
  category: 'seeds' | 'tools' | 'fertilizer' | 'equipment' | 'training';
  icon: React.ReactNode;
  realWorldBenefit: string;
  inStock: boolean;
  popularity: number;
  language: {
    en: { name: string; description: string; benefit: string };
    hi: { name: string; description: string; benefit: string };
    ta: { name: string; description: string; benefit: string };
    te: { name: string; description: string; benefit: string };
    bn: { name: string; description: string; benefit: string };
  };
}

interface GovernmentStoreProps {
  currentCoins: number;
  onCoinsUpdate: (coins: number) => void;
  selectedLanguage: string;
}

export function GovernmentStore({ currentCoins, onCoinsUpdate, selectedLanguage }: GovernmentStoreProps) {
  const [cart, setCart] = useState<number[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const storeItems: StoreItem[] = [
    {
      id: 1,
      name: "Organic Manure Pack",
      description: "Premium cow dung compost for soil enrichment",
      coinCost: 50,
      discountPercentage: 10,
      category: 'fertilizer',
      icon: <Leaf className="w-5 h-5" />,
      realWorldBenefit: "10% discount at government agricultural centers",
      inStock: true,
      popularity: 95,
      language: {
        en: { 
          name: "Organic Manure Pack", 
          description: "Premium cow dung compost for soil enrichment",
          benefit: "10% discount at government agricultural centers"
        },
        hi: { 
          name: "जैविक खाद पैकेज", 
          description: "मिट्टी सुधार के लिए प्रीमियम गोबर खाद",
          benefit: "सरकारी कृषि केंद्रों पर 10% छूट"
        },
        ta: { 
          name: "இயற்கை உரப் பொதி", 
          description: "மண் மேம்பாட்டிற்கான தரமான மாட்டு சாண உரம்",
          benefit: "அரசு வேளாண் மையங்களில் 10% தள்ளுபடி"
        },
        te: { 
          name: "సేంద్రీయ ఎరువుల ప్యాకేజీ", 
          description: "మట్టి మెరుగుదలకు ప్రీమియం ఆవు పేడ కంపోస్ట్",
          benefit: "ప్రభుత్వ వ్యవసాయ కేంద్రాలలో 10% తగ్గింపు"
        },
        bn: { 
          name: "জৈব সার প্যাকেজ", 
          description: "মাটি উন্নতির জন্য প্রিমিয়াম গোবর সার",
          benefit: "সরকারি কৃষি কেন্দ্রে ১০% ছাড়"
        }
      }
    },
    {
      id: 2,
      name: "Neem Oil Bio-Pesticide",
      description: "Natural pest control solution from neem extract",
      coinCost: 70,
      discountPercentage: 15,
      category: 'fertilizer',
      icon: <Droplets className="w-5 h-5" />,
      realWorldBenefit: "15% discount on neem-based pesticides",
      inStock: true,
      popularity: 88,
      language: {
        en: { 
          name: "Neem Oil Bio-Pesticide", 
          description: "Natural pest control solution from neem extract",
          benefit: "15% discount on neem-based pesticides"
        },
        hi: { 
          name: "नीम तेल बायो-कीटनाशक", 
          description: "नीम के अर्क से प्राकृतिक कीट नियंत्रण समाधान",
          benefit: "नीम आधारित कीटनाशकों पर 15% छूट"
        },
        ta: { 
          name: "வேப்ப எண்ணெய் உயிர் பூச்சிக்கொல்லி", 
          description: "வேப்ப சாற்றிலிருந்து இயற்கை பூச்சி கட்டுப்பாடு",
          benefit: "வேப்ப அடிப்படையிலான பூச்சிக்கொல்லிகளில் 15% தள்ளுபடி"
        },
        te: { 
          name: "వేప నూనె బయో-పెస్టిసైడ్", 
          description: "వేప సారం నుండి సహజ కీట నియంత్రణ పరిష్కారం",
          benefit: "వేప ఆధారిత కీటనాశకాలపై 15% తగ్గింపు"
        },
        bn: { 
          name: "নিম তেল বায়ো-কীটনাশক", 
          description: "নিমের নির্যাস থেকে প্রাকৃতিক কীট নিয়ন্ত্রণ",
          benefit: "নিম ভিত্তিক কীটনাশকে ১৫% ছাড়"
        }
      }
    },
    {
      id: 3,
      name: "Improved Seed Varieties",
      description: "High-yield rice, wheat, and pulse seeds",
      coinCost: 100,
      discountPercentage: 20,
      category: 'seeds',
      icon: <Package className="w-5 h-5" />,
      realWorldBenefit: "20% discount on certified seeds",
      inStock: true,
      popularity: 92,
      language: {
        en: { 
          name: "Improved Seed Varieties", 
          description: "High-yield rice, wheat, and pulse seeds",
          benefit: "20% discount on certified seeds"
        },
        hi: { 
          name: "उन्नत बीज किस्में", 
          description: "उच्च उत्पादन वाले चावल, गेहूं और दाल के बीज",
          benefit: "प्रमाणित बीजों पर 20% छूट"
        },
        ta: { 
          name: "மேம்பட்ட விதை வகைகள்", 
          description: "அதிக விளைச்சல் தரும் அரிசி, கோதுமை மற்றும் பருப்பு விதைகள்",
          benefit: "சான்றிதழ் பெற்ற விதைகளில் 20% தள்ளுபடி"
        },
        te: { 
          name: "మెరుగైన విత్తన రకాలు", 
          description: "అధిక దిగుబడి వరి, గోధుమ మరియు పప్పు విత్తనాలు",
          benefit: "ధృవీకరించబడిన విత్తనాలపై 20% తగ్గింపు"
        },
        bn: { 
          name: "উন্নত বীজের জাত", 
          description: "উচ্চ ফলনশীল ধান, গম এবং ডালের বীজ",
          benefit: "প্রত্যয়িত বীজে ২০% ছাড়"
        }
      }
    },
    {
      id: 4,
      name: "Hand Tools Set",
      description: "Essential farming tools: hoe, sickle, watering can",
      coinCost: 150,
      discountPercentage: 20,
      category: 'tools',
      icon: <Wrench className="w-5 h-5" />,
      realWorldBenefit: "20% discount on agricultural hand tools",
      inStock: true,
      popularity: 85,
      language: {
        en: { 
          name: "Hand Tools Set", 
          description: "Essential farming tools: hoe, sickle, watering can",
          benefit: "20% discount on agricultural hand tools"
        },
        hi: { 
          name: "हस्त उपकरण सेट", 
          description: "आवश्यक खेती उपकरण: कुदाल, हंसिया, पानी का डिब्बा",
          benefit: "कृषि हस्त उपकरणों पर 20% छूट"
        },
        ta: { 
          name: "கை கருவிகள் தொகுப்பு", 
          description: "அத்தியாவசிய விவசாய கருவிகள்: மண்வெட்டி, அரிவாள், தண்ணீர் குடம்",
          benefit: "விவசாய கை கருவிகளில் 20% தள்ளுபடி"
        },
        te: { 
          name: "చేతి పనిముట్ల సెట్", 
          description: "అవసరమైన వ్యవసాయ పనిముట్లు: పార, కొడవలి, నీటి డబ్బా",
          benefit: "వ్యవసాయ చేతి పనిముట్లపై 20% తగ్గింపు"
        },
        bn: { 
          name: "হাতের সরঞ্জাম সেট", 
          description: "প্রয়োজনীয় কৃষি সরঞ্জাম: কোদাল, কাস্তে, জলের পাত্র",
          benefit: "কৃষি হাতিয়ারে ২০% ছাড়"
        }
      }
    },
    {
      id: 5,
      name: "Drip Irrigation Kit",
      description: "Water-efficient irrigation system for small farms",
      coinCost: 500,
      discountPercentage: 30,
      category: 'equipment',
      icon: <Droplets className="w-5 h-5" />,
      realWorldBenefit: "30% subsidy on drip irrigation systems",
      inStock: true,
      popularity: 78,
      language: {
        en: { 
          name: "Drip Irrigation Kit", 
          description: "Water-efficient irrigation system for small farms",
          benefit: "30% subsidy on drip irrigation systems"
        },
        hi: { 
          name: "ड्रिप सिंचाई किट", 
          description: "छोटे खेतों के लिए जल-कुशल सिंचाई प्रणाली",
          benefit: "ड्रिप सिंचाई प्रणालियों पर 30% सब्सिडी"
        },
        ta: { 
          name: "துளி நீர்ப்பாசன கிட்", 
          description: "சிறு விவசாயத்திற்கான நீர் சிக்கன பாசன முறை",
          benefit: "துளி நீர்ப்பாசன அமைப்புகளில் 30% மானியம்"
        },
        te: { 
          name: "డ్రిప్ ఇరిగేషన్ కిట్", 
          description: "చిన్న వ్యవసాయ క్షేత్రాలకు నీటి-సమర్థ నీటిపారుదల వ్యవస్థ",
          benefit: "డ్రిప్ ఇరిగేషన్ సిస్టమ్‌లపై 30% సబ్సిడీ"
        },
        bn: { 
          name: "ড্রিপ সেচ কিট", 
          description: "ছোট খামারের জন্য জল-সাশ্রয়ী সেচ ব্যবস্থা",
          benefit: "ড্রিপ সেচ সিস্টেমে ৩০% ভর্তুকি"
        }
      }
    },
    {
      id: 6,
      name: "Tractor Rental Hours",
      description: "10 hours of subsidized tractor rental",
      coinCost: 800,
      discountPercentage: 40,
      category: 'equipment',
      icon: <Truck className="w-5 h-5" />,
      realWorldBenefit: "40% discount on tractor rental services",
      inStock: true,
      popularity: 70,
      language: {
        en: { 
          name: "Tractor Rental Hours", 
          description: "10 hours of subsidized tractor rental",
          benefit: "40% discount on tractor rental services"
        },
        hi: { 
          name: "ट्रैक्टर किराया घंटे", 
          description: "10 घंटे की सब्सिडी युक्त ट्रैक्टर किराया",
          benefit: "ट्रैक्टर किराया सेवाओं पर 40% छूट"
        },
        ta: { 
          name: "டிராக்டர் வாடகை மணிநேரங்கள்", 
          description: "10 மணிநேர மானிய டிராக்டர் வாடகை",
          benefit: "டிராக்டர் வாடகை சேவைகளில் 40% தள்ளுபடி"
        },
        te: { 
          name: "ట్రాక్టర్ అద్దె గంటలు", 
          description: "10 గంటల సబ్సిడీ ట్రాక్టర్ అద్దె",
          benefit: "ట్రాక్టర్ అద్దె సేవలపై 40% తగ్గింపు"
        },
        bn: { 
          name: "ট্র্যাক্টর ভাড়ার ঘন্টা", 
          description: "১০ ঘন্টার ভর্তুকিযুক্ত ট্র্যাক্টর ভাড়া",
          benefit: "ট্র্যাক্টর ভাড়া সেবায় ৪০% ছাড়"
        }
      }
    },
    {
      id: 7,
      name: "Government Training Credit",
      description: "Free entry to agricultural workshops and seminars",
      coinCost: 1000,
      discountPercentage: 100,
      category: 'training',
      icon: <Award className="w-5 h-5" />,
      realWorldBenefit: "Free access to government training programs",
      inStock: true,
      popularity: 65,
      language: {
        en: { 
          name: "Government Training Credit", 
          description: "Free entry to agricultural workshops and seminars",
          benefit: "Free access to government training programs"
        },
        hi: { 
          name: "सरकारी प्रशिक्षण क्रेडिट", 
          description: "कृषि कार्यशालाओं और सेमिनारों में मुफ्त प्रवेश",
          benefit: "सरकारी प्रशिक्षण कार्यक्रमों तक मुफ्त पहुंच"
        },
        ta: { 
          name: "அரசு பயிற்சி கிரெடிட்", 
          description: "விவசாய பயிற்சி வகுப்புகள் மற்றும் கருத்தரங்குகளில் இலவச நுழைவு",
          benefit: "அரசு பயிற்சி திட்டங்களுக்கு இலவச அணுகல்"
        },
        te: { 
          name: "ప్రభుత్వ శిక్షణ క్రెడిట్", 
          description: "వ్యవసాయ వర్క్‌షాప్‌లు మరియు సెమినార్లకు ఉచిత ప్రవేశం",
          benefit: "ప్రభుత్వ శిక్షణ కార్యక్రమాలకు ఉచిత ప్రవేశం"
        },
        bn: { 
          name: "সরকারি প্রশিক্ষণ ক্রেডিট", 
          description: "কৃষি কর্মশালা এবং সেমিনারে বিনামূল্যে প্রবেশাধিকার",
          benefit: "সরকারি প্রশিক্ষণ কর্মসূচিতে বিনামূল্যে প্রবেশাধিকার"
        }
      }
    },
    {
      id: 8,
      name: "Farmer Recognition Certificate",
      description: "Official government recognition for sustainable farming",
      coinCost: 1500,
      discountPercentage: 0,
      category: 'training',
      icon: <Award className="w-5 h-5" />,
      realWorldBenefit: "Official government recognition and benefits",
      inStock: true,
      popularity: 90,
      language: {
        en: { 
          name: "Farmer Recognition Certificate", 
          description: "Official government recognition for sustainable farming",
          benefit: "Official government recognition and benefits"
        },
        hi: { 
          name: "किसान पहचान प्रमाणपत्र", 
          description: "टिकाऊ खेती के लिए आधिकारिक सरकारी मान्यता",
          benefit: "आधिकारिक सरकारी मान्यता और लाभ"
        },
        ta: { 
          name: "விவசாயி அங்கீகார சான்றிதழ்", 
          description: "நிலையான விவசாயத்திற்கான அரசு அங்கீகாரம்",
          benefit: "அரசு அங்கீகாரம் மற்றும் நன்மைகள்"
        },
        te: { 
          name: "రైతు గుర్తింపు సర్టిఫికేట్", 
          description: "స్థిరమైన వ్యవసాయానికి అధికారిक ప్రభుత్వ గుర్తింపు",
          benefit: "అధికారిక ప్రభుత్వ గుర్తింపు మరియు ప్రయోజనాలు"
        },
        bn: { 
          name: "কৃষক স্বীকৃতি সনদ", 
          description: "টেকসই কৃষিকাজের জন্য সরকারি স্বীকৃতি",
          benefit: "সরকারি স্বীকৃতি এবং সুবিধা"
        }
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: ShoppingCart },
    { id: 'seeds', name: 'Seeds', icon: Package },
    { id: 'tools', name: 'Tools', icon: Wrench },
    { id: 'fertilizer', name: 'Fertilizer', icon: Leaf },
    { id: 'equipment', name: 'Equipment', icon: Truck },
    { id: 'training', name: 'Training', icon: Award }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? storeItems 
    : storeItems.filter(item => item.category === selectedCategory);

  const addToCart = (itemId: number) => {
    const item = storeItems.find(i => i.id === itemId);
    if (!item) return;
    
    if (item.coinCost > currentCoins) {
      toast.error(`Not enough coins! You need ${item.coinCost} coins.`);
      return;
    }
    
    setCart(prev => [...prev, itemId]);
    toast.success("Item added to cart!");
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => prev.filter(id => id !== itemId));
  };

  const purchaseItems = () => {
    const totalCost = cart.reduce((sum, itemId) => {
      const item = storeItems.find(i => i.id === itemId);
      return sum + (item?.coinCost || 0);
    }, 0);

    if (totalCost > currentCoins) {
      toast.error("Not enough coins for this purchase!");
      return;
    }

    onCoinsUpdate(currentCoins - totalCost);
    setPurchasedItems(prev => [...prev, ...cart]);
    setCart([]);
    toast.success("Items purchased successfully! QR codes generated for redemption.");
  };

  const getItemText = (item: StoreItem) => {
    const lang = selectedLanguage as keyof typeof item.language;
    return item.language[lang] || item.language.en;
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2 flex items-center space-x-3">
            <ShoppingCart className="w-8 h-8" />
            <span>Government Discount Store</span>
          </h2>
          <p className="text-green-100 mb-4">
            Redeem your coins for real discounts on farming supplies and training
          </p>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-yellow-500 text-white">
              <Coins className="w-3 h-3 mr-1" />
              {currentCoins} Coins Available
            </Badge>
            <Badge variant="secondary" className="bg-green-500 text-white">
              <ShoppingCart className="w-3 h-3 mr-1" />
              {cart.length} Items in Cart
            </Badge>
          </div>
        </div>
      </div>

      {/* Shopping Cart */}
      {cart.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Shopping Cart ({cart.length} items)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {cart.map((itemId, index) => {
                const item = storeItems.find(i => i.id === itemId);
                if (!item) return null;
                const itemText = getItemText(item);
                
                return (
                  <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="font-medium">{itemText.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-bold">{item.coinCost} coins</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeFromCart(itemId)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                Total: {cart.reduce((sum, itemId) => {
                  const item = storeItems.find(i => i.id === itemId);
                  return sum + (item?.coinCost || 0);
                }, 0)} coins
              </div>
              <Button onClick={purchaseItems} className="bg-green-600 hover:bg-green-700">
                <QrCode className="w-4 h-4 mr-2" />
                Purchase & Generate QR
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-white/80">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center space-x-1 text-xs md:text-sm"
            >
              <category.icon className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const itemText = getItemText(item);
              const isInCart = cart.includes(item.id);
              const isPurchased = purchasedItems.includes(item.id);
              
              return (
                <Card 
                  key={item.id} 
                  className={`bg-white/90 backdrop-blur hover:shadow-lg transition-shadow ${
                    isPurchased ? 'border-green-400 bg-green-50' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <div>
                          <CardTitle className="text-lg">{itemText.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {item.coinCost}
                        </div>
                        <div className="text-xs text-muted-foreground">coins</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {itemText.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Discount:</span>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                          <Percent className="w-3 h-3 mr-1" />
                          {item.discountPercentage}% OFF
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Popularity:</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={item.popularity} className="w-16 h-2" />
                          <span className="text-xs">{item.popularity}%</span>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-blue-700">
                          <strong>Real Benefit:</strong> {itemText.benefit}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      {isPurchased ? (
                        <Button 
                          variant="outline" 
                          className="flex-1 bg-green-50 text-green-700 border-green-300"
                          disabled
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Purchased
                        </Button>
                      ) : isInCart ? (
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          In Cart
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => addToCart(item.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          disabled={item.coinCost > currentCoins}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Purchased Items QR Codes */}
      {purchasedItems.length > 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <QrCode className="w-5 h-5" />
              <span>Your QR Codes ({purchasedItems.length} items)</span>
            </CardTitle>
            <CardDescription>
              Show these QR codes at government agricultural centers to claim your discounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {purchasedItems.slice(0, 8).map((itemId, index) => {
                const item = storeItems.find(i => i.id === itemId);
                if (!item) return null;
                
                return (
                  <div key={index} className="bg-white p-4 rounded-lg text-center border">
                    <div className="w-16 h-16 bg-gray-200 mx-auto mb-2 rounded flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-xs font-medium">{getItemText(item).name}</p>
                    <p className="text-xs text-green-600">{item.discountPercentage}% OFF</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}