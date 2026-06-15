import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const navigate= useNavigate();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const API = "https://api.udita.me";

  const uploadFile = async () => {
    if (!selectedFile) {
      setError("Please select a file");
      return;
    } else {
      try {
        setLoading(true);
        setError("");
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await axios.post(`${API}/ai/scan`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const data = response.data;
        setAmount(data.amount || "");
        setCategory(data.category || "");
        setDate(data.date || "");
        setDescription(data.description || "");
        setShowForm(true)
      } catch (error) {
        setError("Failed to upload image");
      } finally {
        setLoading(false);
      }
    }
  };
  const saveExpense = async () => {
    try {
      await axios.post(`${API}/expenses`, {
        amount,
        category,
        expense_date:date,
        description,
      });
      setShowForm(false)
      alert("Expense saved successfully");
      navigate('/expenses')
    } catch (error) {
      alert("Failed to save expense");
      console.log(error)
    }
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(typeof file);
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };return (
  <div className="min-h-screen bg-slate-100 py-10 px-4">
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Add Expense
        </h1>
        <p className="text-slate-500 mt-2">
          Upload a receipt and let AI extract expense details automatically.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

       
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-xl font-semibold mb-5">
            Upload Receipt
          </h2>

          <label className="border-2 border-dashed border-violet-300 rounded-2xl h-72 flex flex-col justify-center items-center cursor-pointer hover:bg-violet-50 transition">

            <div className="text-5xl mb-4">
              📄
            </div>

            <p className="font-semibold text-lg">
              Click to Upload
            </p>

            <p className="text-gray-500 text-sm mt-2">
              JPG, PNG, WEBP Supported
            </p>

            <input
              type="file"
              onChange={onFileChange}
              className="hidden"
            />
          </label>

          {preview && (
            <div className="mt-6">
              <img
                src={preview}
                alt="Receipt Preview"
                className="w-full h-72 object-cover rounded-xl border"
              />
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-100 text-red-600 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={uploadFile}
            disabled={loading}
            className="w-full mt-6 bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-xl font-semibold transition"
          >
            {loading ? "Analyzing Receipt..." : "Detect With AI"}
          </button>
        </div>

        
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              AI Extracted Details
            </h2>

            {showForm && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                AI Parsed
              </span>
            )}
          </div>

          {!showForm ? (
            <div className="h-125 flex flex-col items-center justify-center text-center">

              <div className="text-6xl mb-4">
                🤖
              </div>

              <h3 className="text-xl font-semibold text-slate-700">
                Waiting for Receipt
              </h3>

              <p className="text-slate-500 mt-2">
                Upload a receipt and click Detect With AI.
              </p>

            </div>
          ) : (
            <div className="space-y-5">

              <div>
                <label className="block mb-2 font-medium">
                  Amount
                </label>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Health">Health</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <button
                onClick={saveExpense}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition"
              >
                Save Expense
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default AddExpense;
