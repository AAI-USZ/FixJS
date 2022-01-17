function(data){
                    if(data) {
                        hints('success','Вопрос бы успешно задан');
                        clearAddQuestionForm();
                    } else {
                        hints('error','Что то пошло не так');
                        console.log('При создании вопроса возникла ошибка');
                    }
                }