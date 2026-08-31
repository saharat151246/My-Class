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
    <div id="listview-wrapper" className="space-y-6">
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
              className={`px-3.5 sm:px-6 py-3 sm:py-3.5 border-b border-slate-100 flex items-center justify-between ${day.bgColor}`}
            >
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm bg-white/80 border ${day.borderColor} ${day.color} shrink-0`}
                >
                  {day.shortLabelTh.substring(0, 1)}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <h3 className={`text-sm sm:text-base font-bold ${day.color}`}>
                      {day.labelTh}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium hidden xs:inline">
                      ({day.labelEn})
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500">
                    {dayCourses.length > 0
                      ? `มีเรียน ${dayCourses.length} วิชา`
                      : 'ไม่มีตารางเรียนในวันนี้'}
                  </p>
                </div>
              </div>

              {/* Quick Add For This Day */}
              <button
                type="button"
                id={`btn-add-course-day-${day.key}`}
                onClick={() => onAddCourseForDay(day.key)}
                className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-700 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-colors min-h-[34px] active:scale-95 shrink-0"
                title={`เพิ่มวิชาใน${day.labelTh}`}
              >
                <Plus className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="text-xs">เพิ่มวิชา</span>
              </button>
            </div>

            {/* Courses List */}
            <div className="p-3 sm:p-5">
              {dayCourses.length === 0 ? (
                <div className="text-center py-5 sm:py-6 border-2 border-dashed border-slate-100 rounded-xl">
                  <p className="text-xs sm:text-sm text-slate-400">
                    ไม่มีวิชาเรียนใน{day.labelTh}
                  </p>
                  <button
                    type="button"
                    onClick={() => onAddCourseForDay(day.key)}
                    className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center space-x-1 p-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>เพิ่มวิชาเรียนแรกสำหรับวันนี้</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4">
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
                        className={`rounded-xl border p-3.5 sm:p-5 flex flex-col justify-between transition-all hover:shadow-md ${colorPreset.bgClass} ${colorPreset.borderClass}`}
                      >
                        {/* Top: Code + Section + Badges */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                            <div className="flex items-center space-x-1.5 sm:space-x-2">
                              <span
                                className={`text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${colorPreset.badgeClass}`}
                              >
                                {course.code}
                              </span>
                              {course.section && (
                                <span className="text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-md bg-white/80 text-slate-700 border border-slate-200/80">
                                  Sec {course.section}
                                </span>
                              )}
                            </div>

                            <span className="text-[11px] sm:text-xs font-medium text-slate-500 bg-white/60 px-2 py-0.5 rounded-full">
                              {durationHours} ชม.
                            </span>
                          </div>

                          {/* Course Name */}
                          <h4
                            className={`text-sm sm:text-base font-bold leading-snug mb-2 sm:mb-3 ${colorPreset.textClass}`}
                          >
                            {course.name}
                          </h4>

                          {/* Metadata: Time, Room */}
                          <div className="space-y-1.5 text-xs text-slate-600 bg-white/70 rounded-lg p-2 sm:p-2.5 border border-slate-200/50 mb-2.5 sm:mb-3">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span className="font-semibold text-slate-800 text-[11px] sm:text-xs">
                                {course.startTime} - {course.endTime} น.
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                              <span className="text-slate-700 truncate font-medium text-[11px] sm:text-xs">
                                ห้อง: {course.room || 'ไม่ระบุ'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions: Edit & Delete Buttons */}
                        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200/40">
                          <button
                            id={`btn-edit-course-list-${course.id}`}
                            type="button"
                            onClick={() => onEditCourse(course)}
                            className="inline-flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs hover:shadow-xs transition-all active:scale-95 min-h-[34px]"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>แก้ไข</span>
                          </button>

                          <button
                            id={`btn-delete-course-list-${course.id}`}
                            type="button"
                            onClick={() => onDeleteCourse(course)}
                            className="inline-flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs hover:shadow-xs transition-all active:scale-95 min-h-[34px]"
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
