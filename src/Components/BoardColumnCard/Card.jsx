import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Style from "./Card.module.scss";
import Modal from "../Modal/Modal";
import Pic from "../../stone.jpg";
import swal from "sweetalert";
import { withRouter, useParams, useLocation } from "react-router-dom";
const Card = ({ columnId, isCardDragged }) => {
  const location = useLocation();
  const { boardId, boardMembers } = location.state;
  const { boardName } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskMembers, setTaskMembers] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [isCardInserted, setIsCardInseterted] = useState(false);
  const [cardDetails, setCardDetails] = useState({});
  const [cardDetailsTitle, setCardDetailsTitle] = useState("");
  const [cardDetailsMembers, setCardDetailsMembers] = useState([]);
  const [cardDetailsDescription, setCardDetailsDescription] = useState("");
  const [cardDetailsDueDate, setCardDetailsDueDate] = useState("");
  const [cardId, setCardId] = useState("");
  const [editCardDetails, setEditCardDetails] = useState(false);
  const [isCardEdited, setIsCardEdited] = useState(false);
  const [isCardDeleted, setIsCardDeleted] = useState(false);
  let todayDate = new Date().toISOString().slice(0, 10);

  let handleAddCard = () => {
    setShowModal(true);
    setEditCardDetails(false);
  };
  let handleModalClose = () => {
    setShowModal(false);
  };
  let handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };
  let handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };
  let handleTaskDateChange = (e) => {
    setTaskDueDate(e.target.value);
  };
  let handleTaskMembersChange = (e) => {
    let selectedoptions = e.target.selectedOptions;
    let members = [...selectedoptions].map((member) => member.value);
    // console.log(members);
    setTaskMembers(members);
  };

  let handleInsertCard = (e) => {
    console.log("button clicked");
    e.preventDefault();
    console.log(cardDetailsDueDate, todayDate);
    if (editCardDetails) {
      axios
        .put(
          `https://pro-organizer-app-4cab0.firebaseio.com/BoardData/${boardId}/board_column/${columnId}/card/${cardId}/.json`,
          {
            taskTitle: taskTitle == "" ? cardDetailsTitle : taskTitle,
            taskMembers: taskMembers == "" ? cardDetailsMembers : taskMembers,
            taskDescription:
              taskDescription == "" ? cardDetailsDescription : taskDescription,
            taskDueDate: taskDueDate == "" ? cardDetailsDueDate : taskDueDate,
          }
        )
        .then((res) =>
          swal("The card is Edited sucessfully 😃", {
            icon: "success",
            buttons: false,
            timer: 3000,
          })
        )
        .catch((err) => alert(err.message));
      setEditCardDetails(false);
      setShowModal(false);
      setIsCardEdited(true);
    } else {
      if (!(taskDueDate < todayDate)) {
        axios
          .post(
            `https://pro-organizer-app-4cab0.firebaseio.com/BoardData/${boardId}/board_column/${columnId}/card/.json`,
            {
              taskTitle,
              taskMembers,
              taskDescription,
              taskDueDate,
            }
          )
          .then((res) => setIsCardInseterted(true))
          .catch((err) => {
            alert("s0mething went wrong ," + err.message);
          });
        setShowModal(false);
        setTaskTitle("");
        setTaskMembers([]);
        setTaskDescription("");
        setTaskDueDate("");
      } else {
        swal("Invalid Date", "You can't select past date as DUEDATE", "info");
      }
    }
  };

  let getCardDetails = () => {
    axios
      .get(
        `https://pro-organizer-app-4cab0.firebaseio.com/BoardData/${boardId}/board_column/${columnId}/card.json`
      )
      .then((response) => setCardDetails(response.data))
      .catch((err) => alert("something went wrong," + err.message));
  };
  useEffect(() => {
    setIsCardInseterted(false);
    setIsCardEdited(false);
    getCardDetails();
  }, [isCardInserted, isCardEdited, cardDetails, isCardDeleted, isCardDragged]);

  let handleCardDetailsClick = (
    taskTitle,
    taskDescription,
    taskDueDate,
    taskMembers,
    cardId
  ) => {
    setShowCardDetails(true);
    setCardDetailsTitle(taskTitle);
    setCardDetailsDescription(taskDescription);
    setCardDetailsMembers(taskMembers);
    setCardDetailsDueDate(taskDueDate);
    setCardId(cardId);
  };
  let handleCloseCardDetails = () => {
    setShowCardDetails(false);
  };

  let handleCardDetailsEdit = () => {
    console.log(cardDetailsTitle, cardDetailsDueDate, cardDetailsDescription);
    setShowModal(true);
    setShowCardDetails(false);
    setEditCardDetails(true);
  };
  let handleCardDetailsArchive = () => {
    swal({
      title: "Are you sure?",
      text: `${cardDetailsTitle.toUpperCase()} card will be deleted`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        return (
          axios
            .delete(
              `https://pro-organizer-app-4cab0.firebaseio.com/BoardData/${boardId}/board_column/${columnId}/card/${cardId}/.json`
            )
            .then((response) => {
              setIsCardDeleted(true);
              setShowCardDetails(false);
            })
            .catch((err) => alert("something went wrong," + err.message)),
          swal(`${cardDetailsTitle.toUpperCase()} card Deleted Succesfully`, {
            icon: "success",
          })
        );
      } else {
        swal(`${cardDetailsTitle.toUpperCase()} card not Deleted 😁!`);
      }
    });
  };

  let handleDragging = (dragcardId, cardData, e) => {
    console.log(dragcardId);
    let draggedCardDetails = {
      columnId,
      dragcardId: dragcardId,
      cardData,
    };
    e.dataTransfer.setData("text", JSON.stringify(draggedCardDetails));
  };
  return (
    <>
      {cardDetails &&
        Object.entries(cardDetails).map((card) => (
          <Fragment key={card[0]}>
            <div
              draggable
              onDragStart={(e) => handleDragging(card[0], card[1], e)}
              className={Style.addedcard}
              onClick={() =>
                handleCardDetailsClick(
                  card[1].taskTitle,
                  card[1].taskDescription,
                  card[1].taskDueDate,
                  card[1].taskMembers,
                  card[0]
                )
              }
            >
              <div
                style={{
                  textTransform: "uppercase",
                  display: "flex",
                }}
              >
                <h5>{card[1].taskTitle}</h5>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <i style={{ fontSize: "22px" }} class="fas fa-tasks"></i>
                <div style={{ display: "flex", margin: "0px 3px" }}>
                  {card[1].taskMembers.map((member) => (
                    <div className={Style.members}>{member.charAt(0)}</div>
                  ))}
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      <div onClick={handleAddCard} className={Style.cardelement}>
        <h6 style={{ textAlign: "center" }}>Add a card</h6>
      </div>
      {showModal && (
        <Modal>
          {editCardDetails ? (
            <h4
              style={{ backgroundImage: `url(${Pic})` }}
              className={Style.title}
            >
              Edit Card Details
            </h4>
          ) : (
            <h4
              style={{ backgroundImage: `url(${Pic})` }}
              className={Style.title}
            >
              Add Card
            </h4>
          )}

          <form onSubmit={handleInsertCard}>
            <label className="ml-3" htmlFor="task_title">
              <h5>Enter a title for your task</h5>
            </label>{" "}
            <div className={Style.formDiv}>
              <input
                type="text"
                name="task_title"
                id="title"
                defaultValue={editCardDetails ? cardDetailsTitle : ""}
                required
                placeholder="e.g Add a new icon"
                onChange={handleTaskTitleChange}
              />
            </div>
            <label className="ml-3" htmlFor="task_members">
              <h5>Choose members for this task(select multiple ,if needed)</h5>
            </label>
            <div className={Style.formDiv}>
              <select
                name="task_members"
                id="members"
                multiple
                defaultValue={editCardDetails ? cardDetailsMembers : ""}
                required
                onChange={handleTaskMembersChange}
              >
                {boardMembers.split(",").map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
            </div>
            <label className="ml-3" htmlFor="task_description">
              <h5>Add the description for your task</h5>
            </label>{" "}
            <div className={Style.formDiv}>
              <input
                type="text"
                name="task_description"
                id="description"
                defaultValue={editCardDetails ? cardDetailsDescription : ""}
                placeholder="Add your description here"
                required
                onChange={handleTaskDescriptionChange}
              />
            </div>
            <label className="ml-3" htmlFor="task_due_date">
              <h5>Select the due date for this task</h5>
            </label>
            <div className={Style.formDiv}>
              <input
                type="date"
                name="task_due_date"
                id="due_date"
                defaultValue={editCardDetails ? cardDetailsDueDate : ""}
                required
                onChange={handleTaskDateChange}
              />
            </div>
            <div className={Style.buttons}>
              {editCardDetails ? (
                <button className={Style.btn1} type="submit" id="CreateCard">
                  Edit Card
                </button>
              ) : (
                <button className={Style.btn1} type="submit" id="CreateCard">
                  Add Card
                </button>
              )}
              <button
                className={Style.btn2}
                id="closeCard"
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
      {showCardDetails && (
        <Modal>
          <div>
            <div className={Style.cardDetails}>
              <div>
                <h4 className={Style.cardtitle}>{cardDetailsTitle}</h4>
              </div>
              <div className={Style.handleButtons}>
                <button
                  className={Style.btn1}
                  id="edit"
                  onClick={handleCardDetailsEdit}
                >
                  Edit
                </button>
                <button
                  className={Style.btn2}
                  id="archive"
                  onClick={handleCardDetailsArchive}
                >
                  Archive
                </button>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <span style={{ margin: "3px 10px", fontWeight: "600" }}>
                in<h6 className={Style.boardtype}>{boardName}</h6>
              </span>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "15px 0px",
              }}
            >
              <h5>Description</h5>
              <p>{cardDetailsDescription}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "15px 0px",
              }}
            >
              <h5>Members</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "15px 0px",
                }}
              >
                {cardDetailsMembers.map((member) => (
                  <div className={Style.membersboard}>{member.charAt(0)}</div>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "15px 0px",
              }}
            >
              <h5>Due Date</h5>
              <p>{cardDetailsDueDate}</p>
            </div>
          </div>
          <button class={Style.button} onClick={handleCloseCardDetails}>
            Cancel
          </button>
        </Modal>
      )}
    </>
  );
};

export default withRouter(Card);
