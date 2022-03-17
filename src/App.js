import productApi from "api/productApi";
import { useEffect } from "react";
import Header from "./components/Header";

function App() {

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await productApi.getAll();
        console.log(product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const params = { _limit: 10, };  // yêu cầu chỉ lấy ra 10 record
  //     const productList = await productApi.getAll(params);
  //     console.log(productList);
  //   };
  //   fetchProducts();
  // }, []);


  return (

    <div className="App">
      <Header />
    </div>
  );
}

export default App;
