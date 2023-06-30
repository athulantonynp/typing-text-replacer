import { useEffect, useState } from "react";
import { getDataItems, setNewData } from "../services/text_data_service";
import Button from "./button";

const DataTable = () => {
  let [data, setData] = useState([]);

  useEffect(() => {
    setData(getDataItems());
  }, []);

  function onAdd() {
    let newData = JSON.parse(JSON.stringify(data));
    newData.push({ key: "", value: "" });
    setData(newData);
  }

  function onTextChange(e, type, index) {
    let newData = JSON.parse(JSON.stringify(data));
    if (type === "k") {
      newData[index].key = e.target.value.toString();
    } else {
      newData[index].value = e.target.value.toString();
    }
    setData(newData);
  }

  function onSave() {
    setNewData(data);
    setData(getDataItems());
  }

  return (
    <div>
      <div className="pt-4">
        {data.map((e, index) => {
          return (
            <DataItem
              key={index}
              data={e}
              index={index}
              onTextChange={onTextChange}
            />
          );
        })}
      </div>
      <div>
        <br />
        <Button text={"Add new"} onClick={onAdd} />
        <Button text={"Save"} onClick={onSave} />
      </div>
    </div>
  );
};

export const DataItem = ({ data, index, onTextChange }) => {
  return (
    <div>
      <input
        type="text"
        value={data.key}
        onChange={(e) => onTextChange(e, "k", index)}
        className="mt-1  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none w-72"
      />

      <input
        type="text"
        value={data.value}
        onChange={(e) => onTextChange(e, "v", index)}
        className="mt-1  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none w-72 ms-2"
      />
    </div>
  );
};

export default DataTable;
