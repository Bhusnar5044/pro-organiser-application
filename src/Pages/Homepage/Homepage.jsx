import React, { useEffect, useState, Fragment } from "react";
import Style from "./Homepage.module.scss";
import axios from "axios";
import PreLoader from "../../Components/Pre-Loader/Pre_Loader";
import { Link } from "react-router-dom";
const Homepage = () => {
  const [boardsData, setBoardsData] = useState({});
  const [showBoards, setShowBoards] = useState(false);
  const [loader, setPreLoader] = useState(false);
  let getBoardsData = () => {
    axios
      .get("https://pro-organizer-app-4cab0.firebaseio.com/BoardData.json")
      .then((response) => {
        // console.log(Object.entries(response.data));
        setPreLoader(true);
        setBoardsData(response.data);
        boardsData == null ? setShowBoards(false) : setShowBoards(true);
      })
      .catch((err) => {
        alert("SOMETHING WENT WRONG , " + err.message);
      });
  };
  useEffect(() => {
    getBoardsData();
  }, [showBoards]);
  return (
    <>
      {!loader ? (
        <PreLoader />
      ) : (
        <div className={Style.Container}>
          <h3 className={Style.Boards}>Boards</h3>
          <div className={Style.mainContainer}>
            {boardsData ? (
              Object.entries(boardsData).map((board) => (
                <Fragment key={board[0]}>
                  <Link
                    to={{
                      pathname: "/" + board[1].boardName,
                      state: {
                        boardId: board[0],
                        boardMembers: board[1].boardMember,
                      },
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <div className={Style.board}>
                      <h5>{board[1].boardName}</h5>
                    </div>
                  </Link>
                </Fragment>
              ))
            ) : (
              <h5 className={Style.Noboards}>
                You haven't created any boards. Kindly click on the 'Create
                Board' button in the navigation bar to create a board.
              </h5>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;
