import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
console.log(process.env.NEXT_PUBLIC_API_URL)
const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  withCredentials: process.env.NODE_ENV === 'production',
})

//토큰 생기면 추가
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// request interceptors
instance.interceptors.request.use(
  async function (config: InternalAxiosRequestConfig) {
    console.log('🛠️ Request Config: \n' + JSON.stringify(config, null, 2))
    //보통 요청할때 토큰 있으면  처리
    return config
  },
  function (error: AxiosError) {
    console.debug(
      '⚠️ [REQUEST ERROR] Interceptors request error:',
      JSON.stringify(error, null, 2),
    )
    return Promise.reject(error)
  },
)

// response interceptors
instance.interceptors.response.use(
  function (response: AxiosResponse) {
    console.debug(
      '✅ [SUCCESS] Interceptors response status:',
      JSON.stringify(response.status, null, 2),
    )
    console.debug(
      '📦 [DATA] Interceptors response data:',
      JSON.stringify(response.data, null, 2),
    )
    return response
  },
  async function (error: AxiosError) {
    console.debug(
      '🚨 [ERROR] Interceptors response status:',
      JSON.stringify(error.response?.status, null, 2),
    )
    console.debug(
      '❗ [ERROR] Interceptors response data:',
      JSON.stringify(error.response?.data, null, 2),
    )

    if (error.response) {
      if (error.response.status === 503) {
        return Promise.reject({
          message: `현재 접속이 원활하게 이루어지지 않고있습니다. 이용에 불편을 드려 죄송합니다.`,
        })
      }

      if (error.response.statusText === 'Failed') {
        return Promise.reject(error.response.data)
      }
    }
    return Promise.reject(error)
  },
)

export default instance
