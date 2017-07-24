// ONLOAD
$(function () {

  // Populate slashes
  $('.slashes').each(
    function() {
      $(this).html('<span class="hover-colour">/</span>'.repeat(10000));
    }
  );
  $('.squiggle').each(
    function() {
      $(this).html('<span class="hover-colour">~</span>'.repeat(5));
    }
  );

  // Set a random colour when you hover over something
  $('.hover-colour').each(
    function () {
      $(this).hover(
        function () {
          $(this).css({ 'color': getRandomColour()});
        }
      );
    }
  );

  // change highlight color
  $(document).mouseup(function(){
      var highlightedText = "";
      if (window.getSelection) {
          highlightedText = window.getSelection().toString();
      }
      else if (document.selection && document.selection.type != "Control") {
          highlightedText = document.selection.createRange().text;
      }
      if(highlightedText != "")
          // text highlighted
          var color = getRandomColour();
          $('head').append(
            '<style>::selection { background-color : ' + color + '; } ::-moz-selection { background-color : ' + color + '; }</style>'
          );
  });
  // also just start with one
  var color = getRandomColour();
  $('head').append(
    '<style>::selection { background-color : ' + color + '; } ::-moz-selection { background-color : ' + color + '; }</style>'
  );

  // temporary hover colour
  $('.nav-item').each(
    function () {
      $(this).hover(
        function () {
          $(this).css({ 'color': getRandomColour()});
        },
        function () {
          $(this).css({ 'color': '#444'});
        }
      )
    }
  );
  $('#contact-email').hover(
    function () {
      $(this).css({ 'color': getRandomColour()});
    },
    function () {
      $(this).css({ 'color': '#444'});
    }
  );

  // cycle color of headers
	$(".header-picture").each(
		function () {
			var timer; // used to continuously cycle color until mouse leaves
			var id = '#' + this.id;
			var title_id = '#' + $(this).next().attr('id');
			// generate a random 'direction' in color space to cycle colors
			var direction = new Array(3);
			del_r = Math.random();
			del_g = Math.random();
			del_b = Math.random();
			total = del_r + del_g + del_b;
			direction[0] = Math.floor(del_r * (10/total));
			direction[1] = Math.floor(del_g * (10/total));
			direction[2] = Math.floor(del_b * (10/total));

			$(this).hover(
				// on hover start
				function () {
			    // Get base 10 numbers for r/g/b from colour string
			    var oldColorString = $(id).css('background-color').split(",");
			    var r = parseInt(oldColorString[0].split("(")[1]);
			    var g = parseInt(oldColorString[1]);
			    var b = parseInt(oldColorString[2].split(")")[0]);
					var r_str, g_str, b_str, color
					// this will be called after every interval while in hover
			    timer = setInterval(
		        function() {
					    // Change the color
					    r += direction[0];
					    g += direction[1];
					    b += direction[2];

							// handle overflow
					    if (r > 255) {
					        r = 255;
									direction[0] = -direction[0];
					    }
							if (r < 0) {
					        r = 0;
									direction[0] = -direction[0];
					    }
					    if (g > 255) {
					        g = 255;
									direction[1] = -direction[1];
					    }
					    if (g < 0) {
					        g = 0;
									direction[1] = -direction[1];
					    }
					    if (b > 255) {
					        b = 255;
									direction[2] = -direction[2];
					    }
					    if (b < 0) {
					        b = 0;
									direction[2] = -direction[2];
					    }

					    // Convert numbers back into a hex color string and set color
							r_str = r.toString(16);
							if (r_str.length == 1) {
								r_str = "0" + r_str
							}
							g_str = g.toString(16);
							if (g_str.length == 1) {
								g_str = "0" + g_str
							}
							b_str = b.toString(16);
							if (b_str.length == 1) {
								b_str = "0" + b_str
							}
					    color = '#' + r_str + g_str + b_str;
							// set color
					    $(id).css({ 'background-color': color });
					    $(title_id).css({ 'color': color });

		        },
		        50 // color rate change constant
					)
				},
				// on hover end
				function () {
					clearInterval(timer);
				}
			)
		}
	);

  // Hover over project
  $(".project-selector").hover(
    function() {
      var color = getRandomColour();
      $(this).children().css({"border-color": color});
      $(this).children().children().css({
				"background-color": color,
				"filter": "none",
			 	"-webkit-filter": "grayscale(0)"
			});
    },
    function() {
      $(this).children().css({"border-color": "#444"});
      $(this).children().children().css({
				"background-color": "#444",
				"filter": "grayscale(1)",
				"-webkit-filter": "grayscale(1)"
			});
    }
  );

});

// Returns random colour string in the format "#xxxxxx"
function getRandomColour() {
    // characers used in hex colour schemes
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        // get a random character
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Smooth scrolling
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
