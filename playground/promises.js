//callback

// const doworkcallback = (callback) => {
//   setTimeout(() => {
//     callback(undefined, [3, 4, 5]);
//   }, 2000);
// };

// doworkcallback((error, result) => {
//   if (error) {
//     return console.log(error);
//   }

//   console.log(result);
// });

//promises

const doworkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve([7, 4, 1]);
    reject("error acuered");
  }, 2000);
});

doworkPromise
  .then((result) => {
    console.log("sucess!", result);
  })
  .catch((error) => {
    console.log("Error!", error);
  });
