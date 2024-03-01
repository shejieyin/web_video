import moment from 'moment'

const format_number = num => {
  return num > 9 ? num : '0' + num
}

const format_duration = seconds => {
  let h = Math.floor(seconds / 3600)
  let m = Math.floor((seconds - h * 3600) / 60)
  let s = seconds % 60
  return format_number(h) + ':' + format_number(m) + ':' + format_number(s)
}

const status_enum = status => {
  let map={
    1:'待审核',
    2:'审核通过',
    3:'审核不通过'
  }
  return map[status]
}

const format_timestamp=timestamp=>{
return moment(timestamp).format("YYYY-MM-DD HH:mm")
}
export {
  format_number,
  format_duration,
  status_enum,
  format_timestamp
}
