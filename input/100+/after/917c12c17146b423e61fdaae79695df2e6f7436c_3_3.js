f    $(".add_filter_button").live("click", function () {
        var positivevals = new Array();
        var negativevals = new Array();
        var sizelims = null;
        var quickexit = null;
        $(this).closest(".add_filter_div").children().each( function () {
            if (($(this).hasClass("add_filter") || $(this).hasClass("and_filter")) && $(this).children("input")[0].value !== "") {
                positivevals.push( $(this).children("input")[0].value );
            } else if ($(this).hasClass("not_filter") && $(this).children("input")[0].value !== "") {
                negativevals.push( $(this).children("input")[0].value );
            } else if ($(this).hasClass("size_filter")) {
                var lower = $(this).children("input")[0].value;
                var lowertype = $(this).children("select")[1].value;
                var upper = $(this).children("input")[1].value;
                var uppertype = $(this).children("select")[2].value;
                if (!(lower == "" && upper == "")) {
                    if (!sizelims) {
                        if (lower == "") {
                            lower = 0;
                        }
                        if (upper == "") {
                            upper = 0;
                        }
                        lower *= lowertype;
                        upper *= uppertype;
                        sizelims = new Array(lower, upper);
                    } else {
                        alert("More than one size limit has been specified, remove the second and try again");
                        quickexit = true;
                        return;
                    }
                }
            }
        });
        if (quickexit) {
            return false;
        }
        if (sizelims) {
            sizelims = sizelims.join("||||||");
        } else {
            sizelims = "";
        }
        if (positivevals.length == 0) {
            positivevals = "";
        } else {
            positivevals = positivevals.join("||||||");
        }
        if (negativevals.length == 0) {
            negativevals = "";
        } else {
            negativevals = negativevals.join("||||||");            
        }
        var name = $(this).closest(".remote_setting").attr("id").split("remote_settings_")[1];
        if (positivevals == "" && negativevals == "" && sizelims == "") {} else {
            var req = "request=add_filter&name=" + name;
            req += "&positive=" + encodeURIComponent(positivevals);
            req += "&negative=" + encodeURIComponent(negativevals);
            req += "&sizelim=" + encodeURIComponent(sizelims);
            socket.send(req);
        }
    });
    //$(".filter_select").live("change", function() {
    //    var selectelem = $("<select class='filter_select'><option selected='selected'>---</option><option>and</option><option>not</option><option>size</option></select>");
    //    var andinput = $("<input name='add_filter' class='input_filter' type='text' placeholder='Positive Filter' />");
    //    var notinput = $("<input name='not_filter' class='input_filter' type='text' placeholder='Negative Filter' />");
    //    var sizeinput = $("<input class='input_filter size lower' type='number' placeholder='Lower' min=0 /> \
    //                            <select> \
    //                                <option value=1073741824>GB</option> \
    //                                <option value=1048576>MB</option> \
    //                                <option value=1024>KB</option> \
    //                                <option value=1>B</option> \
    //                            </select> \
    //                        <input class='input_filter size upper' type='number' placeholder='Upper' min=0 /> \
    //                            <select> \
    //                                <option value=1073741824>GB</option> \
    //                                <option value=1048576>MB</option> \
    //                                <option value=1024>KB</option> \
    //                                <option value=1>B</option> \
    //                            </select>");
    //    if ($(this).val() == "---") {
    //        if ($(this).parent().children("select").length == 2) {
    //            $(this).parent().prev().append($(this));
    //            $(this).parent().next().remove();
    //        } else {
    //            $(this).parent().remove();
    //        }
    //    } else if ($(this).val() == "and") {
    //        if ($(this).next().length > 0) {
    //            $(this).parent().toggleClass("not_filter and_filter");
    //            $(this).next().attr("placeholder", "Filter");
    //            return;
    //        }
    //        $(this).parent().after(
    //            $("<div class='and_filter' />")
    //            .append(andinput)
    //            .append(selectelem)
    //        );
    //        $(this).parent().next().prepend($(this));
    //    } else if ($(this).val() == "not") {
    //        if ($(this).next().length > 0) {
    //            $(this).parent().toggleClass("not_filter and_filter");
    //            $(this).next().attr("placeholder", "Negative Filter");
    //            return;
    //        }
    //        $(this).parent().after(
    //            $("<div class='not_filter' />")
    //            .append(notinput)
    //            .append(selectelem)
    //        );
    //        $(this).parent().next().prepend($(this));
    //    }
    //});
    $(".filter_group").live("click", function () {
        var name = $(this).closest(".remote_setting").attr("id").split("remote_settings_")[1];
        var index = $(".filter_group", $(this).parent()).index($(this));
        var c = confirm("Are you sure you want to remove this filter?");
        if (c) {
            socket.send("request=remove_filter&name=" + name + "&index=" + index);
        }
    });
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
