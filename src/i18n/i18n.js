import langEn from './langs/en'
import langCn from './langs/zh-CN'
import menuEn from './menuLang/en'
import menuCn from './menuLang/zh-CN'
import dateEn from './dateLang/en'
import dateCn from './dateLang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en' // 引入element语言包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // 引入element语言包
export default {
  en: { ...langEn, ...menuEn, ...dateEn, ...enLocale },
  cn: { ...langCn, ...menuCn, ...dateCn, ...zhLocale }
}
