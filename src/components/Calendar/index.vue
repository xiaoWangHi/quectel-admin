<template>
  <div class="calendar-container">
    <div class="header">
      <div class="left titleColor font16 h3">{{title}}</div>
      <div class="right">
        <div class="right" v-if="dateType === 'date' || dateType === 'month'">
          <div class="iconDiv" @click="prevChange">
            <i class="el-icon-arrow-left pointer"></i>
          </div>
          <div>
            <el-date-picker
              size="mini"
              v-model="calendarValue"
              :type="dateType"
              value-format="yyyy-MM-dd"
              :clearable='false'
              placeholder="选择月">
            </el-date-picker>
          </div>
          <div class="iconDiv" @click="nextChange">
            <i class="el-icon-arrow-right pointer"></i>
          </div>
        </div>
        <div v-else>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            value-format="yyyy-MM-dd"
            :clearable='false'
            range-separator="-"
            :start-placeholder="$t('message.StartDate')"
            :end-placeholder="$t('message.EndDate')"
            @change="dateRangChange">
          </el-date-picker>
          <tips :text='text'></tips>
        </div>
      </div>
    </div>
    <slot name="header"></slot>
    <el-calendar class="calendar-view" v-model="calendarValue" :range='dateRange' :first-day-of-week='firstWeekDay' :class="dateType ? 'my-calendar' : ''">
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <div @click="calendarClick(data, render)" class="dateCell">
          <render-view v-if="render" :render='render' :date='date' :data='data'></render-view>
           <p class="fj" v-else>
            <span>{{ data.day.split('-')[2] }}</span>
          </p>
        </div>
      </template>
    </el-calendar>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import format from 'utils/format'
import { Tips } from 'components'
export default {
  watch: {
    firstWeekDay: {
      deep: true,
      handler(val) {
        this.text = this.$t('message.StartDate') + this.$t('message.pleaseChoose') + this.weekText[val].start + ',' + this.$t('message.EndDate') + this.$t('message.pleaseChoose') + this.weekText[val].end
      },
      immediate: true
    }
  },
  props: {
    title: { // 日历标题
      type: String,
      default: () => {
        return '日历组件'
      }
    },
    defaultDay: { // 是否显示默认日期
      type: Boolean,
      default: () => {
        return true
      }
    },
    render: { // 自定义日历内容
      type: Function
    },
    value: { // 当前时间
      type: [Date, String, Number],
      default: ''
    },
    dateType: { // 日期选择组件类型
      type: String,
      default: () => {
        return 'date' // month 月  date 日  daterange 日期段
      }
    },
    range: { // 时间范围，包括开始时间与结束时间。开始时间必须是周一，结束时间必须是周日，且时间跨度不能超过两个月
      type: Array,
      default: () => {
        return null
      }
    },
    firstWeekDay: { // 周起始日
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      text: '开始时间、结束时间应该是周三',
      calendarValue: format.getDateYMD(this.value),
      dateRange: this.range,
      weekText: {
        1: { start: this.$t('date.Monday'), end: this.$t('date.Sunday') },
        2: { start: this.$t('date.Tuesday'), end: this.$t('date.Monday') },
        3: { start: this.$t('date.Wednesday'), end: this.$t('date.Tuesday') },
        4: { start: this.$t('date.Thursday'), end: this.$t('date.Wednesday') },
        5: { start: this.$t('date.Friday'), end: this.$t('date.Thursday') },
        6: { start: this.$t('date.Saturday'), end: this.$t('date.Friday') },
        7: { start: this.$t('date.Sunday'), end: this.$t('date.Saturday') }
      }
    }
  },
  methods: {
    /**
     * 前一天、前一个月
    */
    prevChange() {
      switch(this.dateType) {
        case 'date':
          this.calendarValue = format.getPrevNextDate(this.calendarValue, -1)
          break
        case 'month':
          this.calendarValue = format.getPreMonth(this.calendarValue)
          break
      }
    },
    /**
     * 后一天、后一个月
     */
    nextChange() {
      switch(this.dateType) {
        case 'date':
          this.calendarValue = format.getPrevNextDate(this.calendarValue, 1)
          break
        case 'month':
          this.calendarValue = format.getNextMonth(this.calendarValue)
          break
      }
    },
    /**
     * 点击普通日期
    */
    calendarClick(data, render) {
      this.$emit('calendarClick', data, render)
    },
    /**
     * 时间范围选择校验
    */
    dateRangChange(val) {
      const start = format.getWeekDate(val[0])
      const end = format.getWeekDate(val[1])
      const defaultWeekText = this.weekText[this.firstWeekDay]
      if(start !== defaultWeekText.start) {
        this.$message.error(this.$t('message.StartDate') + this.$t('message.pleaseChoose') + defaultWeekText.start)
        return false
      }
      if(end !== defaultWeekText.end) {
        this.$message.error(this.$t('message.EndDate') + this.$t('message.pleaseChoose') + defaultWeekText.end)
        return false
      }
    }
  },
  components: {
    Tips,
    renderView: {
      functional: true,
      props: {
        data: Object,
        date: Date,
        render: Function,
        index: Number
      },
      render: (h, ctx) => {
        const params = ctx.props
        const index = ctx.props.index
        return ctx.props.render(h, params, index)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.calendar-container{
  .my-calendar{
    /deep/.el-calendar__header{
      display: none;
    }
    /deep/.el-calendar__body{
      background: url('../../assets/images/quectel.png')  center center;
      background-size: 75%;
    }
    /deep/.el-calendar-day{
      border: 1px solid rgba(0,0,0,0);
      height: 96px;
    }
    /deep/.is-selected{
      .el-calendar-day{
        border: 1px solid $--color-primary
      }
    }
  }
  .header{
    @include fj();
    line-height: 40px;
    padding: 0 20px;
    .right{
      @include fj(flex-end);
      text-align: right;
      .iconDiv{
        margin: 0 2px;
        &:hover{
          color: $--color-primary
        }
      }
    }
  }
  .dateCell{
    height: 100%;
  }
}

</style>
