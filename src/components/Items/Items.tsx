import { Link, useNavigate } from "react-router-dom";
import "./Items.css";
import { useState } from "react";
import Popup from "../Popup/Popup";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const Items = ({ data }: { data: Product[] }) => {
  const [Products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productPerPage, setProductPerPage] = useState<number>(8); // control products per page
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [productIdToDelete, setpProductIdToDelete] = useState<number | null>(
    null
  );
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  //* Show Function
  const showProduct = (id: number) => {
    navigate(`/products/${id}`);
  };

  //! Delete Functions
  const handleConfirmDelete = async () => {
    if (productIdToDelete) {
      try {
        await axios.delete(
          `https://test1.focal-x.com/api/items/${productIdToDelete}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productIdToDelete)
        );
        setMessage("Product deleted successfully.");
        setTimeout(() => {
          setShowPopup(false);
          setpProductIdToDelete(null);
        }, 2000);
      } catch (error) {
        console.log("Error deleting product:", error);
        setMessage("Error deleting product.");
      }
    }
  };

  const handelCancelDelete = () => {
    setShowPopup(false);
  };

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number
  ) => {
    e.stopPropagation();
    setpProductIdToDelete(productId);
    setShowPopup(true);
  };

  return (
    <>
      {showPopup && <div className="overlay"></div>}
      <div className="products-items">
        {data.slice(0, 8).map((item, index) => (
          <div
            key={index}
            className="card"
            onClick={() => showProduct(item.id)}
          >
            <img
              src={item.image_url}
              alt={item.name}
              onError={(e) => {
                e.currentTarget.src = "/images/default-image.png";
              }}
            />
            <div className="item-hover-container">
              <h3 className="product-name">{item.name}</h3>
              <div className="item-buttons">
                <Link
                  to={`/products/edit/${item.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <button type="submit" className="btn edit-btn">
                    Edit
                  </button>
                </Link>
                <button
                  type="button"
                  className="btn delete-btn"
                  onClick={(e) => handleDeleteClick(e, item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <>
          <Popup message="ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?">
            <button
              type="button"
              className="confirm"
              onClick={() => handleConfirmDelete()}
            >
              Yes
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => handelCancelDelete()}
            >
              No
            </button>
          </Popup>
          {message && <p style={{ color: "red" }}>{message}</p>}
        </>
      )}
    </>
  );
};

export default Items;
