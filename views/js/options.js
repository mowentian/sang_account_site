/**
 * Created by hpp on 2017/5/3.
 */
const startToEndOfDays = (days) => {
  const end = new Date();
  const start = new Date();
  start.setTime(start.getTime() - 3600 * 1000 * 24 * days);
  return [start, end];
};


const pickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      picker.$emit('pick', startToEndOfDays(7));
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      picker.$emit('pick', startToEndOfDays(30));
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      picker.$emit('pick', startToEndOfDays(90));
    }
  }]
};


export default {
  startToEndOfDays,
  pickerOptions
};
