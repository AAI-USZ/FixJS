function() {
   // Multi select objects
   $("#poolGroupSelect").multiselect({
       noneSelectedText: 'Select pool group(s)',
       minWidth: "300",
   });
   $("#poolInfoSelect").multiselect({
       noneSelectedText: 'Select pool info(s)',
       minWidth: "300",
   });

   // Buttons
  $("button").button();

  // Add the filtering redirect
  $("#addFilter").click(function() {
    var poolGroupValues = $("#poolGroupSelect").val();
    var poolInfoValues = $("#poolInfoSelect").val();

    var queryStringQuery = window.location.href.split('?')[0];
    var queryStringLink = window.location.href.split('#')[0];
    var queryString = "";
    if (queryStringQuery.length < queryStringLink.length) {
      queryString = queryStringQuery;
    } else {
      queryString = queryStringLink;
    }

    if (poolGroupValues == null && poolInfoValues == null) {
      // do nothing
    } else {
      queryString += "?";
      if (poolGroupValues != null) {
        queryString += "poolGroups=" + poolGroupValues + "&";
      }
      if (poolInfoValues != null) {
        queryString += "poolInfos=" + poolInfoValues + "&";
      }
    }
    location.href = queryString;
  });

  // Make all tables data tables
  $("#summaryTable").dataTable({
    "bJQueryUI": true,
    "bPaginate": false,
    "bSearchable": false,
    "bSortClasses": false,
    "sScrollX": "100%",
    "bScrollCollapse": true,
  });
  $("#activeTable").dataTable({
    "bJQueryUI": true,
    "bPaginate": true,
    "bSortClasses": false,
    "bStateSave": false,
    "sScrollX": "100%",
    "bScrollCollapse": true,
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100, -1],[10, 25, 50, 100, "All"]],
    "bProcessing": true,
    "fnServerParams": function (aoData) {
        aoData.push({
            "name": "poolGroups",
            "value": getParameterByName("poolGroups")});
        aoData.push({
            "name" : "poolInfos",
            "value": getParameterByName("poolInfos")});
    },
    "sAjaxSource": "/active_json.jsp",
  });
  $("#poolTable").dataTable({
    "bJQueryUI": true,
    "bPaginate": false,
    "bSortClasses": false,
    "bStateSave": false,
    "sScrollX": "100%",
    "bScrollCollapse": true,
    "bProcessing": true,
    "fnServerParams": function (aoData) {
        aoData.push({
            "name": "users",
            "value": getParameterByName("users")});
        aoData.push({
            "name": "poolGroups",
            "value": getParameterByName("poolGroups")});
        aoData.push({
            "name" : "poolInfos",
            "value": getParameterByName("poolInfos")});
    },
    "sAjaxSource": "/pool_json.jsp",
  });
  $("#retiredTable").dataTable({
    "bJQueryUI": true,
    "bPaginate": true,
    "bSortClasses": false,
    "bStateSave": false,
    "sScrollX": "100%",
    "bScrollCollapse": true,
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100, -1],[10, 25, 50, 100, "All"]],
    "bProcessing": true,
    "fnServerParams": function (aoData) {
        aoData.push({
            "name": "users",
            "value": getParameterByName("users")});
        aoData.push({
            "name": "poolGroups",
            "value": getParameterByName("poolGroups")});
        aoData.push({
            "name" : "poolInfos",
            "value": getParameterByName("poolInfos")});
    },
    "sAjaxSource": "/retired_json.jsp",
  });

  // Hide the retired table
  $("#retiredTable").hide();

  // Add toggling for showing the tables
  $("#activeToggle").click(function () {
    $("#activeTable").toggle();
  });
  $("#poolToggle").click(function () {
    $("#poolTable").toggle();
  });
  $("#retiredToggle").click(function () {
    $("#retiredTable").toggle();
  });

  $('#switcher').themeswitcher({
    loadTheme: "UI lightness"
  });
}