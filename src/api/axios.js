// import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from "qs";
import config  from './config';

const { Env,DEV_API_BASE_URL, PRO_API_BASE_URL, DEBUG_API_BASE_URL } = config;
const BaseUrl = Env === 'dev' ? DEV_API_BASE_URL : Env === 'prod' ? PRO_API_BASE_URL : DEBUG_API_BASE_URL;

/*
能发送异步ajax请求的函数模块
封装axios库
函数的返回值是promise对象
1. 优化1: 统一处理请求异常?
    在外层包一个自己创建的promise对象
    在请求出错时, 不reject(error), 而是显示错误提示
2. 优化2: 异步得到不是reponse, 而是response.data
   在请求成功resolve时: resolve(response.data)
 */
/**
 * Params
 * @param  {AxiosInstance} axios - (optional) The custom axios instance
 * @param  {string} url - The request URL
 * @param  {('GET'|'POST'|'PUT'|'DELETE'|'HEAD'|'OPTIONS'|'PATCH')} method - The request method
 * @param  {object} [options={}] - (optional) The config options of Axios.js (https://goo.gl/UPLqaK)
 * @param  {object|string} trigger - (optional) The conditions for AUTO RUN, refer the concepts of [conditions](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect) of useEffect, but ONLY support string and plain object. If the value is a constant, it'll trigger ONLY once at the begining
 * @param  {function} [forceDispatchEffect=() => true] - (optional) Trigger filter function, only AUTO RUN when get `true`, leave it unset unless you don't want AUTU RUN by all updates of trigger
 * @param  {function} [customHandler=(error, response) => {}] - (optional) Custom handler callback, NOTE: `error` and `response` will be set to `null` before request
 */

/**
 * Returns
 * @param  {object} response - The response of Axios.js (https://goo.gl/dJ6QcV)
 * @param  {object} error - HTTP error
 * @param  {boolean} loading - The loading status
 * @param  {function} reFetch - MANUAL RUN trigger function for making a request manually
 * 基于token的鉴权机制
 * 流程是：
    用户使用用户名密码来请求服务器
    服务器进行验证用户的信息
    服务器通过验证发送给用户一个token
    客户端存储token，并在每次请求时附送上这个token值
    服务端验证token值，并返回数据
 */

const Axios = (url,method='get',params={}, isAuth=false)=>{
    // const BaseUrl = process.env.REACT_APP_API_RUL;
    // const BaseUrl = 'https://api.ycsnews.com/api/v1/';
    const token = localStorage.getItem('__auth_provider_token__');
    // let navigate = useNavigate();
    if(sessionStorage.getItem("__auth_provider_isLogin__") !== '1' && isAuth && !token){
        alert('token失效');
        // navigate('/login');
        return new Promise((resolve, reject) => {});
    }
    // 当前正在请求的数量
    // let requestCount = 0

    // 显示loading
    /*function showLoading () {
        if (requestCount === 0) {// 解决一个页面多个接口请求需要loading
            let dom = document.createElement('div')
            dom.setAttribute('id', 'loading')
            document.body.appendChild(dom)
            ReactDOM.render(<Spin tip="正在拼命获取数据，请稍后..." size="large"/>, dom);
        }
        requestCount++
    }*/

    // 隐藏loading
    /*function hideLoading () {
        requestCount--
        if (requestCount === 0) {
            document.body.removeChild(document.getElementById('loading') as Node);
        }
    }*/

    // const [loading, setLoading] = useState(false);
    // 1. 执行异步ajax请求
    // showLoading();//显示加载中
    const response = axios({
        baseURL: BaseUrl,
        url: url,
        method: method || 'get',
        // mode: 'cors',
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // `headers` 是即将被发送的自定义请求头
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', // 指定提交方式为表单提交
            // 'Content-Type' :'multipart/form-data;charset=UTF-8',
            'Accept': 'application/json', // 通过头指定，获取的数据类型是JSON 'application/json, text/plain, */*',
            // 'Access-Control-Allow-Origin': 'true',
            // 'Access-Control-Allow-Credentials': 'true',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + token
            // 'Cross-Origin-Embedder-Policy': 'require-corp',
            // 'Cross-Origin-Opener-Policy': 'same-origin'
        },
        // `params` 是即将与请求一起发送的 URL 参数
        // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
        params: method==='get'? params || {} : {},
        // `paramsSerializer` 是一个负责 `params` 序列化的函数
        // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
        paramsSerializer: function(params) {
            return Qs.stringify(params, {arrayFormat: 'brackets'})
        },
        // `data` 是作为请求主体被发送的数据
        // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
        // 在没有设置 `transformRequest` 时，必须是以下类型之一：
        // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        // - 浏览器专属：FormData, File, Blob
        // - Node 专属： Stream
        data: method==='post'? params || {} : {},
        // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
        // 如果请求话费了超过 `timeout` 的时间，请求将被中断
        timeout: 0,
        // `withCredentials` 表示跨域请求时是否需要使用凭证
        withCredentials: false, // default 为true则产生跨域
        // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
        responseType: 'json', // default
    });

    /*// 封装URL基地址检测函数
    function getBaseURL (url) {
        if (url.startsWith('/这里是后台接口的前缀')) {
            return '这里是后台接口的服务URL'
        } else {
            return '这里是前台接口的服务URL'
        }
    }

    // 设置请求拦截器
    response.create.interceptors.request.use(function (config) {
        // 判断config.url的前缀是什么，然后进行请求baseURL的设置
        config.baseURL = getBaseURL(config.url)
        return config
    })*/

    return new Promise((resolve, reject) => {
        // hideLoading();
        response.then(response => {
            // 2. 如果成功了, 调用resolve(value)
            // setLoading(true);
            resolve(response);
        })
            .catch(error => {
                // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
                reject(error)
                // message.error('请求出错了: ' + error.message).then(r => {});
            }).finally(() => {
            // hideLoading();
            // setLoading(false);
        })
    });
}

export default Axios;
