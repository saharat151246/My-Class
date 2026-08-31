import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, AlertOctagon } from 'lucide-react';

interface ClearAllModalProps {
  isOpen: boolean;
  courseCount: number;
  onClose: () => void;
  onConfirm: () => void;
}

export const ClearAllModal: React.FC<ClearAllModalProps> = ({
  isOpen,
  courseCount,
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="clear-all-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          id="clear-all-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden p-6"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertOctagon className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-slate-900">
                ยืนยันการล้างตารางเรียนทั้งหมด?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                ระบบจะทำการลบวิชาเรียนทั้งหมด{' '}
                <span className="font-semibold text-rose-600">
                  ({courseCount} วิชา)
                </span>{' '}
                ออกจากตารางเรียนและหน่วยความจำของเบราว์เซอร์
                การกระทำนี้ไม่สามารถย้อนกลับได้
              </p>

              <div className="mt-3.5 p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-800 flex items-center space-x-2">
                <span className="font-medium">
                  💡 หากต้องการ คุณสามารถกด &quot;โหลดข้อมูลตัวอย่าง&quot; ที่ Footer
                  ได้ทุกเมื่อหลังจากล้างข้อมูล
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end space-x-2.5">
            <button
              id="btn-cancel-clear-all"
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-100 font-medium text-sm transition-colors min-h-[40px]"
            >
              ยกเลิก
            </button>
            <button
              id="btn-confirm-clear-all"
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-semibold text-sm shadow-sm hover:shadow shadow-rose-600/25 transition-all min-h-[40px]"
            >
              <Trash2 className="w-4 h-4" />
              <span>ล้างข้อมูลทั้งหมด</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
