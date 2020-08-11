<template>
  <div class="padding10">
    <div class="padding10">
      <el-form :model="formData" size="mini" label-width="100px">
        <el-form-item label='日历标题'>
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label='选择器类型'>
          <el-radio-group v-model="formData.dateType">
            <el-radio label="month">月</el-radio>
            <el-radio label="date">日</el-radio>
            <el-radio label="daterange">日期范围</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label='周起始日'>
          <el-radio-group v-model="formData.firstWeekDay">
            <el-radio :label="7">{{$t('date.Sunday')}}</el-radio>
            <el-radio :label="1">{{$t('date.Monday')}}</el-radio>
            <el-radio :label="2">{{$t('date.Tuesday')}}</el-radio>
            <el-radio :label="3">{{$t('date.Wednesday')}}</el-radio>
            <el-radio :label="4">{{$t('date.Thursday')}}</el-radio>
            <el-radio :label="5">{{$t('date.Friday')}}</el-radio>
            <el-radio :label="6">{{$t('date.Saturday')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label='自定义内容'>
          <el-switch v-model="formData.render"></el-switch>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-col :span="18">
        <calendar
          v-model="date"
          :title='formData.title'
          :dateType='formData.dateType'
          :firstWeekDay='formData.firstWeekDay'
          :render='formData.render ? render : null'
          :defaultDay='false'
          @calendarClick="calendarClick">
        </calendar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Calendar, CalendarItem } from 'components'
export default {
  name: 'calendarView',
  components: { Calendar, CalendarItem },
  data() {
    return {
      date: new Date().getTime(),
      formData: {
        title: '日历组件',
        dateType: 'date',
        firstWeekDay: 1,
        render: true
      },
      render: (h, params, index) => {
        const day = params.data.day.split('-')[2]
        const arr = {
          '06': {
            icon: 'iconhuowudui',
            text: 'primaryprimaryprimaryprimaryprimaryprimaryprimaryprimaryprimary'
          },
          '02': {
            icon: 'iconyonghuziliao',
            list: [
              { icon: 'iconclock_fill', text: '有icon primary 很多字很多字', type: 'primary' },
              { text: '无icon', type: 'success' },
              { icon: 'iconicon_calendar', text: 'warning', type: 'warning' },
              { icon: 'iconicon_calendar', text: '更多显示', type: 'warning' },
              { text: '无icon', type: 'success' }
            ]
          },
          '04': {
            icon: 'iconicon_at',
            list: [
              { icon: 'iconicon_attestation', text: 'danger', type: 'danger' }
            ]
          },
          '18': {
            icon: 'iconicon_calendar',
            list: [
              { icon: 'iconicon_calendar', text: 'primary', type: 'primary' }
            ]
          },
          '10': null
        }
        const props = {
          day: day,
          icon: arr[day] ? arr[day].icon : '',
          list: arr[day] ? arr[day].list : null,
          text: arr[day] ? arr[day].text : null
        }
        return h(CalendarItem, { ref: 'item', props: props })
      }
    }
  },
  methods: {
    calendarClick(date, render) {
      this.$message.success(`您点击了${date.day}`)
    }
  }
}
</script>
