import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);
  const [loading, setloading] = useState(false);

  const fetchData = async (start) => {
    const res = await fetch(
      ` http://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=10`
    );
    const datas = await res.json();
    setData(d => [...d, ...datas]);
    setloading(true);
  };

  useEffect(() => {
    fetchData(start);
  }, [start]);

  const bottomRef = useRef();

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if(entries[0].isIntersecting) {
            setStart(prevStart => prevStart+10)
          }
        },
        { threshold: 1 }
      );
      observer.observe(bottomRef.current);
    }
  }, [loading]);

  return (
    <div className="App">
      {data.length > 0 &&
        data.map((data, index) => (
          <div key={index} className="container">
            <p>
              <strong>{data.id}</strong>
            </p>
            <h4>{data.title}</h4>
            <p>{data.body}</p>
          </div>
        ))}
      <button ref={bottomRef}> Load More</button>
    </div>
  );
}

export default App;
