function () {

    $("#fromDate").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd MM yy',
        yearRange: '-1:+0'
    });

    $("#toDate").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd MM yy',
        yearRange: '-1:+0'
    });


    $('#jqgHomegroups').jqGrid({
        //url from wich data should be requested
        url: '/Ajax/FetchGroupList',
        //type of data
        datatype: 'json',
        //url access method type
        mtype: 'POST',
        //columns names
        colNames: ['GroupId', 'GroupName', 'Leader', 'Administrator', 'Suburb', 'GroupClassification'],
        //columns model
        colModel: [
                    { name: 'GroupId', index: 'GroupId', hidden: true, search: false },
                    { name: 'GroupName', index: 'GroupName', align: 'left', width: 150, search: true },
                    { name: 'LeaderName', index: 'LeaderName', align: 'left', width: 130, search: true },
                    { name: 'Administrator', index: 'Administrator', align: 'left', width: 130, search: true },
                    { name: 'Suburb', index: 'Suburb', align: 'left', width: 130, search: true },
                    { name: 'GroupClassification', index: 'GroupClassification', align: 'left', width: 150, search: true }
                  ],
        //pager for grid
        pager: $('#jqgpHomegroups'),
        //number of rows per page
        rowNum: 15,
        //initial sorting column
        sortname: 'GroupName',
        //initial sorting direction
        sortorder: 'asc',
        //we want to display total records count
        viewrecords: true,
        //grid width
        width: 'auto',
        //grid height
        height: 'auto'
    }).navGrid('#jqgpHomegroups', { edit: false, add: false, del: false, search: false });

    $('#jqgHomegroups').jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });

    $('#jqgNotInGroup').jqGrid({
        //url from wich data should be requested
        url: '/Ajax/FetchPeopleNotInHomeGroup',
        //type of data
        datatype: 'json',
        //url access method type
        mtype: 'POST',
        //columns names
        colNames: ['PersonId', 'Firstname', 'Surname', 'HomePhone', 'CellPhone', 'Email'],
        //columns model
        colModel: [
                    { name: 'PersonId', index: 'PersonId', hidden: true, search: false },
                    { name: 'Firstname', index: 'Firstname', align: 'left', width: 140, search: true },
                    { name: 'Surname', index: 'Surname', align: 'left', width: 140, search: true },
                    { name: 'HomePhone', index: 'HomePhone', align: 'left', width: 120, sortable: false, search: true },
                    { name: 'CellPhone', index: 'CellPhone', align: 'left', width: 120, sortable: false, search: true },
                    { name: 'Email', index: 'Email', align: 'left', width: 194, sortable: false, search: true }
                  ],
        //pager for grid
        pager: $('#jqgpNotInGroup'),
        //number of rows per page
        rowNum: 15,
        //initial sorting column
        sortname: 'Surname',
        //initial sorting direction
        sortorder: 'asc',
        //we want to display total records count
        viewrecords: true,
        //grid width
        width: 'auto',
        //grid height
        height: 'auto',
        ondblClickRow: function (rowid, iRow, iCol, e) {
            window.location.replace("/Home/Person?PersonId=" + rowid);
        }
    }).navGrid('#jqgpNotInGroup', { edit: false, add: false, del: false, search: false });

    $("#button_sendHomeGroupLeaderEmail").click(function () {
        FetchEmailList();
    });

    $("#button_sendHomeGroupLeaderSms").click(function () {
        FetchSmsList();
    });

    $('#jqgEventList').jqGrid({
        //url from wich data should be requested
        url: '/Ajax/FetchEventList',
        //type of data
        datatype: 'json',
        //url access method type
        mtype: 'POST',
        postData: { fromDate: $("#fromDate").val(), toDate: $("#toDate").val() },
        colNames: ['PersonId', 'Person', 'Event Date', 'Event', 'Created By'],
        //columns model
        colModel: [
                    { name: 'PersonId', index: 'PersonId', hidden: true, search: false },
                    { name: 'Person', index: 'Person', align: 'left', width: 120, search: true, cellattr: function (rowId, tv, rawObject, cm, rdata) { return 'style="vertical-align:top"' } },
                    { name: 'Date', index: 'Date', align: 'left', width: 140, search: true, cellattr: function (rowId, tv, rawObject, cm, rdata) { return 'style="vertical-align:top"' } },
                    { name: 'Event', index: 'Event', align: 'left', width: 300, search: true, cellattr: function (rowId, tv, rawObject, cm, rdata) { return 'style="white-space: normal;' } },
                    { name: 'CreatedBy', index: 'CreatedBy', align: 'left', width: 170, search: true, cellattr: function (rowId, tv, rawObject, cm, rdata) { return 'style="vertical-align:top"' } }
                  ],
        //pager for grid
        pager: $('#jqgpEventList'),
        //number of rows per page
        rowNum: 15,
        //initial sorting column
        sortname: 'Date',
        //initial sorting direction
        sortorder: 'desc',
        //we want to display total records count
        viewrecords: true,
        //grid width
        width: 'auto',
        //grid height
        height: 'auto',
        ondblClickRow: function (rowid, iRow, iCol, e) {
            var personId = $('#jqgEventList').jqGrid('getCell', rowid, 'PersonId');
            window.location.replace("/Home/Person?PersonId=" + personId);
        }
    }).navGrid('#jqgpEventList', { edit: false, add: false, del: false, search: false });

    $(".dateControl").change(function () {
        $("#jqgEventList").jqGrid("setGridParam", { "postData": { fromDate: $("#fromDate").val(), toDate: $("#toDate").val()} });
        Search();
    });

    var timeOut;
    $("#searchText").keyup(function () {
        clearTimeout(timeOut);

        timeOut = setTimeout(function () {
            Search();
        }, 600);
    });

    $('#jqgContactList').jqGrid({
        url: '/Ajax/FetchPeople',
        postData: { roleId: $("#SelectedRole").val() }, 
        datatype: 'json',
        mtype: 'POST',
        colNames: ['PersonId', 'Firstname', 'Surname', 'HomePhone', 'CellPhone', 'Email', 'Date First Visit', 'Group', 'Site'],
        //columns model
        colModel: [
                    { name: 'PersonId', index: 'PersonId', hidden: true, search: false },
                    { name: 'Firstname', index: 'Firstname', align: 'left', width: 180, search: true },
                    { name: 'Surname', index: 'Surname', align: 'left', width: 180, search: true },
                    { name: 'HomePhone', index: 'HomePhone', align: 'left', width: 120 },
                    { name: 'CellPhone', index: 'CellPhone', align: 'left', width: 120 },
                    { name: 'Email', index: 'Email', align: 'left', width: 160 },
                    { name: 'Date', index: 'Date', align: 'left', width: 100 },
                    { name: 'Group', index: 'Group', align: 'left', width: 140 },
                    { name: 'Site', index: 'Site', align: 'left', width: 120 }
                  ],
        pager: $('#jqgpContactList'),
        rowNum: 20,
        sortname: 'Date',
        sortorder: 'desc',
        viewrecords: true,
        width: 'auto',
        height: 'auto',
        ondblClickRow: function (rowid, iRow, iCol, e) {
            window.location.replace("/Home/Person?PersonId=" + rowid);
        }
    }).navGrid('#jqgpContactList', { edit: false, add: false, del: false, search: false });

    $('#jqgContactList').jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });

    //Need to do an asynch post to fetch the columns for this next one
    $.post("/Ajax/FetchGroupAttendanceGridSetup", function (data) {
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
    })
    .success(function () {
        $("#jqgGroupAttendance").jqGrid('setGridParam', { datatype: 'json' });
    })
    .error(function (jqXHR, textStatus, errorThrown) {
        $("#ajax_familySearch").hide();
        alert(jqXHR.responseText);
    });

    $("#button_viewContactList").click(function () {
        window.location.replace("/Report/ContactList?RoleId=" + $("#SelectedRole").val());
    });

    $("#button_exportChurchData").click(function () {
        window.location.replace("/Report/ExportChurchData");
    });
}