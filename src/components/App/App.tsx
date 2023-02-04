import React from "react";

import ToastPlayground from "../ToastPlayground";
import Footer from "../Footer";

import ToastContext from "../ToastProvider/ToastProvider";

function App() {
  return (
    <ToastContext>
      <ToastPlayground />
      <Footer />
    </ToastContext>
  );
}

export default App;
