import { useEffect, useState } from "react"
import './quote.css'


const Quote = () => {
    const url = 'https://raw.githubusercontent.com/dmSolymos/quotedb/main/db.json';
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [quote, setQuote]=useState([]);
    const [value, setValue] = useState(0);
    

    function shuffle(arr){
        for(let i=arr.length-1; i>0; i--){
            const j= Math.floor(Math.random()*(i+1));
            [arr[i],arr[j]] = [arr[j],arr[i]]; 
        }
    }

    const fetchQuotes = async()=>{
        try {
            const resp = await fetch(url);
            const quote = await resp.json();
            shuffle(quote.quotes)
            setQuote(quote.quotes);
        } catch (error) {
            setIsError(true)
            console.log(error);
        }
        setIsLoading(false);
        
    }

    function NextQuote(){
        if(value===quote.length-1){
            setValue(0)
        }
        else setValue(value+1)
        
    }
    function PrevQuote(){
        if(value==0){
            return
        }
        setValue(value-1);
        
    }

    
    useEffect(() => {
      fetchQuotes();
      }, [])

    if(isLoading){
        return (<h2>Loading...</h2>)
    }
    if(isError){
        return (<h2>There was an error...</h2>)
    }
    

  return (
    <div className="quote-container">
    <div className="quote">
        <h4>{quote[value].author}</h4>
        <p>{quote[value].quote}</p>
    </div>
    <div className="buttons">
        <button onClick={PrevQuote}>Prev</button>
        <button onClick={NextQuote}>Next</button>
    </div>
    </div>
  )
}
export default Quote