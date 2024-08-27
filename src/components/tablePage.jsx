import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableComponent = () => {
  const [rows, setRows] = useState([]);

  const handleAddRow = () => {
    // Check if all fields in the previous rows are filled
    for (let row of rows) {
      if (!row.type || !row.amount || !row.isTaxable) {
        toast.error("Please fill all fields before adding a new row.");
        return;
      }
    }

    const newRow = {
      id: rows.length + 1,
      type: "",
      amount: "",
      isTaxable: "",
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const getSelectedTypes = () => rows.map((row) => row.type);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Allowance Table</h1>
      <button
        onClick={handleAddRow}
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
      >
        Add Row
      </button>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Allowance Type</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Is Taxable</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const selectedTypes = getSelectedTypes();
            return (
              <tr key={index}>
                <td className="border px-4 py-2 bg-gray-200 rounded-lg">
                  <select
                    value={row.type}
                    onChange={(e) =>
                      setRows(
                        rows.map((r) =>
                          r.id === row.id ? { ...r, type: e.target.value } : r
                        )
                      )
                    }
                    className="border p-1 w-full bg-gray-200 rounded-lg"
                  >
                    <option value="">Select Type</option>
                    <option
                      value="Housing"
                      disabled={
                        selectedTypes.includes("Housing") &&
                        row.type !== "Housing"
                      }
                    >
                      Housing
                    </option>
                    <option
                      value="Transport"
                      disabled={
                        selectedTypes.includes("Transport") &&
                        row.type !== "Transport"
                      }
                    >
                      Transport
                    </option>
                    <option
                      value="Medical"
                      disabled={
                        selectedTypes.includes("Medical") &&
                        row.type !== "Medical"
                      }
                    >
                      Medical
                    </option>
                  </select>
                </td>
                <td className="border px-4 py-2 bg-gray-200 rounded-lg">
                  <input
                    type="number"
                    value={row.amount}
                    onChange={(e) =>
                      setRows(
                        rows.map((r) =>
                          r.id === row.id ? { ...r, amount: e.target.value } : r
                        )
                      )
                    }
                    className="border p-1 w-full bg-gray-200 rounded-lg"
                  />
                </td>
                <td className="border px-4 py-2 bg-gray-200 rounded-lg">
                  <select
                    value={row.isTaxable}
                    onChange={(e) =>
                      setRows(
                        rows.map((r) =>
                          r.id === row.id
                            ? { ...r, isTaxable: e.target.value }
                            : r
                        )
                      )
                    }
                    className="border p-1 w-full bg-gray-200 rounded-lg"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td className="border px-4 py-2 bg-gray-200 rounded-lg">
                  <button
                    onClick={() => handleDeleteRow(row.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default TableComponent;
