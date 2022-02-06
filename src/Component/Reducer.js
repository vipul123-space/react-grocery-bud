export const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newItems = [...state.groceryItems, action.payload];
    return {
      ...state,
      groceryItems: newItems,
      modalContent: "item Added successfully",
      setShowmodal: true,
      modalColor: "modal__title--green",
    };
  }

  if (action.type === "EDIT__ITEM") {
    return { ...state, modalContent: "value has been change" };
  }

  if (action.type === "CLOSE__MODAL") {
    return { ...state, modalContent: false };
  }

  if (action.type === "DELETE__ITEM") {
    const newItems = state.groceryItems.filter(
      (item) => item.id !== action.payload
    );
    return {
      ...state,
      groceryItems: newItems,
      modalContent: "item Deleted successfully",
      setShowmodal: true,
      modalColor: "modal__title--red",
      isEditing: false,
    };
  }
  if (action.type === "EMPTY") {
    return {
      ...state,
      modalContent: "Enter the value",
      setShowmodal: true,
      modalColor: "modal__title--red",
    };
  }
  if (action.type === "DELETE__ALL") {
    return {
      ...state,
      groceryItems: [],
      modalContent: "grocery bud is empty now",
      modalColor: "modal__title--red",
    };
  }
};
