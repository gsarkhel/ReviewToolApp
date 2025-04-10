var findAPITries = 1;
//var API = null;
var timerID = null;
var timerRunning = false;
var startDate;
var startSecs;
var timeValue = "00:00:00";
var timecnt = 0;
var lessonStatus = false;
var Bookmark_location = "";
var completionStatus = "incomplete";
var SetMasteryScore = 100;
var prevLesson_Status = "";
var gpercentage = "";
var ok1 = 0;
var scorm_version = "1.2";
var user_name = "";

const queryparams = new Proxy(
    new URLSearchParams(window.location.search),
    {
      get: (searchParams, prop) => searchParams.get(prop),
    }
  );
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
var isDebugMode = queryparams.access_token !== null;
/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for find the scorm Version--------------------------------------------------------*/
function fnScormVersion(win) {
  //while ((win.API_1484_11 == null||(win.API == null)) && (win.parent != null) && (win.parent != win)) // old code
  while (
    win.API_1484_11 == null &&
    win.API == null &&
    win.parent != null &&
    win.parent != win
  ) {
    // client updates
    findAPITries++;
    if (findAPITries > 500) {
      return null;
    }
    win = win.parent;
  }
  if (win.API_1484_11) {
    scorm_version = "2004";
  } else if (win.API) {
    scorm_version = "1.2";
  }
  initSco();
}
/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for find the API------------------------------------------------------------------*/
function FindAPI(win) {
  // Check to see if the window (win) contains the API
  // if the window (win) does not contain the API and
  // the window (win) has a parent window and the parent window
  // is not the same as the window (win)
  while (win.API == null && win.parent != null && win.parent != win) {
    // increment the number of findAPITries
    findAPITries++;

    // Note: 7 is an arbitrary number, but should be more than sufficient
    if (findAPITries > 7) {
      alert("Error finding API -- too deeply nested.");
      return null;
    }

    // set the variable that represents the window being
    // being searched to be the parent of the current window
    // then search for the API again
    win = win.parent;
  }
  return win.API;
}
/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for get the API-------------------------------------------------------------------*/
function GetAPI() {
  if (!isDebugMode) {
    // start by looking for the API in the current window
    var theAPI = FindAPI(window);

    // if the API is null (could not be found in the current window)
    // and the current window has an opener window
    if (
      theAPI == null &&
      window.opener != null &&
      typeof window.opener != "undefined"
    ) {
      // try to find the API in the current window’s opener
      theAPI = FindAPI(window.opener);
    }
    // if the API has not been found
    if (theAPI == null) {
      // Alert the user that the API Adapter could not be found
      //alert("Unable to find an API adapter");
    }
    return theAPI;
  }
  return null;
}
/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for Initializing the scorm--------------------------------------------------------*/
function initSco() {
  console.log(" :: initSco :: ");

  API = GetAPI();
  if (API != null) {
    var ret;
    var code;
    var diag;
    if (scorm_version == "2004") {
      API.Initialize("");
      set_val("cmi.score.max", 100);
      set_val("cmi.score.min", 0);

      var status = get_val("cmi.completion_status");
    } else {
      API.LMSInitialize("");
      set_val("cmi.core.score.max", 100);
      set_val("cmi.core.score.min", 0);
      //set_val("cmi.core.score.raw",0);
      var status = get_val("cmi.core.lesson_status");
    }
    startclock();
    if (status == "not attempted") {
      if (scorm_version == "2004") {
        set_val("cmi.completion_status", "incomplete");
      } else {
        set_val("cmi.core.lesson_status", "incomplete");
        //set_val("cmi.core.success_status","failed");
      }
      Bookmark_location = "";
    } else {
      if (scorm_version == "2004") {
        Bookmark_location = get_val("cmi.suspend_data");
      } else {
        Bookmark_location = get_val("cmi.suspend_data");
      }
    }
    if (scorm_version == "2004") {
      user_name = get_val("cmi.learner_name");
      //var s_data  = String(get_val("cmi.suspend_data"));
    } else {
      user_name = get_val("cmi.core.student_name");
      //var s_data  = String(get_val("cmi.suspend_data"));
    }

    if (scorm_version == "2004") {
      code = API.GetLastError();
      ret = API.GetErrorString(code);
      diag = API.GetDiagnostic("");
    } else {
      code = API.LMSGetLastError();
      ret = API.LMSGetErrorString(code);
      diag = API.LMSGetDiagnostic("");
    }
  }
}
/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for set the LMS data--------------------------------------------------------------*/
function set_val(gname, gvalue) {
  API = GetAPI();
  if (API != null) {
    var ret;
    var code;
    var diag;

    if (scorm_version == "2004") {
      API.SetValue(gname, gvalue);
      code = API.GetLastError();
      ret = API.GetErrorString(code);
      diag = API.GetDiagnostic("");
    } else {
      console.log(
        " :: SCORM SET :: " +
          gname +
          " :: SCORM SET::  " +
          gvalue +
          " :: SCORM typeof::  " +
          typeof gvalue
      );
      API.LMSSetValue(gname, gvalue);
      code = API.LMSGetLastError();
      ret = API.LMSGetErrorString(code);
      diag = API.LMSGetDiagnostic("");
    }
  }
  commit();
}
function sendValueToLMS() {
  API = GetAPI();
  if (API != null) {
    console.log(
      " :: SCORM Bookmark_location :: " +
        Bookmark_location +
        " :: SCORM completionStatus::  " +
        completionStatus +
        " :: SCORM timeValue::  " +
        timeValue
    );
    if (scorm_version == "2004") {
      //set_val("cmi.score.raw",score);
      API.SetValue("cmi.suspend_data", Bookmark_location);
      API.SetValue("cmi.completion_status", completionStatus);
      API.Commit("");
    } else {
      //set_val("cmi.core.score.raw",score);
      API.LMSSetValue("cmi.suspend_data", Bookmark_location);
      API.LMSSetValue("cmi.core.lesson_status", completionStatus);
      API.LMSSetValue("cmi.core.session_time", timeValue);
      API.LMSCommit("");
      //set_val("cmi.core.success_status", successStatus);
    }
  }
}

