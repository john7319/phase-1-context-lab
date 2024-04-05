/* Your Code Here */
function createEmployeeRecord(row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeDataArray) {
  return employeeDataArray.map(function (row) {
    return createEmployeeRecord(row);
  });
}

function createTimeInEvent(dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
}

function createTimeOutEvent(dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
}

function hoursWorkedOnDate(date) {
  const inEvent = this.timeInEvents.find(function (e) {
    return e.date === date;
  });

  const outEvent = this.timeOutEvents.find(function (e) {
    return e.date === date;
  });

  return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(date) {
  const Wage = hoursWorkedOnDate.call(this, date) * this.payPerHour;
  return parseFloat(Wage.toString());
}


function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(function (name) {
    return name.firstName === firstName;
  });
}

function calculatePayroll(arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce(function (pay, dates) {
    return pay + allWagesFor.call(dates);
  }, 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
