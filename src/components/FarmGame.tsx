import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Droplets, 
  Sun, 
  Sprout,
  TreePine,
  Coins
} from 'lucide-react';

interface FarmGameProps {
  onCoinsUpdate: (coins: number) => void;
  currentCoins: number;
}

interface Plant {
  x: number;
  y: number;
  type: 'seed' | 'sprout' | 'mature';
  growthProgress: number;
  watered: boolean;
  id: string;
}

interface Tool {
  name: string;
  icon: React.ReactNode;
  cost: number;
  action: string;
}

export function FarmGame({ onCoinsUpdate, currentCoins }: FarmGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>('plant');
  const [gameStats, setGameStats] = useState({
    plantsGrown: 0,
    waterUsed: 0,
    harvestedCrops: 0,
    currentSeason: 'Spring'
  });

  const tools: Tool[] = [
    { name: 'plant', icon: <Sprout className="w-4 h-4" />, cost: 10, action: 'Plant Seeds' },
    { name: 'water', icon: <Droplets className="w-4 h-4" />, cost: 5, action: 'Water Plants' },
    { name: 'harvest', icon: <Coins className="w-4 h-4" />, cost: 0, action: 'Harvest Crops' },
    { name: 'fertilize', icon: <Sun className="w-4 h-4" />, cost: 15, action: 'Add Fertilizer' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    const animate = () => {
      if (!isPlaying) return;

      // Clear canvas
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = '#16a34a';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw plants
      plants.forEach(plant => {
        drawPlant(ctx, plant);
      });

      // Update plant growth
      setPlants(prevPlants => 
        prevPlants.map(plant => {
          if (plant.type === 'mature') return plant;
          
          const growthRate = plant.watered ? 0.5 : 0.2;
          const newProgress = Math.min(plant.growthProgress + growthRate, 100);
          
          let newType = plant.type;
          if (newProgress >= 100 && plant.type === 'sprout') {
            newType = 'mature';
          } else if (newProgress >= 50 && plant.type === 'seed') {
            newType = 'sprout';
          }

          return {
            ...plant,
            growthProgress: newProgress,
            type: newType,
            watered: plant.watered && Math.random() > 0.02 // Water gradually depletes
          };
        })
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animate();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, plants]);

  const drawPlant = (ctx: CanvasRenderingContext2D, plant: Plant) => {
    const { x, y, type, growthProgress, watered } = plant;
    
    // Draw soil
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(x - 15, y + 15, 30, 10);

    // Draw plant based on type
    if (type === 'seed') {
      ctx.fillStyle = '#654321';
      ctx.beginPath();
      ctx.arc(x, y + 10, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'sprout') {
      // Draw stem
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y + 15);
      ctx.lineTo(x, y - (growthProgress / 100) * 20);
      ctx.stroke();

      // Draw small leaves
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.ellipse(x - 5, y + 5 - (growthProgress / 100) * 15, 3, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x + 5, y + 5 - (growthProgress / 100) * 15, 3, 2, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'mature') {
      // Draw full plant
      ctx.strokeStyle = '#16a34a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, y + 15);
      ctx.lineTo(x, y - 30);
      ctx.stroke();

      // Draw large leaves
      ctx.fillStyle = '#22c55e';
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.ellipse(x - 8 + Math.sin(i) * 5, y - 5 - i * 8, 6, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x + 8 + Math.cos(i) * 5, y - 5 - i * 8, 6, 4, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw fruit/vegetables
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(x - 3, y - 25, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 3, y - 20, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw water indicator
    if (watered) {
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(x + 12, y - 10, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const gridX = Math.floor(x / 40) * 40 + 20;
    const gridY = Math.floor(y / 40) * 40 + 20;

    const tool = tools.find(t => t.name === selectedTool);
    if (!tool) return;

    // Check if player has enough coins
    if (tool.cost > currentCoins) {
      alert(`Not enough coins! Need ${tool.cost} coins.`);
      return;
    }

    if (selectedTool === 'plant') {
      // Check if there's already a plant at this location
      const existingPlant = plants.find(p => 
        Math.abs(p.x - gridX) < 20 && Math.abs(p.y - gridY) < 20
      );
      
      if (!existingPlant) {
        const newPlant: Plant = {
          x: gridX,
          y: gridY,
          type: 'seed',
          growthProgress: 0,
          watered: false,
          id: Date.now().toString()
        };
        
        setPlants(prev => [...prev, newPlant]);
        onCoinsUpdate(currentCoins - tool.cost);
        setGameStats(prev => ({ ...prev, plantsGrown: prev.plantsGrown + 1 }));
      }
    } else if (selectedTool === 'water') {
      const nearbyPlants = plants.filter(p => 
        Math.abs(p.x - gridX) < 40 && Math.abs(p.y - gridY) < 40
      );
      
      if (nearbyPlants.length > 0) {
        setPlants(prev => prev.map(plant => {
          const isNearby = Math.abs(plant.x - gridX) < 40 && Math.abs(plant.y - gridY) < 40;
          return isNearby ? { ...plant, watered: true } : plant;
        }));
        onCoinsUpdate(currentCoins - tool.cost);
        setGameStats(prev => ({ ...prev, waterUsed: prev.waterUsed + 1 }));
      }
    } else if (selectedTool === 'harvest') {
      const maturePlants = plants.filter(p => 
        p.type === 'mature' && Math.abs(p.x - gridX) < 40 && Math.abs(p.y - gridY) < 40
      );
      
      if (maturePlants.length > 0) {
        setPlants(prev => prev.filter(p => 
          !(p.type === 'mature' && Math.abs(p.x - gridX) < 40 && Math.abs(p.y - gridY) < 40)
        ));
        const coinsEarned = maturePlants.length * 25;
        onCoinsUpdate(currentCoins + coinsEarned);
        setGameStats(prev => ({ ...prev, harvestedCrops: prev.harvestedCrops + maturePlants.length }));
      }
    }
  };

  const resetGame = () => {
    setPlants([]);
    setGameStats({
      plantsGrown: 0,
      waterUsed: 0,
      harvestedCrops: 0,
      currentSeason: 'Spring'
    });
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      {/* Game Header */}
      <Card className="bg-white/90 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <TreePine className="w-6 h-6 text-green-600" />
              <span>3D Farm Simulator</span>
            </span>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {gameStats.currentSeason}
              </Badge>
              <div className="flex space-x-2">
                <Button
                  variant={isPlaying ? "destructive" : "default"}
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pause' : 'Start'}
                </Button>
                <Button variant="outline" size="sm" onClick={resetGame}>
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            Click on the grid to plant, water, and harvest crops. Watch your farm grow in real-time!
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Game Canvas */}
        <div className="lg:col-span-3">
          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-4">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="w-full h-auto border-2 border-green-200 rounded-lg cursor-crosshair bg-green-100"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Game Controls */}
        <div className="space-y-4">
          {/* Tools */}
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle>Tools</CardTitle>
              <CardDescription>Select a tool to interact with your farm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {tools.map((tool) => (
                <Button
                  key={tool.name}
                  variant={selectedTool === tool.name ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedTool(tool.name)}
                  disabled={tool.cost > currentCoins && tool.cost > 0}
                >
                  {tool.icon}
                  <span className="ml-2">{tool.action}</span>
                  {tool.cost > 0 && (
                    <span className="ml-auto text-xs">
                      {tool.cost} 🪙
                    </span>
                  )}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Game Stats */}
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle>Farm Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Plants Grown:</span>
                <span className="font-medium">{gameStats.plantsGrown}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Water Used:</span>
                <span className="font-medium">{gameStats.waterUsed}L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Crops Harvested:</span>
                <span className="font-medium">{gameStats.harvestedCrops}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Plants:</span>
                <span className="font-medium">{plants.length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Farm Progress */}
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle>Farm Development</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Farm Level</span>
                  <span>Level {Math.floor(gameStats.plantsGrown / 10) + 1}</span>
                </div>
                <Progress value={(gameStats.plantsGrown % 10) * 10} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Sustainability</span>
                  <span>{Math.min(85 + gameStats.harvestedCrops, 100)}%</span>
                </div>
                <Progress value={Math.min(85 + gameStats.harvestedCrops, 100)} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2">How to Play:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Select a tool from the panel on the right</li>
            <li>• Click on the grid to plant seeds (costs 10 coins)</li>
            <li>• Water your plants regularly to help them grow faster</li>
            <li>• Harvest mature plants to earn 25 coins each</li>
            <li>• Watch your plants grow in real-time when the game is running</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}