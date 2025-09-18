import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Sprout, 
  Droplets, 
  Sun, 
  TrendingUp, 
  Award, 
  Calendar,
  Leaf,
  BarChart3
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DashboardProps {
  onViewChange: (view: string) => void;
}

export function Dashboard({ onViewChange }: DashboardProps) {
  const farmStats = {
    cropsGrown: 127,
    experiencePoints: 8450,
    nextLevelXP: 10000,
    sustainabilityScore: 92,
    dailyStreak: 15,
    plantsWatered: 340,
    co2Reduced: 2.4,
    soilHealth: 88
  };

  const recentAchievements = [
    { name: "Green Thumb", description: "Grew 100 plants", icon: "🌱", unlocked: true },
    { name: "Water Wise", description: "Saved 500L of water", icon: "💧", unlocked: true },
    { name: "Soil Master", description: "Improved soil health by 50%", icon: "🌍", unlocked: false },
    { name: "Eco Warrior", description: "Reduced CO2 by 5kg", icon: "🌿", unlocked: false }
  ];

  const quickActions = [
    { title: "Start Farm Game", description: "Continue your virtual farming", action: () => onViewChange('game'), icon: Sprout },
    { title: "Learn Techniques", description: "Explore farming library", action: () => onViewChange('library'), icon: Award },
    { title: "Check Rankings", description: "View global leaderboard", action: () => onViewChange('leaderboard'), icon: TrendingUp }
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Welcome to Your Farm Dashboard</h2>
          <p className="text-green-100 mb-4">Track your sustainable farming journey and grow your impact!</p>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-500 text-white">
              <Calendar className="w-3 h-3 mr-1" />
              Day {farmStats.dailyStreak} Streak
            </Badge>
            <Badge variant="secondary" className="bg-yellow-500 text-white">
              Level {Math.floor(farmStats.experiencePoints / 1000) + 1}
            </Badge>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1514889363570-bf36ac74b42d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBmYXJtaW5nJTIwc3VzdGFpbmFibGUlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTgxMjIyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Farming background"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-white/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crops Grown</CardTitle>
            <Sprout className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{farmStats.cropsGrown}</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-white/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Saved</CardTitle>
            <Droplets className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{farmStats.plantsWatered}L</div>
            <p className="text-xs text-muted-foreground">Efficient irrigation</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-white/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Reduced</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{farmStats.co2Reduced}kg</div>
            <p className="text-xs text-muted-foreground">Environmental impact</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-white/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil Health</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{farmStats.soilHealth}%</div>
            <p className="text-xs text-muted-foreground">Excellent condition</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Experience Progress */}
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <span>Experience Progress</span>
            </CardTitle>
            <CardDescription>
              {farmStats.experiencePoints} / {farmStats.nextLevelXP} XP to next level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress 
              value={(farmStats.experiencePoints / farmStats.nextLevelXP) * 100} 
              className="h-3"
            />
            <div className="mt-2 text-sm text-muted-foreground">
              {farmStats.nextLevelXP - farmStats.experiencePoints} XP remaining
            </div>
          </CardContent>
        </Card>

        {/* Sustainability Score */}
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <span>Sustainability Score</span>
            </CardTitle>
            <CardDescription>
              Your environmental impact rating
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {farmStats.sustainabilityScore}/100
            </div>
            <Progress 
              value={farmStats.sustainabilityScore} 
              className="h-3"
            />
            <div className="mt-2 text-sm text-green-600">
              Excellent! You're making a real difference.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest farming milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAchievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg border ${
                    achievement.unlocked 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium">{achievement.name}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Unlocked
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Continue your farming journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-4 hover:bg-green-50 hover:border-green-300"
                  onClick={action.action}
                >
                  <action.icon className="w-5 h-5 mr-3 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}