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

// const doworkPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve([7, 4, 1]);
//     reject("error acuered");
//   }, 2000);
// });

// doworkPromise
//   .then((result) => {
//     console.log("sucess!", result);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

// add(1, 2)
//   .then((r) => {
//     console.log(r);

//     add(r, 4)
//       .then((r2) => {
//         console.log(r2);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// add(1, 1)
//   .then((r) => {
//     console.log(r);

//     return add(r, 4);
//   })
//   .then((sum2) => {
//     console.log(sum2);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
