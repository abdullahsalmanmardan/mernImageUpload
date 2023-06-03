import React from "react";
import { useState } from "react";
const App = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    image: "",
  });

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // todo is se hum us object ma us key ke against value store kar rhy ha
    setUser({ ...user, [name]: value });
  };

  const fileUpload = (e) => {
    console.log(e.target.files[0]);
    setUser({ ...user, image: e.target.files[0] });
    console.log(user);
  };

  const sendDataToBackend = async (e) => {
    //todo is se form reload ni hoga
    e.preventDefault();

    const { name, email, phone, password, image } = user;

    try {
      //todo yaha pe hum ne data send kiya ha
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          image,
        }),
      });
      //todo yaha pe humin server se response aaa gaya ha
      const data = await res.json();

      if (res.status === 422 || !data) {
        window.alert("Registration failed");
      } else {
        window.alert("Registration succesfull");
      }
    } catch (e) {
      console.log("some error i am from catch block" + e);
    }
  };

  return (
    <div className="pl-24 py-32">
      <h1 className="font-extrabold text-4xl ">Registration From</h1>

      <div className="flex-col justify-center pl-24 w-3/4 bg-[#C66639]">
        <div className="my-2 mx-2 py-3 flex ">
          <label className="my-1 font-extrabold text-4xl px-3 mx-2">
            UserName
          </label>

          <input
            name="name"
            type="text"
            className="w-full font-bold text-4xl"
            value={user.name}
            onChange={handleInputs}
          />
        </div>
        <div className="my-2 mx-2 py-3 flex">
          <label className="my-1 font-extrabold text-4xl px-3">Email</label>
          <input
            name="email"
            type="text"
            className="w-full font-bold text-4xl"
            value={user.email}
            onChange={handleInputs}
          />
        </div>
        <div className="my-2 mx-2 flex">
          <label className="my-1 font-extrabold text-4xl px-3">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full font-bold text-4xl"
            value={user.phone}
            onChange={handleInputs}
          />
        </div>
        <div className="my-2 mx-2 flex">
          <label className="my-1 font-extrabold text-4xl px-3">Password</label>
          <input
            type="text"
            name="password"
            className="w-full font-bold text-4xl"
            value={user.password}
            onChange={handleInputs}
          />
        </div>
        <div className="my-2 mx-2 flex">
          <label className="my-1 font-extrabold text-4xl px-3">Image</label>
          {/* todo is ma hum ne value ni deni  */}
          <input
            type="file"
            name="myfile"
            className="w-full text-4xl font-bold"
            onChange={fileUpload}
          />
        </div>
        <div className="px-3 py-4">
          <button
            onClick={sendDataToBackend}
            className="bg-green-500 font-extrabold text-3xl rounded-2xl px-3 py-3"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
