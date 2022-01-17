function () {
                    var icon = this.type.split('/').pop()
                    files.push({
                        id:App.fileCounter,
                        name:this.name,
                        size:this.size,
                        icon:icon
                    })
                    App.fileCounter++
                }