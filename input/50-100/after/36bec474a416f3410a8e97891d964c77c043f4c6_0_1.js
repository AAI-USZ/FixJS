function () {
                    var icon = this.type.split('/').pop()
                    files.push({
                        num: App.fileCounter,
                        name:this.name,
                        icon:icon
                    })
                    App.fileCounter++
                }