function(data){
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
                }