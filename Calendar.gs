function scheduleEvent(data) {
  if(data.end){
   var event = CalendarApp.createEvent(data.title, data.start, data.end)
  } else{
   var event = CalendarApp.createAllDayEvent(data.title, data.start)
  }
  data.alarms.forEach(function(alarm){
   event.addEmailReminder(alarm)
  // .addPopupReminder(alarm)
  // .addSmsReminder(alarm)
 
  })
  return event;
  
  
}
