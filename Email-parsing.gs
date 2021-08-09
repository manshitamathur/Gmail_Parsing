function onOpen(e){
  var ui = SpreadsheetApp.getUi();
  
  ui.createMenu("View Details").addItem("GetInternshipApplications", "getGmailEmails").addToUi();
  
}
function getGmailEmails(){
  //var input = ui.prompt('Label Name', 'Enter the label name that is assigned to your emails:', Browser.Buttons.OK_CANCEL);
  
  //if (input.getSelectedButton() == ui.Button.CANCEL){
  //  return;
  //}
  //
  
  var label = GmailApp.getUserLabelByName("InternshipGoogleScrap");
  var threads = label.getThreads();
  
  for(var i = threads.length - 1; i >=0; i--){
    var messages = threads[i].getMessages();
    
    for (var j = 0; j <messages.length; j++){
      var message = messages[j];
      if (message.isUnread()){
        extractDetails(message);
        GmailApp.markMessageRead(message);
      }
    }
    threads[i].removeLabel(label);
    
  }
  
}

function detectURLs(message) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.match(urlRegex)
}

function extractDetails(message){

  //var dateTime =message.getDate();
  var subjectText = message.getSubject();
  
  var ind_temp = subjectText.lastIndexOf("New application:") +16;
  var ind = subjectText.lastIndexOf("from");
  var sub1 = subjectText.slice(ind+4);
  var sub2 = subjectText.slice(ind_temp,ind);
  //var senderDetails = message.getFrom();
  var bodyContents = message.getPlainBody();
  var index_ = bodyContents.lastIndexOf("Phone:")+7;
  var phoneno = bodyContents.slice(index_,index_+13);
  const my_arr = detectURLs(bodyContents);
  let resume = my_arr[0];


  var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  //activeSheet.appendRow([dateTime, senderDetails, sub1, bodyContents]);
  activeSheet.appendRow([ sub2,sub1,phoneno,resume]);
}




