import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

export const HeaderImg = ({ title, subTitle }) => {
  return (
    <section>
      <div
        style={{
          backgroundImage: `url(https://img.freepik.com/premium-photo/fresh-vegetables-black-background-avocados-tomatoes-potatoes-paprika-citrus-top-view-free-space-your-text_187166-31687.jpg?w=1380)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "300px",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              color: "white",
              fontSize: "35px",
              fontWeight: "bold",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              paddingTop: "75px",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    </section>
  );
};
