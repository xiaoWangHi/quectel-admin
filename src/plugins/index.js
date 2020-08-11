import Vue from 'vue'
import Cookies from 'js-cookie'
import i18n from '../i18n'
import '../assets/styles/element.scss'
import { GET, GETURL, POST, POSTURL, PUT, DELETE, ALL, PUTURL } from '@/api'

Vue.prototype.HTTP = { GET, GETURL, POST, POSTURL, PUT, DELETE, ALL, PUTURL }
import {
  Scrollbar,
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Timeline,
  TimelineItem,
  Link,
  Divider,
  Image,
  Calendar,
  Backtop,
  PageHeader,
  CascaderPanel,
  Loading,
  MessageBox,
  Message,
  Notification,
  Avatar
} from 'element-ui'

Vue.prototype.$ELEMENT = { size: Cookies.get('size') || 'medium' }

Vue.use(Scrollbar)
Vue.use(Avatar)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Spinner)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Rate)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Cascader)
Vue.use(ColorPicker)
Vue.use(Transfer)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Link)
Vue.use(Divider)
Vue.use(Image)
Vue.use(Calendar)
Vue.use(Backtop)
Vue.use(PageHeader)
Vue.use(CascaderPanel)

Vue.use(Loading.directive)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$loading = {
  loading: null,
  normal(settings) {
    this.loading = Loading.service(settings)
  },
  open(txt) {
    this.loading = Loading.service({
      text: txt || '加载中...'
    })
  },
  close() {
    this.loading && this.loading.close()
    this.loading = null
  }
}
Vue.prototype.$message = {
  _base(tip, type, time) {
    return Message({
      message: tip,
      type: type || '',
      showClose: true,
      duration: 2000
    })
  },
  info(tip) {
    return this._base(tip, 'info')
  },
  success(tip) {
    return this._base(tip, 'success')
  },
  warning(tip) {
    return this._base(tip, 'warning')
  },
  error(tip) {
    return this._base(tip, 'error')
  }
}

function confirm(obj, type) {
  const message = i18n.messages[i18n.locale].message
  return MessageBox.confirm(obj.message, obj.title, {
    type: type || '',
    showCancelButton: obj.showCancelButton || true,
    showConfirmButton: obj.showConfirmButton || true,
    cancelButtonText: obj.cancelButtonText || message.cancel,
    confirmButtonText: obj.confirmButtonText || message.confirm,
    center: true,
    duration: 2000
  })
}
Vue.prototype.$confirm = confirm
