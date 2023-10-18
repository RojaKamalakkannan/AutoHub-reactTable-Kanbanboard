import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function Item({ item, index }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            userSelect: 'none',
            padding: '16px',
            margin: '0 0 8px 0',
            minHeight: '50px',
            backgroundColor: snapshot.isDragging ? '#E0E0E0' : '#FFFFFF',
            color: 'Black',
            ...provided.draggableProps.style,
          }}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
}

export default Item;
