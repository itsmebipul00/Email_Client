import classNames from "classnames";
import { FirstLetterOfName } from "./FirstLetter";
import { DateTime } from "./DateTime";
import { Interweave } from "interweave";
import { EmailListType, EmailBodyType } from "../features/email/Email.type";

type PropTypes = {
  selectedEmail: EmailListType;
  handleFavouriteClick: (email: EmailListType) => void;
  favrouiteEmailIds: string[];
  emailBody?: EmailBodyType;
};

export const EmailBody = ({
  selectedEmail,
  handleFavouriteClick,
  favrouiteEmailIds,
  emailBody,
}: PropTypes) => {
  return (
    <section
      className={classNames(
        "bg-white p-10 border border-[#DEE2E6] rounded-lg h-max flex justify-between",
        {
          "w-[60%]": selectedEmail,
        }
      )}
    >
      <div className="w-12 h-12 rounded-full ">
        <FirstLetterOfName
          firstLetter={selectedEmail?.from.name[0] as string}
        />
      </div>
      <div className="flex flex-col gap-4 w-[90%]">
        <div className="flex justify-between text-[#646464] text-2xl font-semibold">
          <p>{selectedEmail?.subject}</p>
          <p
            onClick={() => handleFavouriteClick(selectedEmail)}
            className="text-white bg-[#E54065] rounded-2xl px-4 py-2 text-xs"
          >
            {favrouiteEmailIds.includes(selectedEmail.id)
              ? "Favourite"
              : "Mark as Favourite"}
          </p>
        </div>
        <DateTime dateTime={selectedEmail?.date as number} />
        <Interweave
          content={emailBody?.body as string}
          className="text-[#646464] mt-3 [&>*]:flex [&>*]:flex-col [&>*]:gap-4"
        />
      </div>
    </section>
  );
};
