(function($) {

	"use strict";

	/* ----------------------------------------------------------- */
	/*  FUNCTION TO STOP LOCAL AND YOUTUBE VIDEOS IN SLIDESHOW
    /* ----------------------------------------------------------- */

	function stop_videos() {
		var video = document.getElementById("video");
		if (video.paused !== true && video.ended !== true) {
			video.pause();
		}
		$('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
	}
	/* -------------------------------------------------------------- */
	 /* function to alert email sent
	/* -------------------------------------------------------------- */
	function emailAlert () {
			$(".form-inputs").css("display", "none");
			$(".box p").css("display", "none");
			$(".contactform").find(".output_message").addClass("success");
			$(".output_message").text("Message Sent!");
			document.contact.reset()
	}
	/* -------------------------------------------------------------- */
	 /* encode
	/* -------------------------------------------------------------- */
	function encode (data) {
		return Object.keys(data)
			.map(
				key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
			)
			.join("&");
	}

	$(document).ready(function() {

		/* ----------------------------------------------------------- */
		/*  STOP VIDEOS
        /* ----------------------------------------------------------- */

		$('.slideshow nav span').on('click', function () {
			stop_videos();
		});

		/* ----------------------------------------------------------- */
		/*  FIX REVEALATOR ISSUE AFTER PAGE LOADED
        /* ----------------------------------------------------------- */

		$(".revealator-delay1").addClass('no-transform');

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO GALLERY
        /* ----------------------------------------------------------- */

		if ($('.grid').length) {
			new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
		}

		/* ----------------------------------------------------------- */
		/*  BUTTONS ANIMATION
        /* ----------------------------------------------------------- */
		function checkSize() {
			if ($( document ).width() > 992) {
				var btn_hover = "";
				$(".btn").each(function() {
					var btn_text = $(this).text();
					$(this).addClass(btn_hover).empty().append("<span data-hover='" + btn_text + "'>" + btn_text + "</span>");
				});
			}
		}
		checkSize();
		window.addEventListener('resize', function () {
			checkSize();
		});

		/* ----------------------------------------------------------- */
		/*  HIDE HEADER WHEN PORTFOLIO SLIDESHOW OPENED
        /* ----------------------------------------------------------- */

		$(".grid figure").on('click', function() {
			$("#navbar-collapse-toggle").addClass('hide-header');
		});

		/* ----------------------------------------------------------- */
		/*  SHOW HEADER WHEN PORTFOLIO SLIDESHOW CLOSED
        /* ----------------------------------------------------------- */

		$(".nav-close").on('click', function() {
			$("#navbar-collapse-toggle").removeClass('hide-header');
		});
		$(".nav-prev").on('click', function() {
			if ($('.slideshow ul li:first-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});
		$(".nav-next").on('click', function() {
			if ($('.slideshow ul li:last-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO DIRECTION AWARE HOVER EFFECT
        /* ----------------------------------------------------------- */

		var item = $(".grid li figure");
		var elementsLength = item.length;
		for (var i = 0; i < elementsLength; i++) {
			$(item[i]).hoverdir();
		}

		/* ----------------------------------------------------------- */
		/*  AJAX CONTACT FORM
        /* ----------------------------------------------------------- */

		$(".contactform").on("submit", function() {
			$(".output_message").text("Sending...");

			let form = {}
			form.name = document.getElementById("name").value
			form.email = document.getElementById("email").value
			form.subject = document.getElementById("subject").value
			form.message = document.getElementById("message").value
			fetch('/', {
				method: 'post',
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: encode({
					'form-name': 'contact',
					...form
					})
				}).then(() => {
					emailAlert()
			})
			// $(".form-inputs").css("display", "none");
			// $(".box p").css("display", "none");
			// $(".contactform").find(".output_message").addClass("success");
			// $(".output_message").text("Message Sent!");
			// setTimeout(emailAlert, 1000)
			// console.log(form);
			// $.ajax({
			// 	url: form.attr("action"),
			// 	method: form.attr("method"),
			// 	data: form.serialize(),
			// 	success: function(result) {
			// 		if (result == "success") {
			// 			$(".form-inputs").css("display", "none");
			// 			$(".box p").css("display", "none");
			// 			$(".contactform").find(".output_message").addClass("success");
			// 			$(".output_message").text("Message Sent!");
			// 		} else {
			// 			$(".tabs-container").css("height", "440px");

			// 			$(".contactform").find(".output_message").addClass("error");
			// 			$(".output_message").text("Error Sending!");
			// 		}
			// 	}
			// });

			return false;
		});

	});

	$(document).keyup(function(e) {

		/* ----------------------------------------------------------- */
		/*  KEYBOARD NAVIGATION IN PORTFOLIO SLIDESHOW
        /* ----------------------------------------------------------- */
		if (e.keyCode === 27) {
			stop_videos();
			$('.close-content').click();
			$("#navbar-collapse-toggle").removeClass('hide-header');
		}
		if ((e.keyCode === 37) || (e.keyCode === 39)) {
			stop_videos();
		}
	});


})(jQuery);
