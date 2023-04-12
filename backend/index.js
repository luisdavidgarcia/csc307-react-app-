const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const { v4: uuidv4 } = require('uuid');

const users = {
	users_list :
	[
	]
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send(users);
});


// action to find user by name and job
app.get('/users', (req, res) => {
	const name = req.query.name;
	const job = req.query.job;
	if (name != undefined && job != undefined) {
		let result = findUserByNameAndJob(name, job);
		result = {users_list: result};
		res.send(result);
	}
	else if (name != undefined) {
		let result = findUserByName(name);
		result = {users_list: result};
		res.send(result);
	}
	else {
		res.send(users);
	}
})

const findUserByName = (name) => {
	return users['users_list'].filter( (user) => user['name'] === name);
}

const findUserByNameAndJob = (name,job) => {
	return users['users_list'].filter( (user) => (user['name'] === name && user['job'] === job)  );
}

app.get('/users/:id', (req,res) => {
	const id = req.params['id']; //or req.params.id
	let result = findUserById(id);
	if (result === undefined || result.length == 0)
		res.status(404).send('Resource not found.');
	else {
		result = {users_list: result};
		res.send(result);
	}
})

function findUserById(id) {
	return users['users_list'].find( (user) => user['id'] === id ); // or line below
	//return users['users_list'].filter( (user) => user['id'] === id );
}

function giveUserID(user) {
	const unique_id = uuidv4();
	user.id = unique_id;
}

app.post('/users', (req, res) => {
	const userToAdd = req.body;
	giveUserID(userToAdd);
	addUser(userToAdd);
	res.status(201).end();
});

function addUser(user) {
	users['users_list'].push(user);
}

// New Delete User by ID feature 
app.delete('/users/:id', (req, res) => {
	const id = req.params['id'];
	let result = deleteUserById(id);
	if (result === undefined || result.length == 0)
		res.status(404).send('Resource not found.');
	else {
		result = {users_list: result};
		res.send(result);
	}
});

function deleteUserById(id) {
	users['users_list'] = users['users_list'].filter( (user) => user.id != id );
	return users['users_list'].filter( (user) => user.id != id);
}

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
