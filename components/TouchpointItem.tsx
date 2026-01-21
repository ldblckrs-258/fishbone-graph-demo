import React from 'react';
import { 
  Mail, 
  Phone, 
  Facebook, 
  Globe, 
  MessageCircle, 
  Store, 
  AlertTriangle, 
  CheckCircle2,
  LucideIcon
} from 'lucide-react';
import { Touchpoint, TouchpointType, TouchpointStatus } from '../types';

interface TouchpointItemProps {
  data: Touchpoint;
  align: 'left' | 'right' | 'center'; // In horizontal view, we might just stack them vertically in the card
}

const getIcon = (type: TouchpointType): LucideIcon => {
  switch (type) {
    case TouchpointType.EMAIL: return Mail;
    case TouchpointType.PHONE: return Phone;
    case TouchpointType.FACEBOOK: return Facebook;
    case TouchpointType.WEB: return Globe;
    case TouchpointType.ZALO: return MessageCircle; // Approximate for Zalo
    case TouchpointType.STORE: return Store;
    case TouchpointType.ISSUE: return AlertTriangle;
    default: return CheckCircle2;
  }
};

const getColorClass = (status: TouchpointStatus, type: TouchpointType) => {
  if (status === TouchpointStatus.WARNING) return 'text-red-500 bg-red-50 border-red-200';
  if (type === TouchpointType.FACEBOOK) return 'text-blue-600 bg-blue-50 border-blue-200';
  if (type === TouchpointType.ZALO) return 'text-sky-600 bg-sky-50 border-sky-200';
  return 'text-teal-600 bg-teal-50 border-teal-200';
};

const TouchpointItem: React.FC<TouchpointItemProps> = ({ data }) => {
  const Icon = getIcon(data.type);
  const colorClass = getColorClass(data.status, data.type);

  return (
    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
      <div className={`p-1.5 rounded-full border ${colorClass} shrink-0 mt-0.5`}>
        <Icon size={14} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className={`text-xs font-bold leading-tight ${data.status === TouchpointStatus.WARNING ? 'text-red-600' : 'text-slate-700'}`}>
          {data.title}
        </span>
        {data.description && (
          <span className={`text-[10px] leading-tight mt-0.5 truncate ${data.status === TouchpointStatus.WARNING ? 'text-red-400' : 'text-slate-400'}`}>
            {data.description}
          </span>
        )}
      </div>
    </div>
  );
};

export default TouchpointItem;