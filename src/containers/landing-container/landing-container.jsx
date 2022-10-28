import React from "react";

import { Hyperlink } from "../../atoms/hyperlink";

import styles from "./landing-container.module.scss";

const LandingContainer = () => (
  <div>
    <p>
      Plaid page
      <br />
      <Hyperlink href="/plaid" title="Plaid page" />.
    </p>
  </div>
);

export { LandingContainer };
