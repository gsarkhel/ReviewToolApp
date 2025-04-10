/**********Variables Declaration************************/
var courseType="course";
var currLang;
var totalModules=0;
var totalPages=[]; 
var currModule=0;
var currPageNum=1;
var pagesArray=[]; //page path
var pageTypeArray=[];//page Type(2d_ani / Obj / txtImg..)
var pageGroupArray=[];//page Grup Type(cont / cyu)
var pageAssetsArray=[];//Page preload asset js file.
var subPagesArray=[];//Sub page path
var subPageTypeArray=[];//Sub page Type(2d_ani / Obj / txtImg..)
var subPageGroupArray=[];//Sub page Grup Type(cont)
var pageCompletionArray=[];//No of pages per module with the value 0 and based on completion is 1.
var subPageCompletionArray=[];//No of sub pages per module with the value 0 and based on completion is 1.
var bookmarkpagesArray=[];//Bookmark popup saved page numbers
var ModTitles=[];//Module Titles 
var ModDurations=[];//Module Durations 
var ModImages=[];//Module Images 
var pageTitlesArr=[];//Page Titles
var subPageTitlesArr=[];//Sub Page Titles
var courseTitle="";//Course Title
var firstTime=false;//Framework initialization variable
var swipeDir;// Swipe Direction
var subPageNum;//Sub Page Number(used for find the sub page title and completion array position)
var pageType="";// (Main / subpage))
var audioFile;// (Audio File Name))
var remedCyuPage=0;//Remediation page Index
var remedPageRevisit=false;
var backBtnClicked=false;
var visitedAudio=false;
var removebtnTxt="";
var viewBtnTxt="";
var clkPopArray_1=[0,0,0,0,0,0,0,0];//sub Page comlpletion Array(used for highlight and visited status)
//Page preload Arrays
var preLoadAssetsName=[];
var PreLoadAssetType=[];
var PreLoadAssetSize=[];
var preLoadSubAssetsName=[];
var preLoadSubAssetType=[];
var preLoadSubAssetSize=[];
var preLoadSubPageIndex=[];
//Page preload Arrays
var moduleSelected=false;
var bookmarkVisit=false;
var bkLMSArray= new Array();//bookmark LMS communication Array
//Video player tool-tip 
var scaptiontTxt = "";
var stranscriptTxt = "";
var splayTxt = "";
var sreplayTxt = "";
var saudioCntlTxt = "";
var plusTxt= "";
var exitTxt="";
var searchTxt="";
var pgNumTxt = "";
var reviewTxt = "";
var mainmenuTxt="";
var modulebtnTxt="";
var glossAltTxt="";
var learningAidTitleTxt="";
var bookmarkAltTxt="";
var notesAltTxt="";
var emailAltTxt="";
var printAltTxt="";
var helpAltTxt="";
var searchAltTxt="";
var popupsearchTxt=""
var toolsAltTxt="";
var menuAltTxt="";
var screennumberAltTxt="";
var reviewAltTxt="";
var coursemenuAltTxt="";
var logoAltTxt="";
var logoutAltTxt="";
var leftarrowAltTxt="";
var rightarrowAltTxt="";
var closeTxt = "";
var searchmodulesTxt="";
var clearTxt="";
var nomodulesfound="";
var coverflowmodules="";
var coverflowmodule="";
var ofTxt="";
var feedbackcomment=""
var screenNumberTxt=""; 
var getLastvalue ="";
var removeunwantedVisit = 0;
var showChar = 35;  // How many characters are shown by default
var showCharipad = 25;  // How many characters are shown by default
var showCharmob = 22;  // How many characters are shown by default
var showCharmod = 20;  // How many characters are shown by default
var showCharmodmob = 10;  // How many characters are shown by default
var ellipsestext = "...";
var ellipsestextmod = "...";
var moretext = "more";
var lesstext = "less";
var moretextmod = "more";
var lesstextmod = "less";
var moretextmob = "more";
var lesstextmob = "less";
var objappVersion = navigator.appVersion; 
var objAgent = navigator.userAgent; 
var objbrowserName = navigator.appName; 
var objfullVersion = ''+parseFloat(navigator.appVersion); 
var objBrMajorVersion = parseInt(navigator.appVersion,10); 
var objOffsetName,objOffsetVersion,ix; 
/**********Document Initialization**********************/
$(document).ready(function(){
 
	/**********Initializing Langauage**************/
	if(window.opener!=null){
		currLang=window.opener.selectedLang;
		if(currLang=="undefined")
		{
			currLang="en";
		}
	}else{
		currLang="en";
	}
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}
	/**********Initializing Preloading Assets file**************/
	var preloadAssetspath='../course/content_'+currLang+'/global/js/preload_assets.js';
	var preAssetjs;
	if(typeof preAssetjs == "undefined") {
		$.getScript(preloadAssetspath, function() {
		});
	}
	

	// In Chrome 
	if ((objOffsetVersion=objAgent.indexOf("Chrome"))!=-1) { objbrowserName = "Chrome"; objfullVersion = objAgent.substring(objOffsetVersion+7); } // In Microsoft internet explorer
	else if ((objOffsetVersion=objAgent.indexOf("MSIE"))!=-1) { objbrowserName = "Microsoft Internet Explorer"; objfullVersion = objAgent.substring(objOffsetVersion+5); } // In Firefox 
	else if ((objOffsetVersion=objAgent.indexOf("Firefox"))!=-1) { objbrowserName = "Firefox"; } 
	// In Safari 
	else if ((objOffsetVersion=objAgent.indexOf("Safari"))!=-1) { objbrowserName = "Safari"; objfullVersion = objAgent.substring(objOffsetVersion+7); if ((objOffsetVersion=objAgent.indexOf("Version"))!=-1) objfullVersion = objAgent.substring(objOffsetVersion+8); } 
	// For other browser "name/version" is at the end of userAgent 
	else if ( (objOffsetName=objAgent.lastIndexOf(' ')+1) < (objOffsetVersion=objAgent.lastIndexOf('/')) ) { objbrowserName = objAgent.substring(objOffsetName,objOffsetVersion); objfullVersion = objAgent.substring(objOffsetVersion+1); if (objbrowserName.toLowerCase()==objbrowserName.toUpperCase()) { objbrowserName = navigator.appName; } } 
	// trimming the fullVersion string at semicolon/space if present 
	if ((ix=objfullVersion.indexOf(";"))!=-1) objfullVersion=objfullVersion.substring(0,ix); if ((ix=objfullVersion.indexOf(" "))!=-1) objfullVersion=objfullVersion.substring(0,ix); objBrMajorVersion = parseInt(''+objfullVersion,10); if (isNaN(objBrMajorVersion)) { objfullVersion = ''+parseFloat(navigator.appVersion); objBrMajorVersion = parseInt(navigator.appVersion,10); }


	
	/**********Assigning (GUI) clickable functions**************/
	$('.bkmk_clkbtn').click(function(){
	$('#video_wrapper .video_player').trigger('pause');
		fnOpenShellPop("Bookmark");
	});	
	$('.notes_clkbtn').click(function(){
	$('#video_wrapper .video_player').trigger('pause');
		fnOpenShellPop("Notes");
	});	
	$('.gloss_clkbtn').click(function(){
	$('#video_wrapper .video_player').trigger('pause');
		fnOpenShellPop("Glossary");
	});	
	$('.gloss_modclkbtn').click(function(){
	$('#video_wrapper .video_player').trigger('pause');
		fnOpenShellPop("Glossary_mod");
	});	
	$('.lAids_clkbtn').click(function(){
	$('#video_wrapper .video_player').trigger('pause');
		fnOpenShellPop("LearningAids");
	});	
	$('.fBk_clkbtn').click(function(){
	$('#video_wrapper .video_player').trigger('pause');
		fnOpenShellPop("Feedback");
	});	
	$('.print_clkbtn').click(function(){
	$('#video_wrapper .video_player').trigger('pause');
		fnOpenShellPop("Print");
	});	
	$('.printCourse_clkbtn').click(function(){
		var CoursePdf = "../course/content_"+currLang+"/global/assets/resources/Complete_Course.pdf"
		window.open(CoursePdf, '_blank');
	});	
	$('.help_clkbtn').click(function(){
	 $('#video_wrapper .video_player').trigger('pause');
		fnOpenShellPop("Help");
		$(".contentAreaFrame").hide();
		$(".wrapper_header").hide();
	});
	$('.helpCMenu_clkbtn').click(function(){
		fnOpenShellPop("HelpCMenu");
		$(".contentAreaFrame").hide();
		$(".wrapper_header").hide();
	});
	$(".help_menu_click_plus").addClass("plus_move");
	$(".course_plus, .sub_menu_arw_open_plus").hide();
	$(".modulepopupLogout").hide();
	$(".modulecontinue_clkbtn").click(function(e){
		if(!$(this).hasClass("btn_disabled"))
		{
		$(".copyRightTxt").css("color", "#c7c7c7");
			$("#video_player").prop('muted', true)
			fnAudioVideoPause(true);
			$(".course_logout_clkbtn").hide();
			$(".course_logout_clkbtn_1").hide();
		    $(".course_plus").show();	
			$(".modulepopupLogout").show();
			 var temp = ModTitles;
 			fnSearchMenu(temp); 
			fnCourseCompletionArr();
			$('#pre-rendered-example-input').val('');
			$('.ui-input-clear').addClass('ui-input-clear-hidden');
		}
	});
	 $(".modulecontinue_clkbtn_1").click(function(){
		fnAudioVideoPause(true);
		var tmpToolVal=(($(window).width()-$(".module_index_header").width())/2)-100;
		  if(!device.MobileDevice())
		{
			$(".course_plus").css({"left":$(".module_index_header").width()+tmpToolVal,"z-index": "9999","position" : "absolute","top":($(".module_index_header").height()/2)-($(".course_plus").height()/2)});
			$(".sub_menu_arw_open_plus").css({"left":($(".module_index_header").width()+tmpToolVal)+4,"z-index": "9999","position" : "absolute","top":($(".module_index_header").height()-6)});
			$(".course_logout_clkbtn_1").css("top",($(".module_index_header").height()/2)-($(".course_plus").height()/2)-3);
			$(".course_logout_clkbtn_1").css("padding","");
		} 
		$(".wrapper_header .header_new").parent().css("background", "none")
		$('#processAlertContainer').hide();		
		$(".sub_menu_arw_open_plus").hide();
		$(".course_plus").show();
		$(".course_logout_clkbtn").hide();
		$(".course_logout_clkbtn_1").show();
		$(".help_menu_open_plus").hide();
		$(".help_menu_click_plus").addClass("plus_move");
		$(".course_plus").css('');
	});
	$(".logoutPop_close_btn").click(function(){
		$(".popupLogout").hide();
	});
	$(".course_logout_clkbtn_1").click(function(){
	
		if(!$(this).hasClass("btn_disabled"))
		{
			
			if(moduleSelected)
			{
			$("#video_player").prop('muted', false)
			 $(".header_new").parent().css("background", "#f4f4f3");
				fnAudioVideoPause(false);
				$(".modulepopupLogout").hide();
				$(".course_plus ").hide();
			}else{
				$(".logout_clkbtn").trigger("click");
			}
		}
	});
	$(".wrapper,.footer").hide();
	$(".preloader, .preloaderBg").hide();
	$('#prevBtn').addClass("deActiveBtn");	
	$(".wrapper_header, .contentAreaFrame, .clickNxtInfo").hide();
	/**********Call Course XML Function**************/	
	fnLoadXML();
	/**********Assigning (GUI) clickable functions**************/
	$('#nextBtn').click(function(e) {
		if(!$(this).hasClass("deActiveBtn"))
		{
			backBtnClicked=false;
			clkPopArray_1=[0,0,0,0,0,0,0,0];
			fnNextPage();
		}
	});
	$('#prevBtn').click(function(e) { 
		if(!$(this).hasClass("deActiveBtn"))
		{
			clkPopArray_1=[0,0,0,0,0,0,0,0];
			backBtnClicked=false;
			fnPrevPage();
		}
	});
	
    $(".logoutPop_print_btn").click(function()
	{
		if(!$(this).hasClass("cyudisabled"))
		{
			fnLogPrintNotes();
		}else{
		}
	});	 
	$(".contentAreaFrame").append($('<div class="arrow-down-AT"></div>'));
	$(".main_menu_click").on('click', function(e) {
		if(!$(this).hasClass("btn_disabled"))
		{
			if(!device.MobileDevice()){
				$(".main_menu_open").css('top',$('.wrapper_header').height());
				//alert($('.wrapper_header').height())
			}else{
				$(".main_menu_open").css('top',$('.wrapper_header').height()-$(".mobile_header").height());
				
			}
			 
			var arrowPos=$('.wrapper_header').height();
			arrowPos=arrowPos-7;
			$(".main_menu_arw").css('left',($(".menu_icon").offset().left)+13);
			$(".main_menu_arw").css('top',arrowPos);
			$(".main_menu_open, .main_menu_arw").slideToggle();
			$('.help_menu_open, .sub_menu_arw_open').fadeOut();
		}
		e.stopPropagation();
	});
	$(".help_menu_click").on('click', function(e) {
		$(".help_menu_open").css("top",$(".right_btns").height())
		$(".sub_menu_arw_open").css({'top': $('.right_btns').height()-6, 'right' : (($('.help_menu_click').width()/2)-2)});
		if(!$(this).hasClass("btn_disabled"))
		{
			$(".help_menu_open, .sub_menu_arw_open").slideToggle();
			$('.main_menu_open, .main_menu_arw').fadeOut();
			e.stopPropagation();
		}
	});
	$(".help_menu_click_plus").on('click', function(e) {
		if(!$(this).hasClass("btn_disabled"))
		{
		//alert($(".module_index_header").height())
	
			$(".help_items").css("top",$(".module_index_header").height())
			$(".help_menu_open_plus, .sub_menu_arw_open_plus").slideToggle();
			$('.main_menu_open, .main_menu_arw').fadeOut();
			e.stopPropagation();
		}
	});	
	$('.shellPop_close_btn a').click(function(e) {
		fnAudioVideoPause(false);
		  $('#video_wrapper .video_player').trigger('play');
		$(".contentAreaFrame").show();
		$(".wrapper_header").show();
		/* $(".mejs-video").css('width', '100%');
		$(".mejs-video").css('height', '100%'); */
		var ua = window.navigator.userAgent;
var is_ie = /MSIE|Trident/.test(ua);

if ( is_ie ) {
 
 if(pageTypeArray[currModule-1][currPageNum-1]=="steplist"){
$(".pgContainer #processAlertContainer").css('height', $(".mejs-video").height()+$(".pgContainer .steplistBar").height()+40)
		$('.videocontent').css('height', (tHgt-50));
		$('.videocontent .mejs-inner').css('height', (tHgt-50));		
 }
 else {
  $('.videocontent').css('height', (tHgt));		  
		$('.videocontent .mejs-inner').css('height', (tHgt));
 }
}
else {
		$(".mejs-video").css('width', '100%');
		$(".mejs-video").css('height', '100%'); 
		fnAudioVideoPause(false);
	if(pageTypeArray[currModule-1][currPageNum-1]!="steplist"){
	
		 $('.videocontent').css('height', (tHgt-20));		  
		$('.videocontent .mejs-inner').css('height', (tHgt-20));
		//alert((tHgt-90))
	}else{
	 
	 $(".pgContainer #processAlertContainer").css('height', $(".mejs-video").height()+$(".pgContainer .steplistBar").height()+40)
		$('.videocontent').css('height', (tHgt-50));
		$('.videocontent .mejs-inner').css('height', (tHgt-50));		
	}

}
	/* 	if(pageTypeArray[currModule-1][currPageNum-1]=="steplist"){
		$(".mejs-video").css('width', '1344px');
		$(".mejs-video, .mejs-overlay-play").css('height', '562px');
		}
		else if(window.innerWidth <=1366 && window.innerHeight >=662){
			$(".mejs-video").css('width', '956px');
		$(".mejs-video, .mejs-overlay-play").css('height', '457px');
		}
		else if(window.innerWidth <=2560 && window.innerHeight >=1337){
		$(".mejs-video").css('width', '1792px');
		$(".mejs-video, .mejs-overlay-play").css('height', '856px');
		}
		else if(window.innerWidth <=1707 && window.innerHeight >=857){
		$(".mejs-video").css('width', '1195px');
		$(".mejs-video, .mejs-overlay-play").css('height', '571px');
		}
		else {
		$(".mejs-video").css('width', '1344px');
		$(".mejs-video, .mejs-overlay-play").css('height', '642px');
		} */
		
 		var vid = document.getElementById("helpVideo1"); 
		vid.pause();
		vid.currentTime = 0;
		$(".popupShell").hide();
		$(".shellpopup").hide();
		$(".feedmail_Pop").hide();
	});
	$(".helpMenuPop > .CourseMenu_close_btn a").click(function(e) {
	$(".course_logout_clkbtn_1").show();
		$(".contentAreaFrame").show();
		$(".wrapper_header").show();
		  $(".mejs-video").css('width', '100%');
		$(".mejs-video").css('height', '100%'); 
		/* if(window.innerWidth <=1366 && window.innerHeight >=662){
			$(".mejs-video").css('width', '956px');
		$(".mejs-video, .mejs-overlay-play").css('height', '457px');
		}
		else if(window.innerWidth <=2560 && window.innerHeight >=1337){
		$(".mejs-video").css('width', '1792px');
		$(".mejs-video, .mejs-overlay-play").css('height', '856px');
		}
		else if(window.innerWidth <=1707 && window.innerHeight >=857){
		$(".mejs-video").css('width', '1195px');
		$(".mejs-video, .mejs-overlay-play").css('height', '571px');
		}
		else {
		$(".mejs-video").css('width', '1344px');
		$(".mejs-video, .mejs-overlay-play").css('height', '642px');
		} */
		 
	})
 
	$('.CourseMenu_close_btn a').click(function(e) {
		//fnAudioVideoPause(false);
		$('#video_wrapper .video_player').trigger('play');
		var vid = document.getElementById("helpVideo2"); 
		vid.pause();
		vid.currentTime = 0;
		$(".popupShell").hide();
		$(".shellpopup").hide();
		$(".feedmail_Pop").hide();
		$(".course_logout_clkbtn_1").show();
		if(!glossMod)
		{
			$(".course_plus").show();
			$(".modulepopupLogout").show();
		}else{
			glossMod=false;
			fnAudioVideoPause(false);
		}
		$('#pre-rendered-example-input').val('');
		$('.ui-input-clear').addClass('ui-input-clear-hidden');
	});
	$(".popupSearch").hide();
	$(".search_clkbtn").click(function(){
		if(!$(this).hasClass("btn_disabled"))
		{
			fnAudioVideoPause(true);
			$(".popupSearch").show();
		}
	});
	$(".print_page").click(function(){
		fnPrintCurrentScrn();
	});
	$(".print_module").unbind();
    $(".print_module").click(function(){
		/* if(!printOpenModule)
		{ */
			/* fnPrintCurrentModule(); */
			var CoursePdf = "../course/content_"+currLang+"/global/assets/resources/Module_"+currModule+".pdf"
			window.open(CoursePdf, '_blank');
		//}
	}); 	
	$(".searchPop_close_btn").click(function(){
		fnAudioVideoPause(false);
		$(".popupSearch").hide();
	});
	$(".notes_close_btn").click(function(){ 
	$('#video_wrapper .video_player').trigger('play');	
		fnSaveNotesData();
		fnAudioVideoPause(false);		 
		$(".popupShell").hide();
		$(".notesPop").hide();
	});
	$(".popupLogout").hide();
	$(".logout_clkbtn").click(function(){
		fnAudioVideoPause(true);
		$(".popupLogout").show();
		if(notesData.length>0){
		   $(".logoutPop_print_btn").show();
		   $(".logoutPop_print_text").show();		  
		}else{
		   $(".logoutPop_print_btn").hide();
		   $(".logoutPop_print_text").hide();	
		}
	});
	$(".logoutPop_clk_btn").click(function(){
		 window.opener.exit()	
		 window.close();
	});
	$(".logoutPop_close_btn").click(function(){
		fnAudioVideoPause(false);
		$(".popupLogout").hide();
	});
	$(".remediationBtn a").click(function(){
		remedIndex=0;
		RemediationPage=false;
		remedPageRevisit=true;
		fnLoadPage(remedCyuPage);
	});
	//$("#revTool").show();
	$("#getsize").show();
	$(document).click(function () {
		//$('.main_menu_open, .main_menu_arw').fadeOut();
		$('.help_menu_open, .sub_menu_arw, .sub_menu_arw_open, .sub_menu_arw_open_plus').fadeOut();
		$('.help_menu_open_plus').fadeOut();
    }); 
 $(".videocontent, .contentAreaFrame").click(function () {
		 $('.main_menu_open, .main_menu_arw').fadeOut();
		 
    }); 
	 /*  $(window).keydown(function(e){	 
		if(e.which === 40){ 
			if(liSelected){			 
			 revealCont = liSelected.attr('id').split("_")[1];
		  $('.gls_list li').removeClass("pop_list_active");
				next = liSelected.next();
				scrolled=scrolled+50; 	
				$('.gloss_list').mCustomScrollbar("scrollTo", scrolled);
				if(next.length > 0){
			 liSelected.removeClass('selected');
				revealCont=Number(revealCont); 			
 				  fnDescriptionShow(revealCont);
 					 liSelected = next.addClass('selected');
				}else{ 		   
					// liSelected = $('.gls_list li').eq(0).addClass('selected');
				}
			}else{ 
				 liSelected = $('.gls_list li').eq(0).addClass('selected');
			}
		}  else if(e.which === 38){
			if(liSelected){
			revealCont = liSelected.attr('id').split("_")[1];
				revealCont=Number(revealCont)-2;
				
				 $('.gls_list li').removeClass("pop_list_active");
				next = liSelected.prev();
				scrolled=scrolled-50; 
				$('.gloss_list').mCustomScrollbar("scrollTo", scrolled);
				if(next.length > 0){
				liSelected.removeClass('selected');
				revealCont=Number(revealCont); 			
 				  fnDescriptionShow(revealCont);
 					 liSelected = next.addClass('selected');
				}else{
					//liSelected = $('.gls_list li').last().addClass('selected');
				}
			}else{
			  
				liSelected = $('.gls_list li').last().addClass('selected');
			}
		}  
		});  */ 
	$(".playButton").click(function(){
			//alert(":::Enter::");
			/****Dummy Audio Play****/
			subAudio[0].load();
			subAudio.currentTime = 0;
			subAudio[0].oncanplaythrough = subAudio[0].play();
			subAudio[0].pause();
			audioPlayerFunction("framework/assets/audios/mute.mp3");
			//alert(":::122::"+subAudio[0].play());
			/****Dummy Audio Play****/
			if(pageType=="main")
			{
				if(pageTypeArray[currModule-1][currPageNum-1]=="2d_ani" || pageTypeArray[currModule-1][currPageNum-1]=="steplist")
				{
					if(!device.MobileDevice()){
						if(audioPlayer){
							audioPlayer.pause();
						}
						$(".videocontent .mejs-playpause-button").trigger('click');
					}else{
						$(".footer .mejs-playpause-button").trigger('click');
						if(audioPlayer){
							audioPlayer.pause();
						}
					}
					
				}else if(pageTypeArray[currModule-1][currPageNum-1]=="obj" || pageTypeArray[currModule-1][currPageNum-1]=="int_pop" || pageTypeArray[currModule-1][currPageNum-1]=="clk_qk" || pageTypeArray[currModule-1][currPageNum-1]=="chart_clk" || pageTypeArray[currModule-1][currPageNum-1]=="clk_rvl" || pageTypeArray[currModule-1][currPageNum-1]=="clk_spot")
				{
				
					if(visitedAudio && backBtnClicked)
					{
						if(audioPlayer){
							audioPlayer.pause();
						}
					}else{
						$(".footer .mejs-playpause-button").trigger('click');
					}
					if(!device.MobileDevice()){
						videoPlayer.pause();
					}
				}else {
				}
			}else{
				if(subPageTypeArray[currModule-1][currPageNum-1][subPageNum]=="2d_ani" || subPageTypeArray[currModule-1][currPageNum-1][subPageNum]=="steplist")
				{
					if(audioPlayer){
						audioPlayer.pause();
					}
					$(".videocontent .mejs-playpause-button").trigger('click');
					
				}else if(subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="obj" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="int_pop" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="chart_clk" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="clk_rvl" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="clk_spot" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="clk_qk")
				{
					if(videoPlayer){
						videoPlayer.pause();
					}
					$(".footer .mejs-playpause-button").trigger('click');
				}else {
				}
			}
			$(this).hide();
			$(".ipad_play").hide();
	});
	subAudio = $("#additinal_audio");
	
	 $(".contentAreaFrame").on("swipeleft",function(){
	 $(".playButton").click();
		if(device.MobileDevice() && !$('#nextBtn').hasClass("deActiveBtn")){
			backBtnClicked=false;
			clkPopArray_1=[0,0,0,0,0,0,0,0];
			 fnNextPage(); 
		}
	 });  
	$(".contentAreaFrame").on("swiperight",function(){
	$(".playButton").click();
		if(device.MobileDevice() && !$('#prevBtn').hasClass("deActiveBtn")){
		
			backBtnClicked=false;
			clkPopArray_1=[0,0,0,0,0,0,0,0];
			fnPrevPage();
		}
	 }); 
	/**********Aligning Elements repect to Oreintation Change**************/
	window.addEventListener("orientationchange", function() {
		var tmpToolVal=(($(window).width()-$(".module_index_header").width())/2)-100;
		if(!device.MobileDevice())
		{
			$(".course_plus").css({"left":$(".module_index_header").width()+tmpToolVal,"z-index": "9999","position" : "absolute","top":($(".module_index_header").height()/2)-($(".course_plus").height()/2)});
			$(".sub_menu_arw_open_plus").css({"left":($(".module_index_header").width()+tmpToolVal)+4,"z-index": "9999","position" : "absolute","top":($(".module_index_header").height()-6)});
			//$(".course_logout_clkbtn_1").css("top",($(".module_index_header").height()/2)-($(".course_plus").height()/2)-3);
			$(".course_logout_clkbtn_1").css("padding","");
			$(".help_menu_open").css("top",$(".right_btns").height())
			$(".sub_menu_arw_open").css({'top': $('.right_btns').height()-6, 'right' : (($('.help_menu_click').width()/2)-2)});
			if(!device.MobileDevice()){
				$(".main_menu_open").css('top',$('.wrapper_header').height());
			}else{
				$(".main_menu_open").css('top',$('.wrapper_header').height()-$(".mobile_header").height());
			}
			var arrowPos=$('.wrapper_header').height();
			arrowPos=arrowPos-7;
			$(".main_menu_arw").css('left',($(".menu_icon").offset().left)+13);
			$(".main_menu_arw").css('top',arrowPos);
		}
		 
		var tWidth=$('.wrapper').width();
		var tHgtMenu =Number(tWidth*8/16)+10;
		if(!device.MobileDevice()){
			$(".main_menu_open").css('top',$('.wrapper_header').height());
		}else{
			$(".main_menu_open").css('top',$('.wrapper_header').height()-$(".mobile_header").height());
		}
		
	});
});
/**********Functions - GUI Elements**************/
var glossMod=false;
function fnOpenShellPop(aTitle){
	$(".shellpopup").hide();
	if(aTitle=="Bookmark")
	{	
		$(".popupShell").show();
		$('.bookmarkpop').show();
	}else if(aTitle=="Glossary")
	{
		$(".pop_srch_options .ui-input-clear").trigger('click');
		$(".popupShell").show();
		$('.glossaryPop').show();
		$(".course_plus, .sub_menu_arw_open_plus").hide();
		$(".modulepopupLogout").hide();
	}else if(aTitle=="Glossary_mod")
	{
		$(".pop_srch_options .ui-input-clear").trigger('click');
		$(".popupShell").show();
		$('.glossaryPop').show();
		glossMod=true;
	}else if(aTitle=="LearningAids")
	{
		$(".popupShell").show();
		$('.lrngAidPop').show();
		$(".course_plus, .sub_menu_arw_open_plus").hide();
		$(".modulepopupLogout").hide();
	}else if(aTitle=="Notes")
	{
		$(".popupShell").show();
		$('.notesPop').show();		
		fnOpenNotes(currPageNum)
	}else if(aTitle=="Feedback")
	{
		if(currPageNum>9)
		{
			var subject=feedbackcomment+" "+courseTitle+" >> "+ModTitles[currModule-1]+" >> "+screenNumberTxt+": "+currPageNum+" "+ofTxt+" "+pagesArray[currModule-1].length;
		}else{
			var subject=feedbackcomment+" "+courseTitle+" >> "+ModTitles[currModule-1]+" >> "+screenNumberTxt+": "+"0"+currPageNum+" "+ofTxt+" "+pagesArray[currModule-1].length;
		}
		window.location.href='mailto:wabtecuniversitysupport@wabtec.com?subject='+subject+'&body=Hi';
	}else if(aTitle=="Print")
	{
		 $(".popupShell").show();
		 $('.printPop').show();
		 $(".course_plus, .sub_menu_arw_open_plus").hide();
		 $(".modulepopupLogout").hide();
	}else if(aTitle=="Help")
	{
		 $(".popupShell").show();
		 $('.helpPop').show();
		 $(".course_plus, .sub_menu_arw_open_plus").hide();
		 $(".modulepopupLogout").hide();
	}else if(aTitle=="HelpCMenu")
	{
		 $(".popupShell").show();
		 $('.helpMenuPop').show();
		 $(".course_plus, .sub_menu_arw_open_plus").hide();
		 $(".modulepopupLogout").hide();
	}
	fnAudioVideoPause(true);
}
/**********************Loading Course XML and Initailizing Arrays and Objects **********************/
var courseXml;
function fnLoadXML(){
	$.get('../course/course.xml', function(data){
		 totalModules=$(data).find('module').length;
		 courseXml=data;	 
		 $(courseXml).find('module').each(function(index){
			var tmpModule=$(this);
			pagesArray[index]=new Array();
			pageCompletionArray[index]=new Array();
			pageTypeArray[index]=new Array();
			pageGroupArray[index]=new Array();
			pageAssetsArray[index]=new Array();
			subPagesArray[index]=new Array();
			subPageCompletionArray[index]=new Array();
			bookmarkpagesArray[index]=new Array();
			subPageTypeArray[index]=new Array();
			subPageGroupArray[index]=new Array();
			preLoadAssetsName[index]=new Array();
			PreLoadAssetType[index]=new Array();
			PreLoadAssetSize[index]=new Array();
			preLoadSubAssetsName[index]=new Array();
			preLoadSubAssetType[index]=new Array();
			preLoadSubAssetSize[index]=new Array();
			preLoadSubPageIndex[index]=new Array();
			totalPages[index] = tmpModule.find('page').length;
			var tmpPageSubnum=0;
			tmpModule.find('page').each(function(index1){
				var tmpPage=$(this);
				var pageURL = $(this).attr("path");
				var pageType= $(this).attr("type");				
				var pgGrpType= $(this).attr("pgType");
				var pageAssets= $(this).attr("preAssets");
				pagesArray[index].push(pageURL);
				pageCompletionArray[index].push(0);					
				pageTypeArray[index].push(pageType);
				pageGroupArray[index].push(pgGrpType);
				pageAssetsArray[index].push(pageAssets);
				PreLoadAssetType[index].push(pageType);
				if(PreLoadAssetType[index][index1]=="2d_ani" || PreLoadAssetType[index][index1]=="obj" || PreLoadAssetType[index][index1]=="txtImg" || PreLoadAssetType[index][index1]=="steplist")
				{
					preLoadAssetsName[index].push("../course/content_"+currLang+"/module_"+(index+1)+"/assets/videos/"+pageURL.split(".html")[0]+".mp4");
				}else if(PreLoadAssetType[index][index1]=="int_pop" || PreLoadAssetType[index][index1]=="chart_clk" || PreLoadAssetType[index][index1]=="clk_rvl" || PreLoadAssetType[index][index1]=="clk_spot" || PreLoadAssetType[index][index1]=="clk_qk"){
					preLoadAssetsName[index].push("../course/content_"+currLang+"/module_"+(index+1)+"/assets/audios/"+pageURL.split(".html")[0]+".mp3");
				}else{
					preLoadAssetsName[index].push("../course/content_"+currLang+"/module_"+(index+1)+"/data/"+pageURL.split(".html")[0]+".js");
				}
				subPagesArray[index][index1]=new Array();
				subPageTypeArray[index][index1]=new Array();
				subPageCompletionArray[index][index1]=new Array();
				subPageGroupArray[index][index1]=new Array();
				preLoadSubAssetsName[index][index1]=new Array();
				preLoadSubAssetType[index][index1]=new Array();
				preLoadSubAssetSize[index][index1]=new Array();
				preLoadSubPageIndex[index][index1]=new Array();
				
				tmpPage.find('subPage').each(function(index2){	
					subPagesArray[index][index1].push($(this).attr("path"));
					subPageTypeArray[index][index1].push($(this).attr("type"));
					subPageGroupArray[index][index1].push($(this).attr("pgType"));
					subPageCompletionArray[index][index1].push(0);
					tmpPageSubnum++;
					preLoadSubPageIndex[index][index1].push(tmpPageSubnum);
					preLoadSubAssetType[index][index1].push($(this).attr("type"));
					if(preLoadSubAssetType[index][index1][index2]=="2d_ani" || preLoadSubAssetType[index][index1][index2]=="obj" || preLoadSubAssetType[index][index1][index2]=="txtImg" || preLoadSubAssetType[index][index1][index2]=="steplist")
					{
						preLoadSubAssetsName[index][index1].push("../course/content_"+currLang+"/module_"+(index+1)+"/assets/videos/"+$(this).attr("path").split(".html")[0]+".mp4");
					}else if(preLoadSubAssetType[index][index1]=="int_pop" || preLoadSubAssetType[index][index1]=="chart_clk" || preLoadSubAssetType[index][index1]=="clk_qk" || preLoadSubAssetType[index][index1]=="clk_rvl" || preLoadSubAssetType[index][index1]=="clk_spot"){
						preLoadSubAssetsName[index][index1].push("../course/content_"+currLang+"/module_"+(index+1)+"/assets/audios/"+$(this).attr("path").split(".html")[0]+".mp3");
					}else{
						preLoadSubAssetsName[index][index1].push("../course/content_"+currLang+"/module_"+(index+1)+"/data/"+$(this).attr("path").split(".html")[0]+".js");
					}
				});
			});	
		}).promise().done(function () {
			if(window.opener!=null){				
				if(window.opener.bkdatastring!="")
				{			
					currModule=window.opener.suspenddata.split("^")[1];
				}
				if(window.opener.bkdatastring!="" && currModule != 0)
				{								
					currModule=window.opener.suspenddata.split("^")[1];
					currPageNum=window.opener.suspenddata.split("^")[2];
					var tempPageArray = window.opener.suspenddata.split("^")[3].split(",");
					var bkLMSArray=window.opener.suspenddata.split("^")[4].split(",");
					bkLMSArray.forEach(function(item,ind) {
						if(item!="")
						{
							var tmpValLeft=item.split("_")[0];
							var tmpValRight=item.split("_")[1];
							bookmarkpagesArray[tmpValLeft].push(Number(tmpValRight));
						}
					});
					var tmpCntBkPages=0;
					for(var i=0;i<totalPages.length;i++)
					{
						for(var j=0;j<totalPages[i];j++)
						{
							pageCompletionArray[i][j]=tempPageArray[tmpCntBkPages];
							tmpCntBkPages++
						}
					}
					$(".wrapper,.footer").show();
					fnLoadExternalShellData();
					fnLoadExternalMenuData();					
					$(".popupBookmark").show();
					moduleSelected=true;			
					
					$(".help_menu_click_plus").removeClass("btn_disabled");
					$(".course_logout_clkbtn_1").removeClass("btn_disabled")
					$(".BookmarkPop_clk_btn").click(function()
					{
					if(device.MobileDevice()){
					$(".contentAreaFrame").css("width","100%");		
					}					
					/****Dummy Audio Play****/
					subAudio[0].load();
					subAudio.currentTime = 0;
					subAudio[0].oncanplaythrough = subAudio[0].play();
					subAudio[0].pause();
					//audioPlayerFunction("framework/assets/audios/mute.mp3");
					/****Dummy Audio Play****/
						bookmarkVisit=true;
						$(".preloader, .preloaderBg").show();
						$(".popupBookmark").hide();
						fnShowModuleMenu();									
						fnLoadModulePrintData();
						fnSearchData();
						fnCreateLeftMenu(currModule-1);
						fnLoadPage(currPageNum);
						
						
					});
					$(".BookmarkPop_close_btn").click(function()
					{
						bookmarkVisit=false;
						moduleSelected=false;
						$(".preloader, .preloaderBg").hide();
						$(".popupBookmark").hide();
						currModule=1;
						currPageNum=1;
						fnShowModuleMenu();									
					});										
					$(".preloader, .preloaderBg").hide();
				}else{					
					$(".wrapper,.footer").show();
					fnLoadExternalShellData();
					fnLoadExternalMenuData();
				 }
			}else{				
				$(".wrapper,.footer").show();
				fnLoadExternalShellData();
				fnLoadExternalMenuData();
			}
		});
	});	
}
/**********************Assigning Shell content**********************/
var ExternalShellData;
var ExternalShellDataLoad=false;
function fnLoadExternalShellData() {
	var dataLoaded = false;
	var dataPath='../course/content_'+currLang+'/global/data/course.js';
	if (dataPath == "") {
		ExternalShellDataLoad = true;
	} else {
		$.getJSON(dataPath, function() {
		}).done(function(json) {
			ExternalShellData = json.ExternalData[0];			
			fnAssignShellExternalData();
			fnGenerateResources();
			if(ExternalShellData.reviewTxt.visibility == "false"){
				$("#revTool").css("visibility", "hidden");
			}
			else {
				$("#revTool").css("visibility", "visible");
			}
			if(ExternalShellData.searchTxt.visibility == "false"){
				$(".search_clkbtn").hide();
			}
			else {
				$(".search_clkbtn").show();
				$(".searchTxt").html(searchTxt)
			}
			if(ExternalShellData.emailTxt.visibility == "false"){
				$(".emailTxt").hide();
			}
			else {
				$(".emailTxt").show();
			}
			if(ExternalShellData.printTxt.visibility == "false"){
				$(".printTxt").hide();
			}
			else {
				$(".printTxt").show();
			}
			if(ExternalShellData.glossTxt.visibility == "false"){
				$(".glossTxt").hide();
			}
			else {
				$(".glossTxt").show();
			}
			if(ExternalShellData.learningAidTxt.visibility == "false"){
				$(".learningAidTxt").hide();
			}
			else {
				$(".learningAidTxt").show();
			}
			dataLoaded = true;
		}).fail(function() {
			console.log("Shell JSON Data Not Loaded");
		})
	} 
};
function fnAssignShellExternalData(){
	$.each(ExternalShellData, function(key, value) {
		if(key=="removebtnTxt")
		{
			removebtnTxt=value.text;
		}
		else if(key=="viewbtnTxt")
		{
			viewBtnTxt=value.text;
		}
		else if(key=="captiontTxt")
		{
			scaptiontTxt=value.text
		}
		else if(key == "glossAltTxt"){
			glossAltTxt = value.text;
		}
		else if(key == "learningAidTitleTxt"){
			learningAidTitleTxt = value.text;
		}
		
		else if(key =="bookmarkAltTxt"){
		bookmarkAltTxt =value.text;
		}
		else if(key =="notesAltTxt"){
		notesAltTxt =value.text;
		}
		else if(key =="emailAltTxt"){
				emailAltTxt =value.text;
				} 
		else if(key =="printAltTxt"){
				printAltTxt =value.text;
				}
		else if(key =="helpAltTxt"){
				helpAltTxt =value.text;
				}
		else if(key =="searchAltTxt"){
				searchAltTxt =value.text;
				}
		else if(key =="toolsAltTxt"){
				toolsAltTxt =value.text;
				}
		else if(key =="menuAltTxt"){
				menuAltTxt =value.text;
				}
		else if(key =="screennumberAltTxt"){
				screennumberAltTxt =value.text;
				}
		else if(key =="reviewAltTxt"){
				reviewAltTxt =value.text;
				}
		else if(key =="coursemenuAltTxt"){
				coursemenuAltTxt =value.text;
				}
		else if(key =="logoAltTxt"){
				logoAltTxt =value.text;
				}
		else if(key =="logoutAltTxt"){
				logoutAltTxt =value.text;
				}
		else if(key =="leftarrowAltTxt"){
				leftarrowAltTxt =value.text;
				}
		else if(key =="rightarrowAltTxt"){
				rightarrowAltTxt =value.text;
				}					
		else if(key=="transcriptTxt")
		{
			stranscriptTxt=value.text
		}
		else if(key=="playTxt")
		{
			splayTxt=value.text
		}
		else if(key=="replayTxt")
		{
			sreplayTxt=value.text
		}
		else if(key=="audioCntlTxt")
		{
			saudioCntlTxt=value.text
		}
		else if(key == "ToolsTxt"){
				plusTxt = value.text;		
		}
		else if(key == "exitTxt"){
				exitTxt = value.text;		
		}
		else if(key == "searchTxt"){
				searchTxt = value.text;		
		}
		else if(key == "screenNumTxt"){
				pgNumTxt = value.text;		
		}
		else if(key == "reviewTxt"){
				reviewTxt = value.text;		
		}
		else if(key == "menuTxt"){
				mainmenuTxt = value.text;		
		}
		else if(key == "courseMenuTxt"){
				modulebtnTxt = value.text;		
		}
		else if(key == "searchmodulesTxt"){
			searchmodulesTxt = value.text;
		}
		else if(key == "ofTxt"){
		ofTxt = value.text;
		}
		else if(key == "popupsearchTxt"){
		popupsearchTxt = value.text;
		
		}
		else if(key == "feedbackcomment"){
		feedbackcomment = value.text;
		}
		else if(key == "screenNumberTxt"){
		screenNumberTxt = value.text;
		}
		else if(key=="clearTxt"){
			clearTxt = value.text;
		}
		else if(key =="nomodulesfound"){
		nomodulesfound = value.text;
		}
		else if(key == "coverflowmodule"){
		coverflowmodule = value.text;
		}
		else if(key == "coverflowmodules"){
		coverflowmodules = value.text;
		}		
		else if(key == "closeTxt"){
			closeTxt = value.text;
		}
		else{
			$("." + key).html(value.text);
		}
	})
	$('.glossTxt').attr('title', glossAltTxt);
	$('.learningAidTxt').attr('title', learningAidTitleTxt);
	$('.bookmarkTxt').attr('title', bookmarkAltTxt);
	$('.notesTxt').attr('title', notesAltTxt);
	$('.emailTxt').attr('title', emailAltTxt);
	$('.printTxt').attr('title', printAltTxt);
	$('.helpTxt').attr('title', helpAltTxt);
	$('.search_clkbtn').attr('title', searchAltTxt);
	$('.sub_menu, .course_plus').attr('title', toolsAltTxt);
	$('.main_menu_click').attr('title', menuAltTxt);
	$('.pgNum').attr('title', screennumberAltTxt);
	$('.revTool').attr('title', reviewAltTxt);
	$('.modulecontinue_clkbtn').attr('title', coursemenuAltTxt);
	$('.logo a').attr('title', logoAltTxt);
	$('.logout_clkbtn, .course_logout_clkbtn_1').attr('title', logoutAltTxt);
	$('.leftBtn').attr('title', leftarrowAltTxt);
	$('.rightBtn').attr('title', rightarrowAltTxt);	
	 $('.srch .srch_module').attr('placeholder', searchmodulesTxt); 
	 $('.gl_search').attr('placeholder', popupsearchTxt);
	 $('#glsinput').attr('placeholder', popupsearchTxt);
 	 
	 $('.ui-input-clear').attr('title', clearTxt); 
	 $('.pop_srch_options input').attr('placeholder', popupsearchTxt);
	 
	 
	
 };
