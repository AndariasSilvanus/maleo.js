import { Server } from '@airy/maleo/server';

import { routes } from './routes';

const PORT = process.env.PORT || 3000;

const maleoServer = Server.init({
  port: PORT,

  routes,
});

maleoServer.run(() => {
  // tslint:disable-next-line:no-console
  console.log('Server running on port :' + PORT);
});
