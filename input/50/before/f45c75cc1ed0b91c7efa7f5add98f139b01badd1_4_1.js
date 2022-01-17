function () {
            if (LOGGER.isError) {
                LOGGER.error.apply(LOGGER, arguments);
            }
        }