/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for get the data from LMS---------------------------------------------------------*/
function get_val(gname) {
  API = GetAPI();
  if (API != null) {
    var ret1, ret2;
    var code;
    var diag;
    if (scorm_version == "2004") {
      ret1 = API.GetValue(gname);
      code = API.GetLastError();
      ret2 = API.GetErrorString(code);
      diag = API.GetDiagnostic("");
    } else {
      ret1 = API.LMSGetValue(gname);
      code = API.LMSGetLastError();
      ret2 = API.LMSGetErrorString(code);
      diag = API.LMSGetDiagnostic("");
      console.log(" :: SCORM GET :: " + gname + " :: SCORM GET::  " + ret1);
    }
    return ret1;
  }
}

/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for Commit each LMS calls---------------------------------------------------------*/
function commit() {
  API = GetAPI();
  console.log("commit API:::" + API);
  if (API != null) {
    var ret = "";
    var code;
    var diag;

    if (scorm_version == "2004") {
      API.Commit("");
      code = API.GetLastError();
      ret = API.GetErrorString(code);
      diag = API.GetDiagnostic("");
    } else {
      API.LMSCommit("");
      code = API.LMSGetLastError();
      console.log("commit code:::" + code);
      ret = API.LMSGetErrorString(code);
      console.log("commit ret:::" + ret);
      diag = API.LMSGetDiagnostic("");
    }
  }
}
/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for Terminate the LMS Calls-------------------------------------------------------*/
function exit() {
  console.log("exit");
  API = GetAPI();

  if (API != null) {
    var ret;
    var code;
    var diag;
    sTime = stopclock();
    sTime = String(sTime);
    if (scorm_version == "2004") {
      ret = API.Terminate("");
      code = API.GetLastError();
      ret = API.GetErrorString(code);
      diag = API.GetDiagnostic("");
    } else {
      ret = API.LMSFinish("");
      code = API.LMSGetLastError();
      ret = API.LMSGetErrorString(code);
      diag = API.LMSGetDiagnostic("");
    }
  }
}
/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for Start the timer---------------------------------------------------------------*/
function startclock() {
  showtime();
}
/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for Stop the timer----------------------------------------------------------------*/
function stopclock() {
  clearTimeout(timerID);
  return timeValue;
}
/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for calculate time----------------------------------------------------------------*/
function showtime() {
  timecnt++;
  var newElapsedTime;
  var hours = Math.floor(timecnt / 3600);
  newElapsedTime = timecnt - hours * 3600;

  var minutes = Math.floor(newElapsedTime / 60);
  newElapsedTime = newElapsedTime - minutes * 60;

  var seconds = newElapsedTime;

  timeValue = "" + hours;
  if (hours < 10) {
    timeValue = "0" + hours;
  }
  timeValue += (minutes < 10 ? ":0" : ":") + minutes;
  timeValue += (seconds < 10 ? ":0" : ":") + seconds;

  timerID = setTimeout("showtime()", 1000);
}
/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for Get the student Name----------------------------------------------------------*/
function fnGetStudentName() {
  if (scorm_version == "2004") {
    var studentName_lms = get_val("cmi.learner_name");
    return studentName_lms;
  } else {
    var studentName_lms = get_val("cmi.core.student_name");
    return studentName_lms;
  }
}

// Below Three functions are communicating with course. we can customize these function to accommodate with course.

/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for update the bookmark status----------------------------------------------------*/
function set_location(setbookmark) {
  Bookmark_location = setbookmark;
  if (scorm_version == "2004") {
    set_val("cmi.suspend_data", Bookmark_location);
  } else {
    set_val("cmi.suspend_data", Bookmark_location);
  }
}
/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for mark the completion status----------------------------------------------------*/

function markStatus(cStatus, B_location) {
  if (Bookmark_location != B_location) {
    console.log(" :: Bookmark_location :: ");
    Bookmark_location = B_location;
    completionStatus = cStatus;
    sendValueToLMS();
  } else if (completionStatus != cStatus) {
    console.log(" :: completionStatus :: ");
    Bookmark_location = B_location;
    completionStatus = cStatus;
    sendValueToLMS();
  }
}
/*-------------------------------------------------###############################-------------------------------------------------------------
--------------------------------------------------Function for mark the completion status----------------------------------------------------*/
function getBookMark() {
  return Bookmark_location;
}
/*-------------------------------------------------##############$End$#################------------------------------------------------------*/
//fnScormVersion(window);
