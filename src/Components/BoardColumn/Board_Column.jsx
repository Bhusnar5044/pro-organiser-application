import React from "react";
import Style from "./Board_Column.module.scss";
import Card from "../BoardColumnCard/Card";
import axios from "axios";

const Board_Column = ({
  handleColumnDelete,
  columnName,
  columnId,
  isCardDragged,
  boardId,
  setIsCardDragged,
}) => {
  let handleDragDrop = (e) => {
    e.preventDefault();
    let droppingCardData = JSON.parse(e.dataTransfer.getData("text"));
    console.log(droppingCardData);
    let draggingFromColumnId = droppingCardData.columnId;
    let draggingFromCardId = droppingCardData.dragcardId;
    let draggingFromCardData = droppingCardData.cardData;

    console.log(boardId, draggingFromColumnId, draggingFromCardId);
    axios
      .delete(
        `https://pro-organizer-app-4cab0.firebaseio.com/BoardData/${boardId}/board_column/${draggingFromColumnId}/card/${draggingFromCardId}/.json`
      )
      .then((res) => console.log(res))
      .catch((err) => alert("something went wrong," + err.message));

    axios
      .post(
        `https://pro-organizer-app-4cab0.firebaseio.com/BoardData/${boardId}/board_column/${columnId}/card/.json`,
        {
          taskTitle: draggingFromCardData.taskTitle,
          taskDescription: draggingFromCardData.taskDescription,
          taskDueDate: draggingFromCardData.taskDueDate,
          taskMembers: draggingFromCardData.taskMembers,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => {
        alert("something went wrong while dragging," + err.message);
      });
    setIsCardDragged(true);
  };
  return (
    <div className={Style.uppreroutercontainer}>
      <div className={Style.outercontainer}>
        <div className={Style.innercontainer}>
          <h6
            style={{
              fontSize: "18px",
              textTransform: "uppercase",
              marginLeft: "10px",
            }}
          >
            {columnName}
          </h6>
          <span onClick={() => handleColumnDelete(columnId)}>
            <i
              
              style={{
                fontSize: "18px",
                textTransform: "uppercase",
                marginRight: "10px",
                cursor: "pointer",
              }}
              class="far  fa-trash-alt"
            ></i>
          </span>
        </div>
        <div
          className={Style.cardelement}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDragDrop}
        >
          <Card columnId={columnId} isCardDragged={isCardDragged} />
        </div>
      </div>
    </div>
  );
};

export default Board_Column;
