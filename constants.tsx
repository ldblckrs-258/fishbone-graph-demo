import { JourneyStage, TouchpointType, TouchpointStatus, CustomerProfile, EmotionType } from './types';

export const EMOTION_EMOJI_MAP: Record<EmotionType, string> = {
  [EmotionType.HAPPY]: '😊',
  [EmotionType.EXCITED]: '🤩',
  [EmotionType.CONFUSED]: '🤔',
  [EmotionType.SATISFIED]: '😍',
  [EmotionType.LOVED]: '🥰',
  [EmotionType.NEUTRAL]: '😐',
  [EmotionType.FRUSTRATED]: '😣',
};

export const EMOTION_LABEL_MAP: Record<EmotionType, string> = {
  [EmotionType.HAPPY]: 'Happy',
  [EmotionType.EXCITED]: 'Excited',
  [EmotionType.CONFUSED]: 'Confused',
  [EmotionType.SATISFIED]: 'Satisfied',
  [EmotionType.LOVED]: 'Loved',
  [EmotionType.NEUTRAL]: 'Neutral',
  [EmotionType.FRUSTRATED]: 'Frustrated',
};

export const MOCK_CUSTOMER: CustomerProfile = {
  id: 'c1',
  name: 'TRẦN LY LY',
  role: 'Potential Customer',
  avatarUrl: 'https://picsum.photos/id/64/200/200',
  status: 'SATISFIED'
};

export const MOCK_JOURNEY: JourneyStage[] = [
  {
    id: 's1',
    order: 1,
    name: 'AWARENESS',
    date: 'Dec 29',
    emotion: EmotionType.SATISFIED,
    touchpoints: [
      {
        id: 't1-1',
        type: TouchpointType.DEFAULT,
        title: 'Advertising',
        description: 'Anniversary Campaign',
        status: TouchpointStatus.SUCCESS
      },
      {
        id: 't1-2',
        type: TouchpointType.PHONE,
        title: 'Phone Call',
        description: 'Design Consultation',
        status: TouchpointStatus.SUCCESS
      }
    ]
  },
  {
    id: 's2',
    order: 2,
    name: 'CONSIDERATION',
    date: 'Dec 29 PM',
    emotion: EmotionType.CONFUSED,
    touchpoints: [
      {
        id: 't2-1',
        type: TouchpointType.FACEBOOK,
        title: 'Facebook',
        description: 'Read Reviews',
        status: TouchpointStatus.SUCCESS
      },
      {
        id: 't2-2',
        type: TouchpointType.ISSUE,
        title: 'Issue',
        description: 'Info Overload',
        status: TouchpointStatus.WARNING
      }
    ]
  },
  {
    id: 's3',
    order: 3,
    name: 'DECISION',
    date: 'Dec 30',
    emotion: EmotionType.EXCITED,
    touchpoints: [
      {
        id: 't3-1',
        type: TouchpointType.WEB,
        title: 'Web Order',
        description: '5% Discount Applied',
        status: TouchpointStatus.SUCCESS
      }
    ]
  },
  {
    id: 's4',
    order: 4,
    name: 'DELIVERY',
    date: 'Dec 31',
    emotion: EmotionType.HAPPY,
    touchpoints: [
      {
        id: 't4-1',
        type: TouchpointType.ZALO,
        title: 'Zalo Contact',
        description: 'Shipping Confirmation',
        status: TouchpointStatus.SUCCESS
      },
      {
        id: 't4-2',
        type: TouchpointType.DEFAULT,
        title: 'Received',
        description: 'On Time',
        status: TouchpointStatus.SUCCESS
      }
    ]
  },
  {
    id: 's5',
    order: 5,
    name: 'LOYALTY',
    date: 'Jan 15',
    emotion: EmotionType.LOVED,
    touchpoints: [
      {
        id: 't5-1',
        type: TouchpointType.STORE,
        title: 'Store Visit',
        description: 'Jewelry Browsing',
        status: TouchpointStatus.SUCCESS
      },
      {
        id: 't5-2',
        type: TouchpointType.DEFAULT,
        title: 'New Purchase',
        description: 'Upsell Successful',
        status: TouchpointStatus.SUCCESS
      }
    ]
  }
];