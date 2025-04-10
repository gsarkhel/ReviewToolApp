/*----------Variable declartions----------*/
var currOpenElement;
var totalPops=0;
var totQuestCount = 0;
var totQuestCounts = 0;
var totalclicks = 0;
var currentQuest = 0;
var optData;
var optionArr=new Array();
 var headerArr=new Array();
var audioData;
var mediaType;
var mediaFile;
var watermarkImage;
var imageAvailableFlag;
var quickreftext;
var pdfcont;
var video_Player;
var noHeaderArr=new Array();
var noOptionArr=new Array();

var NoOfOptions;
var corrAns;
var optionArr=new Array();
var quesArr=new Array();
var corrAnsArr=new Array();
var corrFeedback=new Array();
var IncorrFeedback=new Array();
var mobileFeedback=new Array();
var FirstIncorrFeedback=new Array();
var LastIncorrFeedback=new Array();
var popupYesNo;
/*---------------------Functions---------------------*/
function fnLoadPageExternalData(eData){
	$.each(eData, function(key, value){
		if(key=="audioTransText"){
			audioTranscriptText=value.text
		}else if(key=="mediaFile"){
			mediaSrc=value.name
		}else if(key=="quickRefContent"){
			quickRefCont=value.name
		}else if(key=="mediaFile"){
			mediaFile=value.name
		}
		else if(key=="backgroundImage"){
			scrollContentImage=value.name
		}
		else if(key=="watermarkImage"){
			watermarkImage=value.name
		} 
		else if(key=="quickRefText"){
		    quickreftext = value.text;
		}
		else if(key=="popup_content"){
		    popupYesNo = value.text;
			 
		}
		else if(key=="Answers"){
		var qusData = value;
		optionArr[totQuestCount]=qusData;
		
		totQuestCount++;
 		} 
		else if(key == "Headers"){
		var qusDatas = value;
		headerArr[totQuestCounts]=qusDatas;
		
		totQuestCounts++;
		}
		 
	});
	loadQuestion();
}
function loadQuestion() { 	 
	 
 	 NoOfOptions = optionArr[currentQuest].length;
	/*  noOptionArr = optionArr[currentQuest];
	 noHeaderArr = headerArr[currentQuest]; */
	// console.log(noOptionArr)
	//console.log(NoOfOptions)
   	var optionStr = '';
 			 for (var i = 1; i <= NoOfOptions; i++) {
				optionStr +='<span id="spot_' + i + '" class="hotspot_btn"></span>';
 			}  
		 
		var ImageFolderName=pagesArray[currModule-1][currPageNum-1].split(".")[0];		 
 		$('.leftside_ele').html('<img src="../course/content_'+currLang+'/module_'+currModule+'/assets/images/'+ImageFolderName+'/'+scrollContentImage+'" alt="img" class="">');	 
	 
	 $('.leftside_ele img').after(optionStr);
	$(".leftside_ele").css("pointer-events", "none");
	
	 
 
	 
 for(var i=0;i<subPageCompletionArray[currModule-1][currPageNum-1].length;i++)
		{
			if(clkPopArray_1[i]==1)
			{
				$(".hotspot_btn").eq(i).addClass("visited");
				visitedAudio=true;
				 fnScrCompletion();
			}else{
				/* alert("::::");
				$('.clkbtn').addClass("branching_btn_disabled"); */
			}
		}
		$(".rightside_ele_popup").hide();
		 noOptionArr = optionArr[currentQuest];
		 console.log(noOptionArr)
		$('.hotspot_btn').unbind();
		$('.hotspot_btn').each(function(index) {
				totalPops++;
				$(this).click(function()
				{
				if(popupYesNo.toLowerCase() == "yes")	
				{
				$(".rightside_ele_popup").show();
   			$(".rightside_ele_popup .cont_msg").html(noOptionArr[index])
 				}
				else {
					
				if(!$(this).hasClass("branching_btn_disabled"))
									{
										clkPopArray_1[index]=1;
										console.log(index)
										fnLoadSubPage(index);
									}
									var vidElement= document.getElementById("vidPlayer");
									vidElement.addEventListener('ended', function(e) {
									 $('.scrollContent').hide();
									$('.scorllContainer').hide();
									$('#vidPlayer').css('opacity','1');						 
														
													}, false);
				}									
									
				});
		}); 
}
 


 	 var completionCnt=0;
function fnScrCompletion(){
	completionCnt=0;
	for(var i=0;i<clkPopArray_1.length;i++)
	{
		if(clkPopArray_1[i]==1)
		{
		 $(".leftside_ele").css("pointer-events", "auto");
			completionCnt++;
		}
	}
	if(completionCnt==totalPops)
	{
		fnMenuCompletionPage(currPageNum);
	}
}