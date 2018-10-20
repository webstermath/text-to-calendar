// ****** SETUP ******
// 1. change the string assignment of the EMAIL variable to your phone number email address.
//  Use the guide below to figure out the proper email for your number:
//  AT&T: '+###########@txt.att.net'
//  T-Mobile: '+###########@tmomail.net'
//  Verizon: '+###########@vtext.com'
//  Sprint: '+###########@messaging.sprintpcs.com' 

// 2. Run the init() function and agree to the permissions
// ****** ALL DONE ******

var EMAIL = '<YOUR PHONE NUMBER EMAIL ADDRESS>'

function init(){
  var props = PropertiesService.getUserProperties();
  
  var triggerId = props.getProperty('triggerId')
  if(triggerId && 
     ScriptApp.getProjectTriggers().some(function(trigger){
    return trigger.getUniqueId() == triggerId;
  })){
    Logger.log('Trigger already set up')
    return;
  }
  
  var triggerId = ScriptApp.newTrigger("check")
  .timeBased()
  .everyMinutes(1)
  .create()
  .getUniqueId();
  
  props.setProperty('triggerId', triggerId);
  
  Logger.log('Trigger set up'); 
}

function check(){
  var now = Date.now();
  var props = PropertiesService.getUserProperties();
  var lastUpdate = Number(props.getProperty('lastUpdate') || now-(24*60*60*1000))

  try{  
   eventCodes = checkEmail(lastUpdate)
  }
  catch(f){
   console.error(f)
   MailApp.sendEmail(EMAIL, 'ERROR', f.message)
   return;
  }
  
  eventCodes.forEach(function(eventCode){
   try{
    var eventData = getEventObject(eventCode)
    var event = scheduleEvent(eventData)
    MailApp.sendEmail(EMAIL, event.getTitle(), event.getStartTime().toString())
   }
   catch(f){
    console.error(f)
    MailApp.sendEmail(EMAIL, 'ERROR', f.message)
   } 
  });
  props.setProperty('lastUpdate', now-(10*60*1000))
}

