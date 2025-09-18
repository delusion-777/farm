import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Gamepad2, 
  Coins, 
  Sprout, 
  Droplets, 
  Bug, 
  Sun, 
  Cloud, 
  Trophy,
  Target,
  Camera,
  Upload,
  CheckCircle,
  Clock,
  Leaf,
  Eye,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Crop {
  id: string;
  name: string;
  type: 'cereal' | 'pulse' | 'cash' | 'vegetable';
  growthStage: number; // 0-100
  health: number; // 0-100
  position: { x: number; y: number };
  planted: boolean;
  plantedAt: Date | null;
  harvestReady: boolean;
  sustainabilityScore: number;
  waterLevel: number;
  fertilizerType: 'organic' | 'chemical' | 'none';
}

interface Mission {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  reward: number;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  deadline: Date;
  requiresPhoto: boolean;
}

interface Weather {
  type: 'sunny' | 'rainy' | 'cloudy';
  temperature: number;
  humidity: number;
  effect: string;
}

interface Enhanced3DFarmGameProps {
  onCoinsUpdate: (coins: number) => void;
  currentCoins: number;
}

export function Enhanced3DFarmGame({ onCoinsUpdate, currentCoins }: Enhanced3DFarmGameProps) {
  const [farmPlots, setFarmPlots] = useState<Crop[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<string | null>(null);
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [weather, setWeather] = useState<Weather>({ 
    type: 'sunny', 
    temperature: 28, 
    humidity: 65, 
    effect: 'Good for most crops' 
  });
  const [gameStats, setGameStats] = useState({
    totalYield: 0,
    sustainabilityScore: 85,
    level: 1,
    experience: 0,
    plots: 9
  });
  const [viewMode, setViewMode] = useState<'top' | 'side' | '3d'>('3d');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cropTypes = [
    { id: 'wheat', name: 'Wheat', icon: '🌾', color: '#F59E0B', sustainabilityScore: 80 },
    { id: 'rice', name: 'Rice', icon: '🌾', color: '#10B981', sustainabilityScore: 75 },
    { id: 'tomato', name: 'Tomato', icon: '🍅', color: '#EF4444', sustainabilityScore: 70 },
    { id: 'corn', name: 'Corn', icon: '🌽', color: '#FBBF24', sustainabilityScore: 65 },
    { id: 'cotton', name: 'Cotton', icon: '☁️', color: '#F3F4F6', sustainabilityScore: 60 },
    { id: 'pulses', name: 'Pulses', icon: '🫘', color: '#8B5CF6', sustainabilityScore: 90 }
  ];

  const missions: Mission[] = [
    {
      id: 'crop-rotation',
      title: 'Practice Crop Rotation',
      description: 'Plant different types of crops in rotation to improve soil health',
      requirements: ['Plant 2 different crop types', 'Use organic fertilizer'],
      reward: 250,
      completed: false,
      difficulty: 'medium',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      requiresPhoto: false
    },
    {
      id: 'organic-farming',
      title: 'Go Completely Organic',
      description: 'Farm without any chemical fertilizers for one complete cycle',
      requirements: ['Use only organic fertilizers', 'Complete harvest cycle'],
      reward: 500,
      completed: false,
      difficulty: 'hard',
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      requiresPhoto: true
    },
    {
      id: 'water-conservation',
      title: 'Water Conservation Master',
      description: 'Use drip irrigation and mulching to save water',
      requirements: ['Install drip irrigation', 'Apply mulching'],
      reward: 300,
      completed: false,
      difficulty: 'medium',
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      requiresPhoto: true
    }
  ];

  // Initialize farm plots
  useEffect(() => {
    const initialPlots: Crop[] = [];
    for (let i = 0; i < 9; i++) {
      const x = (i % 3) * 120 + 60;
      const y = Math.floor(i / 3) * 120 + 60;
      initialPlots.push({
        id: `plot-${i}`,
        name: '',
        type: 'cereal',
        growthStage: 0,
        health: 100,
        position: { x, y },
        planted: false,
        plantedAt: null,
        harvestReady: false,
        sustainabilityScore: 100,
        waterLevel: 50,
        fertilizerType: 'none'
      });
    }
    setFarmPlots(initialPlots);
    setCurrentMission(missions[0]);
  }, []);

  // 3D Farm Visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB'); // Sky blue
    gradient.addColorStop(0.7, '#98FB98'); // Pale green
    gradient.addColorStop(1, '#228B22'); // Forest green
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw sun
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(canvas.width - 80, 80, 30, 0, 2 * Math.PI);
    ctx.fill();

    // Draw clouds
    if (weather.type === 'cloudy' || weather.type === 'rainy') {
      ctx.fillStyle = '#F0F8FF';
      ctx.beginPath();
      ctx.arc(150, 100, 25, 0, 2 * Math.PI);
      ctx.arc(180, 90, 30, 0, 2 * Math.PI);
      ctx.arc(210, 100, 25, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Draw farm plots in 3D perspective
    farmPlots.forEach((plot, index) => {
      const baseX = 50 + (index % 3) * 150;
      const baseY = 200 + Math.floor(index / 3) * 100;
      
      // Draw plot base (soil)
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(baseX, baseY, 100, 60);
      
      // Draw plot border
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 2;
      ctx.strokeRect(baseX, baseY, 100, 60);
      
      // Draw crops if planted
      if (plot.planted && plot.name) {
        const crop = cropTypes.find(c => c.id === plot.name);
        if (crop) {
          // Draw crop visualization based on growth stage
          const cropHeight = (plot.growthStage / 100) * 40;
          
          // Crop stem
          ctx.fillStyle = '#228B22';
          ctx.fillRect(baseX + 45, baseY + 60 - cropHeight, 10, cropHeight);
          
          // Crop top (icon representation)
          ctx.font = `${Math.max(20, cropHeight)}px Arial`;
          ctx.fillText(crop.icon, baseX + 30, baseY + 40);
          
          // Health indicator
          ctx.fillStyle = plot.health > 70 ? '#10B981' : plot.health > 40 ? '#F59E0B' : '#EF4444';
          ctx.fillRect(baseX + 5, baseY + 5, (plot.health / 100) * 90, 5);
        }
      }
      
      // Highlight selected plot
      if (selectedPlot === plot.id) {
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 4;
        ctx.strokeRect(baseX - 2, baseY - 2, 104, 64);
      }
      
      // Draw fertilizer indicator
      if (plot.fertilizerType !== 'none') {
        ctx.fillStyle = plot.fertilizerType === 'organic' ? '#10B981' : '#EF4444';
        ctx.beginPath();
        ctx.arc(baseX + 90, baseY + 10, 5, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      // Draw water level indicator
      if (plot.waterLevel < 30) {
        ctx.fillStyle = '#3B82F6';
        ctx.font = '12px Arial';
        ctx.fillText('💧', baseX + 80, baseY + 25);
      }
    });

    // Draw weather effects
    if (weather.type === 'rainy') {
      ctx.strokeStyle = '#4682B4';
      ctx.lineWidth = 1;
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 2, y + 10);
        ctx.stroke();
      }
    }

  }, [farmPlots, selectedPlot, weather, viewMode]);

  const plantCrop = (cropId: string) => {
    if (!selectedPlot) return;
    
    setFarmPlots(plots => plots.map(plot => 
      plot.id === selectedPlot 
        ? { 
            ...plot, 
            name: cropId, 
            planted: true, 
            plantedAt: new Date(),
            growthStage: 10 
          }
        : plot
    ));
    
    toast.success('Crop planted successfully!');
    onCoinsUpdate(currentCoins + 50);
  };

  const applyFertilizer = (type: 'organic' | 'chemical') => {
    if (!selectedPlot) return;
    
    setFarmPlots(plots => plots.map(plot => 
      plot.id === selectedPlot 
        ? { 
            ...plot, 
            fertilizerType: type,
            health: type === 'organic' ? Math.min(100, plot.health + 20) : Math.min(100, plot.health + 10),
            sustainabilityScore: type === 'organic' ? Math.min(100, plot.sustainabilityScore + 10) : Math.max(0, plot.sustainabilityScore - 15)
          }
        : plot
    ));
    
    const reward = type === 'organic' ? 30 : 10;
    onCoinsUpdate(currentCoins + reward);
    toast.success(`${type} fertilizer applied! +${reward} coins`);
  };

  const waterCrop = () => {
    if (!selectedPlot) return;
    
    setFarmPlots(plots => plots.map(plot => 
      plot.id === selectedPlot 
        ? { 
            ...plot, 
            waterLevel: Math.min(100, plot.waterLevel + 30),
            health: Math.min(100, plot.health + 10)
          }
        : plot
    ));
    
    onCoinsUpdate(currentCoins + 20);
    toast.success('Crop watered! +20 coins');
  };

  const harvestCrop = () => {
    if (!selectedPlot) return;
    
    const plot = farmPlots.find(p => p.id === selectedPlot);
    if (!plot || !plot.harvestReady) return;
    
    const yield_amount = Math.floor((plot.health / 100) * (plot.sustainabilityScore / 100) * 200);
    
    setFarmPlots(plots => plots.map(p => 
      p.id === selectedPlot 
        ? { 
            ...p, 
            planted: false, 
            growthStage: 0, 
            harvestReady: false, 
            name: '',
            fertilizerType: 'none',
            waterLevel: 50
          }
        : p
    ));
    
    setGameStats(stats => ({
      ...stats,
      totalYield: stats.totalYield + yield_amount,
      experience: stats.experience + yield_amount
    }));
    
    onCoinsUpdate(currentCoins + yield_amount);
    toast.success(`Harvest complete! +${yield_amount} coins`);
  };

  const uploadPhoto = () => {
    // Simulate photo upload
    toast.success('Photo uploaded successfully! Bonus coins earned!');
    onCoinsUpdate(currentCoins + 100);
  };

  // Auto-grow crops
  useEffect(() => {
    const interval = setInterval(() => {
      setFarmPlots(plots => plots.map(plot => {
        if (plot.planted && plot.growthStage < 100) {
          const growthRate = weather.type === 'rainy' ? 3 : weather.type === 'sunny' ? 2 : 1;
          const newGrowthStage = Math.min(100, plot.growthStage + growthRate);
          
          return {
            ...plot,
            growthStage: newGrowthStage,
            harvestReady: newGrowthStage >= 100,
            waterLevel: Math.max(0, plot.waterLevel - 2)
          };
        }
        return plot;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [weather]);

  const selectedPlotData = farmPlots.find(p => p.id === selectedPlot);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800">3D Krishi Farm</h1>
            <p className="text-green-600">Sustainable farming simulation</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-yellow-500 text-white">
              <Coins className="w-4 h-4 mr-1" />
              {currentCoins} coins
            </Badge>
            <Badge className="bg-green-600">
              Level {gameStats.level}
            </Badge>
          </div>
        </div>

        {/* Game Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Farm View */}
          <div className="lg:col-span-3 space-y-4">
            {/* View Controls */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === '3d' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('3d')}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  3D View
                </Button>
                <Button
                  variant={viewMode === 'top' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('top')}
                >
                  Top View
                </Button>
              </div>
              
              {/* Weather Display */}
              <div className="flex items-center space-x-3">
                {weather.type === 'sunny' && <Sun className="w-5 h-5 text-yellow-500" />}
                {weather.type === 'rainy' && <Cloud className="w-5 h-5 text-blue-500" />}
                {weather.type === 'cloudy' && <Cloud className="w-5 h-5 text-gray-500" />}
                <span className="text-sm">{weather.temperature}°C</span>
                <span className="text-xs text-muted-foreground">{weather.effect}</span>
              </div>
            </div>

            {/* 3D Farm Canvas */}
            <Card className="p-4">
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="w-full border rounded-lg cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  
                  // Calculate which plot was clicked (simplified)
                  const plotX = Math.floor((x - 50) / 150);
                  const plotY = Math.floor((y - 200) / 100);
                  
                  if (plotX >= 0 && plotX < 3 && plotY >= 0 && plotY < 3) {
                    const plotIndex = plotY * 3 + plotX;
                    if (plotIndex < farmPlots.length) {
                      setSelectedPlot(farmPlots[plotIndex].id);
                    }
                  }
                }}
              />
            </Card>

            {/* Action Bar */}
            <Card className="p-4">
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <span className="font-medium">Actions:</span>
                {cropTypes.map(crop => (
                  <Button
                    key={crop.id}
                    size="sm"
                    variant="outline"
                    onClick={() => plantCrop(crop.id)}
                    disabled={!selectedPlot || selectedPlotData?.planted}
                    className="text-xs"
                  >
                    {crop.icon} Plant {crop.name}
                  </Button>
                ))}
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => applyFertilizer('organic')}
                  disabled={!selectedPlot}
                  className="bg-green-50 hover:bg-green-100"
                >
                  <Leaf className="w-3 h-3 mr-1" />
                  Organic Fertilizer
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => applyFertilizer('chemical')}
                  disabled={!selectedPlot}
                  className="bg-red-50 hover:bg-red-100"
                >
                  ⚗️ Chemical
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={waterCrop}
                  disabled={!selectedPlot}
                >
                  <Droplets className="w-3 h-3 mr-1" />
                  Water
                </Button>
                <Button 
                  size="sm" 
                  variant="default" 
                  onClick={harvestCrop}
                  disabled={!selectedPlot || !selectedPlotData?.harvestReady}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  🌾 Harvest
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            {/* Selected Plot Info */}
            {selectedPlotData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Plot Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm font-medium">Crop: </span>
                    <span>{selectedPlotData.name || 'Empty'}</span>
                  </div>
                  
                  {selectedPlotData.planted && (
                    <>
                      <div>
                        <span className="text-sm font-medium">Growth: </span>
                        <Progress value={selectedPlotData.growthStage} className="mt-1" />
                        <span className="text-xs text-muted-foreground">{selectedPlotData.growthStage}%</span>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Health: </span>
                        <Progress 
                          value={selectedPlotData.health} 
                          className="mt-1"
                          // className={selectedPlotData.health > 70 ? 'bg-green-200' : 'bg-red-200'}
                        />
                        <span className="text-xs text-muted-foreground">{selectedPlotData.health}%</span>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Water Level: </span>
                        <Progress value={selectedPlotData.waterLevel} className="mt-1" />
                        <span className="text-xs text-muted-foreground">{selectedPlotData.waterLevel}%</span>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Sustainability: </span>
                        <Badge 
                          variant={selectedPlotData.sustainabilityScore > 70 ? 'default' : 'destructive'}
                          className="ml-2"
                        >
                          {selectedPlotData.sustainabilityScore}%
                        </Badge>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Current Mission */}
            {currentMission && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Current Mission</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <h4 className="font-medium">{currentMission.title}</h4>
                  <p className="text-sm text-muted-foreground">{currentMission.description}</p>
                  
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Requirements:</span>
                    {currentMission.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-600">
                      <Trophy className="w-3 h-3 mr-1" />
                      {currentMission.reward} coins
                    </Badge>
                    
                    {currentMission.requiresPhoto && (
                      <Button size="sm" onClick={uploadPhoto}>
                        <Camera className="w-3 h-3 mr-1" />
                        Upload Photo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Game Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Farm Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Yield:</span>
                  <span className="font-medium">{gameStats.totalYield} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sustainability:</span>
                  <Badge className="bg-green-600">{gameStats.sustainabilityScore}%</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Experience:</span>
                  <span className="font-medium">{gameStats.experience} XP</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}