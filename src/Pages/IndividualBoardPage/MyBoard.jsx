import React, { useState, useEffect } from "react";
import Style from "./MyBoard.module.scss";
import axios from "axios";
import AddColumn from "../../Components/AddColumns/Add_Column";
import BoardColumn from "../../Components/BoardColumn/Board_Column";
import { useHistory, useParams, useLocation } from "react-router";
import swal from "sweetalert";
const MyBoard = () => {
  const history = useHistory();
  const location = useLocation();
  const { boardId } = location.state;
  const { boardName } = useParams();
  const [newColumn, setnewColumn] = useState({});
  const [showColumn, setShowColumn] = useState(false);
  const [isCardDragged, setIsCardDragged] = useState(false);
  const [isColumnDeleted, setIsColumnDeleted] = useState(false);
  useEffect(() => {
    setIsColumnDeleted(false);
    setShowColumn(false);
    setIsCardDragged(false);
    getColumnName();
  }, [showColumn, isColumnDeleted, isCardDragged]);

  let getColumnName = () => {
    axios
      .get(
        `https://pro-organizer-app-4cab0.firebaseio.com/BoardData/${boardId}/board_column/.json`
      )
      .then((response) => {
        console.log(response.data);
        setnewColumn(response.data);
      })
      .catch((err) => {
        alert("something went wrong ," + err.message);
      });
  };
  let HandleColumnDelete = (columnId) => {
    axios
      .delete(
        `https://pro-organizer-app-4cab0.firebaseio.com/BoardData/${boardId}/board_column/${columnId}/.json`
      )
      .then((response) => setIsColumnDeleted(true))
      .catch((err) => {
        alert("something went wrong ," + err.message);
      });
  };

  let reDirectToHome = () => {
    history.push("/");
  };
  let handleBoardDelete = () => {
    swal({
      title: "Are you sure?",
      text: `Your ${boardName.toUpperCase()} board  will be Deleted`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        return (
          axios
            .delete(
              `https://pro-organizer-app-4cab0.firebaseio.com/BoardData/${boardId}/.json`
            )
            .then((response) => {
              reDirectToHome();
            }),
          swal(`${boardName.toUpperCase()} Deleted`, {
            icon: "success",
          })
        );
      } else {
        swal(`Your ${boardName.toUpperCase()}  board is safe  😃!`);
      }
    });
  };

  return (
    <div className={Style.mainContainer}>
      <div className={Style.myboard}>
        <h4 className={Style.boardTitle}>{boardName.toUpperCase()}</h4>
        <button className={Style.smallbtn} onClick={handleBoardDelete}>
          Delete Board
        </button>
      </div>
      <div className={Style.container}>
        {newColumn &&
          Object.entries(newColumn).map((column) => (
            <BoardColumn
              key={column[0]}
              columnName={column[1].columnName}
              columnId={column[0]}
              isCardDragged={isCardDragged}
              handleColumnDelete={HandleColumnDelete}
              boardId={boardId}
              setIsCardDragged={setIsCardDragged}
            />
          ))}
        <AddColumn boardId={boardId} setShowColumn={setShowColumn} />
      </div>
    </div>
  );
};

export default MyBoard;
