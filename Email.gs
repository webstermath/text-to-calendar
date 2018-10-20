function checkEmail(lastUpdate) {
  var result=[]
  var threads = GmailApp.getInboxThreads(0, 30);
  threads.every(function(thread,i){
    if(thread.getLastMessageDate().valueOf()<lastUpdate) return false;
    
    var messages = thread.getMessages();
    messages.forEach(function(message){
      if(message.getFrom() != EMAIL) return;
      var text = message.getPlainBody();
      if(!/[^a-z]cal\s+\d/i.test(text)) return;
      result.push(/cal\s+(\d.*)\n/i.exec(text)[1].trim());
      message.moveToTrash();
    });
    return true;
  });
  return result;
}

