import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Category } from '../types';
import SortableCheck from './SortableCheck';

interface CategorySectionProps {
  category: Category;
  items: string[];
  onReorder: (newOrder: string[]) => void;
}

export default function CategorySection({
  category,
  items,
  onReorder,
}: CategorySectionProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{category.name}</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {items.map((checkName) => {
              const check = category.checks.find(c => c.name === checkName);
              if (!check) return null;
              return (
                <SortableCheck
                  key={checkName}
                  id={checkName}
                  check={check}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}