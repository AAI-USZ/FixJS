function() {
        var showed_title, hidden_block, icon_load, cat_id, cat_title, cat_label,
            transfer_data = {title:'', label:'', id_category:'', is_parent:'no'};

        showed_title = $(this).closest('td').find('.catTitle'); // Название категории которое выводиться в списке категорий
        hidden_block = $(this).closest('.dvChangeCat');
        icon_load = $(this).closest('.dvChangeCat').find('.iconLoading');
        cat_id = $(this).closest('.dvChangeCat').find('.catId');
        cat_title = $(this).closest('.dvChangeCat').find('.catTitle');
        cat_label = $(this).closest('.dvChangeCat').find('.catLabel');
        transfer_data.id_category = cat_id.val();
        transfer_data.title = cat_title.val();
        transfer_data.label = cat_label.val();

        // Если изменяем категорию
        if($(this).hasClass('isParentCat')) {
            transfer_data.is_parent = 'yes'
        // Если изменяем подкатегорию
        } else {
            transfer_data.is_parent = 'no'
        }

        // Если поле с названием категории не пустое
        if(cat_title.val() != '') {
            icon_load.show(); // Показываем иконку загрузки
            $.ajax({type:"POST", async:true, data: transfer_data, url: "/adm/ahid/updateCategory", dataType:"json",
                success:function(data){
                    if(data.status == 'ok') {
                        hints('success','Категория обновлена');
                        // Перезаписываем все данные, но уже используя результаты выполнения от сервера
                        cat_id.val(data.id_category);
                        cat_title.val(data.title);
                        cat_label.val(data.label);
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

    }