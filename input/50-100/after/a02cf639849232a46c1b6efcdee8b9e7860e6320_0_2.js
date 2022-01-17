function() {
        var self = this;

        function require(request) {
            return self.require(request);
        }
        require.cache = cache;
        require.extensions = extensions;
        require.stub = function(request, exports) {
            self.stubs[request] = { exports: exports };
        };

        return require;
    }