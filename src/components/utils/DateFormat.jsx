import React from "react";
import dayjs from "dayjs";

const DateTimeFormat = ({ date, format = "YYYY-MM-DD HH:mm:ss" }) => {
  const isValidDate = dayjs(date).isValid();

  return (
    <span>{isValidDate ? dayjs(date).format(format) : "Invalid Date"}</span>
  );
};

export default DateTimeFormat;
