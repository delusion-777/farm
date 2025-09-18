import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  BookOpen, 
  Leaf, 
  Droplets, 
  Bug, 
  Recycle, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  HelpCircle,
  Coins,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface LibraryItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'traditional' | 'organic' | 'harmful' | 'soil' | 'water';
  readTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isRead: boolean;
  quizAvailable: boolean;
}

interface Quiz {
  id: string;
  topicId: string;
  title: string;
  questions: QuizQuestion[];
  coinReward: number;
  passingScore: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface EnhancedLibraryProps {
  onCoinsUpdate: (coins: number) => void;
  currentCoins: number;
}

export function EnhancedLibrary({ onCoinsUpdate, currentCoins }: EnhancedLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState('traditional');
  const [readItems, setReadItems] = useState<string[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const libraryItems: LibraryItem[] = [
    {
      id: 'traditional-farming',
      title: 'Traditional Indian Farming Methods',
      description: 'Ancient wisdom of sustainable agriculture practiced for thousands of years',
      content: `Traditional Indian farming has been practiced for over 5000 years. Our ancestors developed sustainable methods that worked in harmony with nature:

**Crop Rotation (Fasal Chakra):**
- Rotating between cereals, legumes, and cash crops
- Prevents soil nutrient depletion
- Breaks pest and disease cycles
- Increases overall farm productivity by 20-30%

**Mixed Cropping:**
- Growing 2-3 crops together (like wheat + gram)
- Reduces risk of total crop failure
- Better use of soil nutrients
- Natural pest control

**Organic Manures:**
- Cow dung compost (Gobar khad)
- Green manure from legume crops
- Farm yard manure (FYM)
- Vermicompost using earthworms

**Natural Pest Control:**
- Neem oil for insect control
- Marigold flowers to repel pests
- Traditional smoke methods
- Encouraging beneficial insects`,
      category: 'traditional',
      readTime: 8,
      difficulty: 'beginner',
      isRead: false,
      quizAvailable: true
    },
    {
      id: 'organic-fertilizers',
      title: 'Homemade Organic Fertilizers',
      description: 'Learn to make powerful organic fertilizers at home using kitchen waste and farm materials',
      content: `Create nutrient-rich fertilizers without chemicals:

**Compost Making:**
1. Collect kitchen waste, dry leaves, cow dung
2. Layer them in a pit (2:1:1 ratio)
3. Turn every 15 days, keep moist
4. Ready in 3-4 months

**Liquid Fertilizers:**
- **Panchagavya**: Mix cow urine, dung, milk, curd, ghee
- **Jeevamrit**: Cow dung + urine + jaggery + gram flour + water
- **Banana Peel Fertilizer**: Rich in potassium for flowering

**Vermicompost:**
- Use earthworms to decompose organic matter
- Ready in 45-60 days
- Rich in NPK and micronutrients
- Improves soil structure

**Green Manure:**
- Grow legume crops (Dhaincha, Sesbania)
- Bury them in soil before flowering
- Adds nitrogen naturally
- Improves soil organic content`,
      category: 'organic',
      readTime: 10,
      difficulty: 'intermediate',
      isRead: false,
      quizAvailable: true
    },
    {
      id: 'chemical-fertilizer-harm',
      title: 'Harmful Effects of Chemical Fertilizers',
      description: 'Understanding how synthetic chemicals damage soil health and long-term productivity',
      content: `Chemical fertilizers provide quick results but cause long-term damage:

**Soil Health Damage:**
- Kills beneficial soil microorganisms
- Reduces soil organic matter
- Makes soil acidic or alkaline
- Decreases water retention capacity

**Environmental Impact:**
- Groundwater contamination (nitrates)
- River and lake pollution (eutrophication)
- Air pollution from manufacturing
- Greenhouse gas emissions

**Economic Problems:**
- Increasing input costs every year
- Soil addiction to chemicals
- Reduced natural soil fertility
- Need for more chemicals over time

**Health Concerns:**
- Chemical residues in food
- Respiratory problems for farmers
- Skin allergies from exposure
- Long-term health complications

**Better Alternatives:**
- Gradual transition to organic methods
- Soil testing before fertilizer use
- Balanced organic nutrition
- Integrated nutrient management`,
      category: 'harmful',
      readTime: 7,
      difficulty: 'intermediate',
      isRead: false,
      quizAvailable: true
    },
    {
      id: 'soil-management',
      title: 'Soil Health and Management',
      description: 'Complete guide to maintaining and improving soil fertility naturally',
      content: `Healthy soil is the foundation of sustainable farming:

**Soil Testing:**
- Test pH levels (6.5-7.5 is ideal)
- Check NPK content
- Organic matter percentage
- Micronutrient levels

**Soil Improvement Methods:**
- **Mulching**: Cover soil with organic matter
- **Cover Cropping**: Grow crops to protect soil
- **Contour Farming**: Prevent soil erosion
- **Terracing**: For hilly areas

**Natural Soil Conditioners:**
- Gypsum for saline soils
- Lime for acidic soils
- Organic matter for all soil types
- Rock phosphate for phosphorus

**Soil Conservation:**
- Avoid over-tillage
- Maintain permanent vegetation strips
- Plant trees as windbreaks
- Implement crop rotation

**Signs of Healthy Soil:**
- Dark color with good structure
- Good water infiltration
- Presence of earthworms
- Rich organic smell`,
      category: 'soil',
      readTime: 12,
      difficulty: 'advanced',
      isRead: false,
      quizAvailable: true
    },
    {
      id: 'water-conservation',
      title: 'Traditional Water Conservation',
      description: 'Ancient and modern techniques for efficient water use in farming',
      content: `Water is precious - use it wisely:

**Traditional Methods:**
- **Drip Irrigation**: Save 30-50% water
- **Sprinkler Systems**: Uniform water distribution
- **Furrow Irrigation**: For row crops
- **Basin Irrigation**: For tree crops

**Rainwater Harvesting:**
- Farm ponds for water storage
- Contour bunding to capture runoff
- Percolation tanks for groundwater recharge
- Roof water harvesting

**Mulching Benefits:**
- Reduces evaporation by 70%
- Maintains soil moisture
- Organic mulch improves soil
- Reduces irrigation frequency

**Crop Selection:**
- Choose drought-tolerant varieties
- Match crops to rainfall patterns
- Use local/native varieties
- Plan according to water availability

**Efficient Practices:**
- Irrigate early morning or evening
- Monitor soil moisture levels
- Use moisture meters
- Avoid water logging`,
      category: 'water',
      readTime: 9,
      difficulty: 'intermediate',
      isRead: false,
      quizAvailable: true
    }
  ];

  const quizzes: Quiz[] = [
    {
      id: 'traditional-farming-quiz',
      topicId: 'traditional-farming',
      title: 'Traditional Farming Methods Quiz',
      coinReward: 100,
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What is the main benefit of crop rotation in traditional farming?',
          options: [
            'Faster growth of crops',
            'Prevents soil nutrient depletion',
            'Reduces water requirement',
            'Increases chemical fertilizer efficiency'
          ],
          correctAnswer: 1,
          explanation: 'Crop rotation prevents soil nutrient depletion by allowing different crops to use and replenish different nutrients.'
        },
        {
          id: 'q2',
          question: 'Which traditional method helps in natural pest control?',
          options: [
            'Using more water',
            'Planting marigold flowers',
            'Adding more chemical pesticides',
            'Harvesting crops early'
          ],
          correctAnswer: 1,
          explanation: 'Marigold flowers naturally repel many harmful insects and pests when planted around crops.'
        },
        {
          id: 'q3',
          question: 'What percentage increase in productivity can mixed cropping provide?',
          options: ['10-15%', '20-30%', '40-50%', '60-70%'],
          correctAnswer: 1,
          explanation: 'Mixed cropping can increase overall farm productivity by 20-30% through better resource utilization.'
        }
      ]
    },
    {
      id: 'organic-fertilizer-quiz',
      topicId: 'organic-fertilizers',
      title: 'Organic Fertilizers Quiz',
      coinReward: 120,
      passingScore: 75,
      questions: [
        {
          id: 'q1',
          question: 'How long does it take to prepare good compost?',
          options: ['1-2 months', '3-4 months', '6-8 months', '1 year'],
          correctAnswer: 1,
          explanation: 'Good quality compost takes 3-4 months to decompose properly when turned regularly.'
        },
        {
          id: 'q2',
          question: 'Which ingredient is NOT used in Panchagavya?',
          options: ['Cow dung', 'Chemical fertilizer', 'Cow milk', 'Cow ghee'],
          correctAnswer: 1,
          explanation: 'Panchagavya is made entirely from cow products - no chemicals are used.'
        },
        {
          id: 'q3',
          question: 'Vermicompost is ready in how many days?',
          options: ['15-30 days', '45-60 days', '90-120 days', '6 months'],
          correctAnswer: 1,
          explanation: 'Vermicompost using earthworms is typically ready in 45-60 days.'
        }
      ]
    }
  ];

