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

  const fetchData = async () => {
    console.log('fetchData 함수 작동')
    const res: IResponse = await getMockData(page)
    if (!res || res === undefined) {
      console.log('오류가 발생했습니다.')
    }
    setData([...data, ...res.datas])
    setIsMore(!res.isEnd)
    setPage(page => page + 1)
  }

  const handleLoadData = () => {
    //더보기 버튼 클릭시, isMore가 ture일 경우 더 많은 데이터 로드
    if (isMore) {
      fetchData()
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  console.log('가져온 데이터', data)

  return (
    <div>
      <h1 className="text-green-800"> ✅ 무한 스크롤 구현 </h1>
      <div>
        {data && data?.map((item, index) => <Item key={index} {...item} />)}
      </div>
      <button onClick={handleLoadData}>더보기</button>
    </div>
  )
}

export default App
