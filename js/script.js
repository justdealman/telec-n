'use strict';

(function (root) {

	function mainSlider() {
		var slider = $('[data-slider="main"]');

		$(slider).find('.slider__slides').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: $(slider).find('.arrow_prev'),
			nextArrow: $(slider).find('.arrow_next'),
			dots: true
		});
	}

	function catalogSlider() {
		var slider = $('[data-slider="catalog"]');

		$(slider).find('.slider__slides').slick({
			slidesToScroll: 1,
			variableWidth: true,
			prevArrow: $(slider).find('.arrow_prev'),
			nextArrow: $(slider).find('.arrow_next'),
			infinite: false

		});
	}

	function followSlider() {
		var slider = $('[data-slider="follow"]');

		$(slider).find('.slider__slides').slick({
			slidesToScroll: 1,
			variableWidth: true,
			prevArrow: $(slider).find('.arrow_prev'),
			nextArrow: $(slider).find('.arrow_next'),
			infinite: false,
			draggable: false,
			responsive: [{
				breakpoint: 768,
				settings: {
					centerMode: true
				}
			}, {
				breakpoint: 500,
				settings: {
					arrows: false,
					centerMode: true
				}
			}]
		});

		$(slider).on('beforeChange', function (e, slick, currentSlide, nextSlide) {
			if ($(window).width() <= 768) return;

			var slide = $(slider).find('.slick-slide').get(nextSlide),
			    next = currentSlide < nextSlide;

			$(slider).find('.slick-slide').css('opacity', 1);
			$(slide).prevAll().css('opacity', 0);
		});
	}

	function adaptiveSlider() {
		var w = $(window).width();

		if (w <= 1000) {
			$('.catalog__items_index').slick({
				arrows: false,
				variableWidth: true
			});
		}
	}

	adaptiveSlider();

	mainSlider();
	catalogSlider();
	followSlider();

	$('.tab').on('click', function (e) {
		e.preventDefault();

		var tabs = $(this).closest('.tabs'),
		    index = $(this).index(),
		    content = $(tabs).find('.tab-content').get(index);

		$(tabs).find('.tab_active').removeClass('tab_active');
		$(this).addClass('tab_active');

		$(tabs).find('.tab-content').hide();
		$(content).show();
	});

	$('.tabs').each(function (i, tabs) {
		$(tabs).find('.tab').first().trigger('click');
	});

	$('.filter__toggle .toggle__content').each(function (i, content) {
		var h = $(content).height();

		if (h >= 200) $(content).attr('data-simplebar', '');
	});

	$('[data-simplebar]').each(function (i, bar) {
		new SimpleBar(bar);
	});

	$('.toggle__title').on('click', function (e) {
		e.preventDefault();

		$(this).closest('.toggle').toggleClass('toggle_close').find('.toggle__content').stop().slideToggle();
	});

	$('.field__edit').on('click', function (e) {
		e.preventDefault();

		$(this).hide().closest('.field').removeClass('field_disable').find('input').focus();
	});

	$('.field__show').on('click', function (e) {
		e.preventDefault();

		var field = $(this).closest('.field');

		$(field).toggleClass('field_show');

		console.log($(field).hasClass('field_show'));

		if ($(field).hasClass('field_show')) {
			$(field).find('input').attr('type', 'text');
		} else {
			$(field).find('input').attr('type', 'password');
		}
	});

	// Карта

	var dataMap = {
		0: {
			coords: [55.76, 37.64]
		},

		1: {
			coords: [45.76, 39.64]

		}
	};

	$('[data-map]').each(function (i, map) {
		var city = dataMap[$(map).data('map')],
		    placemarks = [];

		var content = $(map).closest('.map');

		$(content).find('.map__item').each(function (i, item) {
			var coords = String($(item).data('coords')).split(',');

			placemarks.push(coords);
		});

		ymaps.ready(init);
		var myMap, myPlacemark;

		function init() {
			myMap = new ymaps.Map(map, {
				center: city.coords,
				zoom: 7
			});

			$(placemarks).each(function (i, place) {
				myPlacemark = new ymaps.Placemark(place, {
					hintContent: 'Москва!',
					balloonContent: 'Столица России'
				});

				myMap.geoObjects.add(myPlacemark);
			});
		}

		$('.map__item').on('click', function (e) {
			e.preventDefault();

			var coords = $(this).data('coords').split(',');

			$(this).parent().find('.map__item_active').removeClass('map__item_active');
			$(this).addClass('map__item_active');

			myMap.setCenter(coords);
		});
	});
})(window);