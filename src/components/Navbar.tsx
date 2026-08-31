import React from 'react';
import { Plus, Calendar, List, BookOpen, Clock } from 'lucide-react';
import { ViewMode } from '../types';

interface NavbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenAddModal: () => void;
  totalCourses: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  onViewModeChange,
  onOpenAddModal,
  totalCourses,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 gap-2">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-900 truncate">
                  My Class
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                  ตารางเรียน
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                ระบบจัดการและดูตารางเรียนประจำสัปดาห์สำหรับนักศึกษา
              </p>
            </div>
          </div>

          {/* Actions & View Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            {/* View Switcher: Table vs List */}
            <div
              id="view-mode-selector"
              className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200"
            >
              <button
                id="btn-view-table"
                type="button"
                onClick={() => onViewModeChange('table')}
                className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all min-h-[36px] sm:min-h-[38px] ${
                  viewMode === 'table'
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
                title="มุมมองตารางสอนรายสัปดาห์"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden min-[360px]:inline text-xs sm:text-sm">ตาราง</span>
              </button>

              <button
                id="btn-view-list"
                type="button"
                onClick={() => onViewModeChange('list')}
                className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all min-h-[36px] sm:min-h-[38px] ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
                title="มุมมองรายการแยกตามวัน"
              >
                <List className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden min-[360px]:inline text-xs sm:text-sm">รายการ</span>
              </button>
            </div>

            {/* Add Course Button */}
            <button
              id="btn-add-course-main"
              type="button"
              onClick={onOpenAddModal}
              className="inline-flex items-center justify-center space-x-1 sm:space-x-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm transition-all shadow-sm hover:shadow shadow-blue-600/25 min-h-[38px] sm:min-h-[42px] focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5] shrink-0" />
              <span>+ เพิ่มวิชา</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
