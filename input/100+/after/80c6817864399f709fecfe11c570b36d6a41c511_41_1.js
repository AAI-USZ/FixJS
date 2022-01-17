function(doc, obj) {
        var header;
        header = doc.begin('Header').ele('ID').txt(obj.id).up().ele('Test').txt(obj.test).up().ele('Prepared').txt(obj.prepared.toISOString()).up();
        stringifiers.parties.v2_1(header, obj.sender, 'Sender');
        stringifiers.parties.v2_1(header, obj.receiver, 'Receiver');
        stringifiers.intString.v2_1(header, obj.name, 'Name');
        if (obj.dataSetAction != null) {
          header.ele('DataSetAction').txt(obj.dataSetAction);
        }
        if (obj.dataSetID != null) {
          header.ele('DataSetID').txt(obj.dataSetID);
        }
        if (obj.extracted != null) {
          header.ele('Extracted').txt(obj.extracted.toISOString());
        }
        if (obj.reportingBegin != null) {
          header.ele('ReportingBegin').txt(obj.reportingBegin);
        }
        if (obj.reportingEnd != null) {
          header.ele('ReportingEnd').txt(obj.reportingEnd);
        }
        if (obj.embargoDate != null) {
          header.ele('EmbargoDate').txt(obj.embargoDate.toISOString());
        }
        stringifiers.intString.v2_1(header, obj.source, 'Source');
        return stringifiers.toString(doc);
      }