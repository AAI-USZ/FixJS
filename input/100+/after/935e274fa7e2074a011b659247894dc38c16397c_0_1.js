function() {

  // Allow user to click dish and see dish details
  $(".dishes tbody tr").on("click", function() {
    $previous_ingredients = $(".dish_info .ingredients");
    if ($previous_ingredients)
      $previous_ingredients.popover("hide");
    
    $dish = $(this)
    $.ajax({
      url: "http://" + window.location.host + "/dishes/" + $dish.attr("recipe"),
      data: {
        name: $dish.attr("name"),
        portion: $dish.attr("portion"),
        ingredients: $dish.attr("ingredients"),
      }
    }).success(function(data) {
      $(".dish_info").html(data);
      $(".dish_info .ingredients").popover();
    }).error(function(response) {
      console.log(response);
      title = "<h2> Dish Details </h2>"
      text = "<p class='muted'> Sorry! Dish details could not be loaded. Please try again later. </p>"
      $(".dish_info").html(title + text)
    });
  });
  
  // Enable popover for ingredients
  $(".dish_info").each(function() {
    $ingredients = $(this).find(".ingredients");
    $ingredients.popover();
  });
  
}