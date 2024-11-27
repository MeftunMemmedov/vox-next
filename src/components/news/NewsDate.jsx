import React from 'react'

const NewsDate = ({currentNews}) => {
    const year = currentNews.day.slice(0, 4);
  const day = currentNews.day.slice(5, 7);
  const month = currentNews.day.slice(8);
  const monthText =
  (month === "01" && "January") ||
  (month === "02" && "February") ||
  (month === "03" && "March")||
  (month === "04" && "April")||
  (month === "05" && "May")||
  (month === "06" && "June") ||
  (month === "07" && "July")||
  (month === "08" && "August")||
  (month === "09" && "September") ||
  (month === "10" && "October")||
  (month === "11" && "November")||
  (month === "12" && "December");
  return (
    <div>
    <span className="font-semibold text-sm">{` ${day}, ${monthText}, ${year}`}</span>
    {" "}
    <span className=" text-sm">{currentNews.time.slice(0,5)}</span>
    </div>
  )
}

export default NewsDate