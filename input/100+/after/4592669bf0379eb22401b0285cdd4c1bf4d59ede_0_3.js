function() {
            if (maxOccurs == "unbounded" || currentCount < maxOccurs) {
                var html = generateFormFromComplexTypeNodeNoRepeat(tagRaiz, xmlNode, namePattern+"__"+currentCount, name, "Item "+(currentCount+1));
                divRepeat.appendChild(html);

                var buttonDelItem = document.createElement('input');
                buttonDelItem.setAttribute('type', 'button');
                buttonDelItem.setAttribute('id', 'remove' + currentCount);
                buttonDelItem.setAttribute('value', 'Remover este item');
                //divRepeat.appendChild(buttonDelItem);
                html.appendChild(buttonDelItem);
               // $('#bt_'+namePattern+'__'+currentCount+'__composicaoFamiliar').click(function() {delField($(this).attr('id'), divRepeat);});
                // deletar
               $('#'+'remove' + currentCount).click(function() {
                   $( this ).parent().remove();
                });
                currentCount++;
                genereteXsdFormUIInMaxOccurs();
            }
            refreshEnableDisable();
            updateRequired();
        }