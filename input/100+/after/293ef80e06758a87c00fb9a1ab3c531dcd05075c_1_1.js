function() {
    expect(10);

    var member = "a";
    var member2 = 1;
    var member3 = false;
    var obj = new Exhibit.Set();

    ok(obj.add(member), "Exhibit.Set.add('a')");
    equal(obj.size(), 1, "Exhibit.Set.size()");
    ok(!obj.add(member), "!Exhibit.Set.add('a')");
    equal(obj.size(), 1, "Exhibit.Set.size()");
    ok(!obj.add(undefined), "!Exhibit.Set.add(undefined)");
    ok(!obj.add(null), "!Exhibit.Set.add(null)");
    ok(!obj.add([]), "!Exhibit.Set.add([])");
    ok(obj.add(member2), "Exhibit.Set.add(1)");
    ok(obj.add(member3), "Exhibit.Set.add(false)");
    equal(obj.size(), 3, "Exhibit.Set.size()");
}