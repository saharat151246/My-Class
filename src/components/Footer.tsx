import React from 'react';
import { RotateCcw, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onResetSampleData: () => void;
  onClearAllData: () => void;
  courseCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  onResetSampleData,
  onClearAllData,
  courseCount,
}) => {
  return (
    <footer className="mt-10 sm:mt-12 py-6 sm:py-8 border-t border-slate-200 text-xs text-slate-500 bg-white sm:bg-transparent">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
            <span className="font-semibold text-slate-700">My Class</span>
            <span>•</span>
            <span>ระบบจัดตารางเรียนส่วนตัวสำหรับนักศึกษา</span>
            <span>•</span>
            <span className="inline-flex items-center text-emerald-600 space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>LocalStorage Active</span>
            </span>
          </div>

          <div className="flex items-center justify-center space-x-2 sm:space-x-3 flex-wrap">
            <button
              id="btn-reset-sample"
              type="button"
              onClick={onResetSampleData}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-colors min-h-[34px]"
              title="โหลดตารางตัวอย่างเริ่มต้น"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
              <span>โหลดข้อมูลตัวอย่าง</span>
            </button>

            <button
              id="btn-clear-all"
              type="button"
              onClick={onClearAllData}
              disabled={courseCount === 0}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border shadow-2xs transition-colors min-h-[34px] ${
                courseCount > 0
                  ? 'bg-white hover:bg-rose-50 text-rose-600 border-rose-200 cursor-pointer active:scale-95'
                  : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-70'
              }`}
              title={courseCount > 0 ? 'ล้างข้อมูลวิชาทั้งหมดในตาราง' : 'ไม่มีวิชาในตาราง'}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>ล้างข้อมูล</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
