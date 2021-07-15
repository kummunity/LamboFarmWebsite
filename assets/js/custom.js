(function ($) {

    "use strict";

    // Page Ready






    // Scroll animation init
    window.sr = new scrollReveal();


    // Home number counterup
    if ($('.count-item').length) {
        $('.count-item strong').counterUp({
            delay: 10,
            time: 1000
        });
    }


    // App single gallery
    if ($('.gallery').length && $('.gallery-item').length) {
        $('.gallery-item').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
            }
        });
    }


    // Page standard gallery
    if ($('.page-gallery').length && $('.page-gallery-wrapper').length) {
        $('.page-gallery').imgfix({
            scale: 1.1
        });

        $('.page-gallery').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
            }
        });
    }


    // Blog cover image
    if ($('.blog-post-thumb').length) {
        $('.blog-post-thumb .img').imgfix();
    }



    // Page loading animation
    $(window).on('load', function () {
        if ($('.cover').length) {
            $('.cover').parallax({
                imageSrc: $('.cover').data('image'),
                zIndex: '1'
            });
        }

        $(".loader-wrapper").animate({
            'opacity': '0'
        }, 600, function () {
            setTimeout(function () {
                // Parallax init
                if ($('.parallax').length) {
                    $('.parallax').parallax({
                        imageSrc: 'assets/images/flokibg.jpg',
                        zIndex: '1'
                    });
                }
                $(".loader-wrapper").css("visibility", "hidden").fadeOut();
            }, 300);
        });
    });

})(window.jQuery);