function () {

    // init interface
    poebao.ui.init();

    $('.top-layer').css({top:'50%',left:'50%',margin:'-'+($('.top-layer').height() / 2)+'px 0 0 -'+($('.top-layer').width() / 2)+'px'});

    $(".top-layer .layer-close-button").click(function () {
        $(".top-layer").hide();
        $("#darken").hide();
    });

    // init timeago
    $("time.timeago").timeago();

    // set up navigation buttons
    $('#nav-show-upload-form').click(function () {
        // $('#upload-form-layer').show();
        // return false;
    });

    $('#nav-hide-upload-form').click(function () {
        // $('#upload-form-layer').hide();
        // return false;
    });
    
    function scrollToPosition(element) {
        if (element !== undefined) {
            var y = $(element).position().top - 20;
            $('html, body').animate({scrollTop : y}, 200);
        }
    }

    //Create an Array of posts
    var posts = $('.post-element');
    var position = 0; //Start Position

    // bind keyboard shortcuts
    $(window).bind('keydown', 'j', function () {
        scrollToPosition(posts[++position]);
    });

    $(window).bind('keydown', 'k', function () {
        if (position > 0) {
            scrollToPosition(posts[--position]);    
        };
    });

    $(window).bind('keydown', 'r', function () {
        console.log('"r" pressed - rate');
    });

    $(window).bind('keydown', 'c', function () {
        console.log('"c" pressed - comment');
    });

    $(window).bind('keydown', 'h', function () {
        console.log('"h" pressed - hate');
    });

    $(window).bind('keydown', 'l', function () {
        console.log('"l" pressed - like');
    });
    

    

    

    // init form validation
    $("input").blur(function () {
        
        var forElementId = $(this).parent().prev().find("label").attr("for");

        doValidation(forElementId);
    });

    function doValidation(id) {

        var url = "/async/validate/post";
        var data = {};
        $("input").each(function () {
            data[$(this).attr("name")] = $(this).val();
        });

        $.post(url, data, function (resp) {
            
            $("#"+id).parent().find(".errors").remove();
            $("#"+id).parent().prepend(getErrorHtml(resp[id], id));
        }, "json")
    }

    function getErrorHtml(formErrors, id) {
        var o = '<ul id="errors-' + id + '" class="errors">';
        for (errorKey in formErrors) {
            o += "<li>" + formErrors[errorKey] + "</li>";
        };

        o += "</ul>";
        return o;
    }

    // function uploadSuccess(msg) {
    //     window.location.href = msg.data;
    // }

    // function uploadFailure(msg) {
    //     // $("#"+id).parent().find(".errors").remove();
    //     // $("#"+id).parent().prepend(getErrorHtml(resp[id], id));
    //     console.log(msg.data);

    //     for (error in msg.data) {
    //         console.log(error);
    //     };
    // }

    // // init upload form
    // $('#uploadform').submit(function () {
        
    //     var request = $.ajax({
    //             url: "/dodaj",
    //             type: "POST",
    //             data: $(this).serialize(),
    //             dataType: "json"
    //         });

    //     request.done(function (msg) {
    //         if (msg.status == "success") {
    //             uploadSuccess(msg);
    //         } else {
    //             uploadFailure(msg);
    //         }
    //     });

    //     request.fail(function(jqXHR, textStatus) {
    //         alert( "Request failed: " + textStatus );
    //     });

    //     return false;
    // });

    // infinite scroll

    // infinitescroll() is called on the element that surrounds 
    // the items you will be loading more of
    $('#posts').infinitescroll({

        loading: {
            finished: undefined,
            finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
            img: "/img/loader.gif",
            msgText: "",
            msg: null,
            selector: null,
            speed: 'fast',
            start: undefined
        },
        state: {
            isDuringAjax: false,
            isInvalidPage: false,
            isDestroyed: false,
            isDone: false, // For when it goes all the way through the archive.
            isPaused: false,
            currPage: 1
        },
        callback: function () {
            poebao.ui.infiniteScrollLoaded();
            console.log('infiniteScrollLoaded');
        },
        debug: false,
        behavior: undefined,
        binder: $(window), // used to cache the selector
        navSelector  : "#paginator", // selector for the paged navigation (it will be hidden)           
        nextSelector : "#nav-post-list-next-page", // selector for the NEXT link (to page 2)
        
        extraScrollPx: 150,
        itemSelector : "ul.post-list", // selector for all items you'll retrieve
        animate: false,
        pathParse: undefined,
        dataType: 'html',
        appendCallback: true,
        bufferPx: 40,
        errorCallback: function () { },
        infid: 0, //Instance ID
        pixelsFromNavToBottom: 100,
        path: undefined
    }, poebao.ui.infiniteScrollLoaded);
}