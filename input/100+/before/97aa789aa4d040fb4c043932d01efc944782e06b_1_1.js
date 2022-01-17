function () {
                geo.getCurrentPosition(s, e, {timeout: -1000});
                expect(e).toHaveBeenCalledWith({
                    code:PositionError.TIMEOUT,
                    message:"timeout value in PositionOptions set to 0 and no cached Position object available, or cached Position object's age exceed's provided PositionOptions' maximumAge parameter."
                });
            }