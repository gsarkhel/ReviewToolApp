/*****************************Variables Declaration*******************************/
var audioPlayer;
var tmpAudioID;
var currrentPageType;
var currRunningaudio;
var audioPlayState;
var videoPlayState;
var firstTimePlayerLoad=false;
var stepAutoPlay=true;
var cuePointSplitArr=[];
var cuePointAudioArr=[];
var cuePointTextAnimArr=[];
var ccTextOpen=false;
var initAudioPlayer=false;
var initVideoPlayer=false;
var Lastvolume=0.8;
var MuteState=false;
var firstIconLoad=false;
var tAudHeight;
var videoPlayer;
var automaticswitchOn = false;
var popupopen = false;
/*****************************Document Initailization*******************************/
$(document).ready(function(){

	/*****************************Aligning Elements to orientation*******************************/
	window.addEventListener("orientationchange", function() {
		var tWidth=$('.wrapper_header').width();
		tHgt=Number(tWidth*8/16)-39;
		
		if(device.iPad()){
			if(audioPlayer)
			{
				if(pageGroupArray[currModule-1][currPageNum-1]=="cyu")
				{
					if(!device.MobileDevice()){
						//$('.bgwhite_bdrblue').css('height', (tHgt));
						$('.content').css('height',tHgt+39);
					}else{
						var contheight=$(window).height()-$(".wrapper_header").height()-$(".sub_header").height()-$(".copyRightTxt").height()-40;
						$('.content').css("height",contheight);
						$('.button_bdr_top').removeClass('button_bdr_top');
					}
				}else{
					//$('.bgwhite_bdrblue').css('height', tHgt);
					if(!device.MobileDevice()){
						$('.content').css('height',tHgt+39);
					}else{
						var contheight=$(window).height()-$(".wrapper_header").height()-$(".sub_header").height()-$(".copyRightTxt").height()-80;
						$('.content').css("height",contheight);
					}
				}
				if(window.orientation==180 || window.orientation==0)
				{
					$(".contentAreaFrame").css("width","650px");
					$('.content').css('height',"707px");
				}else{
					$(".contentAreaFrame").css("width","900px");
					$('.content').css('height',"450px");					
				}
				$(".pgContainer").css('margin-bottom','21px');
				//$('.footer .bgwhite_bdrblue').css('height', (tHgt)+8);
			}
			if(videoPlayer){
				if(pageTypeArray[currModule-1][currPageNum-1]!="steplist"){
					$('.videocontent').css('height', (tHgt));
					$('.videocontent .mejs-inner').css('height', (tHgt));
				}else{
  					$('.videocontent').css('height', (tHgt-76));
					$('.videocontent .mejs-inner').css('height', (tHgt-76));		
				}
				$('.videocontent').css('top', "10px");
				$(".pgContainer").css('margin-top','11px');
				var contheight=$(window).height()-$(".wrapper_header").height()-$(".sub_header").height()-$(".copyRightTxt").height()-40;
				if(pageTypeArray[currModule-1][currPageNum-1]=="steplist"){
					$(".videocontent .mejs-captions-position .arrow-down").css("top","28px");
				}else{
					$(".videocontent .mejs-captions-position .arrow-down").css("top","35px");
				}
				if(window.orientation==180 || window.orientation==0)
				{
					$(".contentAreaFrame").css("width","650px");
					$('.content').css('height',"707px");
					
					$(".pgContainer #processAlertContainer").css('height', $(".mejs-video").height()+$(".pgContainer .steplistBar").height()+40)
				}else{
					$(".contentAreaFrame").css("width","900px");
					$('.content').css('height',"450px");	
					$('.videocontent').css('height',"450px");							 
$(".pgContainer #processAlertContainer").css('height', $(".mejs-video").height()+$(".pgContainer .steplistBar").height()+140)					
				}
				if(pageTypeArray[currModule-1][currPageNum-1]=="steplist"){
					$('.videocontent1').css('height', tHgt-86);
					tHgt=tHgt-45;
					$(".mejs-container").css('height', null);
					$(".mejs-container").height('');
					setTimeout(function()
					{				
						$('.videocontent .audio_text').css('height',$(".mejs-video").height()-10);
						$('.videocontent .mejs-controls').css('bottom', "-39px");			
						$('.steplistBar').css({'top': $(".mejs-video").height()+40, 'z-index': '100'});
					},300);
				}else{
					$('.videocontent .audio_text').css('height', Number(tHgt-31));
					$('.videocontent .mejs-controls').css('bottom', "-39px");
				}
			}	
		}
			if(device.iPad()){
		if(window.orientation==180 || window.orientation==0)
   {
   //alert("1")
   
	 $(".help_menu_open_plus").css("top",$(".module_index_header").height())
	}
	else {
	//alert("2")
	  $(".help_menu_open_plus").css("top",$(".module_index_header").height())
	}
		}
		if(device.MobileDevice()){
			if(window.orientation==180 || window.orientation==0)
				{
					 var portheight=$(window).height()+$(".wrapper_header").height()+$(".sub_header").height()-$(".copyRightTxt").height();
						$('.content').css("height",portheight);
						//alert(portheight)
				}
		}
		 
			
	}, false);
});
/*****************************Audio Player - Function*******************************/
function audioPlayerFunction(audioSource,aID){
	$(".loader-spiner").css("border","#bbb");
	cuePointSplitArr=[];
	cuePointAudioArr=[];
	initcnt=1;
	initTextCnt=1;
	var tWidth=$('.wrapper_header').width();
	tHgt=Number(tWidth*8/24)-22;
	$(".media-wrapper .videocontent").hide()
	if(videoPlayer!=undefined)
	{
		Lastvolume=videoPlayer.getVolume();
	}
  	if(pageGroupArray[currModule-1][currPageNum-1]=="cyu")
	{
		if(!device.MobileDevice()){
			$('.bgwhite_bdrblue').css('height', (tHgt));
			$('.videocontent .bgwhite_bdrblue').css('height', (tHgt-89));
			$('.content').css('height',tHgt+39);
		}else{
			var contheight=$(window).height()-$(".wrapper_header").height()-$(".sub_header").height()-$(".copyRightTxt").height()-40;
			$('.content').css("height",contheight);
			
			$('.button_bdr_top').removeClass('button_bdr_top');
		}
		if(device.iPad()){
		$('.content').css('height',tHgt+99);
		}
	}else{
		$('.bgwhite_bdrblue').css('height', tHgt);
		if(!device.MobileDevice()){
			$('.content').css('height',tHgt+39);
			//alert(tHgt)
		}else{
			var contheight=$(window).height()-$(".wrapper_header").height()-$(".sub_header").height()-$(".copyRightTxt").height()-45;
			$('.content').css("height",contheight);
			 
		}
		if(device.iPad()){
		$('.content').css('height',tHgt+99);
		}
	}  
	$(".pgContainer").css('margin-bottom','21px');
	if(!initAudioPlayer)
	{
		audioPlayer='';
		audioPlayer = new MediaElementPlayer('#audio_player', {
			// shows debug errors on screen
			enablePluginDebug: false,
			// remove or reorder to change plugin priority
			plugins: ['flash','silverlight'],
			// specify to force MediaElement to use a particular video or audio type
			type: '',
			// path to Flash and Silverlight plugins
			pluginPath: '/framework/js/plugins/mediaelement/',
			// name of flash file
			flashName: 'flashmediaelement.swf',
			// name of silverlight file
			silverlightName: 'silverlightmediaelement.xap',
			// the order of controls you want on the control bar (and other plugins below)
			//features: ['volume','playpause','progress'],
			features: ['playpause','current','duration','progress','tracks','volume'],
			// default if the <video width> is not specified
			defaultVideoWidth: 480,
			// default if the <video height> is not specified     
			defaultVideoHeight: 270,
			// overrides <video width>
			pluginWidth: -1,	
			// overrides <video height>       
			pluginHeight: -1,
			// initial volume when the player starts (overrided by user cookie)
			startVolume: Lastvolume,
			// rewind to beginning when media ends
			autoRewind: false,
			// rate in milliseconds for Flash and Silverlight to fire the timeupdate event
			// larger number is less accurate, but less strain on plugin->JavaScript bridge
			timerRate: 250,
			// method that fires when the Flash or Silverlight object is ready
			success: function (mediaElement, domObject) { 
				// add event listener
				mediaElement.addEventListener('pause', function(e) {
					 audioPlayState="pause";
				}, false);
				mediaElement.addEventListener('play', function(e) {
					subAudio[0].pause();
					if(audioPlayState=="ended")
					{
						$(".animationTxt").css('visibility', 'hidden');
						initcnt=1;
						initTextCnt=1;
					}
					audioPlayState="play";
				}, false);
				mediaElement.addEventListener('timeupdate', function(e) {
					fnUpdateAudioProgress(mediaElement.currentTime,mediaElement.duration)
					fnUpdateSection(mediaElement.currentTime);
					if(pageTypeArray[currModule-1][currPageNum-1]!="int_pop")
					{
						fnUpdateScreenText(mediaElement.currentTime);
					}
					$(".disableControls").hide();
				}, false);
				mediaElement.addEventListener('ended', function(e) {
				$(".clickAndReveal .floatLeft").css("pointer-events", "auto");
				$("#page").find('.pdfContent a').css("pointer-events", "auto");	
			$(".clickAndReveal .pdfContent a").css("pointer-events", "auto");
			 $(".leftside_ele").css("pointer-events", "auto");
				if(pageTypeArray[currModule-1][currPageNum-1]!="chart_clk" )
					{
						//fnMenuCompletionPage(currPageNum);
					}else{ 
						$('.clkbtn').removeClass("branching_btn_disabled");
					}
					if(pageTypeArray[currModule-1][currPageNum-1]!="int_pop" )
					{
						//fnMenuCompletionPage(currPageNum);
					}else{ 
						$('.clkbtn').removeClass("branching_btn_disabled");
					}
					if(pageTypeArray[currModule-1][currPageNum-1]!="clk_rvl" )
					{
						//fnMenuCompletionPage(currPageNum);
					}else{ 
						$('.clkbtn').removeClass("branching_btn_disabled");
					}
					if(pageTypeArray[currModule-1][currPageNum-1]=="chart_clk")  {
						$('body').addClass('audioEnded');
					}
					if(pageTypeArray[currModule-1][currPageNum-1]=="int_pop" || pageTypeArray[currModule-1][currPageNum-1]=="clk_qk")  {
						$('body').addClass('audioEnded');
					}
					if(pageTypeArray[currModule-1][currPageNum-1]=="clk_rvl" || pageTypeArray[currModule-1][currPageNum-1]=="clk_spot")  {
						$('body').addClass('audioEnded');
					}
					if($('body').hasClass('audioEnded')) {
						$(".disableControls").show();
					}
					audioPlayState="ended";
				}, false);	 
			},
			error: function () {  
			}
		});

		initAudioPlayer=true;
	}
	if(audioSource && audioSource !== undefined && audioSource !== "no-audio"){
		videoPlayState="ended";
		 $.each(ExternalPageData, function(key, value) {
			if (key == "ccTextArray") {
				cuePointSplitArr=value.time;
				cuePointAudioArr=value.text;
				cuePointTextAnimArr=value.animDuration;
			} 
		 });
		$(".footer .mejs-audioScript-button").removeClass("activeBtn");
		audioPlayer.setSrc(audioSource);
		audioPlayer.setVolume(Lastvolume);
		if(visitedAudio && backBtnClicked)
		{
			audioPlayer.pause();
		}else{
			audioPlayer.pause();
		}
		if(!firstTimePlayerLoad)
		{
			if(device.iPad() || device.AndroidTablet())
			{			
				$(".footer .mejs-controls").append('<div class="mejs-button mejs-audioScript-button"><button type="button" aria-controls="mep_1" title="" aria-label="Audio Text"></button></div>');
				$(".footer .mejs-controls").before('<div class="disableControls" style="display:none;"></div><div class="audioTextCC" style="display:none;"><p></p></div>');
				$(".footer .mejs-controls .mejs-audioScript-button").before('<div class="mejs-button mejs-captions-button mejs-audioCC-button"><button type="button" aria-controls="mep_1" title="" aria-label="Closed Caption"></button></div>');
				$(".footer .mejs-controls .mejs-captions-button").before('<div class="mejs-button mejs-replay-button"><button type="button" aria-controls="mep_1" title="" aria-label="RePlay"></button></div>');
				$(".footer .mejs-inner").append('<div class="bgwhite_bdrblue cc_text audio_text" style="display:none;"><span class="at_title"><img style="width: 35px;margin-right: 3px;" src="framework/images/audioscript_blue.png"/>'+stranscriptTxt+'</span><div id="aud_close_1" class="pop_close_btn"><a href=""><img src="framework/images/cross_grey.png"></img></a></div><hr class="border_design"></hr><div class="audioTranscript" id="audioTranscript_1" style="height:90%;padding-left:10px;padding-right:0px;overflow-x: auto"><p></p></div></div>');
			}else if((window.screen.height / window.screen.width == 1.775) && (window.devicePixelRatio == 2)) 
				{ 
 				$(".footer .mejs-controls").append('<div class="mejs-button mejs-audioScript-button" style="display:none;"><button type="button" aria-controls="mep_1" title="" aria-label="Audio Text"></button></div>');
				$(".footer .mejs-controls").before('<div class="audioTextCC" style="display:none;"><p></p></div>');
				$(".footer .mejs-controls .mejs-audioScript-button").before('<div class="mejs-button mejs-captions-button mejs-audioCC-button" style="display:none;"><button type="button" aria-controls="mep_1" title="" aria-label="Closed Caption"></button></div>');
				$(".footer .mejs-controls .mejs-captions-button").before('<div class="mejs-button mejs-replay-button" style="display:none;"><button type="button" aria-controls="mep_1" title="" aria-label="RePlay"></button></div>');
				$(".footer .mejs-inner").append('<div class="bgwhite_bdrblue cc_text audio_text" style="display:none;"><span class="at_title"><img style="width: 35px;margin-right: 3px;" src="framework/images/audioscript_blue.png"/>'+stranscriptTxt+'</span><div id="aud_close_1" class="pop_close_btn"><a href=""><img src="framework/images/cross_grey.png"></img></a></div><hr class="border_design"></hr><div class="audioTranscript" id="audioTranscript_1" style="height:90%;padding-left:10px;padding-right:0px;overflow-x: auto"><p></p></div></div>');
				$(".footer .mejs-time").hide();
				}
				else if ((window.screen.height / window.screen.width == 667 / 375) && (window.devicePixelRatio == 2))
				{
				$(".footer .mejs-controls").append('<div class="mejs-button mejs-audioScript-button" style="display:none;"><button type="button" aria-controls="mep_1" title="" aria-label="Audio Text"></button></div>');
				$(".footer .mejs-controls").before('<div class="audioTextCC" style="display:none;"><p></p></div>');
				$(".footer .mejs-controls .mejs-audioScript-button").before('<div class="mejs-button mejs-captions-button mejs-audioCC-button" style="display:none;"><button type="button" aria-controls="mep_1" title="" aria-label="Closed Caption"></button></div>');
				$(".footer .mejs-controls .mejs-captions-button").before('<div class="mejs-button mejs-replay-button" style="display:none;"><button type="button" aria-controls="mep_1" title="" aria-label="RePlay"></button></div>');
				$(".footer .mejs-inner").append('<div class="bgwhite_bdrblue cc_text audio_text" style="display:none;"><span class="at_title"><img style="width: 35px;margin-right: 3px;" src="framework/images/audioscript_blue.png"/>'+stranscriptTxt+'</span><div id="aud_close_1" class="pop_close_btn"><a href=""><img src="framework/images/cross_grey.png"></img></a></div><hr class="border_design"></hr><div class="audioTranscript" id="audioTranscript_1" style="height:90%;padding-left:10px;padding-right:0px;overflow-x: auto"><p></p></div></div>');
				$(".footer .mejs-time").hide();
				}
				else if ((window.screen.height / window.screen.width == 736 / 414) && (window.devicePixelRatio == 3))
				{
				$(".footer .mejs-controls").append('<div class="mejs-button mejs-audioScript-button" style="display:none;"><button type="button" aria-controls="mep_1" title="" aria-label="Audio Text"></button></div>');
				$(".footer .mejs-controls").before('<div class="audioTextCC" style="display:none;"><p></p></div>');
				$(".footer .mejs-controls .mejs-audioScript-button").before('<div class="mejs-button mejs-captions-button mejs-audioCC-button" style="display:none;"><button type="button" aria-controls="mep_1" title="" aria-label="Closed Caption"></button></div>');
				$(".footer .mejs-controls .mejs-captions-button").before('<div class="mejs-button mejs-replay-button" style="display:none;"><button type="button" aria-controls="mep_1" title="" aria-label="RePlay"></button></div>');
				$(".footer .mejs-inner").append('<div class="bgwhite_bdrblue cc_text audio_text" style="display:none;"><span class="at_title"><img style="width: 35px;margin-right: 3px;" src="framework/images/audioscript_blue.png"/>'+stranscriptTxt+'</span><div id="aud_close_1" class="pop_close_btn"><a href=""><img src="framework/images/cross_grey.png"></img></a></div><hr class="border_design"></hr><div class="audioTranscript" id="audioTranscript_1" style="height:90%;padding-left:10px;padding-right:0px;overflow-x: auto"><p></p></div></div>');
				$(".footer .mejs-time").hide();
				}
				else if ((window.screen.height / window.screen.width == 812 / 375) && (window.devicePixelRatio == 3)) 
				{
				$(".footer .mejs-controls").append('<div class="mejs-button mejs-audioScript-button" style="display:none;"><button type="button" aria-controls="mep_1" title="" aria-label="Audio Text"></button></div>');
				$(".footer .mejs-controls").before('<div class="audioTextCC" style="display:none;"><p></p></div>');
				$(".footer .mejs-controls .mejs-audioScript-button").before('<div class="mejs-button mejs-captions-button mejs-audioCC-button" style="display:none;"><button type="button" aria-controls="mep_1" title="" aria-label="Closed Caption"></button></div>');
				$(".footer .mejs-controls .mejs-captions-button").before('<div class="mejs-button mejs-replay-button" style="display:none;"><button type="button" aria-controls="mep_1" title="" aria-label="RePlay"></button></div>');
				$(".footer .mejs-inner").append('<div class="bgwhite_bdrblue cc_text audio_text" style="display:none;"><span class="at_title"><img style="width: 35px;margin-right: 3px;" src="framework/images/audioscript_blue.png"/>'+stranscriptTxt+'</span><div id="aud_close_1" class="pop_close_btn"><a href=""><img src="framework/images/cross_grey.png"></img></a></div><hr class="border_design"></hr><div class="audioTranscript" id="audioTranscript_1" style="height:90%;padding-left:10px;padding-right:0px;overflow-x: auto"><p></p></div></div>');
				$(".footer .mejs-time").hide();
				}else{
				$(".footer .mejs-controls").append('<div class="mejs-button mejs-audioScript-button"><button type="button" aria-controls="mep_1" title="" aria-label="Audio Text"></button></div>');
				$(".footer .mejs-controls").before('<div class="disableControls" style="display:none;"></div><div class="audioTextCC" style="display:none;"><p></p></div>');
				$(".footer .mejs-controls .mejs-audioScript-button").before('<div class="mejs-button mejs-captions-button mejs-audioCC-button"><button type="button" aria-controls="mep_1" title="" aria-label="Closed Caption"></button></div>');
				$(".footer .mejs-controls .mejs-volume-button").before('<div class="mejs-button mejs-replay-button"><button type="button" aria-controls="mep_1" title="" aria-label="RePlay"></button></div>');
				$(".footer .mejs-inner").append('<div class="bgwhite_bdrblue cc_text audio_text" style="display:none;"><span class="at_title"><img style="width: 35px;margin-right: 3px;" src="framework/images/audioscript_blue.png"></img>'+stranscriptTxt+'</span><div id="aud_close_1" class="pop_close_btn"><a href=""><img src="framework/images/cross_grey.png"></img></a></div><hr class="border_design"></hr><div class="audioTranscript" id="audioTranscript_1" style="height:90%;padding-left:10px;padding-right:0px;overflow-x: auto"><p></p></div></div>');
			}
			$(".audioTextCC").append($('<div class="arrow-down"></div>'));
			$(".footer .audio_text").append($('<div class="arrow-down"></div>'));
			$("#aud_close_1").click(function(){
			 
				$(".audio_text").hide();
				$(".footer .mejs-audioScript-button").removeClass("activeBtn");
			});
			
			$(".footer .mejs-audioScript-button").click(function()
			{
				if($(this).hasClass("activeBtn"))
				{
					$(this).removeClass("activeBtn");
					$(".audio_text").hide();
					$(".contentAreaFrame .arrow-down-AT").hide();
				}else{
					$(".audioTextCC").hide();
					$(".footer .mejs-audioCC-button").removeClass("activeBtn");
					$(".contentAreaFrame .arrow-down-AT").show();
					$(".contentAreaFrame .arrow-down-AT").css("top",$(".footer .mejs-audioScript-button").offset().top);
					$(".contentAreaFrame .arrow-down-AT").css("left",($(".footer .mejs-audioScript-button").offset().left)+15);
					ccTextOpen=false;
					$(".audio_text").show();
					$(this).addClass("activeBtn");
				}
			});
			$(".footer .mejs-replay-button").click(function()
			{

				subAudio[0].pause();
				if(audioPlayState!="ended")
				{
					audioPlayer.setCurrentTime(0.1);
					audioPlayer.play();
				}else{
					$(".footer .mejs-playpause-button").trigger('click');
				}
			});
					
			$(".footer .mejs-audioCC-button").click(function()
			{				
				$(".audioTextCC").css('bottom','50px');
				$(".audioTextCC").toggle();
				if($(this).hasClass("activeBtn"))
				{
					
					$(this).removeClass("activeBtn");
				}else{
					ccTextOpen=true;
					$(".audio_text").hide();
					$(".videocontent .mejs-captions-button").trigger("click");
					$(".footer .mejs-audioScript-button").removeClass("activeBtn");
					$(this).addClass("activeBtn");
				}
			});
			firstTimePlayerLoad=true;
		}else{	
		}
		$('.footer .bgwhite_bdrblue').css('height', (tHgt)+8);
		if(MuteState)
		{
			audioPlayer.setMuted(true);
		}else{
			audioPlayer.setMuted(false);
		} 
		if(ccTextOpen)
		{
			ccTextOpen=true;
			$(".audioTextCC").css('bottom','50px');
			$(".audioTextCC").show();$(".mejs-audioCC-button").addClass("activeBtn");
		}
		$('.mejs-playpause-button button').attr('title', splayTxt);
		$('.mejs-replay-button button').attr('title', sreplayTxt);
		$('.mejs-fullscreen-button button').attr('title',"Fullscreen");
		$('.mejs-captions-button button').attr('title', scaptiontTxt);
		$('.mejs-audioScript-button button').attr('title', stranscriptTxt);
		$('.mejs-volume-button button').attr('title', saudioCntlTxt);
		
		$(".logout_clkbtn").attr('title', exitTxt);
		$(".search_clkbtn").attr('title', searchTxt);
		$(".sub_menu").attr('title', plusTxt);
		$(".pgNum").attr('title', pgNumTxt);
		$("#revTool").attr('title', reviewTxt);
		$(".main_menu_click").attr('title', mainmenuTxt);
		$(".modulecontinue_clkbtn_1").attr('title', modulebtnTxt);
		fnAssignAudioText(aID);
	}else{
		audioPlayer.pause();
	}
}
/**********************************Video Player - Function***********************************/