  const markAsRead = (itemId: string) => {
    if (!readItems.includes(itemId)) {
      setReadItems([...readItems, itemId]);
    }
  };

  const startQuiz = (topicId: string) => {
    const quiz = quizzes.find(q => q.topicId === topicId);
    if (quiz && !completedQuizzes.includes(quiz.id)) {
      setActiveQuiz(quiz);
      setQuizAnswers({});
      setShowQuizResult(false);
    }
  };

  const submitQuiz = () => {
    if (!activeQuiz) return;

    const correctAnswers = activeQuiz.questions.reduce((count, question) => {
      return count + (quizAnswers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);

    const score = (correctAnswers / activeQuiz.questions.length) * 100;
    
    if (score >= activeQuiz.passingScore) {
      onCoinsUpdate(currentCoins + activeQuiz.coinReward);
      setCompletedQuizzes([...completedQuizzes, activeQuiz.id]);
      toast.success(`Quiz passed! You earned ${activeQuiz.coinReward} coins!`);
    } else {
      toast.error(`Quiz failed. You need ${activeQuiz.passingScore}% to pass. Try again!`);
    }

    setShowQuizResult(true);
  };

  const categories = [
    { id: 'traditional', name: 'Traditional Methods', icon: Leaf, color: 'bg-green-100 text-green-700' },
    { id: 'organic', name: 'Organic Fertilizers', icon: Recycle, color: 'bg-blue-100 text-blue-700' },
    { id: 'harmful', name: 'Chemical Hazards', icon: AlertTriangle, color: 'bg-red-100 text-red-700' },
    { id: 'soil', name: 'Soil Management', icon: Droplets, color: 'bg-amber-100 text-amber-700' },
    { id: 'water', name: 'Water Conservation', icon: Droplets, color: 'bg-cyan-100 text-cyan-700' }
  ];

  const filteredItems = libraryItems.filter(item => item.category === selectedCategory);

  if (activeQuiz && !showQuizResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center space-x-3">
                <HelpCircle className="w-6 h-6" />
                <span>{activeQuiz.title}</span>
              </CardTitle>
              <CardDescription className="text-blue-100">
                Answer all questions correctly to earn {activeQuiz.coinReward} coins
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                {activeQuiz.questions.map((question, index) => (
                  <div key={question.id} className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      {index + 1}. {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label 
                          key={optionIndex}
                          className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={optionIndex}
                            onChange={(e) => setQuizAnswers({
                              ...quizAnswers,
                              [question.id]: parseInt(e.target.value)
                            })}
                            className="text-blue-600"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex space-x-4">
                <Button onClick={submitQuiz} className="bg-blue-600 hover:bg-blue-700">
                  <Award className="w-4 h-4 mr-2" />
                  Submit Quiz
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveQuiz(null)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-green-800">Krishi Vidya Library</h1>
          <p className="text-lg text-green-600 max-w-2xl mx-auto">
            Discover ancient wisdom and sustainable farming practices passed down through generations
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 h-auto flex flex-col space-y-2 ${
                selectedCategory === category.id ? 'bg-green-600 hover:bg-green-700' : ''
              }`}
            >
              <category.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isRead = readItems.includes(item.id);
            const hasQuiz = item.quizAvailable;
            const quizCompleted = hasQuiz && completedQuizzes.includes(`${item.id}-quiz`);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                        <CardDescription className="text-sm">{item.description}</CardDescription>
                      </div>
                      <div className="flex flex-col space-y-1">
                        {isRead && <Badge variant="secondary" className="text-xs"><CheckCircle className="w-3 h-3 mr-1" />Read</Badge>}
                        {quizCompleted && <Badge className="text-xs bg-green-600"><Award className="w-3 h-3 mr-1" />Quiz Done</Badge>}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.readTime} min</span>
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {item.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="prose prose-sm max-w-none text-gray-700">
                      <div className="line-clamp-4">
                        {item.content.split('\n').slice(0, 3).join('\n')}...
                      </div>
                    </div>

                    <Accordion type="single" collapsible>
                      <AccordionItem value="content" className="border-0">
                        <AccordionTrigger 
                          className="text-green-600 hover:text-green-700 py-2"
                          onClick={() => markAsRead(item.id)}
                        >
                          Read Full Content
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                            {item.content}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {hasQuiz && (
                      <div className="pt-4 border-t">
                        {quizCompleted ? (
                          <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Quiz Completed!</span>
                          </div>
                        ) : (
                          <Button 
                            onClick={() => startQuiz(item.id)}
                            disabled={!isRead}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            size="sm"
                          >
                            <HelpCircle className="w-4 h-4 mr-2" />
                            Take Quiz (+{quizzes.find(q => q.topicId === item.id)?.coinReward || 100} coins)
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Reading Progress */}
        <Card className="bg-gradient-to-r from-green-100 to-emerald-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-800">Your Learning Progress</h3>
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-600">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {readItems.length}/{libraryItems.length} Articles Read
                </Badge>
                <Badge className="bg-blue-600">
                  <Award className="w-3 h-3 mr-1" />
                  {completedQuizzes.length}/{quizzes.length} Quizzes Done
                </Badge>
              </div>
            </div>
            <Progress 
              value={(readItems.length / libraryItems.length) * 100} 
              className="h-3"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}