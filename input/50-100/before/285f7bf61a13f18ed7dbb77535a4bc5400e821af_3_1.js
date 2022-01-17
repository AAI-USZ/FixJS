function (data) {
        $('#jqgGroupAttendance').jqGrid({
            url: '/Ajax/FetchGroupAttendance',
            datatype: 'json',
            mtype: 'POST',
            colNames: data.colNames,
            colModel: data.colModel,
            pager: $('#jqgpGroupAttendance'),
            rowNum: 15,
            sortname: 'Name',
            sortorder: 'asc',
            viewrecords: true,
            width: 'auto',
            height: 'auto'
        }).navGrid('#jqgpVisitors', { edit: false, add: false, del: false, search: false });
    }