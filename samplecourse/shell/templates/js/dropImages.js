/*---------------Page Init Functions---------*/
var tryAgainTxt = "";
var SolnTxt = "";
var submitTxt = "";
var firstTime1 = false;
var solClicked=false;
var corrFeedback="";
var incorrFeedback_1="";
var incorrFeedback_2="";
var incorrFeedback_3="";
var totQuestCount = 0;
var currentQuest = 0;
var quesImage=new Array();
var quesImageName=new Array();
var quesType=new Array();
var quesArr=new Array();
var optionArr=new Array();
var ImageBigName;
var Imagename;
var ImageNamesArr=new Array();
var ImageBigNamesArr=new Array();
var noOptionArr=new Array();
var corrAnsArr=new Array();
var corrFeedback=new Array();
var IncorrFeedback=new Array();
var FirstIncorrFeedback=new Array();
var LastIncorrFeedback=new Array();
var remedPage=new Array();
var corrAns = new Array();
var selectOptTxt=new Array();
function fnLoadPageExternalData(eData){
	 $.each(eData, function(key, value) {
			if(key != "questionsData"){
				$("."+key).html(value.text);
			}else{
				var qusData = value;
				quesImage[totQuestCount]=qusData.qusImage;
				quesImageName[totQuestCount]=qusData.qusImageName;
				quesType[totQuestCount]=qusData.qusType;
				selectOptTxt[totQuestCount]=qusData.selectOptTxt;
				quesArr[totQuestCount]=qusData.question;
				optionArr[totQuestCount]=qusData.options;
				ImageNamesArr[totQuestCount]=qusData.ImageNames;
				ImageBigNamesArr[totQuestCount]=qusData.ImageBigNames;
				corrAnsArr[totQuestCount]=qusData.correctAnswer;
				corrFeedback[totQuestCount]=qusData.correctFeedback;
				IncorrFeedback[totQuestCount]=qusData.InCorrectFeedback;
				FirstIncorrFeedback[totQuestCount]=qusData.FirstInCorrectFeedback;
				LastIncorrFeedback[totQuestCount]=qusData.LastInCorrectFeedback;
				remedPage[totQuestCount]=qusData.remediationPage;
				totQuestCount++;
			}
	}); 
	fnLoadQuestion();
	window.onunload = ZoomService();
	new ZoomService().listen();
	if(remedPageRevisit)
	{
		attempt=1;
		remedPageRevisit=false;
		$(".remediationBtn").hide();
	}
 	fnDropDownClick();
	$(document).click(function () {
		$(".selectBoxDnD").removeClass("selectBoxDnDHidden");$(".elips").removeClass("active");
		$(".sub_slct").hide(); $(".sub_slct").hide();$(".slct_arw").hide();
	});
	$("#submit").click(function() {
		fnSubmitClick();
		$("#submit").addClass("cyudisabled");
		$(".Rst_btn").addClass("cyudisabled");
	});
	$(".Rst_btn").click(function() {
		if($(this).hasClass("cyudisabled")){
		}else{
			selected_drop = [];
			fnreset();
			fnselectreset();
			submitEnable=false;
			$(".elips").find("span").html(selectOptTxt);
			$("#submit").addClass("cyudisabled");
			$(".Rst_btn").addClass("cyudisabled");
		}
	})
    $(".cyuPopClsBtn").click(function(e) {
		$(".popupcyuscreen").hide();
		
        if (attempt == 2 && answerGiven == false) {
            selected_drop = [];
            for (var j = 1; j <= selecteditems; j++) {
                $("#dropdown_" + j).find("ul li:first").html(selectOptTxt);
            }
            fnselectreset();
			submitEnable=false;
			$("#submit").addClass("cyudisabled");
			$(".Rst_btn").addClass("cyudisabled");
        } else if (attempt == 1 && answerGiven == false) {
			for (var j = 1; j <= selecteditems; j++) {
				$("#dropdown_" + j).unbind("");
				$("#dropdown_" + j).find("ul li:first").html(selectOptTxt);
			}
			$(".selectBoxDnD > ul > li").css("cursor","default");$(".selectBoxDnD .dropArrow").css("cursor","default");
			$("#submit").addClass("cyudisabled");
			$(".Rst_btn").addClass("cyudisabled");
			submitEnable=false;
			$(".Rmdn_btn").removeClass("cyudisabled");
			$(".Rmdn_btn").bind("click", fnRemedtnClick);
        } else {
            if (answerGiven == false) {
                for (var j = 1; j <= selecteditems; j++) {
					$("#dropdown_" + j).unbind("");
				}
				submitEnable=false
				$("#submit").addClass("cyudisabled");
				$(".Rst_btn").addClass("cyudisabled");
				fnSolutionClick();
            } else {
                for (var j = 1; j <= selecteditems; j++) {
                    $("#dropdown_" + j).unbind("");
                }
				submitEnable=false;
				$("#submit").addClass("cyudisabled");
				
            }
        } 
		if(cyuComplete)
		{
			fnMenuCompletionPage(currPageNum);
			cyuComplete=false;
		}
    }); 
}
/*---------------Variable declartions---------*/
var submitEnable = false;
var attempt = 3;
var counter = 0;
var answerGiven = false;
var cAns = [3, 1, 2, 0];
var selected_drop = new Array();
var visited = false;
var prevnum = 0;
var scrubberBool = false;
var selecteditems = 4;
var cyuComplete=false;
$(document).ready(function() {
});
function fnLoadQuestion()
{
	var quesTxt = quesArr[currentQuest];
	var questionType= quesType[currentQuest];
	var questionImage = quesImage[currentQuest];
	var questionImageName = quesImageName[currentQuest];
	var NoOfOptions = Number(optionArr[currentQuest].length);	
	ImageBigName = ImageBigNamesArr[currentQuest];
	Imagename = ImageNamesArr[currentQuest];
	console.log(questionImageName)
	selecteditems=Number(optionArr[currentQuest].length);
	noOptionArr[currentQuest]=NoOfOptions;
	corrAns=corrAnsArr[currentQuest];
	cAns=corrAnsArr[currentQuest].split(",");
	$('.question').html(quesTxt);
	var loadRightImageArr = new Array();
	ImageNamesArr.forEach(function(item,ind) {	
	for(var i=0;i<optionArr[ind].length;i++)
		{		
			loadRightImageArr.push(fnLoadCYUImage(item[i]));	
		}
	});
	optionArr.forEach(function(item,ind) {
		for(var i=0;i<optionArr[ind].length;i++)
		{
			$(".slct_img_ul").append("<li><hr></hr><img src='../course/content_"+currLang+"/module_"+currModule+"/assets/images/"+pagesArray[currModule-1][currPageNum-1].split(".html")[0]+"/button.png'></li>")
			$(".dropdown_circle").append('<li class="clkbtn hot_spot'+(i+1)+'"><hr></hr><span id="spot_'+(i+1)+'" class="">'+(i+1)+'</span></li>');
			$(".draggableAreaMobile").append('<div class="mobileDragAndDrop selctImageDrop"><img id="image_'+(i+1)+'" src="'+loadRightImageArr[i]+'" data-action="zoom"><div class="tableQusHolder"><div class="tableQusHolderRow">	<div class="tableNumberDnD shell_bg_teal"></div></div></div><div class="selectBoxDnD shell_bg_orange" id="dropdown_'+(i+1)+'"><span class="dropArrow"></span><div class="slct_arw"></div><ul><li class="elips Solid-BG drdn_border">'+selectOptTxt[currentQuest]+'<em></em> </li><ul class="sub_slct"></ul></ul></div></div>')
		}
		
	});
	for(var j=0;j<optionArr[currentQuest].length;j++)
	{
		$(".sub_slct").append('<li class="sel opt'+(j+1)+' Solid-BG drdn_border" id="option_'+(j+1)+'"> <span class="rdio_chk select_'+(j+1)+'">'+optionArr[currentQuest][j]+'</span></li>');
 		$("#draggableAreaMobile > div:first-Child").addClass("row"+optionArr[currentQuest].length+"dropImages")
	}
/* 	if(device.iPad() && window.innerWidth > window.innerHeight){
	  $(".inner_height_imgdrop").css("overflow","auto");
		 $(".inner_height_imgdrop").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		}); 
	} */
	if(device.MobileDevice()){
		$(".row4dropImages img").removeAttr("data-action");
		$(".selctImageDrop img").removeAttr("data-action");
	}
}
  $(window).bind('orientationchange', function(event) {
   if(event.orientation == "portrait"){
   $(".inner_height_imgdrop").css("overflow","");
  $(".inner_height_imgdrop").mCustomScrollbar('destroy');;
 
 }
   
});
function fnRemedtnClick(){ 
	remePage=remedPage[currentQuest].split(",");
	remedCyuPage=currPageNum;
	fnDisableRemediationBtns(remePage[0]);
}
function fnSolutionClick() {
	solClicked=true;
    matchCorrectAns_1();
	//fnMenuCompletionPage(currPageNum);
	cyuComplete=true;
    for (var j = 1; j <= selecteditems; j++) {
        $("#dropdown_" + j).unbind("");
    }
	$(".selectBoxDnD > ul > li").css("cursor","default");
	$(".selectBoxDnD .dropArrow").css("cursor","default");
	$(".Rmdn_btn").unbind();
}
function fnSubmitClick() {
    if (submitEnable) {
		Feedback();
    }
}
function matchCorrectAns_1() {
    for (var j = 0; j < selecteditems; j++) {
        $("#dropdown_" + (j + 1)).find("ul li:first").html(optionArr[currentQuest][cAns[j]]);
        $("#dropdown_" + (j + 1)).find("ul li:first").css("textOverflow ",
                "ellipsis");
    }
}
function DropDownFeedback(aAttempt) {
    for (var j = 0; j < cAns.length; j++) {
        if (selected_drop[j] == cAns[j]) {
            counter++;
        }
    }
    if (counter == selecteditems) {
		//fnMenuCompletionPage(currPageNum);
		cyuComplete=true;
        $(".popupcyuscreen").show();
		if(device.iOS() || device.Android()){
 		 var str = corrFeedback[currentQuest];
			var res = str.replace(" and click Next ", " ")			 
			$(".popupcyuscreen .pop_description").html(res);	
			}
			else {
			$(".popupcyuscreen .pop_description").html(corrFeedback[currentQuest]);
			}
        answerGiven = true;
		$(".Rst_btn").addClass("cyudisabled");
		$("#submit").addClass("cyudisabled");
		submitEnable=false;
		$(".selectBoxDnD > ul > li").css("cursor","default");
		$(".selectBoxDnD .dropArrow").css("cursor","default");
    } else {
		$(".popupcyuscreen").show();
        answerGiven = false;
		if(aAttempt==2){
			$(".popupcyuscreen .pop_description").html(IncorrFeedback[currentQuest]);
			for (var i = 0; i <= selecteditems; i++) {
				$("#dropdown_" + i).find("span").removeClass("rdio_checked");
				$("#dropdown_" + i).find("ul li:first").html(selectOptTxt);
				$("#dropdown_" + i).removeClass("selectBoxDnDHidden");
			}
		}else if(aAttempt==1){
			$(".popupcyuscreen .pop_description").html(FirstIncorrFeedback[currentQuest]);
		}else{
			$(".popupcyuscreen .pop_description").html(LastIncorrFeedback[currentQuest]);
		}
        
    }
}
function CorrectAns() {
    for (var j = 0; j < selecteditems; j++) {
        $("#dropdown_" + (j + 1)).find("ul li:first").html($("#dropdown_" + (j + 1)).find("ul li").eq(cAns[j] + 1).html());
        $("#dropdown_" + (j + 1)).find("ul li:first").css("textOverflow ", "ellipsis");
    }
}
function Feedback() {
    counter = 0;
    attempt--;
	DropDownFeedback(attempt);
}
function fnDropDownClick() {
    for (var j = 1; j <= selecteditems; j++) {
        $("#dropdown_" + j).unbind();
        $("#dropdown_" + j).bind("click", function(e) {
			$(".selectBoxDnD").find(".elips").removeClass("active");
			$(this).find(".elips").addClass("active");
			$(this).find(".slct_arw").css("z-index","9999999");
            var i = Number(this.id.split("_")[1]);
			
            if (i != prevnum) {
                visited = false;
            }
			$(".slct_arw").hide();
			$(".slct_arw").css("z-index","1");
            if (visited == false) {
				$(".dropArrow").css("z-index","99");
				$(".dropArrow").eq(i-1).show();
                fnreset();
                visited = true;
                prevnum = i;
				$(".slct_arw").eq(i-1).css("z-index","9999999");
				$(".dropArrow").eq(i-1).css("z-index","99999999");
				$(".slct_arw").eq(i-1).show();
                $("#dropdown_" + i).addClass("selectBoxDnDHidden");
				$("#dropdown_" + i).find(".sub_slct").show();
                $("#dropdown_" + i).find(".sel").addClass("pointer");
                $("#dropdown_" + i).find(".sel").click(function(e) {
                    tempval = $(this).html().split(".")[0];
                    fnreset_select(i);
                    $(this).addClass("selected");
                    curId = Number(this.id.slice(7));
                    selected_drop[i - 1] = curId - 1;
                    $("#dropdown_" + i).find("ul li:first").html(tempval);
					$(".slct_arw").hide();
					$(".dropArrow").css("z-index","99");
                    fnreset();
                    fnsubmitEnable();
					$(".elips").removeClass("active");
					$(".sub_slct").hide();
					e.stopPropagation();
                });
            } else {
				$(".sub_slct").hide();
				$(".slct_arw").hide();
				$(".slct_arw").css("z-index","1");
				$(".elips").removeClass("active");
                $("#dropdown_" + i).removeClass("selectBoxDnDHidden");
                visited = false;
            }
			e.stopPropagation();
        });
    }
}

