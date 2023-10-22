import React from "react";
import { TbCurrencyNaira } from "../assets/icons";
import { DataTable, Spinner } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../context/actions/productActions";
import { useEffect } from "react";
import { deleteAProduct, getAllProducts } from "../api";
import { alertNull, alertSuccess } from "../context/actions/alertActions";

const DbItems = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    // Check if products is null, and if so, fetch the products
    if (products === null) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, [dispatch, products]);

  if (products === null) {
    return <Spinner />;
  }

  const columns = [
    {
      title: "Image",
      field: "imageURL",
      render: (rowData) => (
        <img
          className="w-32 h-16 object-contain rounded-md"
          src={rowData.imageURL}
        />
      ),
    },
    {
      title: "Name",
      field: "product_name",
    },
    {
      title: "Category",
      field: "product_category",
    },
    {
      title: "Price",
      field: "product_price",
      render: (rowData) => (
        <p className="text-xl font-semibold text-textColor items-center justify-center">
          <span className="text-red-400">
            <TbCurrencyNaira />
          </span>{" "}
          {parseFloat(rowData.product_price).toFixed(2)}
        </p>
      ),
    },
  ];
  const title = "List of products";
  const actions = [
    {
      icon: "edit",
      tooltip: "Edit Data",
      onClick: (event, rowData) => {
        alert("You want to edit" + rowData.productId);
      },
    },
    {
      icon: "delete",
      tooltip: "Delete Data",
      onClick: (event, rowData) => {
        if (window.confirm("Are you sure you want to perform this action")) {
          deleteAProduct(rowData.product)
            .then(() => {
              dispatch(alertSuccess("Product Deleted"));
              setTimeout(() => {
                dispatch(alertNull());
              }, 3000);
              return getAllProducts();
            })
            .then((data) => {
              dispatch(setAllProducts(data));
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      },
    },
  ];

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
        columns={columns}
        data={products}
        title={title}
        actions={actions}
      />
    </div>
  );
};

export default DbItems;
