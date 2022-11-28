import React, { useEffect, useCallback, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { Transaction } from "plaid";
import axios from "axios";

import styles from "./plaid-container.module.scss";

const headers = {
  "Access-Control-Allow-Origin": "true",
  "Access-Control-Allow-Headers": "content-type",
};

const userId = 1;

const createLinkToken = async (setLinkToken) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/user/${userId}/link-token`,
      { headers }
    );

    const { link_token } = response.data;

    setLinkToken(link_token);
  } catch (e) {
    console.log(e);
  }
};

const exchangeTokens = async (publicToken) => {
  try {
    await axios.post(
      `http://localhost:3001/user/${userId}/access-token`,
      { publicToken },
      { headers }
    );
  } catch (e) {
    console.log(e);
  }
};

const startTransactionBatch = async () => {
  try {
    await axios.post(`http://localhost:3001/user/${userId}/transaction-batch`, {
      headers,
    });
  } catch (e) {
    console.log(e);
  }
};

const getTransactions = async (setTransactions) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/user/${userId}/transactions`,
      { headers }
    );

    const { transactions } = response.data;

    setTransactions(transactions);
  } catch (e) {
    console.log(e);
  }
};

const PlaidContainer = () => {
  const [linkToken, setLinkToken] = useState<string>("");
  const [publicToken, setPublicToken] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const onSuccess = useCallback((publicToken, _metadata) => {
    setPublicToken(publicToken);
  }, []);

  useEffect(() => {
    createLinkToken(setLinkToken);
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  return (
    <div className={styles.plaidContainer}>
      <div className={styles.plaidContainer__box}>
        <p>user_good</p>
        <p>pass_good</p>
        <p>credentials_good</p>
      </div>
      <div className={styles.plaidContainer__box}>
        <p>Link Token</p>
        <p>{linkToken}</p>
      </div>
      <div className={styles.plaidContainer__box}>
        <p>Public Token</p>
        <p>{publicToken}</p>
      </div>
      <div className={styles.plaidContainer__box}>
        <button onClick={() => open()} disabled={!ready}>
          Connect a bank account
        </button>
        <button onClick={() => exchangeTokens(publicToken)}>Swap Tokens</button>
        <button onClick={() => startTransactionBatch()}>
          Start Transaction Batch
        </button>
        <button onClick={() => getTransactions(setTransactions)}>
          Get Transactions
        </button>
      </div>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.authorized_date}&nbsp;:&nbsp;{transaction.amount}
            &nbsp;:&nbsp;
            {transaction.category.join(",")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { PlaidContainer };
