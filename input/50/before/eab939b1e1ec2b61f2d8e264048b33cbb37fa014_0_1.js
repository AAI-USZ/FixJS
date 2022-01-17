function() {
            this.setStatusMessage(this.waitingStatusMsg);
            this.getRecommendedPicksStore().removeAll();
            this.getDataView().setDisabled(true);
        }