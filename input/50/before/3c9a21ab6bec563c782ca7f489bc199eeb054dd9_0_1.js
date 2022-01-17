function(id, lambda, error_lambda)
    {
        return _staticApi.get_object_by_secondary_key('timestream', "streamid", id, lambda, error_lambda);
    }