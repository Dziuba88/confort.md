// GLOBALS
var navText = [
  '<svg class="icon"><use xlink:href="assets/img/sprite.svg?#prev"></use></svg>',
  '<svg class="icon"><use xlink:href="assets/img/sprite.svg?#next"></use></svg>',
];
$('[data-background]').each(function (index, item) {
  var image = $(item).data('background');
  $(item).css({
    'background': 'url(' + image + ') center center no-repeat',
    'background-size': 'cover',
  });
});

// PRELOADER
$(document).ready(function () {
  setTimeout(() => {
    $('body').addClass('loading');
    $('.preloader').fadeOut(750);
  }, 1000);
  setTimeout(() => {
    $('body').removeClass('loading');
    $('body').addClass('loaded');
    AOS.init({
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      debounceDelay: 250, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 250, // the delay on throttle used while scrolling the page (advanced)
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 100, // offset (in px) from the original trigger point
      delay: 50, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: 'ease-in-out', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: true, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
  }, 2500);
});

// HEADER SCRIPT
(function () {
  var prevScrollpos = window.pageYOffset;
  var header = document.querySelector('.confort__header');

  prevScrollpos == 0 ? (header.style.top = '0') : (header.style.top = '-140px');

  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    prevScrollpos > currentScrollPos
      ? (header.style.top = '0')
      : (header.style.top = '-140px');
    prevScrollpos = currentScrollPos;

    if (window.matchMedia('screen and (max-width: 1000px)').matches) {
      $('.confort__header .mainline').fadeOut(250);
      $('.nav__toogle').removeClass('active');
    }
    $('.searchline .lifesearch').fadeOut(250);
  };

  var subcategories = $('.bottomline__carousel .owl-carousel');
  subcategories.owlCarousel({
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    items: 1,
    margin: 0,
    smartSpeed: 700,
    loop: false,
    dots: false,
    mouseDrag: false,
    touchDrag: false,
    freeDrag: false,
  });

  $('.bottomline').hide();

  $('.bottomline__nav ul a').each(function (index) {
    $(this).mouseenter(function () {
      subcategories.trigger('to.owl.carousel', [index, 500, true]);
    });
  });

  $('[ data-show="submenu"]').mouseenter(function () {
    if (window.matchMedia('screen and (max-width: 1000px)').matches) {
      return false;
    }
    $(this).parent('li').addClass('current');
    $('.bottomline').fadeIn(250);
  });

  $('.confort__header').mouseleave(function () {
    $('[ data-show="submenu"]').parent('li').removeClass('current');
    $('.bottomline').fadeOut(250);
  });

  $('.nav__toogle').click(function () {
    $(this).toggleClass('active');
    $('.confort__header .mainline').fadeToggle(250);
  });

  $('[data-close=search]').click(function () {
    $('.searchline').fadeOut(250);
  });

  $('[data-show=search]').click(function (e) {
    e.preventDefault();
    $('.searchline').fadeIn(250);
    setTimeout(() => {
      $('.searchline input').focus();
    }, 250);
  });
  $('.searchline input').focus(function () {
    $('.searchline .lifesearch').fadeIn(250);
  });
  $('.searchline input').blur(function () {
    $('.searchline .lifesearch').fadeOut(250);
  });
})();

// CAROUSELS
(function () {
  $(window).scroll(function () {
    var scrollTop = $(this).scrollTop();

    $('.welcome__slider').css({
      opacity: function () {
        var elementHeight = $(this).height() - 40;
        return 0 + (elementHeight - scrollTop) / elementHeight;
      },
    });

    $('.page__intro').css({
      opacity: function () {
        var elementHeight = $(this).height();
        return 0 + (elementHeight - scrollTop) / elementHeight;
      },
    });
  });

  $('.welcome__slider').owlCarousel({
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    items: 1,
    margin: 0,
    smartSpeed: 700,
    loop: true,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
  });
})();

// CREDIT MODAL
(function () {
  $('.partner .btn').magnificPopup({
    type: 'inline',
    fixedBgPos: true,
    //fixedContentPos: true,
    overflowY: 'scroll',
  });
})();

// CONTACT PAGE
(function () {
  var setRegion = function (region) {
    if (region == 'all') {
      $('[data-region="all"]').addClass('active');
      $('[data-contact]').fadeIn(250);
    } else {
      $('[data-contact]').each(function (index, element) {
        if ($(element).data('contact') == region) {
          $(element).fadeIn(250);
        } else {
          $(element).fadeOut(250);
        }
      });
    }
  };

  if ($('.contacts__tabs .active').length) {
    setRegion($('.contacts__tabs .active').data('region'));
  } else {
    setRegion('all');
  }

  $('[data-region]').click(function (e) {
    if ($(this).hasClass('active')) {
      return false;
    }
    $('[data-region]').removeClass('active');
    $(this).addClass('active');
    setRegion($(this).data('region'));
  });

  var createMap = function () {
    var mapStyle = [
      {
        featureType: 'all',
        elementType: 'all',
        stylers: [{ 'saturation': -100 }, { 'lightness': -20 }],
      },
    ];

    var mapContainer = document.querySelector('#map');

    var map_location = [mapContainer.dataset.lat, mapContainer.dataset.lng];

    if (mapContainer) {
      var map = new google.maps.Map(mapContainer, {
        zoom: parseInt(mapContainer.dataset.scale, 10),
        center: new google.maps.LatLng(map_location[0], map_location[1]),
        disableDefaultUI: true,
        styles: mapStyle,
      });

      var map_marker = new google.maps.Marker({
        position: new google.maps.LatLng(map_location[0], map_location[1]),
        map: map,
        icon: {
          url: 'assets/img/marker.svg',
          scaledSize: new google.maps.Size(48, 48),
        },
      });

      window.addEventListener('resize', function () {
        window.setTimeout(function () {
          map.panTo(map_marker.getPosition());
        }, 250);
      });
    }
  };

  $('[data-contact] .btn').magnificPopup({
    type: 'inline',
    fixedBgPos: true,
    //fixedContentPos: true,
    overflowY: 'scroll',
    callbacks: {
      open: function () {
        createMap();
      },
    },
  });
})();

// CHECKOUT PAGE
(function () {
  $('select').selectric();
  $('.promo .form__input input').keyup(function (e) {
    $(this).parent('.form__input').find('button').fadeIn(250);
  });
  $('.promo .form__input button').click(function (e) {
    $(this).parent('.form__input').find('input').val('').change();
    $(this).fadeOut(250);
  });
  $('#delivery_1').change(function () {
    if ($(this).is(':checked')) {
      $('.delivery__address').fadeIn(150);
      $('.delivery__total span').text($(this).val());
    }
  });
  $('#delivery_2').change(function () {
    if ($(this).is(':checked')) {
      $('.delivery__address').fadeOut(150);
      $('.delivery__total span').text($(this).val());
    }
  });

  $('#contact_type_1').change(function () {
    if ($(this).is(':checked')) {
      $('.contacts__more').fadeOut(150);
    }
  });
  $('#contact_type_2').change(function () {
    if ($(this).is(':checked')) {
      $('.contacts__more').fadeIn(150);
    }
  });
  $('#contact_type_1').change();

  $('.form__count .minus').click(function () {
    var $val = parseInt($(this).parent('.form__count').find('input').val());
    var $min = parseInt(
      $(this).parent('.form__count').find('input').attr('min')
    );
    if ($val > $min) {
      $(this)
        .parent('.form__count')
        .find('input')
        .val($val - 1)
        .change();
    }
  });

  $('.form__count .plus').click(function () {
    var $val = parseInt($(this).parent('.form__count').find('input').val());
    var $max = parseInt(
      $(this).parent('.form__count').find('input').attr('max')
    );
    if ($val < $max) {
      $(this)
        .parent('.form__count')
        .find('input')
        .val($val + 1)
        .change();
    }
  });

  $('.form__count input').change(function () {
    var $minus = $(this).parent('.form__count').find('.minus');
    var $plus = $(this).parent('.form__count').find('.plus');

    var $val = parseInt($(this).val()),
      $min = parseInt($(this).attr('min')),
      $max = parseInt($(this).attr('max'));

    $val > $min ? $minus.show() : $minus.hide();
    $val < $max ? $plus.show() : $plus.hide();
  });

  $('.form__count input').change();
})();
