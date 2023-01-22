import { getDateTime } from "../utils/common";

type PropsType = {
  dateTime: number;
};

export const DateTime = ({ dateTime }: PropsType) => {
  const [date, time] = getDateTime(dateTime);

  return (
    <div className="flex gap-2 text-[#646464] ">
      <span>{date}</span>
      <span>{time}</span>
    </div>
  );
};
