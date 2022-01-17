function() {
        if(($("input[name=question_title]").val() == '') || ($(".label-tags").length == 0)) {
            hints('info','Для создания вопроса необходимао как минимуму ввести его заголовок, и выбрать одну категорию!');
        } else {
            // Переписываем текст с редактора в текстареа для дальнейшей серриализации данных формы
            $("#question").val(REDACTOR_QUESTION.getCodeTextarea());
            var form_data = $("#frmAddQuestion").serialize();
            $.ajax({type:"POST", async:true, data: form_data, url: "/adm/ahid/addQuestion", dataType:"json",
                success:function(data){
                    if(data) {
                        hints('success','Вопрос бы успешно задан');
                        clearAddQuestionForm();
                    } else {
                        hints('error','Что то пошло не так');
                        console.log('При создании вопроса возникла ошибка');
                    }
                },
                error:function(){
                    console.log('error in ajax query, when add answer :(');
                }
            });
        }
    }