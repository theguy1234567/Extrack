import React from 'react'
import { EllipsisVertical } from "lucide-react";

function Card(props) {
  return (
    <>
      <div className="bg-white/70 flex flex-col py-7 px-7">
        <div className="flex justify-between  items-center  mb-4">
          <h1 className="text-2xl font-light text-shadow-2xs">{props.title}</h1>
          <button className="flex items-center text-sm size-5 hover:cursor-pointer ">
            <EllipsisVertical color='gray' />
          </button>
        </div>
        <div className=' h-full'>
            <h1 className='text-6xl'>${props.value}</h1>

        </div>
      </div>
    </>
  );
}

export default Card