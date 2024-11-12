import axios from "axios";
import BackButton from "../../../components/BackButton/BackButton";
import Title from "../../../components/Title/Title";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProduct.css";

interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
}

const EditProduct = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState<string>("");
  const [price, setprice] = useState<string>("");
  const [image, setimage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>(
    "/images/default-image.png"
  );
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://test1.focal-x.com/api/items/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProduct(res.data);
        setName(res.data.name);
        setprice(res.data.price);
        setImagePreview(res.data.image_url || "/images/default-image.png");
      })
      .catch((error) => {
        console.error("Error fetching product: ", error);
      });
  }, [params.id]);

  const edit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);

    if (image === null) {
      formData.append("image", "");
    } else if (image) {
      formData.append("image", image);
    }

    formData.append("_method", "PUT");
    await axios
      .post(`https://test1.focal-x.com/api/items/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMessage("Product updated successfully!");
        console.log("Response:", res.data);
        navigate("/products");
      })
      .catch((error) => {
        setMessage("Error updating product");
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setimage(file);
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="add-product">
      <BackButton />
      <Title title="EDIT ITEM" />
      <form onSubmit={(event) => edit(event)}>
        <div className="main-fields">
          <div className="col text-fields">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter the product name"
                onChange={(event) => setName(event.target.value)}
                defaultValue={product?.name}
              />
            </div>
            <div className="field">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                placeholder="Enter the product price"
                onChange={(event) => setprice(event.target.value)}
                defaultValue={product?.price}
              />
            </div>
          </div>
          <div className="col img-col">
            <label htmlFor="image">Image</label>
            <div className="image-input-container">
              <input type="file" onChange={handleImageChange} />
              {imagePreview ? <img src={imagePreview} alt="Uploaded" /> : ""}
            </div>
          </div>
        </div>
        {message && <p style={{ color: "green" }}>{message}</p>}
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default EditProduct;
