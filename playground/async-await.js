const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("Number must be positive");
      }
      resolve(a + b);
    }, 2000);
  });
};

const dowork = async () => {
  //   return new Error("Somthing went wrong");

  //   return "hello";

  let res = await add(1, 99);
  res = await add(-1, res);
  return res;
};

// console.log(dowork());

dowork()
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
