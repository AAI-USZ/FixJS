function(e){
            e.preventDefault();
            
            var erros = self.find('.error');
            var camposErrados = '';
            var camposObrigatorios = '';
            var ulErrados = undefined;
            var ulObrigatorios = undefined;
            var modalCorrecoes = $('<div></div>');

            if(erros.length > 0){
                erros.each(function(i, o){
                    camposErrados += '<li>'+ $(this).find('label').text() +'</li>';
                });

                ulErrados = $('<ul></ul>').append(camposErrados);
                modalCorrecoes.append('<span>Existem campos com valores incorretos:</span><br />', ulErrados);
            }
            $.each(requireds, function(i, o){
                var type = o.attr('type');
                switch(type){
                    case 'hidden':
                        type = 'text';
                    case 'text':
                        if(o.val() == ''){
                            camposObrigatorios += '<li>'+ o.find('label').text() +'</li>';
                        }
                        break;
                }

                ulObrigatorios = $('<ul></ul>').append(camposObrigatorios);
                modalCorrecoes.append('<span>Existem campos obrigatórios em branco:</span><br />', ulObrigatorios);
            });

            if(ulErrados || camposObrigatorios != ''){
                alert('colocar modal aki\n'+camposErrados+'\n'+camposObrigatorios);
            }else{
                self.unbind('submit.validation').submit();
            }
        }