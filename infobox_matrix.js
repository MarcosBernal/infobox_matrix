// When DOM has been loaded the function is triggered
$(document).ready(function() {
    var speed = 100;
    $("._infobox").on("mouseenter", function () {
        var default_size = $(this).css("--inside-box-dim").replace('%', '') / 100;
        var default_size_value = default_size * $(this).width()*0.8;

        $(this).children().children("._topbar_inside_box").stop().animate(
            {left: $(this).parent("._inside_box").width() - $(this).width()}, speed, function () {
                $(this).animate({width: $("._inside_box").width(), left: 0}, speed * 2)
            });
        $(this).children().children("._rightbar_inside_box").stop().animate(
            {top: $(this).parent("._inside_box").height() - $(this).height()}, speed, function () {
                $(this).animate({height: $(this).parent("._inside_box").height(), top: 0}, speed * 2)
            });
        $(this).children().children("._bottombar_inside_box").stop().animate({left: 0}, speed, function () {
            $(this).animate({width: $(this).parent("._inside_box").width()}, speed * 2)
        });
        $(this).children().children("._leftbar_inside_box").stop().animate({top: 0}, speed, function () {
            $(this).animate({height: $(this).parent("._inside_box").height()}, speed * 2)
        });
    });

    $("._infobox").on("mouseleave", function () {
        var default_size = $(this).css("--inside-box-dim").replace('%', '') / 100;
        var default_size_value = default_size * $(this).width()*0.8;
        var default_size_inverse = ((1 - default_size) * $(this).width()*0.8) / 2;

        $(this).children().children("._topbar_inside_box").stop().animate({
            width: default_size_value,
            left: default_size_inverse
        }, speed * 2);
        $(this).children().children("._rightbar_inside_box").stop().animate({
            height: default_size_value,
            top: default_size_inverse
        }, speed * 2);
        $(this).children().children("._bottombar_inside_box").stop().animate({
            width: default_size_value,
            left: default_size_inverse
        }, speed * 2);
        $(this).children().children("._leftbar_inside_box").stop().animate({
            height: default_size_value,
            top: default_size_inverse
        }, speed * 2);
    });
});