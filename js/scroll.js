$(window).scroll(function(){
	handleTopNavAnimation();
});

$(function(){
	handleTopNavAnimation();
});

function handleTopNavAnimation() {
    var top=$(window).scrollTop();
    console.log("scrolling")

	if(top>10){
		$('#main-nav').addClass('navbar-solid');
	}
	else{
		$('#main-nav').removeClass('navbar-solid');
	}
}