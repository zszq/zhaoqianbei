// 时间戳处理
export function formatTime(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number * 1000);

  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

/**
 * 简单的移动函数
 * @param {HTML Object} el 目标节点
 * @param {number} x 水平方向的移动
 * @param {number} y 垂直方向的移动
 * @param {Object} options 可选参数
 * @param {Boolean} options.useTransfrom 是否通过transfrom来移动元素
 * @param {Boolean} options.transitionTimingFunction transition的timingFunction
 * @param {String} options.transitionDuration transition时间
 */
export function translate(el, x, y, options) {
  const defaultOptions = {
    useTransfrom: true,
    transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    transitionDuration: '0s'
  }
  for (let option in options) {
    defaultOptions[option] = options[option]
  }
  if (defaultOptions.useTransfrom) {
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    el.style.transitionProperty = 'transform'
    el.style.transitionTimingFunction = defaultOptions.transitionTimingFunction
    el.style.transitionDuration = defaultOptions.transitionDuration
  } else {
    el.style.left = x
    el.style.top = y
  }
}



export const storage = {
  // 存储localStorage
  setLocalStorage(id, key, value) {
    let xixi = window.localStorage.getItem('__xixi__');
    if (!xixi) {
      xixi = {};
      xixi[id] = {};
    } else {
      xixi = JSON.parse(xixi);
      if (!xixi[id]) {
        xixi[id] = {};
      }
    }
    xixi[id][key] = value;
    xixi = JSON.stringify(xixi);
    window.localStorage.setItem('__xixi__', xixi)
  },
  // 读取localStorage
  getLocalStorage(id, key, def) {
    let xixi = window.localStorage.getItem('__xixi__')
    if (!xixi) {
      return def
    }
    xixi = JSON.parse(xixi)
    if (!xixi[id]) {
      return def
    }
    return xixi[id][key] || def
  },
  // 判断指定id是否曾经登录过
  hadLogged(id, def) {
    let xixi = window.localStorage.getItem('__xixi__')
    if (!xixi) {
      return def
    }
    xixi = JSON.parse(xixi)
    if (xixi[id]) {
      return true
    } else {
      return false
    }
  },
  // 读取cookie
  getCookie() {
    let cookie = {}
    const all = document.cookie
    if (all === '') {
      return cookie
    }
    let cookieList = all.split('; ')
    cookieList.forEach((item) => {
      let d = item.indexOf('=')
      let key = item.substring(0, d)
      key = decodeURIComponent(key)
      let value = item.substring(d + 1)
      value = decodeURIComponent(value)
      cookie[key] = value
    })
    return cookie
  },
  // 设置cookie
  setCookie(name, value, maxAge, path, domain, secure) {
    let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)
    if (maxAge) {
      cookie += '; max-age=' + maxAge
    }
    if (path) {
      cookie += '; path=' + path
    }
    if (domain) {
      cookie += '; domain=' + domain
    }
    if (secure) {
      cookie += '; secure=' + secure
    }
    document.cookie = cookie
  },
  delCookie(name) {
    document.cookie = `${name}=; path=/XiXi; max-age=0`
  }
}