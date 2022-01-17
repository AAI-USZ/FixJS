function() {
            mStub = sinon.stub(ComponentModel);
            m = new Backbone.Model({ id: 1, fullName: 'ST_0100'});
            mStub.returns(m);
            c = new ComponentCollection();
            c.model = ComponentModel;
            c.add({ id: 1, fullName: 'ST_0100' });
        }