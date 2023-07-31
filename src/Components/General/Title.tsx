import React from "react";

interface TitleProp {
  text: string;
}
const Title: React.FC<TitleProp> = ({ text }) => {
  return (
    <div>
      <h3 className="mb-4 mt-4">{text}</h3>
    </div>
  );
};

export default Title;
