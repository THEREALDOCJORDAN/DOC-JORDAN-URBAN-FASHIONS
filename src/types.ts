export interface Product {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  template_width: number;
  template_height: number;
  base_price: number;
}

export interface DesignElement {
  id: string;
  type: 'image' | 'text' | 'shape' | 'pattern';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  content?: string; // For text or image URL
  color?: string;
  opacity?: number;
}

export interface Design {
  id: string;
  name: string;
  elements: DesignElement[];
  backgroundColor: string;
}

export type WorkflowStep = 'select-product' | 'design' | 'sync' | 'review';
