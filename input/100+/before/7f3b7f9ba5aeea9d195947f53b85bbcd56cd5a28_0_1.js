f    socket = new window.WebSocket(socket_protocol + "://" + window.document.location.host + "/autosocket");
    socket.onmessage = OnMessage;
    socket.onerror = function (evt) {
        console.log("autoSocket error", evt, socket);
    }
    socket.onopen = function (evt) {
        console.log("autoSocket opened", evt, socket);
        runSocketInit();
    }
    socket.onclose = function (evt) {
        console.log("autoSocket closed", evt, socket);
    }
    $(".add_filter_button").live("click", function () {
        var inputval = $(this).parent().next().val();
        var name = $(this).closest(".remote_setting").attr("id").split("remote_settings_")[1];
        if (inputval) {
            socket.send("request=add_filter&name=" + name + "&restring=" + inputval);
        }
    });
    $(".filter").live("click", function () {
        var name = $(this).closest(".remote_setting").attr("id").split("remote_settings_")[1];
        var index = $(".filter", $(this).parent()).index($(this));
        var c = confirm("Are you sure you want to remove this filter?");
        if (c) {
            socket.send("request=remove_filter&name=" + name + "&index=" + index);
        }
    });
    console.log($("#dialog_form"));
    $("#dialog_form").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            "Submit": function () {
                var pw=$("#password").val();
                // encrypt password by normal method (secure from MITM attacks
                // due to the time-based OTP nature [?] )
                var hashed = hashPassword(pw);

//                args.salt = salt;
//                var hash = hashed.split("$")[2];
                // use hash to encrypt message using AES encryption
//                for (i=0; i<args.tocrypt.length; i++) {
//                    var encrypted = CryptoJS.AES.encrypt(args.tocrypt[i][1], hash, {iv: salt, mode: CryptoJS.mode.CFB});
//                    console.log("iv: " + salt + " " + encrypted.iv);
//                    console.log("key: " + hash + " " + encrypted.key);
//                    console.log("encrypted: " + encrypted.ciphertext);
                
                // decrypting with PyCrypto is too complicated to sort out, so
                // send plaintext for now
                
                args.auth = hashed;
                var q_ = []
                $.each(args, function(key, value) {
                    q_.push(key + "=" + encodeURIComponent(value));
                });
                var query = q_.join("&");
                socket.send(query);
                $(this).dialog("close");
            },
            "Cancel": function() { 
                $(this).dialog("close");
            }
        },
        close: function () {
            $("#password").val("");
            args = null;
        }
    });

    $(".remote_row").live("click", function (evt) {
        var next_row = $(this).next();
        if (next_row.hasClass("is_hidden")) {
            next_row.removeClass("is_hidden");
        } else {
            next_row.addClass("is_hidden");
        }
    });
    $("input").live("keydown", function (evt) {
        $(this).prev().css({color:"", "font-weight":"", "font-style":""});
    });
    $(".submit_button").live("click", function (evt) {
        // get arguments
        var inputs = $("input", $(this).parent().parent());
        args = new Object();
        args.tocrypt = [];
        var exit = false;
        inputs.each( function (elem) {
            var key = $(this).attr("name");
            var value = $(this).attr("value");
            if (!value) {
                $(this).prev().css({color: "red", "font-weight": "bold", "font-style": "italic"});
                exit = true;
            } else {
//                args.tocrypt.push( new Array(key, value) );
                args[key] = value
            }
        });
        if (exit) {
            return false;
        } else {
            args.request = "set_source";
            // set args name value for assignment on other side
            args.name = $(this).attr("id").split("submit_")[1];
            $("#dialog_form").dialog("open");
        }
    });
});
