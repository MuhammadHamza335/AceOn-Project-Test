import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { archiveCall, getData, getPaginationData } from "../../Api/ApiCalls";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Title from "../General/Title";
import Pagination from "../General/Pagination";
import Detail from "./Detail";

const TableData = () => {
  const [callsData, setCallsData] = useState([]);
  const [callsDataFiltered, setCallsDataFiltered] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);
  const [curRow, setCurRow] = useState({});
  const [reloadRes, setReloadRes] = useState(false);
  const [filter, setFilter] = useState("all");
  const [archiveData, setArchiveData] = useState({});

  const setFilterData = (filterValue: string) => {
    if (filterValue === "all") {
      setCallsDataFiltered(callsData);
    } else if (filterValue === "archived") {
      setCallsDataFiltered(
        callsData.filter((item: any) => item.is_archived === true)
      );
    } else if (filterValue === "unarchived") {
      setCallsDataFiltered(
        callsData.filter((item: any) => item.is_archived === false)
      );
    }
  };

  useEffect(() => {
    const retreiveData = async () => {
      let res = await getData();
      setCallsData(res?.data?.nodes);
      setCallsDataFiltered(res?.data.nodes);
      setOffset(0);
    };
    retreiveData();
  }, [reloadRes, archiveData]);

  const columns = [
    {
      dataField: "call_type",
      text: "CALL TYPE",
      formatter: (cell: any, row: any) => {
        return (
          <span
            className={
              row.call_type === "voicemail"
                ? "voicemail"
                : row.call_type === "answered"
                ? "answered"
                : "missed"
            }
          >
            {row.call_type}
          </span>
        );
      },
    },
    {
      dataField: "direction",
      text: "DIRECTION",
      formatter: (cell: any, row: any) => {
        return <span className="voicemail">{row.direction}</span>;
      },
    },
    {
      dataField: "duration",
      text: "DURATION",
    },
    {
      dataField: "from",
      text: "FROM",
    },
    {
      dataField: "to",
      text: "TO",
    },
    {
      dataField: "via",
      text: "VIA",
    },
    {
      dataField: "created_at",
      text: "CREATED AT",
      sort: true,
    },
    {
      dataField: "is_archived",
      text: "STATUS",
      formatter: (cell: any, row: any) => {
        return (
          <span
            className={`status ${row.is_archived ? "Archived" : "Unarchive"}`}
          >
            {row.is_archived ? "Archived" : "Unarchive"}
          </span>
        );
      },
    },
    {
      dataField: "",
      text: "ACTIONS",
      headerAlign: "center",
      formatter: (cell: any, row: any) => {
        return (
          <div className="actions-column">
            <button
              className="btn btn-note mb-2"
              onClick={() => {
                setModalStatus(true);
                setCurRow(row);
              }}
            >
              Add Note
            </button>
            <button
              className="btn btn-note"
              onClick={async () => {
                setFilter("all");
                const res = await archiveCall(row.id);
                setArchiveData(res?.data);
              }}
            >
              {row.is_archived ? "UnArchive" : "Archive"}
            </button>
          </div>
        );
      },
    },
  ];

  const paginationCall = async (offset: number) => {
    const res = await getPaginationData(offset);
    setCallsData(res?.data.nodes);
    setFilter("all");
    setCallsDataFiltered(res?.data.nodes);
    setOffset(offset);
    setHasNext(res?.data.hasNextPage);
  };

  return (
    <div className="table-wrapper">
      <div className="heading">
        <Title text="Frontend Test" />
        <div>
          <label htmlFor="filter">Filter by: </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setFilterData(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="archived">Archived</option>
            <option value="unarchived">Unarchived</option>
          </select>
        </div>
      </div>
      <BootstrapTable
        keyField="id"
        data={callsDataFiltered}
        columns={columns}
        wrapperClasses="table-responsive"
      />
      <Pagination
        offset={offset}
        hasNext={hasNext}
        onPrevClick={() => paginationCall(offset - 10)}
        onNextClick={() => paginationCall(offset + 10)}
      />

      {modalStatus ? (
        <div className="backdrop">
          <Detail
            rowData={curRow}
            setReloadRes={setReloadRes}
            closeModal={() => {
              setModalStatus(false);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TableData;
