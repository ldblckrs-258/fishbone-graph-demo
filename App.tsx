import React, { useState } from 'react';
import JourneyMap from './components/JourneyMap';
import { MOCK_CUSTOMER, MOCK_JOURNEY } from './constants';
import { LayoutTemplate, Rows } from 'lucide-react';

const App: React.FC = () => {
  const [isVertical, setIsVertical] = useState(false);

  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-50 flex flex-col">
        {/* Simple Top Bar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-40 shadow-sm">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
                <span className="font-bold text-slate-800 tracking-tight">Customer<span className="text-blue-600">Journey</span></span>
            </div>
            <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsVertical(!isVertical)}
                  className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-md transition-colors border border-transparent hover:border-slate-200"
                  title={isVertical ? "Switch to Horizontal View" : "Switch to Vertical View"}
                >
                  {isVertical ? <LayoutTemplate size={18} /> : <Rows size={18} className="rotate-90" />}
                  <span className="text-sm font-medium hidden sm:inline">{isVertical ? 'Horizontal View' : 'Vertical View'}</span>
                </button>
                <div className="h-4 w-[1px] bg-slate-300 mx-1"></div>
                <button className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Export Report</button>
                <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm shadow-blue-600/20">
                    Edit Map
                </button>
            </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 relative overflow-hidden">
            <JourneyMap 
                customer={MOCK_CUSTOMER} 
                stages={MOCK_JOURNEY} 
                isVertical={isVertical}
            />
        </main>
    </div>
  );
};

export default App;