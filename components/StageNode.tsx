import React from 'react';
import { JourneyStage } from '../types';
import TouchpointItem from './TouchpointItem';
import { EMOTION_EMOJI_MAP, EMOTION_LABEL_MAP } from '../constants';

interface StageNodeProps {
  stage: JourneyStage;
  isTop: boolean; // Also acts as "isLeft" in vertical mode
  isLast: boolean;
  className?: string;
  mode?: 'horizontal' | 'vertical';
}

const StageNode: React.FC<StageNodeProps> = ({ stage, isTop, isLast, className = '', mode = 'horizontal' }) => {
  if (mode === 'vertical') {
    return <VerticalLayout stage={stage} isLeft={isTop} isLast={isLast} className={className} />;
  }
  return <HorizontalLayout stage={stage} isTop={isTop} isLast={isLast} className={className} />;
};

// ----------------------------------------------------------------------
// VERTICAL LAYOUT IMPLEMENTATION
// ----------------------------------------------------------------------
const VerticalLayout: React.FC<{ stage: JourneyStage; isLeft: boolean; isLast: boolean; className?: string }> = ({ stage, isLeft, isLast, className }) => {
    // Dimensions
    const STEM_WIDTH = 100; // Distance from center axis to sub-axis
  
    return (
      <div className={`relative w-[600px] flex shrink-0 group/node pointer-events-none min-h-[220px] ${className}`}>
        
        {/* --- CENTRAL AXIS --- */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-sky-500 z-0 pointer-events-auto">
            {isLast && <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-sky-500 to-transparent"></div>}
        </div>
  
        {/* Main Connection Dot (Emoji) */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-sky-100 rounded-full z-20 shadow-md flex items-center justify-center text-xl transition-transform duration-300 group-hover/node:scale-125 pointer-events-auto select-none">
            {EMOTION_EMOJI_MAP[stage.emotion]}
        </div>

        {/* Emotion Label (Opposite to Content) */}
        <div 
            className={`absolute top-12 -translate-y-1/2 text-xs font-bold text-slate-500 bg-slate-50/80 px-2 py-0.5 rounded-full border border-slate-200/50 backdrop-blur-sm z-10 whitespace-nowrap transition-opacity group-hover/node:opacity-100 ${
                isLeft 
                    ? 'left-[calc(50%+28px)]' 
                    : 'right-[calc(50%+28px)]'
            }`}
        >
            {EMOTION_LABEL_MAP[stage.emotion]}
        </div>
  
        {/* --- LEFT SIDE (Content if isLeft) --- */}
        <div className={`flex-1 relative ${!isLeft ? 'invisible' : ''}`}>
           {isLeft && <VerticalBranchContent stage={stage} isLeft={true} stemWidth={STEM_WIDTH} />}
        </div>
  
        {/* --- RIGHT SIDE (Content if !isLeft) --- */}
        <div className={`flex-1 relative ${isLeft ? 'invisible' : ''}`}>
           {!isLeft && <VerticalBranchContent stage={stage} isLeft={false} stemWidth={STEM_WIDTH} />}
        </div>
  
      </div>
    );
};

const VerticalBranchContent: React.FC<{ stage: JourneyStage; isLeft: boolean; stemWidth: number }> = ({ stage, isLeft, stemWidth }) => {
    const TOP_OFFSET = '3rem'; // Matches the top-12 of the dot (12 * 0.25rem = 3rem)
    const GAP_TO_SUB_AXIS = 20; // 2rem fixed gap

    return (
        <div className="relative w-full h-full pointer-events-auto">
            
            {/* --- STEM & SUB-AXIS (Absolute) --- */}
            <div className="absolute w-full h-full pointer-events-none z-0">
                
                {/* Horizontal Stem: From side of container (which is center of screen) outwards */}
                <div 
                    className="absolute bg-sky-300 h-[2px] group-hover/node:bg-sky-400 transition-colors"
                    style={{
                        top: TOP_OFFSET,
                        width: `${stemWidth}px`,
                        [isLeft ? 'right' : 'left']: 0
                    }}
                />

                {/* Vertical Sub-Axis: Goes Down */}
                <div 
                    className="absolute bg-sky-300 w-[2px] group-hover/node:bg-sky-400 transition-colors bottom-0"
                    style={{
                        top: TOP_OFFSET,
                        [isLeft ? 'right' : 'left']: `${stemWidth}px`
                    }}
                />

                {/* Date Pill on Stem */}
                <div 
                    className="absolute -translate-y-1/2 bg-white border border-sky-400 text-sky-600 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm z-30"
                    style={{
                        top: TOP_OFFSET,
                        [isLeft ? 'right' : 'left']: `${stemWidth / 2}px`,
                        transform: `translate(${isLeft ? '50%' : '-50%'}, -50%)`
                    }}
                >
                    {stage.date}
                </div>

                {/* Stage Title */}
                <div 
                    className={`absolute font-extrabold text-slate-700 uppercase text-xs tracking-wider z-10 whitespace-nowrap ${isLeft ? 'text-right' : 'text-left'}`}
                    style={{
                        top: `calc(${TOP_OFFSET} - 30px)`,
                        [isLeft ? 'right' : 'left']: '16px'
                    }}
                >
                    {stage.order}. {stage.name}
                </div>
            </div>

            {/* --- TOUCHPOINTS CONTENT (Vertical Flow) --- */}
            <div 
                className={`flex flex-col items-${isLeft ? 'end' : 'start'} relative z-10 gap-6`}
                style={{
                    paddingTop: '4rem', // Start below the stem
                    [isLeft ? 'paddingRight' : 'paddingLeft']: `calc(${stemWidth}px + ${GAP_TO_SUB_AXIS}px)` 
                }}
            >
                 {stage.touchpoints.map((tp, idx) => {
                     return (
                        <div 
                            key={tp.id} 
                            className={`relative group/card w-48 flex ${isLeft ? 'justify-end' : 'justify-start'} transition-all duration-300`}
                            style={{
                                zIndex: idx
                            }}
                        >
                             {/* Dot on Sub-Axis */}
                             <div 
                                className="absolute top-1/2 w-2 h-2 bg-sky-400 rounded-full ring-2 ring-slate-50 z-20 group-hover/node:bg-sky-500"
                                style={{
                                    [isLeft ? 'right' : 'left']: `-${GAP_TO_SUB_AXIS-1}px`,
                                    transform: `translate(${isLeft ? '50%' : '-50%'},-2px)`
                                }}
                             />

                             {/* Connector Line */}
                             <div 
                                className="absolute top-1/2 h-[2px] bg-sky-200 group-hover/node:bg-sky-300 transition-colors"
                                style={{
                                    width: `${GAP_TO_SUB_AXIS}px`,
                                    [isLeft ? 'right' : 'left']: `-${GAP_TO_SUB_AXIS}px`
                                }}
                             />

                             {/* Card */}
                             <div className="w-48 bg-white/90 backdrop-blur-sm border border-slate-200 p-2 rounded-xl shadow-sm hover:shadow-xl hover:ring-2 hover:ring-sky-100 transition-all z-30 relative hover:z-50 hover:scale-105">
                                <TouchpointItem data={tp} align="left" />
                             </div>
                        </div>
                     )
                 })}
            </div>

        </div>
    )
}


// ----------------------------------------------------------------------
// HORIZONTAL LAYOUT IMPLEMENTATION (Original Logic)
// ----------------------------------------------------------------------
const HorizontalLayout: React.FC<{ stage: JourneyStage; isTop: boolean; isLast: boolean; className?: string }> = ({ stage, isTop, isLast, className }) => {
    return (
      <div className={`relative h-full flex flex-col justify-center shrink-0 group/node min-w-[320px] pointer-events-none ${className}`}>
        
        {/* --- CENTRAL AXIS --- */}
        <div className={`absolute top-1/2 left-0 w-full h-[3px] bg-sky-500 -translate-y-1/2 z-0 pointer-events-auto ${isLast ? 'w-1/2 bg-gradient-to-r from-sky-500 to-transparent' : ''}`} />
        
        {/* Main Connection Dot (Emoji) */}
        <div className="absolute top-1/2 left-12 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-sky-100 rounded-full z-20 shadow-md flex items-center justify-center text-xl transition-transform duration-300 group-hover/node:scale-125 pointer-events-auto select-none">
            {EMOTION_EMOJI_MAP[stage.emotion]}
        </div>
        
        {/* Emotion Label (Opposite to Content) */}
        <div 
            className={`absolute left-12 -translate-x-1/2 text-xs font-bold text-slate-500 bg-slate-50/80 px-2 py-0.5 rounded-full border border-slate-200/50 backdrop-blur-sm z-10 whitespace-nowrap transition-opacity group-hover/node:opacity-100 ${
                isTop 
                    ? 'top-[calc(50%+28px)]' 
                    : 'bottom-[calc(50%+28px)]'
            }`}
        >
            {EMOTION_LABEL_MAP[stage.emotion]}
        </div>
  
        {/* --- TOP HALF --- */}
        <div className={`flex-1 flex flex-col justify-end w-full relative ${isTop ? '' : 'invisible'}`}>
          {isTop && <HorizontalBranchContent stage={stage} isTop={true} />}
        </div>
  
        {/* --- BOTTOM HALF --- */}
        <div className={`flex-1 flex flex-col justify-start w-full relative ${!isTop ? '' : 'invisible'}`}>
          {!isTop && <HorizontalBranchContent stage={stage} isTop={false} />}
        </div>
  
      </div>
    );
};

const HorizontalBranchContent: React.FC<{ stage: JourneyStage; isTop: boolean }> = ({ stage, isTop }) => {
  const STEM_HEIGHT = 140;
  const LEFT_OFFSET = '3rem';

  return (
    <div className="relative flex flex-col w-max pointer-events-auto">
       <div className="absolute w-full h-full pointer-events-none z-0">
          <div 
            className="absolute bg-sky-300 w-[2px] group-hover/node:bg-sky-400 transition-colors"
            style={{
              left: LEFT_OFFSET,
              height: `${STEM_HEIGHT}px`,
              [isTop ? 'bottom' : 'top']: 0
            }}
          ></div>

          <div 
            className="absolute bg-sky-300 h-[2px] group-hover/node:bg-sky-400 transition-colors right-[10%]"
            style={{
              left: LEFT_OFFSET,
              [isTop ? 'bottom' : 'top']: `${STEM_HEIGHT}px`
            }}
          ></div>

          <div 
            className="absolute -translate-x-1/2 bg-white border border-sky-400 text-sky-600 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm z-30"
            style={{
              left: LEFT_OFFSET,
              [isTop ? 'bottom' : 'top']: `${STEM_HEIGHT / 2}px`,
              transform: `translate(-50%, ${isTop ? '50%' : '-50%'})`
            }}
          >
            {stage.date}
          </div>

           <div 
             className="absolute font-extrabold text-slate-700 uppercase text-xs tracking-wider z-10 whitespace-nowrap"
             style={{
                left: LEFT_OFFSET,
                [isTop ? 'bottom' : 'top']: `${STEM_HEIGHT + 8}px`,
                transform: 'translateX(-50%)'
             }}
           >
             {stage.order}. {stage.name}
           </div>
       </div>

       <div 
          className="flex flex-row items-center pl-24 pr-8 z-10"
          style={{
            [isTop ? 'marginBottom' : 'marginTop']: `${STEM_HEIGHT}px`,
            height: '0px' 
          }}
       >
          {stage.touchpoints.map((tp, idx) => {
             const isEven = idx % 2 === 0;
             const isOutward = isEven;
             const CARD_OFFSET = 30; 

             return (
               <div 
                  key={tp.id} 
                  className="relative group/card w-48 flex justify-start transition-all duration-300"
                  style={{
                    marginLeft: idx === 0 ? 0 : '-6rem' 
                  }}
               >
                  <div className="absolute left-[25px] w-2 h-2 bg-sky-400 rounded-full ring-2 ring-slate-50 z-20 group-hover/node:bg-sky-500 -top-1"></div>

                  <div 
                    className="absolute w-[2px] bg-sky-200 group-hover/node:bg-sky-300 transition-colors left-8"
                    style={{
                      height: `${CARD_OFFSET}px`,
                      [isTop ? (isOutward ? 'bottom' : 'top') : (isOutward ? 'top' : 'bottom')]: 0
                    }}
                  ></div>

                  <div 
                    className="absolute transition-all duration-300 hover:scale-110 hover:z-50 z-30"
                    style={{
                       [isTop ? (isOutward ? 'bottom' : 'top') : (isOutward ? 'top' : 'bottom')]: `${CARD_OFFSET}px`
                    }}
                  >
                     <div className="w-48 bg-white/90 backdrop-blur-sm border border-slate-200 p-2 rounded-xl shadow-sm hover:shadow-xl hover:ring-2 hover:ring-sky-100 transition-all">
                        <TouchpointItem data={tp} align="left" />
                     </div>
                  </div>
               </div>
             );
          })}
       </div>
    </div>
  );
};

export default StageNode;