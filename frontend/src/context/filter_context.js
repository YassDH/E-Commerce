import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";
import axios from "axios";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: -1,
    category: -1,
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect( () => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect( async () => {
    const available = state.filters.shipping ? 1 : 0;
    var nameOrder = -1;
    var priceOrder = -1;

    if (state.sort == "price-lowest") {
      priceOrder = 0;
      nameOrder = -1;
    }else if (state.sort == "price-highest") {
      priceOrder = 1;
      nameOrder = -1;
    }
    if (state.sort == "name-a") {
      nameOrder = 1;
      priceOrder = -1;
    }else if (state.sort == "name-z") {
      nameOrder = 0;
      priceOrder = -1;
    }
    const tempProducts = await axios.get(`http://localhost:5000/product/query/?name=${state.filters.text}&category=${state.filters.category}&company=${state.filters.company}&availableOnly=${available}&nameOrder=${nameOrder}&priceOrder=${priceOrder}&price=${state.filters.price}`)

    dispatch({ type: FILTER_PRODUCTS , payload : tempProducts.data });

  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    //for demonstartion
    // const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "category") {
      value = Number(value);
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
