import { LucideIcon } from 'lucide-react';

export enum TouchpointType {
  EMAIL = 'email',
  PHONE = 'phone',
  FACEBOOK = 'facebook',
  WEB = 'web',
  ZALO = 'zalo',
  STORE = 'store',
  ISSUE = 'issue',
  DEFAULT = 'default'
}

export enum TouchpointStatus {
  SUCCESS = 'success', // Normal/Good
  WARNING = 'warning', // Issues
  NEUTRAL = 'neutral'
}

export enum EmotionType {
  HAPPY = 'happy',
  EXCITED = 'excited',
  CONFUSED = 'confused',
  SATISFIED = 'satisfied',
  LOVED = 'loved',
  NEUTRAL = 'neutral',
  FRUSTRATED = 'frustrated'
}

export interface Touchpoint {
  id: string;
  type: TouchpointType;
  title: string;
  description?: string;
  status: TouchpointStatus;
  timestamp?: string;
}

export interface JourneyStage {
  id: string;
  order: number;
  name: string;
  date: string;
  emotion: EmotionType; // Use Enum instead of raw string
  touchpoints: Touchpoint[];
}

export interface CustomerProfile {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  status: string;
}