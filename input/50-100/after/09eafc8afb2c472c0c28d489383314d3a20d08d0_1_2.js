function getBootstrapFields()
{
    // we only want to load gps and select one data to begin with
    var fields = ['_id', constants.GEOLOCATION];
    var idx, question;
    if(!constants) throw "ERROR: constants not found; please include main/static/js/formManagers.js"; 
    for(idx in formJSONMngr.selectOneQuestions)
    {
        question = formJSONMngr.selectOneQuestions[idx];
        fields.push(question[constants.NAME]);
    }

    return fields;
}