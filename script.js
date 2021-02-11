function render(id, dates) {
  const ul = document.getElementById(id).lastElementChild
  const resObj = calcTime(dates)
  for (let obj of resObj) {
    const li = document.createElement('li')
    if (obj.time === null) continue
    li.innerHTML = obj.weekDay + ': ' + obj.time
    ul.append(li)
  }
}
function convertHoursToMinutes(hours) {
  return hours * 60
}
function findIdx(dates, item) {
  for (let i = 0; i < dates.length; i++) {
    if (dates[i] == item) {
      return i
    }
  }
}

function calcTime(source) {
  let resDate = []
  for (let i = 0; i < source.order.length; i++) {
    const obj = {}
    const test = source.days[source.order[i]]
    if (!test) {
      obj.weekDay = source.order[i]
      obj.time = null
      resDate.push(obj)
      continue
    }
    const {start, end} = test
  
    const hoursStart = Math.floor(start)
    const minutesStart = convertHoursToMinutes(start - Math.floor(start))
  
    const minutesEnd = Math.floor(end)
    const minuteEnds = convertHoursToMinutes(end - Math.floor(end))
    const time = moment(new Date(2021, 5, 6, hoursStart, minutesStart)).format('LT') + ' - ' + moment(new Date(2021, 5, 6, minutesEnd, minuteEnds)).format('LT')
    

    if (i > 0) {
      if (time === resDate[i - 1].time) {
        obj.remove = true
      }
    }
    obj.weekDay = source.order[i]
    obj.time = time

    resDate.push(obj)
  }

  resDate = resDate.filter(function(obj) {
    return !('remove' in obj)
  })


  for (let i = 0; i < resDate.length; i++) {
    let prevEl
    try {
      prevEl = source.order[(findIdx(source.order, resDate[i + 1].weekDay) - 1)]
    } catch(e) {
      prevEl = 'Sunday'
    }
    if (resDate[i].weekDay !== prevEl) {
      resDate[i].weekDay = resDate[i].weekDay.slice(0, 3) + ' - ' + prevEl.slice(0, 3)
    } else {
      resDate[i].weekDay = resDate[i].weekDay.slice(0, 3)
    }
  }
  
  return resDate
}
render('box1', source)
render('box2', source2)
render('box3', source3)