import "./App.css";
import UploadImage from "./components/UploadImage";

function App() {
  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        margin: "100px",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <UploadImage />
    </div>
  );
}

export default App;
