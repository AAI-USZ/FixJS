function updateCasesTree() {
  //treeMenuItems.root.reload();
  document.getElementById('refreshNotifiers').src = '/images/ext/default/grid/loading.gif';

  itemsTypes = Array('CASES_INBOX', 'CASES_DRAFT', 'CASES_CANCELLED', 'CASES_SENT', 'CASES_PAUSED', 'CASES_COMPLETED','CASES_SELFSERVICE');
  if(currentSelectedTreeMenuItem){
    ReloadTreeMenuItemDetail({item:currentSelectedTreeMenuItem});
  }
  Ext.Ajax.request({
    url: 'casesMenuLoader?action=getAllCounters&r='+Math.random(),
    success: function(response){
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
      document.getElementById('refreshNotifiers').src = '/images/refresh.gif';

    },
    failure: function(){},
    params: {'updateCasesTree': true}
  });
  
}