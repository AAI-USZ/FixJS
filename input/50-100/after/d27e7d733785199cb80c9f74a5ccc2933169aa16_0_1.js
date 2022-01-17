function() {
        $form.isValid('reset');
        if(callback.close){
          callback.close();
        }
        for(i = 0; i < fieldsLength; i++){
          fields[i].val('')
            .removeAttr('checked')
            .removeAttr('selected');
        }
      }