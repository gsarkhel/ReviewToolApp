$(document).ready(function() {
function GetIEVersion() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");

  // If IE, return version number.
  if (Idx > 0) 
    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./)) 
    return 11;

  else
    return 0; //It is not IE
}


	$(".cyuPopClsBtn").click(function()
	{
		if(cyuComplete)
		{
			/* console.log(":::::::::Test::::::"); */
			fnMenuCompletionPage(currPageNum);
			cyuComplete=false;
		}
		$(".popupcyuscreen").hide();
	});
	 
	 var tWidth=$('.wrapper_header').width();
	tHgt=Number(tWidth*8/27)-58;
	
	 
	 if(device.iPad()){
		
		 $(".inner_height").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		}); 
		 
  applyOrientation();
 
window.onresize = function (event) {
  applyOrientation();
}
 }
 else if(device.MobileDevice()){
 applyOrientationMob();
 
window.onresize = function (event) {
  applyOrientationMob();
}
 }
 else {
 $(".inner_height").css("overflow-y","auto");
	  $(".inner_height").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		}); 
	 $(".inner_height").css("height", tHgt-60);
 }
	 
	 
  
 
 
});

 
function applyOrientationMob() {
if (window.innerHeight > window.innerWidth) {
  $(".inner_height").css("height", "auto")
  } else {
     $(".inner_height").css("overflow","auto");
	 $(".inner_height").css("height", "auto")
  }
}
function applyOrientation() {

  if (window.innerHeight > window.innerWidth) {
  $(".inner_height").css("height", "505px")
  $(".option_text").css("width", "336px")
  } else {
     $(".inner_height").css("overflow","auto");
	 $(".inner_height").css("height", "350px");
	  $(".option_text").css("width", "476px")
  }
}
/*---------------Variable declartions---------*/
var score=0;
var corrAns;
var userSelection;
var totQuestCount = 0;
var currentQuest = 0;
var quesImage=new Array();
var quesImageName=new Array();
var qusBiggerImageName=new Array();
var quesType=new Array();
var quesArr=new Array();
var optionArr=new Array();
var noOptionArr=new Array();
var corrAnsArr=new Array();
var corrFeedback=new Array();
var mobileFeedback=new Array();
var IncorrFeedback=new Array();
var FirstIncorrFeedback=new Array();
var LastIncorrFeedback=new Array();
var questionbigImageName;
var questionImageName;
var noOfTries=3;
var countTries=0;
var currDivisio=0;
var userAns=new Array();
var tryAgainTxt="";
var SolnTxt="";
var tll;
var remedPage=new Array();
var cyuComplete=false;
/*---------------------Functions---------------------*/
function fnLoadPageExternalData(eData){
    	$.each(eData, function(key, value) {
	       if(key == "tryAgainText"){
				tryAgainTxt=value.text;
			}else if(key == "solutionText"){
				SolnTxt=value.text;
			}else if(key != "questionsData"){
				$("."+key).html(value.text);
			}else{
				var qusData = value;
				quesImage[totQuestCount]=qusData.qusImage;
				quesImageName[totQuestCount]=qusData.qusImageName;
				qusBiggerImageName[totQuestCount]=qusData.qusBigImageName;
				quesType[totQuestCount]=qusData.qusType;
				quesArr[totQuestCount]=qusData.question;
				optionArr[totQuestCount]=qusData.options;
				corrAnsArr[totQuestCount]=qusData.correctAnswer;
				corrFeedback[totQuestCount]=qusData.correctFeedback;
				mobileFeedback[totQuestCount]=qusData.mobileFeedback;
				IncorrFeedback[totQuestCount]=qusData.InCorrectFeedback;
				FirstIncorrFeedback[totQuestCount]=qusData.FirstInCorrectFeedback;
				LastIncorrFeedback[totQuestCount]=qusData.LastInCorrectFeedback;
				remedPage[totQuestCount]=qusData.remediationPage;
				totQuestCount++;
			}
	});
	loadQuestion();
	window.onunload = ZoomService();
	new ZoomService().listen();
		 	
	
}
 
