let current_post = {}  // Stores the metadata associated to the current open post
let read_content_list = []

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

    var language;
    if(typeof language == 'undefined'){
      if(typeof $('html').attr("lang") == "undefined" || $('html').attr("lang") == "en")
        language = "";
      else
        language = "."+$('html').attr("lang");
    }


    /*
     *  When infobox is clicked it is moved to a side of the screen.
     *  After the movement another html is loaded in the modal_popup. The content loaded is linked by the id ID of the infobox, the id ID_popup
     *  of the modal popup and the name ID_htmlfile.html of the content.
     *
     *  Due to loading limitations the closing management have to be placed in the loading callback. Therefore, when the user wants to close the
     *  popup all content is unloaded, assigning "" to the div (in case of htmlfile loading).
     */
    $("._infobox").on("click", function () {
        var position = $(this).offset().left;
        position = $(document).width() - position - $(this).width() -50;
        var id = $(this).attr('id');
        var html_file_to_load = "additional_content/"+id+language+".html";
        var popup_etiquette = '#'+id+'_popup';

        $(this).css({"--default-left-position": $(this).css("left")});



        $(this).animate({left:position}, speed*2, function () {
            if($('html').css('overflow') == 'hidden') {
                $('html').css('overflow', 'visible');//Allow to scroll again (previously removed)
                return;
            }
            console.log("<DEBUG>: Loading: " + html_file_to_load);
            $(popup_etiquette).children("._modal_popup-content").load(html_file_to_load, function( response, status, xhr ) {
                if ( status != "success" ) {
                    //Error or loading within original html
                    console.log("<DEBUG>: Not "+ html_file_to_load +" file found. Perhaps loading from original html??");
                    console.log("<DEBUG>: -response:" + response + " -status:" + status + ' -data:' + xhr);
                }
                else {
                    console.log("<DEBUG>: Successfully loaded");
                }

                //Adding close span to popup text (at the end), the other comes with additional_content in html
                $(popup_etiquette).children('._modal_popup-content').append('<i class="_modal_popup-close-end fa fa-times fa-2x" ></i>');

                //The node is loaded from the additional content html file
                $("._modal_popup-close, ._modal_popup-close-end").on("click", function () {
                    $(this).parent().parent("._modal_popup").css({display: "none"});
                    $(popup_etiquette).children("._modal_popup-content").html("");

                    $('html').css('overflow', 'visible');//Allow to scroll again (previously removed)
                    $('#' + id).animate({left: $('#' + id).css("--default-left-position")}, speed*2);

                    console.log("<DEBUG>: Close ", id, " to list")
                    read_content_list.push({
                        "start_time": current_post["start_time"],
                        "duration": new Date().getTime() - new Date(current_post["start_time"]).getTime(),
                        "post_name": current_post["id"],
                        "watch_video": "watch_video" in current_post
                    })
                    current_post = {}
                });
            });

            console.log("Open", id, " to list")
            current_post["id"] = id
            current_post["start_time"] = new Date().toISOString()

            $('html').css('overflow', 'hidden'); //Remove the scrolling var of the outside window(html body)
            $(popup_etiquette).css({display:"block"}); //Open Modal popup

            // Check if the video is used - https://stackoverflow.com/a/30904449
            window.addEventListener('blur',function(){
                if(document.activeElement.getAttribute("banner_id") == $('#'+id+'_popup iframe').attr("banner_id")){
                    current_post["watch_video"] = true
                }});
        });
    });

    // Detects if there is a click outside the modal box (in the borders) to close it and restore the previous state
    $("._modal_popup").on("click", function (e) {
        if(e.target != this) return; //If clicked on child there is not propagation. It should only works with the black border #(id+_popup).

        $(this).css({display:"none"});
        //Returning infobox to its place

        $('html').css('overflow', 'visible');//Allow to scroll again (previously removed)
        $('#'+$(this).attr('id').replace('_popup','')).animate({left:$('#'+$(this).attr('id').replace('_popup','')).css("--default-left-position")}, speed*2);

        console.log("<DEBUG>: Close ", $(this).attr('id').replace('_popup',''), " to list")
        read_content_list.push({
            "start_time": current_post["start_time"],
            "duration": new Date().getTime() - new Date(current_post["start_time"]).getTime(),
            "post_name": current_post["id"],
            "watch_video": "watch_video" in current_post
        })
        current_post = {}
    });

    var scrolling_timeout;
    var callings = 0;
    $(window).scroll(function() {
        var wH = $(window).height();
        var wS = $(this).scrollTop();

        callings = callings+1;

        clearTimeout(scrolling_timeout);
        timeout = setTimeout(function() {
            $("._reacting_infobox").each(function(){
                var hT = $(this).offset().top;
                var hH = $(this).outerHeight();
                var original_height = $(this).css('height');

                if (( wS > (hT-wH*0.6)) & $(this).hasClass("_not_visible")){
                    $(this).removeClass("_not_visible");
                    $(this).animate({'padding':'0'},400);
                    $(this).children("._infobox").animate({'margin':'2.5%'},400);
                    //alert("Checking: "+ (wS > (hT+hH*1.5-wH)) +  $(this).hasClass("_not_visible") +" hi1 " + $(this).attr('id')+ " callings:" + callings);
                }
                else if ( wS < (hT-wH*0.65) & !$(this).hasClass("_not_visible")){
                    $(this).addClass("_not_visible");
                    $(this).animate({'padding':'4%'},{ duration: 200, queue: false });
                    $(this).animate({'padding-left':'10%'},{ duration: 200, queue: false });
                    $(this).children("._infobox").animate({'margin':0, 'margin-bottom':'5px'}, 200);
                    //alert("Checking: "+ (wS < (hT+hH-wH)) +  !$(this).hasClass("_not_visible") +" bye " + $(this).attr('id') + " callings:" + callings);
                }

                $(this).css('height',original_height);
            },200);
        });
    });
});
