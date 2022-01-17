function() {
    expect(8);

    var member = "a";
    var obj = new Exhibit.Set();

    ok(obj.add(member), "Exhibit.Set.add('a')");
    equal(obj.size(), 1, "Exhibit.Set.size()");
    ok(!obj.add(member), "!Exhibit.Set.add('a')");
    equal(obj.size(), 1, "Exhibit.Set.size()");
    ok(!obj.add(undefined), "!Exhibit.Set.add(undefined)");
    ok(!obj.add(null), "!Exhibit.Set.add(null)");
    ok(!obj.add([]), "!Exhibit.Set.add([])");
    equal(obj.size(), 1, "Exhibit.Set.size()");
}