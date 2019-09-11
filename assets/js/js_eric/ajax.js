/**
 * @time  2019/9/5 16:28
 * @author  Eric Wang <vuejs@vip.qq.com>
 * @desc  原生Ajax处理，不准备用jQuery的，因为它没有拦截器
 * @todo 在请求的时候加入队列控制，请求入队，控制访问流程，做到请求顺序可控
 */

class MyHttpRequest {
    /**
     * @param baseUrl {String} -请求主域名
     */
    constructor(baseUrl) {
        this.baseUrl = baseUrl;

        // 初始化XMLHttpRequest对象
        this.XML = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft");
        this.initGlobal();
    }

    /**
     * @param HQ {Object} -XML对象
     * @desc 初始化
     */
    initGlobal(HQ = this.XML) {
        HQ.responseType = "json";
    }

    /**
     * @param HQ {Object} -XML对象
     * @desc 数据处理
     */
    filterData(HQ = this.XML) {
        const _self = this;
        return new Promise(resolve => {
            HQ.onreadystatechange = function () {
                _self.interceptorReq(this.readyState);
                let res = _self.interceptorRes.call(this, this.readyState, this.status);
                if (res) {
                    resolve(res);
                }
            }
        });
    }

    /**
     * @param state {Number} -readyState
     * @desc 请求拦截器
     */
    interceptorReq(state) {
        $(".loading_wbl").css({display:"block"});
        return state !== 4;
    }

    /**
     * @param state {Number} -readyState
     * @param status {Number} -status
     * @desc 响应拦截器
     */
    interceptorRes(state, status) {
        if (state === 4 && status === 200) {
            // $(".loading_wbl").css({display:"none"});
            return this.response;
        } else if (status === 404) {
            console.log("资源未找到!");
        } else if (status === 500) {
            console.log("服务器开小差了");
        }
    }


    /**
     * @param url {String} -请求API
     * @param HQ {Object} -XML对象
     * @desc get方式请求
     */
    get(url, HQ = this.XML) {
        url = this.baseUrl.concat(url);
        HQ.open("get", url);
        HQ.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        HQ.send(null);
        return this.filterData();
    }
}