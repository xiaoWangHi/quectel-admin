import request from './request'

function getUrl(option) {
  var url = encodeURI((option.urlType === 'zuul_url' ? '' : window.config[option.urlType]) + option.url)
  return url
}
/**
 * axios封装
 */
const GET = (option, params) => {
  return new Promise((resolve, reject) => {
    request({ url: getUrl(option), method: 'get', params: params })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
const GETURL = (option, id, params) => {
  return new Promise((resolve, reject) => {
    const option_ = JSON.parse(JSON.stringify(option))
    if (id) {
      option_.url = option_.url + '/' + id
    }
    request({ url: getUrl(option_), method: 'get', params: params })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
const PUT = (option, id, params) => {
  return new Promise((resolve, reject) => {
    const option_ = JSON.parse(JSON.stringify(option))
    if (id) {
      option_.url = option_.url + '/' + id
    }
    request({ url: getUrl(option_), method: 'put', data: params })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const PUTURL = (option, id, params) => {
  return new Promise((resolve, reject) => {
    const option_ = JSON.parse(JSON.stringify(option))
    if (id) {
      option_.url = option_.url + '/' + id
    }
    request({ url: getUrl(option_), method: 'put', params: params })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const POST = (option, params) => {
  return new Promise((resolve, reject) => {
    var header = { 'Accept': '*/*', 'Content-Type': option.file ? 'multipart/form-data' : 'application/json' }
    request({
      url: getUrl(option),
      method: 'post',
      data: params,
      headers: header
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const POSTURL = (option, params, data) => {
  return new Promise((resolve, reject) => {
    var header = {}
    if (option.file) {
      header = { 'Accept': '*/*', 'Content-Type': 'multipart/form-data' }
    }
    request({
      url: getUrl(option),
      method: 'post',
      params: params,
      data: data,
      headers: header
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const DELETE = (option, id, params) => {
  return new Promise((resolve, reject) => {
    const option_ = JSON.parse(JSON.stringify(option))
    if (id !== null) {
      option_.url = option_.url + '/' + id
    }
    request({ url: getUrl(option_), method: 'delete', data: params }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

const ALL = (arr) => {
  return new Promise((resolve, reject) => {
    request.all(arr)
      .then(request.spread(function(acct, perms) {
        resolve(acct)
      })).catch((err) => {
        reject(err)
      })
  })
}

export {
  GET,
  GETURL,
  POST,
  POSTURL,
  PUT,
  DELETE,
  ALL,
  PUTURL
}

