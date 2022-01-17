function (locale) {
            if (localeMap[locale].indexOf(imgPath) !== -1) {
                // localized image found for locale
                xmlObject[xmlObjectKey]["image"].push({
                    text: {
                        _attr: {
                            "xml:lang": locale
                        },
                        _value: LOCALES_DIR + "/" + locale + "/" + imgPath
                    }
                });
            }
        }