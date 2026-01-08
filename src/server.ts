import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import express from 'express';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import 'zone.js/node';

/**
 * Correct browser dist path
 * dist/<project-name>/browser
 */
const browserDistFolder = join(process.cwd(), 'dist/frontend/browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * ---------------------------------------
 * STATIC FILES
 * ---------------------------------------
 */
if (existsSync(browserDistFolder)) {
  app.use(
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
      redirect: false,
    }),
  );
}

/**
 * ---------------------------------------
 * SSR HANDLER
 * ---------------------------------------
 */
app.use(async (req, res, next) => {
  try {
    const response = await angularApp.handle(req);
    if (response) {
      writeResponseToNodeResponse(response, res);
    } else {
      next();
    }
  } catch (err) {
    console.error('SSR Error:', err);
    next(err);
  }
});

/**
 * ---------------------------------------
 * START SERVER
 * ---------------------------------------
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;

  app.listen(port, () => {
    console.log(`✅ Angular SSR running at http://localhost:${port}`);
  });
}

/**
 * ---------------------------------------
 * EXPORT HANDLER (CLI / Firebase / Vercel)
 * ---------------------------------------
 */
export const reqHandler = createNodeRequestHandler(app);
