import { useContext } from "react";
import { format, parseISO } from "date-fns";

import { AppContext } from "App";
import Fetch from "api/fetch";

// data utils
const getData = (
  data: Array<any>
): {
  details: Record<string, any>;
  transactionDates: Array<string>;
  transactionDateIds: Record<string, Array<string>>;
} => {
  let details: Record<string, any> = {};
  let transactionDates: Array<string> = [];
  let transactionDateIds: any = {};

  data.forEach((item: any) => {
    details[item.transactionId] = item;

    const date = format(parseISO(item.transactionDate), "d MMM yyyy");
    if (!transactionDates.includes(date)) {
      transactionDates.push(date);
    }

    transactionDateIds[date] = [
      ...(transactionDateIds[date] ? transactionDateIds[date] : []),
      item.transactionId,
    ];
  });

  return {
    details,
    transactionDates,
    transactionDateIds,
  };
};

export default function useRequest() {
  const { dispatch }: any = useContext(AppContext);

  // request for users balance
  function getBalance() {
    Fetch.get("balance").then((res) => {
      if (res?.status === "success") {
        dispatch({
          type: "set_balance",
          value: {
            accountNo: res?.accountNo,
            balance: res?.balance,
          },
        });
      }
    });
  }

  function getTransactions() {
    Fetch.get("transactions").then((res) => {
      if (res.status === "success") {
        const data = getData(res.data);
        dispatch({
          type: "set_transaction_history",
          value: data,
        });
      }
    });
  }

  function getPayees() {
    Fetch.get("payees").then((res) => {
      if (res.status === "success") {
        dispatch({
          type: "set_payees",
          value: res.data,
        });
      }
    });
  }

  // request getTransactions() and getBalance() to update the homepage data
  function refetchBalanceTrans() {
    getTransactions();
    getBalance();
  }

  return {
    getBalance,
    getTransactions,
    getPayees,
    refetchBalanceTrans,
  };
}
