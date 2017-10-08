// When DOM has been loaded the function is triggered
$(document).ready(function() {
    var speed = 100;
    $("._infobox").on("mouseenter", function () {
        var default_size = $(this).css("--inside-box-dim").replace('%', '') / 100;
        var default_size_value = default_size * $(this).width()*0.8;

        $(this).children().children("._topbar_inside_box").stop().animate(
            {left: $(this).parent("._inside_box").width()-$(this).width()}, speed, function () {
                $(this).animate({width: $(this).parent("._inside_box").width(), left: 0}, speed * 2)
            });
        $(this).children().children("._rightbar_inside_box").stop().animate(
            {bottom: 0}, speed, function () {
                $(this).animate({height: $(this).parent("._inside_box").height(),top:0}, speed * 2)
            });
        $(this).children().children("._bottombar_inside_box").stop().animate(
            {left: 0}, speed, function () {
            $(this).animate({width: $(this).parent("._inside_box").width()}, speed * 2)
        });
        $(this).children().children("._leftbar_inside_box").stop().animate(
            {top: 0}, speed, function () {
            $(this).animate({height: $(this).parent("._inside_box").height()}, speed * 2)
        });
    });

    $("._infobox").on("mouseleave", function () {
        var default_size = $(this).css("--inside-box-dim").replace('%', '') / 100;
        var default_width = default_size * $(this).children("._inside_box").width();
        var default_width_2 = ((1 - default_size) * $(this).children("._inside_box").width()) / 2;
        var default_height = default_size * $(this).children("._inside_box").height();
        var default_height_2 = ((1 - default_size) * $(this).children("._inside_box").height()) / 2;

        $(this).children().children("._topbar_inside_box").stop().animate({
            width: default_width,
            left: default_width_2
        }, speed * 2);
        $(this).children().children("._rightbar_inside_box").stop().animate({
            height: default_height,
            top: default_height_2
        }, speed * 2);
        $(this).children().children("._bottombar_inside_box").stop().animate({
            width: default_width,
            left: default_width_2
        }, speed * 2);
        $(this).children().children("._leftbar_inside_box").stop().animate({
            height: default_height,
            top: default_height_2
        }, speed * 2);
    });
});