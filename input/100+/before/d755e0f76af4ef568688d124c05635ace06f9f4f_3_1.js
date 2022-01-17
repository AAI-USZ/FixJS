function () {
        this.items=[
            {
                xtype: 'container',
                layout: {
                    type: 'column'
                }, 
                margin: '5 0 0 5',
                defaults: {
                    labelWidth: 50,
                    margin: '0 5 0 0'
                },
                width: 550,
                items: [
                    {
                        xtype: 'textfield',
                        id: 'nb-war-id',
                        fieldLabel: '№ п\п',
                        width: 120,
                        readOnly: true
                    },                    
                    {
                        xtype: 'datefield',
                        id:'nb-war-date-start',
                        format: 'd.m.Y',
                        fieldLabel: 'Принято',
                        labelWidth: 60,
                        width: 150,
                        readOnly: true
                    },
                    {
                        xtype: 'datefield',
                        id:'nb-war-date-end',
                        format: 'd.m.Y',
                        fieldLabel: 'Выдано',
                        labelWidth: 60,
                        width: 150,
                        readOnly: true 
                    },
                    {
                        xtype: 'checkbox',
                        id: 'nb-war-in-workshop',
                        boxLabel: 'В мастерской'
                    }
                ]
            },
            {
                xtype: 'container',
                margin: '0 0 0 5',
                defaults: {
                    margin: '0 5 0 0',
                    labelWidth: 30
                },
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Изделие',
                        width: 550,
                        padding: '0 5 0 5',                    
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'nb-war-prod',
                                fieldLabel: 'Изделие',
                                labelWidth: 80,
                                width: 535,
                                vtype: 'cyralphanumplus',
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                id: 'nb-war-model',
                                fieldLabel: 'Модель',
                                labelWidth: 80,
                                width: 535,
                                vtype: 'cyralphanumplus'
                            },                            
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'textfield',                                        
                                        id: 'nb-war-ser-num',
                                        fieldLabel: 'Cерийный №',
                                        labelWidth: 80,
                                        width: 265,
                                        vtype: 'cyralphanumplus'                                       
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'nb-war-fac-num',
                                        fieldLabel: 'Заводской №',
                                        labelWidth: 80,
                                        width: 265,
                                        vtype: 'cyralphanumplus'                                        
                                    }                                    
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id: 'nb-war-guar',
                                        fieldLabel: 'Гарантия',
                                        labelWidth: 80,
                                        width: 265,
                                        vtype: 'cyralphanumplus'                                       
                                    },
                                    {
                                        xtype: 'combobox',
                                        id: 'nb-war-cat',
                                        fieldLabel: 'Категория',
                                        labelWidth: 80,
                                        width: 265,
                                        store: 'Category',
                                        displayField: 'name',
                                        valueField: 'id',
                                        forceSelection: true
                                    }                                    
                                ]
                            }     
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                margin: '0 0 0 5',
                defaults: {
                    margin: '0 5 0 0',
                    labelWidth: 30
                },
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Владелец',
                        width: 550,
                        padding: '0 5 0 5',                    
                        items: [
                            {   
                                xtype: 'textfield',
                                id:'nb-war-cust',
                                fieldLabel: 'ФИО',
                                labelWidth: 80,
                                width: 535,
                                vtype: 'cyralphanumplus',
                                allowBlank: false
                            },
                            {   
                                xtype: 'textfield',
                                id: 'nb-war-cust-info',
                                fieldLabel: 'Личная инф.',
                                labelWidth: 80,
                                width: 535,
                                vtype: 'cyralphanumplus'                                 
                            },                            
                            {   
                                xtype: 'textfield',
                                id:'nb-war-adr',
                                fieldLabel: 'Адресс',
                                labelWidth: 80,
                                width: 535,
                                vtype: 'cyralphanumplus'
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {   
                                        xtype: 'textfield',
                                        id:'nb-war-hphone',
                                        fieldLabel: 'Дом. тел.',
                                        labelWidth: 80,
                                        width: 175,
                                        vtype: 'phone'
                                    }, 
                                    {   
                                        xtype: 'textfield',
                                        id:'nb-war-wphone',
                                        fieldLabel: 'Раб. тел.',
                                        labelWidth: 80,
                                        width: 175,
                                        padding: '0 0 0 2',
                                        vtype: 'phone'
                                    },
                                    {   
                                        xtype: 'textfield',
                                        id:'nb-war-phone',
                                        fieldLabel: 'Моб. тел.',
                                        labelWidth: 80,
                                        width: 175,
                                        padding: '0 0 0 2',
                                        vtype: 'phone'
                                    }                                  
                                ]
                            },                            
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {   
                                        xtype: 'datefield',
                                        id:'nb-war-date-notif',
                                        format: 'd.m.Y',
                                        fieldLabel: 'Сообщено',
                                        labelWidth: 80,
                                        width: 175
                                    },
                                    {
                                        xtype: 'combobox',
                                        id: 'nb-war-cust-state',
                                        fieldLabel: 'Статус',
                                        labelWidth: 80,
                                        width: 260,
                                        padding: '0 2 0 2',
                                        store: 'Status',
                                        displayField: 'name',
                                        valueField: 'id',
                                        forceSelection: true                                         
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'nb-war-copy-cust-info',
                                        text: 'Копировать',
                                        icon: icons_path+'copy.png'
                                    }
                                ]
                            }                             
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                margin: '0 0 0 5',
                defaults: {
                    margin: '0 5 0 0',
                    labelWidth: 30
                },
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Жалобы',
                        width: 550,
                        padding: '0 5 0 5',                    
                        items: [
                            {   
                                xtype: 'textfield',
                                id: 'nd-war-compl',
                                fieldLabel: 'Жалобы',
                                labelWidth: 80,
                                width: 535,
                                vtype: 'cyralphanumplus'                                 
                            },
                            {   
                                xtype: 'textarea',
                                id:'nb-war-pref',
                                fieldLabel: 'Проделаная работа',
                                labelWidth: 80,
                                width: 535,
                                height: 50                                
                            }, 
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        id: 'nb-war-note-templ',
                                        fieldLabel: 'Заметки',
                                        labelWidth: 80,
                                        width: 200,
                                        store: 'Notetpl',
                                        displayField: 'name',
                                        valueField: 'id',
                                        forceSelection: true                                          
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'nb-war-add-note-templ',
                                        icon: icons_path+'arr-left.png'
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'nb-war-notes',
                                        width: 310//,
                                        //vtype: 'cyralphanumplus'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                margin: '0 0 0 5',
                defaults: {
                    margin: '0 5 0 0',
                    labelWidth: 30
                },
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Ведомости про гарантию',
                        width: 550,
                        padding: '0 5 0 5',                    
                        items: [
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        id: 'nb-war-seller',
                                        fieldLabel: 'Продавець',
                                        labelWidth: 80,
                                        width: 265,
                                        store: 'Seller',
                                        displayField: 'name',
                                        valueField: 'id',
                                        forceSelection: true                                         
                                    },
                                    {   
                                        xtype: 'textfield',
                                        id: 'nb-war-ticket-price',
                                        fieldLabel: 'Чек, цена',
                                        labelWidth: 80,
                                        width: 265,
                                        vtype: 'cyralphanumplus'                                 
                                    }
                                ]
                            },
                            {   
                                xtype: 'textarea',
                                id: 'nb-war-guar-comm',
                                fieldLabel: 'Комментарии',
                                labelWidth: 80,
                                width: 535,
                                height: 50                                
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        id: 'nb-war-mas-prim',
                                        fieldLabel: 'Мастер',
                                        labelWidth: 80,
                                        width: 265,
                                        store: 'Master',
                                        displayField: 'name',
                                        valueField: 'id'                                        
                                    },
                                    {   
                                        xtype: 'textfield',
                                        id: 'nb-war-work-prim',
                                        fieldLabel: 'Работа',
                                        labelWidth: 50,
                                        width: 240,
                                        emptyText: '0',
                                        vtype: 'mathexp'                                         
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'nb-war-master-visible-toggle',
                                        icon: icons_path+'mas-togg.png'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                id: 'nb-war-sec-mas-container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                hidden: true,
                                items: [
                                    {
                                        xtype: 'combobox',
                                        id: 'nb-war-mas-sec',
                                        fieldLabel: 'Мастер',
                                        labelWidth: 80,
                                        width: 265,
                                        store: 'Master',
                                        displayField: 'name',
                                        valueField: 'id'                                        
                                    },
                                    {   
                                        xtype: 'textfield',
                                        id: 'nb-war-work-sec',
                                        fieldLabel: 'Работа',
                                        labelWidth: 50,
                                        width: 240,
                                        emptyText: '0',
                                        vtype: 'mathexp'                                         
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {   
                                        xtype: 'textfield',
                                        id: 'nb-war-det',
                                        fieldLabel: 'Запчасти',
                                        labelWidth: 80,
                                        width: 175,
                                        emptyText: '0',
                                        vtype: 'mathexp'
                                    }, 
                                    {   
                                        xtype: 'textfield',
                                        id: 'nb-war-trans',
                                        fieldLabel: 'Транспорт',
                                        labelWidth: 80,
                                        width: 175,
                                        padding: '0 0 0 2',
                                        emptyText: '0',
                                        vtype: 'mathexp'                                        
                                    },
                                    {   
                                        xtype: 'textfield',
                                        id: 'nb-war-total-price',
                                        fieldLabel: 'Итого',
                                        labelWidth: 80,
                                        width: 175,
                                        padding: '0 0 0 2',
                                        vtype: 'decimal'
                                    }                                  
                                ]
                            }                            
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                layout: {
                    type: 'column',
                    align: 'right'
                },
                width: 550,
                margin: '5 0 0 0',
                items: [
                    {
                        xtype: 'datefield',
                        id: 'nb-war-gdate',
                        labelWidth: 85,
                        margin: '0 0 0 5',
                        width: 180,
                        format: 'd.m.Y',
                        fieldLabel: 'Гарантия до'
                    },
                    {
                        xtype: 'button',
                        id: 'nb-war-upload-file',
                        text: 'Загрузить файл',
                        icon: icons_path+'file-upl.png',
                        margin: '0 0 0 210'
                    },
                    {
                        xtype: 'form',
                        id: 'nb-war-file-upload-form',
                        padding: '0',
                        bodyStyle: {
                            background: '#DFE9F6'
                        },
                        border: false,
                        items: [
                            {
                                xtype: 'filefield',
                                name: 'userfile',
                                id: 'nb-war-file',
                                msgTarget: 'side',
                                allowBlank: false,
                                anchor: '100%',
                                buttonConfig: {
                                    icon: icons_path+'file-browse.png'
                                },
                                buttonText: '',
                                buttonOnly: true,
                                margin:'0',
                                msgTarget: 'none'
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        id: 'nb-war-view-file',
                        icon: icons_path+'file-view.png'
                    }
                ]
            }            
        ];
        this.callParent();
    }