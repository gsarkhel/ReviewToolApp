$(document).ready(function() {
	var totwidth=$('.bgwhite_bdrblue').width();
	$(".cyuPopClsBtn").click(function()
	{
		if(cyuComplete)
		{
			fnMenuCompletionPage(currPageNum);
			cyuComplete=false;
		}
		$(".popupcyuscreen").hide();
	});
	
	 var tWidth=$('.wrapper_header').width();
	tHgt=Number(tWidth*8/24)-22;
	
	/* if(device.iPad()){
		
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
 /* $(".inner_height").css("overflow-y","auto");
	  $(".inner_height").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		}); 
	 $(".inner_height").css("height", tHgt-90);  
 } */
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
  $(".inner_height").css("height", "885px")
  } else {
     $(".inner_height").css("overflow","auto");
	 $(".inner_height").css("height", "350px")
  }
}
/*---------------Variable declartions---------*/
var score=0;
var corrAns;
var userSelection;
var totQuestCount = 0;
var currentQuest = 0;
var NoOfOptions;
var quesImage=new Array();
var quesType=new Array();
var quesArr=new Array();
var optionArr=new Array();
var noOptionArr=new Array();
var corrAnsArr=new Array();
var corrFeedback=new Array();
var IncorrFeedback=new Array();
var mobileFeedback=new Array();
var FirstIncorrFeedback=new Array();
var LastIncorrFeedback=new Array();
var questionbigImageName;
var questionImageName;
var quesImageName=new Array();
var qusBiggerImageName=new Array();
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
					quesImage[totQuestCount]=qusData.qusImageName;
					quesImageName[totQuestCount]=qusData.qusImageName;
					qusBiggerImageName[totQuestCount]=qusData.qusBigImageName;
					//console.log(quesImage[totQuestCount]);
					quesType[totQuestCount]=qusData.qusType;
					quesArr[totQuestCount]=qusData.question;
					optionArr[totQuestCount]=qusData.options;
					corrAnsArr[totQuestCount]=qusData.correctAnswer;
					mobileFeedback[totQuestCount]=qusData.mobileFeedback;
					corrFeedback[totQuestCount]=qusData.correctFeedback;
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
	//$(".feedback_content").css("display","none");
	if(remedPageRevisit)
	{
		noOfTries=1;
		remedPageRevisit=false;
		$(".remediationBtn").hide();
	}
	var quesTxt = quesArr[currentQuest];
	var questionType= quesType[currentQuest];
	var questionImage = quesImage[currentQuest];
	//console.log(questionImage+" ::: questionImage")
	NoOfOptions = Number(optionArr[currentQuest].length);
	noOptionArr[currentQuest]=NoOfOptions;
	corrAns=corrAnsArr[currentQuest];
	questionImageName = quesImageName[currentQuest];
	questionbigImageName = qusBiggerImageName[currentQuest];
	var optionStr = '';
	var loadImage=fnLoadCYUImage(questionImage);
	//console.log(loadImage+" :::loadImage ")
	$('.img_hotspot1 img').attr("src",loadImage);
	if(questionType=="MCSS"){
			for (var i = 1; i <= NoOfOptions; i++) {
				optionStr +='<span id="spot_' + i + '" class="hotspot_btn" onclick="fnHotspot(' + i + ')"></span>';
				//optionStr +='<li id="optbox_' + i + '" class="cyu_effect1 optbox"><div class="statement-selector1 answer_border boxes_li"><div class="single_slct_left"><i id="box_' + i + '" class="cyutick1 option_circle"></i></div><div class="single_slct_right"><label class="option_text">' + optionArr[currentQuest][i-1] + '</label></div><div class="clearfix"></div></div></li>';
			}
		}else{
			for (var i = 1; i <= NoOfOptions; i++) {	
				//optionStr +='<li id="optbox_' + i + '" class="cyu_effect1 optbox"><div class="statement-selector answer_border chk_bx boxes_li"><div class=""><i id="box_' + i + '" class="fa fa-check cyutick option_circle"></i></div><div class="single_slct_right chk_bx_cntnt"><label class="option_text">' + optionArr[currentQuest][i-1] + '</label></div><div class="clearfix"></div></div></li>';
				userAns[i] =0;
			}
	} 

	$('.question').html(quesTxt);
	$('.img_hotspot1 img').after(optionStr);
	if(device.MobileDevice()){
		$(".img_hotspot1 img").removeAttr("data-action");
	}
	
	//$('.options').html(optionStr);
	//$('.question_icon').html(currentQuest);
	//KCCheck(NoOfOptions);
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
    for (var i = 1; i <= NoOfOptions; i++) {
			$("#spot_" + i).html('').removeClass("spotActive");
			nextDisable();
		} 
}
function fnSubmitClick(){
	$(".hotspot_btn").html('');
	countTries++;
	validation();
}
function validation() {
	
		userAns[currentQuest]=userSelection;
		nextDisable();
		/* for(var k=1;k<=noOptionArr[currentQuest];k++){
			$("#option_" + k).css("cursor","default");
		} */
		$(".popupcyuscreen").show();
		if (userSelection == corrAns) {
				//fnMenuCompletionPage(currPageNum);
				cyuComplete=true;
				 if(device.iOS() || device.Android()){
 		/*  var str = corrFeedback[currentQuest];
			var res = str.replace(" and click Next ", " ")		 */	 
			 $(".feedback_text p").html(mobileFeedback[currentQuest]);	
			}
			else {
			$(".feedback_text p").html(corrFeedback[currentQuest]);	
			}
				$("#spot_" + corrAns).html(corrAns)
				$(".Rmdn_btn").addClass("cyudisabled");
				$('.Rst_btn').unbind( "click", fnResetClick );
				$('.Rmdn_btn').unbind( "click", fnRemedtnClick );
				$('.clkbtn span').prop('onclick',null).off('click');
				$(".clkbtn").css("cursor","default");
				$('.hotspot_btn').prop('onclick',null).off('click');
				$(".hotspot_btn").css("cursor","default");
 
		}else{
			
			if(countTries==noOfTries){		
			  //alert('::3rd wrong');
				$('.Next_Button').unbind( "click", fnSubmitClick );
             	$(".Rmdn_btn").addClass("cyudisabled");
				$(".Rst_btn").addClass("cyudisabled");
               	$(".Rmdn_btn").bind( "click", fnRemedtnClick );
				//$('.Next_Button').html(SolnTxt);
				$(".Next_Button").removeClass("cyudisabled");
				//$('.Next_Button').bind( "click", fnSolutionClick );
				$(".feedback_text p").html(LastIncorrFeedback[currentQuest]);
                $('.clkbtn span').prop('onclick',null).off('click');
				fnSolutionClick();
				$(".clkbtn").css("cursor","default");
				$('.hotspot_btn').prop('onclick',null).off('click');
				$(".hotspot_btn").css("cursor","default");
	
				
			}else  if(countTries==(noOfTries-1)){
                //alert('::2 nd wrong');               				
				$('.Next_Button').unbind( "click", fnSubmitClick );
				$('.Rst_btn').unbind( "click", fnResetClick );
             	$(".Rmdn_btn").removeClass("cyudisabled");
                $(".Rmdn_btn").bind( "click", fnRemedtnClick );
				$(".feedback_text p").html(FirstIncorrFeedback[currentQuest]);
                $('.clkbtn span').prop('onclick',null).off('click');	
                $(".clkbtn").css("cursor","default");
                $('.hotspot_btn').prop('onclick',null).off('click');	
                $(".hotspot_btn").css("cursor","default");
				for (var i = 1; i <= NoOfOptions; i++) {
					$("#spot_" + i).removeClass("spotActive");
				}  
			}
			else{	
                 //alert('::1st wrong');			
				$(".feedback_text p").html(IncorrFeedback[currentQuest]);		
				$('.Next_Button').unbind( "click", fnSubmitClick);
				//$('.Next_Button').html(tryAgainTxt);	
				$('.Rst_btn').unbind( "click", fnResetClick );
				$(".Next_Button").removeClass("cyudisabled");
				//$('.Next_Button').bind( "click", fnTryagainClick);						
				//$('.clkbtn').prop('onclick',null).off('click');
                fnResetClick();					
			}
		}	
}
function fnTryagainClick()
{
	$('.Next_Button').text("Submit");
	$(".popupcyuscreen").hide();
	for(var k=1;k<=noOptionArr[currentQuest];k++){
		if(quesType[currentQuest]=="MCSS"){
	        $("#box_" + k).removeClass("activeBtn");
		}else{
            $("#box_" + k).removeClass("activeBtn");
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
        $("#spot_" + userSelection).removeClass("spotActive");
		$("#spot_" + corrAns).html(corrAns).addClass("spotActive");
		$("#spot_" + userSelection).removeClass("spotActive");		
		$('.hotspot_btn').prop('onclick',null).off('click');
	$('.clkbtn span').prop('onclick',null).off('click');
	$(".Rst_btn").addClass("cyudisabled");
	$('.Rst_btn').unbind( "click", fnResetClick );
	$(".Rmdn_btn").unbind();
}
function fnHotspot(option){
  
    for (var i = 1; i <= NoOfOptions; i++) {			
			$("#spot_" + i).html(i).removeClass("spotActive");
		}  
	userSelection = option;
    $("#spot_"+option).html(option).addClass("spotActive");
    $("#spot_"+option).siblings().html('');
    nextEnable()
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