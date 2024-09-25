import { useEffect, useState } from 'react'
import './App.css'
import { getMockData } from './utils/getMockData'
import Item from './components/Item'
import ItemListSkeleton from './components/ItemListSkeleton'
import { MockData, IResponse } from './types/mockData'

const calPriceSum = (data: MockData[]) =>
  data.reduce((acc, curr) => acc + curr.price, 0)

function App() {
  const [data, setData] = useState<MockData[]>([]) //불러온 모든 데이터
  const [isMore, setIsMore] = useState<boolean>(false) // 불러올 데이터가 더 있는지 여부
  const [page, setPage] = useState(1) // 불러올 페이지
  const [totlaPrice, setTotalPrice] = useState(0) // 데이터 내부의 총 가격 합
  const [isLoading, setIsLoading] = useState(true) // 데이터 로딩중인지 여부 확인
  const target = document.querySelector('#target')

  const fetchData = async () => {
    console.log(` 👉${page}번째 페이지 데이터 불러오는 중... `)
    setIsLoading(true)
    try {
      const res: IResponse = await getMockData(page)
      if (!res) {
        console.log('오류가 발생했습니다.')
      }
      const newData = res.datas

      const newPriceSum = calPriceSum(newData) //새로운 데이터의 Price합 구함
      setTotalPrice(prev => prev + newPriceSum)
      setData([...data, ...newData])

      setIsMore(!res.isEnd)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      console.log('데이터 불러오기 완료!')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [isLoading, data])

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !isLoading) {
      if (isMore) {
        setIsLoading(true)
        setPage(prev => prev + 1)
        fetchData()
      } else {
        alert('이제 더는 데이터가 없어요..😭')
      }
    }
  })

  return (
    <div>
      <h1 className="text-green-800"> ✅ 무한 스크롤 구현 </h1>
      <section>
        현재 보여진 모든 Price 값의 합 :{totlaPrice}
        <br />
        현재 가져온 모든 Data 의 갯수 : {data.length}
      </section>

      <section className="flex flex-col items-center justify-center ">
        <div>
          {data && data?.map((item, index) => <Item key={index} {...item} />)}
        </div>
        <div id="target"></div>
        {isLoading && <ItemListSkeleton count={3} />}
      </section>
    </div>
  )
}

export default App
