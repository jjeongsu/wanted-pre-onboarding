import { MockData } from '../types/mockData'
import React from 'react'
export default function Item(data: MockData) {
  return (
    <div className="border-blue-400 border-2 my-3 rounded-lg py-4">
      <div className="font-semibold text-lg">{data.productName}</div>
      <div className="text-slate-600"> 💰 Price : {data.price}</div>
      <div>{data.boughtDate}</div>
    </div>
  )
}
