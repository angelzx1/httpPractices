const express = require('express');
const app = express();
app.use(express.json());

const user = [];

function verifyIfNameExists(req, res, next) {
  const { name } = req.headers;
  const users = user.find(user => user.name === name);
    if (!users) {
        return res.status(400).json({ error: 'User not found' });
    } 
    req.users = users;
    return next();        
}

function verifyIfUserExists(req, res, next) {
  const { id } = req.body;
  const users = user.find(user => user.id === id);
  if (users) {
    return res.status(400).json({ error: 'This user exists!' });
  }
  req.users = users;
  return next();
}

app.get('/',verifyIfNameExists, (req, res) => {
    const { users } = req;
    return res.status(201).json(users.id);});

app.post('/account',verifyIfUserExists, (req, res) => {
    const { name, id } = req.body;
    user.push({ name,
         id,
         date_created: new Date(),
         statement:[]
         });
    res.status(201).json({sucess:'User created with sucessful'});
});

app.put('/account',verifyIfNameExists,(req, res) => {
    const { name } = req.body;   
    const { users } = req;

    users.name = name;
    res.status(201).json({sucess:'User updated with sucessful'});
});

app.delete('/account',verifyIfNameExists,(req, res) => {
    const { users } = req;
    user.splice(users,1);
    res.status(200).json({sucess:'User deleted with sucessful'});
})

app.listen(8080, console.log('Server running on port 8080'));