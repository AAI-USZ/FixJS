function(module, filename) {
            module.exports = JSON.parse(fs.read(filename));
        }