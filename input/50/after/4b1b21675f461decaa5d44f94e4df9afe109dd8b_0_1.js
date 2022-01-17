function (key) {
                    Object.defineProperty(prototype || self, key, { value: Observer.prototype[key] })
                }