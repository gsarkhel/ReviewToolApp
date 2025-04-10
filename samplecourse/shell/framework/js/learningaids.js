/**********Variables Declaration************************/
var resourcesData;
var resourcesName=[];
var resourcesIcons=[];
var resourcesLink=[];
var resourcesFolder=[];
var resourcespath;
/**********Document Initialization**********************/
$(document).ready(function(){
	$.get('../course/content_'+currLang+'/global/data/resources.xml', function(data){
		resourcesData=data;
		 $(resourcesData).find('element').each(function(index){
			resourcesName.push($(this).attr("Name"));	
			resourcesIcons.push($(this).attr("type"));	
			resourcesLink.push($(this).attr("reflink"));
			resourcesFolder.push($(this).attr("internalLink"));
		 });
	})
	var tWidth=$('.header').width();
		tHgt=Number(tWidth*18/5)-20;
 	 $(".lrng_container").css("height", tHgt)
	 $(".lrng_container").mCustomScrollbar({
				scrollButtons:{enable:true},
				theme:"dark-thick",
				mouseWheelPixels: 200
		});
	/* if($(".lrng_container").hasClass("mCustomScrollbar")){
		      $(".lrng_container").mCustomScrollbar("update");
	    }else{
		     $(".lrng_container").mCustomScrollbar({
				scrollButtons:{enable:true},
				theme:"dark-thick",
				mouseWheelPixels: 200
		});
	} */
 	
});
/**********Create Resource Elements**********************/
function fnGenerateResources()
{
if(device.iPad()){
$(".resources_list").css("overflow","auto");
	$(".resources_list").css("height","349px");
 	
	}
	$(".resources_list").html("");
	resourcespath="../course/content_"+currLang+"/global/assets/resources/";
 	for(var i=0; i<resourcesName.length;i++)
	{
		if(device.MobileDevice()){
			if(resourcesFolder[i]=="yes")
			{
				$(".resources_list").append('<li class="lrngAid"><h6 class="lrngAidTxt">'+resourcesName[i]+'</h6><a href="'+(resourcespath+resourcesLink[i])+'" class="" data-wow-duration="1s" target="_blank"><i class="'+resourcesIcons[i]+'"></i></a><div class="clear"></div></li>');
			}else{
				$(".resources_list").append('<li class="lrngAid"><h6 class="lrngAidTxt">'+resourcesName[i]+'</h6><a href="'+resourcesLink[i]+'" class="" target="_blank"><i class="'+resourcesIcons[i]+'"></i></a><div class="clear"></div></li>');
			}
		}else{
			if(resourcesFolder[i]=="yes")
			{
				$(".resources_list").append('<li class="lrngAid"><h6 class="lrngAidTxt"><i class="'+resourcesIcons[i]+'"></i> '+resourcesName[i]+'</h6><a href="'+(resourcespath+resourcesLink[i])+'" class="pop_radius_btn" target="_blank">'+viewBtnTxt+'</a><div class="clear"></div></li>');
			}else{
				$(".resources_list").append('<li class="lrngAid"><h6 class="lrngAidTxt"><i class="'+resourcesIcons[i]+'"></i> '+resourcesName[i]+'</h6><a href="'+resourcesLink[i]+'" class="pop_radius_btn" target="_blank">'+viewBtnTxt+'</a><div class="clear"></div></li>');
			}
		}
	}
}
/***********************************************/