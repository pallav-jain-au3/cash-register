const cashStatus = {
  0: "INSUFFICIENT_FUNDS",
  1:"CLOSED",
  2:"OPEN"
}
const currencyRate =  [
  { name: 'ONE HUNDRED', val: 100.00},
  { name: 'TWENTY', val: 20.00},
  { name: 'TEN', val: 10.00},
  { name: 'FIVE', val: 5.00},
  { name: 'ONE', val: 1.00},
  { name: 'QUARTER', val: 0.25},
  { name: 'DIME', val: 0.10},
  { name: 'NICKEL', val: 0.05},
  { name: 'PENNY', val: 0.01}
];
function checkCashRegister(price, cash, cid) {
  var change = {
    status : "",
    change : []
  };

  const cashInDraw = getTotalCashInDraw(cid);
  const changeToReturn = cash - price;
  change.status = getStatus(changeToReturn,cashInDraw);
  if (change.status === cashStatus[0]){
    return change;
  }
  if (change.status === cashStatus[1]){
    cid.map(arr => change.change.push(arr));
  }
  else{
    let changeArrayForOpenStatus = getChangeForOpenStatus(cid, changeToReturn);
    if (changeArrayForOpenStatus){
        change.change = changeArrayForOpenStatus;
    }
    else{
      change.status = cashStatus[0];
    }
  }
  return change;
}

function getChangeForOpenStatus(cid, changeToReturn){
  let change = [];
  let value = 0;
  let count = cid.length -1;
  currencyRate.forEach(currency => {
    while(currency.val <= changeToReturn && currency.val <= cid[count][1]){
      changeToReturn -= currency.val;
      changeToReturn = Math.round(changeToReturn * 100) / 100;
      cid[count][1] -= currency.val;
      value += currency.val;
      }
    if (value > 0){
      let currencyNameAndReturned = [];
      currencyNameAndValueReturned.push(currency.name);
      currencyNameAndValueReturned.push(value);
      change.push(currencyNameAndValueReturned);
    }
    count--;
    value = 0;
  });
  if (changeToReturn == 0){
     return change;
  }

}
function getTotalCashInDraw(cid){
  return cid.map(arr => arr[1]).reduce((a, b) => a + b, 0).toFixed(2);
}
function getStatus(changeToReturn,cashInDraw){
  if (changeToReturn > cashInDraw){
    return cashStatus[0];
    }
    else if (changeToReturn == cashInDraw){
    return cashStatus[1];
    }
    else{
      return cashStatus[2];
    }
}


checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
