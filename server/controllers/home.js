const path = require('path');
const express = require('express');
const homepage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/static/index.html'));
}
const loginpage = (req, res) => {

    if (req.session && req.session.isAuth) {
        res.send(`
        <p>Bạn đã đăng nhập rồi, bạn có muốn <a href='/logout'>Đăng xuất</a></p>
        `)
    }
    else {
        res.sendFile(path.join(__dirname, '../views/static/login.html'));
    }
}
const logoutpage = (req, res) => {

    if (req.session && req.session.isAuth) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            }
            else {
                res.clearCookie('connect.sid').status(200).redirect('/');
            }
        })
    }
    else {
        res.send(`
        <p> Bạn chưa đăng nhập, bạn có muốn <a href='/login'>Đăng nhập</a>?</p>
        `)
    }
}
const studentpage = (req, res) => {
    if (req.session && req.session.isAuth) {
        res.sendFile(path.join(__dirname, '../views/static/student.html'));
    }
    else {
        res.redirect('/login');
    }
}
const classpage = (req, res) => {
    if (req.session && req.session.isAuth) {
        res.sendFile(path.join(__dirname, '../views/static/class.html'));
    }
    else {
        res.redirect('/login');
    }
}
const scorepage = (req, res) => {
    if (req.session && req.session.isAuth) {
        res.sendFile(path.join(__dirname, '../views/static/score.html'));
    }
    else {
        res.redirect('/login');
    }
}
const reportpage = (req, res) => {
    if (req.session && req.session.isAuth) {
        res.sendFile(path.join(__dirname, '../views/static/report.html'));
    }
    else {
        res.redirect('/login');
    }
};

const rulepage = (req, res) => {
    if (req.session && req.session.isAuth) {
        res.sendFile(path.join(__dirname, '../views/static/rule.html'));
    }
    else {
        res.redirect('/login');
    }
};

module.exports = {
    homepage,
    loginpage,
    logoutpage,
    studentpage,
    classpage,
    scorepage,
    reportpage,
    rulepage
}