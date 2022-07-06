$(document).ready(function () {
    $('.option').click(function () {
        $('.option').removeClass('active');
        $(this).addClass('active');
    });

    for (let i = 0; i < 60; i++) {
        const clone = $('.option').eq(i).clone(true);

        clone.appendTo('.options');
    }
    let htmlWidth = $('html').width();

    function translateOptions() {
        if (htmlWidth > 940) {
            $('.option').click(() => {
                let activeIndex = $('.option.active').index();
                $('.options').css({
                    transform: `translateX(-${activeIndex * 80 + -150}px)`,
                });
            });
        } else if (htmlWidth < 940) {
            $('.option').click(() => {
                let activeIndex = $('.option.active').index();

                $('.options').css({
                    transform: `translateX(-${activeIndex * 60 + -60}px)`,
                });
            });
        }
    }

    translateOptions();

    let timer = null;
    let sec = 500;

    $(window).resize(() => {
        //
        clearTimeout(timer);
        timer = setTimeout(() => {
            htmlWidth = $('html').width();
            translateOptions();
        }, sec);

        setTimeout(() => {
            let activeLeft = $('.option.active').offset().left;

            let optionsTransformValue = $('.options')
                .css('transform')
                .replace(/[^0-9\-.,]/g, '')
                .split(',')[4];

            if (htmlWidth > 940) {
                $('.options').css({
                    transform: `translateX(${
                        +optionsTransformValue -
                        (activeLeft + 300 - htmlWidth / 2)
                    }px)`,
                });
            } else if (htmlWidth < 940) {
                $('.options').css({
                    transform: `translateX(${
                        +optionsTransformValue -
                        (activeLeft + 220 - htmlWidth / 2)
                    }px)`,
                });
            }
        }, 600);
    });

    $('.options').css({
        transform: `translateX(-2550px)`,
    });
});

$(function () {
    $('body').swipe({
        swipeStatus: function (event, phase, direction, distance) {
            console.log(phase);
            if (direction == 'left') {
                let optionsTransformValue = $('.options')
                    .css('transform')
                    .replace(/[^0-9\-.,]/g, '')
                    .split(',')[4];

                $('.options').css({
                    transform: `translateX(${
                        +optionsTransformValue - distance
                    }px)`,
                });
                threshold: 0;
            } else if (direction == 'right') {
                let optionsTransformValue = $('.options')
                    .css('transform')
                    .replace(/[^0-9\-.,]/g, '')
                    .split(',')[4];

                $('.options').css({
                    transform: `translateX(${
                        +optionsTransformValue + distance
                    }px)`,
                });
                threshold: 0;
            }
        },
        allowPageScroll: 'horizontal',
    });
});
