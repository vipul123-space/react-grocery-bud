import React, { useEffect } from "react";
import Modal from "./Modal";
import { reducer } from "./Reducer";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
const defaultState = {
  groceryItems: getLocalStorage(),
  modalContent: "",
  setShowmodal: false,
  modalColor: "",
  isEditing: false,
};

function Grocery() {
  const [item, setItem] = React.useState("");
  const [isEditId, setIsEditId] = React.useState(null);
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  const clickHandler = (e) => {
    e.preventDefault();
    if (!state.isEditing && item) {
      const newItem = { id: new Date().getTime().toString(), item };
      dispatch({ type: "ADD_ITEM", payload: newItem });
      setItem("");
    } else if (item && state.isEditing) {
      const newItem = state.groceryItems.find((item) => item.id === isEditId);
      newItem.item = item;
      dispatch({ type: "EDIT__ITEM" });
      state.isEditing = false;
      setItem("");
    } else {
      dispatch({ type: "EMPTY" });
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE__MODAL" });
  };

  const editItem = (id) => {
    const newItem = state.groceryItems.find((item) => item.id === id);
    setItem(newItem.item);
    setIsEditId(id);
    state.isEditing = true;
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(state.groceryItems));
  }, [state.groceryItems]);

  return (
    <>
      <section className="grocery__container">
        {state.setShowmodal && (
          <Modal
            closeModal={closeModal}
            modalContent={state.modalContent}
            modalColor={state.modalColor}
          />
        )}
        <h2 className="grocery__title">grocery bud</h2>
        <section className="form__content">
          <form action="" className="form">
            <input
              type="text"
              className="form__input"
              placeholder="e.g. eggs"
              value={item}
              onChange={(e) => {
                setItem(e.target.value);
              }}
            />
            <button
              className="form__button"
              type="submit"
              onClick={clickHandler}
            >
              {state.isEditing ? "Edit" : "submit"}
            </button>
          </form>
        </section>
        {state.groceryItems.map((grocery) => {
          return (
            <section key={grocery.id} className="items">
              <h1 className="item__name">{grocery.item}</h1>
              <div className="button__container">
                <span
                  className="edit__icon"
                  onClick={() => editItem(grocery.id)}
                >
                  <ion-icon name="create-outline"></ion-icon>
                </span>
                <span
                  onClick={() => {
                    dispatch({ type: "DELETE__ITEM", payload: grocery.id });
                    setItem("");
                  }}
                  className="delete__icon"
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </span>
              </div>
            </section>
          );
        })}
        <span className="delete">
          <button
            onClick={() => {
              dispatch({ type: "DELETE__ALL" });
              setItem("");
            }}
            className="clear"
          >
            delete all
          </button>
        </span>
      </section>
    </>
  );
}

export default Grocery;
