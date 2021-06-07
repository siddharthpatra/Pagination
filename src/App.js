import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);
  const [loading, setloading] = useState(false);

  function fetchData(start) {
    fetch(
      ` http://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=10`
    )
      .then((res) => res.json())
      .then((datas) => {
        setData((d) => [...d, ...datas]); // Adding the previous data and new data after fetch
        setloading(true);
      });
  }

  useEffect(() => {
    fetchData(start);
  }, [start]);

  const bottomRef = useRef();

  useEffect(() => {
    if (loading) {
      // Observer to view the intersecting area
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Set the start to the next 10 elements when ever we reach the bottom of the page
            setStart((prevStart) => prevStart + 10);
          }
        },
        { threshold: 1 }
      );
      // Observing the scroll Area
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
