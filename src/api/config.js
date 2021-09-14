/**
 * 配置编译环境和线上环境之间的切换 可根据实际测试环境进行配置
 *
 * Env: 开发模式  debug:debug 开发模式 dev:development 测试环境  prod:production 生产环境
 * DEBUG_API_BASE_URL: 本地调试请求 API 地址
 * DEV_API_BASE_URL: 测试环境请求 API 地址
 * PRO_API_BASE_URL：生产环境请求 API 地址
 */
const model = 3;

let Env = '';

if (model === 1){
    Env = 'debug'
} else if (model === 2){
    Env = 'dev'
} else if (model === 3){
    Env = 'prod'
}else{
    Env = 'prod'
}

const DEBUG_API_BASE_URL = 'http://localhost:9090/api/debug'
const DEV_API_BASE_URL = 'http://localhost:9090/api/dev'
const PRO_API_BASE_URL = 'https://api.ycsnews.com/api/v1/'

/**
 * Cookie 失效时间，默认1天  暂未使用
 */
// const cookieExpires = 1

const config = {
    Env,
    DEBUG_API_BASE_URL,
    DEV_API_BASE_URL,
    PRO_API_BASE_URL,
    // cookieExpires
}

export default config;
