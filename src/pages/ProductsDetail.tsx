import { useSearchParams } from "react-router-dom";
import {
  useCreateProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../redux/api/products";
import { useState, useEffect } from "react";

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("update");
  const id = Number(productId);
  const { data: product, isLoading } = useGetSingleProductQuery(id, {
    skip: isNaN(id),
  });

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const [addProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (productId && product) {
      setTitle(product.title);
      setPrice(product.price.toString());
    } else {
      setTitle("");
      setPrice("");
    }
  }, [productId, product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title,
      price: parseFloat(price),
    };

    try {
      if (productId) {
        await updateProduct({ id: productId, ...data });
        alert("Product updated!");
      } else {
        await addProduct(data);
        alert("Product added!");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  if (productId && isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">
        {productId ? "Edit Product" : "Add Product"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {productId ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default ProductDetail;
