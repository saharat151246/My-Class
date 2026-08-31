import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Course } from '../types';
import { getDayInfo } from '../constants/scheduleConstants';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  course: Course | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  course,
  onClose,
  onConfirm,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  const dayInfo = getDayInfo(course.day);

  return (
    <AnimatePresence>
      <div
        id="delete-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          id="delete-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden p-6"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-slate-900">
                ยืนยันการลบวิชาเรียน?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                คุณแน่ใจหรือไม่ว่าต้องการลบวิชานี้ออกจากตารางเรียน การกระทำนี้ไม่สามารถย้อนกลับได้
              </p>

              {/* Course preview badge */}
              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-800">
                    {course.code}
                  </span>
                  {course.section && (
                    <span className="text-[11px] font-semibold bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-700">
                      Sec {course.section}
                    </span>
                  )}
                  <span className="font-semibold text-slate-800 truncate">
                    {course.name}
                  </span>
                </div>
                <div className="text-slate-500 mt-1 flex items-center space-x-2 text-[11px]">
                  <span>{dayInfo.labelTh}</span>
                  <span>•</span>
                  <span>
                    {course.startTime} - {course.endTime} น.
                  </span>
                  {course.room && (
                    <>
                      <span>•</span>
                      <span>ห้อง {course.room}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end space-x-2.5">
            <button
              id="btn-cancel-delete"
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-100 font-medium text-sm transition-colors"
            >
              ยกเลิก
            </button>
            <button
              id="btn-confirm-delete"
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-semibold text-sm shadow-sm hover:shadow shadow-rose-600/25 transition-all"
            >
              ลบวิชานี้
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
