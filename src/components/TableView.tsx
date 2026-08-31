import React, { useState } from 'react';
import {
  Edit2,
  Trash2,
  MapPin,
  Clock,
  Plus,
} from 'lucide-react';
import { Course, DayOfWeek } from '../types';
import {
  DAYS,
  getColorPreset,
  timeToMinutes,
  calculateDurationHours,
} from '../constants/scheduleConstants';

interface TableViewProps {
  courses: Course[];
  onEditCourse: (course) => void;
  onDeleteCourse: (course) => void;
  onAddCourseForDay?: (day: DayOfWeek) => void;
}

export const TableView: React.FC<TableViewProps> = ({
  courses = [],
  onEditCourse,
  onDeleteCourse,
  onAddCourseForDay,
}) => {
  const safeCourses = Array.isArray(courses) ? courses : [];

  // Mobile day selector filter
  const [selectedMobileDay, setSelectedMobileDay] = useState<DayOfWeek | 'all'>('all');

  // Time range calculation (default 08:00 to 18:00, dynamic expand)
  let minHour = 8;
  let maxHour = 18;

  safeCourses.forEach((c) => {
    if (!c || !c.startTime || !c.endTime) return;
    const startHour = Math.floor(timeToMinutes(c.startTime) / 60);
    const endHour = Math.ceil(timeToMinutes(c.endTime) / 60);
    if (startHour > 0 && startHour < minHour) minHour = Math.max(7, startHour);
    if (endHour > maxHour) maxHour = Math.min(22, endHour);
  });

  const totalHours = maxHour - minHour;
  const startGridMinutes = minHour * 60;
  const totalGridMinutes = totalHours * 60;

  // Hourly markers
  const hoursList: number[] = [];
  for (let h = minHour; h < maxHour; h++) {
    hoursList.push(h);
  }

  const filteredDays =
    selectedMobileDay === 'all'
      ? DAYS
      : DAYS.filter((d) => d.key === selectedMobileDay);

  return (
    <div
      id="timetable-wrapper"
      className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden w-full max-w-full"
    >
      {/* Day Filter Toolbar */}
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-slate-100 bg-slate-50/60">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none w-full">
          <button
            type="button"
            id="filter-day-all"
            onClick={() => setSelectedMobileDay('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap min-h-[32px] flex items-center shrink-0 active:scale-95 ${
              selectedMobileDay === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            ทั้งหมด
          </button>
          {DAYS.map((d) => {
            const count = safeCourses.filter((c) => c && c.day === d.key).length;
            const isSelected = selectedMobileDay === d.key;
            return (
              <button
                key={d.key}
                type="button"
                id={`filter-day-${d.key}`}
                onClick={() => setSelectedMobileDay(d.key)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap min-h-[32px] flex items-center space-x-1 shrink-0 active:scale-95 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{d.shortLabelTh}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono leading-none ${
                      isSelected
                        ? 'bg-blue-800/60 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Timetable Canvas */}
      <div className="timetable-scroll-container overflow-x-auto w-full max-w-full relative touch-pan-x overscroll-x-contain">
        <div className="min-w-[700px] sm:min-w-[820px] lg:min-w-[960px] p-3 sm:p-4 lg:p-5">
          {/* Header Row: Time Ruler */}
          <div className="flex items-center mb-2">
            {/* Day Column Header */}
            <div className="w-[80px] sm:w-[100px] md:w-[110px] shrink-0 pr-2 sm:pr-3 sticky left-0 z-20 bg-white">
              <div className="py-1.5 px-2 rounded-lg bg-slate-100 text-slate-500 text-[10px] sm:text-xs font-semibold text-center">
                วัน / เวลา
              </div>
            </div>

            {/* Time Columns */}
            <div
              className="flex-1 grid"
              style={{ gridTemplateColumns: `repeat(${totalHours}, minmax(0, 1fr))` }}
            >
              {hoursList.map((hour) => (
                <div
                  key={hour}
                  className="text-center border-l border-slate-200/70 pl-1 py-0.5"
                >
                  <span className="font-mono text-[11px] sm:text-xs font-semibold text-slate-600 block">
                    {hour.toString().padStart(2, '0')}:00
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Day Tracks */}
          <div className="space-y-2">
            {filteredDays.map((day) => {
              const dayCourses = safeCourses
                .filter((c) => c && c.day === day.key)
                .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

              return (
                <div
                  key={day.key}
                  id={`day-track-${day.key}`}
                  className="flex items-stretch rounded-xl border border-slate-200/80 bg-slate-50/30 hover:bg-slate-50/50 transition-colors group"
                >
                  {/* Left: Day Label (Sticky) */}
                  <div className="w-[80px] sm:w-[100px] md:w-[110px] shrink-0 p-2 sm:p-2.5 sticky left-0 z-10 bg-white border-r border-slate-200/80 flex flex-col justify-between rounded-l-xl shadow-[2px_0_4px_-2px_rgba(0,0,0,0.04)]">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${day.bgColor} ${day.borderColor} border shrink-0`}
                        />
                        <h4 className={`text-xs sm:text-sm font-bold ${day.color} truncate`}>
                          {day.shortLabelTh}
                        </h4>
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium pl-3.5 truncate mt-0.5">
                        {day.labelEn}
                      </p>
                    </div>

                    <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[9px] sm:text-[10px] font-medium text-slate-500">
                        {dayCourses.length} วิชา
                      </span>
                      {onAddCourseForDay && (
                        <button
                          type="button"
                          onClick={() => onAddCourseForDay(day.key)}
                          className="p-0.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors min-h-[22px] min-w-[22px] flex items-center justify-center"
                          title={`เพิ่มวิชาใน${day.labelTh}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right: Time Grid Track */}
                  <div className="flex-1 relative min-h-[110px] sm:min-h-[120px] bg-white rounded-r-xl p-1.5 sm:p-2 flex items-center overflow-hidden">
                    {/* Background Grid Lines */}
                    <div
                      className="absolute inset-0 pointer-events-none grid"
                      style={{ gridTemplateColumns: `repeat(${totalHours}, minmax(0, 1fr))` }}
                    >
                      {Array.from({ length: totalHours }).map((_, i) => (
                        <div
                          key={i}
                          className="border-r border-slate-100/80 h-full last:border-r-0"
                        />
                      ))}
                    </div>

                    {/* Content */}
                    {dayCourses.length === 0 ? (
                      <div className="w-full flex items-center justify-center text-xs text-slate-400 py-6 italic space-x-2">
                        <span>ไม่มีตารางเรียนใน{day.labelTh}</span>
                        {onAddCourseForDay && (
                          <button
                            type="button"
                            onClick={() => onAddCourseForDay(day.key)}
                            className="text-blue-600 hover:underline font-medium not-italic"
                          >
                            + เพิ่มวิชา
                          </button>
                        )}
                      </div>
                    ) : (
                      dayCourses.map((course) => {
                        const startMin = timeToMinutes(course.startTime);
                        const endMin = timeToMinutes(course.endTime);
                        const durationHours = calculateDurationHours(
                          course.startTime,
                          course.endTime
                        );

                        // Calculate horizontal position
                        const leftPercent = Math.max(
                          0,
                          Math.min(100, ((startMin - startGridMinutes) / totalGridMinutes) * 100)
                        );
                        const widthPercent = Math.max(
                          8,
                          Math.min(100 - leftPercent, ((endMin - startMin) / totalGridMinutes) * 100)
                        );

                        const colorPreset = getColorPreset(course.colorTheme);
                        const isCompact = widthPercent < 15;

                        return (
                          <div
                            key={course.id}
                            id={`course-card-${course.id}`}
                            className={`group/card absolute top-2 bottom-2 rounded-xl border p-2 sm:p-2.5 flex flex-col justify-between transition-all duration-150 hover:shadow-md hover:z-20 cursor-default bg-white ${colorPreset.borderClass} ${colorPreset.bgClass}`}
                            style={{
                              left: `${leftPercent}%`,
                              width: `calc(${widthPercent}% - 6px)`,
                            }}
                          >
                            {/* Card Top */}
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <div className="flex items-center space-x-1 min-w-0">
                                  <span
                                    className={`text-[10px] sm:text-[11px] font-bold font-mono px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 ${colorPreset.badgeClass}`}
                                  >
                                    {course.code}
                                  </span>
                                  {course.section && !isCompact && (
                                    <span className="text-[9px] sm:text-[10px] font-medium px-1 py-0.5 rounded-md bg-white/90 text-slate-600 border border-slate-200/80 shrink-0">
                                      Sec {course.section}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Course Name */}
                              <h4
                                className={`text-[11px] sm:text-xs font-bold leading-snug line-clamp-2 ${colorPreset.textClass}`}
                                title={course.name}
                              >
                                {course.name}
                              </h4>
                            </div>

                            {/* Card Bottom */}
                            <div className="mt-1.5 pt-1 border-t border-slate-200/50 flex items-center justify-between gap-1">
                              <div className="flex items-center space-x-1.5 text-slate-600 truncate min-w-0">
                                <div className="flex items-center space-x-0.5 font-mono font-medium text-slate-700 text-[9px] sm:text-[10px] shrink-0">
                                  <Clock className="w-3 h-3 text-blue-500 shrink-0" />
                                  <span>
                                    {course.startTime}-{course.endTime}
                                  </span>
                                </div>
                                {course.room && !isCompact && (
                                  <div className="flex items-center space-x-0.5 text-slate-500 truncate text-[9px] sm:text-[10px]">
                                    <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                                    <span className="truncate font-medium" title={course.room}>
                                      {course.room}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Actions */}
                              <div className="flex items-center space-x-1 shrink-0">
                                <button
                                  id={`btn-edit-course-table-${course.id}`}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEditCourse(course);
                                  }}
                                  className="p-1 rounded-lg bg-white/90 hover:bg-blue-50 text-blue-600 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all active:scale-90 min-h-[26px] min-w-[26px] flex items-center justify-center"
                                  title="แก้ไขวิชา"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button
                                  id={`btn-delete-course-table-${course.id}`}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteCourse(course);
                                  }}
                                  className="p-1 rounded-lg bg-white/90 hover:bg-rose-50 text-rose-500 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all active:scale-90 min-h-[26px] min-w-[26px] flex items-center justify-center"
                                  title="ลบวิชา"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
