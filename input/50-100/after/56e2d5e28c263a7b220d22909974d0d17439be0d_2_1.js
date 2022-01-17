function() {
            mStub = sinon.stub();
            m = new Backbone.Model({ id: 1, fullName: 'ST_0100'});
            mStub.returns(m);
            c = new ComponentCollection();
            c.model = mStub;
        }