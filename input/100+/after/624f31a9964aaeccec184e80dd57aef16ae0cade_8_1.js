function testListType(listType, bullet){
    test("List " + listType + " toggle", function(){
      textile.set(bullet + " list")
        .select("list")
        .on(listType)
        .disabled("formatBlock")
        .click("."+ listType)
        .match(/^list/)
        .off(listType)
        .enabled("formatBlock");
    });

    test("List " + listType + " on with new lines", function(){
      textile.set("item1\nitem2")
        .selectAll()
        .off(listType)
        .click("."+listType)
        .match(bullet + " item1\n" + bullet + " item2")
        .on(listType)
        .click("."+ listType)
        .off(listType)
        .notMatch(bullet);
    });

    test("List " + listType + " partial on", function(){
      textile.set("item1\n" + bullet + " item2")
        .selectAll()
        .off(listType)
        .click("."+listType)
        .match(bullet + " item1\n" + bullet + " item2")
        .on(listType)
        .click("."+ listType)
        .off(listType)
        .notMatch(bullet);

      // other way
      textile.set(bullet + " item1\nitem2")
        .selectAll()
        .off(listType)
        .click("."+listType)
        .match(bullet + " item1\n" + bullet + " item2")
        .on(listType)
        .click("."+ listType)
        .off(listType)
        .notMatch(bullet);
    });

    test("List " + listType + " partial off", function(){
      textile.set(bullet + " item1\n" + bullet + " item2")
        .select("item1")
        .on(listType)
        .click("."+ listType)
        .match("item1\n" + bullet + " item2")
        .off(listType);
    });

    test("List " + listType + " selection", function() {
      textile.set(bullet + " item1\n\n" + bullet + " item2\n" + bullet + " item3\n\n")
        .select("item1", true)
        .on(listType)
        .select("item2", true)
        .on(listType)
        .select(bullet + " item2", true)
        .on(listType)
        .select("\n" + bullet + " item2", true)
        .off(listType)
        .select("item3", true)
        .on(listType);
    });
  }