import { textAlign } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import VehicleModal from "./Modal";
import FavoriteList from "./FavoritesList";
import AddVehicleForm from "./AddVehicleForm";
import { FaSort } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import { FaTrash } from "react-icons/fa";
import App from "./DraggedItem";
import "../App.css";

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
    Header: "Mileage ",
    accessor: "mileage",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "IsFavorite",
    accessor: "isFavorite",
  },
  {
    Header: "Actions",
    accessor: "actions",
  },
];
const rowData = [
  {
    vehicleid: 1,
    make: "Toyato",
    model: "Corolla",
    year: 2020,
    mileage: 15000,
    price: 200000,
    images:
      "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Toyota-Glanza-060520221539.jpg&w=872&h=578&q=75&c=1",
    status: "AVAILABLE",
    isFavorite: false,
    // actions: IconName
  },
  {
    vehicleid: 2,
    make: "Audi",
    model: "Audi X1",
    year: 2020,
    mileage: 15000,
    price: 188000,
    images:
      "https://imgd.aeplcdn.com/0X0/n/cw/ec/51909/a4-exterior-right-front-three-quarter-2.jpeg?q=80",
    status: "BLOCKED",
    isFavorite: false,
    // actions: IconName
  },
  {
    vehicleid: 3,
    make: "BMW",
    model: "BMW X5",
    year: 2020,
    mileage: 15000,
    price: 1445000,
    images:
      "https://images.hindustantimes.com/auto/img/2023/03/21/1600x900/rolls-royce-black_1679377493896_1679377772569_1679377772569.jpg",
    status: "SOLD",
    isFavorite: false,
    // actions: IconName
  },
  {
    vehicleid: 4,
    make: "Tata",
    model: "Tata X1",
    year: 2020,
    mileage: 15000,
    price: 100000,
    images:
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/149123/nexon-ev-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80&q=80",
    status: "AVAILABLE",
    isFavorite: false,
  },
  {
    vehicleid: 5,
    make: "Hundai",
    model: "Corolla",
    year: 2020,
    mileage: 1115000,
    price: 18000,
    images:
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/149123/nexon-ev-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80&q=80",
    status: "SOLD",
    isFavorite: false,
  },
  {
    vehicleid: 6,
    make: "TATA",
    model: "Corolla",
    year: 2020,
    mileage: 1115000,
    price: 18000,
    images:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Harrier/9850/1681887437871/front-left-side-47.jpg?impolicy=resize&imwidth=420",
    status: "SOLD",
    isFavorite: false,
  },
  {
    vehicleid: 7,
    make: "Crysta",
    model: "Corolla",
    year: 2020,
    mileage: 1115000,
    price: 18000,
    images:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSijfoyUZk-parabR1bkg6MQquMbxWIpBPpLw&usqp=CAU",
    status: "AVAILABLE",
    isFavorite: false,
  },
  //   {
  //     vehicleid: 8,
  //     make: "Verna",
  //     model: "Corolla",
  //     year: 2020,
  //     mileage: 1115000,
  //     price: 18000,
  //     images:
  //       "https://imgd.aeplcdn.com/1280x720/n/cw/ec/146195/tata-nexon-left-front-three-quarter0.jpeg?isig=0&wm=0",
  //     status: "AVAILABLE",
  //     isFavorite: false,
  //   },
  //   {
  //     vehicleid: 9,
  //     make: "Inova",
  //     model: "Corolla",
  //     year: 2020,
  //     mileage: 15000,
  //     price: 1445000,
  //     images:
  //       "https://images.hindustantimes.com/auto/img/2023/03/21/1600x900/rolls-royce-black_1679377493896_1679377772569_1679377772569.jpg",
  //     status: "BLOCKED",
  //     isFavorite: false,
  //   },
  //   {
  //     vehicleid: 10,
  //     make: "Toyato",
  //     model: "Corolla",
  //     year: 2020,
  //     mileage: 15000,
  //     price: 200000,
  //     images:
  //       "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Toyota-Glanza-060520221539.jpg&w=872&h=578&q=75&c=1",
  //     status: "BLOCKED",
  //     isFavorite: false,
  //   },
  //   {
  //     vehicleid: 11,
  //     make: "Toyato",
  //     model: "Corolla",
  //     year: 2020,
  //     mileage: 15000,
  //     price: 200000,
  //     images:
  //       "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Toyota-Glanza-060520221539.jpg&w=872&h=578&q=75&c=1",
  //     status: "AVAILABLE",
  //     isFavorite: false,
  //   },
  //   {
  //     vehicleid: 12,
  //     make: "Audi",
  //     model: "Corolla",
  //     year: 2020,
  //     mileage: 15000,
  //     price: 188000,
  //     images:
  //       "https://imgd.aeplcdn.com/0X0/n/cw/ec/51909/a4-exterior-right-front-three-quarter-2.jpeg?q=80",
  //     status: "SOLD",
  //     isFavorite: false,
  //   },
  //   {
  //     vehicleid: 13,
  //     make: "BMW",
  //     model: "Corolla",
  //     year: 2020,
  //     mileage: 15000,
  //     price: 1445000,
  //     images:
  //       "https://images.hindustantimes.com/auto/img/2023/03/21/1600x900/rolls-royce-black_1679377493896_1679377772569_1679377772569.jpg",
  //     status: "AVAILABLE",
  //     isFavorite: false,
  //   },
  //   {
  //     vehicleid: 14,
  //     make: "Tata",
  //     model: "Corolla",
  //     year: 2020,
  //     mileage: 15000,
  //     price: 100000,
  //     images:
  //       "https://imgd.aeplcdn.com/664x374/n/cw/ec/149123/nexon-ev-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80&q=80",
  //     status: "SOLD",
  //     isFavorite: false,
  //   },
  //   {
  //     vehicleid: 15,
  //     make: "Hundai",
  //     model: "Corolla",
  //     year: 2020,
  //     mileage: 1115000,
  //     price: 18000,
  //     images:
  //       "https://imgd.aeplcdn.com/664x374/n/cw/ec/149123/nexon-ev-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80&q=80",
  //     status: "AVAILABLE",
  //     isFavorite: false,
  //   },
  //   {
  //     vehicleid: 16,
  //     make: "TATA",
  //     model: "Corolla",
  //     year: 2020,
  //     mileage: 1115000,
  //     price: 18000,
  //     images:
  //       "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Harrier/9850/1681887437871/front-left-side-47.jpg?impolicy=resize&imwidth=420",
  //     status: "SOLD",
  //     isFavorite: false,
  //   },
];