/**********************Assigning TOC(Menu) content**********************/
var ExternalMenuData;
var ExternalMenuDataLoad=false;
function fnLoadExternalMenuData() {
	var menuLoaded = false;
	var dataPath='../course/content_'+currLang+'/global/data/toc.js';
	if (dataPath == "") {
		ExternalMenuDataLoad = true;
	} else {
		$.getJSON(dataPath, function() {
		}).done(function(json) {
			ExternalMenuData = json.ExternalData[0];
			// getfilesize  
			if(ExternalMenuData.MenuData.getModSize == "ÿes"){
				$("#getsize").show();
				}
				else if(ExternalMenuData.MenuData.getModSize == "no"){
				$("#getsize").hide();
				}
	// getfilesize  				
			fnAssignMenuExternalData();
			menuLoaded = true;
			 $(".plus_move").attr('title', plusTxt);
		$(".course_logout_clkbtn_1").attr('title', exitTxt);
		
	 
	$(document).ready(function(){
			  $.fn.textWidth = function(){
        var self = $(this) 
             

         
        width = self.parent().width();
        return width;
    };
	$.fn.textWidthinner = function(){
        var self = $(this),
            calculator = $('<span style="width:inherit;">'),
            width;

        self.wrap(calculator);
        width = self.parent().width();
        return width;
    };
		
			  var coverflowparent = parseInt($(".module_pop_container .courseName").textWidth());
			var coverflowchild =  parseInt($(".module_pop_container .title").textWidth());
			
			var innercourseparent = parseInt($(".wrapper_header .mar_top_pixel").width());
			var innercoursechild =  parseInt($(".wrapper_header .courseName").textWidthinner()); 
			 /**********Read more / Less options**************/
	 
	
			 if(device.iPad() == true){
			 $(".title, .title h1, .title h3").css("white-space", "normal");
  	 $(".inner_container .title h3").css("width", "100%");
 	 $(".title, .title h1, .title h3").css("overflow", "");
	 $(".title, .title h1, .title h3").css("text-overflow", "");
	 $(".title1-h3").css("text-overflow", "ellipsis");
 	/*  $(".title1-h3").css("white-space", "inherit"); */
	 $(".title1-h3").css("white-space", "normal");
         var content = courseTitle;
         if(content.length > showCharipad) {
           var c = content.substr(0, showCharipad);
           var h = content.substr(showCharipad, content.length - showCharipad);
 
            var htmlcourse = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span><b>' + h + '</b></span>&nbsp;&nbsp;<a href="" class="morelink_course">' + moretext + '</a></span>';	
var htmlinnercourse = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink_course">' + moretext + '</a></span>';					
             $(".courseName").html(htmlcourse);
             $(".wrapper_header .courseName").html(htmlinnercourse);
        }
 
    
 
    $(".morelink_course").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
			
            $(this).html(moretext);			
        } else {
		$(".wrapper_header").css("background", "#f4f4f3");
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
 

			}
			else if(device.MobileDevice() == true){
			 $(".title, .title h1, .title h3").css("white-space", "normal");
  	 $(".inner_container .title h3").css("width", "100%");
 	 $(".title, .title h1, .title h3").css("overflow", "");
	 $(".title, .title h1, .title h3").css("text-overflow", "");
	 $(".title1-h3").css("text-overflow", "ellipsis");
	 $(".title1-h1").css("text-overflow", "ellipsis");
	/*  $(".title1-h3").css("white-space", "inherit"); */
	 $(".title1-h3").css("white-space", "normal");
	 $(".title1-h1").css("white-space", "normal");
        var content = courseTitle;
         if(content.length > showCharmob) {
           var c = content.substr(0, showCharmob);
            var h = content.substr(showCharmob, content.length - showCharmob);
 
            var htmlcourse = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span><b>' + h + '</b></span>&nbsp;&nbsp;<a href="" class="morelink">' + moretextmob + '</a></span>';
			 var htmlinnercourse = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretextmob + '</a></span>';
             $(".courseName").html(htmlcourse);
             $(".wrapper_header .courseName").html(htmlinnercourse);
         }
 
    
 
    $(".morelink").click(function(){

	 $(".tooltip").html('');
						$(".tooltip").css("opacity", "0")
						$(".tooltip").css("visibility", "hidden");
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretextmob);			
        } else {
		$(".wrapper_header").css("background", "#f4f4f3");
            $(this).addClass("less");
            $(this).html(lesstextmob);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
	/*  var contentmod = ModTitles[currModule-1];
         if(contentmod.length > showCharmodmob) {
           var cc = contentmod.substr(0, showCharmodmob);
            var hh = contentmod.substr(showCharmodmob, contentmod.length - showCharmodmob);
 
            var htmlmod = cc + '<span class="moreellipses">' + ellipsestextmod+ '&nbsp;</span><span class="morecontent"><span>' + hh + '</span>&nbsp;&nbsp;<a href="" class="morelinkmod">' + moretextmod + '</a></span>';
             $(".wrapper_header .moduleName").html(htmlmod);
        }
	 $(".morelinkmod").click(function(){
	  $(".tooltip").html('');
						$(".tooltip").css("opacity", "0")
						$(".tooltip").css("visibility", "hidden");
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretextmod);			
        } else {
		$(".wrapper_header").css("background", "#005db8");
            $(this).addClass("less");
            $(this).html(lesstextmob);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    }); */

			}
			/**********Read more / Less options**************/
			else {
			/**********Desktop Tooltip options**************/
 		  	 $(".modulepopupLogout .courseName").mouseover(function(){
  			// alert(coverflowchild+" AA "+coverflowparent)
			if(coverflowchild > coverflowparent){
			 
			 $(".tooltip").html(courseTitle);
			$(".tooltip").css("opacity", "1")
			$(".tooltip").css("visibility", "visible");
			}
			else {
			 $(".tooltip").html('');
						$(".tooltip").css("opacity", "0")
						$(".tooltip").css("visibility", "hidden");
			}			
						  
			 })
			 $(".modulepopupLogout .courseName").mouseout(function(){
			 $(".tooltip").css("visibility", "hidden")
			 $(".tooltip").css("opacity", "0")
			})
		$(".wrapper_header .courseName").mouseover(function(){
		 
			if(innercoursechild > innercourseparent){
			
			 $(".tooltip").html(courseTitle);
			$(".tooltip").css("opacity", "1")
			$(".tooltip").css("visibility", "visible");
			}	
			else {
			 $(".tooltip").html('');
						$(".tooltip").css("opacity", "0")
						$(".tooltip").css("visibility", "hidden");
			}	
			})
			$(".wrapper_header .moduleName").mouseover(function(){
			 $(".tooltip").html(ModTitles[currModule-1]);
			$(".tooltip").css("opacity", "1")
			$(".tooltip").css("visibility", "visible");
			})  
			
			$(".wrapper_header .moduleName").mouseout(function(){
			 $(".tooltip").html('');
						$(".tooltip").css("opacity", "0")
						$(".tooltip").css("visibility", "hidden");
			})
			}
			})
			
			
			/**********Desktop Tooltip options**************/
			 
		}).fail(function() {
			console.log("Menu JSON Data Not Loaded");
		})
	} 
};
function fnAssignMenuExternalData(){
	$.each(ExternalMenuData, function(key, value) {
		if(key=="MenuData")
		{
			$.each(value, function(key, value) {
			
				if(key=="course_title")
				{
					courseTitle=value;
					$(".courseName").html(courseTitle);
				}else if(key=="Module")
				{
					$.each(value, function(index) {
						pageTitlesArr[index]=new Array();
						subPageTitlesArr[index]=new Array();
						ModTitles.push(value[index].ModTitle);
						ModDurations.push(value[index].duration);
						ModImages.push(value[index].imageSrc);
						$.each(value[index].pageTitle, function(ind,value1) {
							$.each(value1, function(value2, pgValue) {
								if(value2=="pgTitle"){
									pageTitlesArr[index].push(pgValue);
								}else if(value2=="subPgTitles"){
									subPageTitlesArr[index][ind]=new Array();
									$.each(pgValue, function(indSubPage,valuePgSub) {
										subPageTitlesArr[index][ind].push(valuePgSub);
									});
								}
							});
						});
					});
				}
			});
		}
	})
	$(".preloader, .preloaderBg").hide();	
	if(window.opener!=null){
		if(window.opener.suspenddata == "" || currModule == 0){
			fnShowModuleMenu();
			fnGenerateBookmark();
		}else{
			fnGenerateBookmark();
		}		
	}else{
		fnShowModuleMenu();
		fnGenerateBookmark();
	}
	
	
};
/**********************Assigning Page content**********************/
var ExternalPageData;
function fnLoadExternalData() {
	var dataLoaded = false;
	if(pageType=="subPage")
	{
		if(courseType=="course"){
			var dataPath='../course/content_'+currLang+'/module_'+currModule+'/data/'+subPagesArray[currModule-1][currPageNum-1][subPageNum].split(".html").join(".js");
		}else{
			var dataPath='../course/content_'+currLang+'/asmnt/data/'+subPagesArray[currPageNum-1][subPageNum].split(".html").join(".js");
		}
	}else{
		if(courseType=="course"){
			var dataPath='../course/content_'+currLang+'/module_'+currModule+'/data/'+pagesArray[currModule-1][currPageNum-1].split(".html").join(".js");
		}else{
			var dataPath='../course/content_'+currLang+'/asmnt/data/'+pagesArray[currPageNum-1].split(".html").join(".js");
		}
	}
	if (dataPath == "") {
		ExternalDataLoad = true;
	} else {
		$.getJSON(dataPath, function() {
		}).done(function(json) {
			ExternalPageData = json.ExternalData[0];
			fnAssignExternalData();
			dataLoaded = true;
			fnCallLoader();
			fnAudioVideoInit(currPageNum);	
			//course overflow
			 $(document).ready(function(){
			  $.fn.textWidth = function(){
        var self = $(this) 
             

         
        width = self.parent().width();
        return width;
    };
	$.fn.textWidthinner = function(){
        var self = $(this),
            calculator = $('<span style="width:inherit;">'),
            width;

        self.wrap(calculator);
        width = self.parent().width();
        return width;
    };
		
			  var coverflowparent = parseInt($(".module_pop_container .courseName").textWidth());
			var coverflowchild =  parseInt($(".module_pop_container .title").textWidth());
			
			var innercourseparent = parseInt($(".wrapper_header .mar_top_pixel").width());
			var innercoursechild =  parseInt($(".wrapper_header .courseName").textWidthinner()); 
			 /**********Read more / Less options**************/
	 
	
			 if(device.iPad() == true){
			 $(".title, .title h1, .title h3").css("white-space", "normal");
  	 $(".inner_container .title h3").css("width", "100%");
 	 $(".title, .title h1, .title h3").css("overflow", "");
	 $(".title, .title h1, .title h3").css("text-overflow", "");
	 $(".title1-h3").css("text-overflow", "ellipsis");
	 $(".title1-h1").css("text-overflow", "ellipsis");
	/*  $(".title1-h3").css("white-space", "inherit"); */
	 $(".title1-h3").css("white-space", "normal");
	 $(".title1-h1").css("white-space", "normal");
        var content = $(".courseName").html();
         if(content.length > showCharipad) {
           var c = content.substr(0, showCharipad);
            var h = content.substr(showCharipad, content.length - showCharipad);
 
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
             $(".wrapper_header .moduleName").html(html);
        }
 
    
 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);			
        } else {
		$(".wrapper_header").css("background", "#f4f4f3");
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
	 var contentmod = ModTitles[currModule-1];
         if(contentmod.length > showCharmod) {
           var cc = contentmod.substr(0, showCharmod);
            var hh = contentmod.substr(showCharmod, contentmod.length - showCharmod);
 
            var htmlmod = cc + '<span class="moreellipses">' + ellipsestextmod+ '&nbsp;</span><span class="morecontent"><span>' + hh + '</span>&nbsp;&nbsp;<a href="" class="morelinkmod">' + moretextmod + '</a></span>';
             $(".wrapper_header .moduleName").html(htmlmod);
        }
	 $(".morelinkmod").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretextmod);			
        } else {
		$(".wrapper_header").css("background", "#f4f4f3");
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });

			}
			else if(device.MobileDevice() == true){
			 $(".title, .title h1, .title h3").css("white-space", "normal");
  	 $(".inner_container .title h3").css("width", "100%");
 	 $(".title, .title h1, .title h3").css("overflow", "");
	 $(".title, .title h1, .title h3").css("text-overflow", "");
	 $(".title1-h3").css("text-overflow", "ellipsis");
	 $(".title1-h1").css("text-overflow", "ellipsis");
	/*  $(".title1-h3").css("white-space", "inherit"); */
	 $(".title1-h3").css("white-space", "normal");
	 $(".title1-h1").css("white-space", "normal");
        var content = courseTitle;
         if(content.length > showCharmob) {
           var c = content.substr(0, showCharmob);
            var h = content.substr(showCharmob, content.length - showCharmob);
 
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span><b>' + h + '</b></span>&nbsp;&nbsp;<a href="" class="morelink">' + moretextmob + '</a></span>';
            $(".wrapper_header .moduleName").html(html);
			
        }
 
    
 
    /* $(".morelink").click(function(){
	 $(".tooltip").html('');
						$(".tooltip").css("opacity", "0")
						$(".tooltip").css("visibility", "hidden");
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretextmob);			
        } else {
		$(".wrapper_header").css("background", "#005db8");
            $(this).addClass("less");
            $(this).html(lesstextmob);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    }); */
	 var contentmod = ModTitles[currModule-1];
         if(contentmod.length > showCharmodmob) {
           var cc = contentmod.substr(0, showCharmodmob);
            var hh = contentmod.substr(showCharmodmob, contentmod.length - showCharmodmob);
 
            var htmlmod = cc + '<span class="moreellipses">' + ellipsestextmod+ '&nbsp;</span><span class="morecontent"><span>' + hh + '</span>&nbsp;&nbsp;<a href="" class="morelinkmod">' + moretextmod + '</a></span>';
             $(".wrapper_header .moduleName").html(htmlmod);
        }
	 $(".morelinkmod").click(function(){
	  $(".tooltip").html('');
						$(".tooltip").css("opacity", "0")
						$(".tooltip").css("visibility", "hidden");
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretextmod);			
        } else {
		$(".wrapper_header").css("background", "#f4f4f3");
            $(this).addClass("less");
            $(this).html(lesstextmob);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });

			}
			/**********Read more / Less options**************/
			else {
			/**********Desktop Tooltip options**************/
 		  	 $(".modulepopupLogout .courseName").mouseover(function(){
  			// alert(coverflowchild+" AA "+coverflowparent)
			 
			 
			 $(".tooltip").html('').html(courseTitle);
			$(".tooltip").css("opacity", "1")
			$(".tooltip").css("visibility", "visible");
			 			
						  
			 })
			 $(".modulepopupLogout .courseName").mouseout(function(){
			 $(".tooltip").css("visibility", "hidden")
			 $(".tooltip").css("opacity", "0")
			})
		$(".wrapper_header .courseName").mouseover(function(){
		 
			 
			
			 $(".tooltip").html('').html(courseTitle);
			$(".tooltip").css("opacity", "1")
			$(".tooltip").css("visibility", "visible");
			 	
			})
			$(".wrapper_header .courseName").mouseout(function(){
		 
			 
			
			 $(".tooltip").html('');
			$(".tooltip").css("opacity", "0")
			$(".tooltip").css("visibility", "hidden");
			 	
			})
			$(".wrapper_header .moduleName").mouseover(function(){
			 $(".tooltip").html('').html(ModTitles[currModule-1]);
			$(".tooltip").css("opacity", "1")
			$(".tooltip").css("visibility", "visible");
			})  
			
			$(".wrapper_header .moduleName").mouseout(function(){
			 $(".tooltip").html('');
						$(".tooltip").css("opacity", "0")
						$(".tooltip").css("visibility", "hidden");
			})
			}
			})
		}).fail(function() {
			console.log("Page JSON Data Not Loaded");
		})
	}
	
};
var audioTranscriptText="";
var mediaSrc;
var scrollContentImage;
var quickRefCont;
function fnAssignExternalData(){
	fnAssaignPageNumber(currPageNum);
	fnAssaignModulePageName(currModule-1);
	fnChangeImageSrc();
	fnAssignTemplateScript();
	audioTranscriptText="";
	if(pageGroupArray[currModule-1][currPageNum-1]=="cyu"){
		$(".audio_text").hide();
		fnLoadPageExternalData(ExternalPageData);
	}else{	
		if(pageType=="subPage"){		
			$.each(ExternalPageData, function(key, value) {
				if(key=="audioTransText")
				{
					audioTranscriptText=value.text
				}else if(key=="mediaFile"){
					mediaSrc=value.name
				}else if(key=="mediaSubFile"){
					subAudioFile=value.name
				}else if(key=="scrollContent")
				{
					scrollContentImage=value.name
				}else if(key=="quickRefContent")
				{
					quickRefCont=value.name
				}else{
					$("." + key).html(value.text);
				}
			});
		}else{
		
			if(pageTypeArray[currModule-1][currPageNum-1]=="int_pop" || pageTypeArray[currModule-1][currPageNum-1]=="chart_clk" || pageTypeArray[currModule-1][currPageNum-1]=="clk_qk" || pageTypeArray[currModule-1][currPageNum-1]=="clk_rvl" || pageTypeArray[currModule-1][currPageNum-1]=="clk_spot"){
				fnLoadPageExternalData(ExternalPageData);
			} else {
			
				$.each(ExternalPageData, function(key, value) {
					if(key=="audioTransText")
					{
						audioTranscriptText=value.text
					}else if(key=="mediaFile"){
						mediaSrc=value.name
					}else if(key=="mediaSubFile"){
						subAudioFile=value.name
					}else if(key=="scrollContent")
					{
						scrollContentImage=value.name
					}else if(key=="quickRefContent")
					{
						quickRefCont=value.name
					}else{
						$("." + key).html(value.text);
					}
				});
			}
		}
	} 
};
/**********************Assigning Dynamic path for Elements**********************/
function fnChangeImageSrc()
{
	var _imgPath = "../course/content_"+currLang+"/module_"+currModule+"/assets/images/";
	var FileName=pagesArray[currModule-1][currPageNum-1];
	var FolderName=FileName.split(".html")[0];
	_imgPath=_imgPath+FolderName+"/";		
	$("#page").find('img').each(function() {
		var imgSrc = $(this).attr('src').split("/");;
		var tmppath=imgSrc[0];
		imgSrc= imgSrc[imgSrc.length-1];
		if(tmppath!="framework")
		{
			if(imgSrc!=undefined){
				imgSrc = _imgPath + imgSrc;
				$(this).attr('src',imgSrc);		
			}
		 } 
	}); 
}
function fnLoadContentImageSrc(aName)
{
	var _imgPath = "../course/content_"+currLang+"/module_"+currModule+"/assets/images/";
	var FileName=pagesArray[currModule-1][currPageNum-1];
	var FolderName=FileName.split(".html")[0];
	_imgPath=_imgPath+FolderName+"/";		
	return _imgPath+aName;
}
function fnLoadCYUImage(aName)
{
	var _imgPath = "../course/content_"+currLang+"/module_"+currModule+"/assets/images/";
	var FileName=pagesArray[currModule-1][currPageNum-1];
	var FolderName=FileName.split(".html")[0];
	_imgPath=_imgPath+FolderName+"/";		
	return _imgPath+aName;
}
function fnLoadExternalCont(aName)
{
	var resPath = "../course/content_"+currLang+"/global/assets/resources/";
	return resPath+aName; 
}
function fnChangevideoSrc()
{
	var vidPath = "../course/content_"+currLang+"/module_"+currModule+"/assets/videos/";
	return vidPath+mediaSrc; 
}
function fnChangeimageSrc()
{
var ImageFolderName=pagesArray[currModule-1][currPageNum-1].split(".")[0];
	var imgPath = "../course/content_"+currLang+"/module_"+currModule+"/assets/images/"+ImageFolderName+"/";
	return imgPath+mediaSrc; 
}
function fnChangeAudioSrc()
{
	var _audPath = "../course/content_"+currLang+"/module_"+currModule+"/assets/audios/";
	return _audPath+mediaSrc;
}
function fnChangeSubAudioSrc()
{
	var _audPath = "../course/content_"+currLang+"/module_"+currModule+"/assets/audios/";
	return _audPath+subAudioFile;
}
function fnUpdateScript()
{
	var scriptFileName= pagesArray[currModule-1][currPageNum-1].split(".")[0];
	if(scriptFileName!="no" && scriptFileName!="undefined" && scriptFileName!="" && scriptFileName!=null && scriptFileName!=undefined){
		var scriptPath='../course/content_'+currLang+'/module_'+currModule+'/js/'+scriptFileName+".js";
		$("#page").find('script').after("<script src="+scriptPath+"></script>") 
	}else{
		console.log("script file not needed");
	}
}
/********************************Assigning Screen Number********************************/
function fnAssaignPageNumber(aNum)
{
	if(aNum<10)
	{
		if(pagesArray[currModule-1].length<10)
		{
			$(".page_num .pgNum").html(screenNumberTxt+": 0"+aNum+" / 0"+pagesArray[currModule-1].length);
		}else{
			$(".page_num .pgNum").html(screenNumberTxt+": 0"+aNum+" / "+pagesArray[currModule-1].length);
		}
	}else{
		if(pagesArray[currModule-1].length<10)
		{
			$(".page_num .pgNum").html(screenNumberTxt+": "+aNum+" / 0"+pagesArray[currModule-1].length);
		}else{
			$(".page_num .pgNum").html(screenNumberTxt+": "+aNum+" / "+pagesArray[currModule-1].length);
		}
	}
	//$(".page_num").css({'height': $('.right_btns').height()});
	if(!device.MobileDevice()){
		$(".pgNum").css({'margin-top': (($('.right_btns').height() - $('.pgNum').height())/2)});
	}
}
/********************************Assigning Module and Screen Name********************************/
function fnAssaignModulePageName(aNum)
{
	if(pageType=="subPage")
	{
		if(courseType=="course"){
			$(".moduleName").html(ModTitles[aNum]);
			$(".pageName").html(pageTitlesArr[aNum][currPageNum-1]+" > "+subPageTitlesArr[aNum][currPageNum-1][subPageNum]);
		}else{
			$(".pageName").html(pageTitlesArr[currPageNum-1])
		}
	}else{
		if(courseType=="course"){
			$(".moduleName").html(ModTitles[aNum]);
			$(".pageName").html(pageTitlesArr[aNum][currPageNum-1]);
		}else{
			$(".pageName").html(pageTitlesArr[currPageNum-1])
		}
	}
}
/************************************Assigning Audio Script Text**********************************/
function fnAssignAudioText(aNum)
{
	$(".audio_text").hide();
	if(pageType=="subPage")
	{
		$("#audioTranscript p").html("");
		$("#audioTranscript p").html(audioTranscriptText);
		if($("#audioTranscript").hasClass("mCustomScrollbar")){
			$('#audioTranscript').mCustomScrollbar("update");
		}else{
			$("#audioTranscript").mCustomScrollbar( {
				scrollButtons:{enable:true},
				theme:"dark-thick",
				mouseWheelPixels: 200
			});		
		}
	}else
	{	
		if(pageTypeArray[currModule-1][currPageNum-1]=="steplist" || pageTypeArray[currModule-1][currPageNum-1]=="2d_ani" || pageTypeArray[currModule-1][currPageNum-1]=="obj" || pageTypeArray[currModule-1][currPageNum-1]=="txtImg" ){
			$("#audioTranscript p").html("");
			$("#audioTranscript p").html(audioTranscriptText);
			if($("#audioTranscript").hasClass("mCustomScrollbar")){
				$('#audioTranscript').mCustomScrollbar("update");
			}else{
				$("#audioTranscript").mCustomScrollbar( {
					scrollButtons:{enable:true},
					theme:"dark-thick",
					mouseWheelPixels: 200
				});		
			}
		}else{
			$(".audio_text").hide();
			$("#audioTranscript_1 p").html("");
			$("#audioTranscript_1 p").html(audioTranscriptText);
			if($("#audioTranscript_1").hasClass("mCustomScrollbar")){
				$('#audioTranscript_1').mCustomScrollbar("update");
			}else{
				$("#audioTranscript_1").mCustomScrollbar( {
					scrollButtons:{enable:true},
					theme:"dark-thick",
					mouseWheelPixels: 200
				});		
			}
		}
	}
}
/************************************Assigning scripts for Each Template**********************************/
function fnAssignTemplateScript()
{
	seekbarControls="enabled";
	$("body").removeClass("audioEnded");
	if(audioPlayer) {
		audioPlayer.enableControls();
	}
	if(pageTypeArray[currModule-1][currPageNum-1]=="int_pop")
	{
		$("#page").find('script').after("<link href='framework/js/plugins/mediaelement/mediaelementplayer.css' rel='stylesheet'/><script src='framework/js/plugins/mediaelement/mediaelement-and-player.js'></script><script src='templates/js/clicknlearn.js'></script>");
	}
	if(pageTypeArray[currModule-1][currPageNum-1]=="clk_qk")
	{
		$("#page").find('script').after("<script src='templates/js/clickquick.js'></script>");
	}
	else if(pageTypeArray[currModule-1][currPageNum-1]=="cyuImagemcq")
	{
		$("#page").find('script').after("<script src='templates/js/cyuImagemcq.js'></script>") 
	}else if(pageTypeArray[currModule-1][currPageNum-1]=="steplist")
	{
		seekbarControls="disabled";
		$("#page").find('script').after("<script src='templates/js/stepbystep.js'></script>") 
	}
	else if(pageTypeArray[currModule-1][currPageNum-1]=="cyumcq")
	{
		$("#page").find('script').after("<script src='templates/js/cyumcq.js'></script>") 
		$("body").addClass("cyuenabled");
	}else if(pageTypeArray[currModule-1][currPageNum-1]=="dropHotspot")
	{
		$("#page").find('script').after("<script src='templates/js/dropHotspot.js'></script>") 
	}else if(pageTypeArray[currModule-1][currPageNum-1]=="dropImages")
	{
		$("#page").find('script').after("<script src='templates/js/dropImages.js'></script>") 
	}else if(pageTypeArray[currModule-1][currPageNum-1]=="dropText")
	{
		$("#page").find('script').after("<script src='templates/js/dropText.js'></script>") 
	}else if(pageTypeArray[currModule-1][currPageNum-1]=="cyuseq")
	{
		$("#page").find('script').after("<script src='templates/js/cyuseq.js'></script>") 
	}
	else if(pageTypeArray[currModule-1][currPageNum-1]=="cyuHotspot")
	{
		$("#page").find('script').after("<script src='templates/js/cyuHotspot.js'></script>") 
	}
	else if(pageTypeArray[currModule-1][currPageNum-1]=="chart_clk")
	{
		$("#page").find('script').after("<script src='templates/js/chartclk.js'></script>") 
	}
	else if(pageTypeArray[currModule-1][currPageNum-1]=="clk_rvl")
	{
		$("#page").find('script').after("<script src='templates/js/clickandreveal.js'></script>") 
	}
	else if(pageTypeArray[currModule-1][currPageNum-1]=="clk_spot")
	{
		$("#page").find('script').after("<script src='templates/js/clickhotspot.js'></script>") 
	}
	
}
/************************************Page Load Function**********************************/
function fnLoadPage(aNum){
	if(!menuBtnClick){
		fnMenuCompletionPage(aNum);
	}
	$(".videocontent .mejs-playpause-button").css('pointer-events', 'auto')
		$(".videocontent #vidPlayer").css('pointer-events', 'auto');
		$(".videocontent .mejs-overlay-play").css('pointer-events', 'auto');
	subAudio[0].pause()
	fnAudioVideoPause(true);
	$(".contentAreaFrame .arrow-down-AT").hide();
	$(".back_btn").hide();
	$(".back_btn1").hide();
	var pageContainer=$('.pgContainer');
	var leftMargin = ($('.wrapper_header').width() / 2)-75;
	var topMargin = ($(".contentAreaFrame").height()/2)-50
	$('.preloader').css({'left': leftMargin, 'top': topMargin}); 
	$(".mainprogress > .main_percent").html("0 %");
	$(".mainprogress > .progressDiv").width(0);
	$(".mejs-overlay-loading").css("opacity","0");
	$(".preloader, .preloaderBg").show();
	$(".clickNxtInfo").hide();
	if(courseType=="course"){
		var pagePath='../course/content_'+currLang+'/module_'+currModule+'/html/'+pagesArray[currModule-1][aNum-1];
	}else{
		var pagePath='../course/content_'+currLang+'/asmnt/html/'+pagesArray[aNum-1];
	}
	$(".main_menu_open, .main_menu_arw").hide()
	$(".help_menu_open, .sub_menu_arw_open").hide()
	pageType="main";
	currPageNum=aNum;
	firstTime=false;
	 var tWidth=$('.header_new').width();
	var tHgtMenu =Number(tWidth*8/16)+10;
	$(".menu_items").css('height', tHgtMenu);
	
	 if(automaticswitchOn == true){
	 $(".mejs-captions-layer").css("display", "block !important");
	 $(".mejs-captions-layer").addClass("mejs-captions-enabled")
	 }
	 
	 if(currModule == totalModules){
	 if(currPageNum >= pagesArray[currModule-1].length){
	 $(".right_arw_btn").css("pointer-events", "none");	 
	 }
	 else {
	  $(".right_arw_btn").css("pointer-events", "auto");
	 }
  }
  else {
	  $(".right_arw_btn").css("pointer-events", "auto");
	 }
 	if(currModule == 1 && currPageNum == 1){   // newly added for disable prevbutton
	$(".left_arw_btn").css("pointer-events", "none");
	
	}
	else {
	$(".left_arw_btn").css("pointer-events", "auto");
	}
	/* next button issue fixes - start */
	/* if(window.opener.courseCompletion != window.opener.courseArray.length) {
		$(".rightBtn").removeClass("arw_btn_disabled");
		$(".right_arw_btn").css("pointer-events", "auto");
	} */
	/* next button issue fixes - end */
	if(pageGroupArray[currModule-1][aNum-1]=="cyu"){
		fnEnableDisableBtnsForCYU(true);
	}else{
		if(!RemediationPage)
		{
			fnEnableDisableBtnsForCYU(false);
			fnEnableDisableBtn(aNum);
		}else{	
			if(remePage.length>1)
			{
				if(remedIndex==0)
				{
					$(".right_arw_btn").removeClass("deActiveBtn");
					$(".right_arw_btn").removeClass("arw_btn_disabled");
					$(".left_arw_btn").addClass("deActiveBtn");
					$(".left_arw_btn").addClass("arw_btn_disabled")
				}else if(remedIndex==remePage.length-1)
				{
					$(".right_arw_btn").addClass("deActiveBtn");
					$(".right_arw_btn").addClass("arw_btn_disabled");
					$(".left_arw_btn").removeClass("deActiveBtn");
					$(".left_arw_btn").removeClass("arw_btn_disabled")
				}else{
					$(".right_arw_btn").removeClass("deActiveBtn");
					$(".right_arw_btn").removeClass("arw_btn_disabled");
					$(".left_arw_btn").removeClass("deActiveBtn");
					$(".left_arw_btn").removeClass("arw_btn_disabled")
				}
			}else{
				fnEnableDisableBtnsForCYU(true);
			}
		}
	}
	pageContainer.empty();
	pageContainer.load(pagePath, function() {		
		fnShowCurrentPage(currPageNum);			
		if(pageGroupArray[currModule-1][aNum-1]!="cyu"){
		
			if(RemediationPage)
			{
				}else{
				if(pageType!="subPage"){
					fnEnableDisableBtn(aNum);
					fnPageCompletion(aNum);
				}
			}
			
		}else{
		$('#page').find('.popupcyuscreen .pop_close').attr("title", closeTxt);
			if(window.opener!=null){
				window.opener.bkModule=currModule;
				window.opener.bkPage=currPageNum;
				var arrayString = "";
				for(var i =0; i<pageCompletionArray.length;i++){
					if(i != 0){
						arrayString += ",";
					}
					arrayString += pageCompletionArray[i];			
				}
				window.opener.bkdatastring=arrayString;
				window.opener.bkBookmarkpages=bkLMSArray;
				window.opener.fnUpdateSuspendData();
			}	
		}
	});
	if(device.iPad()){
		if(pageType=="main")
		{
			if(pageTypeArray[currModule-1][currPageNum-1]=="2d_ani" || pageTypeArray[currModule-1][currPageNum-1]=="steplist" || pageTypeArray[currModule-1][currPageNum-1]=="obj" || pageTypeArray[currModule-1][currPageNum-1]=="txtImg")
			{
				if(audioPlayer){
				}
				if(videoPlayer){
					videoPlayer.play();
				}					
			}else if(pageTypeArray[currModule-1][currPageNum-1]=="int_pop" || pageTypeArray[currModule-1][currPageNum-1]=="chart_clk" || pageTypeArray[currModule-1][currPageNum-1]=="clk_qk" || pageTypeArray[currModule-1][currPageNum-1]=="clk_rvl" || pageTypeArray[currModule-1][currPageNum-1]=="clk_spot")
			{
				if(videoPlayer){
					videoPlayer.pause();
				}
				
				if(visitedAudio && backBtnClicked)
				{
					if(audioPlayer){
						audioPlayer.pause();
					}
				}else{
					setTimeout(function(){
						$(".mejs-playpause-button").trigger("click");
					},150)
				}
			}else {
				if(audioPlayer){
					audioPlayer.pause();
				}
				if(videoPlayer){
					videoPlayer.pause();
				}
			}
		}else{
			if(subPageTypeArray[currModule-1][currPageNum-1][subPageNum]=="2d_ani" || subPageTypeArray[currModule-1][currPageNum-1][subPageNum]=="steplist" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="obj" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="txtImg")
			{
				audioPlayer.pause();
				videoPlayer.play();
				
			}else if(subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="int_pop" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="chart_clk" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="clk_qk" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="clk_rvl" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="clk_spot")
			{
				videoPlayer.pause();
				audioPlayer.play();
			}else {
				audioPlayer.pause();
				videoPlayer.pause();
			}
		}
	}
	
}
/************************************Sub Page Load Function**********************************/
function fnLoadSubPage(aSubPage){
	subAudio[0].pause()
	fnAudioVideoPause(true);
	$(".contentAreaFrame .arrow-down-AT").hide();
	$(".back_btn").hide();
	$(".back_btn1").hide();
	var pageContainer=$('.pgContainer');
	var leftMargin = ($('.wrapper_header').width() / 2)-75;
	var topMargin = ($(".contentAreaFrame").height()/2)-50
	$('.preloader').css({'left': leftMargin, 'top': topMargin}); 
	$(".mainprogress > .main_percent").html("0 %");
	$(".mainprogress > .progressDiv").width(0);
	$(".preloader, .preloaderBg").show();
	$(".clickNxtInfo").hide();
	var pagePath='../course/content_'+currLang+'/module_'+currModule+'/html/'+subPagesArray[currModule-1][currPageNum-1][aSubPage];
	subPageNum=aSubPage;
	pageType="subPage";
	$(".main_menu_open, .main_menu_arw").hide()
	$(".help_menu_open, .sub_menu_arw_open").hide()
	pageContainer.empty();
	pageContainer.load(pagePath, function() {
		fnShowCurrentPage(currPageNum);	
		fnDisableAllBtn();
		if(RemediationPage)
		{
			$(".back_btn").hide();
			$(".back_btn1").show();
		}else{
			$(".back_btn").show();
			$(".back_btn1").hide();
		}
		$('.back_btn, .back_btn1').click(function(e) {
			backBtnClicked=true;		
			fnSubPageCompletion(currPageNum,subPageNum);
			fnLoadPage(currPageNum);
			$(".videocontent").hide();
		});
	}); 
}


