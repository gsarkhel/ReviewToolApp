/**********Variables Declaration************************/
var notesData=[];
var currNotesPage = -1;
var currNotesMod = -1;
var firstNotes=false;
var arr=[];
var tmpNotesData;
var savenot = 0;		
var TxtLength;
var cleartext = false;
 /**********Document Initialization**********************/
$(document).ready(function() {
$(".notes_print_btn").click(function()
	{
		 fnPrintNotes()
	});
	 $(".notes_print_btn").css("cursor", "pointer");
			  $(".notes_print_btn").removeClass("cyudisabled");			 
 	  $(".notes_print_btn").css("pointer-events", "auto");
		  $(".notes_print_btn").css("opacity", "1");
if($(".notes_container").hasClass("mCustomScrollbar")){
		      $(".notes_container").mCustomScrollbar("update");
	    }else{
		     $(".notes_container").mCustomScrollbar({
				scrollButtons:{enable:true},
				theme:"dark-thick",
				mouseWheelPixels: 200
		});
	}
});
 
 
/**********Create Notes Elements**********************/
function fnOpenNotes(aPage)
{
 
	if(currNotesPage==-1)
	{	  
		currNotesPage=currPageNum;
	}
if(notesData=="")
		{
			$(".notesCont").html("");
			$(".notesCont").append("<div class='notes_content'><h3 class=''>"+ModTitles[currModule-1]+" > "+pageTitlesArr[currModule-1][currPageNum-1]+"</h3><h6>"+screenNumberTxt+": "+currPageNum+"/"+pagesArray[currModule-1].length+"</h6><div class='clear'></div><textarea id='textNotes' data-autoresize rows='2'></textarea></div>");
			 
		}else{
		
			$(".notesCont").html("");
			 console.log(notesData.length+" notesData.length")
			for(var i=0;i<notesData.length;i++)
			{
			
				$(".notesCont").append("<div class='notes_content'><h3 class=''>"+ModTitles[notesData[i].modId-1]+" > "+pageTitlesArr[notesData[i].modId-1][notesData[i].PageId-1]+"</h3><h6>"+screenNumberTxt+": "+notesData[i].PageId+"/"+pagesArray[notesData[i].modId-1].length+"</h6><div class='clear'></div><textarea>"+notesData[i].NotesData+"</textarea></div>");					
			}
			
			  $("textarea").prop('disabled', true);
			$("textarea").css('background', '#FFF');
			$("textarea").css('resize', 'none');  
			$(".notesCont").append("<div class='notes_content'><h3 class=''>"+ModTitles[currModule-1]+" > "+pageTitlesArr[currModule-1][currPageNum-1]+"</h3><h6>"+screenNumberTxt+": "+currPageNum+"/"+pagesArray[currModule-1].length+"</h6><div class='clear'></div><textarea id='textNotes' data-autoresize rows='1'></textarea></div>");
		}
	keysetup();	 
}
 function keysetup(){
$('textarea').on('keyup',function(){
 
		$(".save_btn").css("cursor", "pointer")
		   TxtLength = $("#textNotes").val().length;
		    var value = $("#textNotes").val();				
			arr.push(value)
			 tmpNotesData=arr.pop();	
			console.log(arr) 
			
 			 
			 
		 });
		 }
function fnSaveNotesData()
{
				 
	 
	if($("#textNotes").val()!="")
	{
 	notesData.push({"modId": currModule,"PageId": currPageNum,"NotesData": tmpNotesData});
	}else{
		if(currPageNum!=currNotesPage){
		}else{
			 //notesData.pop();
			//console.log(currPageNum+":::::::::::::::"+notesData.length+"::::"+currNotesPage);
		}
	}
	 console.log(tmpNotesData);
 
}
 
 /**********Print Notes Data**********************/
function fnPrintNotes(){
   var currentData = $("#textNotes").val();
   var data = $("#printarea").html();
   var mywindow = window.open('', 'my div', 'height=400px,width=600px');
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write('<link rel="stylesheet" type="text/css" href="framework/css/main.css"/>');  
    mywindow.document.write('<style type="text/css">.test { color:red; } </style></head><body>');
	mywindow.document.write('<div class="printTitle printBxHdr"><h1 class="text-center" style="font-size: 200%; word-wrap: break-word; "><b>'+courseTitle+'</b></h1></div>');
	for(var i=0;i<notesData.length;i++){
		mywindow.document.write('<div class="ntPrntData "><div class="sub_title"><span class="prntTitle" style="font-weight:bold;">'+ModTitles[notesData[i].modId-1]+" > "+pageTitlesArr[notesData[i].modId-1][notesData[i].PageId-1] +':</span><span class="prntTitleNum" style="margin-right:5%;">'+notesData[i].PageId+" of "+pagesArray[notesData[i].modId-1].length+'</span></div><p class="print_notes" style="font-size: 16px; width:85%; overflow-wrap: break-word;">'+notesData[i].NotesData+'</p></div>');
	} 
	mywindow.document.write('<div class="ntPrntData "><div class="sub_title"><span class="prntTitle" style="font-weight:bold;">'+ModTitles[currModule-1]+" > "+pageTitlesArr[currModule-1][currPageNum-1] +':</span><span class="prntTitleNum" style="margin-right:5%; font-size: 16px; word-wrap:break;">'+currPageNum+" of "+pagesArray[currModule-1].length+'</span></div><p class="print_notes" style="font-size: 16px; width:85%; overflow-wrap: break-word;">'+currentData+'</p></div>');
    mywindow.document.write('</body></html>');
	setTimeout(function(){
		mywindow.focus();
		mywindow.window.print();
		mywindow.document.close();
		mywindow.close();
	},2000); 
 
}

function fnLogPrintNotes(){
   var currentData = $("#textNotes").val();
   var data = $("#printarea").html();
   if(mywindow)
   {
		mywindow.document.close();
		mywindow.close();
   }
	var mywindow = window.open('', 'my div', 'height=400px,width=600px');
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write('<link rel="stylesheet" type="text/css" href="framework/css/main.css"/>');  
    mywindow.document.write('<style type="text/css">.test { color:red; } </style></head><body>');
	mywindow.document.write('<div class="printTitle printBxHdr"><h1 class="text-center" style="font-size: 200%; word-wrap: break-word; "><b>'+courseTitle+'</b></h1></div>');
	for(var i=0;i<notesData.length;i++){
		mywindow.document.write('<div class="ntPrntData "><div class="sub_title"><span class="prntTitle" style="font-weight:bold;">'+ModTitles[notesData[i].modId-1]+" > "+pageTitlesArr[notesData[i].modId-1][notesData[i].PageId-1] +':</span><span class="prntTitleNum" style="margin-right:5%;">'+notesData[i].PageId+" of "+pagesArray[currModule-1].length+'</span></div><p class="print_notes" style="font-size: 16px; width:85%; overflow-wrap: break-word;">'+notesData[i].NotesData+'</p></div>');
	} 
    mywindow.document.write('</body></html>');
	setTimeout(function(){
		mywindow.focus();
		mywindow.window.print();
		mywindow.document.close();
		mywindow.close();
	},2000);
}