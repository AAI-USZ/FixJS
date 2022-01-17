function () {
  $.getJSON(USERS_BY_DAY_STATISTICS_URL, function(users_by_day) {
    lines_chart(users_by_day, "#users_by_day");
  });
  // FIX: this action is too slow!
  // $.getJSON(USERS_BY_TOMATOES_STATISTICS_URL, function(users_by_tomatoes) {
  //   bars_chart(users_by_tomatoes, "#users_by_tomatoes");
  // });
  $.getJSON(TOMATOES_BY_DAY_STATISTICS_URL, function(tomatoes_by_day) {
    lines_chart(tomatoes_by_day, "#tomatoes_by_day");
  });
}