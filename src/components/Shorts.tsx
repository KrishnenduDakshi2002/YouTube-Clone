import React from "react";
import Popup from "reactjs-popup";

const Shorts = () => {
  return (
    <div className="p-6 bg-white w-full h-full grid xl:grid-cols-[2fr_1fr] 2xl:grid-cols-[2.2fr_1fr] grid-cols-1 gap-x-2 relative -z-0">
      <div className="w-[10rem] h-[5rem] bg-green-300">
        <PopupMenu/>
      </div>
    </div>
  );
};

const PopupMenu=()=><Popup
trigger={<button className="bg-blue-300 p-2"> Trigger 1 </button>}
position="top center"
nested
className="w-full h-full"
>
<div>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
  dolor nulla animi, natus velit assumenda deserunt molestias{" "}
  <Popup
    trigger={<button className="button"> Trigger 2 </button>}
    position="bottom left"
    nested
  >
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Asperiores dolor nulla animi, natus velit assumenda deserunt{" "}
      <Popup
        trigger={<button className="button"> Trigger 3 </button>}
        position="top right"
        nested
      >
        <span> Popup content </span>
      </Popup>
    </div>
  </Popup>
</div>
</Popup>

export default Shorts;
