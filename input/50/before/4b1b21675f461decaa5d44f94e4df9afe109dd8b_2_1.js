function (key) {
                    if (key !== 'constructor')
                        Object.defineProperty(targetObject || prototype, key, { value: Observer.prototype[key] })
                }