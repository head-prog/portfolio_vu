
import React, { useState, useRef, useEffect } from 'react';
import { Save, X, Trash2, Edit3 } from 'lucide-react';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  onDelete?: () => void;
  className?: string;
  isEditMode: boolean;
  multiline?: boolean;
  placeholder?: string;
  label?: string;
  fieldType?: 'text' | 'title' | 'description';
}

export const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onSave,
  onDelete,
  className = '',
  isEditMode,
  multiline = false,
  placeholder = 'Click to edit...',
  label,
  fieldType = 'text'
}) => {
  const [editValue, setEditValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (editValue.trim() === '') return;
    
    setIsSaving(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this field?')) {
      onDelete();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isEditMode) {
    return (
      <div className={className}>
        {label && <label className="text-sm font-semibold text-amber-700 block mb-2">{label}</label>}
        <div className="text-amber-800">{value || placeholder}</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-semibold text-amber-700 block">{label}</label>}
      
      {isEditing ? (
        <div className="border-2 border-amber-300 rounded-lg p-3 bg-white">
          {multiline ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border-none outline-none resize-vertical min-h-20"
              placeholder={placeholder}
              rows={3}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border-none outline-none"
              placeholder={placeholder}
            />
          )}
          
          <div className="flex justify-end space-x-2 mt-3 pt-2 border-t border-amber-100">
            <button
              onClick={handleCancel}
              className="flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors text-sm"
              disabled={isSaving}
            >
              <X size={14} />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || editValue.trim() === ''}
              className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400 rounded-md transition-colors text-sm"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={14} />
              )}
              <span>Save</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="group relative border border-transparent hover:border-amber-200 rounded-lg p-3 hover:bg-amber-50/50 transition-all cursor-pointer">
          <div
            onClick={() => setIsEditing(true)}
            className={`${className} ${!value ? 'text-amber-400 italic' : 'text-amber-800'}`}
          >
            {value || placeholder}
          </div>
          
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-100 rounded-md transition-colors"
              title="Edit"
            >
              <Edit3 size={14} />
            </button>
            {onDelete && (
              <button
                onClick={handleDelete}
                className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-md transition-colors"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
