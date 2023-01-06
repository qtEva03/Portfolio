$(document).ready(function() {
    // On reload
    $(window).on('beforeunload', function() {
        $(this).scrollTop(0); 
    });

    // Button explore click
    $(".btn-explore").click(function() {
        $("html, body").animate({
            scrollTop: $("#explore").offset().top
        }, 500);
    });

    // Button group click
    let clicked = false; 

    function buttonClick(button, section, top) {
        $(button).click(function() {
            $(".btn").removeClass("btn-clicked");
            $(this).addClass("btn-clicked");
            
            $(".border").animate({
                top: top
            }, 300);

            clicked = true;
            $("html, body").animate({
                scrollTop: $(section).offset().top
            }, 500);
            $("html, body").promise().done(function() { clicked = false; });
        });
    }

    buttonClick(".btn:first-child", "#about-me", 0);
    buttonClick(".btn:nth-child(2)", "#projects", 50);
    buttonClick(".btn:nth-child(3)", "#certifications", 100);

    // Scrolling
    $(".btn-group").hide();

    let flag = true;

    $(window).scroll(function() {
        const scrollPos = $(this).scrollTop();
        const windowWidth = $(this).width();
        const windowHeight = $(this).height();

        if(scrollPos >= windowHeight) {
            $(".btn-group").show("slide", { direction: "up" }, 300);

            if (!clicked) {
                if (scrollPos < (windowHeight * 2)) {
                    $(".btn").removeClass("btn-clicked");
                    $(".btn:first-child").addClass("btn-clicked");
                    $(".border").css("top", "0px");
                } else if (scrollPos >= (windowHeight * 3)) {
                    $(".btn").removeClass("btn-clicked");
                    $(".btn:nth-child(3)").addClass("btn-clicked");
                    $(".border").css("top", "100px");
                } else {
                    $(".btn").removeClass("btn-clicked");
                    $(".btn:nth-child(2)").addClass("btn-clicked");
                    $(".border").css("top", "50px");
                }
            } 
        } else {
            $(".btn-group").hide("slide", { direction: "up" }, 300);

            if (scrollPos !== 0 && flag) {
                $(".social-list").stop().animate({
                    right: "2.5%"
                }, 300);
                flag = false;
            } else if (scrollPos === 0 && !flag) {
                $(".social-list").stop().animate({
                    right: (windowWidth / 2) - ($(".social-list").width() / 2),
                }, 300);
                flag = true;
            }
        }
    });

    $(window).resize(function() {
        if ($(this).scrollTop() === 0) 
            $(".social-list").removeAttr("style");
    });
});