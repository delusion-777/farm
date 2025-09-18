import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Enhanced3DFarmGame } from './components/Enhanced3DFarmGame';
import { EnhancedLibrary } from './components/EnhancedLibrary';
import { Leaderboard } from './components/Leaderboard';
import { GovernmentStore } from './components/GovernmentStore';
import { TipsPopup } from './components/TipsPopup';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [coins, setCoins] = useState(1250);
  const [userName] = useState('Krishi Mitra');
  const [userLevel] = useState(8);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleCoinsUpdate = (newCoins: number) => {
    setCoins(newCoins);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewChange={setCurrentView} />;
      case 'game':
        return <Enhanced3DFarmGame onCoinsUpdate={handleCoinsUpdate} currentCoins={coins} />;
      case 'library':
        return <EnhancedLibrary onCoinsUpdate={handleCoinsUpdate} currentCoins={coins} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'store':
        return <GovernmentStore 
          currentCoins={coins} 
          onCoinsUpdate={handleCoinsUpdate}
          selectedLanguage={selectedLanguage}
        />;
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        coins={coins}
        userName={userName}
        userLevel={userLevel}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />
      
      <main className="relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
        
        <div className="relative z-10">
          {renderCurrentView()}
        </div>
        
        {/* Tips Popup */}
        <TipsPopup selectedLanguage={selectedLanguage} />
        
        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'white',
              color: '#1f2937',
              border: '1px solid #d1d5db'
            }
          }}
        />
      </main>
    </div>
  );
}