function loadQuestion() {
	if(remedPageRevisit)
	{
		noOfTries=1;
		remedPageRevisit=false;
		$(".remediationBtn").hide();
	}
	var quesTxt = quesArr[currentQuest];
	var questionType= quesType[currentQuest];
	var questionImage = quesImage[currentQuest];
	 questionImageName = quesImageName[currentQuest];
 	questionbigImageName = qusBiggerImageName[currentQuest];
	var NoOfOptions = Number(optionArr[currentQuest].length);
	noOptionArr[currentQuest]=NoOfOptions;
	corrAns=corrAnsArr[currentQuest];
	var optionStr = '';
	if(questionType=="MCSS"){
			for (var i = 1; i <= NoOfOptions; i++) {
				optionStr +='<li id="optbox_' + i + '" class="cyu_effect1 optbox cyu_box"><div class="statement-selector1 answer_border boxes_li"><div class="single_slct_left"><i id="box_' + i + '" class="cyutick1 option_circle"></i></div><div class="single_slct_right"><label class="option_text" id="opt_'+ i +'">' + optionArr[currentQuest][i-1] + '</label></div><div class="clearfix"></div></div></li>';
			}
		}else{
			for (var i = 1; i <= NoOfOptions; i++) {	
				optionStr +='<li id="optbox_' + i + '" class="cyu_effect1 optbox cyu_box"><div class="statement-selector answer_border chk_bx boxes_li"><i id="box_' + i + '" class="fa fa-check cyutick option_circle"></i><div class="single_slct_right chk_bx_cntnt"><label class="option_text" id="opt_'+ i +'">' + optionArr[currentQuest][i-1] + '</label></div><div class="clearfix"></div></div></li>';
				userAns[i] =0;
			}
	}

	$('.question').html(quesTxt);
	if(device.MobileDevice()){
		$('.p_10_mb_blck .cyuImageRight img').removeAttr("data-action");
		if(questionImage.toLowerCase()=="yes"){
			$('.p_10_mb_blck .options').addClass("questionImage_"+questionImage).html(optionStr);
			
		}else{
			$('.options').addClass("questionImage_"+questionImage).html(optionStr);
		}
	}else{
		$('.options').addClass("questionImage_"+questionImage).html(optionStr);
	}
	if(questionImage.toLowerCase()=="yes")
	{
		 
		
		$('.p_10_pc_blck .options').addClass("divwidth");
		$('.p_10_pc_blck .cyuImageRight').addClass("cyuwidth");
		var loadRightImage=fnLoadCYUImage(questionImageName);
		$('.cyuImageRight img').attr("src",loadRightImage);
	}else{
	
	$('.p_10_pc_blck .options').addClass("divSize50");
	$('.cyuImageRight').addClass("divSize50");
		$('.cyuImageRight').hide();
	}
	
	 //alert(window.innerWidth+" "+window.innerHeight)
	
	KCCheck(NoOfOptions);
	
	if(device.iPad()){
		
		 $(".inner_height").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		}); 
		 
  applyOrientation();
 
