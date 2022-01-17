function() {
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
    }