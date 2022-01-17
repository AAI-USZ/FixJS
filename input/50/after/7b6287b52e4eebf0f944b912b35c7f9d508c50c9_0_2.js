function(data) {
                var stub = sinon.stub({
                    isGenericAlert: function() {},
                });
                stub.data = data;
                return stub;
            }