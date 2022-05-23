import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchLoadingSkelleton from "./SearchLoadingSkelleton";
import { searchProductAction } from "./_redux/Action/SearchInputAction";
// import { translate } from "../../services/translation/translation";
// import Translate from "../translation/Translate";

const SearchInput = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const suggestions = useSelector((state) => state.SearchReducer.products);
  const loading = useSelector((state) => state.SearchReducer.loading);
  
  const searchProduct = (e) => {
    setSearch(e.target.value);
    dispatch(searchProductAction(e.target.value));
  };
  
  console.log(`suggestions`, suggestions)
  
  const searchClick = (searchData) => {
    setSearch("");

    // if (searchData.is_item) {
    //   router
    //     .push(`/products/${searchData.slug}`)
    //     .then((_) => window.scrollTo(0, 0));
    // }
    // if (searchData.is_category) {
    //   router
    //     .push(`/products?category=${searchData.id}`)
    //     .then((_) => window.scrollTo(0, 0));
    // }
  };

  return (
    <>
      <form className="header_search_product_menu_area form-inline mobile_device_form_inline top-search align-items-center justify-content-center">
        <input
          className="form-control mx-0 rounded-0"
          type="text"
          placeholder="Search for products, categories, subcategories..."
          onChange={(e) => searchProduct(e)}
        />
        <button className="btn btn-success rounded-0 mx-0" type="button">
          <i className="fas fa-search"></i>
        </button>

        <SearchLoadingSkelleton loading={loading} />

        {search.length > 0 && suggestions.length === 0 && !loading && (
          <div className="search-suggestion-area">
            <div
              className="text-danger text-center"
              style={{ margin: 0, display: "flex", flexDirection: "column" }}
            >
              <p>Sorry, No Product found by - {search} </p>
              {/* <Translate>Sorry, No Product found by</Translate> - {search}{" "} */}

              <p>Please try with another keyword !</p>
            </div>
          </div>
        )}

        {search.length > 0 && suggestions.length > 0 && (
          <div className="search-suggestion-area">
            {suggestions.map((searchItem, searchIndex) => (
              <div
                className="search-suggestion-item"
                key={searchIndex}
                onClick={() => searchClick(searchItem, searchIndex)}
              >
                {searchItem.image !== null ? (
                  <div className="float-left search-suggestion-item__img-box">
                    <img src={searchItem.image} alt="" width={50} />
                  </div>
                ) : (
                  <div className="float-left">
                    <img
                      src="/images/default/fallback-image.png"
                      alt=""
                      width={50}
                    />
                  </div>
                )}

                <div className="float-left search-suggestion-item__info">
                  <h5 className="search-title search-suggestion-item__title">
                    {searchItem.is_category ? "Category - " : ""}
                    {searchItem.name}
                  </h5>
                  {searchItem.search_price > 0 && (
                    <p className="search-price search-suggestion-item__search-price">
                      ৳ {searchItem.regular_price}
                    </p>
                  )}
                </div>

                <div className="clearfix"></div>
              </div>
            ))}
          </div>
        )}
      </form>
    </>
  );
};

export default SearchInput;
