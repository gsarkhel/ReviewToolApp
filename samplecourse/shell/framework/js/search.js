/**********Variables Declaration************************/
var searchDataArr=[];
var searchPageTitleArr=[];
var searchDataArrIndex=[];
var searchExtData;
/*****************Loading Search Data*******************/
function fnSearchData()
{
	$(".popupSearch .srch_list").html("");
	$("#glsinput").val('');
	ModTitles.forEach(function(item,ind) {
		searchDataArrIndex[ind]=[];
		searchPageTitleArr[ind]=[];
		searchDataArr[ind]=[];
		$.each(pagesArray[ind], function(index) {
			searchExtData="";
			var jsonPath='../course/content_'+currLang+'/module_'+(ind+1)+'/data/'+pagesArray[ind][index].split(".html").join(".js");
			if (jsonPath == "") {
				//searchExtData = true;
			} else {
				$.getJSON(jsonPath, function() {
				}).done(function(json) {
					searchExtData = json.ExternalData[0];	
					if(pageTypeArray[ind][index]=="cyu" || pageTypeArray[ind][index]=="cyumcq")
					{
					}else{
						$.each(searchExtData, function(key, value) {
							if(key=="audioTransText")
							{ 
								searchDataArrIndex[ind].push(index);
								searchPageTitleArr[ind].push(pageTitlesArr[ind][index]);
								searchDataArr[ind].push(value.text);
							}
						});
					}
				}).fail(function() {
					console.log("Data Not Loaded");
				})
			} 
		});
	});
	$(".pop_search_options").find("input").keyup(function() {
		fnSearchPage($(this).val());
	});
	$(".pop_search_options .ui-input-clear").click(function() {
		$(".noSrchdata").hide();
		$(".popupSearch .srch_list").html("");
		$(".search_list").css("overflow","hidden");
		$(".search_list").mCustomScrollbar("destroy");
	});
}
/*****************Search Pages*******************/
var searchPgNums=[];
function fnSearchPage(str){
	str=$.trim(str).toLowerCase();
	if(str.length>0)
	{
		searchPgNums=[];
		var tmpstr;
		searchDataArrIndex.forEach(function(item,ind) {
			searchPgNums[ind]=[];
			if (searchDataArrIndex[ind].length) {
				for (var j=0; j<searchPageTitleArr[ind].length; j++) {
					tmpstr=searchPageTitleArr[ind][j].toLowerCase();
					if (tmpstr.match(str)){
						searchPgNums[ind].push(searchDataArrIndex[ind][j]);
					}			
				}
			}
		});
		
		/* var tmpstr1;
		searchDataArrIndex.forEach(function(item,ind) {
			if (searchDataArrIndex[ind].length) {
				for (var j=0; j<searchPageTitleArr[ind].length; j++) {
					tmpstr1=searchDataArr[ind][j].toLowerCase();
					if (tmpstr1.match(str)){
						searchPgNums[ind].push(searchDataArrIndex[ind][j]);
					}			
				}
			}
		}); */
		
		searchDataArrIndex.forEach(function(item,ind) {
			searchPgNums[ind]=uniqueArr(searchPgNums[ind].sort())
		});
		$(".popupSearch .srch_list").html("");
		var searchTitleCnt=0;
		searchPgNums.forEach(function(item,ind) {
			if(searchPgNums[ind].length>=1){
				searchTitleCnt++;
				for(var i=0;i<searchPgNums[ind].length;i++)
				{
					$(".popupSearch .srch_list").append('<li style="width:auto !important;" navFile="'+(ind+1)+'_'+(searchPgNums[ind][i]+1)+'" id="srch_'+(searchPgNums[ind][i]+1)+'"><h6 style="width:auto !important;" class="wow zoomInDown" data-wow-duration="1s">'+ModTitles[ind]+" > "+pageTitlesArr[ind][searchPgNums[ind][i]]+'</h6><div class="clear"></div></li>');
				}	
				if(!device.MobileDevice()){
					$(".search_list").css("height","295px"); 
					$(".search_list").css("max-height","295px");					
				}
				else{
					$(".search_list").css("height","395px"); 
					$(".search_list").css("max-height","395px"); 
				}	
				$(".search_list").mCustomScrollbar({
					scrollButtons: {
						enable: true,
					},
					theme:"dark-thick",
					mouseWheelPixels: 200,
					advanced: {
						updateOnContentResize: true,
						updateOnBrowserResize: true
					}
				});	
		
				/* $(".search_list").css("overflow","auto");
				 $(".search_list").css("max-height","290px"); 
				$(".search_list").mCustomScrollbar({
					scrollButtons:{enable:true},
					theme:"dark-thick",
					mouseWheelPixels: 200
				});  
				if($(".search_list").hasClass("mCustomScrollbar")){
					$(".search_list").mCustomScrollbar("update");
				}else{
					$(".search_list").mCustomScrollbar({
						scrollButtons:{enable:true},
						theme:"dark-thick",
						mouseWheelPixels: 200
					});
				} */
				$(".noSrchdata").hide();
			}else{
				if(searchTitleCnt==0)
				{
					$(".noSrchdata").show();
				}
			}
		});
		$(".popupSearch .srch_list li").each(function(index)
		{
			$(this).click(function()
			{
				var tmpModuleNum=$(this).attr("navFile").split("_")[0];
				var tmpFileNum=$(this).attr("navFile").split("_")[1];
				if(currModule==tmpModuleNum)
				{
					fnLoadPage(tmpFileNum);
					$(".popupSearch").hide();
				}else{
					currModule=tmpModuleNum;
					fnLoadPage(tmpFileNum);
					fnLoadModulePrintData(); 	
					fnCreateLeftMenu(index);	
					$(".popupSearch").hide();
				}
			});
		});
	}else{
		$(".popupSearch .srch_list").html("");
		$(".search_list").css("overflow","hidden");
		$(".search_list").mCustomScrollbar("destroy");
	}
}
/********************************************************/