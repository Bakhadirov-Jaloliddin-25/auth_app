import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/api/products";
import { IProduct } from "../../types";
import { DataType } from "./types";

const useProductsHook = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const data: DataType[] =
    products?.map((product: IProduct) => ({
      ...product,
      rate: product.rating.rate,
      rateCount: product.rating.count,
      key: product.id,
    })) || [];
  return { data, isLoading, deleteProduct };
};

export default useProductsHook;
