import Navigation from "./src/navigation/Navigation.jsx";
import { Provider } from "react-redux";
import store from "./src/app/configStore";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
