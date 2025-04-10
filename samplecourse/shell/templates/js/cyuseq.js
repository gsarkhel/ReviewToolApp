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
	
	var tWidth=$('.wrapper_header').width();
	tHgt=Number(tWidth*6/27);
	
	 
	 
	 
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
	 $(".inner_height").css("height", tHgt);
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
  $(".inner_height").css("height", "575px")
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
var quesImage=new Array();
var quesType=new Array();
var quesArr=new Array();
var InstructionArr= new Array();
var optionArr=new Array();
var noOptionArr=new Array();
var corrAnsArr=new Array();
var corrFeedback=new Array();
var mobileFeedback=new Array();
var IncorrFeedback=new Array();
var FirstIncorrFeedback=new Array();
var LastIncorrFeedback=new Array();
var noOfTries=3;
var countTries=0;
var currDivisio=0;
var userAns=new Array();
var tryAgainTxt="";
var SolnTxt="";
var tll;
var remedPage=new Array();
var ansArray=[];
var userArray=[];
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
					quesType[totQuestCount]=qusData.qusType;
					quesArr[totQuestCount]=qusData.question;
					InstructionArr[totQuestCount]=qusData.instruction;
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
}
var qusansArray=[];
var noOfAttempts=3;
function loadQuestion() {
	if(remedPageRevisit)
	{
		noOfTries=1;
		remedPageRevisit=false;
		$(".remediationBtn").hide();
	}
	var quesTxt = quesArr[currentQuest];
	var insTxt = InstructionArr[currentQuest];
	var questionType= quesType[currentQuest];
	var NoOfOptions = Number(optionArr[currentQuest].length);
	noOptionArr[currentQuest]=NoOfOptions;
	ansArray=corrAnsArr[currentQuest].split(",");
	corrAns=corrAnsArr[currentQuest];
	var optionStr = '';
	
	if(questionType=="Sequence"){
		for (var i = 1; i <= NoOfOptions; i++) {
			optionStr +="<li id='item"+i+"'>"+optionArr[currentQuest][i-1]+"</li>";		
			userArray[i-1]=0;			
		}
	}
	$('.question').html(quesTxt);
	$('.instruction').html(insTxt);
	$('.sequence').html(optionStr);
	 $("#sortable").sortable({
        axis: 'y',
		containment: '.cyu_container',
		animation: 200,
        change: function(event, ui) {
        },
        update: function(event, ui) {
		   var updateIndex=ui.item.index();
		   qusansArray.push(updateIndex);
		   nextEnable();
		   $('.submitTxt').removeClass('cyudisabled');
        },stop: function(e, ui) {
            console.log($.map($(this).find('li'), function(el) {
				var tmpNum=Number(el.id.split("item")[1])-1;
				userArray[$(el).index()]=tmpNum;
                return el.id + ' = ' + $(el).index()+":::::::aa::::"+userArray+":::"+tmpNum;
            }));
        }
    });
	
	 $( "#sortable" ).disableSelection();
 
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
     loadQuestion();
     nextDisable();      
}
function fnSubmitClick(){
	countTries++;
	validation();
}
function validation() {
	//	console.log(ansArray.length+":::::"+userArray.length)
		var is_same = userArray.length == ansArray.length && userArray.every(function(element, index) {
			return element == ansArray[index]; 
		});
		$(".popupcyuscreen").show();
		if(is_same)
		{			
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
			//$(".feedback_text p").html(corrFeedback[currentQuest]);
			$(".Rmdn_btn").addClass("cyudisabled");
			$('.Rst_btn').unbind( "click", fnResetClick );
			$(".Rst_btn").addClass("cyudisabled");
			$('.Rmdn_btn').unbind( "click", fnRemedtnClick );
			//$(".cyu_effect1").unbind("click");
			$( "#sortable" ).unbind();
			$( "#sortable li").css("cursor","default");
			nextDisable();
		}else {
			if(countTries==noOfTries){

				$('.Next_Button').unbind( "click", fnSubmitClick );
             	$(".Rmdn_btn").addClass("cyudisabled");
				$(".Rst_btn").addClass("cyudisabled");
               	$(".Rmdn_btn").bind( "click", fnRemedtnClick );
				$(".Next_Button").removeClass("cyudisabled");				
				$(".feedback_text p").html(LastIncorrFeedback[currentQuest]);
                //$(".cyu_effect1").unbind("click");
				fnSolutionClick();
				
			}else if(countTries==(noOfTries-1)){

				$('.Next_Button').unbind( "click", fnSubmitClick );
				$('.Rst_btn').unbind( "click", fnResetClick );
             	$(".Rmdn_btn").removeClass("cyudisabled");
                $(".Rmdn_btn").bind( "click", fnRemedtnClick );
				$(".Next_Button").addClass("cyudisabled");
				$(".Rst_btn").addClass("cyudisabled");
				$(".feedback_text p").html(FirstIncorrFeedback[currentQuest]);
               // $(".cyu_effect1").unbind("click");
			   fnResetClick();
			   $( "#sortable" ).unbind();
			   $( "#sortable li").css("cursor","default");
			}else{

				$(".feedback_text p").html(IncorrFeedback[currentQuest]);		
				$('.Next_Button').unbind( "click", fnSubmitClick);	
				$('.Rst_btn').unbind( "click", fnResetClick );
				$(".Next_Button").removeClass("cyudisabled");						
				//$(".cyu_effect1").unbind("click");
                fnResetClick();
			}
		}
			/* alert(userArray);
			alert(typeof(userArray[0])+":::"+typeof(ansArray[0]));
			alert(is_same); */ 
	 

}
function fnRemedtnClick(){ 
	remePage=remedPage[currentQuest].split(",");
	remedCyuPage=currPageNum;
	fnDisableRemediationBtns(remePage[0]);
}
function fnSolutionClick(){
	var optionStr = '';
	fnResetClick();
	var correctAns=corrAns.split(",");
	for(var j=0;j<correctAns.length;j++){
	var x =correctAns[j];			
		optionStr +="<li id='item"+j+"'>"+optionArr[currentQuest][x]+"</li>";	
	}
	$('.sequence').html(optionStr);	
    //$( "#sortable" ).sortable('disable');
	$( "#sortable" ).unbind();
	//$(".cyu_effect1").unbind("click");
	$( "#sortable li").css("cursor","default");
	$(".Rst_btn").addClass("cyudisabled");
	$('.Rst_btn').unbind( "click", fnResetClick );
	//fnMenuCompletionPage(currPageNum);
	cyuComplete=true;
	$(".Rmdn_btn").unbind();
}