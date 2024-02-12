import axios from "axios";
import resposeImg from "../assets/response.png";
import { useState } from "react";

const FetchMate = () => {
  const [formData, setFormData] = useState({
    request: "get",
    url: "",
    body: "",
  });
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.url === "") {
      setData("");
    } else if (formData.request === "get") {
      try {
        const response = await axios.get(formData.url);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    } else if (formData.request === "post") {
      try {
        const response = await axios.post(formData.url, formData.body);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(formData.body);
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
              onChange={handleChange}
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
          value={formData.body}
          onChange={handleChange}
          name="body"
          placeholder="Enter Body in JSON format POST request only"
          id=""
          rows="10"
        ></textarea>
      </div>
      <div className="response">
        <pre>
          {data.length === 0 ? (
            <div className="emptyResponse">
              <img src={resposeImg} id="responseImg" />
            </div>
          ) : (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </pre>
      </div>
    </div>
  );
};

export default FetchMate;
