function (err, data) {
                fs.writeFile(that.fileName, JSON.stringify(data).slice(1, -1) + ',', handler);
            }