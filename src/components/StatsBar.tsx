import React from 'react';
import { BookOpen, CalendarDays, Clock, CheckCircle2 } from 'lucide-react';
import { Course } from '../types';
import { calculateDurationHours } from '../constants/scheduleConstants';

interface StatsBarProps {
  courses: Course[];
}

export const StatsBar: React.FC<StatsBarProps> = ({ courses = [] }) => {
  const safeCourses = Array.isArray(courses) ? courses : [];
  const totalCourses = safeCourses.length;

  // Calculate unique days with classes
  const uniqueDays = new Set(safeCourses.map((c) => c?.day).filter(Boolean)).size;

  // Calculate total study hours
  const totalHours = safeCourses.reduce((acc, c) => {
    if (!c) return acc;
    return acc + calculateDurationHours(c.startTime, c.endTime);
  }, 0);

  // Formatted hours string
  const formattedHours = totalHours % 1 === 0 ? totalHours.toString() : totalHours.toFixed(1);

  return (
    <div id="stats-summary-section" className="grid grid-cols-1 min-[500px]:grid-cols-3 gap-2.5 sm:gap-4 mb-5 sm:mb-6">
      {/* Total Courses Card */}
      <div
        id="stat-card-total-courses"
        className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between"
      >
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-xs sm:text-sm font-medium text-slate-500">จำนวนวิชาทั้งหมด</p>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {totalCourses}
            </span>
            <span className="text-xs sm:text-sm text-slate-500 font-normal">วิชา</span>
          </div>
        </div>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      {/* Class Days per Week Card */}
      <div
        id="stat-card-class-days"
        className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between"
      >
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-xs sm:text-sm font-medium text-slate-500">จำนวนวันที่มีเรียน</p>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {uniqueDays}
            </span>
            <span className="text-xs sm:text-sm text-slate-500 font-normal">/ 5 วัน</span>
          </div>
        </div>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
          <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      {/* Weekly Hours Card */}
      <div
        id="stat-card-weekly-hours"
        className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between"
      >
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-xs sm:text-sm font-medium text-slate-500">ชั่วโมงเรียนต่อสัปดาห์</p>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {formattedHours}
            </span>
            <span className="text-xs sm:text-sm text-slate-500 font-normal">ชม./สัปดาห์</span>
          </div>
        </div>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
    </div>
  );
};
