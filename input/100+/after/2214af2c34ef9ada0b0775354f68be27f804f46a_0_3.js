function() {

    //Удаление теста по иду
    $("#btnTstDel").click(function() {
        var id = $("#idTestToDel").val();
        $.ajax({type:"POST", data: "test_id="+id,url:"/adm/ahid/deltest",dataType:"json",
            success: function(result) {
                console.log(result);
                hints('success','Тест удален');
            },
            error: function(result){
                console.log(result);
                hints('error','Тест не удален');
            }
        });
    });

    // Пока нужно для того что бы редакторы не сворачивались с классом hide
    $("#dvSecondPart").slideUp(1);


    $("#btnAdmCreateNewTest").click(function() {
        $("#dvSecondPart").slideUp();
        $("input[name=tst_title]").removeAttr('disabled');
        $("#frmAdmCreateTest")[0].reset();
        $("#btnAdmCreateTest").removeAttr('disabled');
        $("input[name=tst_title]").focus();
        $(this).addClass('hide');
//        $("#createdQuestions").find('table').addClass('hide');
        $("#createdQuestions").find('tbody').html('');
    });

    $(".admVarIsText").live('click', function() {
        if($(".admVarIsText").hasClass('isChecked')) {
            $('.chkIsText').removeAttr('checked');
            $(".admVarIsText").removeClass('isChecked');
            $(".hQuestionIsText").val('0');
        } else {
            $('.chkIsText').attr('checked','checked');
            $(".admVarIsText").addClass('isChecked');
            $(".hQuestionIsText").val('1');
        }
    });

    // Нажимаем на кнопку удаления всех вариантов ответа
    $(".varDelAll").click(function() {
        $(".btnRemoveVariant").click();
    });

    // Нажимаем на кнопку удаления одного варианта ответа
    $(".btnRemoveVariant").live('click', function() {
        if($(this).closest('tbody').find('tr').length == 1) {
            $(".sendQuestion").addClass('disabled');
            $("#tblVariants").addClass('hide');
        }
        $(this).closest('tr').remove();

    });


    // Нажатие на кнопку отправки вопроса и его вариантов ответа
    $(".sendQuestion").click(function() {

        // Включаем изображение процесса выполнения
        $("#questionCreating").removeClass('hide');

        if(!$(this).hasClass('disabled')) {
            // Забираем с редактора вопроса весь текст
            var curr_question = REDACTOR_TSTQUESTION.getCodeTextarea();

            // И записываем его в скрытое поле для того что бы при сабмите формы отправить текст вопроса
            $(".hQuestionTitle").val(curr_question);

            // Отправка аякс запроса с сериализированой формой
            $.ajax({type:"POST", data: $("#frmAdmAddQuestion").serialize(),url:"/adm/ahid/tstaddquestvar",dataType:"json",
                // В случае удачной отправки запроса
                success: function(data) {
                    console.group('Sending Questions and Variants');
                    console.info(data.message);
                    console.log(data);
                    console.groupEnd();
                    // Если на сервере все удачно записалось...
                    if(data.status == 'ok') {
                        hints('success','Данные успешно записаны');
                        var additional_html = '', additional_status = '', check_as_correct = '';
                        if(data.question.ball) { additional_status = data.question.ball; }

                        // Генерируем верстку под записаный в базу вопрос
                        additional_html += '<tr class="trCreatedQuestion">' +
                            '<td colspan="2">' + data.question.title + '<input type="hidden" name="idQuestVar" value="' + data.question.id_tst_question + '"></td>' +
                            '<td class="admStatus">' + additional_status + '</td>' +
                            '<td class="admVarDel"><a class="delWritedItem"><img src="/stfile/img/tests/icon-delete.png"></a></td>' +
                        '</tr>';

                        // А затем для каждого варианта ответа
                        for(var i = 0; i < data.variants.length; i++) {
                            console.log(data.variants[i].title);
                            additional_status = '';
                            if(data.variants[i].ball > 0) {
                                additional_status = '<span class="pull-left spnCreatedBalls" title="Баллы">' + data.variants[i].ball + '</span>';
                            }
                            if(data.variants[i].is_text) {
                                additional_status += '<img class="pull-right questVarStatus" src="/stfile/img/tests/icon-input.png" title="Ответ нужно вводить с клавиатуры" ' +
                                    'data-original-title="Ответ нужно вводить с клавиатуры">';
                            }

                            if(data.variants[i].correct == '1') {
                                check_as_correct += '<img src="/stfile/img/tests/check.png">';
                            } else {
                                check_as_correct = '';
                            }

                            additional_html += '<tr>' +
                                '<td class="admCorrect">' + check_as_correct + '</td>' +
                                '<td class="tdCreatedVariantd">' + data.variants[i].title + '<input type="hidden" name="idQuestVar" value="' + data.variants[i].id_tst_answer + '"></td>' +
                                '<td class="admStatus">' + additional_status + '</td>' +
                                '<td class="admVarDel"><a class="delWritedItem"><img src="/stfile/img/tests/icon-delete.png"></a></td>' +
                            '</tr>';
                        }
                        clearQuestionVar();
                        // Выводим сгенерированную верстку в специальный блок
                        $("#createdQuestions").append('<table class="table"><thead></thead><tbody>' + additional_html + '</tbody></table>');

                    // Если на сервере произошел сбой то выводим сообщение об этом
                    } else if(data.status == 'bad') {
                        hints('error','Что то пошло не так');
                    }

                    // Выключаем изображение процесса выполнения
                    $("#questionCreating").addClass('hide');
                },

                // Если запрос не выполнился
                error: function(data){
                    console.group('Sending Questions and Variants');
                    console.warn('error in ajax query when try to send question and variants');
                    if (typeof data.message != 'undefined') {
                        console.warn(data.message);
                    }
                    console.groupEnd();
                    hints('error', 'Не удалось отправить аякс запрос');

                    // Выключаем изображение процесса выполнения
                    $("#questionCreating").addClass('hide');
                }
            });
        }

    });

    $(".tstSettings").click(function() {
        $('.dvTstTools').slideToggle(200);

    });

    $("#btnAdmCreateTest").click(function() {
       createNewTest($(this));

    });

    $(".addVariant").click(function(){
        var new_row, curr_variant,  rand, is_text_checked = '', curr_attr;
        curr_variant = REDACTOR_TSTVARIANTS.getCodeTextarea();
        rand = Math.ceil(Math.random()*1000000);
        console.log(curr_variant);

        // Если кнопка отправить запрос была неактивной, то теперь стоит сделать ее активной
        if($(".sendQuestion").hasClass('disabled')) {
            $(".sendQuestion").removeClass('disabled');
        }

        // Проверяем если таблица с вариантами ответа была спрятана значит в нее еще ничего не записывали
        if($("#tblVariants").hasClass('hide')) {
            $("#tblVariants").removeClass('hide');
            $("#tblVariants").slideDown();
        }

        // Если уже было выбрано что варианты ответов будут текстовыми то нужно и новому чекбоксу добавить checked
        if($(".admVarIsText").hasClass('isChecked')) {
            is_text_checked = 'checked="checked"';
        } else { is_text_checked = ''; }

        new_row = "<tr>" +
            "<td class='admVarText'>" + curr_variant + "<input type='hidden' name='tst_variant["+ rand +"]["+"title"+ "]' value='"+ curr_variant +"'></td>" +
            "<td class='admVarBall'><input type='text' class='span1' name='tst_variant["+ rand +"]["+"ball"+ "]'></td>" +
            "<td class='admVarCorr'><input type='checkbox' name='tst_variant["+ rand +"]["+"correct"+ "]'></td>" +
            "<td class='admVarIsText'><input type='checkbox' class='chkIsText' name='tst_variant["+ rand +"]["+"is_text"+ "]' " + is_text_checked + " ></td>" +
            "<td class='admVarDel'><a class='btn btn-danger btnRemoveVariant'><i class='icon-trash icon-white'></i></a></td></tr>";
        $("#tblVariants tbody").append(new_row);
    });
//================================== Юлина админка ===================================================================//

    //Добавляем факт в список
    $("#btnAddFact").click(function() {
        if($("#txtFact").val() != '') {
            var curr_tbody = $("#tblAddedFacts").children('tbody'),
                curr_val = $("#txtFact").val(),
                hidden_info = '<input type="hidden" name="facts[]" value="' + curr_val + '">';

            curr_tbody.append('<tr><td>' + curr_val + hidden_info + '</td><td><a class="btn btn-danger delFact" ><i class="icon-trash icon-white"></i></a></td></tr>');
            $("#txtFact").val('');
        } else {
            hints('warning','Нужно заполнить поле фактом');
        }
    });

    // Удаляем факт из списка
    $(".delFact").live('click', function() {
        $(this).closest('tr').remove();
    });

    // Передаем на сервер данные для записи в бд
    $("#btnWriteFacts").click(function() {
        $.ajax({type:"POST", data: $("#frmFacts").serialize(),url:"/adm/ahid/addfact",dataType:"json",
            success: function(data) {
                console.log(data);

                hints('success','Данные успешно записаны');
                $("#tblAddedFacts").find('tbody').html('');
            },
            error: function(){
                alert('error in ajax query when try to delete question');
            }
        });
    });

//---------------------------------- Юлина админка -------------------------------------------------------------------//


//======================================Слайдер боковой менюшки (справа)==============================================//
$('#ulAdmMenu ul').each(function(index) {
    $(this).prev().addClass('collapsible').click(function() {
      if ($(this).next().css('display') == 'none') {
        $(this).next().slideDown(200, function () {
          $(this).prev().removeClass('collapsed').addClass('expanded');
        });
      }else {
        $(this).next().slideUp(200, function () {
          $(this).prev().removeClass('expanded').addClass('collapsed');
          $(this).find('ul').each(function() {
            $(this).hide().prev().removeClass('expanded').addClass('collapsed');
          });
        });
      }
      return false;
    });
  });
//--------------------------------------------------------------------------------------------------------------------//

//============================ Валидация и проверка полей Логин и Email в БД =========================================//
    var login = $("#inpLogin"),
        email = $("#inpEmail");

    login.blur(function(){
       //если введенные символы допустимы
        if (getRegex(login,'login')) {
            $(this).next('img').attr('src','../../stfile/img/loading.gif').css('visibility','visible');
            if(isValueExist('inpLogin','login')){
                login.addClass("Red");//добавляем класс с красной подсветкой
                $(this).next('img').attr('src','../../stfile/img/failure.png').css('visibility','visible');
                ISVALID['keyLogin']=false;
            }
            else{
                //показываем иконку о том что все хорошо
                login.removeClass("Red");//удаляем класс inpRed с инпута, что бы не было красной подсветки
                $(this).next('img').attr('src','../../stfile/img/success.png').css('visibility','visible');
                ISVALID['keyLogin'] = true;//записываем в масив что введено коректно (для дальнейшего сабмита)
            }
        }
        //если символы не адекватны
        else{
            if(login.val().length > 0){
            //выводим иконку что все плохо
            login.addClass("Red");//добавляем класс с красной подсветкой
            $(this).next('img').attr('src','../../stfile/img/failure.png').css('visibility','visible');
            ISVALID['keyLogin']=false;//записываем в масив что введено некоректно (для дальнейшего сабмита)
            }
            else {
                login.removeClass("Red");
                $(this).next('img').css('visibility','hidden');
            }
        }
    });

    email.blur(function(){
       //если введенные символы допустимы
        if (getRegex(email,'email')) {
            $(this).next('img').attr('src','../../stfile/img/loading.gif').css('visibility','visible');
            if(isValueExist('inpEmail','email')){
                email.addClass("Red");//добавляем класс с красной подсветкой
                $(this).next('img').attr('src','../../stfile/img/failure.png').css('visibility','visible');
                ISVALID['keyEmail']=false;
            }
            else{
                //показываем иконку о том что все хорошо
                email.removeClass("Red");//удаляем класс inpRed с инпута, что бы не было красной подсветки
                $(this).next('img').attr('src','../../stfile/img/success.png').css('visibility','visible');
                ISVALID['keyEmail'] = true;//записываем в масив что введено коректно (для дальнейшего сабмита)
            }
        }
        //если символы не адекватны
        else{
            if(email.val().length > 0){
            //выводим иконку что все плохо
            email.addClass("Red");//добавляем класс с красной подсветкой
            $(this).next('img').attr('src','../../stfile/img/failure.png').css('visibility','visible');
            ISVALID['keyEmail']=false;//записываем в масив что введено некоректно (для дальнейшего сабмита)
            }
            else {
                email.removeClass("Red");
                $(this).next('img').css('visibility','hidden');
            }
        }
    });
//--------------------------------------------------------------------------------------------------------------------//

//================================ Подгружаем данные пользователя для удаления =======================================//
    $("#btnUsrLoad").click(function(){
        switch(validCheck($("input[name=username]"),'login',true)){
            case 'exist':{
                if(currUsername == null){
                    currUsername = $("input[name=username]").val();
                }
                //тут аякс запрос
                $.ajax({type:"POST",data:"userToDelete="+$("input[name=username]").val(),url:'/adm/ahid/getuserinfo',dataType:"json",
                    success:function(data) {
                        $("input[name=email]").val(data['userInfo'][0]['email']);

                        $("input[name=firstName]").val(data['userInfo'][0]['first_name']);
                        $("input[name=lastName]").val(data['userInfo'][0]['last_name']);

                        if (data['userInfo'][0]['sex'] == 0) {
                            $("input[name=sex][value='0']").attr('checked','checked');
                        }
                        if (data['userInfo'][0]['sex'] == 1) {
                            $("input[name=sex][value='1']").attr('checked','checked');
                        }

                        if (data['userInfo'][0]['role'] == 1) {
                            //alert('role 1');
                            $("#optUser").attr('selected','selected');
                            //$("#optAdmin").removeAttr('selected',);
                        }
                        if (data['userInfo'][0]['role'] == 2) {
                            //alert('role 2');
                            $("#optAdmin").attr('selected','selected');
                            //$("#optUser").removeAttr('selected');
                        }
                        $("[name=slUsrRole]").removeAttr('disabled');
                        //Если правим пользователя а не удаляем
                        if ($("#frmUsrFix").length > 0) {
                            $("form input").removeAttr('disabled');
                        }
                    },
                    error:function() {
                        alert('error in ajax query when loading user data');
                    }
                });
         //       alert(currUsername);
       //         alert($("input[name=username]").val());

                if(currUsername == $("input[name=username]").val()){
                    if ($("form[name=delUser]").hasClass("expanded")) {
                        $("form[name=delUser]").removeClass('expanded').addClass('collapsed');
                        $("form[name=delUser]").slideUp();
                    }
                    else if ($("form[name=delUser]").hasClass("collapsed")) {
                        $("form[name=delUser]").removeClass('collapsed').addClass('expanded');
                        $("form[name=delUser]").slideDown();
                    }
                }
                else {
                    if ($("form[name=delUser]").hasClass("collapsed")) {
                        $("form[name=delUser]").removeClass('collapsed').addClass('expanded');
                        $("form[name=delUser]").slideDown();
                    }
                }
                break;
            }
            case 'empty':{
                //Если правим пользователя а не удаляем
                if ($("#frmUsrFix").length > 0) {
                    $("form input").attr('disabled','disabled');
                    $("form input").val('');
                    $("[name=slUsrRole]").attr('disabled','disabled');
                    hints('warning','Увы пользователя с таким Логином нет :(');
                }
                else {
                    hints('warning','Увы пользователя с таким Логином нет, то бишь и удалять некого :)');
                }
                break;
            }
            case 'not correct':{
                hints('error','Имя пользователя не может состоять из введенных вами символов, и должно быть не меньше 3-х и не больше 32-х');
                break;
            }
            case 'not enough symbols':{
                hints('info','Введите хоть что нибудь в поле "Имя пользователя"');
                break;
            }
        }
        //alert('asdas');
        currUsername = $("input[name=username]").val();
        //alert(currUsername);
    });

//--------------------------------------------------------------------------------------------------------------------//
//=============================== Отслеживаем нажатие Enter при удалении пользователя ================================//
    $("input[name=username]").keypress(function(EnterKey){

       //alert(currUsername);
       if (EnterKey.keyCode == 13) {
       //currUsername = $("input[name=username]").val();
         //  alert(currUsername);
            $("#btnUsrLoad").click();
       }
    });
//--------------------------------------------------------------------------------------------------------------------//

//========================================== Удаляем пользователя ====================================================//
    $("#btnUsrDel").click(function(){
        switch(validCheck($("input[name=username]"),'login',true)){
            case 'exist': {
                //Посылаем запрос на удаление
                $.ajax({type:"POST",data:"userToDelete="+$("input[name=username]").val(),url:"/adm/ahid/deluser",dataType:"json",
                    success: function(data) {
                        if (data.deleted) {
                            var usrDel = 'Пользователь <b>'+$("input[name=username]").val()+'</b> успешно удален';
                            hints('success',usrDel);
                        }
                        else {

                            hints('error','Не удалось удалить пользователя, почему? если б мы знали...');
                        }
                    },
                    error: function(){
                        alert('error in ajax query when try to delete user');
                    }
                });
                break;
            }
            case 'empty': {
                hints('warning','Увы пользователя с таким Логином нет, то бишь и удалять некого :)');
                break;
            }
            case 'not correct':{
                hints('error','Имя пользователя не может состоять из введенных вами символов, и должно быть не меньше 3-х и не больше 32-х');
                break;
            }
            case 'not enough symbols': {
                hints('info','Введите хоть что нибудь в поле "Имя пользователя"');
                break;
            }
        }
    });
//--------------------------------------------------------------------------------------------------------------------//
//=================================================== Изменяем пользователя ==========================================//
    $("#btnUsrFix").click(function(){
        switch(validCheck($("input[name=username]"),'login',true)) {
            case 'exist' :{
                //Посылаем запрос на изменение
                $.ajax({type:"POST",data: $("form[name=fixUser]").serialize(),url:"/adm/ahid/fixuser",dataType:"json",
                    success: function(data) {
                        if (data.fixed) {

                            hints('success','Информация о пользователе успешно изменена');
                        }
                        else {

                            hints('error','Не удалось изменить пользователя, почему? если б мы знали...');
                        }
                    },
                    error: function(){
                        alert('error in ajax query when try to fix user');
                    }
                });
                break;
            }
            case 'empty' :{
                hints('warning','Увы пользователя с таким Логином нет :(');
                break;
            }
            case 'not correct' :{
                hints('error','Имя пользователя не может состоять из введенных вами символов, и должно быть не меньше 3-х и не больше 32-х');
                break;
            }
            case 'not enough symbols' :{
                hints('info','Введите хоть что нибудь в поле "Имя пользователя"');
                break;
            }
        }
    });
//--------------------------------------------------------------------------------------------------------------------//
//======================== Функция 2 в 1 - Вывод титла новости, или всего сразу ======================================//
    $("a[name=btnNewsTitle]").click(function() {
        $.ajax({type:"POST",async:false, data: "checkNewsID="+$("#inpNewsDel").val(),url:"/news/nhid/getnewsid",dataType:"json",
            success: function(data) {
                //Если пришел фалс (или что то пошло не так в кохане или новости с введенным ID не нашлось)
                if (!data) {
                    //Если мы не удалять собрались новость а править
                    if ($("form[name=frmNewsFix]").length > 0) {
                        hints('error','Нет такой новости в базе данных');
                        $("form[name=frmNewsFix]").slideUp('fast');
                    }
                    //А если все же удалять
                    else {
                        $("#inpNewsTitle").val("");
                        hints('error','Нет такой новости в базе данных');
                    }
                }
                //Если новость нашлась
                else {
                    //Если мы не удалять собрались новость а править
                    if ($("form[name=frmNewsFix]").length > 0) {
                        $("#inpNewsTitle").val(data[0]['title']);
                        redactorPre.setHtml(data[0]['text_pre']);
                        redactorFull.setHtml(data[0]['text_full']);
                        $("#inpReferName").val(data[0]['refer_name']);
                        $("#inpReferLink").val(data[0]['refer_link']);
                        $("form[name=frmNewsFix]").slideDown('fast');
                    }
                    //А если все же удалять
                    else {
                        $("#inpNewsTitle").val(data[0]['title']);
                    }
                }
            },
            error: function(){
                alert('error in ajax query when try to delete news');
            }
        });
    });
//--------------------------------------------------------------------------------------------------------------------//
//========================================= Удаление новости =========================================================//
    $("a[name=btnNewsDel]").click(function() {
        $.ajax({type:"POST", data: "newsToDelete="+$("#inpNewsDel").val(),url:"/news/nhid/delnews",dataType:"json",
            success: function(data) {
                if (!data) {
                    hints('error','Нет такой новости в базе данных');
                }
                else {
                    hints('success','Новость удалена');
                    $("#inpNewsTitle").val("");
                    $("#inpNewsDel").val("");
                }
            },
            error: function(){
                alert('error in ajax query when try to delete news');
            }
        });
    });
//--------------------------------------------------------------------------------------------------------------------//
//======================================= Сабмит новости =============================================================//
    $("#btnNewsSubm").click(function(){
        $("input[name=id]").val($("#inpNewsDel").val());
       $("form[name=frmNewsFix]").submit();
    });

    // Вывод вопроса по его id
    $("#btnShowQuestion").click(function() {
        var inp_question_id = $("#inpQuestionId"),
            question_id,
            hquestion_id = $("#hQuestionId"),
            question_title = $("#dvQuestionTitle"),
            question_full = $("#dvQuestionFull");

        hquestion_id.val('');
        question_title.text('');
        question_full.text('');
        if(inp_question_id.val() != '') {
            question_id = inp_question_id.val();
            $.ajax({type:"POST", data: "question_id="+question_id,url:"/adm/ahid/getquestionbyid",dataType:"json",
                success: function(data) {
                    if (!data) {
                        hints('error','Нет такого вопроса в базе');
                    }
                    else {
                        hquestion_id.val(data[0]['id_question']);
                        question_title.text(data[0]['title']);
                        question_full.text(data[0]['full']);
                    }
                },
                error: function(){
                    alert('error in ajax query when try to get question by id');
                }
            });
        }
    });

    //Удаление вопроса
    $("#btnDelQuestion").click(function() {
        var question_id = $("#hQuestionId").val();
        $.ajax({type:"POST", data: "question_id="+question_id,url:"/adm/ahid/delquestionbyid",dataType:"json",
            success: function(data) {
                if (!data) {
                    hints('error','Не удалось удалить вопрос');
                }
                else {
                    hints('success','вопрос удален');
                    $("#dvQuestionTitle").text('');
                    $("#dvQuestionFull").text('');
                    $("#inpQuestionId").val('');
                    question_id.val('');

                }
            },
            error: function(){
                alert('error in ajax query when try to delete question');
            }
        });
    });

    // Вывод вопроса и его ответов по id вопроса
    $("#btnQuestionAll").click(function() {
        var question_id = $("#inpQuestionId");
        $("#dvAllAnswers").html('');
        $.ajax({type:"POST", data: "question_id="+question_id.val(),url:"/adm/ahid/getquestionallbyid",dataType:"json",
            success: function(data) {
                if (!data) {
                    hints('error','Не удалось удалить вопрос');
                }
                else {
                    $("#dvQuestionTitle").html(data['question'][0]['title'] + '<br />' + data['question'][0]['full']);
                    $("#hQuestionId").val(data['question'][0]['id_question']);
                    if(data['answers']) {
                        var complete_table = '';
                        complete_table += '<table class="table table-bordered table-condensed">' +
                            '<thead><tr><th>id</th><th>Ответы</th><th>User</th><th>Дата</th><th>Удалить</th></tr></thead><tbody>';
                        for( var x = 0; x < data['answers'].length; x++ ) {
                            complete_table += '<tr><td>' + data['answers'][x]['id_answer'] + '</td>' +
                                '<td>' + data['answers'][x]['answer_text'] + '</td>' +
                                '<td>' + data['answers'][x]['username'] + '</td>' +
                                '<td>' + data['answers'][x]['public_date'] + '</td>' +
                                '<td><input type="checkbox" class="idAnswer" value="' + data['answers'][x]['id_answer'] + '"></td></tr>';
                        }
                        complete_table += '</tbody></table>';
                        $("#dvAllAnswers").append(complete_table);
                    }
                }
            },
            error: function(){
                alert('error in ajax query when try to get question all');
            }
        });
    });

    // Удаление отмеченных ответов
    $("#btnDelAnswers").click(function() {
        var checked_answers = $(".idAnswer:checked"),
            id_answers_to_del = '';
        if(checked_answers.length > 0) {
            checked_answers.each(function(index, element){
                if(index+1 == checked_answers.length) {
                    id_answers_to_del += $(this).val();
                } else {
                    id_answers_to_del += $(this).val()+',';
                }
            });


            // Посылаем запрос на удаление ответов
            $.ajax({type:"POST", data: "answers_id="+id_answers_to_del,url:"/adm/ahid/delanswersbyid",dataType:"json",
                success: function(data) {
                    if (!data) {
                        hints('error','Не удалось удалить ответы');
                    }
                    else {
                        hints('success','ответы удалены');
                        $("#inpQuestionId").val('');
                        $("#dvQuestionTitle").html('');
                        checked_answers.parent('td').parent('tr').remove();
                    }
                },
                error: function(){
                    alert('error in ajax query when try to delete answers');
                }
            });
        }
    });
//--------------------------------------------------------------------------------------------------------------------//



    /*Инициализация редактора новостей*/
//    redactorPre = $('#txtNewsPre').redactor({ imageUpload: '/news/nhid/loadimages' });

//    redactorFull = $('#txtNewsFull').redactor({ imageUpload: '/news/nhid/loadimages' });
    // Редактор для тестов
//    REDACTOR_TSTQUESTION = $('#tstQuestions').redactor({ imageUpload: '/news/nhid/loadimages' });
//    REDACTOR_TSTVARIANTS = $("#tstVariants").redactor({ imageUpload: '/news/nhid/loadimages'});

    //Редактор для вопросов в админке
    REDACTOR_QUESTION = $("#question").redactor({ imageUpload: '/news/nhid/loadimages'});
    try {
        $(".dropdown-timepicker").timepicker({showMeridian:false,defaultTime:'current',showSeconds:true});
        $("#date").datepicker({format:'dd-mm-yyyy'});
    } catch (e) {
        console.log('timepicker или datepicker не подключен');
    }




// =============================== Перевод фокуса ввода при загрузке страницы ======================================= //
    $("#qustionId").focus();
    $("input[name=question_title]").focus();
// ------------------------------- Перевод фокуса ввода при загрузке страницы --------------------------------------- //

// ================================== Нажатие на кнопку добавления вопроса ========================================== //
    $(".addQuestion").click(function() {
        if(($("#title").val() == '') || ($(".label-tags").length == 0)) {
            hints('info','Для создания вопроса необходимао как минимуму ввести его заголовок, и выбрать одну категорию!');
        } else {
            // Переписываем текст с редактора в текстареа для дальнейшей серриализации данных формы
            $("#question").val(REDACTOR_QUESTION.getCodeTextarea());
            var form_data = $("#frmAddQuestion").serialize();
            $.ajax({type:"POST", async:true, data: form_data, url: "/adm/ahid/addQuestion", dataType:"json",
                success:function(data){
                    if(data.status == 'ok') {
                        hints('success','Вопрос бы успешно задан');
                        clearAddQuestionForm();
                        var appended = '';
                        for( var i = 0; i< data.count; i++ ) {
                            appended += '' +
                                '<div class="subcatItem">' +
                                '<label class="checkbox">' +
                                '<input type="checkbox" value="' + data.subcategories[i].title + '" id="id' + data.subcategories[i].id_subcategory + '" name="tags[]">' +
                                data.subcategories[i].title + '</label>' +
                                '</div>';
                        }
                        $(".tab-pane#0").find(".innerTabPane").append(appended);
                    } else {
                        hints('error','Что то пошло не так <small>( можно посмотреть логи )</small>');
                        console.log(data.message);
                    }
                },
                error:function(){
                    console.log('error in ajax query, when add answer :(');
                }
            });
        }
    });
// ---------------------------------- Нажатие на кнопку добавления вопроса ------------------------------------------ //
// ================================== Нажатие на кнопку очистки формы =============================================== //
    $(".clearQuestionForm").click(function() {
        clearAddQuestionForm();
    });
// ---------------------------------- Нажатие на кнопку очистки формы ----------------------------------------------- //
// ============================== Нажатие на кнопку поиска вопроса по id ============================================ //
    $("#getQuestion").click(function() {
        var item_title, item_date, item_time,item_rating, curr_check, item_loading,
            item_status = {is_closed: $(".is_closed"), is_not_closed: $(".not_closed")};

        item_loading = $(".iconLoading");
        item_title = $("#title");
        item_date = $("#date");
        item_time = $("#time");
        item_rating = $("#rating");
        // Удаляем отметки из радиобокса при каждом выводе новых вопросов
        $(".qstatus").removeAttr('checked');
        if( $("#qustionId").val() != '' ) {
            item_loading.show(); // Показываем блок с иконкой загрузки
            // Перед отправкой аякса очищаем форму для корректной подгрузки в форму даных
            clearAddQuestionForm();
            $.ajax({type:"POST", async:true, data: "id_question="+$("#qustionId").val(), url: "/adm/ahid/getQuestion", dataType:"json",
                success:function(data) {
                    // Если на сервере все прошло успешно
                    if(data.status == 'ok') {
                        $("#hQuestionId").val(data.id_question);
                        item_title.val(data.title);
                        item_rating.val(data.rating);
                        item_date.val(data.date);
                        item_time.val(data.time);
                        REDACTOR_QUESTION.setCodeEditor(data.full);
                        if (data.is_closed == 0) { item_status.is_not_closed.attr('checked','checked'); } else
                        if (data.is_closed == 1) { item_status.is_closed.attr('checked','checked'); }

                        // Проходим по каждой присланной категории и отмечаем их на форме
                        for (var i = 0; i < data.count; i++) {
                            curr_check = $("#id"+data.subcategories[i].id_subcategory);
                            curr_check.click();
                        }

                        // Затем открвыаем форму для показа пользователю-админу
                        $(".hiddenQuestion").slideDown(300);

                    // Если же что то пошло не так выводим сообщение и пишем в логи что не так
                    } else {
                        hints('error','Что то пошло не так (можно посмотреть логи)');
                        console.log(data.message);
                    }
                    item_loading.hide(); // Скрываем блок с анимацией загрузки
                },
                error:function(){
                    item_loading.hide(); // Скрываем блок с анимацией загрузки
                    console.log('error in ajax query, when get question by id :(');
                }
            });
        } else {
            hints('info','Введите id вопроса для редактирования');
            $("#qustionId").focus();
        }
    });
// ------------------------------ Нажатие на кнопку поиска вопроса по id -------------------------------------------- //

// ============================== Нажатие на кнопку отмены изменения вопроса ======================================== //
    $(".cancelQuestionFix").click(function() {
        $(".hiddenQuestion").slideUp(300);
        $("#qustionId").val('').focus();
        $("#hQustionId").val('');
    });
// ------------------------------ Нажатие на кнопку отмены изменения вопроса ---------------------------------------- //

// =================================== Нажатие на кнопку Изменения вопроса  ========================================= //
    $(".fixQuestion").click(function() {
        if(($("#title").val() == '') || ($(".label-tags").length == 0)) {
            hints('info','Вы не сможете обновить вопрос если поле заголовка будет пустым, или не будет выбрана как минимум одна категория !');
        } else {
            // Переписываем текст с редактора в текстареа для дальнейшей серриализации данных формы
            $("#question").val(REDACTOR_QUESTION.getCodeTextarea());

            var form_data = $("#frmAddQuestion").serialize();
            $.ajax({type:"POST", async:true, data: form_data, url: "/adm/ahid/updateQuestion", dataType:"json",
                success:function(data){
                    if(data.status == 'ok') {
                        hints('success','Вопрос был обновлен');
                        var appended = '';
                        for( var i = 0; i< data.count; i++ ) {
                            appended += '' +
                                '<div class="subcatItem">' +
                                '<label class="checkbox">' +
                                '<input type="checkbox" value="' + data.subcategories[i].title + '" id="id' + data.subcategories[i].id_subcategory + '" name="tags[]">' +
                                data.subcategories[i].title + '</label>' +
                                '</div>';
                        }
                        $(".tab-pane#0").find(".innerTabPane").append(appended);
                        clearAddQuestionForm();
                        $(".hiddenQuestion").slideUp(300);
                        $("#qustionId").val('').focus();

                    } else {
                        hints('error','Что то пошло не так <small>( просмотрите логи )</small>');
                        console.log(data.message);
                    }
                },
                error:function(){
                    console.log('error in ajax query, when add answer :(');
                }
            });
        }
    });
// ----------------------------------- Нажатие на кнопку Изменения вопроса ------------------------------------------ //

// ================= Отслеживание нажатия на кнопку Enter при вводе id вопроса ====================================== //
    $("#qustionId").keyup(function(e) {
        if(e.keyCode == 13) {
            $("#getQuestion").click();
        }

    });
// ---------------- Отслеживание нажатия на кнопку Enter при вводе id вопроса---------------------------------------- //



// ================================== Нажатие на кнопку добавления категории ======================================== //
    $("#addCategory").click(function() {
        if($("#newCatTitle").val() != '') {
            var form_data = $("#frmAddNewCategory").serialize();
            $.ajax({type:"POST", async:true, data: form_data, url: "/adm/ahid/addCategory", dataType:"json",
                success:function(data){
                    if(data.status == 'ok') {
                        hints('success','Категория добавлена');
                        var tbody_cat, checkbox_ready, subcat_ready, appended;
                        appended = '<span class="catTitle">' + data.title + '</span>' +
                            '<a class="changeCategory pull-right "><i class="icon-pencil"></i></a>' +
                            '<div class="hide dvChangeCat">' +
                            '<input type="text" class="catTitle" placeholder="Название" value="' + data.title + '">' +
                            '<input type="hidden" class="catId" value="' + data.id_category + '">' +
                            '<a class="btn btn-primary btn-small updateCat">Применить</a>' +
                            '<span class="iconLoading"><img src="/stfile/img/1loading.gif" alt="loading"></span></div>';

                        //  Если была создана подкатегория какой то категории
                        if(!data.is_category) {
                            tbody_cat = $("#catId"+data.id_parent_cat);
                            subcat_ready = tbody_cat.find(".subcatReady");
                            checkbox_ready = tbody_cat.find(".checkboxReady");

                            // Если в тбоди не существует вакантного места в таблице, то добавляем новую строку
                            if((checkbox_ready.length == 0) && (subcat_ready.length == 0)) {
                                tbody_cat.append('<tr>' +
                                    '<td><input type="checkbox" class="subCatCheckbox" value="' + data.id_category + '">' +
                                    '</td><td>' + appended + '</td>' +
                                    '<td class="checkboxReady"></td><td class="subcatReady"></td></tr>');

                            // Если же вакантное место имеется, то записываем данные в него
                            } else {
                                subcat_ready.append(appended);
                                checkbox_ready.append('<input type="checkbox">');
                                subcat_ready.removeClass('subcatReady');
                                checkbox_ready.removeClass('checkboxReady');
                            }

                        // Если создаеться категория
                        } else {
                            $("#tblCategoriesList").append('' +
                                '<tbody class="tbCategory" id="catId' + data.id_category + '">' +
                                '<tr><td colspan="4" class="alert alert-info">' + appended +'</td></tr><tr></tr></tbody>');
                            $("#catId" + data.id_category).find('.updateCat').addClass('isParentCat');
                            // Добавляем в выпадающий список только что добавденную категорию
                            $("#frmAddNewCategory .parentCategory").append('<option value="' + data.id_category + '">' +
                                data.title +'</option>');
                        }
                        clearAddCategoryForm();
                    } else {
                        hints('error','Что то пошло не так <small>( просмотрите логи )</small>');
                        console.log(data.message);
                    }
                },
                error:function(){
                    console.log('error in ajax query, when add answer :(');
                }
            });
        } else {
            hints('info','Вы не ввели имя категории для добавления');
            $("#newCatTitle").focus();
        }
    });
// ---------------------------------- Нажатие на кнопку добавления категории ---------------------------------------- //

// ============================== Нажатие на кнопку редактирования категории ======================================== //
    $(".changeCategory").live('click', function() {
        // Прячем остальные выежающие блоки, что бы открытым был только один
        $(".dvChangeCat").not($(this).closest('td').find('.dvChangeCat')).slideUp(300);
        $(this).closest('td').find('.dvChangeCat').slideToggle(300);
    });
// ------------------------------ Нажатие на кнопку редактирования категории ---------------------------------------- //

// =================================== Выбор чекбокса напротив подкатегории ========================================= //
    $(".subCatCheckbox").live('change',function() {
        if($(".subCatCheckbox:checked").length > 0) {
            // Делаем активной кнопку удаления подкатегорий
            $("#btnDelSubcategories").removeAttr('disabled');
        } else {
            // Делаем неактивной кнопку удаления подкатегорий
            $("#btnDelSubcategories").attr('disabled','disabled');
        }
    });
// ----------------------------------- Выбор чекбокса напротив подкатегории ----------------------------------------- //

// =================================== Нажатие на кнопку изменения категории ======================================== //
    $(".updateCat").live('click', function() {
        var showed_title, hidden_block, icon_load, cat_id, cat_title,
            transfer_data = {title:'', id_category:'', is_parent:'no', parent_cat_id:0};

        showed_title = $(this).closest('td').find('.catTitle'); // Название категории которое выводиться в списке категорий
        hidden_block = $(this).closest('.dvChangeCat');
        icon_load = $(this).closest('.dvChangeCat').find('.iconLoading');
        cat_id = $(this).closest('.dvChangeCat').find('.catId');
        cat_title = $(this).closest('.dvChangeCat').find('.catTitle');
        transfer_data.id_category = cat_id.val();
        transfer_data.title = cat_title.val();

        // Если изменяем категорию
        if($(this).hasClass('isParentCat')) {
            transfer_data.is_parent = 'yes';
        // Если изменяем подкатегорию
        } else {
            transfer_data.is_parent = 'no';
            transfer_data.parent_cat_id = $(this).closest('.tbCategory').attr('id').slice(5);
        }

        // Если поле с названием категории не пустое
        if(cat_title.val() != '') {
            icon_load.show(); // Показываем иконку загрузки
            $.ajax({type:"POST", async:true, data: transfer_data, url: "/adm/ahid/updateCategory", dataType:"json",
                success:function(data){
                    if(data.status == 'ok') {
                        hints('success','Категория обновлена');
                        // Если изменяем категорию то нужно обновить еще список родительских категорий
                        if(data.is_category) {
                            $(".parentCategory [value=" + data.id_category + "]").text(data.title);
                        }
                        // Перезаписываем все данные, но уже используя результаты выполнения от сервера
                        cat_id.val(data.id_category);
                        cat_title.val(data.title);
                        showed_title.text(data.title);
                        // Скрываем выежающий блок
                        hidden_block.slideUp(300);
                    } else {
                        hints('error','Что то пошло не так <small>( просмотрите логи )</small>');
                        console.log(data.message);
                    }
                    icon_load.hide(); // Прячем иконку статуса выполнения
                },
                error:function(){
                    console.log('error in ajax query, when update subcategory :(');
                    icon_load.hide(); // Прячем иконку статуса выполнения
                }
            });
        }

    });

// ----------------------------------- Нажатие на кнопку изменения категории ---------------------------------------- //

// ================================== Нажатие на кнопку удаления подкатегорий ======================================= //
    $("#btnDelSubcategories").click(function() {
        var id_subcategories = [], icon_load;
        $(".subCatCheckbox:checked").each(function(index) {
            id_subcategories.push($(this).val());
        });
        icon_load = $(this).closest('label').find('.iconLoading');
        icon_load.show(); // Показываем иконку загрузки
        $.ajax({type:"POST", async:true, data: id_subcategories, url: "/adm/ahid/delSubcategory", dataType:"json",
            success:function(data){
                if(data.status == 'ok') {
                    hints('success','Подкатегория удалена');

                } else {
                    hints('error','Что то пошло не так <small>( просмотрите логи )</small>');
                    console.log(data.message);
                }
                icon_load.hide(); // Прячем иконку статуса выполнения
            },
            error:function(){
                console.log('error in ajax query, when delete subcategory :(');
                icon_load.hide(); // Прячем иконку статуса выполнения
            }
        });

    });
// --------------------------------- Нажатие на кнопку удаления подкатегорий ----------------------------------------- //

}