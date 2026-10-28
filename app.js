'use strict';
const express = require('express');
const path = require('node:path');
const app = express();
const PORT = process.env.PORT || 3000;
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', app: 'basket-pro' }));
app.use((_req, res) => res.status(404).send('Página no encontrada. Vuelve al inicio.'));
if (require.main === module) {
  app.listen(PORT, () => console.log(`Basket Pro listo en http://localhost:${PORT}`));
}
module.exports = app;
