/************************ Variables Decalration ************************/
var ExternalPageJsonData;
var titleName1;
var titlePageNum;
var audioTrsTxtArr1 = new Array();
var titleNameArr1= new Array();
var pageNumPrnt= new Array();
var titlePageNumArr= new Array();
var printOpenModule=false;
var audioTrsTxtArrNew = [];
var audioSubTrsTxtArrNew = [];
/************************ Print Div Element************************/
function printDiv() 
{
	$("#printFrame").print({
		globalStyles : false,
		mediaPrint : true,
		stylesheet : "framework/css/main.css",
		iframe : false,
		noPrintSelector : ".avoid-this",
		prepend : "",
		append : "",
		deferred: $.Deferred().done(function() { console.log('Printing done', arguments); })
	});
}
/************************ Print Current Screen**********************/
function fnPrintCurrentScrn(){
    var CurrentScrnAudioTxt = ExternalPageData.audioTransText.text;
	var mywindow = window.open('', 'my_div', 'height=400px,width=700px');
	mywindow.document.write('<html><head><title>'+courseTitle+'</title>');
	mywindow.document.write('<link rel="stylesheet" type="text/css" href="framework/css/main.css"/>');  
	mywindow.document.write('<style type="text/css">.test { color:red; } </style></head><body>');
	mywindow.document.write('<div class="title printBxHdr"><h1 class="text-center" style="font-size: 200%;">'+courseTitle+'</h1><h3 class="text-center"><span style="font-size: 150%; border-bottom: thin solid black;">'+ModTitles[currModule-1]+'</span></h3></div>');
	mywindow.document.write('<div class="ntPrntData "><div class="sub_title curntScrn_Prnt" style="margin-bottom: 10px;"><span class="prntTitle"  style="font-size: 150%; border-bottom: thin solid black;">'+pageTitlesArr[currModule-1][currPageNum-1] +'</span><span class="prntTitleNum">'+currPageNum+" of "+pagesArray[currModule-1].length+'</span></div></div>');
	var video  = document.getElementById("vidPlayer");
	if(video!= null){
		var canvas = document.createElement('canvas');      
		var ratio = 300 / video.videoHeight;
			canvas.width  = ratio * video.videoWidth;
			canvas.height = 300;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight,  0, 0, canvas.width, canvas.height);
			var ScreenShotImg = canvas.toDataURL();
	mywindow.document.write('<img class="printScrnImg" src="'+ScreenShotImg+'"/>');	
	mywindow.document.write('<div class="ntPrntData Prnt_data"><p class="print_crntScrn">'+CurrentScrnAudioTxt+'</p></div>');
    mywindow.document.write('</body></html>');
    setTimeout(function(){
			mywindow.focus();
			mywindow.window.print();
			mywindow.document.close();
			mywindow.close();
			},2000); 
    } 		
    else{
	    html2canvas($(".container"), {  
		  onrendered: function(canvas)  
		   {
			var img = canvas.toDataURL("image/png");
			mywindow.document.write('<img class="printScrnImg_1" src="'+img+'"/>');
			mywindow.document.write('<div class="ntPrntData Prnt_data"><p class="print_crntScrn">'+CurrentScrnAudioTxt+'</p></div>');
            mywindow.document.write('</body></html>');
            setTimeout(function(){
				mywindow.focus();
				mywindow.window.print();
				mywindow.document.close();
				mywindow.close();
				},2000); 
		   }
	    });		
	}
}
/************************ Load Print Transcript Data**********************/
var ExternalPagePrintData;
function fnLoadModuleTranText(dataPath,i,j){
	if (dataPath == "") {
		//ExternalDataLoad = true;
	} else {
		$.getJSON(dataPath, function() {
		}).done(function(json) {
			ExternalPagePrintData = json.ExternalData[0];							
			$.each(ExternalPagePrintData, function(key, value) {
				$("." + key).html(value.text);
				if(key=="audioTransText"){				
					audioTranscriptText=value.text;					
					if(j == "none"){						
						audioTrsTxtArrNew[i-1] = audioTranscriptText;	
					}
					else{
						audioSubTrsTxtArrNew[i-1].push(audioTranscriptText);						
					}						
				}
			});	
		}).fail(function() {
			console.log("Print Module Data Not Loaded");
		})
	}
}
/************************ Load Module Level Print Data**********************/
function fnLoadModulePrintData(){
	for(var i=1;i<=totalPages[currModule-1];i++){		
		if(courseType=="course"){
			var dataPath='../course/content_'+currLang+'/module_'+currModule+'/data/'+pagesArray[currModule-1][i-1].split(".html").join(".js");
		}else{
			var dataPath='../course/content_'+currLang+'/asmnt/data/'+pagesArray[i-1].split(".html").join(".js");
		}
		fnLoadModuleTranText(dataPath,i,"none");		
		audioSubTrsTxtArrNew[i-1] = new Array();	
		if(subPageTitlesArr[currModule-1][i-1]!= undefined){
			if(subPageTitlesArr[currModule-1][i-1].length > 0){		
				for(var j=1;j<=subPageTitlesArr[currModule-1][i-1].length;j++){
					if(courseType=="course"){
						var dataPath='../course/content_'+currLang+'/module_'+currModule+'/data/'+subPagesArray[currModule-1][i-1][j-1].split(".html").join(".js");
					}else{
						var dataPath='../course/content_'+currLang+'/asmnt/data/'+subPagesArray[i-1][j-1].split(".html").join(".js");
					}
					fnLoadModuleTranText(dataPath,i,j);				
				}
			}			
		}
	}
}
/************************ Print Current Module****************************/
function fnPrintCurrentModule(){
	titleNameArr1=[];			
	printOpenModule=true;
    var mywindow = window.open('', 'my div', 'height=400px,width=600px');
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write('<link rel="stylesheet" type="text/css" href="framework/css/main.css"/>');  
    mywindow.document.write('<style type="text/css">.test { color:red; } </style></head><body>');
	mywindow.document.write('<div class="title printBxHdr"><h1 class="text-center">'+courseTitle+'</h1><h3 class="text-center">'+ModTitles[currModule-1]+'</h3></div>');
	for(var k=0;k<totalPages[currModule-1];k++){	
		if(pageGroupArray[currModule-1][k]!="cyu"){	     
			 titleName1 = pageTitlesArr[currModule-1][k];			
			 titlePageNum= pagesArray[currModule-1][k].split(".html").join("");			
			 var subPageText = "";
			 for(var i=0;i<subPageTitlesArr[currModule-1][k].length;i++){
				var subTitleName1 = subPageTitlesArr[currModule-1][k][i];
				subPageText += '</br><p class="audio_transcript_prnt"><b>'+subTitleName1+'</b> '+audioSubTrsTxtArrNew[k][i]+'</p>';
			 }			  
			 mywindow.document.write('<div class="ntPrntData "><div class=""><p style="font-size:14px;text-transform: capitalize;font-weight:bold;">Screen '+(k+1)+':</p><span class="prntTitle Prnt_CurrentMod">'+titleName1+':'+'</span></div><p class="print_notes">'+audioTrsTxtArrNew[k]+subPageText+'</p></div>');
		 } 	
	}
	mywindow.document.write('</body></html>');
	setTimeout(function(){
		printOpenModule=false;
		mywindow.focus();
		mywindow.window.print();
		mywindow.document.close();
		mywindow.close();
	},100); 
}
/***********************************************************************/