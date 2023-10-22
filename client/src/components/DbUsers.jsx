import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../api";
import { Avatar } from "../assets";
import { setAllUserDetails } from "../context/actions/allUserAction";
import DataTable from "./DataTable";
import Spinner from "./Spinner";

const DbUsers = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allUsers === null) {
        getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
  }, [dispatch, allUsers]);

  if (allUsers === null) {
    return <Spinner />;
  }

  const columns = [
    {
      title: "Image",
      field: "imageURL",
      render: (rowData) => (
        <img
          className="w-32 h-16 object-contain rounded-md"
          src={rowData.photoURL ? rowData.photoURL : Avatar}
        />
      ),
    },
    {
      title: "Name",
      field: "displayName",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Verified",
      field: "email",
      render: (rowData) => (
        <p
          className={`px-2 py-1 w-32 text-center text-primary rounded-md ${
            rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          {rowData.emailVerified ? "Verified" : "Not verified"}
        </p>
      ),
    },
  ];
  const title = "List of Users";
//   const actions = [
//     {
//       icon: "edit",
//       tooltip: "Edit Data",
//       onClick: (event, rowData) => {
//         alert("You want to edit" + rowData.productId);
//       },
//     },
//     {
//       icon: "delete",
//       tooltip: "Delete Data",
//       onClick: (event, rowData) => {
//         if (window.confirm("Are you sure you want to perform this action")) {
//           deleteAProduct(rowData.product)
//             .then(() => {
//               dispatch(alertSuccess("Product Deleted"));
//               setTimeout(() => {
//                 dispatch(alertNull());
//               }, 3000);
//               return getAllProducts();
//             })
//             .then((data) => {
//               dispatch(setAllProducts(data));
//             })
//             .catch((error) => {
//               console.error("Error:", error);
//             });
//         }
//       },
//     },
//   ];

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
        columns={columns}
        data={allUsers}
        title={title}
        // actions={actions}
      />
    </div>
  );
};

export default DbUsers;
