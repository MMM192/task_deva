import React, { useEffect, useCallback, useState } from "react";
import { Table, Spin, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchReports } from "../store/dataSlice";
import CardComponent from "../Components/card";
import { MdEdit } from "react-icons/md";

const Table2 = () => {
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const data2 = useSelector((state) => state?.Home?.data?.datalll);
  const loading = useSelector((state) => state.Home?.data?.loading);
console.log("loading",loading);
  const onEdit = async (record) => {
    setSelectedRecord(record);
    setDialog(true);
  };

  const handleCloseModal = () => {
    setDialog(false);
    setSelectedRecord(null);
  };

  const fetchData = useCallback(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns = [
    {
      title: <span className="text-gray-500">Action</span>,
      dataIndex: "action",
      fixed: "left",
      width: 100,
      render: (_, record) => (
        <div className="flex items-center">
          <span
            onClick={() => onEdit(record)}
            className="text-2xl text-[#096CAE] cursor-pointer"
          >
            <MdEdit />
          </span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500">Demo</span>,
      dataIndex: "NAME",
      width: 240,
    },
    {
      title: <span className="text-gray-500">Description</span>,
      dataIndex: "DISCRIPTION",
      width: 240,
    },
    {
      title: <span className="text-gray-500">Age</span>,
      dataIndex: "AGE",
      width: 100,
      render: (age) => (age ? `${age} years` : "N/A"),
    },
  ];

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center h-60 items-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={data2?.map((item) => ({ key: item._id, ...item }))}
          bordered
          scroll={{ x: 1300 }}
        />
      )}

      <Modal
        // title={<div className="flex items-center gap-2 text-[#096CAE]">Edit Demo</div>}
        open={dialog}
        footer={null}
        style={{ top: "10%" }}
        onCancel={handleCloseModal}
      >
        <CardComponent user={selectedRecord} />
      </Modal>
    </>
  );
};

export default Table2;