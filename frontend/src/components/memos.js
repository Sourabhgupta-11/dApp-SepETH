import React, { useEffect, useState } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    const fetchMemos = async () => {
      if (!state?.contract) return;

      try {
        const memosFromChain = await state.contract.getMemos();
        setMemos(memosFromChain);
      } catch (err) {
        console.error("Error fetching memos:", err);
      }
    };

    fetchMemos();
  }, [state]);

  return (
    <div className="container mt-5">
      <h4 className="text-center mb-4">☕ Chai Memos</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Message</th>
              <th>From</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {memos.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No memos yet
                </td>
              </tr>
            ) : (
              memos.map((memo, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{memo.name}</td>
                  <td>{memo.message}</td>
                  <td>
                    <code>
                      {memo.from.slice(0, 6)}...{memo.from.slice(-4)}
                    </code>
                  </td>
                  <td>
                    {new Date(
                      Number(memo.timestamp) * 1000
                    ).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Memos;
