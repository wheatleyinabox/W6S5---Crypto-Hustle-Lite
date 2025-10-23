import { useState, useEffect } from "react";
import CoinInfo from "./components/CoinInfo";
import "./App.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {

  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState("")


  useEffect(() => {
    async function fetchAllCoinData() {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/top/totaltoptiervol?limit=10&assetClass=ALL&tsym=usd&api_key=" +
          API_KEY
      );
      const json = await response.json();
      setList(json);
    }
    fetchAllCoinData().catch(console.error);
  }, []);

  const searchItems = searchValue => {
    setSearchInput(searchValue)
    if (searchValue !== "") {
      const filteredData = list.Data.filter((item) => 
        Object.values(item.CoinInfo)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(list.Data)
    }
  }


  return(
    <>
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <ul>
          {list?.Data
            .map(data => data.CoinInfo)
            // .filter(coinData =>
            //   coinData.Algorithm !== "N/A" &&
            //   coinData.ProofType !== "N/A"
            // )
            .map(coinData => (
              <CoinInfo
                image={coinData.ImageUrl}
                name={coinData.FullName}
                symbol={coinData.Name}
              />
            ))}
        </ul>
      </div>
    </>);
}

export default App;
