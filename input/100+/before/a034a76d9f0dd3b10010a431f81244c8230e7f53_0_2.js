function(s) {

            if (s.professor.username != profile.username)
                return;
            //
            // Add a entry for subject list
            //
            var p = $("<p/>").text(s.name).appendTo($("<td/>").appendTo(
            $("<tr/>").appendTo($("#my-subject-table"))
            .click(function(){

                if($("#subject-form").parent().parent()[0] == this && $("#subject-form").is(":visible"))
                    return;

                $("#subject-form").hide("fast", function(){

                    $("#subject-form").prev().show();

                    $("#subject-form").insertAfter(p);

                    p.hide()

                    $('#subject-form').remove('.help-block').remove('.help-inline').removeClass('error');

                    $("#subject-form .legend").text("编辑课题：" + p.text());
                    // Set title
                    $('#subject-form input[name="name"]').val(s.name);

                    // Set desc
                    $('#subject-form textarea[name="desc"]').val(s.desc);

                    // Clear active class
                    $('#subject-form div[name="type1"] button').removeClass("active");
                    $('#subject-form div[name="type2"] button').removeClass("active");
                    $('#subject-form div[name="source"] button').removeClass("active");

                    clearFormErrors();

                    $('#subject-form div[name="type1"] button[name="'
                        + s.type1 + '"]').addClass("active");
                    $('#subject-form div[name="type2"] button[name="'
                        + s.type2 + '"]').addClass("active");
                    $('#subject-form div[name="source"] button[name="'
                        + s.source + '"]').addClass("active");

                    $("#subject-form").show("fast", function(){
                        $(this).goTo();
                    });

                });

                // professor add or modify subject
                ajaxSubmit($("#subject-form"), function() {

                    var subject = {
                        id : s.id,
                        name : $('#subject-form input[name="name"]').val(),
                        desc : $('#subject-form textarea[name="desc"]').val(),
                        type1 : $('#subject-form div[name="type1"] .active').attr("name"),
                        type2 : $('#subject-form div[name="type2"] .active').attr("name"),
                        source : $('#subject-form div[name="source"] .active').attr("name")
                    };

                    if(!validateForm(subject)) {
                        return;
                    }

                    var postdata = serializeObject(subject);
                    postJson({
                        url : "/modify",
                        data : postdata,
                        callback : function(obj) {
                            if (obj.err) {
                                alertFailure("#subjectFormAlert", obj.err);
                                $("#subjectFormAlert").goTo();
                            } else {
                                s.name = subject.name;
                                s.desc = subject.desc;
                                s.type1 = subject.type1;
                                s.type2 = subject.type2;
                                s.source = subject.source;
                                //getSubjectDetail();
                                alertSuccess("#subjectFormAlert", "更新成功");
                            }
                        },
                        error : function() {
                            alertInternalError("#subjectFormAlert");
                            $("#subjectFormAlert").goTo();
                        }
                    });
                });
            })));
        }