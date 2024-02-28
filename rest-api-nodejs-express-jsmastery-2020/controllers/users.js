import { v4 as uuid } from 'uuid';

let users = [];

export const getUsers = (req, res) => {
    console.log(`Users in the database: ${users}`);
    res.send(users);
}

export const createUser = async (req, res) => {   
    const user = await req.body;

    users.push({...user, id: uuid()});
    res.send('User created');
    console.log(`User [${user.username}] added to the database.`);
};

export const getUser = async(req, res) => {
    res.send(req.params.id)
};

export const deleteUser = async (req, res) => { 
    console.log(`user with id ${req.params.id} has been deleted`);
    res.send('User deleted');
    users = users.filter((user) => user.id !== req.params.id);
};

export const updateUser = async (req, res) => {
    const user = await users.find((user) => user.id === req.params.id);
    
    user.username = await req.body.username;
    user.age = await req.body.age;

    res.send('User updated');
    console.log(`username has been updated to ${req.body.username}.age has been updated to ${req.body.age}`)
};