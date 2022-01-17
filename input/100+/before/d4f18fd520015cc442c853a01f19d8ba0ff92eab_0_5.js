function(data){
                    if(data) {
                        hints('success','Вопрос бы успешно задан');
                        var key = 0, appended = '';
                        for( var i = 0; i< data.count; i++ ) {
                            appended += '' +
                                '<div class="subcatItem">' +
                                '<label class="checkbox">' +
                                '<input type="checkbox" value="' + data.update[i].title + '" id="id' + data.update[i].id_subcategory + '" name="tags[]">' +
                                data.update[i].title + '</label>' +
                                '</div>';
                        }
                        $(".tab-pane#0").find(".innerTabPane").append(appended);
                        clearAddQuestionForm();
                    } else {
                        hints('error','Что то пошло не так');
                        console.log('При создании вопроса возникла ошибка');
                    }
                }