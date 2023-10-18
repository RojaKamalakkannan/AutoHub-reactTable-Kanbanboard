import React, { useEffect, useState } from 'react';
import Column from './Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function App({rowData}) {

const initialData = {
  columns: {
    column1: {
      id: 'column1',
      title: 'BOOKING',
      itemIds: rowData.map((item) => item.vehicleid.toString()),
    },
    column2: {
      id: 'column2',
      title: 'BLOCKED',
      itemIds: [], 
    },
    column3: {
      id: 'column3',
      title: 'SOLD',
      itemIds: [], 
    },
  },
 
   items: rowData.reduce((acc, item) => {
    acc[item.vehicleid] = {
      id: item.vehicleid.toString(),
      content: (
        <div>
          <div> 
            <img
              src={item.images}
              alt="Vehicle"
             /></div>
          <div>Make: {item.make}</div>
          <div>Model: {item.model}</div>
          <div>Year: {item.year}</div>
          <div>Mileage: {item.mileage}</div>
          <div>Price: {item.price}</div>
          <div className={`${item.status === "AVAILABLE" ? "text-green-700" : item.status === "SOLD" ? "text-red-700" : "text-blue-700"}`}>
             Status: {item.status}</div>
        </div>
      ),
    };
    return acc;
  }, {}),
  columnOrder: ['column1', 'column2', 'column3'],
};
  const [data, setData] = useState(initialData);
  const [alldata, setallData] = useState(initialData);

  useEffect(() => {

  })


  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newItemIds = Array.from(startColumn.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        itemIds: newItemIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
    } else {
      const startItemIds = Array.from(startColumn.itemIds);
      startItemIds.splice(source.index, 1);

      const newStartColumn = {
        ...startColumn,
        itemIds: startItemIds,
      };

      const endItemIds = Array.from(endColumn.itemIds);
      endItemIds.splice(destination.index, 0, draggableId);

      const newEndColumn = {
        ...endColumn,
        itemIds: endItemIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newStartColumn.id]: newStartColumn,
          [newEndColumn.id]: newEndColumn,
        },
      };

      setData(newData);
    }
    };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ display: 'flex' }}
          >

           { data.columnOrder.map((columnId, index) => {
            const column = data.columns[columnId];
            const items = column.itemIds.map((itemId) => data.items[itemId]);

            return (
              <Column
                key={columnId}
                column={column}
                items={items}
                index={index}
              />
            );
          })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
