import React from "react";

export const HeaderImg = ({ title, subTitle }) => {
  return (
    <section>
      <div
        style={{
          backgroundImage: `url(https://img.freepik.com/premium-photo/fresh-vegetables-black-background-avocados-tomatoes-potatoes-paprika-citrus-top-view-free-space-your-text_187166-31687.jpg?w=1380)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "280px",
        }}
      >
        <div className="container" style={{ minHeight: "550px" }}>
          <div className="text-center justify-content-center align-self-center">
            <h1 className="pt-5 pb-3">{title}</h1>
            <h5>{subTitle}</h5>
          </div>
        </div>
      </div>
    </section>
  );
};
