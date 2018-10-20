function getEventObject(text) {
  var textArr = text.replace(/\s\s+/,' ').split(' ')
  var dateArr = [];
  var alarmArr = [];
  var title ='';
  var pointer='date'
  textArr.forEach(function(item){
    switch(pointer){
      case 'date':
        if(isNaN(item)){
          pointer = 'alarm'
        } else {
          dateArr.push(+item);
          break;
        }
      case 'alarm':
        if(!/^\d+[mMhHdDwW]$/.test(item)){
          pointer = 'title'
        } else {
          alarmArr.push(item);
          break;
        }
      case 'title':
        title += title ? ' ' + item : item;
        break
        default:
        throw new Error('bad text parsing')  
    }
  })
  
  var event = getDateObject(dateArr);
  event.alarms = getAlarms(alarmArr);
  event.title = title;
  return event;
}

function getAlarms(args){
  return args
  .map(function(item){
    return item.toLowerCase(); 
  })
  .map(function(item){
    if(~item.indexOf('m')) return parseInt(item,10);
    if(~item.indexOf('h')) return parseInt(item,10)*60;
    if(~item.indexOf('d')) return parseInt(item,10)*60*24;
    if(~item.indexOf('w')) return parseInt(item,10)*60*24*7;
  })
}

function getDateObject(args){
  var today = new Date();
  if(!args.length){
   var start = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1); 
  } else if(args.length === 1){
   var start = new Date(today.getFullYear(),today.getMonth(),today.getDate()+args[0]); 
  } else{
   var start = new Date(today.getFullYear(),args[0]-1,args[1]); 
  }
  var end = new Date(start);
  if(args.length===3){
    start.setHours(args[2],0,0,0)
    end.setHours(args[2]+1,0,0,0)
  }
  if(args.length===4){
    start.setHours(args[2],0,0,0)
    end.setHours(args[3],0,0,0)
  }
  if(args.length>4){
    start.setHours(args[2],args[3],0,0)
    end.setHours(args[4],args[5] || 0,0,0)
  }
  if(today.valueOf() > start.valueOf()){
    start.setFullYear(start.getFullYear()+1)
    end.setFullYear(end.getFullYear()+1)
  }
  return {
    start: start, 
    end: args.length>2 ? end : undefined
  }
  
}