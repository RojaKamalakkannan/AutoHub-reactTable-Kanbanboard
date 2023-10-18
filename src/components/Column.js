import React from 'react';
import Item from './Item';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function Column({ column, items, index }) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={{
            background:'lightgrey',
            margin: '60px',
            padding: '8px',
            width: '400px',
     
          }}
        >
          <h2 {...provided.dragHandleProps}>{column.title}</h2>
          <Droppable droppableId={column.id} type="item">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                  padding: '8px',
                  minHeight: '100px',
                }}
              >
                {items.map((item, index) => (
                  <Item key={item.id} item={item} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
