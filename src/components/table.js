import { useEffect, useState } from "react";
import { getDataItems, setNewData } from "../services/text_data_service";
import Button from "./button";
import { sendDataToChrome } from "../services/extension_service";

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
    sendDataToChrome();
  }

  return (
    <div>
      <div className="pt-4 overflow-y-auto w-fit pb-4 max-h-96">
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
      <div className="flex w-full">
        <Button text={"Add new"} onClick={onAdd} />
        <Button text={"Save"} onClick={onSave} />
      </div>
    </div>
  );
};

export const DataItem = ({ data, index, onTextChange }) => {
  return (
    <div className="pb-4 flex gap-4">
      <input
        type="text"
        value={data.key}
        onChange={(e) => onTextChange(e, "k", index)}
        className="mt-1  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
      />

      <input
        type="text"
        value={data.value}
        onChange={(e) => onTextChange(e, "v", index)}
        className="mt-1  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
      />
    </div>
  );
};

export default DataTable;
