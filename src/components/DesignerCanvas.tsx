import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect, Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';
import { Design, DesignElement } from '../types';
import Konva from 'konva';

interface DesignerCanvasProps {
  design: Design;
  width: number;
  height: number;
  onUpdate: (design: Design) => void;
}

const URLImage = ({ element, isSelected, onSelect, onChange }: { 
  element: DesignElement, 
  isSelected: boolean, 
  onSelect: () => void,
  onChange: (newAttrs: Partial<DesignElement>) => void 
}) => {
  const [img] = useImage(element.content || '');
  const shapeRef = React.useRef<Konva.Image>(null);
  const trRef = React.useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      const layer = trRef.current.getLayer();
      if (layer) layer.batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <KonvaImage
        image={img}
        x={element.x}
        y={element.y}
        width={element.width}
        height={element.height}
        rotation={element.rotation}
        draggable
        ref={shapeRef}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (!node) return;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export const DesignerCanvas: React.FC<DesignerCanvasProps> = ({ design, width, height, onUpdate }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string | null) => {
    setSelectedId(id);
  };

  const handleElementChange = (id: string, newAttrs: Partial<DesignElement>) => {
    const newElements = design.elements.map((el) => {
      if (el.id === id) {
        return { ...el, ...newAttrs };
      }
      return el;
    });
    onUpdate({ ...design, elements: newElements });
  };

  return (
    <div className="bg-neutral-200 border border-neutral-300 rounded-lg overflow-hidden shadow-inner">
      <Stage
        width={width}
        height={height}
        onMouseDown={(e) => {
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            handleSelect(null);
          }
        }}
      >
        <Layer>
          <Rect
            width={width}
            height={height}
            fill={design.backgroundColor}
          />
          {design.elements.map((el) => {
            if (el.type === 'image' || el.type === 'pattern') {
              return (
                <URLImage
                  key={el.id}
                  element={el}
                  isSelected={el.id === selectedId}
                  onSelect={() => handleSelect(el.id)}
                  onChange={(newAttrs) => handleElementChange(el.id, newAttrs)}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
};
