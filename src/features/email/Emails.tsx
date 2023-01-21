import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getEmails,
  getEmailBody,
  handleReadUnreadEmails,
  handleMarkAsFavorite,
} from "./emailsSlice";
import { EmailListType, FilterType } from "./Email.type";
import { Filters } from "../../Components/Filters";
import { EmailCard } from "../../Components/EmailCard";
import { EmailBody } from "../../Components/EmailBody";
import { PageNumbers } from "../../Components/PageNumbers";

export function Emails() {
  const emails = useAppSelector((state) => state.email);
  const dispatch = useAppDispatch();
  const [selectedEmail, setSelectedEmail] = useState<EmailListType>();
  const [filterType, setFilterType] = useState<FilterType>("unread");
  const [pageNo, setPageNo] = useState<number>(1);

  useEffect(() => {
    dispatch(getEmails(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFilteredEmails = (filterType: FilterType) => {
    switch (filterType) {
      case "favourite":
        return emails.favouriteEmails;
      case "read":
        return emails.readEmail;
      case "unread":
        const unreadEmails = emails.allEmails?.list.filter((email) => {
          const readEmailIds = emails?.readEmail.map((em) => em.id);
          return !readEmailIds.includes(email.id);
        });
        return unreadEmails;
      default:
        return emails.allEmails?.list;
    }
  };

  const filteredEmails = getFilteredEmails(filterType);

  const pages = [0, 1];

  const handleEmailClick = (email: EmailListType) => {
    window.scrollTo(0, 0);
    dispatch(getEmailBody(email.id));
    setSelectedEmail(email);
    if (filterType === "unread" && !!selectedEmail) {
      dispatch(
        handleReadUnreadEmails(selectedEmail as unknown as EmailListType)
      );
    }
  };

  const handleFavouriteClick = (email: EmailListType) => {
    dispatch(handleMarkAsFavorite(email));
  };

  const handleFilter = (filter: FilterType) => {
    if (filterType === "unread" && !!selectedEmail) {
      dispatch(
        handleReadUnreadEmails(selectedEmail as unknown as EmailListType)
      );
    }
    setFilterType(filter);
    setSelectedEmail(undefined);
  };

  const getNextPage = (pg: number) => {
    dispatch(getEmails(pg));
    setPageNo(pg);
    if (filterType === "unread" && !!selectedEmail) {
      dispatch(
        handleReadUnreadEmails(selectedEmail as unknown as EmailListType)
      );
    }
    setSelectedEmail(undefined);
    window.scrollTo(0, 0);
  };

  const favrouiteEmailIds = emails?.favouriteEmails?.map((email) => email.id);

  return (
    <div className="w-[100vw] min-h-screen bg-[#F3F6FA] p-8 ">
      <Filters handleFilter={handleFilter} filterType={filterType} />

      <div className="flex gap-10">
        <section
          className={classNames("flex flex-col gap-8", {
            "w-[40%]": selectedEmail,
            "w-full": !selectedEmail,
          })}
        >
          {filteredEmails?.map((email) => {
            return (
              <EmailCard
                email={email}
                selectedEmail={selectedEmail}
                handleEmailClick={handleEmailClick}
                favrouiteEmailIds={favrouiteEmailIds}
              />
            );
          })}
        </section>

        {selectedEmail && (
          <EmailBody
            selectedEmail={selectedEmail}
            handleFavouriteClick={handleFavouriteClick}
            favrouiteEmailIds={favrouiteEmailIds}
            emailBody={emails.emailBody}
          />
        )}
      </div>
      {filterType === "unread" && (
        <PageNumbers pages={pages} getNextPage={getNextPage} pageNo={pageNo} />
      )}
    </div>
  );
}
