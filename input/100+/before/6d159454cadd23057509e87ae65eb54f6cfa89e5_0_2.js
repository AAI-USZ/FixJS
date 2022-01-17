function setPropertyTitle(propertyValue) {
    var name = $(propertyValue).parents("div.accordion-content:first").find("div.field[name='longName']").find("input").val();

    // .val()returns the value (shortName), while .text() returns what is actually displayed (longName)
    //var value = $(propertyValue).val();
    // however, I still have to use the .map() fn in order to separate different options with a comma
    var value = $(propertyValue).children("option").filter(":selected").map(function () {
        return $(this).text();
    }).get().join(', ');


    $('select option').map(function () {
  return $(this).text() + ',' + $(this).val();
}).get().join('\n');


    var accordionHeader = $(propertyValue).parents("div.accordion-content:first").prev(".accordion-header");
    var title = name + ": " + value + " ";
    $(accordionHeader).find("a").text(title);
}