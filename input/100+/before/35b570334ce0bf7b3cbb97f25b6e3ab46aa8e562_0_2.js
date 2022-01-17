function(response){
      result = Ext.util.JSON.decode(response.responseText);

      for(i=0; i<result.length; i++){
        if( document.getElementById('NOTIFIER_'+result[i].item ) ){
          oldValue = document.getElementById('NOTIFIER_'+result[i].item).innerHTML;
          oldValue = oldValue.replace('<b>', '');
          oldValue = oldValue.replace('</b>', '');

          newValue = result[i].count;

          if( oldValue != newValue && oldValue != 0 ){
            document.getElementById('NOTIFIER_'+result[i].item).innerHTML = '<b>' + result[i].count + '</b>';
            //NOTIFIER_FLAG = true;
          } else {
            //if(NOTIFIER_FLAG === false){
              document.getElementById('NOTIFIER_'+result[i].item).innerHTML = result[i].count;
            //}
          }
        }
        else continue;
      }
      Ext.getCmp('refreshNotifiers').setIcon('/images/refresh.gif');

    }