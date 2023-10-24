const createUpdatedDate = (day: number, month: number, year: number) => {
  let updatedDay;
  let updatedMonth;
  if (day < 10) {
    updatedDay = `0${day}`;
  } else {
    updatedDay = day;
  }

  if (month < 10) {
    updatedMonth = `0${month}`;
  } else {
    updatedMonth = month;
  }

  return `${updatedDay}/${updatedMonth}/${year}`;
};

export default createUpdatedDate;
