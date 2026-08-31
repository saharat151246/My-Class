import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StatsBar } from './components/StatsBar';
import { TableView } from './components/TableView';
import { ListView } from './components/ListView';
import { CourseModal } from './components/CourseModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ClearAllModal } from './components/ClearAllModal';
import { HowToUseSection } from './components/HowToUseSection';
import { Footer } from './components/Footer';
import { Course, ViewMode, DayOfWeek, CourseFormData } from './types';
import {
  STORAGE_KEY,
  INITIAL_COURSES,
  DAY_ORDER,
  timeToMinutes,
} from './constants/scheduleConstants';
import { Plus, Sparkles, CheckCircle, Info } from 'lucide-react';

export default function App() {
  // Load courses from localStorage or use INITIAL_COURSES
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse localStorage courses', e);
    }
    return INITIAL_COURSES;
  });

  // Save to localStorage whenever courses change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [courses]);

  // View Mode: 'table' or 'list'
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    try {
      const savedView = localStorage.getItem('my_class_view_mode');
      if (savedView === 'table' || savedView === 'list') {
        return savedView;
      }
    } catch (e) {
      // ignore
    }
    return 'table';
  });

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    try {
      localStorage.setItem('my_class_view_mode', mode);
    } catch (e) {
      // ignore
    }
  };

  // Modal State for Add / Edit
  const [isCourseModalOpen, setIsCourseModalOpen] = useState<boolean>(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [defaultDayForModal, setDefaultDayForModal] = useState<DayOfWeek>('monday');

  // Modal State for Delete Confirmation
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  // Modal State for Clear All Confirmation
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState<boolean>(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'success' | 'info';
  } | null>(null);
  const toastTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage({ text, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // Open Add Modal
  const handleOpenAddModal = (day: DayOfWeek = 'monday') => {
    setEditingCourse(null);
    setDefaultDayForModal(day);
    setIsCourseModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (course: Course) => {
    if (!course) return;
    setEditingCourse(course);
    setDefaultDayForModal(course.day || 'monday');
    setIsCourseModalOpen(true);
  };

  // Save Course (Create or Update)
  const handleSaveCourse = (formData: CourseFormData, editingId?: string) => {
    if (editingId) {
      // Update existing course by matching unique ID
      setCourses((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...formData,
                id: editingId, // preserve original ID
              }
            : item
        )
      );
      showToast(`อัปเดตวิชา "${formData.name}" เรียบร้อยแล้ว`, 'success');
    } else {
      // Create new course with unique ID
      const newCourse: Course = {
        id: `course-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        ...formData,
      };
      setCourses((prev) => [...prev, newCourse]);
      showToast(`เพิ่มวิชา "${formData.name}" เข้าสู่ตารางแล้ว`, 'success');
    }
  };

  // Open Delete Confirmation Modal
  const handleOpenDeleteModal = (course: Course) => {
    if (!course) return;
    setCourseToDelete(course);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete Course
  const handleConfirmDelete = () => {
    if (!courseToDelete) return;
    const targetId = courseToDelete.id;
    const targetName = courseToDelete.name;

    // Remove strictly the targeted course without affecting others
    setCourses((prev) => prev.filter((c) => c.id !== targetId));
    setCourseToDelete(null);
    setIsDeleteModalOpen(false);
    showToast(`ลบวิชา "${targetName}" ออกจากตารางแล้ว`, 'info');
  };

  // Reset to sample data
  const handleResetSampleData = () => {
    setCourses(INITIAL_COURSES);
    showToast('โหลดข้อมูลตัวอย่างเริ่มต้นเรียบร้อยแล้ว', 'success');
  };

  // Open Clear All confirmation modal
  const handleOpenClearAllModal = () => {
    if (!courses || courses.length === 0) {
      showToast('ไม่มีวิชาเรียนในตารางอยู่แล้ว', 'info');
      return;
    }
    setIsClearAllModalOpen(true);
  };

  // Confirm clear all data (State + LocalStorage)
  const handleConfirmClearAll = () => {
    setCourses([]);
    setIsClearAllModalOpen(false);
    showToast('ล้างตารางเรียนทั้งหมดเรียบร้อยแล้ว', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation */}
      <Navbar
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onOpenAddModal={() => handleOpenAddModal('monday')}
        totalCourses={courses.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-12">
        {/* Floating Notification Toast */}
        {toastMessage && (
          <div
            id="app-toast-banner"
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-800 text-xs sm:text-sm font-medium flex items-center space-x-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200"
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
            )}
            <span className="truncate">{toastMessage.text}</span>
          </div>
        )}

        {/* Stats Summary Bar */}
        <StatsBar courses={courses} />

        {/* View Switch / Content Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-3.5 sm:mb-4">
          <div>
            <h2 className="text-base sm:text-xl font-bold text-slate-900 flex items-center space-x-2">
              <span>
                {viewMode === 'table'
                  ? 'ตารางเรียนประจำสัปดาห์'
                  : 'รายการวิชาเรียนแยกตามวัน'}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                {courses.length} รายการ
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {viewMode === 'table'
                ? 'แสดงภาพรวมช่วงเวลาเรียนตั้งแต่วันจันทร์ถึงวันศุกร์'
                : 'แสดงรายละเอียดของแต่ละวิชาเรียงตามลำดับเวลา'}
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              id="btn-add-course-secondary"
              type="button"
              onClick={() => handleOpenAddModal('monday')}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs border border-blue-200 transition-colors min-h-[34px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>เพิ่มวิชาใหม่</span>
            </button>
          </div>
        </div>

        {/* Empty State Banner (if no courses exist) */}
        {courses.length === 0 ? (
          <div
            id="empty-schedule-state"
            className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 sm:p-12 text-center my-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              ยังไม่มีวิชาเรียนในตาราง
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
              เริ่มต้นจัดตารางเรียนของคุณโดยการกดปุ่ม “+ เพิ่มวิชา” หรือโหลดชุดข้อมูลตัวอย่าง
            </p>
            <div className="flex items-center justify-center space-x-3">
              <button
                type="button"
                onClick={() => handleOpenAddModal('monday')}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
              >
                + เพิ่มวิชาแรก
              </button>
              <button
                type="button"
                onClick={() => setCourses(INITIAL_COURSES)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-all"
              >
                โหลดตัวอย่าง
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Table or List View depending on active mode */}
            {viewMode === 'table' ? (
              <TableView
                courses={courses}
                onEditCourse={handleOpenEditModal}
                onDeleteCourse={handleOpenDeleteModal}
                onAddCourseForDay={handleOpenAddModal}
              />
            ) : (
              <ListView
                courses={courses}
                onEditCourse={handleOpenEditModal}
                onDeleteCourse={handleOpenDeleteModal}
                onAddCourseForDay={handleOpenAddModal}
              />
            )}
          </>
        )}

        {/* How to use section (Required in specification) */}
        <HowToUseSection />
      </main>

      {/* Footer */}
      <Footer
        onResetSampleData={handleResetSampleData}
        onClearAllData={handleOpenClearAllModal}
        courseCount={courses.length}
      />

      {/* Add / Edit Course Modal */}
      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={() => {
          setIsCourseModalOpen(false);
          setEditingCourse(null);
        }}
        onSave={handleSaveCourse}
        editingCourse={editingCourse}
        defaultDay={defaultDayForModal}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        course={courseToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCourseToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      {/* Clear All Confirmation Modal */}
      <ClearAllModal
        isOpen={isClearAllModalOpen}
        courseCount={courses.length}
        onClose={() => setIsClearAllModalOpen(false)}
        onConfirm={handleConfirmClearAll}
      />
    </div>
  );
}