window.onresize = function (event) {
  applyOrientation();
}
 }
 else if(device.MobileDevice()){
 applyOrientationMob();
 
window.onresize = function (event) {
  applyOrientationMob();
}
 }
 else {
  if(optionArr[currentQuest].length > 7){
		  $(".inner_height").css("overflow","auto");
 		 
		 $(".inner_height").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
$(".inner_height").css("height", tHgt-60);		
  
 }
  
 }
}
var clickCount=0;
function KCCheck(noOfOpt) {
	$(".single_slct_left, .single_slct_right, .cyutick").unbind("");	
	//$(".cyu_effect1").bind("click", function() {
	$(".single_slct_left, .single_slct_right, .cyutick").bind("click", function() {
		no = $(this).parent().parent().attr("id").split("_")[1];
		if(quesType[currentQuest]=="MCSS"){
			 for (var i = 1; i <= noOfOpt; i++) {
				$(".optbox").find("#box_" + i).removeClass("activeBtn");
				$(".optbox").find("#opt_" + i).removeClass("optnbold");
			 }
			userSelection = no;
			$(".optbox").find("#box_" + no).addClass("activeBtn");
			$(".optbox").find("#opt_" + no).addClass("optnbold");
			nextEnable();
		}else{
			if(userAns[no] == no){
				userAns[no] = 0;
				clickCount--;
				$(".optbox").find("#box_" + no).removeClass("activeBtn");
				$(".optbox").find("#opt_" + no).removeClass("optnbold");
				if(clickCount<=0){
					nextDisable();	
				}				
			}else if(userAns[no] ==0){
			    clickCount++;
				$(".optbox").find("#box_" + no).addClass("activeBtn");
				$(".optbox").find("#opt_" + no).addClass("optnbold");
				userAns[no] = no;	
				nextEnable();
			}
		}
	});

}
function nextEnable(){
	$(".Next_Button").removeClass("cyudisabled");
	$(".Rst_btn").removeClass("cyudisabled");
	$('.Next_Button').unbind("");
	$('.Rst_btn').unbind("");
   	$('.Next_Button').bind( "click", fnSubmitClick);
	$('.Rst_btn').bind( "click", fnResetClick);
	
}
function nextDisable(){
	$(".Next_Button").addClass("cyudisabled");
	$(".Rst_btn").addClass("cyudisabled");
	$('.Next_Button').unbind("click", fnSubmitClick);
}
function fnResetClick(){
   for(var k=1;k<=noOptionArr[currentQuest];k++){
	   if(quesType[currentQuest]=="MCSS"){
			$(".optbox").find("#box_" + k).removeClass("activeBtn");
			$(".optbox").find("#opt_" + k).removeClass("optnbold");
			nextDisable();
		}
		else{
			 $(".optbox").find("#box_" + k).removeClass("activeBtn");
			 $(".optbox").find("#opt_" + k).removeClass("optnbold");
				 nextDisable();
				 userAns[k]=0;	
		}
	}
	KCCheck(noOptionArr[currentQuest]);
}
function fnSubmitClick(){
	countTries++;
	validation();
}
 
