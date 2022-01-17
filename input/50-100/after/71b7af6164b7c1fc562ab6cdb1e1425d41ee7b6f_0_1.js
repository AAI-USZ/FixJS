function(err, fileStat){
                            if (fileStat.isDirectory())
                                copyDirRecursive(file, newFile, copyFiles);
                            else if (fileStat.isSymbolicLink() && !opts.resolveSymbolicLinks)
                                fs.readlink(file, function(err, link){
                                    fs.symlink(link, newFile, copyFiles);
                                });
                            else
                                fs.readFile(file, function(err, data){
                                    fs.writeFile(newFile, data, copyFiles);
                                });
                        }