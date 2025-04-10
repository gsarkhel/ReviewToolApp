$(document).ready(function() {
	$(".cyuPopClsBtn").click(function()
	{
		if(cyuComplete)
		{
			fnMenuCompletionPage(currPageNum);
			cyuComplete=false;
		}
		$(".popupcyuscreen").hide();
	});
	  if(window.innerWidth >= 2544 && window.innerHeight <=1440){
	 $(".cyu_left_ipad").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
  $(".cyu_left_ipad").css("overflow-y","auto");
	 $(".mCustomScrollbar").css("height", "650px")
	
	}
	if(window.innerWidth >= 1716 && window.innerHeight <=915){
	 $(".cyu_left_ipad").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
  $(".cyu_left_ipad").css("overflow-y","auto");
	 $(".mCustomScrollbar").css("height", "426px");
	 
		if (GetIEVersion() > 0) {
   $(".cyu_left_ipad").css("overflow-y","auto");
	 $(".mCustomScrollbar").css("height", "406px");
 }
    
		
		 
	}
	if(window.innerWidth >= 1584 && window.innerHeight <=939){
	  $(".cyu_left_ipad").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
  $(".cyu_left_ipad").css("overflow-y","auto");
	 $(".mCustomScrollbar").css("height", "395px")
	 
 }
	if(window.innerWidth >= 1224 && window.innerHeight <=1024){
	  $(".cyu_left_ipad").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
  $(".cyu_left_ipad").css("overflow-y","auto");
	 $(".mCustomScrollbar").css("height", "313px")
 } 
 	 if(window.innerWidth >= 1900 && window.innerHeight <=1095){
	  $(".cyu_left_ipad").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
  $(".cyu_left_ipad").css("overflow-y","auto");
	 $(".mCustomScrollbar").css("height", "496px")
 }  
});
/*---------------Variable declartions---------*/
var score=0;
var corrAns;
var userSelection;
var totQuestCount = 0;
var currentQuest = 0;
var quesImageLabel=new Array();
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
var ImageBigName;
var Imagename;
var ImageNamesArr=new Array();
var ImageBigNamesArr=new Array();
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
					//console.log(qusData);
					quesType[totQuestCount]=qusData.qusType;
					quesArr[totQuestCount]=qusData.question;
					quesImageLabel[totQuestCount]=qusData.qusImageLabel;
					ImageNamesArr[totQuestCount]=qusData.ImageNames;
					ImageBigNamesArr[totQuestCount]=qusData.ImageBigNames;
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
    if(remedPageRevisit)
	{
		noOfTries=1;
		remedPageRevisit=false;
		$(".remediationBtn").hide();
	}
	var quesTxt = quesArr[currentQuest];	
	var questionType= quesType[currentQuest];
	var questionImageLabel = quesImageLabel[currentQuest];
	var NoOfOptions = Number(optionArr[currentQuest].length);
	noOptionArr[currentQuest]=NoOfOptions;
	corrAns=corrAnsArr[currentQuest];
	ImageBigName = ImageBigNamesArr[currentQuest];
	Imagename = ImageNamesArr[currentQuest];
	console.log(ImageBigName+" "+Imagename)
	var optionStr = '';
	var ImageFolderName=pagesArray[currModule-1][currPageNum-1].split(".")[0];
	var totHeight=$('.bgwhite_bdrblue').height();
	var optnImgHeight=totHeight*(59/100);
	//alert(optnImgHeight)
	console.log("::::questionImageLabel:"+questionImageLabel);
	//style="height:'+optnImgHeight+'px;"
	/* if(questionType=="MCSS"){
		for (var i = 1; i <= NoOfOptions; i++) {
			optionStr +='<li id="optbox_' + i + '" class="cyu_effect1 options_4" ><label><input type="checkbox" value="" name=""> </label></li>';
			//<p class="">' + optionArr[currentQuest][i-1] + '</p>
		}
	}else{
		for (var i = 1; i <= NoOfOptions; i++) {	
			optionStr +='<li id="optbox_' + i + '" class="cyu_effect1 options_4" ><label><input type="checkbox" value="" name=""> </label></li>';
			//<p class="">' + optionArr[currentQuest][i-1] + '</p>

			userAns[i] =0;
		}
	} */
	if(questionType=="MCSS"){
		for (var i = 1; i <= NoOfOptions; i++) {
			optionStr +='<li class=" options_4" ><img id="image_'+i+'" src="../course/content_'+currLang+'/module_'+currModule+'/assets/images/'+ImageFolderName+'/image'+i+'.png" data-action="zoom" alt="img" class=""><label style="position:relative;bottom:-27px;"><input id="optbox_' + i + '" class="cyu_effect1 options_4" type="radio" name="radioName"> </label><div class="cyu_image_cont"><div>' + optionArr[currentQuest][i-1] + '</div></div></li>';
			//<p class="">' + optionArr[currentQuest][i-1] + '</p>
		}
	}else{
		for (var i = 1; i <= NoOfOptions; i++) {	
			optionStr +='<li class=" options_4" ><img id="image_'+i+'" src="../course/content_'+currLang+'/module_'+currModule+'/assets/images/'+ImageFolderName+'/image'+i+'.png" data-action="zoom" alt="img" class=""></li><li id="optbox_' + i + '" class="cyu_effect1 options_4" ><label style="position:relative;bottom:-27px;"><input type="checkbox" name="radioName"> </label><div class="cyu_image_cont"><div>' + optionArr[currentQuest][i-1] + '</div></div></li>';
			//<p class="">' + optionArr[currentQuest][i-1] + '</p>

			 userAns[i] =0;  
		}
	}
	 
	 
	
	$('.question').html(quesTxt);
	$('.options').html(optionStr);
	if(questionImageLabel.toLowerCase()=="no"){
		$('.options').addClass(questionImageLabel+"_ImageLabel");
		$('.cyu_image_cont').css("display","none");
	}else{
		setTimeout(function()
		{
			$('.cyu_image_cont').show();
			$(".cyu_effect1").css("height","inherit");
		},250); 
	}
	//$('.question_icon').html(currentQuest);
	KCCheck(NoOfOptions);
	
	/* 	 if(device.iPad()){
		 $(".inner_height").css("overflow","auto");
		 $(".inner_height").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		}); 
		 } */
}
var clickCount=0;
function KCCheck(noOfOpt) {
	$(".cyu_effect1").unbind("");	
	$(".cyu_effect1").bind("click", function() {
		no = $(this).attr("id").split("_")[1];
		if(quesType[currentQuest]=="MCSS"){
			 for (var i = 1; i <= noOfOpt; i++) {
				/* $("#box_" + i).removeClass("activeChkBtn"); */
				/* $("#optbox_" + i).removeAttr("checked"); */
				//$("#imgbox_" + i +" .ans_hover").hide();
			 }
			userSelection = no;
			/* $("#box_" + no).addClass("activeChkBtn"); */
			/* $("#imgbox_" + no +" .ans_hover").show(); */
			$("#optbox_" + no).prop("checked",true);
			nextEnable();
		}else{
			if(userAns[no] == no){
				userAns[no] = 0;
				clickCount--;
				/* $("#box_" + no).removeClass("activeChkBtn"); */
				$("#optbox_" + no).prop("checked",false);
				
				if(clickCount<=0){
					nextDisable();	
				}				
			}else if(userAns[no] ==0){
			    clickCount++;
				/* $("#box_" + no).addClass("activeChkBtn"); */
				$("#optbox_" + no).prop("checked",true);
				userAns[no] = no;	
				nextEnable();
			}
		}
	});
	if(device.MobileDevice()){
	 $(".options_4 img").removeAttr("data-action");
	 }
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
	//alert("::")
	$(".cyu_effect1").removeAttr("disabled");
	for(var k=1;k<=noOptionArr[currentQuest];k++){
	   if(quesType[currentQuest]=="MCSS"){
			/* $("#box_" + k).removeClass("activeChkBtn"); */
			$("#optbox_" + k).prop("checked",false);
			nextDisable();
		}
		else{
			/*  $("#box_" + k).removeClass("activeChkBtn"); */
			 $("#optbox_" + k).prop("checked",false);
				 nextDisable();
				 userAns[k]=0;	
		}
	}
}
function fnSubmitClick(){
	/* $(".cyu_effect1").attr("disabled", "disabled"); */
	countTries++;
	validation();
}
function validation() {
	for(var k=1;k<=noOptionArr[currentQuest];k++){
		$("#option_" + k).css("cursor","default");
		//console.log(":a::"+$("#option_" + k).attr("class"));
	}
	if(quesType[currentQuest]=="MCSS"){
	//-------------------------------------Radio(MCSS)-------------------------
		userAns[currentQuest]=userSelection;
		nextDisable();
		$(".cyu_effect1").eq(userSelection-1).removeClass("deActiveStage");
		$(".popupcyuscreen").show();
		/* $(".popupcyuscreen").modal('open'); */
		if (userSelection == corrAns) {
				//fnMenuCompletionPage(currPageNum);
				cyuComplete=true;
				$(".cyu_effect1").attr("disabled", "disabled");
				if(device.iOS() || device.Android()){
 		/*  var str = corrFeedback[currentQuest];
			var res = str.replace(" and click Next ", " ")		 */	 
			 $(".feedback_text p").html(mobileFeedback[currentQuest]);	
			}
			else {
			 $("#optbox_" + corrAns).removeAttr("disabled");
			
			$(".feedback_text p").html(corrFeedback[currentQuest]);	
			}
				//$(".feedback_text p").html(corrFeedback[currentQuest]);
				$(".Rmdn_btn").addClass("cyudisabled");
				$('.Rst_btn').unbind( "click", fnResetClick );
				$('.Rmdn_btn').unbind( "click", fnRemedtnClick );
				/* for (var i = 1; i <= noOptionArr[currentQuest]; i++) {
					$(".optbox_"+i).attr("disabled", "disabled");
				} */
				console.log("userSelection :: "+userSelection)
				$(".ans_hover").hide();
				$(".blcktick").hide();
				/* $("#optbox_"+userSelection+" .ans_hover").show(); */
				$(".cyu_effect1").css("cursor","default");
				
				
		}else{
			if(countTries==noOfTries){		
				// alert('::3rd wrong');
				$('.Next_Button').unbind( "click", fnSubmitClick );
				$('.Rst_btn').unbind( "click", fnResetClick );
             	$(".Rmdn_btn").addClass("cyudisabled");
				$(".Rst_btn").addClass("cyudisabled");
               	$(".Rmdn_btn").unbind( "click", fnRemedtnClick );
				//$('.Next_Button').html(SolnTxt);
				$(".Next_Button").removeClass("cyudisabled");
				//$('.Next_Button').bind( "click", fnSolutionClick );
				$(".feedback_text p").html(LastIncorrFeedback[currentQuest]);
                $(".cyu_effect1").unbind("click");
				$(".ans_hover").hide();
				$(".blcktick").hide();
				fnSolutionClick()
				
			}else  if(countTries==(noOfTries-1)){
               // alert('::2 nd wrong');	
			   $(".cyu_effect1").attr("disabled", "disabled");
				$('.Next_Button').unbind( "click", fnSubmitClick );
				$('.Rst_btn').unbind( "click", fnResetClick );
             	$(".Rmdn_btn").removeClass("cyudisabled");
               	$(".Rmdn_btn").bind( "click", fnRemedtnClick );
				$(".feedback_text p").html(FirstIncorrFeedback[currentQuest]);
				 fnTryagainClick();	
                $(".cyu_effect1").unbind("click");
				$(".cyu_effect1").css("cursor","default");
				$(".ans_hover").hide();
				$(".blcktick").hide();
					
			}
			else{	
                //alert('::1st wrong');			
				$(".feedback_text p").html(IncorrFeedback[currentQuest]);		
				$('.Next_Button').unbind( "click", fnSubmitClick);
				//$('.Next_Button').html(tryAgainTxt);	
				$(".Next_Button").removeClass("cyudisabled");
				//$('.Next_Button').bind( "click", fnTryagainClick);	
				$(".cyu_effect1").unbind("click");
				//fnResetClick();
				//$(".ans_hover").hide();
			    fnTryagainClick();	
			}
		}
	}else{ 
	//-------------------------------------checkbox(MCMS)-------------------------
        $(".popupcyuscreen").show();
        /* $(".popupcyuscreen").modal('open'); */
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
			 for (var i = 1; i <= noOptionArr[currentQuest]; i++) {
				$(".optbox_"+i).css("disabled","disabled");
				
				//console.log(":::"+$("#option_" + k).attr("class"));
			 }
			// alert(":::");
			$(".ans_hover").hide();
			$(".blcktick").hide();
			//$("#optbox_"+userSelection+" .ans_hover").show();
			$(".cyu_effect1").css("cursor","default");
		
		}else{
			if(noOfTries==countTries){
			    //alert('::3rd wrong');
			    $('.Next_Button').unbind( "click", fnSubmitClick );
				$(".Rmdn_btn").addClass("cyudisabled");
				$(".Rmdn_btn").unbind( "click", fnRemedtnClick );
				//$(".Next_Button").html(SolnTxt);
				$(".Next_Button").removeClass("cyudisabled");
				//$('.Next_Button').bind( "click", fnSolutionClick);
				$(".Rst_btn").addClass("cyudisabled");
                $('.Rst_btn').unbind( "click", fnResetClick );
				$(".feedback_text p").html(LastIncorrFeedback[currentQuest]);
				$(".cyu_effect1").unbind("click");
				fnSolutionClick()
				$(".ans_hover").hide();
				$(".blcktick").hide();
				$(".checked .ans_hover").show();

			 }
			 else  if(countTries==(noOfTries-1)){	
                //alert('::2 nd wrong');			 
				$('.Next_Button').unbind( "click", fnSubmitClick );
             	$(".Rmdn_btn").removeClass("cyudisabled");
               	$(".Rmdn_btn").bind( "click", fnRemedtnClick );
				$('.Rst_btn').unbind( "click", fnResetClick );
				$(".Next_Button").addClass("cyudisabled");
				$(".Rst_btn").addClass("cyudisabled");
				$(".feedback_text p").html(FirstIncorrFeedback[currentQuest]);
				$(".cyu_effect1").unbind("click");
				$(".cyu_effect1").css("cursor","default");
				$(".ans_hover").hide();
				$(".blcktick").removeClass('activeChkBtn').hide();
			}
			 else{	
			    //alert('::1st wrong');
			    $(".feedback_text p").html(IncorrFeedback[currentQuest]);
	   			//$('.Next_Button').html(tryAgainTxt);	
                $(".Rst_btn").addClass("cyudisabled");
                $('.Rst_btn').unbind( "click", fnResetClick );	
	   			$('.Next_Button').unbind( "click", fnSubmitClick );
		    	//$('.Next_Button').bind( "click", fnTryagainClick);		
				$(".feedback_text p").html(IncorrFeedback[currentQuest]);	
				$(".cyu_effect1").unbind("click");
				//fnResetClick();
				fnTryagainClick();				

			 }
 	    }
	}
}
function fnTryagainClick()
{
	 //$(".cyu_effect1").removeAttr("disabled");
	//$('.Next_Button').text("Submit");
	//$(".popupcyuscreen").hide();
	for(var k=1;k<=noOptionArr[currentQuest];k++){
		if(quesType[currentQuest]=="MCSS"){
			$("#box_" + k).removeClass("activeChkBtn");
			$("#optbox_" + k).prop("checked",false);
		}else{
			$("#box_" + k).removeClass("activeChkBtn");
			$("#optbox_" + k).prop("checked",false);
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
	 $(".cyu_effect1").attr("disabled", "disabled"); 
	$(".cyu_effect1").css("cursor","default");
   if(quesType[currentQuest]=="MCSS"){
	/* 	$("#box_" + userSelection).removeClass("activeChkBtn");
		$("#box_" + corrAns).addClass("activeChkBtn");
		$("#box_" + userSelection).removeClass("activeChkBtn"); */
		/* $("#optbox_" + userSelection).removeAttr("checked"); */
        $("#optbox_" + corrAns).prop("checked",true);	
		 $("#optbox_" + corrAns).removeAttr("disabled");	
       /*   $("#optbox_" + userSelection).attr("disabled", "disabled"); */
		/* $("#imgbox_" + corrAns +" .ans_hover").show(); */
		$(".cyu_effect1").eq(corrAns-1).removeClass("deActiveStage");	
	}else{
		var correctAns=corrAns.split(",");
		for(var j=0;j<correctAns.length;j++){
			/*  $("#box_" + correctAns[j]).addClass("activeChkBtn"); */
             $("#optbox_" + correctAns[j]).prop("checked",true);		 
		}
	}
   for (var i = 1; i <= noOptionArr[currentQuest]; i++) {	   
		$(".cyu_effect1").unbind("click");
	}
	
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
	var img1 = ImageBigName[0].substring(0, ImageBigName[0].lastIndexOf("."));
	var img2 = ImageBigName[1].substring(0, ImageBigName[1].lastIndexOf("."));
	var img3 = ImageBigName[2].substring(0, ImageBigName[2].lastIndexOf("."));
	  var img4 = ImageBigName[3].substring(0, ImageBigName[3].lastIndexOf("."));  
 
	 console.log(this._targetImage.id+" ImageBigName"+img4)
	if(this._targetImage.id == img1){
	var loadRightImage=fnLoadCYUImage(ImageBigName[0]);
	
	$(".zoom-img").attr("src",loadRightImage);
	}
	 else if(this._targetImage.id == img2){
	var loadRightImage=fnLoadCYUImage(ImageBigName[1]);
	
	$(".zoom-img").attr("src",loadRightImage);
	}
	 else if(this._targetImage.id == img3){
	var loadRightImage=fnLoadCYUImage(ImageBigName[2]);
	
	$(".zoom-img").attr("src",loadRightImage);
	}
	else if(this._targetImage.id == img4){
	var loadRightImage=fnLoadCYUImage(ImageBigName[3]);
	
	$(".zoom-img").attr("src",loadRightImage);
	}
	 
	 
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