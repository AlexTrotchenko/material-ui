export const extValFromHmotaName = (string) => {
  if (typeof string !== "string" || !string) {
    return { isHot: undefined, carbonAmount: undefined };
  }
  const isHot = string.toUpperCase()[0] === "C" ? true : false;
  const myRegex = /[a-zA-Z]+(\d+)/g;
  const carbonAmount = myRegex.exec(string)[1];
  return { isHot, carbonAmount };
};

export const currentShift = (date) => {
  let today = date.getHours();
  if (today >= 6 && today < 14) {
    return "1";
  } else if (today >= 14 && today <= 22) {
    return "2";
  } else {
    return "3";
  }
};

export const addHours = (date, hours) => {
  const copiedDate = new Date(date.getTime());
  const incrementedDate = new Date(
    copiedDate.getTime() + hours * 60 * 60 * 1000
  );
  return incrementedDate;
};

const Rules = {
  C: {
    P: {
      4: 2,
      5: 2,
      6: 2,
      7: 2,
      8: 4,
      9: 4,
      10: 4,
      11: 4,
      12: 4,
      13: 4,
      14: 4,
      15: 4,
    },
    notP: {
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1.5,
      9: 1.5,
      10: 1.5,
      11: 1.5,
      12: 2,
      13: 2,
      14: 2,
      15: 2,
    },
  },
  R: {
    P: {
      4: 16,
      5: 16,
      6: 16,
      7: 16,
      8: 24,
      9: 24,
      10: 24,
      11: 32,
      12: 32,
      13: 32,
      14: 32,
      15: 32,
    },
    notP: {
      4: 16,
      5: 16,
      6: 16,
      7: 16,
      8: 16,
      9: 16,
      10: 16,
      11: 16,
      12: 16,
      13: 16,
      14: 24,
      15: 24,
    },
  },
};

export const getTimeToReady = (hmotaString, poz, date, transformString) => {
  const { isHot, carbonAmount } = transformString(hmotaString);

  const TimeAmount =
    Rules[`${isHot ? "C" : "R"}`][`${poz ? "P" : "notP"}`][carbonAmount];
  return TimeAmount;
};
