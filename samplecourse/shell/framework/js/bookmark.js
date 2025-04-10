/**********Variables Declaration************************/
var bkmkCount = 0;
/**********Document Initialization**********************/
$(document).ready(function(){
	$(".bkmrk_list").html("");
	$("#bkmrk_btn").css("cursor","pointer");
	$("#bkmrk_btn").click(function(){
		if(!$(this).hasClass("cyudisabled"))
		{
			bookmarkpagesArray[currModule-1].push(currPageNum-1);
			bookmarkpagesArray[currModule-1]=uniqueArr(bookmarkpagesArray[currModule-1]);
			fnGenerateBookmark();
		}
	});
});
/**********Create Bookmark Elements and bind click functions**********************/
function fnGenerateBookmark()
{	
		bkmkCount = 0;
		$(".bkmrk_list").html("");
		ModTitles.forEach(function(item,ind) {
				if(bookmarkpagesArray[ind].length>=1){
					bookmarkpagesArray[ind].forEach(function(cont,i) {
						bkmkCount++;
						if(!device.MobileDevice())
						{
							$(".bkmrk_list").append("<li remInd="+i+" navFile='"+(ind+1)+"_"+(bookmarkpagesArray[ind][i]+1)+"' class='bookmrk'><h6 class='bookmark_content'>"+item+" > "+pageTitlesArr[ind][bookmarkpagesArray[ind][i]]+"</h6><div class='bkcls_btn pop_radius_btn_bkmrk'>"+removebtnTxt+"</div><div class='clear'></div></li>");
						}else{
							$(".bkmrk_list").append("<li remInd="+i+" navFile='"+(ind+1)+"_"+(bookmarkpagesArray[ind][i]+1)+"' class='bookmrk'><h6 class='bookmark_content'>"+item+" > "+pageTitlesArr[ind][bookmarkpagesArray[ind][i]]+"</h6><div class='bkcls_btn pop_radius_btn_bkmrk'>x</div><div class='clear'></div></li>");
						} 
					});
				}
		});
		/* $(".bk_list").css("overflow","auto");
		$(".bk_list").css("max-height","290px");
		$(".bk_list").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 200
		});  */
		if(bkmkCount >= 4 ){
		if($(".bk_list").hasClass("mCustomScrollbar")){
			$(".bk_list").mCustomScrollbar("update");
		}else{
		$(".bk_list").css("overflow","auto");
		$(".bk_list").css("max-height","290px");
			$(".bk_list").mCustomScrollbar({
				scrollButtons:{enable:true},
				theme:"dark-thick",
				mouseWheelPixels: 200
			});
		 } 
		}
		$(".bkcls_btn").each(function(index)
		{
			$(this).click(function(){
				var tmpModuleNum=$(this).parent().attr("navFile").split("_")[0];
				var tmpFileNum=$(this).parent().attr("remInd");
				removedata((tmpModuleNum-1),tmpFileNum);
 			/*   if(bkmkCount <= 9){
				$('#bkmrk_btn').removeClass('cyudisabled');	  
		    $('#bkmrk_btn').css("cursor","pointer");
				}  */ 
			});
		 
		});
	   /*  if(bkmkCount>9){
		    $('#bkmrk_btn').addClass('cyudisabled');	  
		    $('#bkmrk_btn').css("cursor","default");
		} */
		 
		$(".bookmark_content").each(function(index)
		{
			$(this).click(function(){
				$('.common_popup').hide();
				var tmpModuleNum=$(this).parent().attr("navFile").split("_")[0];
				var tmpFileNum=$(this).parent().attr("navFile").split("_")[1];
				if(currModule==tmpModuleNum)
				{
					fnLoadPage(tmpFileNum);
				}else{
					currModule=tmpModuleNum;
					fnLoadPage(tmpFileNum);
					fnLoadModulePrintData(); 	
					fnCreateLeftMenu(index);	
				}
			});
		});
		bkLMSArray=[];
		ModTitles.forEach(function(item,ind) {
			if(bookmarkpagesArray[ind].length>=1){
				bookmarkpagesArray[ind].forEach(function(cont,index) {
					var tempval=ind+"_"+cont;
					bkLMSArray.push(tempval);
				});
			}else{
				bkLMSArray.push("");
			}
		});
		if(window.opener!=null){
			//window.opener.fnCompletionArr(pageCompletionArray[currModule-1]);
			window.opener.bkModule=currModule;
			window.opener.bkPage=currPageNum;
			window.opener.bkdatastring=pageCompletionArray;
			window.opener.bkBookmarkpages=bkLMSArray;
			window.opener.fnUpdateSuspendData();
		}
}
/**********Remove Bookmark Elements**********************/
function removedata(aMod,aFile){
	bookmarkpagesArray[aMod].splice(aFile, 1);
	fnGenerateBookmark();
}
/********************************************************/
