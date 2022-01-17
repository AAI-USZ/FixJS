function () {
    var v = new VIE();
    v.namespaces.add("xsd", "http://www.w3.org/2001/XMLSchema#");

    // Define an 'article' type
    var article = new v.Type("Article");
    var person = new v.Type("Person");

    // Define some properties
    var title = new v.Attribute("title", ["xsd:string"], article, 1, 1);
    var content = new v.Attribute("content", ["xsd:string"], article, 0, 1);
    var published = new v.Attribute("published", ["xsd:dateTime"], article, 0, 1);
    var author = new v.Attribute("author", [person], article, 1, 1);
    article.attributes.add([title, content, published, author]);

    // Tell VIE about the type
    v.types.add([person, article]);

    // Check that the type information looks correct
    equal(article.attributes.toArray().length, 4);
    equal(v.types.toArray().length, 3);

    // Create an entity with the type
    var entity = new v.Entity({'@type': 'Article'});
    ok(entity.vie);
    ok(entity.vie.types);

    // Generate a Backbone Form schema for the entity
    var schema = VIE.Util.getFormSchema(entity);
    ok(schema['<http://viejs.org/ns/published>']);
    equal(schema['<http://viejs.org/ns/published>']['type'], 'DateTime');
    var author = new schema['<http://viejs.org/ns/author>']['model'];
    ok(author.isEntity);
}