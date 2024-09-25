import { useEffect, useState } from 'react'
import './App.css'
import { getMockData } from './utils/getMockData'
import Item from './components/Item'
import { MockData, IResponse } from './types/mockData'
//import { MOCK_DATA } from './utils/getMockData'

const calPriceSum = (data: MockData[]) =>
  data.reduce((acc, curr) => acc + curr.price, 0)
function App() {
  const [data, setData] = useState<MockData[]>([])
  const [isMore, setIsMore] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const [totlaPrice, setTotalPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
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
    if (entries[0].isIntersecting && !isLoading && isMore) {
      setIsLoading(true)
      fetchData()
      setPage(prev => prev + 1)
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
      <section>
        <div>
          {data && data?.map((item, index) => <Item key={index} {...item} />)}
        </div>
        <div id="target"></div>
      </section>
    </div>
  )
}

export default App
