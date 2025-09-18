import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  BookOpen, 
  Leaf, 
  Droplets, 
  Sun,
  Bug,
  Recycle,
  Tractor,
  Clock,
  Globe
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'soil', name: 'Soil Management', icon: Globe },
    { id: 'watering', name: 'Water Conservation', icon: Droplets },
    { id: 'pest', name: 'Pest Control', icon: Bug },
    { id: 'sustainable', name: 'Sustainable Practices', icon: Recycle },
    { id: 'traditional', name: 'Traditional Methods', icon: Clock },
    { id: 'modern', name: 'Modern Techniques', icon: Tractor }
  ];

  const articles = [
    {
      id: 1,
      title: "Soil Health Fundamentals",
      category: 'soil',
      difficulty: 'Beginner',
      readTime: '8 min',
      description: "Learn the basics of soil composition, pH levels, and nutrient management for optimal crop growth.",
      content: `
        # Soil Health Fundamentals

        Healthy soil is the foundation of successful farming. Understanding your soil's composition and needs is crucial for sustainable agriculture.

        ## Key Components of Healthy Soil

        ### 1. Soil Composition
        - **Sand (25-50%)**: Provides drainage and aeration
        - **Silt (28-50%)**: Retains nutrients and water
        - **Clay (7-27%)**: Stores nutrients and organic matter
        - **Organic Matter (3-5%)**: Essential for soil life

        ### 2. pH Levels
        Most crops thrive in slightly acidic to neutral soil (pH 6.0-7.0). Test your soil annually and adjust with:
        - **Lime**: To raise pH in acidic soils
        - **Sulfur**: To lower pH in alkaline soils

        ### 3. Nutrient Management
        **Primary Nutrients:**
        - Nitrogen (N): Promotes leaf growth
        - Phosphorus (P): Supports root development
        - Potassium (K): Enhances disease resistance

        **Secondary Nutrients:**
        - Calcium, Magnesium, Sulfur

        ## Testing Your Soil
        1. Collect samples from multiple locations
        2. Test for pH, nutrients, and organic matter
        3. Interpret results with local agricultural extension
        4. Develop amendment plan based on findings

        ## Improving Soil Health
        - Add compost regularly
        - Practice crop rotation
        - Use cover crops
        - Minimize tillage
        - Maintain proper drainage
      `,
      tags: ['soil', 'basics', 'pH', 'nutrients', 'testing']
    },
    {
      id: 2,
      title: "Water-Efficient Irrigation Systems",
      category: 'watering',
      difficulty: 'Intermediate',
      readTime: '12 min',
      description: "Explore modern irrigation techniques that conserve water while maximizing crop yields.",
      content: `
        # Water-Efficient Irrigation Systems

        Water conservation is critical for sustainable farming. Modern irrigation systems can reduce water usage by 30-50% while improving crop yields.

        ## Drip Irrigation
        
        ### Benefits:
        - 90-95% water efficiency
        - Reduced weed growth
        - Lower disease pressure
        - Precise nutrient delivery

        ### Components:
        - Main water line
        - Pressure regulators
        - Filters
        - Drip tubing and emitters
        - Timers and controllers

        ### Installation Tips:
        1. Plan layout based on crop spacing
        2. Install pressure regulators (8-15 PSI)
        3. Use self-flushing dripline
        4. Bury main lines 12-18 inches deep

        ## Smart Irrigation Controllers

        ### Soil Moisture Sensors
        - Measure actual soil moisture
        - Prevent over-watering
        - Reduce water waste by 20-30%

        ### Weather-Based Controllers
        - Adjust for rainfall
        - Account for evapotranspiration
        - Seasonal scheduling adjustments

        ## Traditional Water Conservation

        ### Mulching
        - Reduces evaporation by 50-70%
        - Organic mulches add nutrients
        - Apply 2-4 inches around plants

        ### Rainwater Harvesting
        - Collect roof runoff
        - Store in tanks or ponds
        - Filter for irrigation use

        ## Calculating Water Needs
        **Formula**: ET × Kc × Area = Water Requirement
        - ET: Reference evapotranspiration
        - Kc: Crop coefficient
        - Area: Irrigated area
      `,
      tags: ['irrigation', 'water conservation', 'drip systems', 'smart controllers']
    },
    {
      id: 3,
      title: "Ancient Farming Wisdom",
      category: 'traditional',
      difficulty: 'Beginner',
      readTime: '10 min',
      description: "Discover time-tested farming techniques used by agricultural societies for thousands of years.",
      content: `
        # Ancient Farming Wisdom

        Traditional farming methods, developed over millennia, offer sustainable solutions that modern agriculture can learn from.

        ## Three Sisters Planting (Native American)

        This companion planting technique combines:
        - **Corn**: Provides natural poles for beans
        - **Beans**: Fix nitrogen in soil for corn and squash
        - **Squash**: Large leaves shade soil, retaining moisture

        ### Benefits:
        - Maximizes soil nutrients
        - Reduces need for fertilizers
        - Increases biodiversity
        - Natural pest control

        ## Terraced Agriculture

        ### Origins:
        Ancient civilizations used terracing in mountainous regions to:
        - Prevent soil erosion
        - Conserve water
        - Create arable land on slopes

        ### Modern Applications:
        - Contour farming
        - Grass waterways
        - Buffer strips

        ## Crop Rotation Principles

        ### Four-Field System (Medieval Europe):
        1. **Year 1**: Wheat or rye
        2. **Year 2**: Barley, oats, or legumes
        3. **Year 3**: Root vegetables (turnips, carrots)
        4. **Year 4**: Fallow (rest/pasture)

        ### Benefits:
        - Breaks pest and disease cycles
        - Improves soil fertility
        - Reduces chemical inputs

        ## Natural Pest Management

        ### Companion Planting:
        - **Marigolds**: Repel nematodes and aphids
        - **Basil**: Deters flies and mosquitoes
        - **Nasturtiums**: Trap crop for aphids

        ### Beneficial Insects:
        - Encourage ladybugs for aphid control
        - Plant flowers to attract pollinators
        - Provide habitat for pest predators

        ## Seed Saving Traditions

        ### Selection Criteria:
        - Choose plants with desired traits
        - Select from healthy, vigorous plants
        - Save from multiple plants for genetic diversity

        ### Storage Methods:
        - Dry thoroughly before storage
        - Use airtight containers
        - Store in cool, dark places
        - Label with variety and date
      `,
      tags: ['traditional', 'companion planting', 'crop rotation', 'pest control', 'seed saving']
    },
    {
      id: 4,
      title: "Integrated Pest Management",
      category: 'pest',
      difficulty: 'Advanced',
      readTime: '15 min',
      description: "Learn comprehensive strategies to manage pests while minimizing environmental impact.",
      content: `
        # Integrated Pest Management (IPM)

        IPM combines biological, cultural, physical, and chemical tools in a way that minimizes economic, health, and environmental risks.

        ## IPM Principles

        ### 1. Prevention
        - Choose resistant varieties
        - Maintain healthy soil
        - Practice good sanitation
        - Optimize plant spacing

        ### 2. Monitoring
        - Regular field scouting
        - Pest identification
        - Population thresholds
        - Weather monitoring

        ### 3. Action Thresholds
        Determine when pest populations require intervention:
        - **Economic threshold**: Cost of control equals cost of damage
        - **Aesthetic threshold**: For ornamental crops
        - **Health threshold**: For food safety concerns

        ## Biological Control

        ### Beneficial Insects:
        - **Ladybugs**: Control aphids, mites
        - **Lacewings**: Eat aphids, thrips, mealybugs
        - **Parasitic wasps**: Target specific pest species
        - **Predatory mites**: Control spider mites

        ### Microbial Controls:
        - **Bacillus thuringiensis (Bt)**: Controls caterpillars
        - **Beauveria bassiana**: Fungal insecticide
        - **Trichoderma**: Beneficial soil fungus

        ## Cultural Controls

        ### Crop Rotation:
        - Breaks pest life cycles
        - Reduces soil-borne diseases
        - Minimizes pesticide resistance

        ### Sanitation:
        - Remove crop residues
        - Eliminate weed hosts
        - Clean equipment between fields

        ### Timing:
        - Plant when pest pressure is low
        - Harvest before pest peaks
        - Disrupt pest reproduction cycles

        ## Physical Controls

        ### Barriers:
        - Row covers for flying insects
        - Copper strips for slugs
        - Sticky traps for monitoring

        ### Mechanical:
        - Hand picking large pests
        - Pruning affected plant parts
        - Tillage to disrupt soil pests

        ## Chemical Controls (Last Resort)

        ### Selection Criteria:
        - Target specificity
        - Environmental safety
        - Resistance management
        - Pre-harvest intervals

        ### Application Principles:
        - Follow label instructions
        - Use protective equipment
        - Consider weather conditions
        - Rotate chemical classes

        ## Resistance Management

        ### Strategies:
        - Rotate different modes of action
        - Use tank mixes when appropriate
        - Maintain refuges for susceptible pests
        - Monitor for resistance development
      `,
      tags: ['IPM', 'biological control', 'pest management', 'beneficial insects', 'resistance']
    },
    {
      id: 5,
      title: "Composting and Organic Matter",
      category: 'sustainable',
      difficulty: 'Beginner',
      readTime: '6 min',
      description: "Master the art of composting to create nutrient-rich soil amendments and reduce waste.",
      content: `
        # Composting and Organic Matter

        Composting transforms organic waste into valuable soil amendments, reducing waste while improving soil health.

        ## Benefits of Composting

        ### Soil Improvements:
        - Increases organic matter content
        - Improves soil structure
        - Enhances water retention
        - Provides slow-release nutrients

        ### Environmental Benefits:
        - Reduces landfill waste
        - Lowers methane emissions
        - Decreases need for chemical fertilizers
        - Improves carbon sequestration

        ## Composting Methods

        ### Hot Composting (Thermophilic)
        **Requirements:**
        - Temperature: 131-160°F (55-71°C)
        - Time: 2-8 weeks
        - Frequent turning

        **Advantages:**
        - Kills pathogens and weed seeds
        - Faster decomposition
        - Higher quality compost

        ### Cold Composting
        **Characteristics:**
        - Lower temperatures (<100°F)
        - Longer time (6-24 months)
        - Minimal turning

        **Advantages:**
        - Less labor intensive
        - Retains beneficial microorganisms
        - Suitable for small quantities

        ## Compost Recipe (C:N Ratio)

        ### Brown Materials (Carbon - 25:1 to 30:1):
        - Dry leaves
        - Straw
        - Paper
        - Cardboard
        - Wood chips

        ### Green Materials (Nitrogen - 12:1 to 20:1):
        - Fresh grass clippings
        - Kitchen scraps
        - Fresh manure
        - Garden trimmings

        ### Ideal Ratio: 30:1 Carbon to Nitrogen

        ## Building a Compost Pile

        ### Layer Method:
        1. **Base**: Coarse brown materials (6 inches)
        2. **Green layer**: Nitrogen materials (2-3 inches)
        3. **Brown layer**: Carbon materials (6 inches)
        4. **Repeat**: Continue layering
        5. **Top**: Cover with brown materials

        ### Key Factors:
        - **Moisture**: 40-60% (feels like wrung-out sponge)
        - **Aeration**: Turn weekly for hot composting
        - **Size**: Minimum 3×3×3 feet for hot composting

        ## Troubleshooting Common Problems

        ### Smelly Compost:
        - **Cause**: Too much nitrogen or moisture
        - **Solution**: Add brown materials, turn more frequently

        ### Slow Decomposition:
        - **Cause**: Too much carbon or too dry
        - **Solution**: Add green materials and water

        ### Pest Problems:
        - **Prevention**: Don't compost meat, dairy, or oils
        - **Solution**: Bury food scraps in center of pile

        ## Using Finished Compost

        ### Quality Indicators:
        - Dark, crumbly texture
        - Pleasant, earthy smell
        - No recognizable original materials
        - Temperature equal to ambient

        ### Application Rates:
        - **Garden beds**: 1-2 inches annually
        - **Potting mix**: 25-30% compost
        - **Lawn topdressing**: 1/4 inch layer
        - **Tree/shrub planting**: 30% of backfill
      `,
      tags: ['composting', 'organic matter', 'soil amendment', 'sustainability', 'waste reduction']
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  if (selectedArticle !== null) {
    const article = articles.find(a => a.id === selectedArticle);
    if (article) {
      return (
        <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => setSelectedArticle(null)}
              className="hover:bg-green-50"
            >
              ← Back to Library
            </Button>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{article.difficulty}</Badge>
              <Badge variant="outline">{article.readTime}</Badge>
            </div>
          </div>
          
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">{article.title}</CardTitle>
              <CardDescription className="text-lg">{article.description}</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-green max-w-none">
              <div className="whitespace-pre-line">{article.content}</div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Farming Knowledge Library</h2>
          <p className="text-green-100 mb-4">
            Discover sustainable farming techniques, traditional wisdom, and modern innovations
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1750016065255-cab6cc76c8d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGZhcm1pbmclMjB0ZWNobmlxdWVzJTIwc29pbHxlbnwxfHx8fDE3NTgxMjIyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Traditional farming"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/90 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search articles, techniques, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories and Articles */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 bg-white/80">
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
            {filteredArticles.map((article) => (
              <Card 
                key={article.id} 
                className="bg-white/90 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => setSelectedArticle(article.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="secondary" 
                      className={
                        article.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        article.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }
                    >
                      {article.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="group-hover:text-green-600 transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {article.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{article.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <Card className="bg-white/90 backdrop-blur">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">
                  No articles found matching your search criteria.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search terms or selecting a different category.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}