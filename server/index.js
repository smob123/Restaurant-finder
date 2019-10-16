const express = require('express');
const app = express();
const cors = require('cors');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema');
const PORT = process.env.PORT || 8080;

const url = process.env.DATABASE_URL || require('./config');
mongoose.connect(url, { useNewUrlParser: true });

mongoose.connection.once(('open'), () => {
    console.log('connected to the database!');
});

app.use(cors());

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(PORT);

console.log(`listening on http://localhost:${PORT}/graphql`);
