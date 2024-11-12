import { useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton/BackButton";
import ItemDetail from "../../../components/ItemDetail/ItemDetail";
import Title from "../../../components/Title/Title";
import "./ShowProduct.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";

interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const ShowProduct = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const params = useParams();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    axios
      .get(`https://test1.focal-x.com/api/items/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProduct(res.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching product: ", error);
        setError("Error fetching product details.");
      });
  }, [params.id]);

  // In order to change history
  const formatData = (dataString: string) => {
    const date = new Date(dataString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth()).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="show-product">
      <BackButton />
      {
        product?
        <>
          <Title title={product.name} />
          <div className="img-container">
            <img src={product.image_url} alt={product.name} />
          </div>
          <div className="item-data">
            <div className="item-data-container">
              <ItemDetail title="Price:" text={`${product.price}$`} />
              <ItemDetail title="Added at:" text={formatData(product.created_at)} />
            </div>
            <div className="item-data-container">
              <ItemDetail title="updated at:" text={formatData(product.updated_at)} />
            </div>
          </div>
        </>: <Loader />
      }
    </div>
  );
};

export default ShowProduct;
