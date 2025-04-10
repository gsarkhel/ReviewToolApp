/**********Variables Declaration************************/
var glossData;
var glossItems=[];
var glossDescription=[];
var glossSearchIndexArr=[];
var liSelected;
var next; 
var revealCont;
var scrolled =0;
var ctnlscroll;
/**********Document Initialization**********************/
$(document).ready(function(){
	$(".gls_list").html("");
	 $(".gloss_sec_heading").html("");
	$(".gloss_description").html("");
		$.get('../course/content_'+currLang+'/global/data/glossary.xml', function(data){
		glossData=data;
		 $(glossData).find('Item').each(function(index){
			glossItems.push($(this).attr("Name"));	
			glossDescription.push($(this).find("Description").text());
		 });
		fnGenerateGlossary();
		 $(".gloss_list").css("overflow-y","auto");
	 
 	     $(".gloss_list").mCustomScrollbar({
			scrollButtons:{enable:true},
			theme:"dark-thick"  
 		
		});     
		 
   
		  if($(".gloss_list").hasClass("mCustomScrollbar")){
			$(".gloss_list").mCustomScrollbar("update");
		}else{
			$(".gloss_list").mCustomScrollbar({
				scrollButtons:{enable:true},
				theme:"dark-thick",
				mouseWheelPixels: 200
			});
		}    
		$(".pop_srch_options").find("input").keyup(function() {
			fnAutoSearch($(this).val());
		});
		$(".pop_srch_options .ui-input-clear").click(function() {
			fnGenerateGlossary();
		});	
	})
	
 
});
function fnGenerateGlossary()
{
	if(!device.MobileDevice())
	{
	/* mobile search popup display issue fixes */
		$('.pop_mobile_heading').hide();
		$(".gls_list").html("");
		$(".gloss_sec_heading").html("");
		$(".gloss_description").html("");
		for(var i=0;i<glossItems.length;i++){
			$(".gls_list").append("<li class='' id='gls_"+(i+1)+"'><h6>"+glossItems[i]+"</h6><div class='clear'></div></li>")
		}
		$(".gloss_list").css("height",$(".gls_list").height());
		fnGlossDescriptClick();
		fnDescriptionShow(0);
	}else{
		$(".gls_list").html("");
		$(".gloss_sec_heading").html("");
		$(".gloss_description").html("");
		for(var i=0;i<glossItems.length;i++){
			$(".gls_list").append("<li class='' id='gls_"+(i+1)+"'><h6>"+glossItems[i]+"</h6><i class='ti-plus gloss_plus'></i><div class='clear'></div><div class='gloss_description'  id='glsdes_"+(i+1)+"'>"+glossDescription[i]+"</div></li>")
		}
		$(".gloss_list li:last").after("<li class='' id=''><h6></h6><div class='clear'></div><div class='gloss_description' id=''></div></li>");
		$(".gloss_list").css("height",$(".gls_list").height());
		fnGlossDescriptClick();
		fnDescriptionShow(0);
	}
}
function fnGlossDescriptClick()
{
	$('.gls_list li').each(function(index) {
	
		$(this).click(function()
		{ 	
			var clkID=$(this).attr("id").split("_")[1];
			clkID=Number(clkID)-1;
			if(!device.MobileDevice())
	         {
				fnDescriptionShow(clkID);
			 }else{
				if($(this).find("i").hasClass("ti-plus"))
				{
					fnDescriptionShow(clkID);
				}else{
					fnDescriptionHide(clkID);
				}
			 }
		});
 	
	});
	
}
function fnDescriptionHide(aNum)
{
		$(".glossary_left").show();
		$(".glossary_right").show();
		$(".nogls").hide();
		$(".gloss_sec_heading").html("");
		$(".gloss_sec_heading").html(glossItems[aNum]);
		var tmpNum=Number(aNum)+1;
		$(".gloss_description").hide();
		$("#gls_"+tmpNum+" i").removeClass("ti-minus").addClass("ti-plus");
}
function fnDescriptionShow(aNum)
{
	if(!device.MobileDevice())
	{
		$(".glossary_left").show();
		$(".glossary_right").show();
		$(".nogls").hide();
		$(".gloss_sec_heading").html("");
		$(".gloss_description").html("");
		$(".gloss_sec_heading").html(glossItems[aNum]);
		$(".gloss_description").html("<p>"+glossDescription[aNum]+"</p>");
		$('.gls_list li').removeClass("pop_list_active");
		var tmpNum=Number(aNum)+1;
		$('#gls_'+tmpNum).addClass("pop_list_active");
		if($(".gloss_description p").hasClass("mCustomScrollbar")){
			$(".gloss_description p").mCustomScrollbar("update");
		}else{
			$(".gloss_description p").mCustomScrollbar({
				scrollButtons:{enable:true},
				theme:"dark-thick",
				mouseWheelPixels: 200
			});
		} 
	}else{	
		$(".glossary_left").show();
		$(".glossary_right").show();
		$(".nogls").hide();
		$(".gloss_sec_heading").html("");
		$(".gloss_sec_heading").html(glossItems[aNum]);
		$('.gls_list li').removeClass("pop_list_active");
		var tmpNum=Number(aNum)+1;
		$('#gls_'+tmpNum).addClass("pop_list_active");				
		$(".gls_list li i").removeClass("ti-minus").addClass("ti-plus");
		$("#gls_"+tmpNum+" i").removeClass("ti-plus").addClass("ti-minus");
		$(".gloss_description").hide();
		$("#gls_"+tmpNum+' .gloss_description').show();
	}
}
function fnAutoSearch(str)
{
	str=str.toLowerCase();
	glossSearchIndexArr=[];
	var tmpstr;
    if (glossItems.length) {
		for (var j=0; j<glossItems.length; j++) {
			tmpstr=glossItems[j].toLowerCase();
			if (tmpstr.match(str)){
				glossSearchIndexArr.push(j);
			}			
		}
		if(glossSearchIndexArr.length>0)
		{
			$(".gls_list").html("");
			$(".gloss_sec_heading").html("");
			$(".gloss_description").html("");
			for(var i=0;i<glossItems.length;i++){
				for(var j=0;j<glossSearchIndexArr.length;j++){				
					if(i==glossSearchIndexArr[j]){
						if(!device.MobileDevice()){
							$(".gls_list").append("<li id='gls_"+(i+1)+"'><h6>"+glossItems[i]+"</h6><div class='clear'></div></li>")
						}
						else{
					       $(".gls_list").append("<li class='' id='gls_"+(i+1)+"'><h6>"+glossItems[i]+"</h6><i class='ti-plus gloss_plus'></i><div class='clear'></div><div class='gloss_description'  id='glsdes_"+(i+1)+"'>"+glossDescription[i]+"</div></li>")
					   }
					}					
				}
			}
			fnGlossDescriptClick();
			fnDescriptionShow(glossSearchIndexArr[0]);
			$(".gloss_list").mCustomScrollbar("update");
			 if($(".gloss_list").hasClass("mCustomScrollbar")){
				$(".gloss_list").mCustomScrollbar("update");
			}else{
				$(".gloss_list").mCustomScrollbar({
					scrollButtons:{enable:true},
					theme:"dark-thick",
					mouseWheelPixels: 200
				});
			}
		}else{
			//console.log("No Glossary Data Found");
			$(".glossary_left").hide();
			$(".glossary_right").hide();
			$(".nogls").show();
			$(".gls_list").html("");
			$(".gloss_sec_heading").html("");
			$(".gloss_description").html("");
		}		
    }
}
/********************** Functions **********************/

