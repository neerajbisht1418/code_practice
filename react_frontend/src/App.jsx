import "./App.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import persistStore from "redux-persist/es/persistStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllRoutes from "./components/routes/AllRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  const persisted = persistStore(store);
  const clientId =
    "566791707357-313huo648nc02hc6cfl0ha07cco4kole.apps.googleusercontent.com";
  return (
      <Provider store={store}>
        <PersistGate persistor={persisted}>
          <ToastContainer />
          <BrowserRouter>
            <AllRoutes />
          </BrowserRouter>
        </PersistGate>
      </Provider>
  );
}

export default App;
