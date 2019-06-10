const cashStatus = {
  insufficientFunds: "INSUFFICIENT_FUNDS",
  closed: "CLOSED",
  open: "OPEN"
}

function checkCashRegister(price, cash, cid) {
  var change = {
    status: "",
    change: []
  };

  const cashInDraw = getTotalCashInDraw(cid);
  const changeToReturn = cash - price;
  change.status = getStatus(changeToReturn, cashInDraw);
  if (change.status === cashStatus.insufficientFunds) {
    return change;
  }
  if (change.status === cashStatus.closed) {
    change.change = cid
  } else {
    let changeArrayForOpenStatus = getChangeForOpenStatus(cid, changeToReturn);
    if (changeArrayForOpenStatus != "INSUFFICIENTS FUNDS") {
      change.change = changeArrayForOpenStatus;
    } else {
      change.status = cashStatus.insufficientFunds;
    }
  }
  return change;
}

function getChangeForOpenStatus(cid, changeToReturn) {
  const currencyRate = [{
      name: 'ONE HUNDRED',
      val: 100.00
    },
    {
      name: 'TWENTY',
      val: 20.00
    },
    {
      name: 'TEN',
      val: 10.00
    },
    {
      name: 'FIVE',
      val: 5.00
    },
    {
      name: 'ONE',
      val: 1.00
    },
    {
      name: 'QUARTER',
      val: 0.25
    },
    {
      name: 'DIME',
      val: 0.10
    },
    {
      name: 'NICKEL',
      val: 0.05
    },
    {
      name: 'PENNY',
      val: 0.01
    }
  ];

  let change = [];
  let value = 0;
  let count = cid.length - 1;
  currencyRate.forEach(currency => {
    while (currency.val <= changeToReturn && currency.val <= cid[count][1]) {
      changeToReturn -= currency.val;
      changeToReturn = Number(changeToReturn.toFixed(2));
      cid[count][1] -= currency.val;
      value += currency.val;
    }
    if (value > 0) {
      let currencyNameAndReturned = [currency.name, value]
      change.push(currencyNameAndReturned);
    }
    count--;
    value = 0;
  });
  if (changeToReturn == 0) {
    return change;
  }
  return "INSUFFICIENTS FUNDS";

}

function getTotalCashInDraw(cid) {
  return cid.map(arr => arr[1]).reduce((a, b) => a + b, 0).toFixed(2);
}

function getStatus(changeToReturn, cashInDraw) {
  if (changeToReturn > cashInDraw) {
    return cashStatus.insufficientFunds;
  } else if (changeToReturn == cashInDraw) {
    return cashStatus.closed;
  } else {
    return cashStatus.open;
  }
}


checkCashRegister(19.5, 20, [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 1],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
]);
