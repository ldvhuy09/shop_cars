/*price range*/

 $('#sl2').slider();

	var RGBChange = function() {
	  $('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
	};

/*scroll to top*/

$(document).ready(function(){
	$(function () {
		$.scrollUp({
	        scrollName: 'scrollUp', // Element ID
	        scrollDistance: 300, // Distance from top/bottom before showing element (px)
	        scrollFrom: 'top', // 'top' or 'bottom'
	        scrollSpeed: 300, // Speed back to top (ms)
	        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
	        animation: 'fade', // Fade, slide, none
	        animationSpeed: 200, // Animation in speed (ms)
	        scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
					//scrollTarget: false, // Set a custom target element for scrolling to the top
	        scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
	        scrollTitle: false, // Set a custom <a> title if required.
	        scrollImg: false, // Set true to use image
	        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	        zIndex: 2147483647 // Z-Index for the overlay
		});
	});
});

$(document).ready(function(){
  $("#lastest-items").siblings().hide();
});

$(document).ready(function() {
  $("#label-litems, #label-bs-items, #label-mv-items").click(function() {
    var currentTarget = event.currentTarget;
    $(currentTarget).children().attr("class", "active");
    $(currentTarget).siblings().children().attr("class", "");
    var id_content = $(currentTarget).children().attr("value");
    $(id_content).siblings().hide();
    $(id_content).show();
  });
});

$(document).ready(function(e) {
  $('.search-panel .dropdown-menu').find('a').click(function(e) {
    e.preventDefault();
    var para = $(this).attr("href").replace("#", "");
    var concept = $(this).text();
    $("#dropdown-search-panel span#search-concept").text(concept);
    $("#search_param").val(para);
  })
});

$(document).ready(function(e){
  $('.shop-menu .dropdown-menu').find('a').click(function(e) {
    e.preventDefault();
    var para = $(this).attr("href").replace("#", "");
    var concept = $(this).text();
    $('span#dropdown-order-by').text(concept);
    $('#order_param').val(para);
  })
});


$(document).ready(function(){
  $('.dropdown-submenu a.test').on("click", function(e){
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});
