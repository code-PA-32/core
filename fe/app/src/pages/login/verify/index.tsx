import { Route, useNavigate } from "@tanstack/react-router";
import { LoginIndex } from "#pages/login/index.js";
import {
  getLoginAttemptInfo,
  consumeCode,
} from "supertokens-web-js/recipe/passwordless";
import { useCallback, useEffect } from "react";

async function isThisSameBrowserAndDevice() {
  return (await getLoginAttemptInfo()) !== undefined;
}

const Verify = () => {
  const navigate = useNavigate();
  const handleMagicLinkClicked = useCallback(async () => {
    try {
      const response = await consumeCode();
      if (response.status === "OK") {
        void navigate({ to: "/setting" });
      } else {
        console.error("Something wrong while consuming code", response);
      }
    } catch (err: unknown) {
      console.error("isSuperTokensGeneralError", err);
    }
  }, []);

  useEffect(() => {
    void isThisSameBrowserAndDevice().then((isSame) => {
      if (isSame) {
        void handleMagicLinkClicked();
      } else {
        console.log("error");
      }
    });
  }, [handleMagicLinkClicked]);

  return <div>123</div>;
};

export const VerifyIndex = new Route({
  getParentRoute: () => LoginIndex,
  path: "/verify",
  component: Verify,
});
