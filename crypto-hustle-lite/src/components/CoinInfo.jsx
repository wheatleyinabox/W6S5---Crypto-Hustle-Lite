import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({image, name, symbol}) => {
    const [price, setPrice] = useState(null);

    useEffect(() => { async function getCoinPrice() {
        const response = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=` +
      API_KEY)

      const json = await response.json()
      setPrice(json);
    }
    getCoinPrice().catch(console.error);

    }, [symbol])
    return(
        
        <li className="main-list" key={symbol}>
            <img
                className="icons"
                src={`https://www.cryptocompare.com${image}`}
                alt={`Small icon for ${name} crypto coin`}
            />
            {name}
            {price && price.USD ? ` $${price.USD} USD` : null}
        </li>
    )

    
} 

export default CoinInfo;