import { createLegacyAuthAdapters } from '@backstage/backend-common';
import { MiddlewareFactory } from '@backstage/backend-app-api';
import {
  DiscoveryService,
  HttpAuthService,
  LoggerService,
} from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import express from 'express';
import Router from 'express-promise-router';
import {
  ChatMessage,
  SHARED_VALUE,
} from '@internal/backstage-plugin-simple-chat-common';
import { sharedFunction } from '@internal/backstage-plugin-some-other-common';

export interface RouterOptions {
  logger: LoggerService;
  config: Config;
  discovery: DiscoveryService;
  httpAuth?: HttpAuthService;
}

const messages: ChatMessage[] = [];

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config } = options;
  const { httpAuth } = createLegacyAuthAdapters(options);

  const router = Router();
  router.use(express.json());

  router.post('/', async (req, res) => {
    await httpAuth.credentials(req, { allow: ['user'] });
    logger.info(
      'Got request body: ' +
        JSON.stringify(req.body) +
        ' also ' +
        SHARED_VALUE +
        ' and ' +
        sharedFunction(),
    );
    const { nickname, message } = (await req.body) as ChatMessage;
    messages.push({
      nickname,
      timestamp: new Date().toLocaleTimeString('en-US'),
      message,
    });
    res.end();
  });

  router.get('/', async (req, res) => {
    await httpAuth.credentials(req, { allow: ['user'] });
    res.status(200).json({ messages });
  });

  const middleware = MiddlewareFactory.create({ logger, config });

  router.use(middleware.error());
  return router;
}
