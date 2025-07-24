import React from "react";
import { Button, message, Popconfirm, Table } from "antd";
import type { TableColumnsType } from "antd";
import Title from "antd/es/typography/Title";
import { useDeleteUserMutation, useGetUsersQuery } from "../redux/api/users";
import { IUser } from "../types";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

interface DataType {
  key: React.Key;
  id: number;
  email: string;
  username: string;
  phone: string;
  firstname: string;
  lastname: string;
  city: string;
  street: string;
  number: number;
  zipcode: string;
  latitude: string;
  longitude: string;
}

const Users: React.FC = () => {
  const { data: users, isLoading } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();

  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      fixed: "left",
      width: 70,
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      width: 200,
    },
    {
      title: "Username",
      dataIndex: "username",
      align: "center",
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      align: "center",
      width: 150,
    },
    {
      title: "Name",
      align: "center",
      children: [
        {
          title: "First name",
          dataIndex: "firstname",
          key: "firstName",
          align: "center",
          width: 150,
        },
        {
          title: "Last name",
          dataIndex: "lastname",
          key: "lastName",
          align: "center",
          width: 150,
        },
      ],
    },
    {
      title: "Address",
      align: "center",
      children: [
        {
          title: "City",
          dataIndex: "city",
          align: "center",
          width: 150,
        },
        {
          title: "Street",
          dataIndex: "street",
          align: "center",
          width: 150,
        },
        {
          title: "Number",
          dataIndex: "number",
          key: "number",
          align: "center",
          width: 100,
        },
        {
          title: "Zip code",
          dataIndex: "zipcode",
          key: "zipCode",
          align: "center",
          width: 120,
        },
        {
          title: "Geolocation",
          align: "center",
          children: [
            {
              title: "Latitude",
              dataIndex: "latitude",
              key: "latitude",
              align: "center",
              width: 150,
            },
            {
              title: "Longitude",
              dataIndex: "longitude",
              key: "longitude",
              align: "center",
              width: 150,
            },
          ],
        },
      ],
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: "center",
      fixed: "right",
      width: 160,
      render: (_: any, record: any) => (
        <div className="flex gap-2 justify-center">
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            <EditOutlined />
          </button>
          <Popconfirm
            title="Are you sure to delete this user?"
            okText="Yes"
            cancelText="No"
            onConfirm={async () => {
              try {
                await deleteUser(record.id);
                message.success("Deleted!");
              } catch (err) {
                console.error(err);
                message.error("Error");
              }
            }}
            onCancel={() => {
              message.info("Cancelled");
            }}
          >
            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const data: DataType[] =
    users?.map((user: IUser) => ({
      key: user.id,
      id: user.id,
      email: user.email,
      username: user.username,
      phone: user.phone,
      firstname: user.name.firstname,
      lastname: user.name.lastname,
      city: user.address.city,
      street: user.address.street,
      number: user.address.number,
      zipcode: user.address.zipcode,
      latitude: user.address.geolocation.lat,
      longitude: user.address.geolocation.long,
    })) || [];

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <Title level={3}>Users</Title>
        <Button>
          <UserAddOutlined /> Add
        </Button>
      </div>
      <div className="overflow-auto">
        <Table<DataType>
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={data}
          size="middle"
          scroll={{ x: 1500, y: 600 }}
        />
      </div>
    </div>
  );
};

export default Users;
