const express = require("express");
const router = new express.Router();
const User = require("../models/users");
const auth = require("../middlewares/auth");
const multer = require("multer");
const sharp = require("sharp");

// router.get("/test", (req, res) => {
//   res.send("I am new router");
// });

// for perticular router add middleware as 2nd argeument
router.get("/users/me", auth, async (req, res) => {
  // User.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((error) => {
  //     res.status(500).send();
  //   });

  try {
    // const users = await User.find({});
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

// router.get("/users/:id", async (req, res) => {
//   // console.log(req.params);
//   const _id = req.params.id;
//   User.findById(_id);
//   // .then((user) => {
//   //   if (!user) {
//   //     return res.status(404).send();
//   //   }

//   //   res.send(user);
//   // })
//   // .catch((error) => {
//   //   res.status(500).send(error);
//   // });

//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(error);
//   }
// });

router.post("/users", async (req, res) => {
  //   console.log(req.body);
  //   res.send("testing!");

  const user = new User(req.body);

  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch((error) => {
  //     res.status(400).send(error);
  //   });

  try {
    await user.save();
    const token = await user.generateAuthToken();
    // const publicuser = await user.getPublicProfile();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByIdCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    // const publicuser = await user.getPublicProfile();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedupdates = ["name", "email", "password", "age"];

  const isValidOperation = updates.every((update) => {
    return allowedupdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update" });
  }

  try {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    const user = req.user;
    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.params.id);
    // if (!user) {
    //   return res.status(404).send();
    // }

    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

const uplode = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error("File must be image(jpg/png/jpeg)"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  uplode.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 200, height: 200 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send("avatar Succesfuly uploded");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  if (req.user.avatar == undefined)
    return res.send("Currently No avatar to delete");

  req.user.avatar = undefined;
  await req.user.save();
  res.send("avatar Succesfuly deleted");
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.send(404).send();
  }
});

module.exports = router;
