import { useState, useEffect } from "react";
import "./Memos.css"
const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;
  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos)
    }
    contract && memosMessage()
  }, [contract])
  return (
    <div className="container-fluid">
      <h4 style={{ textAlign: "center", marginTop: "20px", marginBottom: "1px" }}>TIMELINE</h4>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{
              backgroundColor: "dodgerblue",
              color: "white",
              border: "1px solid white",
              padding: "10px",
            }}>Name</th>
            <th style={{
              backgroundColor: "dodgerblue",
              color: "white",
              border: "1px solid white",
              padding: "10px",
            }}>Timestamp</th>
            <th style={{
              backgroundColor: "dodgerblue",
              color: "white",
              border: "1px solid white",
              padding: "10px",
            }}>Message</th>
            <th style={{
              backgroundColor: "dodgerblue",
              color: "white",
              border: "1px solid white",
              padding: "10px",
            }}>From</th>
          </tr>
        </thead>
        <tbody>
          {memos.map((memo, index) => (
            <tr key={index} style={index % 2 === 0 ? { backgroundColor: "#f2f2f2", } : { backgroundColor: "white", }}>
              <td style={{
                border: "1px solid white",
                padding: "10px",
              }}>{memo.name}</td>
              <td style={{
                border: "1px solid white",
                padding: "10px",
              }}>{new Date(memo.timestamp * 1000).toLocaleString()}</td>
              <td style={{
                border: "1px solid white",
                padding: "10px",
              }}>{memo.message}</td>
              <td style={{
                border: "1px solid white",
                padding: "10px",
              }}>{memo.from}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Memos;