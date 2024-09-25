import { MockData } from '../types/mockData'
import React from 'react'
export default function Item(data: MockData) {
  return <div>{data.productName}</div>
}
