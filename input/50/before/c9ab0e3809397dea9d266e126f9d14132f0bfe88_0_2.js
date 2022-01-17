function (patio, db) {
        db.forceDropTable(["staff", "executive", "manager", "employee"]);
        patio.disconnect();
    }