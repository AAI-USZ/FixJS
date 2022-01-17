function(i,elem){
            switch (elem.nodeName.toLowerCase()) {
                case 'label':
                    alert("label");
                    break;
                default:
                    extension += elem.nodeName.toLowerCase() +":("+ $(elem).html() +")";
            }
        }