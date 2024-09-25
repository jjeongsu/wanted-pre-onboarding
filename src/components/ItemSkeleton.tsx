import React from 'react'
export default function ItemSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center border-2 my-3 rounded-lg py-4 h-28 bg-slate-200 gap-2 animate-pulse w-96">
      <div className="bg-slate-300 w-[150px] h-5 rounded-lg "></div>
      <div className="bg-slate-300 w-[80px] h-4 rounded-lg"> </div>
      <div className="bg-slate-300 w-[200px] h-4 rounded-lg"></div>
    </div>
  )
}
