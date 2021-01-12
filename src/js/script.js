$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../img/carousel/chevron-left-solid.png" ' +
            'alt=""></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../img/carousel/chevron-right-solid.png" ' +
            'alt=""></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
})
