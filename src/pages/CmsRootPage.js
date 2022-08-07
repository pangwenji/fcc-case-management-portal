import React from "react";
import PortalRootContainer from "../component/PortalRootContainer";

const CmsRootPage = (props) => {
  return (
    <PortalRootContainer>
      <div
        style={{
          display: "flex",
          height: "50vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <div
            style={{
              background: `url(${
                process.env.PUBLIC_URL + "/image/welab-bank-logo.png"
              }) no-repeat 50% 50% `,
              backgroundSize: "450px ",
              width: "450px",
              height: "225px",
              position: "relative",
            }}
          />
          <h2 style={{ textAlign: "center" }}>Welcome To WeLab Alert Portal</h2>
        </div>
      </div>
    </PortalRootContainer>
  );
};

export default CmsRootPage;
