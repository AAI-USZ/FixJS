function(){
           // I could make this dynamic by using the keyup() function instead of each()
           // but, really, I only care about this for property names which are readOnly anyway
           var chars = $(this).val().length;
           $(this).attr("size",chars);               
       }