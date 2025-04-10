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
var mediaType;
var mediaFile;
var watermarkImage;
var imageAvailableFlag;
var quickreftext;
var pdfcont;
var subImage;
/*---------------------Functions---------------------*/
function fnLoadPageExternalData(eData){
	$.each(eData, function(key, value){
		if(key=="audioTransText"){
			audioTranscriptText=value.text
		}else if(key=="mediaFile"){
			mediaSrc=value.name
		}else if(key=="backgroundImage"){
			scrollContentImage=value.name
		}else if(key=="mediaFile"){
			mediaFile=value.name
		}else if(key=="watermarkImage"){
			watermarkImage=value.name
		}else if(key == "pdfContent"){
		   pdfcont = value.text;
		}
		else if(key == "subimg"){
		   subImage = value.name;
		   console.log(subImage)
		}
		else if(key=="quickRefText"){
		    quickreftext = value.text;
		}
		else if(key!="clickAndLearnData"){
			$("."+key).html(value.text);
		}else {
			optData = value.options;
			imageAvailableFlag = value.imageAvailable;
		}
	});
	loadContent();
}
function loadContent() {
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
		var NoOfOptions = Number(optData.length);
		var optionStr = '';
		var ImageFolderName=pagesArray[currModule-1][currPageNum-1].split(".")[0];
		if(imageAvailableFlag!="no") {
		var ImageFolderName=pagesArray[currModule-1][currPageNum-1].split(".")[0];
			for (var i = 1; i <= NoOfOptions; i++) {
				optionStr += '<li class="clkbtn cyu_11_ipad"><img src="../course/content_'+currLang+'/module_'+currModule+'/assets/images/'+ImageFolderName+'/image'+i+'.png" alt="img" class=""><p><span class="imgTxt_'+i+'">'+optData[i-1]+'</span></p></li>';
			}
		} else {
		for (var i = 1; i <= NoOfOptions; i++) {
				optionStr += '<li class="clkbtn cyu_11_ipad btns"><p><span class="imgTxt_'+i+'">'+optData[i-1]+'</span></p></li>';
			}
		}
		$('.click_box').html(optionStr).addClass('click_box_'+NoOfOptions);
		$('.branchImg_box').html('<img src="../course/content_'+currLang+'/module_'+currModule+'/assets/images/'+ImageFolderName+'/'+scrollContentImage+'" alt="img" class="">')
	var pdfCont=fnLoadExternalCont(quickRefCont);
		
		 $("#page").find('.pdfContent a').css("pointer-events", "none");
		$("#page").find('.pdfContent a').attr('href',pdfCont);
	CLCheck();
}
function CLCheck() {
		for(var i=0;i<subPageCompletionArray[currModule-1][currPageNum-1].length;i++)
		{
			if(clkPopArray_1[i]==1)
			{
				$(".clkbtn").eq(i).addClass("visited");
				visitedAudio=true;
				fnScrCompletion();
			}else{
				/* alert("::::");
				$('.clkbtn').addClass("branching_btn_disabled"); */
			}
		}
		if(visitedAudio && backBtnClicked)
		{
			$('.clkbtn').removeClass("branching_btn_disabled"); 
		}else{
			$('.clkbtn').addClass("branching_btn_disabled"); 
		}
		$('.clkbtn').unbind();
		$('.clkbtn').each(function(index) {
				totalPops++;
				$(this).click(function()
				{ 	
				if(subImage.toLowerCase() == "yes")	
				{
				clkPopArray_1[index]=1;
						console.log(index)
				fnLoadSubimg(index);
				}
				else if(!$(this).hasClass("branching_btn_disabled"))
					{
						clkPopArray_1[index]=1;
						console.log(index)
						fnLoadSubPage(index);
					}
					
				});
		});
		$('.pop_close_btn a').click(function() {
			$(".popupscreen").hide();
			$(".scrpopup").hide();
			fnScrCompletion();
		});
	
}
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