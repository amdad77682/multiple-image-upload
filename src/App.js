import "./App.css";
import UploadImage from "./components/UploadImage";

function App() {
  return (
    <div
      style={{
        margin: "auto",
        height: "800px",
        width: "800px",
        padding: "10px",
      }}
    >
      <UploadImage />
    </div>
  );
}

export default App;