function validation() {
	
	if(quesType[currentQuest]=="MCSS"){//-------------------------------------Radio(MCSS)-------------------------
		userAns[currentQuest]=userSelection;
		nextDisable();
		for(var k=1;k<=noOptionArr[currentQuest];k++){
			$("#option_" + k).css("cursor","default");
		}
		$(".popupcyuscreen").show();
		if (userSelection == corrAns) {
				$(".option_text").css("cursor","default");
				cyuComplete=true;
				//fnMenuCompletionPage(currPageNum);
				 if(device.iOS() || device.Android()){
 		/*  var str = corrFeedback[currentQuest];
			var res = str.replace(" and click next", " ")		 */	 
			 $(".feedback_text p").html(mobileFeedback[currentQuest]);	
			}
			else {
			$(".feedback_text p").html(corrFeedback[currentQuest]);	
			}
			
				//$(".feedback_text p").html(corrFeedback[currentQuest]);
				$(".Rmdn_btn").addClass("cyudisabled");
				$('.Rst_btn').unbind( "click", fnResetClick );
				$('.Rmdn_btn').unbind( "click", fnRemedtnClick );
				$(".single_slct_left, .single_slct_right, .cyutick").unbind("");//unbind("click");
				$(".cyu_effect1, .single_slct_left, .single_slct_right").css("cursor","default");
				$("body").removeClass("cyuenabled");
 
		}else{
			
			if(countTries==noOfTries){		
			  //alert('::3rd wrong');
				$(".option_text").css("cursor","default");
				$('.Next_Button').unbind( "click", fnSubmitClick );
             	$(".Rmdn_btn").addClass("cyudisabled");
				$(".Rst_btn").addClass("cyudisabled");
               	$(".Rmdn_btn").bind( "click", fnRemedtnClick );
				$("body").removeClass("cyuenabled");
				//$('.Next_Button').html(SolnTxt);
				$(".Next_Button").removeClass("cyudisabled");
				//$('.Next_Button').bind( "click", fnSolutionClick );
				$(".feedback_text p").html(LastIncorrFeedback[currentQuest]);
               $(".single_slct_left, .single_slct_right, .cyutick").unbind("");//unbind("click");
					$(".cyu_effect1, .single_slct_left, .single_slct_right").css("cursor","default");
				fnSolutionClick();
	
				
			}else  if(countTries==(noOfTries-1)){
                //alert('::2 nd wrong');               				
				$('.Next_Button').unbind( "click", fnSubmitClick );
				$('.Rst_btn').unbind( "click", fnResetClick );
             	$(".Rmdn_btn").removeClass("cyudisabled");
                $(".Rmdn_btn").bind( "click", fnRemedtnClick );
				$(".option_text").css("cursor","default");
				$("body").removeClass("cyuenabled");
				fnResetClick();
				$(".feedback_text p").html(FirstIncorrFeedback[currentQuest]);
                $(".single_slct_left, .single_slct_right, .cyutick").unbind("");//unbind("click");	
	            $(".cyu_effect1, .single_slct_left, .single_slct_right").css("cursor","default");			
			}
			else{	
                 //alert('::1st wrong');			
				$(".feedback_text p").html(IncorrFeedback[currentQuest]);		
				$('.Next_Button').unbind( "click", fnSubmitClick);
				//$('.Next_Button').html(tryAgainTxt);	
				$('.Rst_btn').unbind( "click", fnResetClick );
				$(".Next_Button").removeClass("cyudisabled");
				//$('.Next_Button').bind( "click", fnTryagainClick);						
				$(".single_slct_left, .single_slct_right, .cyutick").unbind("");//unbind("click");
					$(".cyu_effect1").css("cursor","default");
                fnResetClick();					
			}
		}
	}else{ 
	//-------------------------------------checkbox(MCMS)-------------------------
        $(".popupcyuscreen").show();
		var corrCnt=0;
		var userAnsCnt=0;
		var correctAns=corrAns.split(",");
		for(var i=1;i<userAns.length;i++){
			if(userAns[i]!=0){
				userAnsCnt++;
			}
			for(var j=0;j<correctAns.length;j++){
				if(userAns[i]==correctAns[j]){
					corrCnt++;
				}
			}
		}
		if (corrCnt == correctAns.length && correctAns.length==userAnsCnt) {
			nextDisable();
			//alert('correct');
			cyuComplete=true;
 			//fnMenuCompletionPage(currPageNum);
		 if(device.iOS() || device.Android()){
 		/*  var str = corrFeedback[currentQuest];
			var res = str.replace(" and click Next ", " ")		 */	 
			 $(".feedback_text p").html(mobileFeedback[currentQuest]);	
			}
			else {
			$(".feedback_text p").html(corrFeedback[currentQuest]);	
			}
			
			$(".option_text, .cyutick, .single_slct_right").css("cursor","default");
			$(".Rst_btn").addClass("cyudisabled");
                $('.Rst_btn').unbind( "click", fnResetClick );	
			$("body").removeClass("cyuenabled");
			
			 //for (var i = 1; i <= noOptionArr[currentQuest]; i++) {
					$(".single_slct_left, .single_slct_right, .cyutick").unbind("click");
						$(".cyu_effect1").css("cursor","default");
					// }
		
		}else{
			if(noOfTries==countTries){
			    $('.Next_Button').unbind( "click", fnSubmitClick );
				$(".Rmdn_btn").addClass("cyudisabled");
				$(".Rmdn_btn").unbind( "click", fnRemedtnClick );
				//$(".Next_Button").html(SolnTxt);
				$(".option_text").css("cursor","default");
				$("body").removeClass("cyuenabled");
				$(".Next_Button").removeClass("cyudisabled");
				$(".Rst_btn").addClass("cyudisabled");
                $('.Rst_btn').unbind( "click", fnResetClick );	
				//$('.Next_Button').bind( "click", fnSolutionClick);
				$(".feedback_text p").html(LastIncorrFeedback[currentQuest]);
				$(".single_slct_left, .single_slct_right, .cyutick").unbind("");//unbind("click");
					$(".cyu_effect1").css("cursor","default");
				fnSolutionClick();
		    	}
			 
			 else  if(countTries==(noOfTries-1)){              				 
				$('.Next_Button').unbind( "click", fnSubmitClick );
				$('.Rst_btn').unbind( "click", fnResetClick );
             	$(".Rmdn_btn").removeClass("cyudisabled");
               	$(".Rmdn_btn").bind( "click", fnRemedtnClick );
				$(".Next_Button").addClass("cyudisabled");
				$(".Rst_btn").addClass("cyudisabled");
				$(".option_text, .cyutick, .single_slct_right").css("cursor","default");
				$("body").removeClass("cyuenabled");
				fnResetClick();
				$(".feedback_text p").html(FirstIncorrFeedback[currentQuest]); 
               $(".single_slct_left, .single_slct_right, .cyutick").unbind("click");	
			    $(".cyu_effect1").css("cursor","default");				
			}
			 else{	
			    $(".feedback_text p").html(IncorrFeedback[currentQuest]);
	   			//$('.Next_Button').html(tryAgainTxt);
                $(".Rst_btn").addClass("cyudisabled");
                $('.Rst_btn').unbind( "click", fnResetClick );				
	   			$('.Next_Button').unbind( "click", fnSubmitClick );
		    	//$('.Next_Button').bind( "click", fnTryagainClick);	
				$(".single_slct_left, .single_slct_right, .cyutick").unbind("");
					$(".cyu_effect1").css("cursor","default");
                fnResetClick();					
			 }	
		
 	    }		
	}
}
function fnTryagainClick()
{
    $(".single_slct_left, .single_slct_right, .cyutick").unbind("click");
	$('.Next_Button').text("Submit");
	$(".popupcyuscreen").hide();
	for(var k=1;k<=noOptionArr[currentQuest];k++){
		if(quesType[currentQuest]=="MCSS"){
	        $(".optbox").find("#box_" + k).removeClass("activeBtn");
			$(".optbox").find("#opt_" + k).removeClass("optnbold");
		}else{
            $(".optbox").find("#box_" + k).removeClass("activeBtn");
			$(".optbox").find("#opt_" + k).removeClass("optnbold");
			userAns[k]=0;	
		}
	    $("#option_" + k).css("cursor","pointer");
	}		
	KCCheck(noOptionArr[currentQuest]);	
	$('.Next_Button').unbind( "click", fnTryagainClick);
	nextDisable();
}
function fnRemedtnClick(){ 
	remePage=remedPage[currentQuest].split(",");
	remedCyuPage=currPageNum;
	fnDisableRemediationBtns(remePage[0]);
}
function fnSolutionClick(){
		fnResetClick();
		//fnMenuCompletionPage(currPageNum);
		cyuComplete=true;
	   if(quesType[currentQuest]=="MCSS"){
            $("#box_" + userSelection).removeClass("activeBtn");
		    $(".optbox").find("#box_" + corrAns).addClass("activeBtn");
		    $("#box_" + userSelection).removeClass("activeBtn");
            $("#opt_" + userSelection).removeClass("optnbold");
            $(".optbox").find("#opt_" + corrAns).addClass("optnbold");
            $("#opt_" + userSelection).removeClass("optnbold");			
		}else{
			var correctAns=corrAns.split(",");
			for(var j=0;j<correctAns.length;j++){
				$(".optbox").find("#box_" + correctAns[j]).addClass("activeBtn");
                $(".optbox").find("#opt_" + correctAns[j]).addClass("optnbold");				
					
			}
		}	   
	$(".single_slct_left, .single_slct_right, .cyutick").unbind("");
	$(".cyu_effect1").css("cursor","default");
	$(".option_text, .cyutick, .single_slct_right").css("cursor","default");
	$(".Rst_btn").addClass("cyudisabled");
	$('.Rst_btn').unbind( "click", fnResetClick );
	$(".Rmdn_btn").unbind();
}

 /**
   * The zoom service
   */
  function ZoomService () {
    this._activeZoom            =
    this._initialScrollPosition =
    this._initialTouchPosition  =
    this._touchMoveListener     = null

    this._$document = $(document)
    this._$window   = $(window)
    this._$body     = $(document.body)
this._$body.off('click', '[data-action="zoom"]', $.proxy(this._zoom, this));

    this._boundClick = $.proxy(this._clickHandler, this)
  }

  ZoomService.prototype.listen = function () {
    this._$body.on('click', '[data-action="zoom"]', $.proxy(this._zoom, this))
  }

  ZoomService.prototype._zoom = function (e) {
    var target = e.target

    if (!target || target.tagName != 'IMG') return

    if (this._$body.hasClass('zoom-overlay-open')) return

    if (e.metaKey || e.ctrlKey) {
      return window.open((e.target.getAttribute('data-original') || e.target.src), '_blank')
    }

    if (target.width >= ($(window).width() - Zoom.OFFSET)) return

    this._activeZoomClose(true)

    this._activeZoom = new Zoom(target)
    this._activeZoom.zoomImage()

    // todo(fat): probably worth throttling this
    this._$window.on('scroll.zoom', $.proxy(this._scrollHandler, this))

    this._$document.on('keyup.zoom', $.proxy(this._keyHandler, this))
    this._$document.on('touchstart.zoom', $.proxy(this._touchStart, this))

    // we use a capturing phase here to prevent unintended js events
    // sadly no useCapture in jquery api (http://bugs.jquery.com/ticket/14953)
    if (document.addEventListener) {
      document.addEventListener('click', this._boundClick, true)
    } else {
      document.attachEvent('onclick', this._boundClick, true)
    }

    if ('bubbles' in e) {
      if (e.bubbles) e.stopPropagation()
    } else {
      // Internet Explorer before version 9
      e.cancelBubble = true
    }
  }

  ZoomService.prototype._activeZoomClose = function (forceDispose) {
    if (!this._activeZoom) return

    if (forceDispose) {
      this._activeZoom.dispose()
    } else {
      this._activeZoom.close()
    }

    this._$window.off('.zoom')
    this._$document.off('.zoom')

    document.removeEventListener('click', this._boundClick, true)

    this._activeZoom = null
  }

  ZoomService.prototype._scrollHandler = function (e) {
    if (this._initialScrollPosition === null) this._initialScrollPosition = $(window).scrollTop()
    var deltaY = this._initialScrollPosition - $(window).scrollTop()
    if (Math.abs(deltaY) >= 40) this._activeZoomClose()
  }

  ZoomService.prototype._keyHandler = function (e) {
    if (e.keyCode == 27) this._activeZoomClose()
  }

  ZoomService.prototype._clickHandler = function (e) {
    if (e.preventDefault) e.preventDefault()
    else event.returnValue = false

    if ('bubbles' in e) {
      if (e.bubbles) e.stopPropagation()
    } else {
      // Internet Explorer before version 9
      e.cancelBubble = true
    }

    this._activeZoomClose()
  }

  ZoomService.prototype._touchStart = function (e) {
    this._initialTouchPosition = e.touches[0].pageY
    $(e.target).on('touchmove.zoom', $.proxy(this._touchMove, this))
  }

  ZoomService.prototype._touchMove = function (e) {
    if (Math.abs(e.touches[0].pageY - this._initialTouchPosition) > 10) {
      this._activeZoomClose()
      $(e.target).off('touchmove.zoom')
    }
  }


  /**
   * The zoom object
   */
  function Zoom (img) {
    this._fullHeight      =
    this._fullWidth       =
    this._overlay         =
    this._targetImageWrap = null

    this._targetImage = img

    this._$body = $(document.body)
  }

  Zoom.OFFSET = 80
  Zoom._MAX_WIDTH = 2560
  Zoom._MAX_HEIGHT = 4096

  Zoom.prototype.zoomImage = function () {
    var img = document.createElement('img')
    img.onload = $.proxy(function () {
      this._fullHeight = Number(img.height)
      this._fullWidth = Number(img.width)
      this._zoomOriginal()
    }, this)
    img.src = this._targetImage.src
  }

  Zoom.prototype._zoomOriginal = function () {
    this._targetImageWrap           = document.createElement('div')
    this._targetImageWrap.className = 'zoom-img-wrap'

    this._targetImage.parentNode.insertBefore(this._targetImageWrap, this._targetImage)
    this._targetImageWrap.appendChild(this._targetImage)

    $(this._targetImage)
      .addClass('zoom-img')
      .attr('data-action', 'zoom-out')

    this._overlay           = document.createElement('div')
    this._overlay.className = 'zoom-overlay'

    document.body.appendChild(this._overlay)

    this._calculateZoom()
    this._triggerAnimation()
  }

  Zoom.prototype._calculateZoom = function () {
    this._targetImage.offsetWidth // repaint before animating

    var originalFullImageWidth  = this._fullWidth
    var originalFullImageHeight = this._fullHeight

    var scrollTop = $(window).scrollTop()

    var maxScaleFactor = originalFullImageWidth / this._targetImage.width

    var viewportHeight = ($(window).height() - Zoom.OFFSET)
    var viewportWidth  = ($(window).width() - Zoom.OFFSET)

    var imageAspectRatio    = originalFullImageWidth / originalFullImageHeight
    var viewportAspectRatio = viewportWidth / viewportHeight

    if (originalFullImageWidth < viewportWidth && originalFullImageHeight < viewportHeight) {
      this._imgScaleFactor = maxScaleFactor

    } else if (imageAspectRatio < viewportAspectRatio) {
      this._imgScaleFactor = (viewportHeight / originalFullImageHeight) * maxScaleFactor

    } else {
      this._imgScaleFactor = (viewportWidth / originalFullImageWidth) * maxScaleFactor
    }
  }

  Zoom.prototype._triggerAnimation = function () {
    this._targetImage.offsetWidth // repaint before animating

    var imageOffset = $(this._targetImage).offset()
    var scrollTop   = $(window).scrollTop()

    var viewportY = scrollTop + ($(window).height() / 2)
    var viewportX = ($(window).width() / 2)

    var imageCenterY = imageOffset.top + (this._targetImage.height / 2)
    var imageCenterX = imageOffset.left + (this._targetImage.width / 2)

    this._translateY = viewportY - imageCenterY
    this._translateX = viewportX - imageCenterX

    var targetTransform = 'scale(' + this._imgScaleFactor + ')'
    var imageWrapTransform = 'translate(' + this._translateX + 'px, ' + this._translateY + 'px)'

    if ($.support.transition) {
      imageWrapTransform += ' translateZ(0)'
    }
setTimeout(function(){ 
var loadRightImage=fnLoadCYUImage(questionbigImageName);
console.log(questionbigImageName+"questionbigImageName") 
	 $(".zoom-img").attr("src",loadRightImage);
	   if(device.iPad()){
	   if(window.innerHeight > window.innerWidth){
	    if(optionArr[currentQuest].length > 6){
   $(".inner_height").css("overflow",""); 
  $(".inner_height").mCustomScrollbar('destroy');
   }
	   }
	   else if(window.innerWidth > window.innerHeight){
	   if(optionArr[currentQuest].length > 2){
   $(".inner_height").css("overflow",""); 
  $(".inner_height").mCustomScrollbar('destroy');
   }
	   }
	   }
	   else 
	   {
	   if(optionArr[currentQuest].length > 2){
   $(".inner_height").css("overflow",""); 
  $(".inner_height").mCustomScrollbar('destroy');
   }
   }
  
   
}, 100);
	 
    $(this._targetImage)
      .css({
        '-webkit-transform': targetTransform,
            '-ms-transform': targetTransform,
                'transform': targetTransform
      })

    $(this._targetImageWrap)
      .css({
        '-webkit-transform': imageWrapTransform,
            '-ms-transform': imageWrapTransform,
                'transform': imageWrapTransform
      })

    this._$body.addClass('zoom-overlay-open')
  }

  Zoom.prototype.close = function () {
    this._$body
      .removeClass('zoom-overlay-open')
      .addClass('zoom-overlay-transitioning')
 var loadRightImage=fnLoadCYUImage(questionImageName); 
	 $(".zoom-img").attr("src",loadRightImage);
	 if(device.iPad()){
	   if(window.innerHeight > window.innerWidth){
	    if(optionArr[currentQuest].length > 12){
   $(".inner_height").css("overflow","auto"); 
 $(".inner_height").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
   }
	   }
	   else if(window.innerWidth > window.innerHeight){
	   if(optionArr[currentQuest].length > 7){
  $(".inner_height").css("overflow","auto"); 
 $(".inner_height").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
   }
	   }
	   }
	   else 
	   {
	   if(optionArr[currentQuest].length > 7){
   $(".inner_height").css("overflow","auto"); 
 $(".inner_height").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
   }
   }
    // we use setStyle here so that the correct vender prefix for transform is used
    $(this._targetImage)
      .css({
        '-webkit-transform': '',
            '-ms-transform': '',
                'transform': ''
      })

    $(this._targetImageWrap)
      .css({
        '-webkit-transform': '',
            '-ms-transform': '',
                'transform': ''
      })

    if (!$.support.transition) {
      return this.dispose()
    }

    $(this._targetImage)
      .one($.support.transition.end, $.proxy(this.dispose, this)) 
  }

  Zoom.prototype.dispose = function () {
    if (this._targetImageWrap && this._targetImageWrap.parentNode) {
      $(this._targetImage)
        .removeClass('zoom-img')
        .attr('data-action', 'zoom')
var loadRightImage=fnLoadCYUImage(questionImageName); 
	 $(".zoom-img").attr("src",loadRightImage);
	if(device.iPad()){
	   if(window.innerHeight > window.innerWidth){
	    if(optionArr[currentQuest].length > 12){
   $(".inner_height").css("overflow","auto"); 
 $(".inner_height").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
   }
	   }
	   else if(window.innerWidth > window.innerHeight){
	   if(optionArr[currentQuest].length > 7){
  $(".inner_height").css("overflow","auto"); 
 $(".inner_height").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
   }
	   }
	   }
	   else 
	   {
	   if(optionArr[currentQuest].length > 7){
   $(".inner_height").css("overflow","auto"); 
 $(".inner_height").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
   }
   }
      this._targetImageWrap.parentNode.replaceChild(this._targetImage, this._targetImageWrap)
      this._overlay.parentNode.removeChild(this._overlay)
 
      this._$body.removeClass('zoom-overlay-transitioning')
    }
  }

    function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }