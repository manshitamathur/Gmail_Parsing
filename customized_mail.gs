function sendMails() {

var wrkBk = SpreadsheetApp.getActiveSpreadsheet(); 
var wrkShtEmailIDs = wrkBk.getSheetByName("Email_ID");
var wrkShtMessage = wrkBk.getSheetByName("Mail_Details");

var subject = wrkShtMessage.getRange ('A2').getValue();
var message = wrkShtMessage.getRange ( 'B2' ).getValue();

for (var i=2;i<=5;i++){

var fname = wrkShtEmailIDs.getRange('A' + i).getValue();
var lname = wrkShtEmailIDs.getRange( 'B' + i).getValue(); 
var emailAddress= wrkShtEmailIDs.getRange ('C'+i).getValue();


var finalmsg="";

finalmsg= "Hi " + fname + " "+ lname +"" + "\n" + message;


MailApp.sendEmail(emailAddress, subject, finalmsg);

}
}