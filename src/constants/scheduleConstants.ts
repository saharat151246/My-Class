import { DayInfo, ColorPreset, Course, DayOfWeek } from '../types';

export const STORAGE_KEY = 'my_class_schedule_v1';

export const DAYS: DayInfo[] = [
  {
    key: 'monday',
    labelTh: 'วันจันทร์',
    shortLabelTh: 'จันทร์',
    labelEn: 'Monday',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    badgeBg: 'bg-amber-100 text-amber-800',
    badgeText: 'text-amber-900',
  },
  {
    key: 'tuesday',
    labelTh: 'วันอังคาร',
    shortLabelTh: 'อังคาร',
    labelEn: 'Tuesday',
    color: 'text-pink-700',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    badgeBg: 'bg-pink-100 text-pink-800',
    badgeText: 'text-pink-900',
  },
  {
    key: 'wednesday',
    labelTh: 'วันพุธ',
    shortLabelTh: 'พุธ',
    labelEn: 'Wednesday',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    badgeText: 'text-emerald-900',
  },
  {
    key: 'thursday',
    labelTh: 'วันพฤหัสบดี',
    shortLabelTh: 'พฤหัสบดี',
    labelEn: 'Thursday',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    badgeBg: 'bg-orange-100 text-orange-800',
    badgeText: 'text-orange-900',
  },
  {
    key: 'friday',
    labelTh: 'วันศุกร์',
    shortLabelTh: 'ศุกร์',
    labelEn: 'Friday',
    color: 'text-sky-700',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    badgeBg: 'bg-sky-100 text-sky-800',
    badgeText: 'text-sky-900',
  },
];

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'blue',
    name: 'น้ำเงิน (Blue)',
    bgClass: 'bg-blue-50/80 hover:bg-blue-50 text-slate-900 border-blue-200 border-l-4 border-l-blue-600',
    borderClass: 'border-blue-200',
    textClass: 'text-slate-900',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200 font-semibold',
    pillBg: 'bg-blue-600',
    hex: '#2563eb',
  },
  {
    id: 'emerald',
    name: 'เขียว (Emerald)',
    bgClass: 'bg-emerald-50/80 hover:bg-emerald-50 text-slate-900 border-emerald-200 border-l-4 border-l-emerald-600',
    borderClass: 'border-emerald-200',
    textClass: 'text-slate-900',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200 font-semibold',
    pillBg: 'bg-emerald-600',
    hex: '#059669',
  },
  {
    id: 'purple',
    name: 'ม่วง (Purple)',
    bgClass: 'bg-purple-50/80 hover:bg-purple-50 text-slate-900 border-purple-200 border-l-4 border-l-purple-600',
    borderClass: 'border-purple-200',
    textClass: 'text-slate-900',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-200 font-semibold',
    pillBg: 'bg-purple-600',
    hex: '#9333ea',
  },
  {
    id: 'amber',
    name: 'เหลือง/ส้มอ่อน (Amber)',
    bgClass: 'bg-amber-50/80 hover:bg-amber-50 text-slate-900 border-amber-200 border-l-4 border-l-amber-600',
    borderClass: 'border-amber-200',
    textClass: 'text-slate-900',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200 font-semibold',
    pillBg: 'bg-amber-600',
    hex: '#d97706',
  },
  {
    id: 'rose',
    name: 'ชมพู (Rose)',
    bgClass: 'bg-rose-50/80 hover:bg-rose-50 text-slate-900 border-rose-200 border-l-4 border-l-rose-600',
    borderClass: 'border-rose-200',
    textClass: 'text-slate-900',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-200 font-semibold',
    pillBg: 'bg-rose-600',
    hex: '#e11d48',
  },
  {
    id: 'indigo',
    name: 'ครามเข้ม (Indigo)',
    bgClass: 'bg-indigo-50/80 hover:bg-indigo-50 text-slate-900 border-indigo-200 border-l-4 border-l-indigo-600',
    borderClass: 'border-indigo-200',
    textClass: 'text-slate-900',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200 font-semibold',
    pillBg: 'bg-indigo-600',
    hex: '#4f46e5',
  },
  {
    id: 'cyan',
    name: 'ฟ้าคราม (Cyan)',
    bgClass: 'bg-cyan-50/80 hover:bg-cyan-50 text-slate-900 border-cyan-200 border-l-4 border-l-cyan-600',
    borderClass: 'border-cyan-200',
    textClass: 'text-slate-900',
    badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-200 font-semibold',
    pillBg: 'bg-cyan-600',
    hex: '#0891b2',
  },
  {
    id: 'orange',
    name: 'ส้มอิฐ (Orange)',
    bgClass: 'bg-orange-50/80 hover:bg-orange-50 text-slate-900 border-orange-200 border-l-4 border-l-orange-600',
    borderClass: 'border-orange-200',
    textClass: 'text-slate-900',
    badgeClass: 'bg-orange-100 text-orange-800 border-orange-200 font-semibold',
    pillBg: 'bg-orange-600',
    hex: '#ea580c',
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    name: 'Data Structures and Algorithms',
    code: 'CS201',
    day: 'monday',
    startTime: '09:00',
    endTime: '12:00',
    room: 'อาคารเรียนรวม 402',
    section: '01',
    colorTheme: 'blue',
  },
  {
    id: 'course-2',
    name: 'Web Application Development',
    code: 'CS315',
    day: 'tuesday',
    startTime: '13:00',
    endTime: '16:00',
    room: 'Lab คอมพิวเตอร์ 3',
    section: '02',
    colorTheme: 'emerald',
  },
  {
    id: 'course-3',
    name: 'Calculus for Engineers II',
    code: 'MA102',
    day: 'wednesday',
    startTime: '09:30',
    endTime: '11:30',
    room: 'SCB-2101',
    section: '05',
    colorTheme: 'purple',
  },
  {
    id: 'course-4',
    name: 'English for Academic Communication',
    code: 'LNG220',
    day: 'wednesday',
    startTime: '13:00',
    endTime: '15:00',
    room: 'LC-304',
    section: '12',
    colorTheme: 'amber',
  },
  {
    id: 'course-5',
    name: 'Database System Design',
    code: 'CS221',
    day: 'thursday',
    startTime: '09:00',
    endTime: '12:00',
    room: 'ECC-701',
    section: '01',
    colorTheme: 'cyan',
  },
  {
    id: 'course-6',
    name: 'Computer Networks & Security',
    code: 'CS330',
    day: 'friday',
    startTime: '10:00',
    endTime: '12:00',
    room: 'IT-502',
    section: '03',
    colorTheme: 'rose',
  },
];

