const answer = (result, error, status) => {
  if (status == 1) {
    return {
      status: status,
      message: "עבר בהצלחה",
      error: error,
      data: result,
    };
  } else if (status == 0) {
    return {
      status: status,
      message: "התקבלה שגיאה בשרת",
      error: error,
      data: result,
    };
  } else if (status == 2) {
    return {
      status: status,
      message: "מייל קיים במערכת",
      error: error,
      data: null,
    };
  } else if (status == 3) {
    return {
      status: status,
      message: "משתמש לא קיים במערכת",
      error: error,
      data: null,
    };
  }
};

module.exports = answer;
