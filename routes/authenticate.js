var express = require('express');
var uuid = require('uuid').v4;
var jwt = require('jsonwebtoken');

var JWT_TOKEN = require('../constants').JWT_TOKEN;
var sendMail = require('../src/mail').send;

var router = express.Router();

const users = []; // [{[email]: { id, verified } }]

const userFromToken = ({ token }) => {
	const payload = jwt.verify(token, JWT_TOKEN);
	return users[payload.email];
};

router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/login', function (req, res) {
	const email = req.body.email;
	const id = users[email] ? users[email].id : uuid();
	// token expires in 10 min
	const token = jwt.sign({ email, id }, JWT_TOKEN, {
		expiresIn: 60 * 1000 * 10,
  });
  
  await sendMail({ email, body:`
    Here is the authenticate link. Please click the below link
    for authenticating.
    ${token}
  ` })

	users[email] = { id };

	res.json({ token });
});

router.get('/login/verify/mail', (req, res) => {
	const user = userFromToken({ token: req.query.token });

	if (user) {
		user.verified = true;
		res.json({ success: true });
	} else {
		res.json({ success: false });
	}
});

router.post('/login/verify/cli', (req, res) => {
	const user = userFromToken({ token: req.body.token });

	if (user && user.verified) {
		res.json({ success: true });
	} else {
		res.json({ success: false });
	}
});

module.exports = router;
