function(data){
                    if(data.status == 'ok') {
                        hints('success','Категория добавлена');
                        var tbody_cat, checkbox_ready, subcat_ready;
                        //  Если была создана подкатегория какой то категории
                        if(!data.is_category) {
                            tbody_cat = $("#catId"+data.id_category);
                            subcat_ready = tbody_cat.find(".subcatReady");
                            checkbox_ready = tbody_cat.find(".checkboxReady");
                            // Если не в тбоди не существует вакантного места в таблице, то добавляем новую строку
                            if((checkbox_ready.length == 0) && (subcat_ready.length == 0)) {
                                tbody_cat.append('<tr>' +
                                    '<td><input type="checkbox"></td><td><span class="catTitle">' + data.title + '</span>' +
                                    '<a class="changeCategory pull-right "><i class="icon-pencil"></i></a>' +
                                    '<div class="hide dvChangeCat">' +
                                    '<input type="text" class="catTitle" placeholder="Название" value="' + data.title + '">' +
                                    '<input type="text" class="catLabel" placeholder="Ярлык" value="' + data.label + '">' +
                                    '<input type="hidden" class="catId" value="' + data.id_category + '">' +
                                    '<a class="btn btn-primary btn-small updateCat">Применить</a>' +
                                    '<span class="iconLoading"><img src="/stfile/img/1loading.gif" alt="loading"></span>' +
                                    '</div></td>' +
                                    '<td class="checkboxReady"></td><td class="subcatReady"></td></tr>');
                            // Если же вакантное место имеется, то записываем данные в него
                            } else {
                                subcat_ready.append('<span class="catTitle">' + data.title + '</span>' +
                                '<a class="changeCategory pull-right "><i class="icon-pencil"></i></a>' +
                                    '<div class="hide dvChangeCat">' +
                                    '<input type="text" class="catTitle" placeholder="Название" value="' + data.title + '">' +
                                    '<input type="text" class="catLabel" placeholder="Ярлык" value="' + data.label + '">' +
                                    '<input type="hidden" class="catId" value="' + data.id_category + '">' +
                                    '<a class="btn btn-primary btn-small updateCat">Применить</a>' +
                                    '<span class="iconLoading"><img src="/stfile/img/1loading.gif" alt="loading"></span>' +
                                '</div>');
                                checkbox_ready.append('<input type="checkbox">');
                                subcat_ready.removeClass('subcatReady');
                                checkbox_ready.removeClass('checkboxReady');
                            }
                        // Если создаеться категория
                        } else {
                            $("#tblCategoriesList").append('' +
                                '<tbody class="tbCategory" id="catId' + data.id_category + '"><tr><td colspan="4" class="alert alert-info">' +
                                '<span class="catTitle">'+ data.title +'</span>' +
                                '<a class="changeCategory pull-right "><i class="icon-pencil"></i></a>' +
                                '<div class="hide dvChangeCat">' +
                                '<input type="text" class="catTitle" placeholder="Название" value="' + data.title + '">' +
                                '<input type="text" class="catLabel" placeholder="Ярлык" value="' + data.label + '">' +
                                '<input type="hidden" class="catId" value="' + data.id_category + '">' +
                                '<a class="btn btn-primary btn-small updateCat isParentCat">Применить</a>' +
                                '<span class="iconLoading"><img src="/stfile/img/1loading.gif" alt="loading"></span>' +
                                '</div></td></tr><tr></tr></tbody>');

                            // Добавляем в выпадающий список только что добавденную категорию
                            $("#frmAddNewCategory .parentCategory").append('<option value="' + data.id_category + '">' +
                                data.title +'</option>');
                        }
                        clearAddCategoryForm();
                    } else {
                        hints('error','Что то пошло не так <small>( просмотрите логи )</small>');
                        console.log(data.message);
                    }
                }