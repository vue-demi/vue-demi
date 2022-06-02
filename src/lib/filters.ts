/*---------------------注册全局过滤器----------------------*/
//无数据情况处理，传入空字符串
const judgeIsNull = function (val: any): string {
  const target = typeof val === 'object' ? Object.prototype.toString.call(val) : `${val}`;
  if (/null|undefined|nan|^\s*$/i.test(target)) {
    return '--';
  }
  return val;
};

//保留两位小数处理
const decimal = function (val: string): string {
  const two = 2;
  return judgeIsNull(val) === '--' ? '--' : parseFloat(val).toFixed(two);
};

//针对正数加上+
const positive = function (val: string): string {
  if (judgeIsNull(val) === '--') {
    return '--';
  } else if (parseFloat(val) > 0) {
    return `+${val}`;
  } else {
    return val;
  }
};

//针对有值的带上百分号
const addPercentSymbol = function (val: any): string {
  return judgeIsNull(val) === '--' ? '--' : `${val}%`;
};

//去除股票名称的空格
const removeSpace = function (val: string): string {
  return judgeIsNull(val) === '--' ? val.replace(/\s/g, '') : '--';
};

//时间戳转换为日期
const stampToDate = function (val: string | number): string {
  return Boolean(+val) ? new Date(+val).toTimeString().split(' ')[0] : '--';
};

export default {
  judgeIsNull,
  decimal,
  positive,
  addPercentSymbol,
  removeSpace,
  stampToDate,
};
