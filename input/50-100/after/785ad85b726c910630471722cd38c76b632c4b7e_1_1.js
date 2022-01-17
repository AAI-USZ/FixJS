function(i, o){
                var type = o.attr('type');
                switch(type){
                    case 'hidden':
                        type = 'text';
                    case 'text':
                        if(o.val() == ''){
                            camposObrigatorios += '<li>'+ o.parent().parent().find('label').text() +'</li>';
                        }
                        break;
                }

                ulObrigatorios = $('<ul></ul>').append(camposObrigatorios);
                modalCorrecoes.append('<span>Existem campos obrigatórios em branco:</span><br />', ulObrigatorios);
            }