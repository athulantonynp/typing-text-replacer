import { useEffect } from "react";
import DataTable from "./components/table";
import { sendDataToChrome } from "./services/extension_service";

function App() {
  useEffect(() => {
    console.log("Extension is loaded");
    document.addEventListener("DOMContentLoaded", function () {
      console.log("Extension fires DOMContentLoaded");
      sendDataToChrome();
    });
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Typing Text Replacer v1</h1>
      <h3 className="pt-2">Add/Modify your key & values below</h3>
      <DataTable />
    </div>
  );
}

export default App;
