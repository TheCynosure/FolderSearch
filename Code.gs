var characterCount = 0;
var wordCount = 0;
var docCount = 0;
var totalText = "";
var eFolders;

//Adds a trigger so on startup the menu will be added
function addOnOpenTrigger() {
  var doc = DocumentApp.getActiveDocument();
  ScriptApp.newTrigger("onOpen").forDocument(doc).onOpen().create();
}

//Creates the custom menu
function onOpen() {
 var ui = DocumentApp.getUi();
 ui.createMenu("Folder search").addItem("Custom search", 'main').addToUi();
}


function main() {
  var ui = DocumentApp.getUi();
  //Prompt for Folder name
  var response = ui.prompt("Folder Search", "Folder Name ('ROOT_' for root folder)", ui.ButtonSet.OK_CANCEL);
  if(response.getSelectedButton().OK) {
    //Prompt for excluded folders
    var excludedFolders = ui.prompt("Folder Search Exclusion", "Any folders you don't want me to search? (Use space to seperate folder names)", ui.ButtonSet.YES_NO);
    var folderName = response.getResponseText();
    //Only make excluded folders if they said yes
    if(excludedFolders.getSelectedButton().YES) {
      eFolders = excludedFolders.getResponseText().split(" ");
    }
    var folders;
    //Check if the User wanted to search the root directory.
    if(folderName == "ROOT_") {
      //If so then set the folders to be searched as the root one.
      folders = DriveApp.getRootFolder().getFolders();
      folderName = "ROOT"
    } else {
      //Else just use the name inputted
      folders = DriveApp.getFoldersByName(folderName);
    }
    while(folders.hasNext()) {
      //Getting the folder
      var folder = folders.next();
      //Call the initial recursive call.
      folderSearch(folder);
    }
    var pageCount = wordCount / 250;
    ui.alert("Scanned " + folderName + "\n" + "Documents Scanned: " + docCount + "\n" + "Approximate Total Pages (12pt, Times New Roman, Double Spaced): " + "\n" + pageCount + "\n" + "Total Characters: " + characterCount + "\n" + "Total Words: " + wordCount + "\n\n" + "Folders Accessed:" + "\n" + totalText);
  }
}

//Checks if the folder is allowed to be searched.
//True if not allowed, false if allowed
function isExcluded(name) {
  for(i = 0; i < eFolders.length; i++) {
    if(eFolders[i] == name) {
     return true; 
    }
  }
  return false;
}

//Recursive function to search the foldesr.
function folderSearch(folder) {
  //Makes sure that it is able to search
  if(!isExcluded(folder)) {
    //Grabs all child folders
    var subFolders = folder.getFolders();
    //Searches them
    while(subFolders.hasNext()) { 
      folderSearch(subFolders.next());
    }
    //Then grabs all child documents
    var subDocuments = folder.getFiles();
    //Records that we searched this folder
    totalText += folder.getName() + "\n";
    //Reads all the children documents
    while(subDocuments.hasNext()) {
      var next = subDocuments.next();
      //Makes sure the document is actually a google doc
      if(next.getMimeType() == MimeType.GOOGLE_DOCS) {
        //Open the document
        var doc = DocumentApp.openById(next.getId());
        //Count the characters
        characterCount += doc.getBody().getText().length;
        //Split into a space seperated array, each element is a word.
        wordCount += doc.getBody().getText().split(" ").length;
        //Record that we accessed a document
        docCount++;
      }
    }
  }
}
