import axios from "axios";
import resposeImg from "../assets/response.png";
import icon from "../assets/jsonIcon.png";
import { useState } from "react";
import { jsonrepair } from "jsonrepair";

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

  const handleRepair = () => {
    console.log("in repair");
    try {
      const repairedJson = jsonrepair(formData.body);
      setFormData((prevData) => ({
        ...prevData,
        body: repairedJson,
      }));
      console.log("repaired");
    } catch (error) {
      console.error("Error repairing JSON:", error);
      setFormData((prevData) => ({
        ...prevData,
        body: formData.body,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.url === "") {
      setData([]);
    } else {
      try {
        let response;
        if (formData.request === "get") {
          response = await axios.get(formData.url);
        } else if (formData.request === "post") {
          response = await axios.post(formData.url, JSON.parse(formData.body));
          console.log(response);
        } else if (formData.request === "delete") {
          response = await axios.delete(formData.url);
          console.log(response);
        } else if (formData.request === "put") {
          response = await axios.put(formData.url, JSON.parse(formData.body));
          console.log(response);
        } else if (formData.request === "patch") {
          response = await axios.patch(formData.url, JSON.parse(formData.body));
          console.log(response);
        }
        setData(response.data);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    }
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
      <div className="validClass">
        <img
          src={icon}
          id="jsonIcon"
          alt="icon"
          onClick={() => handleRepair()}
        />
      </div>
      <div className="response">
        <pre>
          {data.length === 0 ? (
            <div className="emptyResponse">
              <img src={resposeImg} id="responseImg" alt="response" />
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
