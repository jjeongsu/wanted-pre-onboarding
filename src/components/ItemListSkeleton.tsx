import ItemSkeleton from './ItemSkeleton'
import React from 'react'
export default function ItemListSkeleton({ count }: { count: number }) {
  return new Array(count).fill(0).map((_, idx) => <ItemSkeleton key={idx} />)
}
