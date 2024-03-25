const express = require('express');
const bodyParser = require('body-parser');
const configDB = require('./configDBAPI');
const sql = require('mssql');
const config = {
  user: configDB.dbUser,
  password: configDB.dbPassword,
  server: configDB.dbHost,
  database:  configDB.dbName,
  options: {
    encrypt: true   
  }
};
const PORT = 5000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function addOpinion(opinions)
{
  try {
    await sql.connect(config);
    const result = await sql.query(`
     INSERT INTO Opinions (beer_name, taste, overall_rating, user_email)
     VALUES (\'${opinions.beerName}\', CAST(${opinions.tasteRating} AS INT), CAST(${opinions.overallRating} AS INT), \'${configDB.dbUser}\')`);
     console.log("SUCCESSFULLY ADDED OPINION");
  }catch (err) {
    console.error('ERROR WHILE ADDING OPINION:', err);
    throw err;
  } finally {
    sql.close();
  }
}

app.post('/formRating', async (req, res) => {
  console.log(req.body);
  addOpinion(req.body);
  res.json({ success: true, message: 'Opinion added successfully' });
});

app.listen(PORT, () => {
    console.log(`THE SERVER IS LISTENING ON THE PORT ${PORT}`);
  });