function testInvokeValue(field, value) {

    expect(blackberry.invoke[field]).toBeDefined();

    expect(blackberry.invoke[field]).toEqual(value);

}