function(data) {
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
                }