var tHgt=0;
function videoPlayerFunction(aID,videoSource,aHgt){
$(".mejs-controls div.mejs-time-rail").css("cursor","pointer");$(".mejs-controls .mejs-time-rail span").css("cursor","pointer");
	var tWidth=$('.wrapper_header').width();
	tHgt=tWidth*8/23-6;
	 var ua = window.navigator.userAgent;
var is_ie = /MSIE|Trident/.test(ua);

if ( is_ie ) {
 
 if(pageTypeArray[currModule-1][currPageNum-1]=="steplist"){
$(".pgContainer #processAlertContainer").css('height', $(".mejs-video").height()+$(".pgContainer .steplistBar").height()+40)
		$('.videocontent').css('height', (tHgt-70));
		$('.videocontent .mejs-inner').css('height', (tHgt-70));		
 }
 else {
  $('.videocontent').css('height', (tHgt));		  
		$('.videocontent .mejs-inner').css('height', (tHgt));
 }
}
else {
 
	if(pageTypeArray[currModule-1][currPageNum-1]!="steplist"){
	
		 $('.videocontent').css('height', (tHgt-10));		  
		$('.videocontent .mejs-inner').css('height', (tHgt-10));
		//alert((tHgt-90))
	}else{
	
	 $(".pgContainer #processAlertContainer").css('height', $(".mejs-video").height()+$(".pgContainer .steplistBar").height()+40)
		$('.videocontent').css('height', (tHgt-70));
		$('.videocontent .mejs-inner').css('height', (tHgt-70));		
	}

}


	
	if(device.iPad()){
	 $('.videocontent').css('height', (tHgt)+79);		  
		 
	}
	if(device.MobileDevice()){
	 if(window.orientation==180 || window.orientation==0)
   {
	$(".pgContainer .processAlert").css('height', $("#printFrame").height()+50)
	$('.videocontent').css('height', '');
	}
	else {
	$(".pgContainer .processAlert").css('height', $("#printFrame").height()+120)
	$('.videocontent').css('height', '');
	}
	}
 	//debugger
	//$('.videocontent').css('top', "10px");
	$(".pgContainer").css('margin-top','11px');
	if(videoPlayer!=undefined)
	{
		Lastvolume=videoPlayer.getVolume();
	}
	  
	fnResizeVideoPlayer(tWidth,tHgt)
	if(!initVideoPlayer)
	{		
		videoPlayer='';
		videoPlayer = new MediaElementPlayer('#vidPlayer', {
			// shows debug errors on screen
			enablePluginDebug: false,
			// remove or reorder to change plugin priority
			plugins: ['flash','silverlight'],
			// specify to force MediaElement to use a particular video or audio type
			type: '',
			// path to Flash and Silverlight plugins
			pluginPath: '/framework/js/plugins/mediaelement/',
			// name of flash file
			flashName: 'flashmediaelement.swf',
			// name of silverlight file
			silverlightName: 'silverlightmediaelement.xap',
			// Hide controls when playing and mouse is not over the video
			alwaysShowControls: true,
			// the order of controls you want on the control bar (and other plugins below)
			features: ['playpause','current','duration','progress','volume','tracks'],
			// overrides <video width>
			pluginWidth: -1,
			// overrides <video height>       
			pluginHeight: -1,
			// when this player starts, it will pause other players
			pauseOtherPlayers: true,
			// initial volume when the player starts (overrided by user cookie)
			startVolume: Lastvolume,
			// rewind to beginning when media ends
			autoRewind: false,
			// force iPad's native controls
			iPadUseNativeControls: false,
			// force iPhone's native controls
			iPhoneUseNativeControls: true, 
			// force Android's native controls
			AndroidUseNativeControls: true,
			// larger number is less accurate, but less strain on plugin->JavaScript bridge
			timerRate: 250,
			// method that fires when the Flash or Silverlight object is ready
			success: function (mediaElement, domObject) { 
				// add event listener
				mediaElement.addEventListener('pause', function(e) {
					 videoPlayState="pause"
				}, false);
				mediaElement.addEventListener('play', function(e) {
					subAudio[0].pause();

					if(pageTypeArray[currModule-1][currPageNum-1]=="steplist"){
					 							
						if(videoPlayState=="ended"){
							//stepNumber=1;
							fnResetDotBtns();
						}else{
						stepByStepPause=false;
							setTimeout(function(){
								pauseflag=false;
								
							},1500);
						}
					}
					videoPlayState="play";	
				}, false);
				mediaElement.addEventListener('timeupdate', function(e) {
					setTimeout(function()
					{
						if(pageTypeArray[currModule-1][currPageNum-1]=="steplist"){
							fnCheckStepByStepPage(mediaElement.currentTime,this,mediaElement.duration);
						}
					},100);
				}, false);
				mediaElement.addEventListener('ended', function(e) { 
					fnMenuCompletionPage(currPageNum)
					$('#vidPlayer').css('opacity','1');
					videoPlayState="ended";
				}, false);

			},
			error: function () {  
			}
		});
		if(device.iOS() || device.Android())
		{
			$(".videocontent .mejs-controls .mejs-captions-button").before('<div class="mejs-button mejs-replay-button"><button type="button" aria-controls="mep_1" title="" aria-label="RePlay"></button></div>');
			$(".videocontent .mejs-controls").append('<div class="mejs-button mejs-audioScript-button"><button type="button" aria-controls="mep_1" title="" aria-label="Audio Text"></button></div>');
			$(".videocontent .mejs-inner").append('<div class="bgwhite_bdrblue cc_text audio_text" style="display:none;"><span class="at_title"><img style="width: 35px;margin-right: 3px;" src="framework/images/audioscript_blue.png"></img>'+stranscriptTxt+'</span><div id="aud_close" class="pop_close_btn"><a href=""><img style="width: 13px;" src="framework/images/cross_grey.png"></img></a></div><hr class="border_design"></hr><div class="audioTranscript" id="audioTranscript"  style="height:90%;padding-left:10px;padding-right:0px;overflow-x: auto"><p></p></div></div>'); 
		}else{
			$(".videocontent .mejs-controls .mejs-volume-button").before('<div class="mejs-button mejs-replay-button"><button type="button" aria-controls="mep_1" title="" aria-label="RePlay"></button></div>');
			$(".videocontent .mejs-controls").append('<div class="mejs-button mejs-audioScript-button"><button type="button" aria-controls="mep_1" title="" aria-label="Audio Text"></button></div>');
			$(".videocontent .mejs-inner").append('<div class="bgwhite_bdrblue cc_text audio_text" style="display:none;"><span class="at_title"><img style="width: 35px;margin-right: 3px;" src="framework/images/audioscript_blue.png"></img>'+stranscriptTxt+'</span><div id="aud_close" class="pop_close_btn"><a href=""><img style="width: 13px;" src="framework/images/cross_grey.png"></img></a></div><hr class="border_design"></hr><div class="audioTranscript" id="audioTranscript"  style="height:90%;padding-left:10px;padding-right:0px;overflow-x: auto"><p></p></div></div>');
		}
		$(".videocontent .mejs-captions-button").click(function()
			{
			if(popupopen == false){
			//alert("1")
			popupopen = true;
			automaticswitchOn = true;
			$(".mejs-captions-layer").addClass("addlayer");
				$(".mejs-captions-layer").removeClass("removelayer"); 
			$(this).addClass("mejs-captions-enabled")
			}
			else if(popupopen == true){
			//alert("2")
			$(".mejs-captions-layer").removeClass("addlayer");
			$(".mejs-captions-layer").addClass("removelayer");
 			 
				$(this).removeClass("mejs-captions-enabled");
			popupopen = false;
			}
			 
			 
				
			});	
		$(".videocontent .mejs-audioScript-button").click(function()
		{
		
			if($(this).hasClass("activeBtn"))
			{
				 
 				$(this).removeClass("activeBtn");
  				$(".audio_text").hide();
				$(".contentAreaFrame .arrow-down-AT").hide();
			}else{ 
			 
		 
				   if($(".mejs-captions-button").hasClass("mejs-captions-enabled"))
				{
					$(".mejs-captions-button").trigger("click");
				}    
					$(".mejs-captions-layer").removeClass("addlayer");
			$(".mejs-captions-layer").addClass("removelayer");
				$(".mejs-captions-button").removeClass("mejs-captions-enabled");
				
 				$(".contentAreaFrame .arrow-down-AT").css("top",$(".mejs-audioScript-button").offset().top);
				$(".contentAreaFrame .arrow-down-AT").css("left",($(".mejs-audioScript-button").offset().left)+15);
				$(this).addClass("activeBtn");
				$(".audio_text").show();
 				//$(".videocontent").addClass('mejs-captions-enabled');
				$(".contentAreaFrame .arrow-down-AT").show();
			}
		});
		$(".videocontent .mejs-replay-button").click(function()
		{
			subAudio[0].pause();
			videoPlayer.load();
			videoPlayer.setCurrentTime(0.1);
			videoPlayer.play(); 
			if(pageTypeArray[currModule-1][currPageNum-1]=="steplist"){
				stepProcessCnt=1;
				fnResetDotBtns();
			}
		});
		/* $('.mejs-playpause-button button').attr('title',"Play/Pause");
		$('.mejs-replay-button button').attr('title',"Replay");
		$('.mejs-fullscreen-button button').attr('title',"Fullscreen");
		$('.mejs-captions-button button').attr('title',"Captions");
		$('.mejs-audioScript-button button').attr('title',"Audio Transcript");
		$('.mejs-volume-button button').attr('title',"Audio"); */
		$('.mejs-playpause-button button').attr('title', splayTxt);
		$('.mejs-replay-button button').attr('title', sreplayTxt);
		$('.mejs-fullscreen-button button').attr('title',"Fullscreen");
		$('.mejs-captions-button button').attr('title', scaptiontTxt);
		$('.mejs-audioScript-button button').attr('title', stranscriptTxt);
		$('.mejs-volume-button button').attr('title', saudioCntlTxt);
		 
		$(".logout_clkbtn").attr('title', exitTxt);
		$(".search_clkbtn").attr('title', searchTxt);
		$(".sub_menu").attr('title', plusTxt);
		$(".pgNum").attr('title', pgNumTxt);
		$("#revTool").attr('title', reviewTxt);
		$(".main_menu_click").attr('title', mainmenuTxt);
		$(".modulecontinue_clkbtn_1").attr('title', modulebtnTxt);
		 $('.pop_srch_options input').attr('placeholder', searchTxt);
	$('.bookmarkTxt').attr('title', bookmarkAltTxt);
	$('.notesTxt').attr('title', notesAltTxt);
	$('.emailTxt').attr('title', emailAltTxt);
	$('.printTxt').attr('title', printAltTxt);
	$('.helpTxt').attr('title', helpAltTxt);
		
		initVideoPlayer=true; 
		if(device.MobileDevice()){
		var contheight=$(window).height()-$(".wrapper_header").height()-$(".sub_header").height()-$(".copyRightTxt").height()-30;
			 $('.content').css("height",contheight);
			
		}
		else {
		var contheight=$(".wrapper_header").height()+$(".sub_header").height();
		$('.content').css("height",contheight);
		
		}
	}
	
	
	 if(videoSource && videoSource !== undefined && videoSource !== "no-audio"){
		if(!device.MobileDevice()){
			var videoSrtFile=videoSource.split(".mp4").join(".txt");
			if(pageType=="main"){
				$("video").find("track").attr("src",videoSrtFile)
			}else{
				$("video").find("track").attr("src",videoSrtFile)
			}
			if(pageTypeArray[currModule-1][currPageNum-1]=="steplist"){
				$(".videocontent .mejs-captions-position .arrow-down").css("top","28px");
			}else{
				$(".videocontent .mejs-captions-position .arrow-down").css("top","35px");
			}
			videoPlayer.findTracks();
			videoPlayer.loadTrack(0);
			  if(currPageNum>=1){	
				if(ccTextOpen){
					$(".videocontent .mejs-captions-button").trigger("click");
					ccTextOpen=true;
					  $(".videocontent .mejs-captions-button").trigger("click");
				}else{
					$(".videocontent .mejs-captions-button").trigger("click");
					ccTextOpen=false;
					$(".videocontent .mejs-captions-button").trigger("click");
				}
			}    
		}
		var vidName = fnChangevideoSrc();
		var posterName = vidName.replace("mp4", "png");		
		$('#vidPlayer').attr('poster', posterName);
		videoPlayer.setSrc(videoSource);
		if(device.MobileDevice()){
		 $(".contentAreaFrame").css("width","100%");
		}
		$("#aud_close").click(function(){
			$(".audio_text").hide();
			$(".videocontent .mejs-audioScript-button").removeClass("activeBtn");
		});
		if(pageTypeArray[currModule-1][currPageNum-1]=="steplist"){
			$('.videocontent1').css('height', tHgt-86);
			tHgt=tHgt-45;
			$(".mejs-container").css('height', null);
			$(".mejs-container").height('');
			setTimeout(function()
			{				
				$('.content').css('height',$(".mejs-video").height());
				$('.videocontent .audio_text').css('height',$(".mejs-video").height()-10);
				$('.videocontent .mejs-controls').css('bottom', "-39px");			
				$('.steplistBar').css({'top': $(".mejs-video").height()+40, 'z-index': '9999'});
			},300);
		}else{
			if(!device.MobileDevice()){
				//$('.content').css('height',$(".sub_header").height()+20);
			}
//			$('.videocontent .audio_text').css('height', Number(tHgt-31));
			$('.videocontent .mejs-controls').css('bottom', "-39px");
		}
		fnAssignAudioText(aID);
		if($(".videocontent .mejs-audioScript-button").hasClass("activeBtn"))
		{
		
			$(".audio_text").show();
			
		}else{
			$(".audio_text").hide();
		} 
		 if(ccTextOpen){
			if(!$(".mejs-captions-button").hasClass("mejs-captions-enabled"))
			{			
				$(".mejs-captions-button").trigger("click");
				$(".audioTextCC").hide();
				$(".footer .mejs-audioCC-button").removeClass("activeBtn");
			}
			else {
				
				//$(".mejs-captions-button").removeClass("mejs-captions-enabled");
			}
			
		} 
		if(MuteState)
		{
			videoPlayer.setMuted(true);
		}else{
			videoPlayer.setMuted(false);
		}  
	}else{
		videoPlayer.pause();
	} 
}
/**********************Audio Player - Text and Image Template Functions**************************/
function fnUpdateAudioProgress(aCurrTime,aTotTime){
	var chkCurrTime=Number(Math.abs(aCurrTime).toFixed(1));
	var chkTotalTime=Number(Math.abs(aTotTime).toFixed(1));
	var progress=(chkCurrTime/chkTotalTime)*100;
}
var initcnt=1;
function fnUpdateSection(aTime){
	var chkTime=Number(Math.abs(aTime).toFixed(1));
	for (var i = 1; i <= cuePointSplitArr.length; i++) {
		if(chkTime>=cuePointSplitArr[i-1]){
			$(".audioTextCC p").html(cuePointAudioArr[i-1]);
		}	
	}  
}
var initTextCnt=1;
function fnUpdateScreenText(aTime){
	var chkTime=Number(Math.abs(aTime).toFixed(1));
	$(".animationTxt").css('visibility', 'hidden');	
	if(typeof cuePointTextAnimArr != 'undefined')
	{	
		for (var i = 1; i <= cuePointTextAnimArr.length; i++) {
			if(chkTime>=cuePointTextAnimArr[i-1]){
				 $(".animTxt_"+i).css('visibility', 'visible');
			}	
		} 
	}	
}
/******************************Video Player - Support Functions**************************************/
function fnResizeVideoPlayer(aWid,aHgt){
	$('.videocontent video').attr('height', '100%');
	$('.videocontent .mejs-container').css('height', '100%');
}
/*****************************Step by Step Screen - Template Functions*******************************/
var stepNumber=0;;
var stepProcessCnt=1;
var stepByStepPause=false;
var endVideoPos=0;
var pauseflag=false;

