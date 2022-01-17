function onFail(failure) {
        // export
        this.exporter.addFailure(
            fs.absolute(failure.file),
            failure.message  || failure.standard,
            failure.standard || "test failed",
            failure.type     || "unknown"
        );
        this.testResults.failures.push(failure);
        // special printing
        if (failure.type) {
            this.comment('   type: ' + failure.type);
        }
        if (failure.values && Object.keys(failure.values).length > 0) {
            for (var name in failure.values) {
                this.comment('   ' + name + ': ' + utils.serialize(failure.values[name]));
            }
        }
    }