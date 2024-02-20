var didScroll;
var lastScrollTop = 0;
var delta = 50;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $("#main-nav").removeClass('navbar-down').addClass('navbar-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $("#main-nav").removeClass('navbar-up').addClass('navbar-down');
        }
    }

    lastScrollTop = st;
}

function scrollToAnchor(aid) {
    var aTag = $("#"+ aid);
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

$(document).ready(function() {
    $(".link").click(function(event) {
        scrollToAnchor(event.target.href.split("#")[1]);
        return false;
    });
    $('#contact-us-form').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'A name is required'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message: 'Your name must be more than 2 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z\s]+$/,
                        message: 'Your name can only consist of alphabetical characters'
                    }
                }
            },
            // email: {
            //     validators: {
            //         notEmpty: {
            //             message: 'The email address is required'
            //         },
            //         emailAddress: {
            //             message: 'The input is not a valid email address'
            //         }
            //     }
            // },
            message: {
                validators: {
                    notEmpty: {
                        message: 'A message is required'
                    }
                }
            },
        }
    }).on('success.form.fv', function(e) {
        // Prevent default form submission
        e.preventDefault();
        var name = $(e.target).find('[name="name"]').val();
        var body = $(e.target).find('[name="message"]').val();
        location.href = 'mailto:' + encodeURIComponent("dean@sq.gy") +
                '?subject=' + encodeURIComponent(name + " | Sq.gy Contact Us Form") +
                '&body=' + encodeURIComponent(body);
    });
});
