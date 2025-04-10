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
var optionCountArr=new Array();
var TextNameArr=new Array();
var ImageNamesArr=new Array();
var noOptionArr=new Array();
var corrAnsArr=new Array();
var corrFeedback=new Array();
var mobileFeedback=new Array();
var IncorrFeedback=new Array();
var FirstIncorrFeedback=new Array();
var LastIncorrFeedback=new Array();
var remedPage=new Array();
var corrAns = new Array();
var optionPosition="right";
var selectOptTxt=new Array();
var sleftHeading = new Array();
var srightHeading = new Array();
function fnLoadPageExternalData(eData){
	 $.each(eData, function(key, value) {
			if(key != "questionsData"){
				$("."+key).html(value.text);
			}else{
				var qusData = value;
				quesImage[totQuestCount]=qusData.qusImage;
				quesImageName[totQuestCount]=qusData.qusImageName;
				quesType[totQuestCount]=qusData.qusType;
				optionPosition=qusData.optionPos;
				selectOptTxt[totQuestCount]=qusData.selectOptTxt;
				quesArr[totQuestCount]=qusData.question;
				optionArr[totQuestCount]=qusData.options;
				optionCountArr[totQuestCount]=qusData.dropdown;
				TextNameArr[totQuestCount]=qusData.lefttext;
				corrAnsArr[totQuestCount]=qusData.correctAnswer;
				mobileFeedback[totQuestCount]=qusData.mobileFeedback;
				corrFeedback[totQuestCount]=qusData.correctFeedback;
				IncorrFeedback[totQuestCount]=qusData.InCorrectFeedback;
				FirstIncorrFeedback[totQuestCount]=qusData.FirstInCorrectFeedback;
				LastIncorrFeedback[totQuestCount]=qusData.LastInCorrectFeedback;
				remedPage[totQuestCount]=qusData.remediationPage;
				sleftHeading[totQuestCount]=qusData.leftHeading;
				srightHeading[totQuestCount]=qusData.rightHeading;
				//alert(qusData.leftHeading+" ::: "+qusData.rightHeading)
				totQuestCount++;
			}
	}); 
	// $(".inner_height").css("overflow-y","auto");
	fnLoadQuestion();
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
		if(cyuComplete)
		{
			fnMenuCompletionPage(currPageNum);
			cyuComplete=false;
		}
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
	var sleftHeadText = sleftHeading[currentQuest];
	var srightHeadText = srightHeading[currentQuest];
 	selecteditems=Number(optionCountArr[currentQuest].length);
	noOptionArr[currentQuest]=NoOfOptions;
	corrAns=corrAnsArr[currentQuest];
	cAns=corrAnsArr[currentQuest].split(",");
	//alert(sleftHeadText+" ::: "+srightHeadText)
	$('.question').html(quesTxt);
	if(!device.MobileDevice())
	{
		$(".phone_drop_down").hide();
		TextNameArr.forEach(function(item,ind) {
			for(var i=0;i<TextNameArr[ind].length;i++)
			{
				$(".draggableAreaMobile").append('<div class="each_txt_styles"><div class="leftContent leftipad slct_img_ul_text_lt"><ul class="slct_img_ul_text"><li class="ques_'+(i+1)+'">'+TextNameArr[currentQuest][i]+'</li></ul></div><div class="mobileDragAndDrop selctImageText slct_img_ul_text_right_drop"><div class="tableQusHolder"><div class="tableQusHolderRow">	<div class="tableNumberDnD shell_bg_teal"></div></div></div><div class="selectBoxDnD shell_bg_orange" id="dropdown_'+(i+1)+'"><span class="dropArrow"></span><div class="slct_arw"></div><ul><li class="elips Solid-BG drdn_border">'+selectOptTxt[currentQuest]+'<em></em> </li><ul class="sub_slct"></ul></ul></div></div><div class="clear"></div>')
			}		
		});
	 
		for(var j=0;j<optionArr[currentQuest].length;j++)
		{
		//alert(optionCountArr[currentQuest].length)
			$(".sub_slct").append('<li class="sel opt'+(j+1)+' Solid-BG drdn_border" id="option_'+(j+1)+'"> <span class="rdio_chk select_'+(j+1)+'">'+optionArr[currentQuest][j]+'</span></li>');
			
		}
		$(".slct_img_ul_text li").each(function(){
			if($(this).height()>20)
			{
				$(this).css("padding-top","0px");
			}else{
				$(this).css("padding-top","9px");
			}
		});
		if(optionPosition=="left"){
			$(".slct_img_ul_text_lt").css("float","right");
		}else{
			$(".slct_img_ul_text_lt").css("float","left");
		}
		if(srightHeadText != undefined && sleftHeadText != undefined) {
			$('.each_txt_styles:first').before("<div class='srightHeadText'><span>"+srightHeadText+"</span></div><div class='sleftHeadText'><span>"+sleftHeadText+"</span></div>");
		}
		//$('.rightContent:first').before("<h1>"+sleftHeadText+"</h1>");
	}
	else{
	   $('.ipad_drop_down').hide();
	   TextNameArr.forEach(function(item,ind) {
			for(var i=0;i<TextNameArr[ind].length;i++)
			{
				$("#draggableAreaPhone").append('<li class="ques_'+(i+1)+' dropTextQstn">'+TextNameArr[currentQuest][i]+'</li>');
				$("#draggableAreaPhone").append('<div class="each_txt_styles"><div class="leftContent leftipad slct_img_ul_text_lt"><ul class="slct_img_ul_text"><li class="ques_'+(i+1)+'">'+TextNameArr[currentQuest][i]+'</li></ul></div><div class="mobileDragAndDrop selctImageText slct_img_ul_text_right_drop"><div class="tableQusHolder"><div class="tableQusHolderRow">	<div class="tableNumberDnD shell_bg_teal"></div></div></div><div class="selectBoxDnD selectBoxtext shell_bg_orange" id="dropdown_'+(i+1)+'"><span class="dropArrow"></span><div class="slct_arw"></div><ul><li class="elips Solid-BG drdn_border">'+selectOptTxt[currentQuest]+'<em></em> </li><ul class="sub_slct"></ul></ul></div></div><div class="clear"></div>')
			}		
		});
		for(var j=0;j<optionArr[currentQuest].length;j++)
		{
			$(".sub_slct").append('<li class="sel opt'+(j+1)+' Solid-BG drdn_border" id="option_'+(j+1)+'"> <span class="rdio_chk select_'+(j+1)+'">'+optionArr[currentQuest][j]+'</span></li>');
		}
	}
	
		   if(device.iPad()){
		   if(window.innerHeight > window.innerWidth){
		   if(TextNameArr[currentQuest].length > 12){
 		 $(".ipad_drop_down").css("overflow","auto");
 		 $(".sub_slct").css("position","relative");
 		 $(".sub_slct").css("top","0px");
		 $(".ipad_drop_down").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		}); 
		 }
		 else {
   $(".ipad_drop_down").css("overflow","");
   $(".sub_slct").css("position","absolute");
  $(".ipad_drop_down").mCustomScrollbar('destroy');
 }
		 }
		 else if(window.innerWidth > window.innerHeight){
		 if(TextNameArr[currentQuest].length > 5){
 		 $(".ipad_drop_down").css("overflow","auto");
 		 $(".sub_slct").css("position","relative");
 		 $(".sub_slct").css("top","0px");
		 $(".ipad_drop_down").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		}); 
		 }
		 else {
  $(".ipad_drop_down").css("overflow","");
  $(".sub_slct").css("position","absolute");
  $(".ipad_drop_down").mCustomScrollbar('destroy');
 }
		 }
		 }
		   else {
					 
		 if(window.innerWidth >= 2560 && window.innerHeight <=1353){
	if(TextNameArr[currentQuest].length > 13){
  $(".ipad_drop_down").css("overflow-y","auto");
  $(".sub_slct").css("position","relative");
 		 $(".sub_slct").css("top","0px");
		 $(".ipad_drop_down").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
  }
  else {
  $(".ipad_drop_down").css("overflow-y","");
  $(".ipad_drop_down").mCustomScrollbar('destroy');
  }
	}
 
	else if(window.innerWidth >= 1707 && window.innerHeight <=873){
	//alert("11")
			if(TextNameArr[currentQuest].length > 5){
  $(".ipad_drop_down").css("overflow-y","auto");
  $(".sub_slct").css("position","relative");
 		 $(".sub_slct").css("top","0px");
		 $(".ipad_drop_down").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
  
  }
  else {
  $(".ipad_drop_down").css("overflow-y","");
  $(".ipad_drop_down").mCustomScrollbar('destroy');
  }
	}
	
	else  if(window.innerWidth >= 1905 && window.innerHeight <=985){ 
	//alert("1")
		if(TextNameArr[currentQuest].length > 8){

  $(".ipad_drop_down").css("overflow-y","auto");
 $(".sub_slct").css("position","relative");
 		 $(".sub_slct").css("top","0px");
		 $(".ipad_drop_down").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
  
  }
  else {
  $(".ipad_drop_down").css("overflow-y","");
  $(".ipad_drop_down").mCustomScrollbar('destroy');
  }
  
  } 
  
  
    else if(window.innerWidth >= 1590 && window.innerHeight <=830){
	//alert("33")
if(TextNameArr[currentQuest].length > 7){
  $(".ipad_drop_down").css("overflow-y","auto");
  $(".sub_slct").css("position","relative");
 		 $(".sub_slct").css("top","0px");
		 $(".ipad_drop_down").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
  }
  else {
  $(".ipad_drop_down").css("overflow-y","");
  $(".ipad_drop_down").mCustomScrollbar('destroy');
  }
}   
else if(window.innerWidth >= 1366 && window.innerHeight <=673){
//alert("2")
	if(TextNameArr[currentQuest].length > 7){
  $(".ipad_drop_down").css("overflow-y","auto");
  $(".sub_slct").css("position","relative");
 		 $(".sub_slct").css("top","0px");
		 $(".ipad_drop_down").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
  }
  else {
  $(".ipad_drop_down").css("overflow-y","");
  $(".ipad_drop_down").mCustomScrollbar('destroy');
  }
	} 
   else if(window.innerWidth >= 1250 && window.innerHeight <=950){ 
		 //alert("3")
 /*if(TextNameArr[currentQuest].length > 5){
  $(".ipad_drop_down").css("overflow-y","auto");
  $(".sub_slct").css("position","relative");
 		 $(".sub_slct").css("top","0px");
		 $(".ipad_drop_down").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		});
  }
  else {
  $(".ipad_drop_down").css("overflow-y","");
  $(".ipad_drop_down").mCustomScrollbar('destroy');
  }*/
  $(".ipad_drop_down").css("overflow-y","");
  $(".ipad_drop_down").mCustomScrollbar('destroy');
  }
  
		}  
	$(document).ready(function() {
    $(window).bind('orientationchange', function(event) {
   if(event.orientation == "portrait"){
   if(TextNameArr[currentQuest].length > 12){
 		 $(".ipad_drop_down").css("overflow","auto");
 		 $(".sub_slct").css("position","relative");
 		 $(".sub_slct").css("top","0px");
		 $(".ipad_drop_down").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		}); 
		 }
		 else {
   $(".ipad_drop_down").css("overflow","");
   $(".sub_slct").css("position","absolute");
  $(".ipad_drop_down").mCustomScrollbar('destroy');;
 }
 }
 else if(event.orientation == "landscape"){
 if(TextNameArr[currentQuest].length > 5){
 		 $(".ipad_drop_down").css("overflow","auto");
 		 $(".sub_slct").css("position","relative");
 		 $(".sub_slct").css("top","0px");
		 $(".ipad_drop_down").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 150
		}); 
		 }
		 else {
   $(".ipad_drop_down").css("overflow","");
    $(".sub_slct").css("position","absolute");
  $(".ipad_drop_down").mCustomScrollbar('destroy');;
 }
 
 }
   
});
});	    
 		 
		  
				 
}
function fnRemedtnClick(){ 
	remePage=remedPage[currentQuest].split(",");
	remedCyuPage=currPageNum;
	fnDisableRemediationBtns(remePage[0]);
}
function fnSolutionClick() {
	solClicked=true;
    matchCorrectAns_1();
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
 		/*  var str = corrFeedback[currentQuest];
			var res = str.replace(" and click Next ", " ")		 */	 
			$(".popupcyuscreen .pop_description").html(mobileFeedback[currentQuest]);	
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