function fnLoadSubimg(aSubPage){
	subAudio[0].pause()
	fnAudioVideoPause(true); 
	$('.videocontent .mejs-controls').css('display', "none");	
	$('.videocontent .mejs-layers').css('display', "none");	
	$(".contentAreaFrame .arrow-down-AT").hide();
	$(".back_btn").hide();
	$(".back_btn1").hide();
	var pageContainer=$('.pgContainer');
	var leftMargin = ($('.wrapper_header').width() / 2)-75;
	var topMargin = ($(".contentAreaFrame").height()/2)-50
	$('.preloader').css({'left': leftMargin, 'top': topMargin}); 
	$(".mainprogress > .main_percent").html("0 %");
	$(".mainprogress > .progressDiv").width(0);
	$(".preloader, .preloaderBg").show();
	$(".clickNxtInfo").hide();
	var pagePath='../course/content_'+currLang+'/module_'+currModule+'/html/'+subPagesArray[currModule-1][currPageNum-1][aSubPage];
	subPageNum=aSubPage;
	pageType="subPage";
	$(".main_menu_open, .main_menu_arw").hide()
	$(".help_menu_open, .sub_menu_arw_open").hide()
	pageContainer.empty();
	pageContainer.load(pagePath, function() {
		fnShowCurrentPage(currPageNum);	
		fnDisableAllBtn();
		if(RemediationPage)
		{
			$(".back_btn").hide();
			$(".back_btn1").show();
		}else{
			$(".back_btn").show();
			$(".back_btn1").hide();
		}
		$('.back_btn, .back_btn1').click(function(e) {
			backBtnClicked=true;		
			fnSubPageCompletion(currPageNum,subPageNum);
			fnLoadPage(currPageNum);
			$(".videocontent").hide();
		});
	}); 
}
/************************************Navigating to Next Page**********************************/
function fnNextPage()
{

	if(RemediationPage)
	{
		remedIndex++;
		$(".remedPageNum").html((remedIndex+1)+" "+ofTxt+" "+remePage.length);
		fnLoadPage(remePage[remedIndex]);
 
	}else{
		if(pageGroupArray[currModule-1][currPageNum-1]!="cyu") {
			fnMenuCompletionPage(currPageNum);
		}	 
	  
		swipeDir="left";
		$('#prevBtn').removeClass("deActiveBtn");
		if(currPageNum==pagesArray[currModule-1].length)
		{
			if(currModule==totalModules){
				$('#nextBtn').addClass("deActiveBtn");
			}else{
				if(totalPages[currModule]==0){
				}else{
					removeunwantedVisit++
					//currModule=currModule+1;
					currModule=Number(currModule)+1;
					fnCreateAssetsFilesize(currModule);		
					fnLoadPage(1);
					fnLoadModulePrintData(); 	
					fnSearchData();
					fnCreateLeftMenu(currModule-1);	
					if(removeunwantedVisit == 1){
					 $(".menu_items_div").find(".cyu_bg").removeClass("menuvisited");
					 $(".menu_items_div").find(".video_bg").removeClass("menuvisited");
					}
					 
				}				
			}
		}else{
			currPageNum++;
			$(".preloader, .preloaderBg").show();
			fnLoadPage(currPageNum);
		}
	}
}
/*************************************Navigating to Previous Page************************************/
function fnPrevPage()
{
	if(RemediationPage)
	{
		remedIndex--;
		$(".remedPageNum").html((remedIndex+1)+" "+ofTxt+" "+remePage.length);
		fnLoadPage(remePage[remedIndex]);
 
	}else{
	 
 	 
		swipeDir="right";
		fnMenuCompletionPage(currPageNum);
		$('#nextBtn').removeClass("deActiveBtn");
		if(currPageNum==1)
		{
			if(currModule==1){
				$('#prevBtn').addClass("deActiveBtn");
			}else{
			removeunwantedVisit++
				currModule=currModule-1;
				fnCreateAssetsFilesize(currModule);		
				fnLoadPage(pagesArray[currModule-1].length);
				fnLoadModulePrintData(); 	
				fnSearchData();
				fnCreateLeftMenu(currModule-1);		
				if(removeunwantedVisit == 1){
				 
					 $(".menu_items_div").find(".cyu_bg").removeClass("menuvisited");
					 $(".menu_items_div").find(".video_bg").removeClass("menuvisited");
					}
					 
			}
		}else{
			currPageNum--;
			$(".preloader, .preloaderBg").show();
			fnLoadPage(currPageNum);
		}
	}
}
/************************************Enable/Disable GUI Buttons**********************************/
function fnEnableDisableBtn(aNum){
	$(".leftBtn").removeClass("arw_btn_disabled");
	$(".rightBtn").removeClass("arw_btn_disabled");
	$('#prevBtn').removeClass("deActiveBtn");
	$('#nextBtn').removeClass("deActiveBtn");
	if(aNum==1)
	{
		if(currModule==1){
			$(".leftBtn").addClass("arw_btn_disabled");
		}else{
			if(totalPages[currModule-2]==0){
				$(".leftBtn").addClass("arw_btn_disabled");
				$('#prevBtn').addClass("deActiveBtn");
			}
		}
	}else if(aNum==pagesArray[currModule-1].length)
	{
		if(currModule==totalModules){
			$(".rightBtn").addClass("arw_btn_disabled");
		}else{
			if(totalPages[currModule]==0){
				$(".rightBtn").addClass("arw_btn_disabled");
			}
		}
	}
}
function fnEnableDisableBtnsForCYU(aFlag)
{	
	if(aFlag)
	{
		$('#prevBtn').addClass("deActiveBtn");
		$('#nextBtn').addClass("deActiveBtn");
		$(".leftBtn").addClass("arw_btn_disabled");
		$(".rightBtn").addClass("arw_btn_disabled"); 
		$(".main_menu_click").addClass("btn_disabled");
		$(".main_menu_click").css("cursor","default"); 		
		$(".search_clkbtn").addClass("btn_disabled");
		$(".search_clkbtn").css("cursor","default"); 	
		$(".help_menu_click").addClass("btn_disabled");
		$(".help_menu_click").css("cursor","default"); 	
		$(".modulecontinue_clkbtn").addClass("btn_disabled");
		$(".modulecontinue_clkbtn").css("pointer-events","none"); 			
		$(".modulecontinue_clkbtn").css("cursor","default"); 	
		$(".modulecontinue_clkbtn_1:after").css("cursor","default"); 			
	}else{
		$('#prevBtn').removeClass("deActiveBtn");
		$('#nextBtn').removeClass("deActiveBtn");
		$(".leftBtn").removeClass("arw_btn_disabled");
		$(".rightBtn").removeClass("arw_btn_disabled"); 
		$(".main_menu_click").removeClass("btn_disabled"); 
		$(".main_menu_click").css("cursor","pointer"); 			
		$(".search_clkbtn").removeClass("btn_disabled");
		$(".search_clkbtn").css("cursor","pointer"); 			
		$(".help_menu_click").removeClass("btn_disabled");
		$(".help_menu_click").css("cursor","pointer"); 	
		$(".modulecontinue_clkbtn").removeClass("btn_disabled");	
		$(".modulecontinue_clkbtn").css("cursor","pointer"); 
		$(".modulecontinue_clkbtn").css("pointer-events","auto"); 			
		$(".modulecontinue_clkbtn_1:after").css("cursor","pointer"); 					
	}
}
function fnDisableAllBtn(){
	$('#prevBtn').addClass("deActiveBtn");
	$('#nextBtn').addClass("deActiveBtn");
	$(".leftBtn").addClass("arw_btn_disabled");
	$(".rightBtn").addClass("arw_btn_disabled");
}
var RemediationPage=false;
var remePage=new Array();	
var remedIndex=0;
function fnDisableRemediationBtns(aPage)
{
	$(".remediationBtn").show()
	RemediationPage=true;
	$(".remedPageNum").html((remedIndex+1)+" "+ofTxt+" "+remePage.length);
	fnLoadPage(remePage[remedIndex]);
	fnDisableAllBtn();
	if(remePage.length>1)
	{
		$(".right_arw_btn ").removeClass("deActiveBtn");
		$(".right_arw_btn ").removeClass("arw_btn_disabled");
	}
}
function fnHideShellElements()
{
	$(".menu").hide();
	$(".search").hide();
	$(".sub_menu").hide();
}
/************************************Additional functions**********************************/
function uniqueArr(list) {
	var result = [];
	$.each(list, function(i, e) {
		if ($.inArray(e, result) == -1) result.push(e);
	});
	return result;
}
function fnCheckWordCount(aObj)
{
	var charactres = $(aObj).html().length;
}
/******************************************************************************************/