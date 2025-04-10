/*----------Variable declartions----------*/
var currOpenElement;
var totalPops=0;
var totQuestCount = 0;
var totQuestCounts = 0;
var totalclicks = 0;
var totQuestCos = 0;
var currentQuest = 0;
var optData;
var optionArr=new Array();
var imaageArr=new Array();
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
var noimageArr=new Array();
var NoOfOptions;
var corrAns;
var imageviewable;
var rightsideimage;
var quesArr=new Array();
var corrAnsArr=new Array();
var corrFeedback=new Array();
var IncorrFeedback=new Array();
var mobileFeedback=new Array();
var FirstIncorrFeedback=new Array();
var LastIncorrFeedback=new Array();
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
		else if(key=="imageView"){
		    imageviewable = value.text;
			 
		}
		else if(key=="rightsideImageview"){
		var qusData = value;
		imaageArr[totQuestCos]=qusData;
		//console.log(imaageArr+" imaageArr")
		 totQuestCos++;
 		}
		else if(key=="quickRefText"){
		    quickreftext = value.text;
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
	 $(".txtVar_1").html(audioTranscriptText);
 	 NoOfOptions = optionArr[currentQuest].length;
	 noOptionArr = optionArr[currentQuest];
	  noimageArr = imaageArr[currentQuest];
	 noHeaderArr = headerArr[currentQuest];
	 console.log(noimageArr)
   	var optionStr = '';
 			 for (var i = 0; i <= NoOfOptions; i++) {
				optionStr +='<span id="spot_' + i + '" class="hotspot_btn"></span><img src="" id="indicator_' + i + '" class="indicator_btn" />';
 			}  
		 
		var ImageFolderName=pagesArray[currModule-1][currPageNum-1].split(".")[0];		 
 		$('.leftside_ele').html('<img src="../course/content_'+currLang+'/module_'+currModule+'/assets/images/'+ImageFolderName+'/'+scrollContentImage+'" alt="img" class="">');	 
	 
	 $('.leftside_ele img').after(optionStr);
	$(".rightside_ele .bodycontain").css("height", "198px")
	 $(".rightside_ele .rightsideImageview").hide();
	$(".hotspot_btn").click(function(){
	 var ind = $(this).attr('id').substr(5,5);
	
	if(imageviewable.toLowerCase() == "type1")	
				{
				$(".rightside_ele .rightsideImageview").show();
			 var sub = $(this).attr('id').substr(5,5);
			   
			$(".rightside_ele .header").html(noHeaderArr[sub])
			$(".rightside_ele .bodycontain").html(noOptionArr[sub])
			 $(".rightside_ele .rightsideImageview").html('<img src="../course/content_'+currLang+'/module_'+currModule+'/assets/images/'+ImageFolderName+'/'+noimageArr[sub]+'" alt="img" class=""/>')  
			 $(".rightside_ele .bodycontain").css("height", "auto")
			 $(".leftside_ele").addClass("ipadadjustLeftside")
			 $(".rightside_ele").addClass("ipadadjustrightside")
	 
 				}
				else if(imageviewable.toLowerCase() == "type2")	
				{
				$(".rightside_ele .rightsideImageview").hide();
				var sub = $(this).attr('id').substr(5,5);
				$(".rightside_ele .header").html(noHeaderArr[sub])
				$(".rightside_ele .bodycontain").html(noOptionArr[sub])
				$(".rightside_ele .bodycontain").css("height", "238px")
	 
				}
				else if(imageviewable.toLowerCase() == "type3")	
				{
				
				$(".rightside_ele .rightsideImageview").hide();
				var sub = $(this).attr('id').substr(5,5);
				 audioPlayer.setSrc("../course/content_"+currLang+"/module_"+currModule+"/assets/audios/"+ImageFolderName+"/"+sub+".mp3");
				 audioPlayer.setVolume(Lastvolume);
				 audioPlayer.play();
				 $("#spot_"+sub).css("border", "1px solid red")
				if(sub <= 3){
				$("#indicator_"+sub).css("opacity","1");
				$("#indicator_"+sub).attr("src","../course/content_"+currLang+"/module_"+currModule+"/assets/images/"+ImageFolderName+"/green.png");
				}
				if(sub >= 4 && sub <=5){
				$("#indicator_"+sub).css("opacity","1");
				$("#indicator_"+sub).attr("src","../course/content_"+currLang+"/module_"+currModule+"/assets/images/"+ImageFolderName+"/yellow.png");
				}
				if(sub ==6){
				$("#indicator_"+sub).css("opacity","1");
				$("#indicator_"+sub).attr("src","../course/content_"+currLang+"/module_"+currModule+"/assets/images/"+ImageFolderName+"/green.png");
				}
				if(sub >=7 && sub <=11){
				$("#indicator_"+sub).css("opacity","1");
				$("#indicator_"+sub).attr("src","../course/content_"+currLang+"/module_"+currModule+"/assets/images/"+ImageFolderName+"/red.png");
				}
				if(sub ==12){
				$("#indicator_"+sub).css("opacity","1");
				$("#indicator_"+sub).attr("src","../course/content_"+currLang+"/module_"+currModule+"/assets/images/"+ImageFolderName+"/yellow.png");
				}
				$(".rightside_ele .header").html(noHeaderArr[sub])
				$(".rightside_ele .bodycontain").html(noOptionArr[sub])
				$(".rightside_ele .bodycontain").css("height", "238px")
	 
				}
	 
	
	})
}
 