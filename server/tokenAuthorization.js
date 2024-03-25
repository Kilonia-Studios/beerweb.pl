const { OAuth2Client } = require('google-auth-library');
const express = require('express');
const path = require('path');
const configDB = require('./configDBAPI');
const sql = require('mssql');

const clientId = configDB.clientId;
const config = {
  user: configDB.dbUser,
  password: configDB.dbPassword,
  server: configDB.dbHost,
  database:  configDB.dbName,
  options: {
    encrypt: true   
  }
};
const client = new OAuth2Client(clientId);
const PORT = 4000;
const app = express();
app.use(express.json());
async function checkIfEmailExists(email)
{
  try {
    await sql.connect(config);
    const result = await sql.query(`SELECT count(*) FROM dbo.Users WHERE email = \'${email}\'`);
    console.log(result.recordset[0]);
    return result.recordset[0][''] > 0;
  }catch (err) {
    console.error('ERROR WHILE CHECK IF EMAIL EXIST', err);
    throw err;
  } finally {
    sql.close();
  }
} 
async function addUser(email, name)
{
  try {
    await sql.connect(config);
    await sql.query(`INSERT INTO Users (name, email) VALUES (\'${name}\', \'${email}\') `);
    console.log('ADDED NEW USER');
  }catch(err){
    console.error("ERROR WHILE ADDING USER", err);
    throw err;
  } finally {
    sql.close();
  }
}
app.post('/token', async (req, res) => {
  const idToken = req.body.idToken;
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: clientId, 
    });

    if (!ticket) {
      throw new Error('INCORRECT TOKEN');
    }
    const payload = ticket.getPayload();
    console.log('DECODED TOKEN DATA:', payload);
    checkIfEmailExists(payload.email)
    .then((exists)=> {
      console.log(exists);
      if(!exists) 
      {
        addUser(payload.email, payload.name);
      }
      else{
        console.log("USER EXIST");
      }
    })
    .catch((err) => {
      console.error('ERROR', err);
    })

    res.json({ success: true, message: '/subpages/index2.html', name:  payload.name, email: payload.email});

  } catch (error) {
    console.error('TOKEN VALIDATION ERROR :', error);
    res.status(401).json({ success: false, message: 'token validation error'});
  }
});

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/subpages/', (req, res) => {
  //res.sendFile(path.join(__dirname, 'public', 'subpages', 'index2.html'));
  
  res.sendFile(path.join(__dirname, '../client/public', 'subpages', 'index2.html'));
});

app.listen(PORT, () => {
  console.log(`THE SERVER IS LISTENING ON THE PORT ${PORT}`);
});