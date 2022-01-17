function() {
    var CM = [
        {name: 'actions', width: 75, align: 'center', fixed: true, sortable: false, resize: false, formatter: 'actions', search: false},
        {name: 'attribute_name', index: 'attribute_name', width: 250, align:"center", editable: true, editrules: {"required":true}},
        {name: 'attribute_type', index: 'attribute_type', width: 250, align:"center", editable: true, edittype:"select", editoptions:{value:attributeTypeSelections}, stype: 'select', searchoptions: {sopt: ['eq', 'ne'], value:attributeTypeSearch}},
        {name: 'visible', index: 'visible', width: 250, align: 'center', editable: true, formatter: checkboxFormatter, edittype: 'checkbox', edittype: "checkbox", editoptions: {value: "TRUE"}, stype: 'select', searchoptions: {sopt: ['eq', 'ne'], value: "TRUE:Yes;FALSE:No"}}
    ];

    jQuery("#attributeControl").jqGrid({
        align:"center",
        url: attributeInfoUrl,
        editurl : editAttributeUrl,
        datatype: "json",
        mtype: "post",
        editable : true,
        colNames: jQuery.parseJSON(attributeControlCols),
        colModel: CM,
        height: "100%",
        width: "100%",
        rowNum: 25,
        scrollOffset:0,
        autowidth: true,
        loadonce: true,
        sortname : "attribute_name",
        rowList: [25,50,100,250,500,1000,5000],
        multiselect: true,
        pager: "#pager",
    });

    jQuery.extend($.fn.fmatter , {
        rowactions : function(rid,gid,act) {
            switch(act)
            {
                case 'edit' :
                    window.open(attributeEditUrl + '/' + rid, '_top');
                    break;
                case 'del':
                    $('#'+gid).jqGrid('delGridRow', rid);
                    break;
            }
        }
    });

    jQuery('#attributeControl').jqGrid('navGrid',
                                       '#pager',
                                       {add:true, del:true, edit:true},
                                       {width:400},
                                       {    width:400,
                                            reloadAfterSubmit: false,
                                            afterSubmit: function (response) {
                                                return [true, '', response.responseText];
                                            }
                                       },
                                       {},
                                       {multipleSearch:true, width:600}
                                      );

}