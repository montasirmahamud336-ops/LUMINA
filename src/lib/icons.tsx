import * as LucideIcons from 'lucide-react';
import React from 'react';

export const IconRegistry: Record<string, React.FC<any>> = {};

// Filter out actual icon components from the module
Object.entries(LucideIcons).forEach(([name, component]) => {
  if (typeof component === 'function' || (typeof component === 'object' && component !== null)) {
    IconRegistry[name] = component as React.FC<any>;
  }
});

export function DynamicIcon({ name, ...props }: { name: string; [key: string]: any }) {
  const IconComponent = IconRegistry[name];
  if (!IconComponent) {
    // Fallback to a default icon if not found
    const Fallback = LucideIcons.HelpCircle;
    return <Fallback {...props} />;
  }
  return <IconComponent {...props} />;
}

// Helper to get all available names for selection UI
export const availableIcons = Object.keys(IconRegistry).sort();
