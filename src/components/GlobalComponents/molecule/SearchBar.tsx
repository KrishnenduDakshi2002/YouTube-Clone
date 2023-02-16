import { useState, useRef } from "react";
import { VscHistory } from "react-icons/vsc";
import HISTORY from "../../../data/search_history.json";
import { AiOutlineSearch } from "react-icons/ai";
const SearchBar = () => {
  const [ToggleSearchHistory, setToggleSearchHistory] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    <div className="rounded-3xl w-full h-[75%] flex justify-center items-center">
      <div className="h-full w-[90%] relative">
        <input
          onFocus={() => setToggleSearchHistory(true)}
          // setting timeout before state change so Search history can be selected before closing
          onBlur={() => setTimeout(()=>setToggleSearchHistory(false),100)}
          type={"text"}
          onInput={(e) => {
            const value = (e.target as HTMLInputElement).value;
            setSearchText(value);
          }}
          placeholder="Search"
          value={searchText}
          className="bg-inherit w-full h-full rounded-l-3xl outline-none px-5 text-white border-[0.5px] border-gray-700 focus:border-[1px] focus:border-blue-600"
        />
        <div
          className={`${
            ToggleSearchHistory ? "block" : "hidden"
          } bg-white absolute top-12 max-h-[350px] rounded-2xl py-3 min-w-[430px] w-full`}
        >
          <SearchHistory
            setSearchHistory={(value: string) => {
              setSearchText(value);
            }}
          />
        </div>
      </div>
      <div className="px-4 w-16 h-full rounded-r-3xl flex items-center justify-center bg-[#222222] border-[1px] border-gray-600">
        <AiOutlineSearch size={25} color="white" />
      </div>
    </div>
  );
};

const SearchHistory = ({
  setSearchHistory,
}: {
  setSearchHistory: (value: string) => void;
}) => {
  return (
    <ul>
      {HISTORY.map((history, id) => (
        <li key={id} onClick={() => {setSearchHistory(history.history); console.log(history.history)}}>
          <div className=" py-[0.3rem] w-full grid grid-cols-[50px_70%_1fr] hover:bg-gray-200 cursor-pointer">
            <div className="">
              <VscHistory size={20} className="mx-[1rem]" />
            </div>
            <p className="font-bold truncate">
              {history.history}
            </p>
            <p className="text-blue-500 cursor-pointer w-[20%]">
              Remove
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchBar;
