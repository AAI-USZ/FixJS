function(properties) {
            properties.on('change', this.render, this)
            properties.on('all', console.log, console)
            properties.on('destroy', this.remove, this)
        }