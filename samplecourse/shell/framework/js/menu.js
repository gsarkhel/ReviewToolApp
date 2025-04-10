/**********Module Level Menu - Function************************/
function fnCreateLeftMenu(aNum)
{
	$('.menu_items_div li').remove();
	$(courseXml).find("module").eq(aNum).find("page").each(function(index){
		if(index<9)
		{
			var displayNum="0"+(index+1);
		}else{
			var displayNum=(index+1);
		}
		if(index==0)
		{
			if(pageTypeArray[aNum][index]=="2d_ani" || pageTypeArray[aNum][index]=="steplist" || pageTypeArray[aNum][index]=="int_pop" || pageTypeArray[aNum][index]=="clk_qk" ||  pageTypeArray[aNum][index]=="chart_clk" || pageTypeArray[aNum][index]=="clk_rvl" || pageTypeArray[aNum][index]=="clk_spot")
			{
				if(pageCompletionArray[currModule-1][index]==1){
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='menuactive menuvisited video_bg'>"+displayNum+". "+pageTitlesArr[aNum][index]+" </li>");
				}else{
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='menuactive video_bg'>"+displayNum+". "+pageTitlesArr[aNum][index]+" </li>");
				}
			}else if(pageTypeArray[aNum][index]=="obj"){
				if(pageCompletionArray[currModule-1][index]==1){
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='menuactive menuvisited obj'>"+displayNum+". "+pageTitlesArr[aNum][index]+" </li>");
				}else{
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='menuactive obj'>"+displayNum+". "+pageTitlesArr[aNum][index]+" </li>");
				}
			}else if(pageTypeArray[aNum][index]=="txtImg"){
				if(pageCompletionArray[currModule-1][index]==1){
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='menuactive menuvisited sum_obj'>"+displayNum+". "+pageTitlesArr[aNum][index]+" </li>");
				}else{
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='menuactive sum_obj'>"+displayNum+". "+pageTitlesArr[aNum][index]+" </li>");
				}
			}else if(pageGroupArray[aNum][index]=="cyu"){
				if(pageCompletionArray[currModule-1][index]==1){
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='menuactive menuvisited cyu_bg'>"+displayNum+". "+pageTitlesArr[aNum][index]+" </li>");
				}else{
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='menuactive cyu_bg'>"+displayNum+". "+pageTitlesArr[aNum][index]+" </li>");
				}
			}
		}else{
			if(pageTypeArray[aNum][index]=="2d_ani" || pageTypeArray[aNum][index]=="steplist" || pageTypeArray[aNum][index]=="int_pop" || pageTypeArray[aNum][index]=="clk_qk"|| pageTypeArray[aNum][index]=="chart_clk" || pageTypeArray[aNum][index]=="clk_rvl" || pageTypeArray[aNum][index]=="clk_spot")
			{
				if(pageCompletionArray[currModule-1][index]==1){
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='video_bg menuvisited'>"+displayNum+". "+pageTitlesArr[aNum][index]+" </li>");
				}else{
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='video_bg'>"+displayNum+". "+pageTitlesArr[aNum][index]+" </li>");
				}
			}else if(pageTypeArray[aNum][index]=="obj"){
				if(pageCompletionArray[currModule-1][index]==1){
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='obj menuvisited'>"+displayNum+". "+pageTitlesArr[aNum][index]+" </li>");
				}else{
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='obj'>"+displayNum+". "+pageTitlesArr[aNum][index]+" </li>");
				}
			}else if(pageTypeArray[aNum][index]=="txtImg"){
				if(pageCompletionArray[currModule-1][index]==1){
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='sum_obj menuvisited'>"+displayNum+". "+pageTitlesArr[aNum][index]+" </li>");
				}else{
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='sum_obj'>"+displayNum+". "+pageTitlesArr[aNum][index]+" </li>");
				}
			}else if(pageGroupArray[aNum][index]=="cyu"){
				if(pageCompletionArray[currModule-1][index]==1){
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='cyu_bg menuvisited'>"+displayNum+". "+pageTitlesArr[aNum][index]+"</li>");
				}else{
					$(".menu_items_div").append("<li pageid='pg_"+(index+1)+"' class='cyu_bg'>"+displayNum+". "+pageTitlesArr[aNum][index]+"</li>");
				}
			}
		}
	});	
	var tWidth=$('.header_new').width();
	var tHgtMenu =Number(tWidth*8/16)+10;
	$(".menu_items").css('height', tHgtMenu);
	if($(".menu_items").hasClass("mCustomScrollbar")){
		$(".menu_items").mCustomScrollbar("update");
	}else{
		$(".menu_items").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick",
			mouseWheelPixels: 200
		}); 
	}
	fnLoadPageMenu();
}
/**********Clickable function - Module Menu List************************/
var menuBtnClick=false;
function fnLoadPageMenu()
{
	$(".menu_items li").each(function(index){
		$(this).click(function()
		{  
			
			clkPopArray_1=[0,0,0,0,0,0];
			currPageNum=Number(index)+1;
			menuBtnClick=true;
			$(".preloader, .preloaderBg").show();
			$(".playButton").click();
			fnShowCurrentPage(currPageNum);
			fnLoadPage(currPageNum);
			fnMenuCompletionPage(currPageNum);
			$(".main_menu_open, .main_menu_arw").hide();
		});
	});
}
/**********Page and SubPage completion - Information************************/
function fnMenuCompletionPage(aNum)
{
	$(".menu_items li").eq(aNum-1).addClass("menuvisited");
	if(!menuBtnClick)
	{
		if(!RemediationPage)
		{
			if(device.MobileDevice()){
				$('.clickNxtInfo').hide();
			}else{
			
				if(currPageNum==totalPages[currModule-1]){
					if(totalPages[currModule]!=0)
					{
					if(currModule == totalModules){
					 $('.clickNxtInfo').hide();
					}
					else{
						$('.clickNxtInfo').show();
						$('.clickNxtInfo').animate({'opacity': '1'}, 1000);
						setTimeout(function(){
						   $('.clickNxtInfo').animate({'opacity': '0'}, 1000);
						   $('.clickNxtInfo').hide();
						}, 4000);
					}
					}
				}else{
					if(pageType!="subPage" && currPageNum!=totalPages[currModule-1]){
						$('.clickNxtInfo').show();
						$('.clickNxtInfo').animate({'opacity': '1'}, 1000);
						setTimeout(function(){
						   $('.clickNxtInfo').animate({'opacity': '0'}, 1000);
						   $('.clickNxtInfo').hide();
						}, 4000);
					}
				}
			}
		}
		if(RemediationPage)
		{
 		if(remePage.length == remedIndex+1){
					 $('.clickNxtInfo').hide();
					}
					else{
						$('.clickNxtInfo').show();
						$('.clickNxtInfo').animate({'opacity': '1'}, 1000);
						setTimeout(function(){
						   $('.clickNxtInfo').animate({'opacity': '0'}, 1000);
						   $('.clickNxtInfo').hide();
						}, 4000);
					}
		}else{
			if(pageType!="subPage"){
				fnEnableDisableBtn(aNum);
				fnPageCompletion(aNum);
			}
		}
	}else{
		menuBtnClick=false;
	}
}
/**********Page and SubPage completion - Menu************************/
function fnPageCompletion(aNum)
{
	pageCompletionArray[currModule-1][aNum-1] = 1;
	if(window.opener!=null){
		window.opener.fnCompletionArr(pageCompletionArray[currModule-1]);
		window.opener.bkModule=currModule;
		window.opener.bkPage=currPageNum;
		window.opener.bkdatastring=pageCompletionArray;
		window.opener.bkBookmarkpages=bkLMSArray;
		window.opener.fnUpdateSuspendData();
	}
}
function fnSubPageCompletion(aPage,aSubPage){
	subPageCompletionArray[currModule-1][aPage-1][aSubPage]=1;	
}
/**********Highlight current page - Module Menu************************/
function fnShowCurrentPage(aNum)
{
	$(".menu_items li").removeClass("menuactive");
	$(".menu_items li").eq(aNum-1).addClass("menuactive");
}
/**********Course Level Menu - Function************************/
function fnShowModuleMenu(){
	if(totalModules==1)
	{
		$(".NoOfModules").html(totalModules+" "+coverflowmodule);
	}else{
		$(".NoOfModules").html(totalModules+" "+coverflowmodules);
	}
	$('#leftMenuBtn').addClass('disabled');	
	if(totalModules <= 3) {
		$('#rightMenuBtn').addClass('disabled');	
	}
	/* if(window.opener!=null && window.opener.developerMode=="true") {
		$('body').addClass('developerMode');
		$('.gloss_clkbtn, .lAids_clkbtn, .printCourse_clkbtn').hide();
		$('.gloss_modclkbtn, .fBk_clkbtn, .print_clkbtn, .search_clkbtn, #revTool').hide();		
	} */
	if(window.opener!=null){
		if(window.opener.suspenddata == ""){			
			$(".wrapper_header, .contentAreaFrame, .clickNxtInfo").hide();
			$(".modulepopupLogout").show();	
			var tmpToolVal=(($(window).width()-$(".module_index_header").width())/2)-100;
			if(!device.MobileDevice())
			{
				$(".course_plus").css({"left":$(".module_index_header").width()+tmpToolVal,"z-index": "9999","position" : "absolute","top":($(".module_index_header").height()/2)-($(".course_plus").height()/2)});
				$(".sub_menu_arw_open_plus").css({"left":($(".module_index_header").width()+tmpToolVal)+4,"z-index": "9999","position" : "absolute","top":($(".module_index_header").height()-6)});
				$(".course_logout_clkbtn_1").css("top",($(".module_index_header").height()/2)-($(".course_plus").height()/2)-3);
				$(".course_logout_clkbtn_1").css("padding","");
			}
			$(".sub_menu_arw_open_plus").hide();
			$(".course_plus").show();
		}
		else{
			if(bookmarkVisit){
				$(".wrapper_header, .contentAreaFrame, .clickNxtInfo").show();
				$(".modulepopupLogout").hide();	
				if(!device.MobileDevice())
				{
					var tmpToolVal=(($(window).width()-$(".module_index_header").width())/2)-100;
					$(".course_plus").css({"left":$(".module_index_header").width()+tmpToolVal,"z-index": "9999","position" : "absolute","top":($(".module_index_header").height()/2)-($(".course_plus").height()/2)});
					$(".sub_menu_arw_open_plus").css({"left":($(".module_index_header").width()+tmpToolVal)+4,"z-index": "9999","position" : "absolute","top":($(".module_index_header").height()-6)});
					$(".course_logout_clkbtn_1").css("top",($(".module_index_header").height()/2)-($(".course_plus").height()/2)-3);
					$(".course_logout_clkbtn_1").css("padding","");
				}
				$(".sub_menu_arw_open_plus").hide();
				$(".course_plus").hide();
			}else{
				$(".wrapper_header, .contentAreaFrame, .clickNxtInfo").hide();
				$(".modulepopupLogout").show();	
				if(!device.MobileDevice())
				{
					var tmpToolVal=(($(window).width()-$(".module_index_header").width())/2)-100;
					$(".course_plus").css({"left":$(".module_index_header").width()+tmpToolVal,"z-index": "9999","position" : "absolute","top":($(".module_index_header").height()/2)-($(".course_plus").height()/2)});
					$(".sub_menu_arw_open_plus").css({"left":($(".module_index_header").width()+tmpToolVal)+4,"z-index": "9999","position" : "absolute","top":($(".module_index_header").height()-6)});
					$(".course_logout_clkbtn_1").css("top",($(".module_index_header").height()/2)-($(".course_plus").height()/2)-3);
					$(".course_logout_clkbtn_1").css("padding","");
				}
				$(".sub_menu_arw_open_plus").hide();
				$(".course_plus").show();
			}
			
		}
	}else{
		$(".wrapper_header, .contentAreaFrame, .clickNxtInfo").hide();
		$(".modulepopupLogout").show();	
		if(!device.MobileDevice())
		{
			var tmpToolVal=(($(window).width()-$(".module_index_header").width())/2)-100;
			$(".course_plus").css({"left":$(".module_index_header").width()+tmpToolVal,"z-index": "999999","position" : "absolute","top":($(".module_index_header").height()/2)-($(".course_plus").height()/2)});
			$(".sub_menu_arw_open_plus").css({"left":($(".module_index_header").width()+tmpToolVal)+4,"z-index": "999999","position" : "absolute","top":($(".module_index_header").height()-6)});
			$(".course_logout_clkbtn_1").css("top",($(".module_index_header").height()/2)-($(".course_plus").height()/2)-3);
			$(".course_logout_clkbtn_1").css("padding","");
		}
		$(".sub_menu_arw_open_plus").hide();
		$(".course_plus").show();
	}	
	if(window.opener!=null){
		var tmpNum=window.opener.languagesArr.indexOf(currLang);
		$(".duration").html(window.opener.durationArr[tmpNum]);		
	}
	$.each(ModTitles, function(key,value) {
	var _modImgPath = "../course/content_"+currLang+"/global/assets/images/"+ModImages[key];	
		if(totalPages[key]==0)
		{
			$("#module_list").append('<div class="module_'+(key+1)+' moduleBtn btn_disabled item"><img src='+_modImgPath+' /><div class="modules_padd"><h2>'+coverflowmodule+" "+(key+1)+'</h2><h3>'+ModTitles[key]+'</h3><div class="tooltip1" style="visibility:hidden;">Tooltip!</div><div class="mod_div">'+ModDurations[key]+'<div class="c100 p0 small" style="float: right; font-size: 45px; top: -14px;"><span class="percent">0%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div><div class="clear"></div></div><div class="module-progress"><div class="moduleSlide"></div></div></div>');
		}else{
			$("#module_list").append('<div class="module_'+(key+1)+' moduleBtn item"><img src='+_modImgPath+' /><div class="modules_padd"><h2>'+coverflowmodule+" "+(key+1)+'</h2><h3>'+ModTitles[key]+'</h3><div class="tooltip1" style="visibility:hidden;">Tooltip!</div><div class="tooltip1" style="visibility:hidden;">Tooltip!</div><div class="mod_div">'+ModDurations[key]+'<div class="c100 p0 small" style="float: right; font-size: 45px; top: -14px;"><span class="percent">0%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div><div class="clear"></div></div><div class="module-progress"><div class="moduleSlide"></div></div></div>');
		}
	});
	fnCourseCompletionArr();	
	if(device.MobileDevice()){
		$('#leftMenuBtn').css('visibility','hidden');
		$('#rightMenuBtn').css('visibility','hidden');
		
	}
	var owl = $('.owl-carousel');
	  owl.owlCarousel({
		margin: 10,
		loop: false,
		nav:true,
		rtl:false,
		responsive: {
		  0: {
			items: 1
		  },
		  500: {
			items: 2
		  },
		  1000: {
			items: 3
		  }
		}
	  })
	  .on('changed.owl.carousel', function (event) {
		if($('.owl-nav').hasClass('disabled')) {
			$('#leftMenuBtn').addClass('disabled');
			$('#rightMenuBtn').addClass('disabled');
		} else {
			$('#leftMenuBtn').removeClass('disabled');
			$('#rightMenuBtn').removeClass('disabled');
			if($('.owl-prev').hasClass('disabled')) {
				$('#leftMenuBtn').addClass('disabled');
			} else if($('.owl-next').hasClass('disabled')) {
				$('#rightMenuBtn').addClass('disabled');
			} else {
				$('#leftMenuBtn').removeClass('disabled');
				$('#rightMenuBtn').removeClass('disabled');
			}
		}
	  });
	$(".moduleBtn.module_"+currModule).addClass("moduleClicked");
				
	$(".course_logout_clkbtn").click(function(){		
		fnAudioVideoPause(true);
		$(".popupLogout").show();
		if(notesData.length>0){
		   $(".logoutPop_print_btn").show();
		   $(".logoutPop_print_text").show();		  
		}
	});
	$(".logoutPop_clk_btn").click(function(){
		 window.opener.fnUpdateCourseRunInfo();
		 window.close();
	});	
	$('.moduleBtn').each(function(index) {				
		$(this).click(function(){
			if(!$(this).hasClass("btn_disabled"))
			{
				/****Dummy Audio Play****/
				subAudio[0].load();
				subAudio.currentTime = 0;
				subAudio[0].oncanplaythrough = subAudio[0].play();
				subAudio[0].pause();
				/****Dummy Audio Play****/
				$(".copyRightTxt").css("color", "#666")
				moduleSelected=true;
				$(".moduleBtn").removeClass("moduleClicked");
				$(".help_menu_click_plus").removeClass("btn_disabled");
				$(".course_logout_clkbtn_1").removeClass("btn_disabled");
				$(this).addClass("moduleClicked");
				$(".course_plus, .sub_menu_arw_open_plus").hide();
				$(".modulepopupLogout").hide();
				$(".wrapper_header, .contentAreaFrame, .clickNxtInfo").show();
				$(".course_plus, .sub_menu_arw_open_plus").hide();		
				 			
				if(currModule != (index+1)){
					currPageNum	 = 1;	
				}
				currModule = index + 1;		
				fnCreateAssetsFilesize(currModule);		
				fnLoadPage(1);
				if(!device.iPad() && !device.MobileDevice())
				{
					$//(".wrapper_header").removeClass("wrapper_header");
					var headerBarHeight=$(".right_btns").height();
					//$(".wrapper_header").css('height',headerBarHeight);
				} else if(device.MobileDevice()){					
					$(".Screen_Tap_Instruction").show();
				}
				fnLoadModulePrintData(); 	
				fnSearchData();
				fnCreateLeftMenu(index);
					
			}			
		});
		
	 
		/* $(".modules_padd h3").mouseover(function(){
		if(window.innerWidth >= 2560 && window.innerHeight <=1353){
		  if($(this).text().length > 25){
		var a =  $(this).parent().parent().attr('class').split(" ")[0];
		var b = a.substr(7, 7);
  			$(".tooltip1").html(ModTitles[b-1]);
			$(".tooltip1").css("opacity", "1");
			$(".module_"+b+" .tooltip1").css("visibility", "visible");
			}
			else {
			 $(".tooltip1").css("visibility", "hidden")
			 $(".tooltip1").css("opacity", "0")
			}
		}
		 if(window.innerWidth >= 1366 && window.innerHeight <=673){
		  if($(this).text().length > 25){
		var a =  $(this).parent().parent().attr('class').split(" ")[0];
		var b = a.substr(7, 7);
  			$(".tooltip1").html(ModTitles[b-1]);
			$(".tooltip1").css("opacity", "1");
			$(".module_"+b+" .tooltip1").css("visibility", "visible");
			}
			else {
			 $(".tooltip1").css("visibility", "hidden")
			 $(".tooltip1").css("opacity", "0")
			}
		 }
		 if(window.innerWidth >= 1707 && window.innerHeight <=873){
		  if($(this).text().length > 26){
		var a =  $(this).parent().parent().attr('class').split(" ")[0];
		var b = a.substr(7, 7);
  			$(".tooltip1").html(ModTitles[b-1]);
			$(".tooltip1").css("opacity", "1");
			$(".module_"+b+" .tooltip1").css("visibility", "visible");
			}
			else {
			 $(".tooltip1").css("visibility", "hidden")
			 $(".tooltip1").css("opacity", "0")
			}
		 }
		 if(window.innerWidth >= 1920 && window.innerHeight <=985){
		 if($(this).text().length > 26){
		var a =  $(this).parent().parent().attr('class').split(" ")[0];
		var b = a.substr(7, 7);
  			$(".tooltip1").html(ModTitles[b-1]);
			$(".tooltip1").css("opacity", "1");
			$(".module_"+b+" .tooltip1").css("visibility", "visible");
			}
			else {
			 $(".tooltip1").css("visibility", "hidden")
			 $(".tooltip1").css("opacity", "0")
			}
			}
			})
			$(".modules_padd h3").mouseout(function(){
			 $(".tooltip1").css("visibility", "hidden")
			 $(".tooltip1").css("opacity", "0")
			}) */
			 
			
			 
	});
		
	$(".Screen_Tap_Instruction").on("swipeleft",function(){	
		$(this).hide();
	});
	
	$(".Screen_Tap_Instruction").on("swiperight",function(){
		$(this).hide();
	});
	
	$(".module_selector").find("input").focus(function() {
		$(this).trigger('keyup');
	});
	$(".module_selector").find("input").keyup(function() {	
		var str=$(this).val();		
		var strArr=[];
		$.each(ModTitles, function(key,value) {
		var tmpstr=ModTitles[key].toLowerCase();
			str=str.toLowerCase();
			if (tmpstr.match(str)){
				strArr.push(ModTitles[key]);
			}
		});
		if(strArr!="") {
			fnSearchMenu(strArr);
			fnCourseCompletionArr();			
		}else if (strArr==""){
			$.each(ModTitles, function(key,value) {
				$(".owl-carousel").trigger('remove.owl.carousel', [key]).trigger('refresh.owl.carousel');
			});
			$(".owl-carousel").trigger('add.owl.carousel', [$('<div style="font-size: 24px;">'+nomodulesfound+'</div>')]).trigger('refresh.owl.carousel');
		} else {
		}
	});
	$(".ui-input-has-clear").click(function(){		
		var strArrClr = new Array();
		$.each(ModTitles, function(key,value) {
			strArrClr.push(value);
		});
		if($(".module_selector").find("input").val()!="")
		{
		}else{
			fnSearchMenu(strArrClr);
			fnCourseCompletionArr();
		}
	});
	$('#rightMenuBtn').click(function(e) {
		owl.trigger('next.owl.carousel', [600]);		
	});
	$('#leftMenuBtn').click(function(e) { 
		owl.trigger('prev.owl.carousel', [600]);
	});

}
/**********Course Level Menu - Search Functionality************************/
function fnSearchMenu(aTxt) {
	var tempArr = ModTitles;
	$.each(tempArr, function(key,value) {
		$(".owl-carousel").trigger('remove.owl.carousel', [key]).trigger('refresh.owl.carousel');	
	});
	$.each(aTxt, function(key,value) {
		$.each(tempArr, function(key1,value1) {
			if(aTxt[key]==tempArr[key1]) {
				var _modImgPath = "../course/content_"+currLang+"/global/assets/images/"+ModImages[key1];
				if(totalPages[key1]==0){
				   var content = '<div class="module_'+(key1+1)+' moduleBtn moduleSrchBtn btn_disabled item" id="mod_'+(key1+1)+'"><img src='+_modImgPath+' /><div class="modules_padd"><h2>'+coverflowmodule+' '+(key1+1)+'</h2><h3>'+ModTitles[key1]+'</h3><div class="mod_div">'+ModDurations[key1]+'<div class="c100 p0 small" style="float: right; font-size: 45px; top: -14px;"><span class="percent">0%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div><div class="clear"></div></div><div class="module-progress"><div class="moduleSlide"></div></div></div>';
				}else{
					var content = '<div class="module_'+(key1+1)+' moduleBtn moduleSrchBtn item" id="mod_'+(key1+1)+'"><img src='+_modImgPath+' /><div class="modules_padd"><h2>'+coverflowmodule+' '+(key1+1)+'</h2><h3>'+ModTitles[key1]+'</h3><div class="tooltip1" style="visibility:hidden;">Tooltip!</div><div class="mod_div">'+ModDurations[key1]+'<div class="c100 p0 small" style="float: right; font-size: 45px; top: -14px;"><span class="percent">0%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div><div class="clear"></div></div><div class="module-progress"><div class="moduleSlide"></div></div></div>';
				}
				$(".owl-carousel").trigger('add.owl.carousel', [$(content)]).trigger('refresh.owl.carousel');
			}
		});	
	});
	
	$('.moduleSrchBtn').each(function(index) {
		$(this).click(function(){
           if(!$(this).hasClass("btn_disabled")){
				/****Dummy Audio Play****/
				subAudio[0].load();
				subAudio.currentTime = 0;
				subAudio[0].oncanplaythrough = subAudio[0].play();
				subAudio[0].pause();
				/****Dummy Audio Play****/
				$(".copyRightTxt").css("color", "#666");
				var idval = $(this).attr('id');
				var idIndex = idval.split('_');
				var indx = idIndex[1];
				$(".module_search_list").hide();
				$(".moduleSrchBtn").removeClass("moduleClicked");
				$(".help_menu_click_plus").removeClass("btn_disabled");
				$(this).addClass("moduleClicked");	
				$(".course_plus, .sub_menu_arw_open_plus").hide();			
				$(".modulepopupLogout").hide();
				$(".wrapper_header, .contentAreaFrame, .clickNxtInfo").show();			
				if(currModule != (indx)){
					currPageNum	 = 1;	
				}
				$(".wrapper_header .header_new").parent().css("background", "#f4f4f3")
				currModule = indx;	
				fnCreateAssetsFilesize(currModule);		 
				fnLoadPage(1);
				fnLoadModulePrintData(); 	
				fnSearchData();
				fnCreateLeftMenu(currModule-1);
		    }
		});
	});	
	/* $(".modules_padd h3").mouseover(function(){
		if(window.innerWidth >= 2560 && window.innerHeight <=1353){
		  if($(this).text().length > 25){
		var a =  $(this).parent().parent().attr('class').split(" ")[0];
		var b = a.substr(7, 7);
  			$(".tooltip1").html(ModTitles[b-1]);
			$(".tooltip1").css("opacity", "1");
			$(".module_"+b+" .tooltip1").css("visibility", "visible");
			}
			else {
			 $(".tooltip1").css("visibility", "hidden")
			 $(".tooltip1").css("opacity", "0")
			}
		}
		 if(window.innerWidth >= 1366 && window.innerHeight <=673){
		  if($(this).text().length > 25){
		var a =  $(this).parent().parent().attr('class').split(" ")[0];
		var b = a.substr(7, 7);
  			$(".tooltip1").html(ModTitles[b-1]);
			$(".tooltip1").css("opacity", "1");
			$(".module_"+b+" .tooltip1").css("visibility", "visible");
			}
			else {
			 $(".tooltip1").css("visibility", "hidden")
			 $(".tooltip1").css("opacity", "0")
			}
		 }
		 if(window.innerWidth >= 1707 && window.innerHeight <=873){
		  if($(this).text().length > 26){
		var a =  $(this).parent().parent().attr('class').split(" ")[0];
		var b = a.substr(7, 7);
  			$(".tooltip1").html(ModTitles[b-1]);
			$(".tooltip1").css("opacity", "1");
			$(".module_"+b+" .tooltip1").css("visibility", "visible");
			}
			else {
			 $(".tooltip1").css("visibility", "hidden")
			 $(".tooltip1").css("opacity", "0")
			}
		 }
		 if(window.innerWidth >= 1920 && window.innerHeight <=985){
		
		 if($(this).text().length > 26){ 
		var a =  $(this).parent().parent().attr('class').split(" ")[0];
		var b = a.substr(7, 7);
  			$(".tooltip1").html(ModTitles[b-1]);
			$(".tooltip1").css("opacity", "1");
			$(".module_"+b+" .tooltip1").css("visibility", "visible");
			}
			else {
			 $(".tooltip1").css("visibility", "hidden")
			 $(".tooltip1").css("opacity", "0")
			}
			}
			}) 
			$(".modules_padd h3").mouseout(function(){
			 $(".tooltip1").css("visibility", "hidden")
			 $(".tooltip1").css("opacity", "0")
			}) */
}
/**********Course Level Menu - Course completion************************/
function fnCourseCompletionArr()
{	
	var compState = 0;
	var tempArr = pageCompletionArray.toString().split(",");	
	for (i = 0; i < tempArr.length; i++) {
        if (tempArr[i] == 1) {
            ++compState;
       }
    }	
	var compPercent = Math.floor((compState / tempArr.length) * 100);	
	 $('#courseLoaderTxt').text(compPercent + "%");
	$('.module_bar .loader_2').css({'width': compPercent + '%', 'background':'#f5570b'});
	$('.module_bar .loader_2_span').css({'left': compPercent + '%'});
	var courseSlideWidth2 = $('.module_bar .loader_1').width();
	var courseSlideWid = Math.floor((courseSlideWidth2 * compPercent) / 100); 
	if (courseSlideWid >= ($('.loader_1').width() - $('.module_bar .slidePercent').outerWidth())) {
        cmCddtailsLeft = courseSlideWid - $('.module_bar  .slidePercent').outerWidth();
    } else if (courseSlideWid <= $('.module_bar  .slidePercent').outerWidth()) {
        cmCddtailsLeft = '0px';
    } else {
        cmCddtailsLeft = courseSlideWid - ($('.module_bar  .slidePercent').outerWidth() / 2);
    }
    $('.module_bar .slidePercent').css('left', cmCddtailsLeft);
	for (var j = 0; j < pageCompletionArray.length; j++) {
	 var compModuleState = 0;
		for (var k = 0; k < pageCompletionArray[j].length; k++) {
			if (pageCompletionArray[j][k] == 1) {
				++compModuleState;
		    }
	    }	
		var compPercent = Math.floor((compModuleState / pageCompletionArray[j].length) * 100);
		if(compPercent){
		    $('.module_'+(j+1)+' .c100 span.percent').text(compPercent + '%');
		    $('.module_'+(j+1)+' .c100').addClass('p'+compPercent);
		}
		else{
		    $('.module_'+(j+1)+' .c100 span.percent').text('0%');
		    $('.module_'+(j+1)+' .c100').addClass('p0');
		}
		$('.module_'+(j+1)+' .module-progress .moduleSlide').css({'width': compPercent + '%', 'background':'#f5570b', 'height':'2px'});
    }	
}
/************************************************************************************/