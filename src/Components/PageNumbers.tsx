import classNames from "classnames";

type PropTypes = {
  pages: number[];
  getNextPage: (pg: number) => void;
  pageNo: number;
};

export const PageNumbers = ({ pages, getNextPage, pageNo }: PropTypes) => {
  return (
    <div className="flex gap-4 mt-8">
      {pages.map((pg) => (
        <span
          key={pg}
          onClick={() => {
            getNextPage(pg + 1);
          }}
          className={classNames("bg-white p-4 rounded-md cursor-pointer", {
            "border-2 border-[#E54065]": pageNo === pg + 1,
            "border border-[#DEE2E6]": !(pageNo === pg + 1),
          })}
        >
          {pg + 1}
        </span>
      ))}
    </div>
  );
};
