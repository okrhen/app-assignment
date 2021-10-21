interface ActionProps {
  type: string;
  [key: string]: any;
}

export const initState = {
  user: {},
  transaction: {
    details: {},
    transactionDates: [],
    transactionDateIds: {}
  },
  balance: undefined,
  payees: []
};

export default function appReducer(state: any, action: ActionProps) {
  switch (action.type) {
    case "success_login":
      return {
        ...state,
        user: action.value
      };
    
    case 'set_balance':
        return {
            ...state,
            balance: action.value
        }

    case 'set_transaction_history': 
    return {
        ...state,
        transaction: {
            details: action.value?.details,
            transactionDates: action.value.transactionDates,
            transactionDateIds: {
                ...state.transactionDateIds,
                ...action.value.transactionDateIds
            },
        }
    }

    case 'set_payees':
        return {
            ...state,
            payees: action.value
        }

    case 'clear': 
    return initState

    default:
      throw new Error("Please add additional type");
  }
}


// selector