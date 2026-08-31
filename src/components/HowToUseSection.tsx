import React, { useState } from 'react';
import {
  HelpCircle,
  PlusCircle,
  FileCheck,
  Edit3,
  Trash2,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const HowToUseSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const steps = [
    {
      num: 1,
      title: 'กด “+ เพิ่มวิชา”',
      desc: 'กดปุ่มเพื่อเปิดหน้าต่างสำหรับเพิ่มรายวิชาใหม่เข้าสู่ตาราง',
      icon: PlusCircle,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      num: 2,
      title: 'กรอกข้อมูลวิชาแล้วกดบันทึก',
      desc: 'กรอกชื่อ รหัสวิชา วัน เวลาเริ่ม-สิ้นสุด ห้องเรียน แล้วกด “บันทึกวิชาเรียน”',
      icon: FileCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      num: 3,
      title: 'กด “แก้ไข” เพื่อเปลี่ยนข้อมูล',
      desc: 'คลิกปุ่มแก้ไขที่การ์ดวิชา เพื่อเปิดฟอร์มพร้อมข้อมูลเดิมและอัปเดต',
      icon: Edit3,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      num: 4,
      title: 'กด “ลบ” เพื่อลบวิชา',
      desc: 'คลิกปุ่มลบ พร้อมยืนยันในหน้าต่างเพื่อนำวิชาที่ไม่ต้องการออกจากระบบ',
      icon: Trash2,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      num: 5,
      title: 'ใช้ปุ่ม “ตาราง/รายการ”',
      desc: 'สลับระหว่างมุมมองตารางสอนรายสัปดาห์ (Timetable) และมุมมองรายการ (List)',
      icon: SlidersHorizontal,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
  ];

  return (
    <section
      id="how-to-use-section"
      className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden mt-8 mb-6"
    >
      <button
        type="button"
        id="btn-toggle-how-to-use"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-left"
      >
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">วิธีใช้งาน</h3>
            <p className="text-xs text-slate-500">
              คู่มือแนะนำขั้นตอนการใช้งานระบบจัดตารางเรียนอย่างง่าย 5 ขั้นตอน
            </p>
          </div>
        </div>
        <div className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="p-5 sm:p-6 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  id={`instruction-step-${step.num}`}
                  className="bg-slate-50/60 rounded-xl p-3.5 border border-slate-200/70 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-mono text-xs font-bold flex items-center justify-center">
                        {step.num}
                      </span>
                      <div className={`p-1.5 rounded-lg border ${step.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Tip / LocalStorage badge */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>
                ข้อมูลทั้งหมดจะถูกบันทึกอัตโนมัติลงในเบราว์เซอร์ของคุณ (LocalStorage)
              </span>
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
