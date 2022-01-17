function(file){
                  return {name: file.name,
                          timestamp: file.timestamp,
                          contents: fs.readFileSync(file.path, 'utf8')};
                }