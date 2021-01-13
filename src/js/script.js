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

    // Product Tabs Toggle
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content')
            .removeClass('catalog__content_active').eq($(this).index())
            .addClass('catalog__content_active');
    });

    // Expand MORE product info
    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modals toggle
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    })
    // Close modals
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    })

    // Buy action
    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    })

    // Form validation
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: 'Please specify your name',
                    minLength: jQuery.validator.format('At least {0} characters required!')
                },
                phone: 'Please specify your phone number',
                email: {
                    required: 'Please specify your email address',
                    email: 'Your email address must be in the format of name@domain.com'
                }
            }
        });
    }

    validateForms('#consultation-form');
    validateForms('#order form');
    validateForms('#consultation form');

    // Mask for phone number
    $('input[name=phone]').mask("+38 (999) 999-99-99");

    // Form proceeding
    $('form').submit(function(e) {
       e.preventDefault();
       $.ajax({
           type: "POST",
           url: "mailer/smart.php",
           data: $(this).serialize()
       }).done(function() {
           $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

           $('form').trigger('reset');
       });
       return false;
    });

    // Show/hide pageup button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    })

    // Smooth scroll to top
    $("a[href^='#']").click(function() {
        const _href = $(this).attr('href');
        $('html, body').animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    })
});
