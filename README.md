# FolderSearch
A small extension for Google drive that searches the specified folder and returns some statistics

### How to run

The following commands are buttons to click. Open a google doc in your drive.

```
Tools > Script editor
```

You will be taken to a new window. In the top right corner click: `Use Legacy Editor`.

If prompted to switch back to the new editor, click `Dismiss`.

Then copy and paste the raw contents of the `Code.gs` file in this repository into the editor.

Rename the project by clicking `Untitled Project`, rename it to `FolderSearch`.

Then click the drop down `Select function` and select `main`.

Then hit the save button.

Then do the following:

```
Run > Test as add-on...
Lastest Code
Test
```

The document will reopen, then finally:
```
Add-ons > Folder Search > Custom Search
```

Enter ROOT_ for all files in the google drive, or enter the name of any of the base level folders. Then on the next window enter all the folders you want to exclude, these don't have to be base level folders.