function fnCheckStepByStepPage(aTime,aElem,aDur)
{
	var chkTime=Number(aTime);
	endVideoPos=aDur;
	if(!stepAutoPlay)
	{
		if(chkTime>=Number(steplistArr[stepNumber]-0.50) && chkTime<=steplistArr[stepNumber] && stepNumber!=0 && !pauseflag){
			videoPlayer.pause();
			stepByStepPause=true;
			pauseflag=true;
			videoPlayState="pause"
		}		
	}
	$(".mejs-controls div.mejs-time-rail").css("cursor","default");$(".mejs-controls .mejs-time-rail span").css("cursor","default");
	if(chkTime<steplistArr[0])
	{
		//$(".slide_dots li").removeClass("activedot");
		stepNumber=0;
	}
	steplistArr.forEach(function(item,ind) {
		if(steplistArr[steplistArr.length-1]!=undefined)
		{
			if(steplistArr[ind]==undefined)
			{
				if(chkTime>=steplistArr[ind] && chkTime<=steplistArr[ind+1]){
					if(stepAutoPlay==true) {
					//alert("1")
						$(".slide_dots li").removeClass("activedot");
						$(".slide_dots li").eq((ind+1)).addClass("activedot");
					}
					stepNumber=ind+1;
				}
			}else{
				if(chkTime>=steplistArr[ind] && chkTime<=endVideoPos){ 
					if(stepAutoPlay==true || dd==true) {					 
						$(".slide_dots li").removeClass("activedot");
						$(".slide_dots li").eq((ind+1)).addClass("activedot");
					}
					stepNumber=ind+1;
				}
			}
		}
	});
	if(stepAutoPlay==false) {
		if(stepNumber>=steplistArr.length)
		{
			$("#prevDot").removeClass("btn_disabled");
			$("#nextDot").addClass("btn_disabled");
		}else if(stepNumber==1)
		{
			$("#prevDot").addClass("btn_disabled");
			$("#nextDot").removeClass("btn_disabled");
		}else if(stepNumber==0)
		{
			$("#prevDot").addClass("btn_disabled");
			$("#nextDot").addClass("btn_disabled");
		}else{
			$("#prevDot").removeClass("btn_disabled");
			$("#nextDot").removeClass("btn_disabled");
		}
	}else{
		$("#nextDot").addClass("btn_disabled");
		$("#prevDot").addClass("btn_disabled");
	}
}
function fnResetDotBtns(){
	$("#prevDot").addClass("btn_disabled");
	$(".slide_dots li").removeClass("activedot");
	if(stepAutoPlay==true) {
		$("#nextDot").addClass("btn_disabled");
	} else {
		$("#nextDot").removeClass("btn_disabled");
	}
}
/*****************************Audio/Video  - Pause/Play Function*******************************/
function fnAudioVideoPause(aFlg)
{
	if(aFlg)
	{
		if(videoPlayer){
			videoPlayer.pause();
		}
		if(audioPlayer){
			audioPlayer.pause();
		}	
	}else{
		if(pageType=="main"){
			if(pageTypeArray[currModule-1][currPageNum-1]=="obj" || pageTypeArray[currModule-1][currPageNum-1]=="int_pop" || pageTypeArray[currModule-1][currPageNum-1]=="clk_qk" || pageTypeArray[currModule-1][currPageNum-1]=="clk_spot"){
				if(audioPlayer && audioPlayState!="ended"){
					setTimeout(function(){
						audioPlayer.play();
					},100); 
				} else if(videoPlayer && videoPlayer!="ended"){
					setTimeout(function(){
					// commented to fix video auto play issue when click through module menu
					//	videoPlayer.play();
					},100); 
				}else{
					$('.clkbtn').removeClass("branching_btn_disabled");
				}
			}else if(pageTypeArray[currModule-1][currPageNum-1]=="2d_ani" || pageTypeArray[currModule-1][currPageNum-1]=="steplist"){
				if(videoPlayer && videoPlayState!="ended"){
					if(pageTypeArray[currModule-1][currPageNum-1]=="steplist" && stepByStepPause){
						
					}else{
						setTimeout(function(){
							videoPlayer.play();
						},100);
					}
				}
			}else {
				if(videoPlayer){
					videoPlayer.pause();
				}
				if(audioPlayer){
					audioPlayer.pause();
				}	
			}
		}else{
			if(subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="obj" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="int_pop" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="clk_qk" || subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="clk_spot"){
				if(audioPlayer && audioPlayState!="ended"){ 
					setTimeout(function(){
						audioPlayer.play();
					},100); 
				}
			}else if(subPageTypeArray[currModule-1][currPageNum-1][subPageNum]=="2d_ani" || subPageTypeArray[currModule-1][currPageNum-1][subPageNum]=="steplist"){
				if(videoPlayer && videoPlayState!="ended"){
					if(subPageTypeArray[currModule-1][currPageNum-1][subPageNum]=="steplist" && stepByStepPause){
						
					}else{
						setTimeout(function(){
							videoPlayer.play();
						},100);
					}
				}
			}else {
				if(videoPlayer){
					videoPlayer.pause();
				}
				if(audioPlayer){
					audioPlayer.pause();
				}	
			}
		}
	}
}
 
