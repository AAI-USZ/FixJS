function (flag) {
                    var remappedFlags = '';

                    switch (flag) {
                        case '<inputFile>':
                            remappedFlags = (toolId !== 0 ? fileOutput : file);
                            break;
                        case '<outputFile>':
                            remappedFlags = fileOutput;
                            break;
                        case '<outputFolder>':
                            remappedFlags = path.dirname(fileOutput);
                            break;
                        default:
                            remappedFlags = flag;
                            break;
                    }
                return remappedFlags;
            }