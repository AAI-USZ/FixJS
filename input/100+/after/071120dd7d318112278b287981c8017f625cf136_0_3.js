function() {
    $('#midas_challenge_competitor_scoreResults_anchor').removeClass('buttonScoreSubmissionDisabled').addClass('buttonScoreSubmission');
    $('#midas_challenge_competitor_scoreResults_anchor').unbind('click').click(function() { 
        var challenge_id = $('#midas_challenge_competitor_challengeId').val();
        var results_type = $('#midas_challenge_competitor_resultsType').val();
        var submission_folder_id = $('#midas_challenge_competitor_selectedResultsFolderId').val();
        $('#midas_challenge_competitor_scoreResults_anchor').removeClass('buttonScoreSubmission').addClass('buttonScoreSubmissionDisabled');
        $('#midas_challenge_competitor_scoreResults_anchor').text("Generating Batch Jobs");
        $('#generatingJobs').show();
        ajaxWebApi.ajax({
            method: 'midas.challenge.competitor.score.results',  
            args: 'challengeId=' + challenge_id + '&resultsFolderId=' + submission_folder_id + '&resultsType=' + results_type,
            success: function(results) {
                window.location.replace($('.webroot').val() + '/challenge/competitor/showscore?resultsRunId=' + results.data.challenge_results_run_id); 
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var validationInfo = '';
                validationInfo = '<br/> <b>Scoring</b> action has an error: ' + XMLHttpRequest.message + '<br/> </br>';
                $('div#midas_challenge_competitor_getScore_Info').html(validationInfo);  
            }
        })
    });
}