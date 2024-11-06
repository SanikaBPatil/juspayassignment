// App.js
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

function App() {
  const [sprites, setSprites] = useState([
    { id: "cat1", name: "Cat 1", x: 0, y: 0, rotation: 0 },
    { id: "cat2", name: "Cat 2", x: 100, y: 100, rotation: 0 },
  ]);
  const [heroIndex, setHeroIndex] = useState(0);

  // Define motion actions
  const moveForward = () => updateSprite(heroIndex, "y", sprites[heroIndex].y - 20);
  const rotateLeft = () => updateSprite(heroIndex, "rotation", sprites[heroIndex].rotation - 90);
  const rotateRight = () => updateSprite(heroIndex, "rotation", sprites[heroIndex].rotation + 90);
  const resetPosition = () => updateSprite(heroIndex, { x: 0, y: 0, rotation: 0 });

  const updateSprite = (index, field, value) => {
    const updatedSprites = [...sprites];
    if (typeof field === "object") {
      updatedSprites[index] = { ...updatedSprites[index], ...field };
    } else {
      updatedSprites[index][field] = value;
    }
    setSprites(updatedSprites);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updatedSprites = Array.from(sprites);
    const [removed] = updatedSprites.splice(result.source.index, 1);
    updatedSprites.splice(result.destination.index, 0, removed);
    setSprites(updatedSprites);
  };

  return (
    <div className="App">
      <h1>Scratch-Like Motion with React</h1>

      <div className="controls">
        <button onClick={moveForward}>Move Forward</button>
        <button onClick={rotateLeft}>Rotate Left</button>
        <button onClick={rotateRight}>Rotate Right</button>
        <button onClick={resetPosition}>Reset</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              className="workspace"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {sprites.map((sprite, index) => (
                <Draggable key={sprite.id} draggableId={sprite.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => setHeroIndex(index)}
                      style={{
                        ...provided.draggableProps.style,
                        transform: `translate(${sprite.x}px, ${sprite.y}px) rotate(${sprite.rotation}deg)`,
                        position: "absolute",
                        left: `${sprite.x}px`,
                        top: `${sprite.y}px`,
                      }}
                    >
                      <img
                        src="/cat-icon.png"
                        alt="Cat"
                        style={{ width: "50px", cursor: "pointer" }}
                      />
                      <p>{sprite.name}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
