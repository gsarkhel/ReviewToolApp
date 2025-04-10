/**********Preloader Initialization**********************/
var loaderAnimation = $("#html5Loader").LoaderAnimation({
	onComplete:function(){
		console.log("preloader animation completed!");
	}
});
var callPageNumber=0;
function fnCallLoader(){
	if(pageType=="subPage"){
		callPageNumber=preLoadSubPageIndex[currModule-1][currPageNum-1][subPageNum]+(totalPages[currModule-1]-1);
	}else{
		callPageNumber=currPageNum-1;
	}
	$.html5Loader({
		filesToLoad:jsonTempObj[currModule-1],
		onComplete: function () {
			//console.log("All the assets are loaded!");
		},
		onUpdate: loaderAnimation.update
	});
}
/*********************************************************/