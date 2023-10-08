let initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};
export const cartReducer = (state = initialState, action) => {
  if (action.type === "ADD_TO_CART") {
    let cart = [...state.cart];
    let { payload } = action;
    let findIndex = cart.findIndex(
      (e, i) => e.product_id === payload.product_id
    );
    console.log(findIndex);
    if (findIndex !== -1) {
      cart[findIndex].clickNumber += payload.clickNumber;
    } else {
      cart.push(payload);
    }
    console.log(" ==============> cart", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    return {
      ...state,
      cart: [...cart],
    };
  }

  if (action.type === "INCREASE_CART_PRODUCT") {
    let cart = [...state.cart];
    let { payload } = action;
    let findIndex = cart.findIndex((e, i) => e.product_id === payload);
    cart[findIndex].clickNumber = cart[findIndex].clickNumber + 1;

    return {
      ...state,
      cart: [...cart],
    };
  }

  if (action.type === "DESCREASE_CART_PRODUCT") {
    let cart = [...state.cart];
    let { payload } = action;
    let findIndex = cart.findIndex((e, i) => e.product_id === payload);
    cart[findIndex].clickNumber = cart[findIndex].clickNumber - 1;
    return {
      ...state,
      cart: [...cart],
    };
  }

  if (action.type === "ORDER_TO_CART") {
    let { payload } = action;
    return {
      ...state,
      cart: [...payload],
    };
  }

  // xoa cart

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === "SET_CART") {
    let { payload } = action;
    return {
      ...state,
      cart: [...payload],
    };
  }

  if (action.type === "DELETE_CART") {
    let { payload } = action;
    return {
      ...state,
      cart: [...payload],
    };
  }

  return state;
};
