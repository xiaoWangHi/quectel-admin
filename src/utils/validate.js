/**
 * Created by PanJiaChen on 16/11/18.
 */
export default class Validate {
  /**
 * @param {string} path
 * @returns {Boolean}
 */
  static isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }

  /**
 * @param {string} str
 * @returns {Boolean}
 */
  static validUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
  }

  /**
 * @param {string} url
 * @returns {Boolean}
 */
  static validURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
  }

  /**
 * @param {string} str
 * @returns {Boolean}
 */
  static validLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
  }

  /**
 * @param {string} str
 * @returns {Boolean}
 */
  static validUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
  }

  /**
 * @param {string} str
 * @returns {Boolean}
 */
  static validAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
  }

  /**
 * @param {string} email
 * @returns {Boolean}
 */
  static validEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
  }

  /**
 * @param {string} str
 * @returns {Boolean}
 */
  static isString(str) {
    if (typeof str === 'string' || str instanceof String) {
      return true
    }
    return false
  }

  /**
 * @param {Array} arg
 * @returns {Boolean}
 */
  static isArray(arg) {
    if (typeof Array.isArray === 'undefined') {
      return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
  }

  /**
     * 验证必填元素
     */
  static required(value) {
    if (typeof value === 'number') {
      value = value.toString()
      value = value.replace(/\s+/g, '')
    } else if (typeof value === 'boolean') {
      return !0
    } else if (typeof value === 'string') {
      value = value.replace(/\s+/g, '')
    }
    return value && value.length > 0
  }

  /**
   * 判断是否是纯字母
   */
  static onlyLetter(value) {
    return /^[A-Za-z]+$/.test(value)
  }

  /**
   * 验证IP
   */
  static IP(value) {
    return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value)
  }
  static IPTest(value) {
    return /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/.test(value)
  }

  /**
   * 重复验证
   */
  static noDuplicate(values) {
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values.length; j++) {
        if (values[i] === values[j] && i !== j) {
          return false
        }
      }
    }
    return true
  }
  /**
       * 验证电子邮箱格式
       */
  static email(value) {
    return (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value))
  }
  /**
       * 验证手机格式
       */
  static tel(value) {
    return /^1[3456789]\d{9}$/.test(value)
  }
  static onlyNumber(value) {
    return /^\d{17}$/.test(value)
  }
  /**
       * 验证电话格式
       */
  static phone(value) {
    return /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(value)
  }

  /**
   * 验证联系方式（固话&手机）
   */
  static call(value) {
    return (/(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[3456789]\d{9})$)/.test(value))
  }

  /**
   * 验证银行卡号（ 16 或19位）
   */
  static bankCard(value) {
    return (/^([1-9]{1})(\d{15}|\d{18})$/.test(value))
  }

  /**
   * 验证只能是字母或数字
   */
  static onlyLetterNum(value) {
    return (/^[0-9a-zA-Z]+$/.test(value))
  }

  /**
   * 验证传真格式
   */
  static fax(value) {
    return /^(\d{3,4}-)\d{7,8}$/.test(value)
  }
  /**
       * 验证URL格式
       */
  static url(value) {
    return (/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value))
  }
  /**
       * 验证日期格式
       */
  static date(value) {
    return !/Invalid|NaN/.test(new Date(value).toString())
  }
  /**
       * 验证ISO类型的日期格式
       */
  static dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
  }
  /**
       * 验证浮点数
       */
  static numberFloat(value) {
    return (/^(-?\d+)(\.\d+)?$/.test(value))
  }
  /**
       * 验证十进制数字
       */
  static number(value) {
    return (/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value))
  }
  /**
       * 验证整数
       */
  static digits(value) {
    return /^\d+$/.test(value)
  }
  /**
       * 验证正整数
       */
  static amount(value) {
    return /^[1-9]\d*$/.test(value)
  }
  /**
       * 验证整数,可以为0
       */
  static amount0(value) {
    return /^[0-9]\d*$/.test(value)
  }
  /**
       * 验证身份证号码
       */
  static idcard(value) {
    return (/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value))
  }
  /**
       * 验证内容是否相同
       */
  static equalTo(value, param) {
    return value === param
  }
  /**
       * 验证内容是否不相同
       */
  static noEqualTo(value, param) {
    return value !== param
  }
  /**
       * 验证是否包含某个值
       */
  static contains(value, param) {
    return value.indexOf(param) === -1
  }
  /**
       * 验证最小长度
       */
  static minlength(value, param) {
    return value.length >= param
  }
  /**
       * 验证最大长度
       */
  static maxlength(value, param) {
    value = value || []
    return value.length <= param
  }
  /**
       * 验证一个长度范围[min, max]
       */
  static rangelength(value, param) {
    return (value.length >= param[0] && value.length <= param[1])
  }
  /**
       * 验证最小值
       */
  static min(value, param) {
    return Number(value) >= Number(param)
  }
  static minTo(value, param) {
    return Number(value) > Number(param)
  }
  /**
       * 验证最大值
       */
  static max(value, param) {
    return Number(value) <= Number(param)
  }
  static maxTo(value, param) {
    return Number(value) < Number(param)
  }

  /**
   * 验证时间
   */
  static after(value, param) {
    return value >= param
  }
  /**
       * 验证时间
       */
  static before(value, param) {
    return value <= param
  }
  /**
       * 验证一个值范围[min, max]
       */
  static range(value, param) {
    return (value >= param[0] && value <= param[1])
  }
  /**
       * 判断输入值是否为空
       */
  static optional(value) {
    // return !this.required(value) && 'dependency-mismatch'
    return this.required(value)
  }

  /**
   * 判断是否含有特殊字符
   */
  static hasSpecial(value) {
    return (/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value))
  }
  /**
       * 商品名称
       */
  static proName(value) {
    // let containSpecial = RegExp(/[(\——)(\+)(\=)(\[)(\【)(\])(\】)(\{)(\})(\|))(\、))(\)(\\)(\;)(\；)(\:)(\：)(\')(\‘)(\’)(\")(\“)(\”)(\,)(\，)(\.)(\。)(\/)(\《)(\<)(\>)(\》)(\?)(\？)(\)]+/);
    var reg1 = /[\[\] ]/gi
    var reg2 = /^((?!and|exec|execute|insert|select|delete|update|count|drop|mid|master|truncate|char|declare|sitename|netuser|xp_cmdshell|or|like|create|drop|table|from|grant|use|group_concat|column_name|\<script\>|\<\/script\>|information_schema.columns|table_schema|union|where|order|by|count|chr|like|alert\(|javascript:|#include|@import|having|onmouseover=|\/and\/).)*$/
    return !reg1.test(value.replace(/\s/g, '')) && reg2.test(value.replace(/\s/g, ''))
  }

  static isNumLetter(value) {
    return (/^[0-9a-zA-Z]+$/.test(value))
  }
  static isNumLetters(value) {
    return (/^[0-9a-zA-Z\.]+$/.test(value))
  }
  static isNumberStr(value) {
    return (/^\d+$/).test(value)
  }
  // static strLen(value, param) {
  //   const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
  //   if (!reg.test(value)) {
  //     return false
  //   } else {
  //     if (utils.computedStrLen(value) <= param) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   }
  // }
}

