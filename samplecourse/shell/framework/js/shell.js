/**********Variables Declaration************************/
var developerMode="";
var totalLanguages=0;
var langArr=["English","French","Bahasa"];
var languagesArr=[];
var courseTitlesArr=[];
var durationArr=[];
var courseName;
var moduleName;
var courseType;
var poster; // newly added for centralized method
var introvideo; // newly added for centralized method
var continueTxt; // newly added for centralized method
var courseId;
var selectedLang="";
var completionState = 0;
var suspenddata="";
var clickableItem=true;
var bkModule=0;
var bkPage=0;
var bkdatastring="";
var OSStatus=false;
var bkBookmarkpages="";
var courseArray;
var courseCompletion;
var showChar = 46;  // How many characters are shown by default
var ellipsestext = "...";
var ellipsestextmod = "...";
var moretext = "more";
var lesstext = "less";
var moretextmod = "more";
var lesstextmod = "less";
/**********Document Initialization**********************/
$(document).ready(function(){
	/**********Initializing Media(Device) CSS**************/
 
	
	fnLoadXML();
	if((navigator.userAgent.match(/Windows/i))) 
	{
		$(".OSobject").prepend("<object class='winIcon'	data='shell/framework/images/Windows_Icon.svg'></object>");
		$(".OSName").html("Windows");
		OSStatus=true;
		
	}else if((navigator.userAgent.match(/iPad/i)))
	{
		$(".OSobject").prepend("<object class='ipadIcon' data='shell/framework/images/ipad_Icon.svg'></object>");
		$(".OSName").html("iPad");
		OSStatus=true;
	}else if((navigator.userAgent.match(/iPhone/i)))
	{
		$(".OSobject").prepend("<object class='iPhoneIcon' data='shell/framework/images/iPhone_Icon.svg'></object>");
		$(".OSName").html("iPhone");	
		OSStatus=true;
	}else if((navigator.userAgent.match(/Mac/i)))
	{
		$(".OSobject").prepend("<object class='MacIcon' data='shell/framework/images/mac_Icon.svg'></object>");
		$(".OSName").html("Macintosh");
		OSStatus=true;
	}else if((navigator.userAgent.match(/Android/i)))
	{
		$(".OSobject").prepend("<object class='AndroidIcon' data='shell/framework/images/android_Icon.svg'></object>");
		$(".OSName").html("Android");
		OSStatus=true;
	}else
	{
		$(".OSobject").prepend("<object class='unKnownIcon' data='shell/framework/images/unKnown_Icon.svg'></object>");
		$(".OSName").html("UnKnown Os");
		OSStatus=false;
	} 
	var browserName  = navigator.appName;
	var fullVersion  = ''+parseFloat(navigator.appVersion); 
	var majorVersion = parseInt(navigator.appVersion,10);
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserStatus=false;
	 var checkIEversion;
	 function Check_Version(){
		var rv = -1; // Return value assumes failure.
		if (navigator.appName == 'Microsoft Internet Explorer'){
		   var ua = navigator.userAgent,
			   re  = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
		   if (re.exec(ua) !== null){
			 rv = parseFloat( RegExp.$1 );
		   }
		}
		else if(navigator.appName == "Netscape"){                       
		   if(navigator.appVersion.indexOf('Trident') === -1) rv = 12;
		   else rv = 11;
		}       
		return rv;          
	}
	if ((verOffset=nAgt.indexOf("MSIE"))!=-1 || !!navigator.userAgent.match(/Trident./) || !!navigator.userAgent.match(/Edge./)) {
		 browserName = "Explorer";
		checkIEversion=Check_Version();
		fullVersion=checkIEversion;
		majorVersion=fullVersion;
	}
	// In Opera, the true version is after "Opera" 
	else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
	 browserName = "Opera";
	 fullVersion = nAgt.substring(verOffset+6);
	 trimData();
	}
	// In Chrome, the true version is after "Chrome" 
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
	 browserName = "Chrome";
	 fullVersion = nAgt.substring(verOffset+7);
	 trimData();
	}
	// In Safari, the true version is after "Safari" 
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
	 browserName = "Safari";
	 fullVersion = nAgt.substring(verOffset+7);
	 trimData();
	}
	// In Firefox, the true version is after "Firefox" 
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
	 browserName = "Firefox";
	 fullVersion = nAgt.substring(verOffset+8);
	 trimData();
	}
	// In most other browsers, "name/version" is at the end of userAgent 
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) 
	{
	 browserName = nAgt.substring(nameOffset,verOffset);
	 fullVersion = nAgt.substring(verOffset+1);
	 if (browserName.toLowerCase()==browserName.toUpperCase()) {
	  browserName = navigator.appName;
	 }
	 trimData();
	}
	// trim the fullVersion string at semicolon/space if present
	function trimData()
	{
		if ((ix=fullVersion.indexOf(";"))!=-1) fullVersion=fullVersion.substring(0,ix);
		if ((ix=fullVersion.indexOf(" "))!=-1) fullVersion=fullVersion.substring(0,ix);
		majorVersion = parseInt(''+fullVersion,10);
		if (isNaN(majorVersion)) {
		 fullVersion  = ''+parseFloat(navigator.appVersion); 
		 majorVersion = parseInt(navigator.appVersion,10);
		}
	}
	if(browserName == "Firefox"){
		if(majorVersion >=45){
			browserStatus = true;
			$(".browseobject").prepend("<object class='' data='shell/framework/images/Firefox_Icon.svg'></object>");
			$(".browseName").html("Firefox "+majorVersion);
		}else{
			$(".browseobject").prepend("<object class='' data='shell/framework/images/Firefox_Icon.svg'></object>");
			$(".browseName").html("Firefox "+majorVersion);
		}
	}		
	if(browserName == "Chrome"){
		if(majorVersion >=45){
			browserStatus = true;
			$(".browseobject").prepend("<object class='' data='shell/framework/images/Chrome_Icon.svg'></object>");
			$(".browseName").html("Chrome "+majorVersion);
		}else{
			$(".browseobject").prepend("<object class='' data='shell/framework/images/Chrome_Icon.svg'></object>");
			$(".browseName").html("Chrome "+majorVersion);
		}
	}			
 	if(browserName == "Explorer"){
		if(majorVersion >=9){
			$(".browseobject").prepend("<object class='winIcon'	data='shell/framework/images/IE_Icon.svg'></object>");
			if(majorVersion==12)
			{
				$(".browseName").html("IE Edge");
			}else{
				$(".browseName").html("Explorer "+majorVersion);
			}
			browserStatus = true;
		}else{
			//browserStatus = false;
			$(".browseobject").prepend("<object class='winIcon'	data='shell/framework/images/IE_Icon.svg'></object>");
			$(".browseName").html("Explorer "+majorVersion);
		}
	}
	if(browserName == "Safari"){
		if(majorVersion >=500){
			browserStatus = true;
			$(".browseobject").prepend("<object class='winIcon'	data='shell/framework/images/Safari_Icon.svg'></object>");
			$(".browseName").html("Safari "+majorVersion);
		}else{
			$(".browseobject").prepend("<object class='winIcon'	data='shell/framework/images/Safari_Icon.svg'></object>");
			$(".browseName").html("Safari "+majorVersion);
		}
	}
	function popupsAllowed() {
		var allowed = false;
		var w = window.open("about:blank","","directories=no,height=1,width=1,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,left=0,top=0,location=no");
		if (w) {
			allowed = true;
			w.setTimeout('window.close();',1000);
			w.close();
		}
		return allowed;
	}
	var popups = popupsAllowed();
	var screenResStatus=false;
	var popupStatus = false;
