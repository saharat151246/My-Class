import React from 'react';
import {
  Clock,
  MapPin,
  Users,
  Edit2,
  Trash2,
  Calendar,
  Plus,
  BookOpen,
} from 'lucide-react';
import { Course, DayOfWeek } from '../types';
import {
  DAYS,
  getColorPreset,
  timeToMinutes,
  calculateDurationHours,
} from '../constants/scheduleConstants';

interface ListViewProps {
  courses: Course[];
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (course: Course) => void;
  onAddCourseForDay: (day: DayOfWeek) => void;
}

export const ListView: React.FC<ListViewProps> = ({
  courses = [],
  onEditCourse,
  onDeleteCourse,
  onAddCourseForDay,
}) => {
  const safeCourses = Array.isArray(courses) ? courses : [];

  return (
    <div id="listview-wrapper" className="space-y-4 sm:space-y-5">
      {DAYS.map((day) => {
        const dayCourses = safeCourses
          .filter((c) => c && c.day === day.key)
          .sort((a, b) => timeToMinutes(a?.startTime) - timeToMinutes(b?.startTime));

        return (
          <div
            key={day.key}
            id={`day-group-${day.key}`}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:border-slate-300"
          >
            {/* Day Header */}
            <div
              className={`px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-slate-100 flex items-center justify-between ${day.bgColor}`}
            >
              <div className="flex items-center space-x-2 sm:space-x-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs bg-white/80 border ${day.borderColor} ${day.color} shrink-0`}
                >
                  {day.shortLabelTh.substring(0, 1)}
                </div>
                <div>
                  <h3 className={`text-sm sm:text-base font-bold ${day.color}`}>
                    {day.labelTh}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-500">
                    {dayCourses.length > 0
                      ? `${dayCourses.length} วิชา`
                      : 'ไม่มีวิชาเรียน'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                id={`btn-add-course-day-${day.key}`}
                onClick={() => onAddCourseForDay(day.key)}
                className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-700 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-colors min-h-[32px] active:scale-95 shrink-0"
                title={`เพิ่มวิชาใน${day.labelTh}`}
              >
                <Plus className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="hidden sm:inline text-xs">เพิ่มวิชา</span>
              </button>
            </div>

            {/* Courses List */}
            <div className="p-3 sm:p-4">
              {dayCourses.length === 0 ? (
                <div className="text-center py-4 sm:py-5 border-2 border-dashed border-slate-100 rounded-xl">
                  <p className="text-xs sm:text-sm text-slate-400">
                    ไม่มีวิชาเรียนใน{day.labelTh}
                  </p>
                  <button
                    type="button"
                    onClick={() => onAddCourseForDay(day.key)}
                    className="mt-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center space-x-1 p-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>เพิ่มวิชา</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                  {dayCourses.map((course) => {
                    const colorPreset = getColorPreset(course.colorTheme);
                    const durationHours = calculateDurationHours(
                      course.startTime,
                      course.endTime
                    );

                    return (
                      <div
                        key={course.id}
                        id={`list-card-${course.id}`}
                        className={`rounded-xl border p-3 sm:p-4 flex flex-col justify-between transition-all hover:shadow-md ${colorPreset.bgClass} ${colorPreset.borderClass}`}
                      >
                        {/* Top: Code + Section */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center space-x-1.5">
                              <span
                                className={`text-[11px] sm:text-xs font-bold px-1.5 py-0.5 rounded-md border uppercase tracking-wider ${colorPreset.badgeClass}`}
                              >
                                {course.code}
                              </span>
                              {course.section && (
                                <span className="text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded-md bg-white/80 text-slate-600 border border-slate-200/80">
                                  Sec {course.section}
                                </span>
                              )}
                            </div>

                            <span className="text-[10px] sm:text-xs font-medium text-slate-500 bg-white/60 px-1.5 py-0.5 rounded-full">
                              {durationHours} ชม.
                            </span>
                          </div>

                          {/* Course Name */}
                          <h4
                            className={`text-sm sm:text-base font-bold leading-snug mb-2 ${colorPreset.textClass}`}
                          >
                            {course.name}
                          </h4>

                          {/* Metadata */}
                          <div className="flex items-center space-x-3 text-xs text-slate-600 bg-white/60 rounded-lg px-2.5 py-2 border border-slate-200/40 mb-2">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                              <span className="font-semibold text-slate-700 text-[11px] sm:text-xs">
                                {course.startTime} - {course.endTime}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 min-w-0">
                              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                              <span className="text-slate-600 truncate font-medium text-[11px] sm:text-xs">
                                {course.room || 'ไม่ระบุ'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200/40">
                          <button
                            id={`btn-edit-course-list-${course.id}`}
                            type="button"
                            onClick={() => onEditCourse(course)}
                            className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs hover:shadow-xs transition-all active:scale-95 min-h-[32px]"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>แก้ไข</span>
                          </button>

                          <button
                            id={`btn-delete-course-list-${course.id}`}
                            type="button"
                            onClick={() => onDeleteCourse(course)}
                            className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs hover:shadow-xs transition-all active:scale-95 min-h-[32px]"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            <span>ลบ</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
