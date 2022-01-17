function()  {
    midas.challenge.competitor.disableScoring();
    // validate folder if it is supplied
    var challenge_id = $('#midas_challenge_competitor_challengeId').val();
    var results_type = $('#midas_challenge_competitor_resultsType').val();
    var submission_folder_id = $('#midas_challenge_competitor_selectedResultsFolderId').val();
    if(submission_folder_id !== null && submission_folder_id !== undefined & submission_folder_id !== '') {
        midas.challenge.competitor.validateResultsFolder(challenge_id, submission_folder_id, results_type);          
    }
    
    // event handler on results folder browse button
    $('#midas_challenge_competitor_browseResultsFolder').click(function() {
        midas.loadDialog("selectfolder_resultsfolder","/challenge/competitor/selectresultsfolder");
        midas.showDialog('Browse for Results Submission Folder');
        midas.challenge.competitor.currentBrowser = 'folderresults';
    });
    
    // TODO event handlers for challenge and dataset selection
}