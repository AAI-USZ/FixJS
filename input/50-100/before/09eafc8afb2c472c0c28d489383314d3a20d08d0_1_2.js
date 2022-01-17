function getBootstrapFields()
{
    // we only want to load gps and select one data to begin with
    var fields = [];
    var idx, question;
    if(!constants) throw "ERROR: constants not found; please include main/static/js/formManagers.js"; 
    for(idx in formJSONMngr.selectOneQuestions)
    {
        question = formJSONMngr.selectOneQuestions[idx];
        fields.push(question[constants.NAME]);
    }

    for(idx in formJSONMngr.geopointQuestions)
    {
        question = formJSONMngr.geopointQuestions[idx];
        fields.push(question[constants.NAME]);
    }
    return fields;
}