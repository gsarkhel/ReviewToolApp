/*----------Variable declartions----------*/
var currOpenElement;
var totalPops=0;
var totQuestCount = 0;
var totalclicks = 0;
var currentQuest = 0;
var optData;
var optionArr=new Array();
var callerData;
var calloutData;
var audioData;
var mediaType;
var mediaFile;
var watermarkImage;
var imageAvailableFlag;
var quickreftext;
var pdfcont;
var video_Player;
/*---------------------Functions---------------------*/
function fnLoadPageExternalData(eData){
	$.each(eData, function(key, value){
		if(key=="audioTransText"){
			audioTranscriptText=value.text;			
		} 
		else if(key=="mediaFile"){
			mediaSrc=value.name
		}else if(key=="quickRefContent"){
			quickRefCont=value.name
		}else if(key=="mediaFile"){
			mediaFile=value.name
		}else if(key=="watermarkImage"){
			watermarkImage=value.name
		}else if(key=="clickAndRevealData"){
			callerData = value.caller;
			calloutData = value.callout;
			audioData = value.audioTransTextData;
			mediaType = value.mediaTypes;
		}
		else if(key=="quickRefText"){
		    quickreftext = value.text;
		}else {			
		}
	});
	loadContent();
}
function loadContent() {
$(".txtVar_1").html(audioTranscriptText)
	 if(quickreftext == ""){
		  $(".quickRefText").hide();		 
	 }
	 else {
	  $(".quickRefText").show();
	  $(".quickRefText").html(quickreftext)
	 }
	  if(quickRefCont ==""){
	  $(".pdfContent").hide();	 
	 }
	 else { 		  
		  $(".pdfContent").show();
	 }

		$('body').removeClass('audioEnded');
		var NoOfCaller = Number(callerData.length);
		var callerStr = '';
		var calloutStr = '';
		var mediaFolderName=pagesArray[currModule-1][currPageNum-1].split(".")[0];
		$(".clickAndReveal .floatRight .watermarkImage img").attr("src", "../course/content_"+currLang+"/module_"+currModule+"/assets/images/"+mediaFolderName+"/"+watermarkImage).show();
		for (var j = 1; j <= NoOfCaller; j++) {
			callerStr += '<li class="caller" id="caller_'+j+'">'+callerData[j-1]+'</li>'
			/* if(mediaType=="video") {
				calloutStr += '<div class="callout_head" id="callout_'+j+'">'+callerData[j-1]+'</div><div class="calloutContent"><video id="video_'+j+'" src="" width="100%" height="auto"></video></div></div>';				
			} */
			if(mediaType=="image") {
				calloutStr += '<div class="callout_head" id="callout_'+j+'">'+callerData[j-1]+'</div><div class="calloutContent"><img id="img'+callerData[j-1]+'" src="../course/content_'+currLang+'/module_'+currModule+'/assets/images/'+mediaFolderName+'/'+calloutData[j-1]+'" width="auto" height="auto" /></div>';
			}
		}
		$(".clickAndReveal .floatLeft").html('<ul>'+callerStr+'</ul>');
		if(mediaType=="image") {
			$(".clickAndReveal .floatRight .calloutCont").html(calloutStr).hide();
		}
		var pdfCont=fnLoadExternalCont(quickRefCont);
		
		 $("#page").find('.pdfContent a').css("pointer-events", "none");
		$("#page").find('.pdfContent a').attr('href',pdfCont);

	CLCheck();
	$(".ipad_play").remove();
	$(".clickAndReveal .floatLeft").css("pointer-events", "none");
}
function CLCheck() {
	
		$('.caller').click(function() {
		$(".audio_text, .audioTextCC").css("display", "none")
			if($("body").hasClass("audioEnded")==true) {
			totalclicks++;
				$(".watermarkImage").hide();
				$(".calloutCont").show();
				if(mediaType=="video") {
					$(".videoContainer").show();
				} else if(mediaType=="image") {
					$(".imageContainer").show();
				}
				var callerId = $(this).attr("id").split("_")[1];
				$('.caller').removeClass("no-hover");
				$(this).addClass("clicked no-hover");
				$(".callout_head#callout_"+callerId).show().siblings().hide();
				$(".callout_head#callout_"+callerId).next().show();
				var videoSrc = "../course/content_"+currLang+"/module_"+currModule+"/assets/videos/"+calloutData[callerId-1];
				var videoTrack = videoSrc.split(".mp4").join(".txt");				
				if(video_Player) {
					video_Player.pause();
					video_Player.setSrc(videoSrc);
					setTimeout(function(){ video_Player.setCurrentTime(0);}, 30);
				}
				fnVideoPlayerFunction(videoSrc, videoTrack);
				$(".videoContainer #audioTranscript_1 p").html(audioData[callerId-1]);
				$('.videoContainer .playPauseAudioBtn').removeClass('play').addClass('pause');
				video_Player.play();
  				/* if(totalclicks == Number(callerData.length)){
					$("#page").find('.pdfContent a').css("pointer-events", "auto");
				}	 */			
				audioPlayer.disableControls();
			}
		});

}
var vHeight = 0;
function fnVideoPlayerFunction(src, track) {
var vWidth = $('.floatRight').width();
	vHeight = vWidth*8/16+10;
	$('#video_wrapper').html('<video id="video_player" width="100%" height="'+vHeight+'" class="video_player" poster="" preload src="'+src+'"><track id="subtitles" kind="subtitles" src="'+track+'" srclang="'+currLang+'" /></video>');
	video_Player='';
	video_Player = new MediaElementPlayer('#video_player', {
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
					$('.videoContainer .playPauseAudioBtn').removeClass('pause').addClass('play');
					 video_Player.pause();
				}, false);
				
				mediaElement.addEventListener('play', function(e) {
					$('.videoContainer .playPauseAudioBtn').removeClass('play').addClass('pause');
					video_Player.play();
				}, false);
				
				mediaElement.addEventListener('timeupdate', function(e) {					
				}, false);
				
				mediaElement.addEventListener('ended', function(e) {
				
					$('.videoContainer .playPauseAudioBtn').removeClass('pause').addClass('play');
					video_Player.pause();
				}, false);
				
			},
			error: function () {  
			}
		});
		
		$('.videoContainer .mejs-volume-button').hide();
		$(".videoContainer .mejs-controls").append('<div class="mejs-button mejs-audioScript-button"><button type="button" aria-controls="mep_1" title="" aria-label="Audio Text"></button></div>');
		$(".videoContainer .mejs-inner").append('<div class="bgwhite_bdrblue audioText" style="display:none;"><span class="at_title"><img style="width: 35px;margin-right: 3px;" src="framework/images/audioscript_blue.png"/>'+stranscriptTxt+'</span><div id="aud_close_1" class="pop_close_btn"><a href=""><img src="framework/images/cross_grey.png"></img></a></div><hr class="border_design"></hr><div class="audioTranscript" id="audioTranscript_1" style="height:86%;padding-left:10px;padding-right:0px;overflow-x: auto"><p></p></div></div>');
		$('.videoContainer .bgwhite_bdrblue').css('height', (vHeight-49));
		
		$(".videoContainer .mejs-audioScript-button").click(function() {
			if($(this).hasClass("activeBtn")) {
				$(this).removeClass("activeBtn");
  				$(".audioText").hide();
			} else {				
				if($(".videoContainer .mejs-captions-button").hasClass("mejs-captions-enabled")) {				
					$(".videoContainer .mejs-captions-button").trigger("click");
				}
				$(".videoContainer .mejs-captions-button").removeClass("mejs-captions-enabled");
				$(this).addClass("activeBtn");
				$(".audioText").show();
			}
		});
		
		$(".videoContainer .mejs-captions-button").click(function() {			
			if($(this).hasClass("mejs-captions-enabled")) {
				$(".audioText").hide();
				$(".videoContainer .mejs-audioScript-button").removeClass("activeBtn");
				$(this).addClass("mejs-captions-enabled");
			} else {
				if($(".videoContainer .mejs-audioScript-button").hasClass("activeBtn")) {
					$(".videoContainer .mejs-audioScript-button").removeClass("activeBtn");
					$(".audioText").hide();
					$(this).addClass("mejs-captions-enabled");
				} else {
					$(".videoContainer .mejs-audioScript-button").removeClass("activeBtn");
					$(this).removeClass("mejs-captions-enabled");
				}
			}
		});
		
		$(".videoContainer #audioTranscript_1").mCustomScrollbar( {
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 200
		});
		
		$(".videoContainer #aud_close_1").click(function() {			 
			$(".audioText").hide();
			$(".videoContainer .mejs-audioScript-button").removeClass("activeBtn");
		});
	/* if(src){
        setTimeout(function(){
            videoPlayer.setSrc(src);
        },300);
	} */
}
/*
function fnVideoPlayer(aNumId) {
	var vidPlayId = document.getElementById("video_"+aNumId);
		$("#page").find("video").each(function(){
			$(this).html('').next().html('');
		});
		$(vidPlayId).attr('src','../course/content_'+currLang+'/module_'+currModule+'/assets/videos/'+calloutData[aNumId-1]);
		vidPlayId.play();
		$("#video_"+aNumId).after('<div class="video_player_bg"><div id="play-pause_'+aNumId+'" class="play-pause pause"></div><div id="custom-seekbar"><span class="custom-timer"></span><span class="custom-seekbar"><span class="time-current"></span><span class="time-handle"></span></span></div></div>');
	var playPauseBtn = document.getElementById("play-pause_"+aNumId);		
		vidPlayId.ontimeupdate = function(){
			var percent = ( vidPlayId.currentTime / vidPlayId.duration ) * 100;
			$("#custom-seekbar span.time-current").css("width", percent+"%");	
			$("#custom-seekbar span.time-handle").css({"left": (percent-1)+"%"});
		};
		playPauseBtn.addEventListener("click", function() {		
			if (vidPlayId.paused == true) {
				vidPlayId.play();
				$('.play-pause').addClass('pause').removeClass('play');
			} else {		
				vidPlayId.pause();
				$('.play-pause').addClass('pause').removeClass('play');
			}
		});
		vidPlayId.addEventListener('ended', function() {
			$('.play-pause').addClass('pause').removeClass('play');
		});
		$("#custom-seekbar").on("click", function(e){
			var soffset = $(this).offset();
			var sleft = (e.pageX - soffset.left);
			var stotalWidth = $("#custom-seekbar").width();
			var spercentage = ( sleft / stotalWidth );
			var svidTime = vidPlayId.duration * spercentage;
			vidPlayId.currentTime = svidTime;
		});
}
*/
function fnOpenPop(aNum){
	$(".popupscreen").show();
	$(".scrpopup").hide();
	$('.scrpopup').each(function(index) {
		if(aNum==index)
		{
			$(this).show();
		}
	});
}
var completionCnt=0;
function fnScrCompletion(){
	completionCnt=0;
	for(var i=0;i<clkPopArray_1.length;i++)
	{
		if(clkPopArray_1[i]==1)
		{
			completionCnt++;
		}
	}
	if(completionCnt==totalPops)
	{
		fnMenuCompletionPage(currPageNum);
	}
}