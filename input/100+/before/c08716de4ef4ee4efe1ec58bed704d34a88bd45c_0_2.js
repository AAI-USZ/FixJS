function(swarmingsFolder){
    var configContent = fs.readFileSync(swarmingsFolder+"\\core");
    thisAdaptor.adaptorConfig = JSON.parse(configContent);
    return thisAdaptor.adaptorConfig;
}