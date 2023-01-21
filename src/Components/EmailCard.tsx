import { FirstLetterOfName } from "./FirstLetter";
import { DateTime } from "./DateTime";
import classNames from "classnames";
import { EmailListType } from "../features/email/Email.type";

type PropTypes = {
  email: EmailListType;
  selectedEmail?: EmailListType;
  handleEmailClick: (email: EmailListType) => void;
  favrouiteEmailIds: string[];
};

export const EmailCard = ({
  email,
  selectedEmail,
  handleEmailClick,
  favrouiteEmailIds,
}: PropTypes) => {
  return (
    <div
      key={email.id}
      className={classNames(
        "flex bg-white rounded-lg py-4 px-8  cursor-pointer",
        {
          "border-2 border-[#E54065] justify-between":
            selectedEmail?.id === email.id,
          " border border-[#DEE2E6] gap-8": selectedEmail?.id !== email.id,
        }
      )}
      onClick={() => handleEmailClick(email)}
    >
      <div className="h-12 w-12">
        <FirstLetterOfName firstLetter={email.from.name[0]} />
      </div>
      <div className="flex flex-col gap-1 text-[#797878] w-[85%]">
        <p>
          <span>From: </span>
          <span className="font-semibold text-[#646464]">
            {email.from.name} {`<${email.from.email}>`}
          </span>
        </p>
        <p>
          <span>Subject: </span>
          <span className="font-semibold text-[#646464]">{email.subject}</span>
        </p>
        <p>{email.short_description}</p>
        <div className="flex justify-between">
          <DateTime dateTime={email.date} />
          {favrouiteEmailIds.includes(email.id) && (
            <span className="text-[#E54065]">Favourite</span>
          )}
        </div>
      </div>
    </div>
  );
};
