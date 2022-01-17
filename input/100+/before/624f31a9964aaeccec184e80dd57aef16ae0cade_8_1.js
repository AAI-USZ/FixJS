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
  }