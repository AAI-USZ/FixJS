function initContentList() {
    if (!contentDataTable) {
        //zq:此处需判断栏目类型加载列表数据
        var url;
        if(contentType=='新闻'){
            url="../group/listContent.action?continfo.ciCate=1000";//医院新闻
        }else{
            url="../group/listContent.action?continfo.ciCate=2000";//其它栏目
        }
        
        contentDataTable = $("#J_ContentTable").dataTable({
            bProcessing: false,
            bServerSide:true,//设置服务端分页
            bDestory:false,
            //bRetrieve:true,
            sAjaxSource:url,
            sAjaxDataProp: "page.dataList",
            oSearch: {"sSearch": ""},
            bAutoWidth:false,
            fnServerData:function(sSource, aoData, fnCallback) {
                var params = [];
                var iDisplayStart,iDisplayLength,sEcho,sSearch;
                for (var i = 0; i < aoData.length; i++) {
                    if (aoData[i].name == "iDisplayStart") {
                        iDisplayStart = aoData[i].value;
                    }
                    if (aoData[i].name == "iDisplayLength") {
                        iDisplayLength = aoData[i].value;
                    }
                    if (aoData[i].name == "sEcho") {
                        sEcho = aoData[i].value;
                    }
                    if (aoData[i].name == "sSearch") {
                        sSearch = aoData[i].value;
                    }
                }
                params.push({ "name": "page.pageSize", "value": iDisplayLength });
                var currentPageNo = Math.floor(iDisplayStart / iDisplayLength) + 1;
                params.push({ "name": "page.currentPageNo", "value": currentPageNo });
                $.ajax({
                    dataType: 'json',
                    type: "GET",
                    url: sSource,
                    data: params,
                    success: function(json) {
                        if (json.resultCode > 0) {
                        } else {
                            $.fn.sdInfo({
                                type:"fail",
                                content:json.message ? json.message : "查询列表错误!"
                            });
                        }
                        //处理返回结果
                        if (!json.page) {
                            json.page = {};
                        }
                        if (!json.page.dataList) {//处理返回结果
                            json.page.dataList = [];
                        }
                        json.sEcho = sEcho;
                        json.iTotalRecords = json.page.totalItemCount;
                        json.iTotalDisplayRecords = json.page.totalItemCount;

                        fnCallback(json);
                        setTableTrColor();
                        $('#J_ContentTable input[type=checkbox]').sdCheckBox();
                    }
                });
            },
            aoColumns: [
                {
                    fnRender:function(obj) {
                        return "<input type='checkbox' value='" + obj.aData.contId + "'/>";
                    }
                },
                {
                    fnRender:function(obj) {
                        return "<span class='hidden1 tl' style='width:100%;'>" + obj.aData.contTitle + "</span>";
                    }
                },
                {
                    fnRender:function(obj) {
                        return obj.aData.colName?"<span class='hidden3 tl'>" + obj.aData.colName + "</span>":"<span class='hidden2 tl'>未选择</span>";
                    }
                },
                {
                    fnRender:function(obj) {
                        return "<span>" + obj.aData.contPublish_Time + "</span>";
                    }
                },
                {
                    fnRender:function(obj) {
                        return obj.aData.contAuthor?"<span class='hidden3 tl'>" + obj.aData.contAuthor + "</span>":"<span class='hidden3 tl'>未填写</span>";
                    }
                },
                //隐藏作者列
//                {
//                    fnRender:function(obj) {
//                       var contAuthorName = obj.aData.contAuthorName;
//                       if(undefined == contAuthorName || !contAuthorName){
//                           return "<span>未知</span>";
//                       }else {
//                           return "<span>" + obj.aData.contAuthorName + "</span>";
//                       }
//                    }
//                },
                {
                    fnRender:function(obj) {
                        var state = "未通过";
                        className = "red";
                        if ( 1 == obj.aData.contAudit_Result ) {
                            state = "已通过";
                            className = "green";
                        }
                        return "<span class='" + className + " unl J_Audit'>" + state + "</span>";                       
                    }
                },
                {
                    fnRender:function(obj) {
                        return "<a class='view' href='/admin/main/news/newsDetail.shtml?contId="+obj.aData.contId+"' target='_blank'></a>";
                    }
                },
                {
                    fnRender:function(obj) {
                        return "<a class='edit J_ContentEdit'></a>";
                    }
                },
                {
                    fnRender:function(obj) {
                        return "<a class='del J_ContentDel'></a>";
                    }
                }
            ],
            sPaginationType: "full_numbers",
                   aoColumnDefs: [
                         { "bSortable": false, "aTargets": [0,6,7,8]}
                     ]
        });
    } else {
        contentDataTable.fnClearTable();
        $.getJSON(
                "../group/listContent.action",
                function(json) {
                    if (json.resultCode > 0) {
                    } else {
                        $.fn.sdInfo({
                            type:"fail",
                            content:json.message ? json.message : "查询列表错误!"
                        });
                    }
                    if (!json.contList) {
                        json.contList = [];
                    }
                    contentDataTable.fnAddData(json.contList);
                    setTableTrColor();
                    $('#J_ContentTable input[type=checkbox]').sdCheckBox();
                }
                );
    }
}