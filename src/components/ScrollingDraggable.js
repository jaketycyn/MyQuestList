import React, { useEffect, useState } from "react";
import { List, arrayMove } from "react-movable";
import { db } from "./Firebase";

const CustomItem = React.forwardRef(
  ({ children, ...props }, ref: React.Ref<HTMLLIElement>) => (
    <li ref={ref} {...props}>
      {children}
    </li>
  )
);

const ScrollingDraggable = () => {
  const [items, setItems] = useState([]);

  function RetrieveTaskList() {
    useEffect(() => {
      const unsubscribe = db
        .collection("TaskList")
        .orderBy("timestampinverse")
        .onSnapshot(snapshot => {
          const newTaskItems = snapshot.docs.map(childNodes => ({
            id: childNodes.id,
            ...childNodes.data()
          }));
          setItems(newTaskItems);
        });
      return () => unsubscribe();
    }, []);
    return items;
  }
  return (
    <div
      style={{
        maxWidth: "332px",
        margin: "0px auto",
        backgroundColor: "#F7F7F7",
        padding: "3em"
      }}
    >
      <List
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props, isDragged }) => (
          <ul
            {...props}
            style={{
              padding: "1em",
              cursor: isDragged ? "grabbing" : undefined
            }}
          >
            {children}
          </ul>
        )}
        renderItem={({ value, props, isDragged, isSelected }) => (
          <CustomItem
            {...props}
            style={{
              ...props.style,
              padding: "1.5em",
              margin: "0.5em 0em",
              listStyleType: "none",
              cursor: isDragged ? "grabbing" : "grab",
              border: "2px solid #CCC",
              boxShadow: "3px 3px #AAA",
              color: "#333",
              borderRadius: "5px",
              fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              backgroundColor: isDragged || isSelected ? "#EEE" : "#FFF"
            }}
          >
            {value}
          </CustomItem>
        )}
      />
    </div>
  );
};

export default ScrollingDraggable;
