import React, { useState } from "react";
import axios from "axios";
import Style from "./Add_Column.module.scss";
import Modal from "../Modal/Modal";
import Pic from "../../stone.jpg";

const Add_Column = ({ boardId, setShowColumn }) => {
  const [columnName, setColumnName] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  let handleAddColumn = () => {
    setShowModal(true);
  };
  let handleCloseModal = (e) => {
    e.preventDefault();
    setShowModal(false);
  };
  let handleChange = (e) => {
    e.preventDefault();
    setColumnName(e.target.value);
  };
  let handleAddColumnToFirebase = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://pro-organizer-app-4cab0.firebaseio.com/BoardData/${boardId}/board_column.json`,
        {
          columnName,
        }
      )
      .then((response) => {
        console.log(response.data);
        setShowColumn(true); 
      })
      .catch((err) => {
        alert("something went wrong , " + err.message);
      });
    setShowModal(false);
  };
  return (
    <div className={Style.container}>
      <div className={Style.title} onClick={handleAddColumn}>
        <h6>Add a column</h6>&nbsp;
        <i style={{fontSize:"20px"}} class="fas fa-folder-plus"></i>
      </div>
      {showModal && (
        <Modal>
          <div className={Style.addColumn}>
            <h4
              style={{ backgroundImage: `url(${Pic})` }}
              className={Style.heading}
            >
              Add a column
            </h4>
          </div>
          <div>
            <form onSubmit={handleAddColumnToFirebase}>
              <label htmlFor="column_name">
                <h5>Enter a column name :</h5>
              </label>{" "}
              <div className={Style.formDiv}>
                <input
                  type="text"
                  name="column_name"
                  id="column_name"
                  required
                  value={columnName}
                  onChange={handleChange}
                  placeholder="e.g staging,done,etc"
                />
              </div>
              <div className={Style.buttons}>
                <button className={Style.btn1} type="submit" id="CreateColumn">
                  Add Column
                </button>
                <button
                  className={Style.btn2}
                  id="close"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Add_Column;
