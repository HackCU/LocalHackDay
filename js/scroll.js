$(window).scroll(function(){
	handleTopNavAnimation();
});

$(function(){
	handleTopNavAnimation();
});

function handleTopNavAnimation() {
    var top=$(window).scrollTop();

	if(top>10){
		$('#site-nav').addClass('navbar-solid');
	}
	else{
		$('#site-nav').removeClass('navbar-solid');
	}
}