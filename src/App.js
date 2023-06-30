import DataTable from "./components/table";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Typing Text Replacer v1</h1>
      <h3 className="pt-2">Add/Modify your key & values below</h3>
      <DataTable />
    </div>
  );
}

export default App;
