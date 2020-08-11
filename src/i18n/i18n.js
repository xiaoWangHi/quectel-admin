import langEn from './langs/en'
import langCn from './langs/zh-CN'
import menuEn from './menuLang/en'
import menuCn from './menuLang/zh-CN'
import dateEn from './dateLang/en'
import dateCn from './dateLang/zh-CN'
export default {
  en: { ...langEn, ...menuEn, ...dateEn },
  cn: { ...langCn, ...menuCn, ...dateCn }
}
