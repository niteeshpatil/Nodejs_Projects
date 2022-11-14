const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middlewares/auth");
router.get("/tasks", auth, async (req, res) => {
  // Task.find({})
  //   .then((tasks) => {
  //     res.send(tasks);
  //   })
  //   .catch((e) => {
  //     res.status(500).send(e);
  //   });

  try {
    //const tasks = await Task.find({ owner: req.user._id });
    await req.user.populate("tasks").execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  // Task.findById(_id)
  //   .then((task) => {
  //     if (!task) {
  //       return res.status(404).send();
  //     }
  //     res.send(task);
  //   })
  //   .catch((e) => {
  //     res.status(500).send(e);
  //   });

  try {
    //const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  // task
  //   .save()
  //   .then(() => {
  //     res.status(201).send(task);
  //   })
  //   .catch((error) => {
  //     res.status(400).send(error);
  //   });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// patch for update
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedupdates = ["completed", "description"];
  const isvalidupdate = updates.every((key) => allowedupdates.includes(key));

  if (!isvalidupdate) {
    return res.status(400).send({ error: "Invalid update" });
  }
  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }

    await task.remove();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
