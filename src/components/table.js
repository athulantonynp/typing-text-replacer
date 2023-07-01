import { useEffect, useState } from "react";
import { getDataItems, setNewData } from "../services/text_data_service";
import Button from "./button";
import { sendDataToChrome } from "../services/extension_service";

const DataTable = () => {
  let [data, setData] = useState([]);
  let [save, setSave] = useState(false);

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
    setSave(true);
  }

  function onSave() {
    setNewData(data);
    setData(getDataItems());
    sendDataToChrome();
    setSave(false);
  }

  function onDelete(index) {
    let newData = JSON.parse(JSON.stringify(data));
    if (index > -1) {
      newData.splice(index, 1);
    }
    setData(newData);
    setSave(true);
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
              onDelete={onDelete}
            />
          );
        })}
      </div>
      <div className="flex w-full">
        <Button text={"Add new"} onClick={onAdd} />
        {save ? <Button text={"Save"} onClick={onSave} /> : <></>}
      </div>
    </div>
  );
};

export const DataItem = ({ data, index, onTextChange, onDelete }) => {
  return (
    <div className="pb-4 flex">
      <input
        type="text"
        value={data.key}
        onChange={(e) => onTextChange(e, "k", index)}
        className="mt-1  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
      />
      <p className="px-4 text-center leading-10">{"to"}</p>
      <input
        type="text"
        value={data.value}
        onChange={(e) => onTextChange(e, "v", index)}
        className="mt-1  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
      />
      <div className="cursor-pointer ps-2 mt-1" onClick={() => onDelete(index)}>
        <svg
          class="h-8 w-8 text-pink-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {" "}
          <line x1="18" y1="6" x2="6" y2="18" />{" "}
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    </div>
  );
};

export default DataTable;