const VechileList = () => {
  const [filter, setFilter] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [favoriteList, setFavoriteList] = useState([]);
  const [disabledVehicles, setDisabledVehicles] = useState([]);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [check, setCheck] = useState(false);
  const [data, setallData] = useState(rowData);
  const [kanbanBoardVisible, setKanbanBoardVisible] = useState(false);
  const [sorting, setSorting] = useState({
    columnId: null,
    isDescending: true,
  });

  const initialStates = {
    pageSize: 4,
    pageIndex: 0,
  };

  const getdata = (newVehicle) => {
    if (newVehicle !== null) {
      rowData.push(JSON.parse(newVehicle));
      setCheck(!check);
      console.log("getdata===>>", newVehicle);
    }
  };
  console.log("rowdata", rowData);

  //   const datas = React.useMemo(() => rowData, []);
  //   console.log("data",datas)
  const columns = React.useMemo(() => columnData, [check]);
  const initialState = React.useMemo(() => initialStates);
  // Define the initial sorting state for the "Make" column
  const initialSortBy = React.useMemo(() => [{ id: "make", desc: true }], []);

  const handleSortByClick = () => {
    const sortByColumn = "make" || "model";
    const isDescending = false;
    // Call the `setSortBy` function to set the sorting state
    setSortBy([
      {
        id: sortByColumn,
        desc: isDescending,
      },
      {
        id: "year",
        desc: isDescending,
      }
    ]);
  };

  const handleFilterChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    console.log("localstorage check", localStorage.getItem("vehicleData"));

    const getData = JSON.parse(localStorage.getItem("vehicleData"))
      .flat()
      .filter((i) => i);
    console.log("getData", getData);

    const arr = [...rowData, ...getData];
    console.log("all data", arr);

    const filter = arr.filter(
      (i) =>
        i.make.toLowerCase().includes(inputValue) ||
        i.model.toLowerCase().includes(inputValue)
    );
    console.log("filter", filter);
    setallData(filter);
  };

  const addNewVehicle = (newVehicle) => {
    const newData = [...data, newVehicle];
    setallData(newData);
    setAddFormVisible(false);
    console.log("updatred data", newData);
  };

  const addToFavorites = (vehicle) => {
    const updatedList = [...favoriteList, vehicle];
    setFavoriteList(updatedList);
  };

  const deleteVehicle = (vehicle) => {
    const updatedData = data.filter(
      (item) => item.vehicleid !== vehicle.vehicleid
    );
    setallData(updatedData);

  };

  useEffect(() => {
  if (JSON.parse(localStorage.getItem("vehicleData")) !== null) {
    const newData = [
      ...data,
      ...JSON.parse(localStorage.getItem("vehicleData")).flat().filter((i) => i)
    ];
    setallData(newData);
  }
}, []);

  const handleSortBy = (columnId) => {
    setSorting((prevSorting) => ({
      columnId,
      isDescending:
        prevSorting.columnId === columnId ? !prevSorting.isDescending : true,
    }));
  };

  const isVehicleDisabled = (vehicle) => {
    return disabledVehicles.some((v) => v.vehicleid === vehicle.vehicleid);
  };

  // const getStatusCellStyle = (status) => {
  //   switch (status) {
  //     case "AVAILABLE":
  //       return "border-green-500 text-green-500 font-bold py-1 px-2 rounded-full ";
  //     case "SOLD":
  //       return "border-red-500 text-red-500 font-bold py-1 px-2 rounded-full";
  //     default:
  //       return "border-blue-500 text-blue-500 font-bold py-1 px-2 rounded-full";
  //   }
  // };

  const getStatusCellStyle = (status) => {
    switch (status) {
      case "AVAILABLE":
        return { dotColor: "green-500", textColor: "green-700" };
      case "SOLD":
        return { dotColor: "red-500", textColor: "red-700" };
      default:
        return { dotColor: "blue-500", textColor: "blue-700" };
    }
  };
  

  const favoriteListColumns = columns.filter((column) => {
    return column.Header !== "Status" && column.Header !== "IsFavorite";
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setSortBy,
    state: { pageIndex, pageSize, sortBy },
  } = useTable({ columns, data, initialState }, useSortBy, usePagination);

  const handleSortByPriceRange = () => {
    setSortBy([{ id: "priceRange", desc: !sortBy[0]?.desc }]);
  };

  const openModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openKanbanBoard = () => {
    setKanbanBoardVisible(true);
  };

  const closeKanbanBoard = () => {
    setKanbanBoardVisible(false);
  };

  return (
    <div className="text-center bg-blue-180 p-4">
      <div className="container border-9 mx-auto mb-8 mx-6">
        <input
          className="w-full m-1 p-2 border border-gray-400  text-lg outline-black max-w-2xl mx-auto bg-white rounded shadow-lg"
          type="text"
          placeholder="Search Filter"
          onChange={handleFilterChange}
        />
        <button
          //   className=" m-1 p-2 border border-gray-400  text-lg outline-black left-0 top-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          className="h-10 px-5 m-2 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800"
          onClick={() => setAddFormVisible(true)}
        >
          + Add Vehicle
        </button>

        {isAddFormVisible && (
          <AddVehicleForm
            veachileVar={isAddFormVisible}
            setFormVisible={setAddFormVisible}
            getdata={getdata}
            addNewVehicle={addNewVehicle}
          />
        )}
        <h1 onClick={() => openKanbanBoard(true)}>
          <FontAwesomeIcon icon={faColumns} /> Kanban Board
        </h1>

        {kanbanBoardVisible ? (
          <div>
            <App rowData={rowData} />
            <button
              className="m-1 p-2 border border-gray-400 text-lg outline-black text-blue-700 hover:text-blue-900 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={closeKanbanBoard}
            >
              Close Kanban Board
            </button>
          </div>
        ) : null}
      </div>

      <div className="text-center p-0">
        <div className="text-left mb-1 ml-2 border-b border-gray-300">
          <button
            className="text-white px-0 sm:px-8 py-0 sm:py-2 bg-sky-700 hover:bg-sky-800"
            onClick={handleSortByClick}
          >
            Sort By Make
          </button>{" "}
          <button
            className="text-white px-0 sm:px-8 py-1 sm:py-2 bg-sky-700 hover:bg-sky-800"
            onClick={handleSortByClick}
          >
            Sort By Model
          </button>{" "}
          <button
            className="text-white px-0 sm:px-8 py-1 sm:py-2 bg-sky-700 hover:bg-sky-800"
            onClick={handleSortByPriceRange}
          >
            Sort By Price
          </button>{" "}
          <button
            className="text-white px-0 sm:px-8 py-1 sm:py-2 bg-sky-700 hover:bg-sky-800"
            onClick={handleSortByClick}
          >
            Sort By Year
          </button>
        </div>
      </div>

      <table
        {...getTableProps()}
        className="w-full border-collapse border border-slate-300  bg-linen m-0 align-left min-w-full divide-y divide-x divide-gray-300"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-cadetblue">
              {headerGroup.headers.map((column) => (
                <th
                  className="px-12 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? "🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                {...row.getRowProps()}
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900"
                  >
                    {cell.column.Header === "Images" ? (
                      <img
                        src={cell.value}
                        alt="Vehicle"
                        className="w-32 cursor-pointer flex justify-center mx-auto"
                        onClick={() => openModal(row.original)}
                      />
                    ) : cell.column.Header === "IsFavorite" ? (
                      isVehicleDisabled(row.original) ? (
                        "Disabled"
                      ) : (
                        <button
                          //   className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          className="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-red-500 rounded-full focus:shadow-outline hover:bg-indigo-800"
                          onClick={() => addToFavorites(row.original)}
                        >
                          {/* <span> Add to Favorite</span> */}
                          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      )
                    ) : cell.column.Header === "Status" ? (
                        <span className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-2 bg-${getStatusCellStyle(cell.value).dotColor}`}
                        ></div>
                        <span className={`text-${getStatusCellStyle(cell.value).textColor}`}>
                          {cell.value}
                        </span>
                      </span>
                    ) : cell.column.Header === "Actions" ? (
                      <button onClick={() => deleteVehicle(row.original)}>
                        <FaTrash />
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

      <VehicleModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        data={selectedVehicle}
      />
      <h1 className="text-current text-left text-2xl px-2 text-xl font-semibold mb-4 p-4 shadow-lg rounded-lg mt-5">
        Favorites List
      </h1>
      <FavoriteList
        columnList={favoriteListColumns}
        favoriteList={favoriteList}
        updateFavoriteList={setFavoriteList}
      />
      <br />
      <div></div>
      <br />

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()}>{">"}</button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            className="border-10 border-red-200 border-2 border-blue-300 p-0 w-full rounded-md focus:outline-none focus:border-blue-500"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 7, 10].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VechileList;
