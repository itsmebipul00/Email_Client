type propsType = {
  firstLetter: string;
};

export const FirstLetterOfName = ({ firstLetter }: propsType) => {
  return (
    <div className="bg-[#E54064] rounded-full uppercase text-white h-full w-full flex justify-center items-center font-semibold text-xl">
      {firstLetter}
    </div>
  );
};
