
import React, { useState, useRef, useEffect } from 'react';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  isEditMode: boolean;
  multiline?: boolean;
  placeholder?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onSave,
  className = '',
  isEditMode,
  multiline = false,
  placeholder = 'Click to edit...'
}) => {
  const [editValue, setEditValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isEditMode) {
    return <div className={className}>{value || placeholder}</div>;
  }

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input';
    
    return (
      <div className="relative">
        <InputComponent
          ref={inputRef as any}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className={`${className} border-2 border-amber-300 rounded px-2 py-1 w-full bg-white focus:outline-none focus:border-amber-500 ${
            multiline ? 'min-h-20 resize-vertical' : ''
          }`}
          placeholder={placeholder}
          {...(multiline ? { rows: 3 } : {})}
        />
        <div className="flex justify-end space-x-2 mt-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`${className} cursor-pointer hover:bg-amber-50 rounded px-2 py-1 border-2 border-transparent hover:border-amber-200 transition-colors`}
    >
      {value || <span className="text-amber-400 italic">{placeholder}</span>}
    </div>
  );
};
