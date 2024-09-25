import { useEffect, useState } from 'react'
import './App.css'
import { getMockData } from './utils/getMockData'
import Item from './components/Item'
import { MockData, IResponse } from './types/mockData'
//import { MOCK_DATA } from './utils/getMockData'

function App() {
  const [data, setData] = useState<MockData[]>([])
  const [isMore, setIsMore] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const [totlaPrice, setTotalPrice] = useState(0)
  const fetchData = async () => {
    console.log('fetchData 함수 작동')
    const res: IResponse = await getMockData(page)
    if (!res || res === undefined) {
      console.log('오류가 발생했습니다.')
    }
    const newData = res.datas

    const newPriceSum = calPriceSum(newData) //새로운 데이터의 Price합 구함
    setTotalPrice(prev => prev + newPriceSum)
    setData([...data, ...newData])

    setIsMore(!res.isEnd)
    setPage(page => page + 1)
  }

  const handleLoadData = () => {
    //더보기 버튼 클릭시, isMore가 true일 경우 더 많은 데이터 로드
    if (isMore) {
      fetchData()
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const calPriceSum = (data: MockData[]) =>
    data.reduce((acc, curr) => acc + curr.price, 0)

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
        <button onClick={handleLoadData}>더보기</button>
      </section>
    </div>
  )
}

export default App
