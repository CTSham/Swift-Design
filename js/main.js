$(document).ready(function () {
    'use strict';

	//********* page loader js

	$('.loader_bg').fadeToggle();


	//********** menu background color change while scroll

	$(window).on('scroll', function () {
		var menu_area = $('.nav-area');
		if ($(window).scrollTop() > 200) {
			menu_area.addClass('sticky_navigation');
		} else {
			menu_area.removeClass('sticky_navigation');
		}
	});


	//********** menu hides after click (mobile menu)

	$(document).on('click', '.navbar-collapse.in', function (e) {
		if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
			$(this).collapse('hide');
		}
	});


	//*********** scrollspy js

	$('body').scrollspy({
		target: '.navbar-collapse',
		offset: 195
	});


	//************ smooth scroll js

	$('a.smooth-menu,a.custom-btn,a.banner-btn').on("click", function (e) {
		e.preventDefault();
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top - 50
		}, 1000);
	});

	//*********** Animated headline js

	$('.animate-scale').animatedHeadline({
		animationType: 'clip',
		animationDelay: 6500,      // was 4000; increase for slower word change
		barAnimationDelay: 7800,   // keep ~+1300ms over animationDelay
		typeAnimationDelay: 3500,   // spacing before next cycle (if other types used)
		revealAnimationDelay: 3900  // reveal timing aligned with longer delay
	});

	//***** Skill bar js

	var skillbar = $(".skillbar");

	skillbar.waypoint(function () {
		skillbar.each(function () {
			$(this).find(".skillbar-child").animate({
				width: $(this).data("percent")
			}, 1000);
		});
	}, {
		offset: "80%"
	});

	//*** wow js

	new WOW().init();

	//*** Services carousel

	$("#services-carousel").owlCarousel({
		navigation: false,
		pagination: true,
		slideSpeed: 800,
		paginationSpeed: 800,
		smartSpeed: 500,
		autoplay: true,
		singleItem: true,
		loop: true,
		responsive:{
			0:{
				items:1
			},
			680:{
				items:2
			},
			1000:{
				items:3
			}
		}
	});

	//*****Counter up js


	$('.counter').counterUp({
		delay: 50,
		time: 8000
	});

	//*****Magnific Pop up js

	$('#inline-popups-1,#inline-popups-2,#inline-popups-3,#inline-popups-4,#inline-popups-5,#inline-popups-6').magnificPopup({
		delegate: 'a',
		removalDelay: 400, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function() {
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		midClick: true
	});
	
	//**** testimonial carousel

	$("#testimonial-carousel").owlCarousel({
		navigation: false,
		pagination: true,
		slideSpeed: 800,
		paginationSpeed: 800,
		smartSpeed: 500,
		autoplay: true,
		singleItem: true,
		loop: true,
		responsive:{
			0:{
				items:1
			},
			680:{
				items:1
			},
			1000:{
				items:1
			}
		}
	});

	//***********YTplayer js

	$('.video-bg').mb_YTPlayer({
		showControls:false,
		autoPlay:true,
		loop:true,
		mute:true,
		startAt:0,
		opacity:1,
		quality:'default'
	});

	// Progressive about portrait handling
	var portrait = document.querySelector('.about-portrait');
	if (portrait) {
		portrait.classList.add('loading');
		if (portrait.complete) {
			portrait.classList.remove('loading');
			portrait.classList.add('loaded');
		} else {
			portrait.addEventListener('load', function(){
				portrait.classList.remove('loading');
				portrait.classList.add('loaded');
			});
			portrait.addEventListener('error', function(){
				portrait.classList.remove('loading');
				portrait.style.background = '#ccc';
			});
		}
	}


});
