import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Palette,
  AlertCircle,
  Check,
} from 'lucide-react';
import { Course, DayOfWeek, CourseFormData, FormErrors } from '../types';
import {
  DAYS,
  COLOR_PRESETS,
  timeToMinutes,
  calculateDurationHours,
  getColorPreset,
} from '../constants/scheduleConstants';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (courseData: CourseFormData, editingId?: string) => void;
  editingCourse?: Course | null;
  defaultDay?: DayOfWeek;
}

const DEFAULT_FORM_STATE: CourseFormData = {
  name: '',
  code: '',
  day: 'monday',
  startTime: '09:00',
  endTime: '12:00',
  room: '',
  section: '01',
  colorTheme: 'blue',
};

// Popular 24h Time Presets
const TIME_PRESETS = [
  { label: '09:00 - 12:00', s: '09:00', e: '12:00' },
  { label: '13:00 - 16:00', s: '13:00', e: '16:00' },
  { label: '08:30 - 11:30', s: '08:30', e: '11:30' },
  { label: '13:30 - 16:30', s: '13:30', e: '16:30' },
];

export const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingCourse,
  defaultDay = 'monday',
}) => {
  const isEditing = Boolean(editingCourse);

  const [formData, setFormData] = useState<CourseFormData>(DEFAULT_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});

  // Reset or populate form when modal opens or editing course changes
  useEffect(() => {
    if (isOpen) {
      if (editingCourse) {
        setFormData({
          name: editingCourse.name || '',
          code: editingCourse.code || '',
          day: editingCourse.day || defaultDay,
          startTime: editingCourse.startTime || '09:00',
          endTime: editingCourse.endTime || '12:00',
          room: editingCourse.room || '',
          section: editingCourse.section || '',
          colorTheme: editingCourse.colorTheme || 'blue',
        });
      } else {
        const randomPreset =
          COLOR_PRESETS[Math.floor(Math.random() * COLOR_PRESETS.length)].id;
        setFormData({
          name: '',
          code: '',
          day: defaultDay,
          startTime: '09:00',
          endTime: '12:00',
          room: '',
          section: '01',
          colorTheme: randomPreset,
        });
      }
      setErrors({});

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleModalClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, editingCourse, defaultDay]);

  const resetForm = () => {
    setFormData(DEFAULT_FORM_STATE);
    setErrors({});
  };

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.code || !formData.code.trim()) {
      newErrors.code = 'กรุณาระบุรหัสวิชา';
    }

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'กรุณาระบุชื่อวิชา';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'ชื่อวิชาต้องมีอย่างน้อย 2 ตัวอักษร';
    }

    if (!formData.day) {
      newErrors.day = 'กรุณาเลือกวันเรียน';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'กรุณาระบุเวลาเริ่ม';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'กรุณาระบุเวลาสิ้นสุด';
    }

    if (formData.startTime && formData.endTime) {
      const startMin = timeToMinutes(formData.startTime);
      const endMin = timeToMinutes(formData.endTime);

      if (endMin <= startMin) {
        newErrors.endTime = 'เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มเรียน';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    field: keyof CourseFormData,
    value: string | DayOfWeek
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    if (field === 'startTime' || field === 'endTime') {
      const s = field === 'startTime' ? (value as string) : formData.startTime;
      const e = field === 'endTime' ? (value as string) : formData.endTime;
      if (s && e) {
        const startMin = timeToMinutes(s);
        const endMin = timeToMinutes(e);
        if (endMin <= startMin) {
          setErrors((prev) => ({
            ...prev,
            endTime: 'เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มเรียน',
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            endTime: undefined,
            startTime: undefined,
          }));
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData, editingCourse ? editingCourse.id : undefined);
      resetForm();
      onClose();
    }
  };

  const durationHours = calculateDurationHours(formData.startTime, formData.endTime);
  const isValidTimeRange = durationHours > 0;
  const activeColorPreset = getColorPreset(formData.colorTheme);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="course-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleModalClose();
        }}
      >
        <motion.div
          id="course-modal-content"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {isEditing ? 'แก้ไขข้อมูลวิชาเรียน' : 'เพิ่มวิชาเรียนใหม่'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isEditing ? 'ปรับปรุงรายละเอียดวิชา' : 'กรอกข้อมูลรายวิชาเพื่อจัดลงตาราง'}
                </p>
              </div>
            </div>

            <button
              id="btn-close-modal"
              type="button"
              onClick={handleModalClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center"
              title="ปิดหน้าต่าง"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Content */}
          <form
            id="course-entry-form"
            onSubmit={handleSubmit}
            className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm"
          >
            {/* Row 1: Code & Section */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label
                  htmlFor="input-course-code"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  รหัสวิชา <span className="text-rose-500">*</span>
                </label>
                <input
                  id="input-course-code"
                  type="text"
                  placeholder="เช่น CS201, MA102"
                  value={formData.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 font-mono text-xs sm:text-sm focus:outline-hidden focus:ring-2 transition-all ${
                    errors.code
                      ? 'border-rose-400 focus:ring-rose-200 ring-1 ring-rose-300'
                      : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                  }`}
                  autoFocus
                />
                {errors.code && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.code}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="input-course-section"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  กลุ่ม (Sec)
                </label>
                <input
                  id="input-course-section"
                  type="text"
                  placeholder="01"
                  value={formData.section}
                  onChange={(e) => handleChange('section', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 font-mono text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Course Name */}
            <div>
              <label
                htmlFor="input-course-name"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                ชื่อวิชา <span className="text-rose-500">*</span>
              </label>
              <input
                id="input-course-name"
                type="text"
                placeholder="เช่น Data Structures and Algorithms"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 transition-all ${
                  errors.name
                    ? 'border-rose-400 focus:ring-rose-200 ring-1 ring-rose-300'
                    : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Row 3: Day of Week Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                วันเรียน <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {DAYS.map((d) => {
                  const isSelected = formData.day === d.key;
                  return (
                    <button
                      key={d.key}
                      type="button"
                      id={`day-select-btn-${d.key}`}
                      onClick={() => handleChange('day', d.key)}
                      className={`py-2 px-1 rounded-xl text-xs font-medium flex flex-col items-center justify-center transition-all border min-h-[44px] ${
                        isSelected
                          ? `${d.bgColor} ${d.color} ${d.borderColor} ring-2 ring-blue-500 shadow-2xs font-bold scale-[1.02]`
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-semibold">{d.shortLabelTh}</span>
                      <span className="text-[10px] opacity-70 font-normal">
                        {d.labelEn.slice(0, 3)}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.day && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.day}</span>
                </p>
              )}
            </div>

            {/* Row 4: Start & End Time (24h) + Duration */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="input-start-time"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    เวลาเริ่ม <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="input-start-time"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleChange('startTime', e.target.value)}
                    className={`w-full px-2.5 py-1.5 rounded-lg border bg-white text-slate-900 font-mono text-xs sm:text-sm focus:outline-hidden focus:ring-2 transition-all ${
                      errors.startTime
                        ? 'border-rose-400 focus:ring-rose-200 ring-1 ring-rose-300'
                        : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                    }`}
                    required
                  />
                  {errors.startTime && (
                    <p className="text-[10px] text-rose-600 mt-1 font-medium">
                      {errors.startTime}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="input-end-time"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    เวลาสิ้นสุด <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="input-end-time"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleChange('endTime', e.target.value)}
                    className={`w-full px-2.5 py-1.5 rounded-lg border bg-white text-slate-900 font-mono text-xs sm:text-sm focus:outline-hidden focus:ring-2 transition-all ${
                      errors.endTime
                        ? 'border-rose-400 focus:ring-rose-200 ring-1 ring-rose-300'
                        : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                    }`}
                    required
                  />
                  {errors.endTime && (
                    <p className="text-[10px] text-rose-600 mt-1 font-medium">
                      {errors.endTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Duration & Presets */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-slate-200/50">
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {isValidTimeRange ? (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      ระยะเวลา: {durationHours} ชั่วโมง
                    </span>
                  ) : (
                    <span className="text-[11px] text-rose-600 font-medium">
                      เวลาสิ้นสุดต้องมากกว่าเวลาเริ่ม
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-1 overflow-x-auto">
                  {TIME_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        handleChange('startTime', p.s);
                        handleChange('endTime', p.e);
                      }}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-colors border ${
                        formData.startTime === p.s && formData.endTime === p.e
                          ? 'bg-blue-600 text-white border-blue-600 font-bold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 5: Room & Color Palette */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="input-course-room"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  ห้องเรียน / อาคาร
                </label>
                <div className="relative">
                  <input
                    id="input-course-room"
                    type="text"
                    placeholder="เช่น SCB-2101 หรือ อาคาร 4"
                    value={formData.room}
                    onChange={(e) => handleChange('room', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    สีประจำวิชา
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {activeColorPreset.name}
                  </span>
                </div>
                <div className="grid grid-cols-8 gap-1.5">
                  {COLOR_PRESETS.map((preset) => {
                    const isSelected = formData.colorTheme === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        id={`color-preset-btn-${preset.id}`}
                        onClick={() => handleChange('colorTheme', preset.id)}
                        className={`h-8 rounded-lg flex items-center justify-center transition-all ${
                          preset.pillBg
                        } ${
                          isSelected
                            ? 'ring-2 ring-slate-900 ring-offset-1 scale-105 shadow-xs'
                            : 'opacity-75 hover:opacity-100'
                        }`}
                        title={preset.name}
                      >
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2.5 shrink-0">
              <button
                id="btn-cancel-modal"
                type="button"
                onClick={handleModalClose}
                className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-100 font-medium text-xs sm:text-sm transition-colors min-h-[38px]"
              >
                ยกเลิก
              </button>

              <button
                id="btn-save-course"
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow shadow-blue-600/25 transition-all flex items-center space-x-1.5 min-h-[38px]"
              >
                <span>{isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มวิชาลงตาราง'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
