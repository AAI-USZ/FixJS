function(rubric, rubric_key) {
                info.rating = rubric;
                paradata = paradata_util.getLRParadataForRubric(info, bio, rubric_util[rubric_key]);
                envelopes.push(getLREnvelope(info, oauth_data, bio, paradata)); 
            }