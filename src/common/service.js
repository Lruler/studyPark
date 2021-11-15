import 'whatwg-fetch';

const BASE = ""

function Fetch(url, opt = {}) {
    opt.method = opt.method || 'GET';
    opt.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    if (url.includes('message')) {
        opt.headers = new Headers()
        opt.headers.append("Content-Type", "application/x-www-form-urlencoded");
    }
    if (opt.body) {
        opt.body = JSON.stringify(opt.body)
    }
    opt.body = JSON.stringify(opt.data) || null;
    if (opt.formdata) {
        opt.body = opt.formdata;
    }
    return fetch(url, opt)
        .then(response => {
            if (response.ok) {
                return response.json().then(res => {
                    return res;
                });
            } else {
                return response.json().then(res => {
                    return new Promise((_, reject) => {
                        reject(res);
                    });
                });
            }
        })
        .catch(e => {
            alert(`服务端错误：${e.message}`)
            throw e;
        })
}

let Service = {
   // 获得随机用户名
    rand() {
        return Fetch(BASE + '/rand')
    },
    // 提交数据
    info(info) {
        return Fetch(BASE + '/info', {
            method: 'POST',
            data: {
                tel: info.tel,
                point: info.point,
                user_name: info.user_name,
                time: info.time,
                group_id: info.group_id
            }
        })
    },
    // 获得讨论信息
    message(result, group_id) {
        let urlencoded = new URLSearchParams(BASE)
        for (let i = 0; i < result.length; i++) {
            urlencoded.append("result", result[i])
        }
        urlencoded.append("group_id", `${group_id}`)
        let urlStr = urlencoded.toString()
        return Fetch(BASE + '/message', {
            method: 'POST',
            data: urlStr
        })
    }
};

export default Service;