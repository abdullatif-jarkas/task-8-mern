import "./AddProduct.css";
import BackButton from "../../../components/BackButton/BackButton";
import Title from "../../../components/Title/Title";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddProduct = () => {
  const [TheName, setTheName] = useState<string>("");
  const [Price, setPrice] = useState<string>("");
  const [Image, setImage] = useState<File | undefined>(undefined);
  const [message, setMessage] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const navigate = useNavigate();

  const send = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!TheName || !Price || !Image) {
      setMessage("Please fill in all the required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", TheName);
    formData.append("price", Price);
    if (Image) {
      formData.append("image", Image);
    }

    axios
      .post("https://test1.focal-x.com/api/items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMessage("Product created successfully!");
        console.log("Response:", res.data);
        setTimeout(() => {
          navigate("/products");
        }, 1000);
      })
      .catch((error) => {
        setMessage("Error creating product");
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div className="add-product">
      <BackButton />
      <Title title="ADD NEW ITEM" />
      <form onSubmit={(event) => send(event)}>
        <div className="main-fields">
          <div className="col text-fields">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter the product name"
                onChange={(event) => setTheName(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                placeholder="Enter the product price"
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
          </div>
          <div className="col img-col">
            <label htmlFor="image">Image</label>
            <div className="image-input-container">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="product"
                  width="208px"
                />
              ) : (
                <img
                  src="/images/default-image.png"
                  alt="product"
                  width="208px"
                />
              )}
              <input type="file" onChange={handleImageChange} />
            </div>
          </div>
        </div>
        {message && <p style={{ color: "green" }}>{message}</p>}
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default AddProduct;
