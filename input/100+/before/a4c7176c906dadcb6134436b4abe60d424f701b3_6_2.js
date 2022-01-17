function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"503bb47f-8e06-458c-b492-31ed17631892\",\"display\":\"STAVUDINE LAMIVUDINE AND NEVIRAPINE\",\"orderType\":{\"uuid\":\"131168f4-15f5-102d-96e4-000c29c2a5d7\",\"display\":\"Drug Order - An order for a medication to be given to the patient\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/ordertype/131168f4-15f5-102d-96e4-000c29c2a5d7\",\"rel\":\"self\"}]},\"patient\":{\"uuid\":\"18bed512-be9b-11e1-ab94-0fb973140af6\",\"display\":\"Mr. John D Patient\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/person/18bed512-be9b-11e1-ab94-0fb973140af6\",\"rel\":\"self\"}]},\"concept\":{\"uuid\":\"18666ae0-be9b-11e1-ab94-0fb973140af6\",\"display\":\"STAVUDINE LAMIVUDINE AND NEVIRAPINE\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/concept/18666ae0-be9b-11e1-ab94-0fb973140af6\",\"rel\":\"self\"}]},\"instructions\":\"-\",\"startDate\":\"2012-06-28T11:03:18.000+0400\",\"autoExpireDate\":\"2012-07-05T00:00:00.000+0400\",\"encounter\":null,\"orderer\":null,\"accessionNumber\":null,\"discontinuedBy\":null,\"discontinuedDate\":null,\"discontinuedReason\":null,\"discontinuedReasonNonCoded\":null,\"dose\":250.0,\"units\":null,\"frequency\":\"ond\",\"prn\":false,\"complex\":false,\"quantity\":1,\"drug\":{\"uuid\":\"18a79728-be9b-11e1-ab94-0fb973140af6\",\"display\":\"Triomune-30 - \",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/drug/18a79728-be9b-11e1-ab94-0fb973140af6\",\"rel\":\"self\"}]},\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/order/503bb47f-8e06-458c-b492-31ed17631892\",\"rel\":\"self\"},{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/order/503bb47f-8e06-458c-b492-31ed17631892?v=full\",\"rel\":\"full\"}],\"type\":\"drugorder\",\"resourceVersion\":\"1.8\"}",
                status: 200
            }
            request.success = true;
            request.callback(null, true, response)
            expect(request.jsonData.concept).toEqual("18666ae0-be9b-11e1-ab94-0fb973140af6")
            expect(request.jsonData.drug).toEqual("18a79728-be9b-11e1-ab94-0fb973140af6")
            expect(request.jsonData.patient).toEqual("18bed512-be9b-11e1-ab94-0fb973140af6")
            expect(request.jsonData.instructions).toEqual("after lunch")
        })
        var order = Ext.create('Screener.model.drugOrder', {
            patient: '18bed512-be9b-11e1-ab94-0fb973140af6',
            drug: '18a79728-be9b-11e1-ab94-0fb973140af6',
            concept: '18666ae0-be9b-11e1-ab94-0fb973140af6',
            instructions : 'after lunch'
        })
        orderstore = Ext.create('Screener.store.drugOrder')
        orderstore.add(order)
        orderstore.sync()
    }