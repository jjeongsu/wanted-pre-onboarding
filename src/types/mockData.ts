// 반환되는 데이터의 타입
export interface MockData {
  productId: string
  productName: string
  price: number
  boughtDate: string
}

// 반환되는 프로미스 타입
export interface IResponse {
  datas: MockData[]
  isEnd: boolean
}
