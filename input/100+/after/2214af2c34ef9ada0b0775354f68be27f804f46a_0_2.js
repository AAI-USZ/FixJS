function() {
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

    }