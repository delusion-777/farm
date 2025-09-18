import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Coins, User, Settings, Trophy, BookOpen, Gamepad2, BarChart3, ShoppingCart } from 'lucide-react';
import { Badge } from './ui/badge';
import { LanguageSelector } from './LanguageSelector';
import { KrishiMitraLogo } from './KrishiMitraLogo';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  coins: number;
  userName: string;
  userLevel: number;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function Header({ currentView, onViewChange, coins, userName, userLevel, selectedLanguage, onLanguageChange }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <KrishiMitraLogo size="md" showText={true} />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Button
              variant={currentView === 'dashboard' ? 'secondary' : 'ghost'}
              onClick={() => onViewChange('dashboard')}
              className="text-white hover:bg-green-600"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={currentView === 'game' ? 'secondary' : 'ghost'}
              onClick={() => onViewChange('game')}
              className="text-white hover:bg-green-600"
            >
              <Gamepad2 className="w-4 h-4 mr-2" />
              Farm Game
            </Button>
            <Button
              variant={currentView === 'library' ? 'secondary' : 'ghost'}
              onClick={() => onViewChange('library')}
              className="text-white hover:bg-green-600"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Library
            </Button>
            <Button
              variant={currentView === 'leaderboard' ? 'secondary' : 'ghost'}
              onClick={() => onViewChange('leaderboard')}
              className="text-white hover:bg-green-600"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Leaderboard
            </Button>
            <Button
              variant={currentView === 'store' ? 'secondary' : 'ghost'}
              onClick={() => onViewChange('store')}
              className="text-white hover:bg-green-600"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Store
            </Button>
          </nav>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
            />

            {/* Coins */}
            <div className="flex items-center space-x-2 bg-yellow-500 px-3 py-1 rounded-full">
              <Coins className="w-4 h-4" />
              <span className="font-bold">{coins.toLocaleString()}</span>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="font-medium">{userName}</p>
                <Badge variant="secondary" className="text-xs">
                  Level {userLevel}
                </Badge>
              </div>
              <Avatar>
                <AvatarImage src="/placeholder-avatar.png" />
                <AvatarFallback className="bg-green-500">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex space-x-1 overflow-x-auto">
          <Button
            variant={currentView === 'dashboard' ? 'secondary' : 'ghost'}
            onClick={() => onViewChange('dashboard')}
            size="sm"
            className="text-white hover:bg-green-600"
          >
            <BarChart3 className="w-4 h-4" />
          </Button>
          <Button
            variant={currentView === 'game' ? 'secondary' : 'ghost'}
            onClick={() => onViewChange('game')}
            size="sm"
            className="text-white hover:bg-green-600"
          >
            <Gamepad2 className="w-4 h-4" />
          </Button>
          <Button
            variant={currentView === 'library' ? 'secondary' : 'ghost'}
            onClick={() => onViewChange('library')}
            size="sm"
            className="text-white hover:bg-green-600"
          >
            <BookOpen className="w-4 h-4" />
          </Button>
          <Button
            variant={currentView === 'leaderboard' ? 'secondary' : 'ghost'}
            onClick={() => onViewChange('leaderboard')}
            size="sm"
            className="text-white hover:bg-green-600"
          >
            <Trophy className="w-4 h-4" />
          </Button>
          <Button
            variant={currentView === 'store' ? 'secondary' : 'ghost'}
            onClick={() => onViewChange('store')}
            size="sm"
            className="text-white hover:bg-green-600"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </nav>
      </div>
    </header>
  );
}