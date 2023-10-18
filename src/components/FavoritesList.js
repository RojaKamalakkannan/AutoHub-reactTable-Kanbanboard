import React, { useState } from "react";
import { useTable } from "react-table";

const FavoriteList = ({ columnList, favoriteList, updateFavoriteList }) => {

  const data = React.useMemo(() => favoriteList, []);
  const columns = React.useMemo(() => columnList, []);

  const [favoriteLists, setFavoriteList] = useState(favoriteList);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalIsOpen(true);
  };

  const addToFavorites = (vehicle) => {
    const isFavorite = isVehicleInFavorites(vehicle);
    console.log("isFavorite check", isFavorite);

    if (isFavorite) {
      // Remove the vehicle from favorites
      const updatedList = favoriteLists.filter(
        (favVehicle) => favVehicle.vehicleid !== vehicle.vehicleid
      );
      console.log("Updated Favorites List (Remove):", updatedList);
      setFavoriteList(updatedList);
    } else {
      // Add the vehicle to favorites
      const updatedList = [...favoriteLists, vehicle];
      console.log("Updated Favorites List (Add):", updatedList);
      setFavoriteList(updatedList);
    }
  };

  const removeFromFavorites = (vehicle) => {
    const updatedFavoriteList = favoriteList.filter(
      (item) => item.vehicleid !== vehicle.vehicleid
    );
    updateFavoriteList(updatedFavoriteList);
  };

  const isVehicleInFavorites = (vehicle) => {
    const isFavorite = favoriteLists.some(
      (favVehicle) => favVehicle.vehicleid === vehicle.vehicleid
    );
    return isFavorite;
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns: columnData, data: favoriteList });

  return (
    <div className="text-center bg-gray-180 p-4">
      {favoriteList.length > 0 && (
        <table
          {...getTableProps()}
          className="w-full border-collapse bg-linen m-0 align-left min-w-full divide-y divide-gray-200"
        >
          <thead>
            {headerGroups.map((headerGroup, column) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-cadetblue">
                {headerGroup.headers.map((column) => (
                  <th
                    className="px-16 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900"
                      {...cell.getCellProps()}
                    >
                      {cell.column.Header === "Delete" ? (
                        <button
                          className="text-red-900 bg-red border border-red-300 focus:outline-none hover:bg-red-100 font-medium rounded-lg text-sm px-5 py-0 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-red-700 dark:hover:border-gray-600 "
                          onClick={() => removeFromFavorites(row.original)}
                        >
                          Remove from Favorite
                        </button>
                      ) : cell.column.Header === "Images" ? (
                        <img
                          src={cell.value}
                          alt="Vehicle"
                          className="w-32 cursor-pointer flex justify-center mx-auto"
                          onClick={() => openModal(row.original)}
                        />
                      ) : cell.column.Header === "IsFavorite" ? (
                        <button
                          onClick={() => addToFavorites(row.original)}
                          className={`${
                            isVehicleInFavorites(row.original)
                              ? "bg-green-500 hover-bg-green-700"
                              : "bg-blue-500 hover-bg-blue-700"
                          } text-white font-bold py-2 px-4 rounded`}
                        >
                          {isVehicleInFavorites(row.original)
                            ? "Added to Favorites"
                            : "Add to Favorites"}
                        </button>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>

        </table>
      )}
    </div>
  );
};
const columnData = [
  {
    Header: "Images",
    accessor: "images",
    Cell: ({ value }) => (
      <img src={value} alt="Vehicle" style={{ width: "100px" }} />
    ),
  },
  {
    Header: "Make",
    accessor: "make",
  },
  {
    Header: "Model",
    accessor: "model",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Year",
    accessor: "year",
  },
  {
    Header: "Mileage",
    accessor: "mileage",
  },
  {
    Header: "Delete",
    accessor: "delete",
  },
 
  
];

export default FavoriteList;
