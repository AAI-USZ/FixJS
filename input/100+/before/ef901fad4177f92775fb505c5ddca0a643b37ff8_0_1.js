function(subgrid_id,row_id) {
            subgrid_table_id = subgrid_id+"_t";
            pager_id = "p_"+subgrid_table_id;
            second_subgrid_table_id = subgrid_id+"_tt"; //new name for table selector –> tt
            second_pager_id = "p_"+second_subgrid_table_id;
            $("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table><div id='"+pager_id+"' class='scroll'></div>");
            $("#"+subgrid_id).append("<div id='hide_"+second_subgrid_table_id+"'><table id='"+second_subgrid_table_id+"' class='scroll'></table><div id='"+second_pager_id+"' class='scroll'></div>");

            /* Subgrid that displays survey links */
            jQuery("#"+second_subgrid_table_id).jqGrid( {
                datatype: "json",
                url: surveylinkUrl+'/'+row_id,
                height: "100%",
                width: "100%",
                colNames:[surveyNameColTxt,surveyIdColTxt,tokenIdColTxt,dateAddedColTxt],
                colModel:[{ name:'surveyname',index:'surveyname', width:100,align:'center'},
                { name:'surveyid',index:'surveyid', width:90,align:'center'},
                { name:'tokenid',index:'tokenid', width:100,align:'center'},
                { name:'dateadded',index:'added', width:120,align:'center'}],
                caption: linksHeadingTxt,
                gridComplete: function () {
                    var recs = $("#"+second_subgrid_table_id).jqGrid('getGridParam','reccount');
                    if (recs == 0 || recs == null) {
                        //$("#"+second_subgrid_table_id).setGridHeight(40);
                        $("#hide_"+second_subgrid_table_id).hide();
                        //$("#NoRecordContact").show();
                    }
                }
            });
            /* Subgrid that displays user attributes */
            jQuery("#"+subgrid_table_id).jqGrid( {
                url: getAttribute_json+'/'+row_id,
                editurl:editAttributevalue,
                datatype: "json",
                mtype: "post",
                pgbuttons:false,
                recordtext:'',
                pgtext:'',
                caption: attributesHeadingTxt,
                editable:true,
                loadonce : true,
                colNames: [actionsColTxt,participantIdColTxt,attributeTypeColTxt,attributeNameColTxt,attributeValueColTxt,attributePosValColTxt],
                colModel: [ { name:'act',index:'act',width:55,align:'center',sortable:false,formatter:'actions',formatoptions : { keys:true,onEdit:function(id){ }}},
                { name:'participant_id',index:'participant_id', width:150, sorttype:"string",align:"center",editable:true,hidden:true},
                { name:'atttype',index:'atttype', width:150, sorttype:"string",align:"center",editable:true,hidden:true},
                { name:'attname',index:'attname', width:150, sorttype:"string",align:"center",editable:false},
                { name:'attvalue',index:'attvalue', width:150, sorttype:"string",align:"center",editable:true},
                { name:'attpvalues',index:'attpvalues', width:150, sorttype:"string",align:"center",editable:true,hidden:true}],
                rowNum:20,
                pager: pager_id,
                gridComplete: function () {
                    /* Removes the delete icon from the actions bar */
                    $('div.ui-inline-del').html('');
                },
                ondblClickRow: function(id,subgrid_id) {
                    var parid = id.split('_');
                    var participant_id = $("#displayparticipants_"+parid[0]+"_t").getCell(id,'participant_id');
                    var lsel = parid[0];
                    var can_edit = $('#displayparticipants').getCell(participant_id,'can_edit');
                    if(can_edit == 'false') {
                        var dialog_buttons={};
                        dialog_buttons[okBtn]=function(){
                            $( this ).dialog( closeTxt );
                        };
                        /* End of building array for button functions */
                        $('#notauthorised').dialog({
                            modal: true,
                            title: accessDeniedTxt,
                            buttons: dialog_buttons
                        });
                    } else {
                        var att_type = $("#displayparticipants_"+parid[0]+"_t").getCell(id,'atttype');
                        if(att_type=="DP") { //Date
                            $("#displayparticipants_"+parid[0]+"_t").setColProp('attvalue',{ editoptions:{ dataInit:function (elem) {$(elem).datepicker();}}});
                        }
                        if(att_type=="DD") { //Dropdown
                            var att_p_values = $("#displayparticipants_"+parid[0]+"_t").getCell(id,'attpvalues');
                            $("#displayparticipants_"+parid[0]+"_t").setColProp('attvalue',{ edittype:'select',editoptions:{ value:":Select One;"+att_p_values}});
                        }
                        if(att_type=="TB") { //Textbox
                            $("#displayparticipants_"+parid[0]+"_t").setColProp('attvalue',{ edittype:'text'});
                            $("#displayparticipants_"+parid[0]+"_t").setColProp('attvalue',{ editoptions:''});
                        }
                        var attap = $("#displayparticipants_"+parid[0]+"_t").getCell(id,'attap');
                        if(id && id!==lastSel2) { //If there was already another row open for editin save it before editing this one
                            jQuery("#displayparticipants_"+parid[0]+"_t").saveRow(lastSel2);
                            //jQuery.fn.fmatter.rowactions('97358ea2-8227-483b-a225-5d13a522402e_50','displayparticipants_97358ea2-8227-483b-a225-5d13a522402e_t','cancel',0);
                            lastSel2=id;
                        }
                        $.fn.fmatter.rowactions(id,'displayparticipants_'+parid[0]+'_t','edit',0);
                        jQuery("#displayparticipants_"+parid[0]+"_t").jqGrid('editRow',id,true);
                        jQuery("#displayparticipants_"+parid[0]+"_t").editRow(id,true);
                    }
                },
                height: '100%'
            });
        }