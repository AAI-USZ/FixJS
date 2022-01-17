function () {
            var opf_file = that.bookhandle.parser.getContainerFile(that.filefacilitator.getDataFromEpub('META-INF/container.xml')),
                ncx_file = that.bookhandle.parser.opf(that.filefacilitator.getDataFromEpub(opf_file));
            that.bookhandle.navigator.toc.setModel(that.bookhandle.parser.getTOC(that.filefacilitator.getDataFromEpub(ncx_file)));
        }