export const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

export function timeToMinutes(timeStr?: string | null): number {
  if (!timeStr || typeof timeStr !== 'string') return 0;
  const parts = timeStr.split(':');
  if (parts.length !== 2) return 0;
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  if (isNaN(hours) || isNaN(minutes)) return 0;
  return Math.max(0, hours * 60 + minutes);
}

export function minutesToTime(minutes?: number | null): string {
  if (typeof minutes !== 'number' || isNaN(minutes) || minutes < 0) return '00:00';
  const h = Math.min(23, Math.floor(minutes / 60));
  const m = Math.min(59, Math.floor(minutes % 60));
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export function calculateDurationHours(startTime?: string | null, endTime?: string | null): number {
  if (!startTime || !endTime) return 0;
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  if (end <= start) return 0;
  return Number(((end - start) / 60).toFixed(1));
}

export function getColorPreset(id?: string | null): ColorPreset {
  if (!id) return COLOR_PRESETS[0];
  return COLOR_PRESETS.find((p) => p.id === id) || COLOR_PRESETS[0];
}

export function getDayInfo(day?: DayOfWeek | string | null): DayInfo {
  if (!day) return DAYS[0];
  return DAYS.find((d) => d.key === day) || DAYS[0];
}

export const DAY_ORDER: Record<DayOfWeek, number> = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
};
