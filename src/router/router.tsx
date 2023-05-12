import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../features";
import { FormStudent } from "../components";
import { useState } from "react";

function Routers() {
  const [show, setShow] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
              show={show}
              setShow={setShow}
            />
          }
        />
        <Route path="/create" element={<FormStudent isUpdate={isUpdate} />} />
        <Route
          path="/update/:id"
          element={<FormStudent isUpdate={!isUpdate} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
