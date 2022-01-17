function() {
                        var f = form_files[idx]
                        var name = f.name
                        idx += 1
                        if (idx >= form_files.length) {
                            that.connect.send(that.mtype, data)
                            return
                        }

                        if (f.files.length) {
                            var fidx = 0
                            var process_file = function(files) {
                                var file = files[fidx];
                                var reader = new FileReader();
                                reader.onload = function (ev) {
                                    data.push([name+'-filename', file.name])
                                    data.push([name+'-mimetype', file.type])
                                    data.push([name, reader.result])

                                    fidx += 1
                                    if (fidx < files.length) {
                                        process_file(files)
                                    } else {
                                        process_files()
                                    }
                                }
                                reader.readAsBinaryString(file)
                            }
                        }
                    }