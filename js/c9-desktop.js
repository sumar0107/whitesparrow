$(document).ready(function() {
	var body = $("body");
	var backToTop = $("#back-to-top");
        // pre-loader
        var items = new Array();
        var errors = new Array();
        current = 0;
        var jBar = $('#load-fill');
        var jPer = $('#load-pct #pct-value');

        //get the url for every image within the page and the css files
        var getImages = function( element) {
            $(element).find('*:not(script)').each(function() {
                var url = "";

                if ($(this).css('background-image').indexOf('none') == -1) {
                    url = $(this).css('background-image');
                    if(url.indexOf('url') != -1) {
                        var temp = url.match(/url\((.*?)\)/);
                        url = temp[1].replace(/\"/g, '');
                    }
                } else if ($(this).get(0).nodeName.toLowerCase() == 'img' && typeof($(this).attr('src')) != 'undefined') {
                    url = $(this).attr('src');
                }

                if (url.length > 0) {
                    items.push(url);
                }

            });
        }

        //create preloaded image
        // for each image load it
        var preloading = function() {
            for (var i = 0; i < items.length; i++) {
                if(loadImg(items[i]));
            }
        }

        // load a single image
        var loadImg = function(url) {
            var imgLoad = new Image();

            $(imgLoad)
            .load(function() {
                completeLoading();
            })
            .error(function() {
                errors.push($(this).attr('src'));
                completeLoading();
            })
            .attr('src', url);
        }

        //update progress bar once image loaded
        var completeLoading = function() {
            current++;
            var per = Math.round((current / items.length) * 100);

            jBar.stop().animate({
                width: (per-0.5) + '%'
            }, 200, 'easeInQuad');

            jPer.delay(500).text((per-1.5));

             //if all images loaded
            if(current >= items.length) {

                current = items.length;

                $('#preloader-title h3').text('Core Resources');
                setTimeout(function() {   $('#preloader-title h3').text('Physics Engine'); }, 300);
                jPer.text(98.9);
                setTimeout(function() { loadComplete() }, 1200);
                setTimeout(function() { jBar.stop().animate({ width: 99.1 + '%'}, 500, 'easeInQuad');jPer.text(99.1); }, 600);
                setTimeout(function() { jBar.stop().animate({ width: 99.6 + '%'}, 500, 'easeInQuad'); jPer.text(99.6); }, 900);
            }

        }

        //triggered when all images are loaded
        var loadComplete = function() {

            jBar.stop().animate({
                width: (100) + '%'
            }, 0, 'easeInQuad');
            jPer.text('100');

            $(document).scrollTop(0);

            $('#preloader-title h2').text('Loading');
            $('#preloader-title h3').text('Complete');
            $('body').css('overflow','visible');

            $('#preloader').fadeOut(900, function() {
                $(this).remove();
            });

        }

        getImages('body');
        preloading();

        // Parallax Code
        var previousScroll = 0;

        $(window).bind('scroll', function () {

            if(!body.hasClass("mobile-width")) {
                parallaxScroll();
            }
        });

        function parallaxScroll(){
	        var body = $("body");
	        var backToTop = $("#back-to-top");
            var scrolled = $(window).scrollTop();

            var down = true;
            if( scrolled < previousScroll ) {
                down = false;
            }

            //var pinkShips = $('#pink-ships');
            //var pinkShipsPos = pinkShips.position();
            //
            //var blueShips = $('#blue-ships');
            //var blueShipsPos = blueShips.position();

            $('#bg-star-field-fixed').css('top',(0+((scrolled)*.36))+'px');
            $('#home').css('top',(0-(scrolled*.64))+'px');
            $('#about').css('top',(0-(scrolled*.64))+'px');
            //$('#small-pink-ship-wrap').css('top',(-833+(scrolled*.80))+'px');
            $('#services').css('top',(0-(scrolled*.64))+'px');
            $('#team').css('top',(0-(scrolled*.64))+'px');
            $('#work').css('top',(0-(scrolled*.64))+'px');
            $('#contact').css('top',(0-(scrolled*.65))+'px');
            //$('#footer').css('top',(775-(scrolled*.60))+'px');

            // 1. get the width it starts from
            // 2. get the current scrolltop around 470
            // 3. Current scrolltop value- 470
            var shieldPct = (0+(scrolled-683)/5).toFixed(1);

            if(shieldPct > 100) {
                shieldPct = 100;
            } else if(shieldPct < 0 ) {
                shieldPct = 0;
            }
            //
            //$('#ui-message-shield-prototype .ui-bar .fill').css('width', shieldPct + '%');
            //$('#ui-message-shield-prototype .shield-pct').html(shieldPct + '<span class="alt-color">%</span>');
            //$('#small-pink-ship .ship-shield').fadeTo(0, (shieldPct/100));
            //$('#pink-ships').css({'top' : (20-(scrolled*0.25))+'px','left' : (0+(scrolled*0.95))+'px'});

            // || (!body.hasClass("mobile-width") && window.pageYOffset >=700 )
            if( (scrolled >= 700 && backToTop.hasClass("off") && !body.hasClass("mobile-width") ) )
            {
                // Show It
	            console.log(123);
                backToTop.show();
                TweenMax.to(backToTop, 0.2, {css:{opacity: 1, right: 60, display: 'block', position: 'fixed'}, ease:Power0.easeInOut, repeat:0});
                backToTop.removeClass("off");
            }

            if (scrolled <= 700 && !backToTop.hasClass("off") && !body.hasClass("mobile-width") ) {
                 // Hide It

	            TweenMax.to(backToTop, 0.2, {css:{opacity: 1, right: -60}, ease:Power0.easeInOut, repeat:0});
	            $("#back-to-top").addClass("off");
	            $("#back-to-top").hide();
            }

            previousScroll = scrolled;

        }

        function hideBackToTop() {
            $("#back-to-top").addClass("off");
            $("#back-to-top").hide();
        }
    if ($("a.btn-popup[href='#callback']").length > 0) {
        var orderForm = $("a.btn-popup[href='#callback']");
        orderForm.fancybox({
            fitToView: false,
            autoSize: true,
            closeClick: false,
            openEffect: 'fade',
            closeEffect: 'fade',
            closeBtn: true,
            wrapCSS: 'fancybox-form-callback'
        });
    }

        // thumb Overlay
        //$('.medium-thumb').hover(
        //    function() {
        //
        //        $('.thumb-overlay', this).show();
        //
        //    },
        //    function() {
        //        $('.thumb-overlay', this).hide();
        //    }
        //);

         // handle service item clicks
        //$('#service-venn-diagram .venn-label').hover(
        //    function() {
        //        var label = $(this).attr("id");
        //        $('#' + label + '-label').stop(true, true).show("slow");
        //    },
        //    function() {
        //        var label = $(this).attr("id");
        //        $('#' + label + '-label').stop(true, true).hide("slow");
        //    }
        //);

        //// CSS Animation
        //var shipLarge = $("#home #ship-pink-large");
        //var largePosition = shipLarge.position();
        //
        //var largeXpos = largePosition.left;
        //var largeYpos = largePosition.top;
        //
        //var shipMedium = $("#home #ship-pink-medium");
        //var mediumPosition = shipMedium.position();
        //var mediumXpos = mediumPosition.left - 25;
        //var mediumYpos = mediumPosition.top - 10;
        //
        //var shipSmall = $("#home #ship-pink-small");
        //var smallPosition = shipSmall.position();
        //var smallXpos = smallPosition.left;
        //var smallYpos = smallPosition.top;
        //
        //
        //var boosterLargeF1 = $("#home #ship-pink-large .booster-f1");
        //boosterLargeF1Position = boosterLargeF1.position();
        //TweenMax.to(boosterLargeF1, 0.1, {css:{opacity: 0, left: boosterLargeF1Position.left, top: boosterLargeF1Position.top}, ease:SlowMo.easeIn, repeat:-1, yoyo:true});
        //
        //var boosterLargeF2 = $("#home #ship-pink-large .booster-f2");
        //boosterLargeF2Position = boosterLargeF2.position();
        //TweenMax.to(boosterLargeF2, 0.1, {css:{opacity: 0, left: boosterLargeF2Position.left+2, top: boosterLargeF2Position.top-5}, ease:SlowMo.easeIn, repeat:-1, yoyo:true});
        //
        //var boosterMediumF1 = $("#home #ship-pink-medium .booster-f1");
        //boosterMediumF1Position = boosterMediumF1.position();
        //TweenMax.to(boosterMediumF1, 0.1, {css:{opacity: 0.5, left: boosterMediumF1Position.left, top: boosterMediumF1Position.top}, ease:SlowMo.easeIn, repeat:-1, yoyo:true});
        //
        //var boosterMediumF2 = $("#home #ship-pink-medium .booster-f2");
        //boosterMediumF2Position = boosterMediumF2.position();
        //TweenMax.to(boosterMediumF2, 0.1, {css:{opacity: 0, left: boosterMediumF2Position.left-1, top: boosterMediumF2Position.top+2}, ease:SlowMo.easeIn, repeat:-1, yoyo:true});
        //
        //var boosterSmallF1 = $("#home #ship-pink-small .booster-f1");
        //boosterSmallF1Position = boosterSmallF1.position();
        //TweenMax.to(boosterSmallF1, 0.1, {css:{opacity: 0.5, left: boosterSmallF1Position.left, top: boosterSmallF1Position.top}, ease:SlowMo.easeIn, repeat:-1, yoyo:true});
        //
        //var boosterSmallF2 = $("#home #ship-pink-small .booster-f2");
        //boosterSmallF2Position = boosterSmallF2.position();
        //TweenMax.to(boosterSmallF2, 0.2, {css:{opacity: 0.2, left: boosterSmallF2Position.left, top: boosterSmallF2Position.top}, ease:SlowMo.easeIn, repeat:-1, yoyo:true});
        //
        //var t1P = new TimelineMax({repeat:-1, yoyo:true});
        //t1P.to(shipLarge, 1, {css:{left:largeXpos+5, top:largeYpos-13}, ease:Power0.easeIn});
        //t1P.to(shipLarge, 2, {css:{left:largeXpos-5, top:largeYpos}, ease:Power0.easeInOut});
        //
        //var t2P = new TimelineMax({repeat:-1, yoyo:true});
        //t2P.to(shipMedium, 4, {css:{left:mediumXpos+2, top:mediumYpos-28}, ease:Power0.easeInOut});
        //t2P.to(shipMedium, 4, {css:{left:mediumXpos, top:mediumYpos}, ease:Power0.easeInOut});
        //
        //var t3P = new TimelineMax({repeat:-1, yoyo:true});
        //t3P.to(shipSmall, 2, {css:{left:smallXpos+2, top:smallYpos-13}, ease:Power0.easeIn});
        //t3P.to(shipSmall, 2.4, {css:{left:smallXpos, top:smallYpos}, ease:Power0.easeIn});

        // CSS Animation
        //var smallPinkShip = $("#small-pink-ship");
        //var smallPinkShipPosition = smallPinkShip.position();
        //var smallPinkShipXpos = smallPinkShipPosition.left;
        //var smallPinkShipYpos = smallPinkShipPosition.top;
        //
        //var t4P = new TimelineMax({repeat:-1, yoyo:true});
        //t4P.to(smallPinkShip, 2, {css:{left:smallPinkShipXpos+15, top:smallPinkShipYpos-10}, ease:Power0.easeIn});
        //
        //var smallPinkShipBoosterF1 = $("#small-pink-ship .ship-booster-f1");
        //smallPinkShipBoosterF1Position = smallPinkShipBoosterF1.position();
        //TweenMax.to(smallPinkShipBoosterF1, 0.7, {css:{opacity: 0.4, left: smallPinkShipBoosterF1Position.left-0, top: smallPinkShipBoosterF1Position.top+0}, ease:SlowMo.easeIn, repeat:-1, yoyo:true});
        //
        //var smallPinkShipBoosterF2 = $("#small-pink-ship .ship-booster-f2");
        //smallPinkShipBoosterF2Position = smallPinkShipBoosterF2.position();
        //TweenMax.to(smallPinkShipBoosterF2, 0.1, {css:{opacity: 0, left: smallPinkShipBoosterF2Position.left-0, top: smallPinkShipBoosterF2Position.top+0}, ease:SlowMo.easeIn, repeat:-1, yoyo:true});
        //
        //var browserWidth = $(document).width();
        //var planetDestination = browserWidth + 150;

        // Blue Ships
        //var shipBlueLarge = $("#blue-ships #ship-blue-large");
        //var largeBluePosition = shipBlueLarge.position();
        //var largeBlueXpos = largeBluePosition.left;
        //var largeBlueYpos = largeBluePosition.top;
        //
        //var shipBlueMedium = $("#blue-ships #ship-blue-medium");
        //var mediumBluePosition = shipBlueMedium.position();
        //var mediumBlueXpos = mediumBluePosition.left;
        //var mediumBlueYpos = mediumBluePosition.top;
        //
        //var shipBlueSmall = $("#blue-ships #ship-blue-small");
        //var smallBluePosition = shipBlueSmall.position();
        //var smallBlueXpos = smallBluePosition.left;
        //var smallBlueYpos = smallBluePosition.top;
        //
        //var shipsBlueSmall = $("#ships-blue-small");
        //var shipsBlueSmallPosition = shipsBlueSmall.position();
        //var shipsBlueSmallXpos = shipsBlueSmallPosition.left;
        //var shipsBlueSmallYpos = shipsBlueSmallPosition.top;
        //
        //var boosterBlueLargeF1 = $("#blue-ships #ship-blue-large .booster-f1");
        //boosterBlueLargeF1Position = boosterBlueLargeF1.position();
        //TweenMax.to(boosterBlueLargeF1, 1, {css:{opacity: 0.5, left: boosterBlueLargeF1Position.left, top: boosterBlueLargeF1Position.top}, ease:SlowMo.easeIn, repeat:-1, yoyo:true});
        //
        //var boosterBlueLargeF2 = $("#blue-ships #ship-blue-large .booster-f2");
        //boosterBlueLargeF2Position = boosterBlueLargeF2.position();
        //TweenMax.to(boosterBlueLargeF2, 0.1, {css:{opacity: 0, left: boosterBlueLargeF2Position.left, top: boosterBlueLargeF2Position.top}, ease:SlowMo.easeIn, repeat:-1, yoyo:true});
        //
        //var boosterBlueMediumF1 = $("#blue-ships #ship-blue-medium .booster-f1");
        //boosterBlueMediumF1Position = boosterBlueMediumF1.position();
        //TweenMax.to(boosterBlueMediumF1, 1, {css:{opacity: 0.5, left: boosterBlueMediumF1Position.left, top: boosterBlueMediumF1Position.top}, ease:SlowMo.easeIn, repeat:-1, yoyo:true});
        //
        //var boosterBlueMediumF2 = $("#blue-ships #ship-blue-medium .booster-f2");
        //boosterBlueMediumF2Position = boosterBlueMediumF2.position();
        //TweenMax.to(boosterBlueMediumF2, 0.1, {css:{opacity: 0, left: boosterBlueMediumF2Position.left, top: boosterBlueMediumF2Position.top}, ease:SlowMo.easeIn, repeat:-1, yoyo:true});
        //
        //var boosterBlueSmallF1 = $("#blue-ships #ship-blue-small .booster-f1");
        //boosterBlueSmallF1Position = boosterBlueSmallF1.position();
        //TweenMax.to(boosterBlueSmallF1, 2, {css:{opacity: 0.1, left: boosterBlueSmallF1Position.left, top: boosterBlueSmallF1Position.top}, ease:SlowMo.easeIn, repeat:-1, yoyo:true});
        //
        //var boosterBlueSmallF2 = $("#blue-ships #ship-blue-small .booster-f2");
        //boosterBlueSmallF2Position = boosterBlueSmallF2.position();
        //TweenMax.to(boosterBlueSmallF2, 0.1, {css:{opacity: 0, left: boosterBlueSmallF2Position.left, top: boosterBlueSmallF2Position.top}, ease:SlowMo.easeIn, repeat:-1, yoyo:true});
        //
        //var t1B = new TimelineMax({repeat:-1, yoyo:true});
        //
        //t1B.to(shipBlueLarge, 10, {css:{left:largeBlueXpos+5, top:largeBlueYpos-10}, ease:Power0.easeIn});
        //t1B.to(shipBlueLarge, 10, {css:{left:largeBlueXpos, top:largeBlueYpos}, ease:Power0.easeInOut});
        //
        //var t2B = new TimelineMax({repeat:-1, yoyo:true});
        //
        //t2B.to(shipBlueMedium, 10, {css:{left:mediumBlueXpos+7, top:mediumBlueYpos-15}, ease:Power0.easeIn});
        //t2B.to(shipBlueMedium, 10, {css:{left:mediumBlueXpos, top:mediumBlueYpos}, ease:Power0.easeInOut});
        //
        //var t3B = new TimelineMax({repeat:-1, yoyo:true});
        //
        //t3B.to(shipBlueSmall, 10, {css:{left:smallBlueXpos+30, top:smallBlueYpos-13}, ease:Power0.easeIn});
        //t3B.to(shipBlueSmall, 10, {css:{left:smallBlueXpos, top:smallBlueYpos}, ease:Power0.easeIn});
        //
        //
        //var tSB = new TimelineMax({repeat:-1, yoyo:true});
        //tSB.to(shipsBlueSmall, 10, {css:{scale: 0.90}, ease:Linear.easeNone});

        ////pre loader animation
        //var formPreloader = $("#form-preloader");
        //TweenMax.to(formPreloader, 1, { css:{rotation: 360}, ease:Linear.easeNone, repeat:-1});



});

 // smooth mouse wheel scroller
$(function () {

    var top = 0,
        step = 55,
        viewport = $(window).height(),
        body = $.browser.webkit ? $('body') : $('html'),
        wheel = false;

    $(body).mousewheel(function(event, delta) {

        wheel = true;

        if (delta < 0) {

            top = (top+viewport) >= $(document).height() ? top : top+=step;

            body.stop().animate({scrollTop: top}, 300, function () {
                wheel = false;
            });
        } else {

            top = top <= 0 ? 0 : top-=step;

            body.stop().animate({scrollTop: top}, 300, function () {
                wheel = false;
            });
        }

        return false;
    });

    $(window).on('resize', function (e) {
        viewport = $(this).height();
    });

    $(window).on('scroll', function (e) {
        if (!wheel) {
            top = $(this).scrollTop();
        }

    });

});