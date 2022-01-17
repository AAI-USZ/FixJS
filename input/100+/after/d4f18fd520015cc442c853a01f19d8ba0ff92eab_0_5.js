function(data){
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
                }