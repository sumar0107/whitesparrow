$(document).ready(function () {
	var sticky = $("#ha-header");
	var origOffsetY = 2;
	$(window).scroll(function () {
		$(window).scrollTop() > origOffsetY ? $("#ha-header").addClass("head-effect") : $("#ha-header").removeClass("head-effect")
	});
});