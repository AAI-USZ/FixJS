function (path) {
            var input = flock.get(path, that.ugens.named);
            return (input && input.model && typeof (input.model.value) !== "undefined") ? input.model.value : input;
        }