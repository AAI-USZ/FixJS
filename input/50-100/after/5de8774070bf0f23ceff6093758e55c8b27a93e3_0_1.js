function(files) {
                                var file = files[fidx]
                                var reader = new FileReader()
                                reader.onload = function (ev) {
                                    data.push([name+'-filename', file.name])
                                    data.push([name+'-mimetype', file.type])
                                    data.push([name, reader.result])

                                    fidx += 1
                                    if (fidx < files.length)
                                        process_file(files)
                                    else
                                        process_files()
                                }
                                reader.readAsBinaryString(file)
                            }