/* 	if((navigator.userAgent.match(/Windows/i))) 
	{
		if(screen.width>=1280 && screen.width<3072){
			screenResStatus = true;
			if(screen.height<768) {
				screenResStatus = false;
			} else {
				screenResStatus = true;
			}
		}
		else{
			screenResStatus = false;
		}
	}else
	{
		if( screen.width<1000 && screen.height<300){
			screenResStatus = false;
		}else{
			screenResStatus = true;
		}				
	} */
	if(popups == false){
		popupStatus = false;
		$(".popObject").html("Pop-up Disabled");		
	}else{
		popupStatus = true;
		$(".popObject").html("Pop-up Enabled");	
	}	 
	$(".resObject").html(screen.width+' x '+screen.height);    

	 if(popupStatus)
	{
		fnLoadIntroVideo()	
		//alert(screen.width+" ::: "+screen.height)
	}/*else{
	
		if(screen.width<=1366 && screen.height<=768 && OSStatus && browserStatus && popupStatus) {
			 
			$(".minreqCont").html('<div id="startBtn" style="font-weight: 800; width: 100px; margin: 0 auto; font-size: 150%; background: #EA3722; padding: 5px 0px; border: 1px solid #EA3722; border-radius: 3px; cursor: pointer; color: #FFF;">Start</div>').show();
			$('.req_container').show();
			$(".resolutionInfo").show();
			$(".minreqContText").html('This system failed to meet the recommended screen resolutions to view the course. The course will have alignment and distortion issues in this system environment. Clicking on the Start button will launch the course with these known issues.').show();
			$(".min_req").show();
		} else if (screen.width<=3072 && screen.height<=1728 && OSStatus && browserStatus && popupStatus){
			$(".minreqCont").html('<div id="startBtn" style="font-weight: 800; width: 100px; margin: 0 auto; font-size: 150%; background: #EA3722; padding: 5px 0px; border: 1px solid #EA3722; border-radius: 3px; cursor: pointer; color: #FFF;">Start</div>').show();
			$('.req_container').show();
			$(".resolutionInfo").show();
			$(".minreqContText").html('The course will have alignment and distortion issues in this system environment. Clicking on the Start button will launch the course with these known issues. Its recommended to set display as 150% to expereince better view.').show();
			$(".min_req").show();
		}  
		else {
			if(device.iPad() || device.MobileDevice())
			{
				fnLoadIntroVideo()
			}else{
				$(".minreqCont").show();
				$('.req_container').show();
				$(".minreqContText").show();
				$(".min_req").show();
				if(!OSStatus)
				{
					$(".OSInfo").show();
				}
				if(!browserStatus)
				{
					$(".browserInfo").show();
				}
				if(!popupStatus)
				{
					$(".popupInfo").show();
				}
				if(!screenResStatus)
				{
					$(".resolutionInfo").show();
				} 
			}
		}
	} */
	$(".req_button").on("click", function(){
		$(".req_button").toggleClass('plus');
		$('.req_content').slideToggle();
		$('body').css('overflow-y','auto');
	});
	$("#startBtn").on("click", function(){
		fnLoadIntroVideo()
	});
});
function fnUpdateCourseRunInfo(){
	$(".courseRunInfo").html("Please Exit the course and relaunch again!");
}
function fnLoadIntroVideo(){
		$(".heading1").hide();
		$(".minreqCont").hide();
		$('.req_container').hide();
		$(".minreqContText").hide();
		$(".min_req").hide();
		$(".video_container").show();	
		var vid = document.getElementById("introVideo");
		var playButton = document.getElementById("play-pause");
		if(device.MobileDevice())
		{
			$("#introVideo").attr("controls","controls");
			$("#play-pause").hide();
			$("#custom-seekbar").hide();
			$('#play-pause').addClass('pause').removeClass('play');
		
		}else if(device.iPad()){
			$('#play-pause').addClass('pause').removeClass('play');
		}else{
			vid.play();
		}
		vid.ontimeupdate = function(){
		  var percentage = ( vid.currentTime / vid.duration ) * 100;
		  $("#custom-seekbar span.time-current").css("width", percentage+"%");
			if($("#custom-seekbar span.time-current").width()>=$("#custom-seekbar").width())
			 {
			$("#custom-seekbar span.time-handle").css('left',$("#custom-seekbar").width()-6);
			 } else {
			$("#custom-seekbar span.time-handle").css({"left": percentage+"%"});
			 }
		};		
		playButton.addEventListener("click", function() {
 		 
			if (vid.paused == true) {
				vid.play();
				$('#play-pause').addClass('play').removeClass('pause');
			} else {		
				vid.pause();
				$('#play-pause').addClass('pause').removeClass('play');
			}  
		});	
		vid.addEventListener('ended', function() {
			$('#play-pause').addClass('pause').removeClass('play');
		});	
		$(".continue_btn").on("click", function(){
			vid.pause();
			$('#play-pause').addClass('pause').removeClass('play');
			$(".modulepopupLogout").hide();
			selectedLang=languagesArr[0];
			fnWin();
		});
		$("#custom-seekbar").on("click", function(e){
			var offset = $(this).offset();
			var left = (e.pageX - offset.left);
			var totalWidth = $("#custom-seekbar").width();
			var percentage = ( left / totalWidth );
			var vidTime = vid.duration * percentage;
			vid.currentTime = vidTime;
		}); 
}
var totalLanguages=0;
function fnLoadXML(){
	$.get('course/config.xml', function(data){
		developerMode = $(data).find("config").attr('developerMode');
		courseType=$(data).find('packagetype').text();
		courseName=$(data).find('CourseName').text();
		courseId=$(data).find('CourseId').text();
		poster = "course/content_"+$(data).find("lan").text()+"/"+$(data).find('intro').attr('poster');
		introvideo = "course/content_"+$(data).find("lan").text()+"/"+$(data).find('intro').attr('video');
		continueText = $(data).find('continueText').text();  
		$(".modulecontinue_clkbtn").html(continueText);
		$(".courseName").html(courseName);
		$("#introVideo").attr("poster", poster);
		$("#introVideo source").attr("src", introvideo);
		totalLanguages=$(data).find('languages').children().length;
		$("#introVideo").load(); 
		$(data).find("lang").filter(function(ind,val){
			$(this).each(function(){
				$(val).children().each(function(key,value){
					if($(this).prop("tagName")=="lan"){
						languagesArr.push($(this).text());
					}else if($(this).prop("tagName")=="CourseLangName"){
						courseTitlesArr.push($(this).text());
					}else if($(this).prop("tagName")=="Duration"){
						durationArr.push($(this).text());
					}
				});
			});
		});
	}).promise().done(function () {
	initSco();
	suspenddata=getBookMark(); 
	if(suspenddata!="")
	{
		selectedLang=suspenddata.split("^")[0];
		bkModule=suspenddata.split("^")[1];
		bkPage=suspenddata.split("^")[2];
		bkdatastring=suspenddata.split("^")[3];
		bkBookmarkpages=suspenddata.split("^")[4];
	}
	$(".magnifyme").html("");
		$.each(languagesArr, function(key,value) {			
			if(suspenddata!=""){
				if(value==selectedLang){
					var tmpNum=languagesArr.indexOf(selectedLang);
					$(".magnifyme").append('<div class="cover"><div class="country"><img data-name="'+(tmpNum+1)+'" src="shell/framework/images/engine.png"/><div class="slider_grey_bg"><h1>'+courseTitlesArr[tmpNum]+'</h1><div class="light_grey"><img src="shell/framework/images/arw.png"></img><h3>'+langArr[tmpNum]+'</h3><div class="clear"></div></div><p></p></div><div class="clear"></div></div></div>');
				}
				$(".silde_dots").hide();
			}else{	
				if(value!="en")
				{
					$(".magnifyme").append('<div class="cover disabledLangBtn"><div class="country"><img data-name="'+(key+1)+'" src="shell/framework/images/engine.png"/><div class="slider_grey_bg"><h1>'+courseTitlesArr[key]+'</h1><div class="light_grey"><img src="shell/framework/images/arw.png"></img><h3>'+langArr[key]+'</h3><div class="clear"></div></div><p>'+modDescArr[key]+'</p></div><div class="clear"></div></div></div>');
				}else{	
					$(".magnifyme").append('<div class="cover"><div class="country"><img data-name="'+(key+1)+'" src="shell/framework/images/engine.png"/>	<div class="slider_grey_bg"><h1>'+courseTitlesArr[key]+'</h1><div class="light_grey"><img src="shell/framework/images/arw.png"></img><h3>'+langArr[key]+'</h3><div class="clear"></div></div><p></p></div><div class="clear"></div></div></div>');
				}
			}	
		}); 
		setTimeout(function(){
			$("div.magnifyme").coverflow();
			if(suspenddata!="")
			{
				fnCompletionArr(bkdatastring);
			}
			$('.cover').each(function(index) {
				
				$(this).click(function()
				{ 
					if($(this).hasClass("current"))
					{
						if(clickableItem)
						{
							if(!$(this).hasClass("disabledLangBtn"))
							{
								if(suspenddata==""){
									selectedLang=languagesArr[index];
								}
								fnWin();
							}else{
								alert("This language doesn't have contents. Please choose another language.")
							}
						}else{
							$('.silde_dots li').removeClass("active");
							$('.silde_dots li').eq(index).addClass("active");	
						}						
					}
				});
			}); 
			if(device.MobileDevice() == true || device.iPad() == true){
			 $(".title, .title h1, .title h3").css("white-space", "normal");
  	 $(".inner_container .title h3").css("width", "100%");
 	 $(".title, .title h1, .title h3").css("overflow", "");
	 $(".title, .title h1, .title h3").css("text-overflow", "");
	 $(".title1-h3").css("text-overflow", "ellipsis");
	/*  $(".title1-h3").css("white-space", "inherit"); */
	 $(".title1-h3").css("white-space", "normal");
        var content = $(".courseName").html();
         if(content.length > showChar) {
           var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span><b>' + h + '</b></span>&nbsp;&nbsp;<a href="" class="morelink"><b>' + moretext + '</b></a></span>';
             $(".courseName").html(html);
        }
 
    
 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);			
        } else {
             $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
	 var contentmod = $(".courseName").html();
         if(contentmod.length > showChar) {
           var cc = contentmod.substr(0, showChar);
            var hh = contentmod.substr(showChar, contentmod.length - showChar);
 
            var htmlmod = cc + '<span class="moreellipses">' + ellipsestextmod+ '&nbsp;</span><span class="morecontent"><span>' + hh + '</span>&nbsp;&nbsp;<a href="" class="morelinkmod">' + moretextmod + '</a></span>';
             $(".wrapper_header .moduleName").html(htmlmod);
        }
	 $(".morelinkmod").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretextmod);			
        } else {
		 
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });

			}
 			$(".courseName").mouseover(function(){
			if(window.innerWidth >= 2560 && window.innerHeight <=1353){
			if($(this).text().length > 55){			
			$(".tooltip").html(courseName)
			$(".tooltip").css("opacity", "1")
			$(".tooltip").css("visibility", "visible")
					 }
					 else {
					 $(".tooltip").css("visibility", "hidden")
					$(".tooltip").css("opacity", "0")
					 }
					 }
			if(window.innerWidth >= 1707 && window.innerHeight <=873){
			if($(this).text().length > 55){			
			$(".tooltip").html(courseName)
			$(".tooltip").css("opacity", "1")
			$(".tooltip").css("visibility", "visible")
					 }
					 else {
					 $(".tooltip").css("visibility", "hidden")
					$(".tooltip").css("opacity", "0")
					 }
				
				}
				if(window.innerWidth >= 1366 && window.innerHeight <=780){
				if($(this).text().length > 55){			
			$(".tooltip").html(courseName)
			$(".tooltip").css("opacity", "1")
			$(".tooltip").css("visibility", "visible")
					 }
					 else {
					 $(".tooltip").css("visibility", "hidden")
					$(".tooltip").css("opacity", "0")
					 }
				
				}
				if(window.innerWidth >= 1920 && window.innerHeight <=985){
				 
				if($(this).text().length > 55){			
			$(".tooltip").html(courseName)
			$(".tooltip").css("opacity", "1")
			$(".tooltip").css("visibility", "visible")
					 }
					 else {
					 $(".tooltip").css("visibility", "hidden")
					$(".tooltip").css("opacity", "0")
					 }
				
				}
					 
			})
			$(".courseName").mouseout(function(){
			 $(".tooltip").css("visibility", "hidden")
			})
			$('.silde_dots li').eq(1).addClass("active");	
			$('.silde_dots li').eq(1).css("cursor","default");			
			$('.silde_dots li').each(function(index) {
				$(this).click(function()
				{ 
					if(!$(this).hasClass("active"))
					{
						$('.cover').eq(index).trigger("click");
						$('.silde_dots li').removeClass("active");
						$('.silde_dots li').css("cursor","pointer");		
						$(this).addClass("active");
						$(this).css("cursor","default");		
					}
				});
			});
			$('#preloader').hide();
		},300); 
	}); 	
}
function fnCompletionArr(aTempArr)
{	
	if(aTempArr.indexOf("|") != -1){
		aTempArr = aTempArr.split("|").toString().split(",");	
	}	
	else{
		aTempArr = aTempArr.toString().split(",");	
	}
	completionState = 0;
	for (i = 0; i < aTempArr.length; i++) {
        if (aTempArr[i] == 1) {
            ++completionState;
       }
    }
	var completionPercent = Math.floor((completionState / aTempArr.length) * 100);
	$('.cover.current .slider_grey_bg h4 span').text(completionPercent + '%');
	$('.cover.current .course-progress .courseSlide').css({'width': completionPercent + '%', 'background':'#f5570b', 'height':'2px'});
	// newly added for tracking issue fixes
	/* if(completionPercent==100)
	{
		markStatus("completed");
	}else{
		markStatus("incomplete");
	} */
}
function fnUpdateSuspendData()
{
	suspenddata=selectedLang+"^"+bkModule+"^"+bkPage+"^"+bkdatastring+"^"+bkBookmarkpages;
	//set_location(suspenddata);
	// newly added for tracking issue fixes
	courseArray = bkdatastring.toString().split(",");
	courseCompletion = 0;
	for(i=0; i<courseArray.length; i++) {
		if(courseArray[i] == 1 || courseArray[i] == "") {
			courseCompletion++;
		}
	}
	if(courseCompletion==courseArray.length)
	{
		markStatus("completed",suspenddata);
	}else{
		markStatus("incomplete",suspenddata);
	}
}
 
/******************************************************/