/****************** Audio/Video Function - Scroll and Quick reference Template *******************************/
var subAudio;
var subAudioFile; 
function fnAudioVideoInit(aNum)
{
	if(pageType=="subPage"){
		if(subPageTypeArray[currModule-1][currPageNum-1][subPageNum]=="2d_ani" || subPageTypeArray[currModule-1][currPageNum-1][subPageNum]=="steplist" || subPageTypeArray[currModule-1][currPageNum-1][subPageNum]=="obj" || subPageTypeArray[currModule-1][currPageNum-1][subPageNum]=="txtImg")
		{
			$(".footer .media-wrapper").hide();	
			$(".footer .footer_btns").hide();
			$(".videocontent").show();
			audioPlayerFunction("");
			var videoName = fnChangevideoSrc();
			var vidPlayer=$("#page").find("video").attr("id");
			if(subPageTypeArray[currModule-1][currPageNum-1][subPageNum]=="steplist")
			{
				videoPlayerFunction(vidPlayer,videoName,500);
			}else{
				videoPlayerFunction(vidPlayer,videoName,550);
			}
			var endofVideo = $("#page").find('.endofVideo').length;
			var endofVideoPdf = $("#page").find('.endofVideoPdf').length;
			var vidElement= document.getElementById("vidPlayer");
			if(endofVideo==1) {
				var imgcontPath=fnLoadContentImageSrc(scrollContentImage);
				$("#page").find('.scrollImage > img').attr("src",imgcontPath);
				if(!device.MobileDevice()){
					$("#page").find('.scrollImage').css('height',$('#vidPlayer').height()-150);
				}
				vidElement.addEventListener('play', function(e) {
						if(videoPlayState!="ended"){
							$("#vidPlayer").css('opacity','1');
							$("#page").find('.scrollContent').hide();
							$("#page").find('.pdfContent').hide();
						}
					videoPlayState="play";	
				}, false);
				vidElement.addEventListener('pause', function(e) {
						if(videoPlayState=="ended")
						{
							$('.scrollContent').css("display","block");
							$('.scorllContainer').css({"display" : "block", "width" : $('#vidPlayer').width(), "height" : $('#vidPlayer').height()-20, "top" : $('#vidPlayer').offset().top, "left" : $('#vidPlayer').offset().left });
							$('#vidPlayer').css('opacity','0');
							$("#page").find('.scrollImage').mCustomScrollbar({
								scrollButtons:{enable:true},
								theme:"dark-thick",
								mouseWheelPixels: 200
							});
						}
					videoPlayState="pause";	
					
				}, false);
				vidElement.addEventListener('timeupdate', function(e) {
					if(this.currentTime>=this.duration && $("#page").find('.endofVideo').length!=0){
						subAudioFileLoad = fnChangeSubAudioSrc();
						$(".mp3_src").attr("src", subAudioFileLoad);
						subAudio[0].load();
						subAudio.currentTime = 0;
						subAudio[0].oncanplaythrough = subAudio[0].play();
						$('.scrollContent').css("display","block");
						$('.scorllContainer').css({"display" : "block", "width" : $('#vidPlayer').width(), "height" : $('#vidPlayer').height()-20, "top" : $('#vidPlayer').offset().top, "left" : $('#vidPlayer').offset().left });
						$('#vidPlayer').css('opacity','0');
						$("#page").find('.scrollImage').mCustomScrollbar({
							scrollButtons:{enable:true},
							theme:"dark-thick",
							mouseWheelPixels: 200
						});
					}else{
						$('.scrollContent').hide();
						$('.scorllContainer').hide();
						/* $(".videocontent").show(); */
						$("#vidPlayer").css('opacity','1');;
					}
				}, false);
				vidElement.addEventListener('ended', function(e) {
					videoPlayState="ended";
 					if(posterimage == true){
						$('#vidPlayer').css('opacity','1');
						}
						else {
						$('#vidPlayer').css('opacity','0');
						}
					
				}, false);
			}else{
				vidElement.addEventListener('ended', function(e) {
				
					$(".videocontent").show();
					$("#vidPlayer").css('opacity','1');;
				}, false);
			}  
			/* if(endofVideoPdf==1) {
				vidElement.addEventListener('ended', function(e) {
					$(".videocontent").show();
					var tmpTopPos=$(".videocontent").height();
					tmpTopPos=tmpTopPos-180;
					var resCont=fnLoadExternalCont(quickRefCont)
					$("#page").find('.pdfContent a').attr('href',resCont);
					$("#page").find('.pdfContent').css({'top': tmpTopPos}).show();
					$("#page").find('.quickRefText').show();
				}, false);
			} */
			if(endofVideoPdf==1) {
				vidElement.addEventListener('timeupdate', function(e) {
					if(this.currentTime>=this.duration && $("#page").find('.endofVideoPdf').length!=0){
						subAudioFileLoad = fnChangeSubAudioSrc();
						$(".mp3_src").attr("src", subAudioFileLoad);
						subAudio[0].load();
						subAudio.currentTime = 0;
						subAudio[0].oncanplaythrough = subAudio[0].play();
					}else{
					}
				}, false);
				vidElement.addEventListener('ended', function(e) {
					$(".videocontent").show();
					var tmpTopPos=$(".videocontent").height();
					tmpTopPos=tmpTopPos-180;
					var resCont=fnLoadExternalCont(quickRefCont)
					$("#page").find('.pdfContent a').attr('href',resCont);
					if(quickRefCont != undefined && quickRefCont != "") {
						if(endofVideo!=1) {
							$("#page").find('.pdfContent').css({'top': tmpTopPos}).show();
						} else {
							$("#page").find('.pdfContent').css({'top': "20px"}).show();
						}
						$("#page").find('.quickRefText').show();
					}
				}, false);
			}
		}else if(subPageGroupArray[currModule-1][currPageNum-1][subPageNum]=="cyu"){
			audioPlayerFunction("",(currPageNum-1));
			$(".videocontent").hide();
			$(".footer .footer_btns").hide();
			$(".footer .media-wrapper").hide();
		}else{
			$(".videocontent").hide()
			audioFile = fnChangeAudioSrc();
			audioPlayerFunction(audioFile,(currPageNum-1));
			$(".footer .footer_btns").show();
			$(".footer .media-wrapper").show();
		}
	}else{
		if(pageTypeArray[currModule-1][aNum-1]=="2d_ani" || pageTypeArray[currModule-1][aNum-1]=="steplist" || pageTypeArray[currModule-1][aNum-1]=="obj" || pageTypeArray[currModule-1][aNum-1]=="txtImg")
		{
			$(".videocontent").show()
			$(".footer .media-wrapper").hide();
			$(".footer .footer_btns").hide();
			$("#vidPlayer").css("display", "block");
			var videoName = fnChangevideoSrc();
			var vidPlayer=$(".videocontent").find("video").attr("id");
			if(pageTypeArray[currModule-1][aNum-1]=="steplist"){
				videoPlayerFunction(vidPlayer,videoName,500);
			}else{
				videoPlayerFunction(vidPlayer,videoName,550);
			}
			var endofVideo = $("#page").find('.endofVideo').length;
			var endofVideoPdf = $("#page").find('.endofVideoPdf').length;
			var vidElement= document.getElementById("vidPlayer");
			  if ((window.screen.height / window.screen.width == 667 / 375) && (window.devicePixelRatio == 2)){
				if(endofVideo==1) {
				
			vidElement.addEventListener('ended', function(e) {
			//alert("end of vdeo 1")
 					//$('#vidPlayer').css('display','none');
					// alert("none 11111")
				}, false);
			}
			else {
			vidElement.addEventListener('ended', function(e) {
			//alert("end of vdeo 2")
 					$('#vidPlayer').css('display','block');
 				}, false);
				 
				}
			}  
			if(device.AndroidPhone){
			 
				if(endofVideo==1) {
				
			vidElement.addEventListener('ended', function(e) {
			//alert("end of vdeo 1")
 					//$('#vidPlayer').css('display','none');
					 //alert("none 11111")
				}, false);
			}
			else {
			vidElement.addEventListener('ended', function(e) {
			//alert("end of vdeo 2")
 					$('#vidPlayer').css('display','block');
					$("#page").find('.scrollImage').css('height','200px !important');
 				}, false);
				 
				}
				}
			  if((window.screen.height / window.screen.width == 1.775) && (window.devicePixelRatio == 2)) 
				{ 
				if(endofVideo==1) {
				
			vidElement.addEventListener('ended', function(e) {
			//alert("end of vdeo 1")
 					//$('#vidPlayer').css('display','none');
					 //alert("none 11111")
				}, false);
			}
			else {
			vidElement.addEventListener('ended', function(e) {
			//alert("end of vdeo 2")
 					$('#vidPlayer').css('display','block');
 				}, false);
				 
				}
				
				}  
			if(endofVideo==1) {
				var imgcontPath=fnLoadContentImageSrc(scrollContentImage);
				$("#page").find('.scrollImage > img').attr("src",imgcontPath);
				
				if(!device.MobileDevice()){
			 
				
					if(window.innerHeight > window.innerWidth){
						$("#page").find('.scrollImage').css('height',$('#vidPlayer').height()-400);
					 }
					 else {
						if(endofVideoPdf!=1) {
							$("#page").find('.scrollImage').css('height',$('#vidPlayer').height()-150);
						} else {
							$("#page").find('.scrollImage').css('height',$('#vidPlayer').height()-170);
						}
					}
				} 
				vidElement.addEventListener('play', function(e) {
						if(videoPlayState!="ended"){
							$("#vidPlayer").css('opacity','1');;
							$("#page").find('.scrollContent').hide();
							$("#page").find('.pdfContent').hide();
						}
					videoPlayState="play";	
				}, false);
				vidElement.addEventListener('pause', function(e) {
						if(videoPlayState=="ended")
						{
							$('.scrollContent').css("display","block");
							$('.scorllContainer').css({"display" : "block", "width" : $('#vidPlayer').width(), "height" : $('#vidPlayer').height()-20, "top" : $('#vidPlayer').offset().top, "left" : $('#vidPlayer').offset().left });
							$('#vidPlayer').css('opacity','0');
							$("#page").find('.scrollImage').mCustomScrollbar({
								scrollButtons:{enable:true},
								theme:"dark-thick",
								mouseWheelPixels: 200
							});
						}
					videoPlayState="pause";	
					
				}, false);
				vidElement.addEventListener('timeupdate', function(e) {
					if(this.currentTime>=this.duration && $("#page").find('.endofVideo').length!=0){
						subAudioFileLoad = fnChangeSubAudioSrc();
						$(".mp3_src").attr("src", subAudioFileLoad);
						subAudio[0].load();
						subAudio.currentTime = 0;
						subAudio[0].oncanplaythrough = subAudio[0].play();
						$('.scrollContent').css("display","block");
						$('.scorllContainer').css({"display" : "block", "width" : $('#vidPlayer').width(), "height" : $('#vidPlayer').height()-20, "top" : $('#vidPlayer').offset().top, "left" : $('#vidPlayer').offset().left });
						$('#vidPlayer').css('opacity','0');
						$("#page").find('.scrollImage').mCustomScrollbar({
							scrollButtons:{enable:true},
							theme:"dark-thick",
							mouseWheelPixels: 200
						});
					}else{
						$('.scrollContent').hide();
						$('.scorllContainer').hide();
						$(".videocontent").show();
						$("#vidPlayer").css('opacity','1');;
					}
				}, false);
				vidElement.addEventListener('ended', function(e) {
				 
					videoPlayState="ended";
					$('#vidPlayer').css('opacity','0');
				 
					 
				}, false);
			}else{
				vidElement.addEventListener('ended', function(e) {
			 
			if(device.MobileDevice()){
			$("#page").find('.scrollImage').css('height',$('#vidPlayer').height()+60);
 
			}
			else {
			$("#page").find('.scrollImage').css('height',$('#vidPlayer').height()-160);
			 
			}
					$(".videocontent").show();
					$("#vidPlayer").css('opacity','1');
				}, false);
			}
	 if(device.AndroidPhone){ 
				if(endofVideoPdf==1) {
				vidElement.addEventListener('ended', function(e) {
				//$("#vidPlayer").css("display", "none")
					 //alert("end of vdeoPDF 1")
				}, false);
			
				}
				else {
				
					vidElement.addEventListener('ended', function(e) {
						//alert("end of vdeoPDF 2")
					$("#vidPlayer").css("display", "block")
					  //alert("iphone 6 none 3")
				}, false);
				
				}
				}
			 
				  if((window.screen.height / window.screen.width == 1.775) && (window.devicePixelRatio == 2)) 
				{ 
				if(endofVideoPdf==1) {
				vidElement.addEventListener('ended', function(e) {
				//$("#vidPlayer").css("display", "none")
					 //alert("end of vdeoPDF 1")
				}, false);
			
				}
				else {
				
					vidElement.addEventListener('ended', function(e) {
						//alert("end of vdeoPDF 2")
					$("#vidPlayer").css("display", "block")
					  //alert("iphone 6 none 3")
				}, false);
				
				}
				}  
			if(endofVideoPdf==1) {
			 
				vidElement.addEventListener('timeupdate', function(e) {
					if(this.currentTime>=this.duration && $("#page").find('.endofVideoPdf').length!=0){
						subAudioFileLoad = fnChangeSubAudioSrc();
						$(".mp3_src").attr("src", subAudioFileLoad);
						subAudio[0].load();
						subAudio.currentTime = 0;
						subAudio[0].oncanplaythrough = subAudio[0].play();
					}else{
					}
				}, false);
				vidElement.addEventListener('ended', function(e) {
				 
				
					$(".videocontent").show();
					var tmpTopPos=$(".videocontent").height();
					tmpTopPos=tmpTopPos-180;
					var resCont=fnLoadExternalCont(quickRefCont)
					$("#page").find('.pdfContent a').attr('href',resCont);
					if(quickRefCont != undefined && quickRefCont != "") {
						if(pageTypeArray[currModule-1][currPageNum-1]=="steplist"){
							$("#page").find('.pdfContent').show();
 				 
						}else if(endofVideo!=1) {
							$("#page").find('.pdfContent').css({'top': tmpTopPos}).show();
						} else {
							$("#page").find('.pdfContent').css({'top': "20px"}).show();
						}
						$("#page").find('.quickRefText').show();
					}
				}, false);
				vidElement.addEventListener('play', function(e) {
						if(videoPlayState!="ended"){
							$("#vidPlayer").css('opacity','1');;
							$("#page").find('.scrollContent').hide();
							$("#page").find('.pdfContent').hide();
						}
					videoPlayState="play";	
				}, false);
			}	
		} 
		else if(pageGroupArray[currModule-1][currPageNum-1]=="cyu" || pageGroupArray[currModule-1][aNum-1]=="clk"){
			$(".videocontent").hide()
			audioPlayerFunction("",(currPageNum-1));
			$(".footer .footer_btns").hide();
			$(".footer .media-wrapper").hide();
		}else{
			$(".videocontent").hide()
			audioFile = fnChangeAudioSrc();
			audioPlayerFunction(audioFile,(currPageNum-1));
			$(".footer .footer_btns").show();
			$(".footer .media-wrapper").show();
		}
	}
}
/***************************************************************************************************************************/