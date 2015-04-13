var body = $("body");
var backToTop = $("#back-to-top");

$(window).resize(function(){

    var body = $("body");
    var backToTop = $("#back-to-top");
    var currentWidth = $(window).width();
    if(currentWidth < 769) {

        body.addClass("mobile-width");

        $("#back-to-top").hide();
        // because divs have moved due to parallax
        // we need to reset them for the mobile version
        // as we don't use employ parallax with mobile
        $(".view-port").css('top', '0px');
        $("#footer").css('top', '0px');

    } else if(currentWidth > 768 ) {

        if(body.hasClass("mobile-width"))
        {
            body.removeClass("mobile-width");
        }
    }

});


$(document).ready(function() {
    var body = $("body");
    var backToTop = $("#back-to-top");
    var currentWidth = $(window).width();
    //$("#logo").text(currentWidth);

    if(currentWidth < 769) {
         body.addClass("mobile-width");
    }

    $('.navigatable a, a.navigatable').click( function(e) {

            var clicked = "#" + $(this).attr("href").match(/#([^ ]*)/)[1];
            var element = $(clicked);

            if(!body.hasClass("mobile-width"))
            {
                var offset = element.attr("data-offset") + "px";
            } else {
                var offset = element.attr("data-offset-mobile") + "px";
            }

            if($.browser.opera) {
                $("html:not(:animated)").animate( {scrollTop: offset}, 800);
            }else {
                $("html:not(:animated),body:not(:animated)").animate({ scrollTop: offset}, 800 );
            }

            e.preventDefault();
            return false;

        });

    // contact form handling
   /* $('#contact-form #contact-button').click(function(e) {

        e.preventDefault();
        $('#contact-wrap .status-message').hide();
        $('#form-preloader').show();

        // get input values
        var name = $("#contact-form #name");
        var email = $("#contact-form #email");
        var message = $("#contact-form #message");

        $.validity.setup({ outputMode:"label" });
        $.validity.start();

        name.require("Enter your name");
        email.require("Enter your email").match("email");
        message.require("Enter your message").nonHtml();

        var result = $.validity.end();

        if(result.valid)
        {
            var jsonObject = {"name" : name.val(), "email" : email.val(),"message" : message.val() };

            $.ajax({
              type: "POST",
              dataType: "json",
              url: "http://creative9.com/wp-content/themes/c9-2012/ajax.php",
              data: jsonObject,
              success: function(result,status,xhr) {

                var successMessage ="<h1>Message Received!</h1><p>Hehe and on that note, we can happily say that we've got your email. If we're not overly busy you can expect a response from us within a couple of hours.</p>";
                var ErrorMessage ="<h1>Damn Server Gremlins!</h1><p>Sorry looks like those pesky gremlins were munching the power cables again. Try your luck again.</p>";

                if(result.success == true)
                {
                    $('#form-preloader').hide();
                    $('#contact-wrap .status-message').addClass('success').html(successMessage).show();
                }
                else
                {
                    $('#form-preloader').hide();
                    $('#contact-wrap .status-message').addClass('success').html("<h1>Oops Message Dropped!</h1>").show();
                }

              },
              error: function(xhr,status,error) {

                $('#form-preloader').hide();
                $('#contact-wrap .status-message').html("<h1>Message Received!</h1><p>Hehe and on that note, we can happily say that we've got your email. If we're not overly busy you can expect a response from us within a couple of hours.</p>").show();
                return false;

              }
            });
        }
        else {
            $('#form-preloader').hide();
            var offset = $("#contact").attr("data-offset") + "px";

            if($.browser.opera) {
                $("html:not(:animated)").animate( {scrollTop: offset}, 800);
            }else {
                $("html:not(:animated),body:not(:animated)").animate({ scrollTop: offset}, 800 );
            }
            return false;
        }

    }
    );*/

    // team card tabs
   /* $('.team-card .card-info-wrap').each( function () {
        $('section', this).hide();
        $('section:first', this).show();
    });*/

    // handle tab clicks
   /* $('ul.card-tabs li a').click( function() {

        var cardInfoWrap = $(this).parents('.card-info-wrap');

        var cardTabs = $('ul.card-tabs', cardInfoWrap);
        var cardID = cardTabs.attr('id');



        $('li a', cardTabs).removeClass('current');
        $(this).addClass('current');

        var tabID = $(this).attr('href') + '-' + cardID;

        $('.tab-content', cardInfoWrap).hide();

        $(tabID).show();
        return false;
    });*/

});