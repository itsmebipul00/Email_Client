import classNames from "classnames";
import { FilterType } from "../features/email/Email.type";

type PropTypes = {
  handleFilter: (filter: FilterType) => void;
  filterType: FilterType;
};

export const Filters = ({ handleFilter, filterType }: PropTypes) => {
  return (
    <div className="flex gap-8 mb-8  items-center">
      <span>Filter By: </span>
      <span
        onClick={() => handleFilter("unread")}
        className={classNames("cursor-pointer", {
          "bg-white border border-[#DEE2E6] px-3 py-1 rounded-lg ":
            filterType === "unread",
        })}
      >
        Unread
      </span>
      <span
        onClick={() => handleFilter("read")}
        className={classNames("cursor-pointer", {
          "bg-white border border-[#DEE2E6] px-3 py-1 rounded-lg ":
            filterType === "read",
        })}
      >
        Read
      </span>
      <span
        onClick={() => handleFilter("favourite")}
        className={classNames("cursor-pointer", {
          "bg-white border border-[#DEE2E6] px-3 py-1 rounded-lg ":
            filterType === "favourite",
        })}
      >
        Favorites
      </span>
    </div>
  );
};
