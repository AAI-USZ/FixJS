function(index, obj){
      var label_val = "";
      if ($(obj).attr("data-" + type)){
        label_val = $(obj).attr("data-" + type);
      } else if ($(obj).attr("data")){
        label_val = $(obj).attr("data");
      } else
         return true;
      $('label[for=' + $(obj).attr('id') + ']').html(label_val);
    }