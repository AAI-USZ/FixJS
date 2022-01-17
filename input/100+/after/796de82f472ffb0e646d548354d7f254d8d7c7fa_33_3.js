function () {

    var ctlr = null;
    var view = null;
    beforeEach(function () {
        if (!ctlr) {
            ctlr = App.getController('Application');
        }
        if (!view) {
            view = Ext.create('Screener.view.PharmacyView');
        }
    });
    it("loads concept of given drug", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"18666ae0-be9b-11e1-ab94-0fb973140af6\",\"display\":\"STAVUDINE LAMIVUDINE AND NEVIRAPINE\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/concept/18666ae0-be9b-11e1-ab94-0fb973140af6\",\"rel\":\"self\"}]}]}",
                status: 200
            }
            request.success = true;
            request.callback(null, true, response)
        })
        concept = Ext.create('Screener.store.drugConcept')
        concept.setProxy({
            type: 'rest',
            url: HOST + '/ws/rest/v1/concept?q=Triomune-30',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        })
        concept.load()
        expect(concept.getAt(0).getData().uuid).toEqual("18666ae0-be9b-11e1-ab94-0fb973140af6")
    });
    it("makes the post call", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"80dbc4ec-53c4-41ff-b784-3888c9005a6d\",\"display\":\"PRESCRIPTION 05/07/2012\",\"encounterDatetime\":\"2012-07-05T07:47:10.000+0400\",\"patient\":{\"uuid\":\"7bd18c77-4334-4bee-a65b-e29756c0d6e8\",\"display\":\"John Adams\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/person/7bd18c77-4334-4bee-a65b-e29756c0d6e8\",\"rel\":\"self\"}]},\"location\":null,\"form\":null,\"encounterType\":{\"uuid\":\"2e1df184-8cd5-4879-85b1-9d87e1ea5d77\",\"display\":\"PRESCRIPTION - Patient receives a drug prescription.\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encountertype/2e1df184-8cd5-4879-85b1-9d87e1ea5d77\",\"rel\":\"self\"}]},\"provider\":null,\"obs\":[],\"orders\":[{\"uuid\":\"65bbb9ee-3e7c-4eb8-b5b1-57e36b263fc5\",\"display\":\"Triomune-30: 250.0 null\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/order/65bbb9ee-3e7c-4eb8-b5b1-57e36b263fc5\",\"rel\":\"self\"}],\"type\":\"drugorder\"}],\"voided\":false,\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encounter/80dbc4ec-53c4-41ff-b784-3888c9005a6d\",\"rel\":\"self\"},{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encounter/80dbc4ec-53c4-41ff-b784-3888c9005a6d?v=full\",\"rel\":\"full\"}],\"resourceVersion\":\"1.8\"}",
                status: 200
            }
            request.success = true;
            request.callback(null, true, response)
            expect(request.jsonData.encountertype).toEqual("2e1df184-8cd5-4879-85b1-9d87e1ea5d77")
            expect(request.jsonData.orders.concept).toEqual("18666ae0-be9b-11e1-ab94-0fb973140af6")
            expect(request.jsonData.orders.drug).toEqual("18a79728-be9b-11e1-ab94-0fb973140af6")
            expect(request.jsonData.orders.patient).toEqual("18bed512-be9b-11e1-ab94-0fb973140af6")
            expect(request.jsonData.orders.instructions).toEqual("after lunch")
        })
        var order = Ext.create('Screener.store.drugEncounter', {
            patient:"7bd18c77-4334-4bee-a65b-e29756c0d6e8",
            encounterType:"2e1df184-8cd5-4879-85b1-9d87e1ea5d77",
            encounterDatetime:"2012-07-05T07:47:10Z",
            orders:[{
                patient:"7bd18c77-4334-4bee-a65b-e29756c0d6e8",
                drug:"fcb49b42-c27e-11e1-9262-a5fbf9edb8d2",
                instructions:"after lunch",
                concept:"fc6f4854-c27e-11e1-9262-a5fbf9edb8d2"
            }]
        })
        orderstore = Ext.create('Screener.store.drugEncounter')
        orderstore.add(order)
        orderstore.sync()
    })
}