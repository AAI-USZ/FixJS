function _fnStartProcessingMode() {
            ///<summary>
            ///Function that starts "Processing" mode i.e. shows "Processing..." dialog while some action is executing(Default function)
            ///</summary>

            if (oTable.fnSettings().oFeatures.bProcessing) {
                $(".dataTables_processing").css('visibility', 'visible');
            }
        }