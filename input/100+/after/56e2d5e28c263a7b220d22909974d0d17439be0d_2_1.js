function() {
        var c, m, mStub, server, ComponentModel, ComponentCollection;
        ComponentCollection = require('collections/ComponentCollection');

        beforeEach(function() {
            mStub = sinon.stub();
            m = new Backbone.Model({ id: 1, fullName: 'ST_0100'});
            mStub.returns(m);
            c = new ComponentCollection();
            c.model = mStub;
        });

        describe('#add', function() {
            it('should add an object literal', function() {
                c.add({ id: 1 });
                expect(c.length).toEqual(1);
            });

            it('should add `ComponentModel`', function() {
                c.add(m);
                expect(c.get(1)).toBe(m);
                expect(c.length).toEqual(1);
            });
        });

        describe('#fetch', function() {
            beforeEach(function() {
                server = sinon.fakeServer.create();
                server.respondWith('GET', '/component', [
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({ 'OK' : 'True' })
                ]);
            });

            afterEach(function() {
                server.restore();
            });

            it('should make the correct GET request', function() {
                c.fetch();
                expect(server.requests.length).toBe(1);
                expect(server.requests[0].method).toBe('GET');
                expect(server.requests[0].url).toBe('/component');
            });

            it('should get models from the response', function() {
                var spy = sinon.spy();
                c.fetch({ success: spy });
                server.respond();
                expect(spy.called).toBe(true);
                expect(c.length).toBe(1);
            });
        });
    }