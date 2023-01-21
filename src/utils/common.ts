export const getDateTime = (number: number) => {
    const [date, time] = new Date(number)
    .toLocaleString("en-US", {
      hour12: true,
    })
    .split(",");

  let [month, day, year] = date.split("/");
  
  if (Number(month) < 10) {
    month = "0" + month;
  }
  if (Number(day) < 10) {
    day = "0" + day;
  }
  const formattedDate = `${day}/${month}/${year}`;

  const formattedTime = `${time.split(" ")[1].slice(0, 4)} ${time.split(" ")[2].toLowerCase()}`

  return [formattedDate, formattedTime]
}