function(){
  $("#tabt").jqGrid({
      url: hell.p.urlapi+'/data?action=getdata',
      datatype: "json",
      mtype: "POST",
      colNames:['','Город','Улица','Дом','Квартира','Контактное лицо','Телефон','required','info','Состояние жилья','Статус','',''],
      colModel:[
        {name:'id', index:'id', hidden:true, key:true},
        {name:'city', index:'city', width:25, editable:true},
        {name:'street', index:'street', width:50, editable:true},
        {name:'house', index:'house', width:15, editable:true},
        {name:'flat', index:'flat', width:15, editable:true},
        {name:'contact', index:'contact', width:60, editable:true},
        {name:'phone', index:'phone', width:40, editable:true},
        {name:'required', index:'required', width:55, editable:true},
        {name:'info', index:'info', width:55, editable:true},
        {name:'condition_house', index:'condition_house', width:55, editable:true},
        {name:'status', index:'status', width:55, editable:true,edittype:'select',formatter:'select',editoptions:{value:"1:Новая;2:В работе;3:Закрыта"}},
        {name:'lat', index:'lat', hidden:true, editable:true},
        {name:'lon', index:'lon', hidden:true, editable:true}
     ],
//      rowNum:30,
//      width: 1250,
//      rowList:[30,70],
      caption:"Таблица данных",
      pager: '#tabp',
      sortname: 'id',
//      ignoreCase: true,
//      pgbuttons: false,
//      pginput: false,
      height: 250,
      viewrecords: true,
      modal: false,
      jsonReader: { repeatitems: false },
      editurl: hell.p.urlapi+'/data?action=setdata',
      sortorder: "desc",
 /*     loadComplete: function(){
        $('#more_grid [aria-describedby=more_grid_check]>input').change(function(){
          $("#more_grid").jqGrid().setRowData(
            $(this).closest('tr').attr('id'),
            {check:this.checked}
          )
        })
      },*/
      beforeSelectRow: function(rowid) {
        var marker = hell.map.allmarkers[$('#tabt').jqGrid('getRowData',rowid).id];
        if (!marker) {
          hell.map.closePopup();
          return true;
        }

        hell.map.panTo(marker.getLatLng());
        marker.openPopup();
        return true;
      },
      onHeaderClick: function() {
        onresize();
      }
    /*  beforeSelectRow: function(rowid) {
        $("#moreval_grid").jqGrid(
          'setGridParam',{
          url:'http://ersh.homelinux.com:8091/api/data?action=getmoreval&lang='+$("#lang>[name=lang]").val()+'&class='+$("#more_grid").jqGrid('getRowData',rowid).class,
          editurl:'http://ersh.homelinux.com:8091/api/data?action=setmoreval&lang='+$("#lang>[name=lang]").val()+'&class='+$("#more_grid").jqGrid('getRowData',rowid).class,
          datatype:'json'
        }).trigger("reloadGrid");
        $('#gbox_moreval_grid').removeClass('hide');
        return true;
      }*/
  });
  $("#tabt").jqGrid('filterToolbar',{searchOnEnter:false});
  
  $("#tabt").jqGrid('navGrid','#tabp',
    {edit:true,add:true,del:false,search:false,refresh:true},
    { //edit
      closeAfterEdit: true,
      width :  400,
      afterSubmit: function (response, postdata) {
        var success = true;
        var message = "";
        var json = jQuery.parseJSON(response.responseText);
        if(json.errors) {
          success = false;
          for(i=0; i < json.errors.length; i++) {
            message += json.errors[i] + '<br/>';
          }
        }
        if(json.error) {
          success = false;
          message +=json.error;
        }
        $(this).jqGrid('setGridParam', {datatype:'json'});
        return [success,message];
      },
      afterShowForm : function (formid) {
    	  window.osmhell.connectToForm(formid);        
      }
    },
    { //add
      closeAfterAdd : true,
      width :  400,
      afterSubmit: function (response, postdata) {
        var success = true;
        var message = "";
        var json = jQuery.parseJSON(response.responseText);
        if(json.errors) {
          success = false;
          for(i=0; i < json.errors.length; i++) {
            message += json.errors[i] + '<br/>';
          }
        }
        if(json.error) {
          success = false;
          message +=json.error;
        }
        var new_id = "1";
        $(this).jqGrid('setGridParam', {datatype:'json'});
        return [success,message,new_id];
      },
      afterShowForm : function (formid) {
    	  window.osmhell.connectToForm(formid);        
      } 
    }
  );
  
  
}