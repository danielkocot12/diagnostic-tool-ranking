import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { DiagnosticCheck } from '../types';

interface SortableCheckProps {
  id: string;
  check: DiagnosticCheck;
}

export default function SortableCheck({ id, check }: SortableCheckProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-lg p-4 ${
        isDragging ? 'shadow-lg border-blue-500' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          className="mt-1 p-1 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-5 h-5 text-gray-400" />
        </button>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{check.name}</h3>
          <p className="text-gray-600 mt-1">{check.description}</p>
        </div>
      </div>
    </div>
  );
}