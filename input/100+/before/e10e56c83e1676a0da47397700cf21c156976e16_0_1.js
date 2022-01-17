function() {
   $('#switcher').themeswitcher({
     loadTheme: "UI lightness"
   });
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
    "sScrollX": "100%",
    "bScrollCollapse": true,
  });
  $("#activeTable").dataTable({
    "bJQueryUI": true,
    "bPaginate": false,
    "sScrollX": "100%",
    "bScrollCollapse": true,
  });
  $("#poolTable").dataTable({
    "bJQueryUI": true,
    "bPaginate": false,
    "sScrollX": "100%",
    "bScrollCollapse": true,
  });
  $("#retiredTable").dataTable({
    "bJQueryUI": true,
    "bPaginate": true,
    "sScrollX": "100%",
    "bScrollCollapse": true,
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100, -1],[10, 25, 50, 100, "All"]]
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
}