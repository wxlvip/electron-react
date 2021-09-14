import Axios from './axios'; //数据请求方法
/**
 * 配置编译环境和线上环境之间的切换
 *
 * Env: 开发模式
 * DEBUG_API_BASE_URL: 本地调试请求 API 地址
 * DEV_API_BASE_URL: 测试环境请求 API 地址
 * PRO_API_BASE_URL：生产环境请求 API 地址
 */

// 局部加载方式
// export function MockTestData(params) {
//     return get('/news/getNews', params);
// }

/*export const captchaApi = (params={}) => {
    return Axios('user/captcha', 'post',params);
}*/
/**
 * 收藏夹管理--查询收藏链接
 * @params uid num
 * @params cid num
 * @params title string
 * @params content string
 * ｛uid:1,cid:1,title:'',content:''｝
 */
export const getCateLinksApi = (params={}) => {
    return Axios('collection/getCateLinks','get', params);
}

/**
 * 博文管理--发布博文
 * @params uid num
 * @params cid num
 * @params title string
 * @params content string
 * ｛uid:1,cid:1,title:'',content:''｝
 */
export const saveArticleApi = (params={}) => {
    return Axios('blog/saveArticle','post', params);
}
/**
 * 博文管理--保存博文草稿
 * @params title string
 * @params content string
 * ｛title:'',content:''｝
 */
export const saveDraftApi = (params={}) => {
    return Axios('blog/saveDraft','post', params);
}

/**
 * 博文管理--查询单篇博文
 * @params unid string
 * ｛unid:1}
 */
export const getArticleApi = (params={}) => {
    return Axios('blog/getArticle','get', params);
}

/**
 * 博文管理--查询博文列表
 * @params unid string
 * ｛unid:1}
 */
export const getArticlesApi = (params={}) => {
    return Axios('blog/getArticles','get', params);
}

/**
 * 书籍管理--查询书籍列表
 * @params cid num  分类ID
 * ｛cid:1}
 */
export const getBooksApi = (params={}) => {
    return Axios('blog/books','get', params);
}

/**
 * 书籍管理--查询书籍章节列表及内容
 * @params cid num  分类ID
 * ｛cid:1}
 */
export const getBookInfoApi = (params={}) => {
    return Axios('blog/bookInfo','get', params);
}
/**
 * 书籍管理--更新书籍章节内容
 * @params id num  书籍ID
 * ｛id:1}
 */
export const saveBookArticleApi = (params={}) => {
    return Axios('blog/saveBookArticle','post', params);
}
/**
 * 书籍管理--更新书籍章节内容
 * @params id num  书籍ID
 * ｛id:1}
 */
export const getBookArticleOneApi = (params={}) => {
    return Axios('blog/getBookArticleOne','get', params);
}

/**
 * 工具管理-清理HTML标签
 * @params  num 文档ID
 * 【'1','2','3'】
 */
export const clearHtmlApi = (params) => {
    return Axios('tools/clearHtml','post', params);
}

/**
 * 收藏夹管理--查询收藏链接
 * @params uid num
 * @params cid num
 * @params title string
 * @params content string
 * ｛uid:1,cid:1,title:'',content:''｝
 */
// export const getCateLinksApi = (params) => {
//     return Axios('collection/getCateLinks', 'post', params);
// }
