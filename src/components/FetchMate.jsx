import axios from "axios";
import resposeImg from "../assets/response.png";
import React, { useEffect, useState } from "react";

const FetchMate = () => {
  const [formData, setFormData] = useState({
    request: "get",
    url: "",
    body: "",
  });
  const [data, setData] = useState([]);
  let jsonText = `{"name" : "Abc" , "age" : 23 }`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.request === "get") {
      try {
        const response = await axios.get(`${formData.url}`);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(formData);
  };

  return (
    <div className="container">
      <div className="parent">
        <form onSubmit={handleSubmit}>
          <div className="urlTab">
            <select
              name="request"
              id="requestType"
              value={formData.request}
              onChange={() => {
                handleChange(event);
              }}
            >
              <option value="get">GET</option>
              <option value="post">POST</option>
              <option value="delete">DELETE</option>
              <option value="put">PUT</option>
              <option value="patch">PATCH</option>
            </select>

            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="Enter url or paste text"
            />
          </div>
          <button>Send</button>
        </form>
      </div>

      <div className="body">
        <textarea
          className="body"
          value={formData.body}
          onChange={handleChange}
          name="body"
          id=""
          rows="10"
        ></textarea>
      </div>
      <div className="response">
        <pre>
          {data.length === 0 ? (
            <img src={resposeImg} id="responseImg" />
          ) : (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </pre>
      </div>
    </div>
  );
};

export default FetchMate;
