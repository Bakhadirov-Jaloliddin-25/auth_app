import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../redux/api/products";
import { IProduct } from "../types";
import React from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import Title from "antd/es/typography/Title";
import {
  EditOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Popconfirm, message } from "antd";

interface DataType {
  key: React.Key;
}
const Products = () => {
  const [deleteProduct] = useDeleteProductMutation();

  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (img: string) => (
        <img
          src={img}
          alt="product"
          className="w-[50px] h-[50px] object-contain"
        />
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
    },
    {
      title: "Rate Count",
      dataIndex: "rateCount",
      width: 110,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-2 py-1 rounded">
            <EditOutlined />
          </button>
          <Popconfirm
            title="Are you sure to delete this product?"
            okText="Yes"
            cancelText="No"
            onConfirm={async () => {
              try {
                await deleteProduct(record.id);
                message.success("Deleted!");
              } catch (error) {
                message.error("Error");
                console.error("Delete error:", error);
              }
            }}
            onCancel={() => {
              message.info("Cancelled");
            }}
          >
            <button className="bg-red-500 text-white px-2 py-1 rounded">
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const { data: products, isLoading } = useGetProductsQuery();
  const data: DataType[] =
    products?.map((product: IProduct) => ({
      ...product,
      rate: product.rating.rate,
      rateCount: product.rating.count,
      key: product.id,
    })) || [];

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between">
          <Title level={3}>Products</Title>
          <Button>
            <AppstoreAddOutlined /> Add
          </Button>
        </div>
        <Table<DataType>
          columns={columns}
          loading={isLoading}
          dataSource={data}
          size="large"
        />
      </div>
    </>
  );
};

export default Products;
