import SearchBar from "../../components/SearchBar/SearchBar";
import "./Products.css";
import AddButton from "../../components/AddButton/AddButton";
import Items from "../../components/Items/Items";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const Products = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //* search
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [query, setQuery] = useState("");

  //* pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(0);

  const navigate = useNavigate();

  //* Get items from api
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    axios
      .get("https://test1.focal-x.com/api/items", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setItems(res.data);
        setSearchResults(res.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching products: ", error);
        setError("Error fetching product details.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  //* Update items per page based on screen width
  useEffect(() => {
    const updateItemsPerPage = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1670) return 10;
      if (screenWidth >= 1440) return 8;
      if (screenWidth >= 1200) return 6;
      if (screenWidth >= 768) return 4;
      return 2;
    };

    setItemsPerPage(updateItemsPerPage());
    const handleResize = () => setItemsPerPage(updateItemsPerPage());

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const results = query
      ? items.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      : items;
    setSearchResults(results);
    setCurrentPage(1);
  }, [query, items]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginationButtons = () => {
    const totalPages = Math.ceil(searchResults.length / itemsPerPage);
    const buttons = [];

    for (let i = 1; i <= 3 && i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    if (currentPage > 4) buttons.push(<span key="ellipsis-before">...</span>);
    if (currentPage > 3 && currentPage < totalPages - 2) {
      buttons.push(
        <button key={currentPage - 1} onClick={() => paginate(currentPage - 1)}>
          {currentPage - 1}
        </button>
      );
      buttons.push(
        <button
          key={currentPage}
          onClick={() => paginate(currentPage)}
          className="active"
        >
          {currentPage}
        </button>
      );
      buttons.push(
        <button key={currentPage + 1} onClick={() => paginate(currentPage + 1)}>
          {currentPage + 1}
        </button>
      );
    }
    if (currentPage < totalPages - 3)
      buttons.push(<span key="ellipsis-after">...</span>);
    for (let i = totalPages - 1; i <= totalPages; i++) {
      if (i > 3) {
        buttons.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={i === currentPage ? "active" : ""}
          >
            {i}
          </button>
        );
      }
    }
    return buttons;
  };

  const nextPage = (): void => {
    if (currentPage < Math.ceil(searchResults.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="products-page">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchBar query={query} onChange={setQuery} />
          <AddButton />
          <Items data={currentItems} />
          <div className="pagination">
            {searchResults.length > itemsPerPage && (
              <>
                <button onClick={prevPage} disabled={currentPage === 1}>
                  <img src="/images/arrow-left.svg" alt="arrow left" />
                </button>
                {paginationButtons()}
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(searchResults.length / itemsPerPage)
                  }
                >
                  <img src="/images/arrow-right.svg" alt="arrow left" />
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
