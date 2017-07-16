// ONLOAD
$(function () {
		// Set min container height
		//$('#main').css({'min-height': $(window).height() } );
		// Set the height of the div with the "/'s"
		var mainHeight = parseFloat($('#main').css('height')) + 60;
  	var projHeight = parseFloat($('#project-top').css('height')) + mainHeight;
		//$('.slashes').css({'height': mainHeight});
    //$('.project-slashes').css({'height': projHeight });

    // Populate slashes
    $('.slashes').each(
        function() {
            $(this).html('<span class="hover-colour">/</span>'.repeat(5000));
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

    // cycle color of headers
    $("#home-pic").hover(
        function() { startChangingColor(this); },
        function() { stopChangingColor(this); }
    );
    $("#projects-pic").hover(
        function() { startChangingColor(this); },
        function() { stopChangingColor(this); }
    );
    $("#contact-pic").hover(
        function() { startChangingColor(this); },
        function() { stopChangingColor(this); }
    );
    $("#project-pic").hover(
        function() { startChangingColor(this); },
        function() { stopChangingColor(this); }
    );


    // Hover over project
    $(".project-cover").hover(
        function() {
            var color = getRandomColour();
            $(this).parent().parent().css({"border-color": color});
            $(this).next().css({"background-color": color});
        },
        function() {
            $(this).parent().parent().css({"border-color": "#444"});
            $(this).next().css({"background-color": "#444"});
        }
    );

    // Set the height of the div with the "/'s"
    var mainHeight = parseFloat($('#main').css('height')) + 60;
    var projHeight = parseFloat($('#project-top').css('height')) + mainHeight;
    $('.slashes').css({'height': mainHeight});
    $('.project-slashes').css({'height': projHeight });

});

// Returns random colour string
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

// Cycle icon colour randomly on hover
var del_r = 0;
var del_g = 0;
var del_b = 0;

function changeColor(identifier) {
    // Get base 10 numbers for r/g/b from colour string
    var oldColorString = $(identifier).css('background-color').split(",");
    var r = parseInt(oldColorString[0].split("(")[1]);
    var g = parseInt(oldColorString[1]);
    var b = parseInt(oldColorString[2].split(")")[0]);

    // Change the direction of the color change vector
    del_r += Math.floor(Math.random() * 10 - 5);
    if (del_r > 20) { del_r = 20; }
    if (del_r < -20) { del_r = -20; }
    del_g += Math.floor(Math.random() * 10 - 5);
    if (del_g > 20) { del_g = 20; }
    if (del_g < -20) { del_g = -20; }
    del_b += Math.floor(Math.random() * 10 - 5);
    if (del_b > 20) { del_b = 20; }
    if (del_b < -20) { del_b = -20; }

    // Change the color
    r += del_r;
    g += del_g;
    b += del_b;
    if (r > 255) {
        r = 255;
        del_r = -5;
    }
    if (r < 0) {
        r = 0;
        del_r = 5;
    }
    if (g > 255) {
        g = 255;
        del_g = -5;
    }
    if (g < 0) {
        g = 0;
        del_g = 5;
    }
    if (b > 255) {
        b = 255;
        del_b = -5;
    }
    if (b < 0) {
        b = 0;
        del_b = 5;
    }
    /*
    console.log(r);
    console.log(g);
    console.log(b);
    */

    // Convert numbers back into a hex color string
    var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    $(identifier).css({ 'background-color': color });
}

var timer;
function startChangingColor(thing) {
    timer = setInterval(
        function() {
            changeColor('#' + thing.id);
        },
        55
    );
}

function stopChangingColor(thing) {
    clearInterval(timer);
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
