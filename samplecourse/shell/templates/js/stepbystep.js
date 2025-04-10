/*----------Variable declartions----------*/
var steplistArr=new Array();
var stepNumArr= new Array();
var dd=false;
$(document).ready(function() {

	steplistArr=[];
	stepProcessCnt=1;
	stepAutoPlay=true;
	$("#prevDot").addClass("btn_disabled");
	$("#nextDot").removeClass("btn_disabled");
	$(".switch input").attr("checked","checked");
	fnLoadExternalDataForSBS();
	stepNumArr.forEach(function(item,ind) {
		$(".slide_dots #prevDot").after("<li></li>");
	});
	 if(device.MobileDevice()){
		$(".steplistBar").css("display", "none")
	 }
	if(stepAutoPlay==true) {
		$(".slide_dots li, #prevDot, #nextDot").css('cursor', 'default');
		$(".slide_dots li").addClass('autoPlay');		
		$("#nextDot").addClass("btn_disabled");
	} else {
		$(".slide_dots li, #prevDot, #nextDot").css('cursor', 'pointer').addClass('autoPlay');
		$(".slide_dots li").removeClass('autoPlay');
		$("#nextDot").removeClass("btn_disabled");
	}
	$(".steplisticon").click(function()
	{
		$(".info_text").toggle();$(".steplistBar .arrow-down").toggle();
		if($(this).hasClass("activebtn"))
		{
			$(this).removeClass("activebtn")
		}else{
			$(".videocontent .audio_text").hide();
			$(".videocontent .mejs-audioScript-button").removeClass("activeBtn");
			$(this).addClass("activebtn")
		}
	});
	 $("#prevDot").click(function()
	{
		if ($(this).css('cursor') != "default") {
			if(!$(this).hasClass("btn_disabled")){
				fnLoadCurrentStepVideo(stepNumber-1)
			}
		}
	}); 
	$(".switch input").click(function()
	{
		 if($(this).is(':checked')) {
			stepAutoPlay=true;
			$(".videocontent .mejs-playpause-button").css('pointer-events', 'auto')
			$(".videocontent #vidPlayer").css('pointer-events', 'auto');
			$(".videocontent .mejs-overlay-play").css('pointer-events', 'auto');
			$(".slide_dots li, #prevDot, #nextDot").css('cursor', 'default');
			$(".slide_dots li").addClass('autoPlay');
			$("#prevDot").addClass("btn_disabled");
			$("#nextDot").addClass("btn_disabled");
		 }else{
			stepAutoPlay=false;
			dd = true;
			$(".videocontent .mejs-playpause-button").css('pointer-events', 'none')
			/* $(".videocontent #vidPlayer").css('pointer-events', 'none'); */
			$(".videocontent .mejs-overlay-play").css('pointer-events', 'none');
			$(".slide_dots li, #prevDot, #nextDot").css('cursor', 'pointer');
			$(".slide_dots li").removeClass('autoPlay');
		 }
	});
	$("#nextDot").click(function()
	{
		if ($(this).css('cursor') != "default") {
			if(!$(this).hasClass("btn_disabled")){
				fnLoadCurrentStepVideo(stepNumber+1)
			}
		}
	});
	$("#info_close").click(function()
	{
		$(".info_text").hide();
		$(".steplistBar .arrow-down").hide();
		$('.steplisticon').removeClass("activebtn")
	});
	
	$(".processAlertContinue").click(function()
	{
		$("#processAlertContainer").hide();
		//$(".right_btns, .modulecontinue_clkbtn, .steplistBar, .pc_dy, .mob_dy, #revTool, .logout_clkbtn").css('pointer-events', 'auto')
		$('#vidPlayer').show();
		videoPlayer.play();
	});
	
	$(".slide_dots li").each(function(index)
	{
		$(".slide_dots li:not(.firstLast)").eq(index).attr("data-before",stepNumArr[index]);
		$(this).click(function()
		{
			if ($(this).css('cursor') != "default") {
				//$(this).removeClass("activedot");
				if(!$(this).hasClass("firstLast"))
				{ 
					videoPlayer.pause();
					 setTimeout(function(){
						fnLoadCurrentStepVideo(index);
					},400); 
					
				}
			}
		});
	});
});
function fnLoadCurrentStepVideo(aNum)
{
	//videoPlayer.pause();
	pauseflag = true;
	   $(".slide_dots li").removeClass("activedot");
	$(".slide_dots li").eq(aNum).addClass("activedot"); 
	   videoPlayer.setCurrentTime(steplistArr[aNum-1]);  
	 
	//$(".videocontent .mejs-playpause-button").trigger('click');
	 
	  setTimeout(function(){
		pauseflag=false;
		videoPlayer.play();
	},800);  
}
function fnLoadExternalDataForSBS(){
	var eData= ExternalPageData;
	 $.each(eData, function(key, value) {
		if(key=="time_split"){
			steplistArr=value.text;
			stepNumArr=value.stepNums;
		}
	}); 
}