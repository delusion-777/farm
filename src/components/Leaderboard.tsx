import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Users, 
  Calendar,
  Leaf,
  Droplets,
  Sprout,
  Crown
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Player {
  id: number;
  name: string;
  level: number;
  experiencePoints: number;
  sustainabilityScore: number;
  cropsGrown: number;
  waterSaved: number;
  co2Reduced: number;
  rank: number;
  avatar?: string;
  country: string;
  achievements: number;
  joinDate: string;
}

export function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('all-time');
  const [selectedCategory, setSelectedCategory] = useState('overall');

  // Mock leaderboard data
  const players: Player[] = [
    {
      id: 1,
      name: "EcoFarmer23",
      level: 15,
      experiencePoints: 15420,
      sustainabilityScore: 98,
      cropsGrown: 245,
      waterSaved: 1200,
      co2Reduced: 5.8,
      rank: 1,
      country: "🇺🇸 USA",
      achievements: 12,
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "GreenThumb_Pro",
      level: 14,
      experiencePoints: 14890,
      sustainabilityScore: 96,
      cropsGrown: 238,
      waterSaved: 1150,
      co2Reduced: 5.2,
      rank: 2,
      country: "🇨🇦 Canada",
      achievements: 11,
      joinDate: "2023-02-03"
    },
    {
      id: 3,
      name: "SustainableSarah",
      level: 13,
      experiencePoints: 13670,
      sustainabilityScore: 95,
      cropsGrown: 220,
      waterSaved: 1080,
      co2Reduced: 4.9,
      rank: 3,
      country: "🇦🇺 Australia",
      achievements: 10,
      joinDate: "2023-01-28"
    },
    {
      id: 4,
      name: "OrganicOliver",
      level: 12,
      experiencePoints: 12340,
      sustainabilityScore: 94,
      cropsGrown: 205,
      waterSaved: 980,
      co2Reduced: 4.3,
      rank: 4,
      country: "🇬🇧 UK",
      achievements: 9,
      joinDate: "2023-03-10"
    },
    {
      id: 5,
      name: "PermaculturePete",
      level: 12,
      experiencePoints: 12100,
      sustainabilityScore: 93,
      cropsGrown: 198,
      waterSaved: 950,
      co2Reduced: 4.1,
      rank: 5,
      country: "🇩🇪 Germany",
      achievements: 8,
      joinDate: "2023-02-20"
    },
    {
      id: 6,
      name: "You",
      level: 8,
      experiencePoints: 8450,
      sustainabilityScore: 92,
      cropsGrown: 127,
      waterSaved: 540,
      co2Reduced: 2.4,
      rank: 847,
      country: "🇺🇸 USA",
      achievements: 6,
      joinDate: "2023-09-15"
    }
  ];

  const currentUser = players.find(p => p.name === "You");
  const topPlayers = players.filter(p => p.name !== "You").slice(0, 5);

  const categories = [
    { id: 'overall', name: 'Overall Ranking', icon: Trophy },
    { id: 'sustainability', name: 'Sustainability', icon: Leaf },
    { id: 'crops', name: 'Crops Grown', icon: Sprout },
    { id: 'water', name: 'Water Saved', icon: Droplets }
  ];

  const periods = [
    { id: 'all-time', name: 'All Time' },
    { id: 'monthly', name: 'This Month' },
    { id: 'weekly', name: 'This Week' },
    { id: 'daily', name: 'Today' }
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-500" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    if (rank === 3) return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white p-8">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2 flex items-center space-x-3">
            <Trophy className="w-8 h-8" />
            <span>Global Leaderboard</span>
          </h2>
          <p className="text-amber-100 mb-4">
            Compete with farmers worldwide and track your sustainable farming progress
          </p>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-amber-500 text-white">
              <Users className="w-3 h-3 mr-1" />
              50,247 Active Farmers
            </Badge>
            <Badge variant="secondary" className="bg-orange-500 text-white">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2,341 This Week
            </Badge>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
        </div>
      </div>

      {/* Your Ranking Card */}
      {currentUser && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>Your Current Ranking</span>
              </span>
              <Badge className={getRankBadgeColor(currentUser.rank)}>
                #{currentUser.rank}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{currentUser.experiencePoints}</div>
                <div className="text-sm text-muted-foreground">Experience Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{currentUser.sustainabilityScore}%</div>
                <div className="text-sm text-muted-foreground">Sustainability Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{currentUser.cropsGrown}</div>
                <div className="text-sm text-muted-foreground">Crops Grown</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{currentUser.waterSaved}L</div>
                <div className="text-sm text-muted-foreground">Water Saved</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress to Top 500</span>
                <span>{Math.max(0, 100 - Math.floor((currentUser.rank - 500) / 10))}%</span>
              </div>
              <Progress value={Math.max(0, 100 - Math.floor((currentUser.rank - 500) / 10))} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="bg-white/90 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium">Period:</span>
              {periods.map((period) => (
                <Button
                  key={period.id}
                  variant={selectedPeriod === period.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.id)}
                >
                  {period.name}
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Last updated: 2 minutes ago
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories and Rankings */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-white/80">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center space-x-2"
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4 mt-6">
          {/* Top 3 Podium */}
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle>Top 3 Champions</CardTitle>
              <CardDescription>The leading sustainable farmers this {selectedPeriod.replace('-', ' ')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topPlayers.slice(0, 3).map((player, index) => (
                  <div
                    key={player.id}
                    className={`relative p-6 rounded-lg text-center ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-300' :
                      index === 1 ? 'bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300' :
                      'bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-300'
                    }`}
                  >
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadgeColor(player.rank)}`}>
                        {getRankIcon(player.rank)}
                      </div>
                    </div>
                    <Avatar className="w-16 h-16 mx-auto mb-3 mt-2">
                      <AvatarFallback className="text-lg font-bold">
                        {player.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold mb-1">{player.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{player.country}</p>
                    <Badge variant="secondary" className="mb-3">
                      Level {player.level}
                    </Badge>
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-green-600">
                        {selectedCategory === 'overall' && `${player.experiencePoints} XP`}
                        {selectedCategory === 'sustainability' && `${player.sustainabilityScore}%`}
                        {selectedCategory === 'crops' && `${player.cropsGrown} crops`}
                        {selectedCategory === 'water' && `${player.waterSaved}L saved`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Full Leaderboard */}
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle>Complete Rankings</CardTitle>
              <CardDescription>Full leaderboard for {selectedCategory.replace('-', ' ')} category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadgeColor(player.rank)}`}>
                        {getRankIcon(player.rank)}
                      </div>
                      <Avatar>
                        <AvatarFallback>
                          {player.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{player.name}</span>
                          <Badge variant="outline" className="text-xs">
                            Level {player.level}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {player.country} • {player.achievements} achievements
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        {selectedCategory === 'overall' && `${player.experiencePoints} XP`}
                        {selectedCategory === 'sustainability' && `${player.sustainabilityScore}%`}
                        {selectedCategory === 'crops' && `${player.cropsGrown} crops`}
                        {selectedCategory === 'water' && `${player.waterSaved}L`}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedCategory === 'overall' && `${player.sustainabilityScore}% sustainability`}
                        {selectedCategory === 'sustainability' && `${player.experiencePoints} XP`}
                        {selectedCategory === 'crops' && `${player.waterSaved}L water saved`}
                        {selectedCategory === 'water' && `${player.cropsGrown} crops grown`}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Current User Position */}
                {currentUser && currentUser.rank > 5 && (
                  <>
                    <div className="flex items-center justify-center py-2">
                      <span className="text-sm text-muted-foreground">...</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadgeColor(currentUser.rank)}`}>
                          {getRankIcon(currentUser.rank)}
                        </div>
                        <Avatar className="ring-2 ring-blue-400">
                          <AvatarFallback className="bg-blue-100">
                            {currentUser.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{currentUser.name}</span>
                            <Badge className="bg-blue-100 text-blue-700">
                              Level {currentUser.level}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {currentUser.country} • {currentUser.achievements} achievements
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">
                          {selectedCategory === 'overall' && `${currentUser.experiencePoints} XP`}
                          {selectedCategory === 'sustainability' && `${currentUser.sustainabilityScore}%`}
                          {selectedCategory === 'crops' && `${currentUser.cropsGrown} crops`}
                          {selectedCategory === 'water' && `${currentUser.waterSaved}L`}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          That's you!
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}