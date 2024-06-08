const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

router.get("/", (req, res) => {
    res.render('student/addOrEdit', {
        viewTitle: 'Insert Student'
    });
});

router.post("/", (req, res) => {
    console.log(req.body); 
    if (req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});


async function insertRecord(req, res) {
    var student = new Student();
    student.fullName = req.body.fullName;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;

    try {
        await student.save();
        res.redirect('student/list');
    } catch (err) {
        console.log('Error during Insert: ' + err);
    }
}

async function updateRecord(req, res) {
    try {
        await Student.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.redirect("student/list");
    } catch (err) {
        console.log("Error during update: " + err);
    }
}

router.get("/list", async (req, res) => {
    try {
        const docs = await Student.find();
        res.render('student/list', {
            list: docs
        });
    } catch (err) {
        console.log('Error in retrieval: ' + err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const doc = await Student.findById(req.params.id);
        res.render("student/addOrEdit", {
            viewTitle: "Update Student",
            student: doc
        });
    } catch (err) {
        console.log('Error in finding student by ID: ' + err);
    }
});

router.get("/delete/:id", async (req, res) => {
    try {
        await Student.findByIdAndRemove(req.params.id);
        res.render("student/list");
    } catch (err) {
        console.log("Error in deletion: " + err);
    }
});

module.exports = router;
