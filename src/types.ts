export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export interface DayInfo {
  key: DayOfWeek;
  labelTh: string;
  shortLabelTh: string;
  labelEn: string;
  color: string;
  bgColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
}

export interface Course {
  id: string;
  name: string; // ชื่อวิชา
  code: string; // รหัสวิชา
  day: DayOfWeek; // วันเรียน
  startTime: string; // เวลาเริ่มเรียน (HH:mm)
  endTime: string; // เวลาสิ้นสุด (HH:mm)
  room: string; // ห้องเรียน
  section: string; // Section / กลุ่มเรียน
  colorTheme: string; // สีสำหรับแยกวิชา
}

export type ViewMode = 'table' | 'list';

export interface CourseFormData {
  name: string;
  code: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  room: string;
  section: string;
  colorTheme: string;
}

export interface FormErrors {
  name?: string;
  code?: string;
  day?: string;
  startTime?: string;
  endTime?: string;
  room?: string;
  section?: string;
  general?: string;
}

export interface ColorPreset {
  id: string;
  name: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  badgeClass: string;
  pillBg: string;
  hex: string;
}
