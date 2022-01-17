function(status) {
    switch (status) {
      case "NEW":
        return "הממשלה החליטה שלא לטפל בהמלצה זו";
      case "STUCK":
        return "ההמלצה בטיפול, אבל יש גורמים חיצוניים שמעכבים אותה";
      case "IN_PROGRESS":
        return "ההמלצה נמצאת בטיפול. הסיבות לכך הן לרוב: חקיקה בכנסת, ועדות הדנות בנושא, או שההמלצה היא חלק מתוכנית חומש";
      case "FIXED":
        return "מדד התפוקה יושם: הצעדים שהממשלה הייתה צריכה לעשות בוצעו";
      case "WORKAROUND":
        return "";
      case "IRRELEVANT":
        return "";
    }
    return "";
  }