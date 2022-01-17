function() {

  // context: class methods
  it("should confirm that pi in general is yummy", function() {
    expect( FoodMath.pi('any') ).toEqual('is yummy!');
  })

  it("should confirm the best kind of pi", function() {
    expect( FoodMath.pi("Dutch Apple a la mode") ).toEqual('is the very best!');
  })

  it("should handle a pi with no flavor", function() {
    expect( FoodMath.pi() ).toEqual('');
    expect( FoodMath.pi('') ).toEqual('');
    expect( FoodMath.pi(' ') ).toEqual('');
  })

  // context: DOM interaction
  it("should display text with information about a flavor of pi", function() {
    loadFixtures('food_math.html');
    $("#flavor_select").flavorInfoSetter();
    $('#flavor_select').val("Raspberry");
    $('#flavor_select').trigger('change');
    expect( $('#flavor_select').val() ).toBe('Raspberry');
    expect( $('#flavor_info').html() ).toEqual('is yummy!');
  })

  it("should display text with information about the best flavor of pi", function() {
    loadFixtures('food_math.html');
    $("#flavor_select").flavorInfoSetter();
    $('#flavor_select').val("Dutch Apple a la mode");
    $('#flavor_select').trigger('change');
    expect( $('#flavor_info').html() ).toEqual('is the very best!');
  })

}