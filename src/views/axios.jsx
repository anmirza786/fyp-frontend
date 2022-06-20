import axios from 'axios'


const instance = axios.create(
    {
        baseURL:""
    }
)
instance.interceptors.request.use(
    config => {
        // console.log(localStorage.getItem('access'),"request sent")
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situations
            // config.headers['X-Token'] = Cookies.get(Store.state.app.tokenKey)
            // config.headers['Content-Type'] = 'application/json'
            config.headers.Authorization = `JWT ${localStorage.getItem('access')}`
            // console.log(window.TylexApp.$getToken())
        // console.log(config)
        return config
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    }
)

export default instance