function fnsubmitEnable() {
    var subCnt = 0;
    for (var j = 0; j < cAns.length; j++) {
        if (selected_drop[j] != undefined) {
            subCnt++;
        }
    }
    if (subCnt == cAns.length) {
		submitEnable=true;
		$("#submit").removeClass("cyudisabled");
		$(".Rst_btn").removeClass("cyudisabled");
    } else {
		submitEnable=false;
		$("#submit").addClass("cyudisabled");
		$(".Rst_btn").addClass("cyudisabled");
    }
}

function fnreset() {
    for (var j = 1; j <= cAns.length; j++) {
        $("#dropdown_" + j).removeClass("selectBoxDnDHidden");
		 $("#dropdown_" + j).find(".sub_slct").hide();
    }
}

function fnreset_select(i) {
    for (var j = 1; j <= cAns.length; j++) {
        if (i == j) {
            $("#dropdown_" + j).find("ul li").removeClass("selected");
        }
    }
}
function fnselectreset() {
    for (var j = 1; j <= cAns.length; j++) {
        $("#dropdown_" + j).find("ul li").removeClass("selected");
    }
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
	 
	var img1 = ImageBigName[0].substring(0, ImageBigName[0].lastIndexOf("."));
	var img2 = ImageBigName[1].substring(0, ImageBigName[1].lastIndexOf("."));
	var img3 = ImageBigName[2].substring(0, ImageBigName[2].lastIndexOf("."));
	  var img4 = ImageBigName[3].substring(0, ImageBigName[3].lastIndexOf("."));  
 
	 console.log(this._targetImage.id+" ImageBigName"+img4)
	if(this._targetImage.id == img1){
	setTimeout(function(){ 
	var loadRightImage=fnLoadCYUImage(ImageBigName[0]);
	
	$(".zoom-img").attr("src",loadRightImage);
	}, 100);
	}
	 else if(this._targetImage.id == img2){
	 setTimeout(function(){ 
	var loadRightImage=fnLoadCYUImage(ImageBigName[1]);
	
	$(".zoom-img").attr("src",loadRightImage);
	}, 100);
	}
	 else if(this._targetImage.id == img3){
	 setTimeout(function(){ 
	var loadRightImage=fnLoadCYUImage(ImageBigName[2]);
	
	$(".zoom-img").attr("src",loadRightImage);
	}, 100);
	}
	else if(this._targetImage.id == img4){
	setTimeout(function(){ 
	var loadRightImage=fnLoadCYUImage(ImageBigName[3]);
	
	$(".zoom-img").attr("src",loadRightImage);
	}, 100);
	}
	 
	
	/* var coords = this._targetImage.getBoundingClientRect();
	console.log(coords.left+" asdas") */
	 
  /* var pos = $(".zoom-img").position(); // returns an object with the attribute top and left
pos.bottom;  // top offset position
pos.left; // left offset position
console.log(pos.top+" asd "+pos.left)
 	setTimeout(function(){
  $(".zoom_inst").css("display", "block");
	$(".zoom_inst").html("Click the image to close it.");
	  $(".zoom_inst").css("bottom", pos.bottom);
	//$(".zoom_inst").css("left", this._targetImage.left); 
	 
}, 200);
 */
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
 
 var img1 = ImageBigName[0].substring(0, ImageBigName[0].lastIndexOf("."));
	var img2 = ImageBigName[1].substring(0, ImageBigName[1].lastIndexOf("."));
	var img3 = ImageBigName[2].substring(0, ImageBigName[2].lastIndexOf("."));
	var img4 = ImageBigName[3].substring(0, ImageBigName[3].lastIndexOf("."));
 
 	if(this._targetImage.id == img1){
	var loadRightImage=fnLoadCYUImage(Imagename[0]);
	
	$(".zoom-img").attr("src",loadRightImage);
	}
	 else if(this._targetImage.id == img2){
	var loadRightImage=fnLoadCYUImage(Imagename[1]);
	
	$(".zoom-img").attr("src",loadRightImage);
	}
	 else if(this._targetImage.id == img3){
	var loadRightImage=fnLoadCYUImage(Imagename[2]);
	
	$(".zoom-img").attr("src",loadRightImage);
	} 
	else if(this._targetImage.id == img4){
	var loadRightImage=fnLoadCYUImage(Imagename[3]);
	
	$(".zoom-img").attr("src",loadRightImage);
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
 
      this._targetImageWrap.parentNode.replaceChild(this._targetImage, this._targetImageWrap)
      this._overlay.parentNode.removeChild(this._overlay)
		
		var img1 = ImageBigName[0].substring(0, ImageBigName[0].lastIndexOf("."));
	var img2 = ImageBigName[1].substring(0, ImageBigName[1].lastIndexOf("."));
	var img3 = ImageBigName[2].substring(0, ImageBigName[2].lastIndexOf("."));
	var img4 = ImageBigName[3].substring(0, ImageBigName[3].lastIndexOf("."));
 
 	if(this._targetImage.id == img1){
	var loadRightImage=fnLoadCYUImage(Imagename[0]);
	
	$(".zoom-img").attr("src",loadRightImage);
	}
	 else if(this._targetImage.id == img2){
	var loadRightImage=fnLoadCYUImage(Imagename[1]);
	
	$(".zoom-img").attr("src",loadRightImage);
	}
	 else if(this._targetImage.id == img3){
	var loadRightImage=fnLoadCYUImage(Imagename[2]);
	
	$(".zoom-img").attr("src",loadRightImage);
	}  
	else if(this._targetImage.id == img4){
	var loadRightImage=fnLoadCYUImage(Imagename[3]);
	
	$(".zoom-img").attr("src",loadRightImage);
	}
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

   
    
   

 
