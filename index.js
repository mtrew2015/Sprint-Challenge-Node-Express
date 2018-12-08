const express = require ('express');
const server = express();
const port = 6000;
const helmet = require('helmet');
const morgan = require ('morgan');
const projectRouter = require('./projectModelRouter');
const actionRouter = require('./actionRouter');

server.use(
  express.json(),
  morgan('tiny'),
  helmet()
);

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter)


server.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`)
})