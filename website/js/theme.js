//////////////////////////////////////////////
// Highlight the top nav as scrolling occurs
//////////////////////////////////////////////

$('body').scrollspy({
    target: '.navbar',
    offset: 65
});

////////////////////////////////////////////////////////////////////////////////////////////
// Counter-Up (requires jQuery waypoints.js plugin): https://github.com/bfintal/Counter-Up
////////////////////////////////////////////////////////////////////////////////////////////

$('.counter').counterUp({
    delay: 10,
    time: 2000
});

/////////////////////////
// Scroll to top button
/////////////////////////

// Check to see if the window is top if not then display button
$(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
        $('.scrolltotop').fadeIn();
    } else {
        $('.scrolltotop').fadeOut();
    }
});

// Click event to scroll to top
$('.scrolltotop').click(function(){
    $('html, body').animate({scrollTop : 0}, 1500, 'easeInOutExpo');
    return false;
});



////////////////////////////////////////////////////////////////////
// Close mobile menu when click menu link (Bootstrap default menu)
////////////////////////////////////////////////////////////////////

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});
