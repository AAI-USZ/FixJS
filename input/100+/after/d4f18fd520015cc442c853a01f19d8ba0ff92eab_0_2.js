function() {
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
    }