import React from 'react';
import { CustomerProfile, JourneyStage } from '../types';
import StageNode from './StageNode';
import { Smile } from 'lucide-react';

interface JourneyMapProps {
  customer: CustomerProfile;
  stages: JourneyStage[];
  isVertical?: boolean;
}

const JourneyMap: React.FC<JourneyMapProps> = ({ customer, stages, isVertical = false }) => {
  return (
    <div className="flex flex-col h-full w-full bg-slate-50 relative overflow-hidden">
      
      {/* Background Grid Pattern for texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Main Scroll Area */}
      <div className={`flex-1 ${isVertical ? 'overflow-y-auto overflow-x-hidden' : 'overflow-x-auto overflow-y-hidden'} no-scrollbar cursor-grab active:cursor-grabbing select-none relative z-10`}>
        
        {/* Container */}
        <div className={`
          ${isVertical 
            ? 'flex flex-col items-center w-full min-h-full py-20 px-4' 
            : 'flex flex-row items-center h-full min-h-[600px] min-w-max px-20 pt-20'
          }
        `}>
          
          {/* Start Node: Customer Profile */}
          <div className={`flex items-center justify-center z-30 group relative w-48 shrink-0 ${isVertical ? 'mb-0 flex-col-reverse gap-4' : 'mr-0 flex-col'}`}>
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden relative z-10 ring-4 ring-sky-100 group-hover:ring-sky-200 transition-all duration-500 group-hover:scale-105">
                <img src={customer.avatarUrl} alt={customer.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20 whitespace-nowrap shadow-sm">
                START
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <h1 className="text-lg font-black text-slate-800 uppercase tracking-tight">{customer.name}</h1>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{customer.role}</p>
            </div>

            {/* Connector to first line */}
            {isVertical ? (
               <div className="absolute top-[60%] left-1/2 w-[3px] h-20 bg-sky-500 -z-10 -translate-x-1/2"></div>
            ) : (
               <div className="absolute top-1/2 left-[50%] w-[50%] h-[3px] bg-sky-500 -z-10 translate-y-[-1.5px]"></div>
            )}
          </div>

          {/* Render Stages Dynamically */}
          {stages.map((stage, index) => {
            const isTop = index % 2 === 0; 
            
            // Layout calculations
            let className = '';
            if (isVertical) {
               // Vertical compaction: negative top margin
               className = index === 0 ? '' : '-mt-24';
            } else {
               // Horizontal compaction: negative left margin
               className = index === 0 ? '' : '-ml-40';
            }

            return (
              <StageNode 
                key={stage.id} 
                stage={stage} 
                isTop={isTop} // In vertical: isTop=true means Left, isTop=false means Right
                isLast={index === stages.length - 1}
                className={className}
                mode={isVertical ? 'vertical' : 'horizontal'}
              />
            );
          })}

          {/* End Node: Satisfaction */}
          <div className={`flex flex-col items-center justify-center relative z-30 w-48 shrink-0 ${isVertical ? '-mt-12' : '-ml-20'}`}>
             {/* Connector from last line */}
             {isVertical ? (
                <div className="absolute bottom-[50%] left-1/2 w-[3px] h-[50%] bg-sky-500 -z-10 opacity-75 -translate-x-1/2"></div>
             ) : (
                <div className="absolute top-1/2 right-[50%] w-[50%] h-[3px] bg-sky-500 -z-10 opacity-75 translate-y-[-1.5px]"></div>
             )}

            <div className="relative group">
              <div className="w-16 h-16 rounded-full bg-teal-500 shadow-xl shadow-teal-500/20 flex items-center justify-center text-white ring-4 ring-white relative z-10 animate-bounce-slow transition-transform hover:scale-110">
                <Smile size={32} strokeWidth={2.5} />
              </div>
              <div className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-20"></div>
            </div>
            <div className="mt-4 text-center">
               <h2 className="text-sm font-black text-teal-600 uppercase tracking-wide">
                 {customer.status}
               </h2>
            </div>
          </div>

          {/* Extra padding */}
          <div className={`${isVertical ? 'h-24' : 'w-24'} shrink-0`}></div>
        </div>
      </div>
      
      {/* Legend / Footer Controls */}
      <div className="absolute bottom-6 left-8 bg-white/90 backdrop-blur-sm p-3 px-5 rounded-full shadow-sm border border-slate-100 flex gap-6 text-xs text-slate-500 z-30">
        <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-sky-500 rounded-full"></div>
            <span className="font-medium">Positive</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
            <span className="font-medium">Issues</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-teal-500 rounded-full"></div>
            <span className="font-medium">Result</span>
        </div>
      </div>

    </div>
  );
};

export default JourneyMap;