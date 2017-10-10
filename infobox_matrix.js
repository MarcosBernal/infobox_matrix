// When DOM has been loaded the function is triggered
$(document).ready(function() {
    var speed = 200;
    $("._infobox").on("mouseenter", function () {
        var default_size = $(this).css("--inside-box-dim").replace('%', '') / 100;
        var default_size_value = default_size * $(this).width()*0.8;

        $(this).children().children("._topbar_inside_box").stop().animate(
            {left: 0, width: $(this).children("._inside_box").width()}, speed);
        $(this).children().children("._rightbar_inside_box").stop().animate(
            {top: 0,height: $(this).children("._inside_box").height()}, speed);
        $(this).children().children("._bottombar_inside_box").stop().animate(
            {left: 0, width: $(this).children("._inside_box").width()}, speed);
        $(this).children().children("._leftbar_inside_box").stop().animate(
            {top: 0,height: $(this).children("._inside_box").height()}, speed);
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
        }, speed);
        $(this).children().children("._rightbar_inside_box").stop().animate({
            height: default_height,
            top: default_height_2
        }, speed);
        $(this).children().children("._bottombar_inside_box").stop().animate({
            width: default_width,
            left: default_width_2
        }, speed);
        $(this).children().children("._leftbar_inside_box").stop().animate({
            height: default_height,
            top: default_height_2
        }, speed);
    });

    $("._infobox").on("click", function () {
        var position = $(this).offset().left;
        position = (position < window.outerWidth/2) ? (window.outerWidth - position - $(this).width() -50) : 50;

        $(this).animate({left:position}, speed*2);
    });
});