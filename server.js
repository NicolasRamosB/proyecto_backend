require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3005

const server = app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
server.on('error', error => console.error(error));