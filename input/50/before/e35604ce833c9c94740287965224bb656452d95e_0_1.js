function (path) {
            var input = flock.resolvePath(path, that.ugens.named);
            return typeof (input.model.value) !== "undefined" ? input.model.value : input;
        }