import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { simpleChatPlugin, SimpleChatPage } from '../src/plugin';
import { TestApiProvider } from '@backstage/test-utils';
import {
  ChatMessage,
  GetMessagesOptions,
  PostMessageOptions,
  SimpleChatApi,
} from '@internal/backstage-plugin-simple-chat-common';
import { simpleChatApiRef } from '../src/api/SimpleChatClient';

const messages: ChatMessage[] = [];

const mockedApi: SimpleChatApi = {
  postMessage: async (options: PostMessageOptions) => {
    messages.push({
      nickname: '<unset>',
      timestamp: new Date().toLocaleTimeString('en-US'),
      message: options.message || '',
    });
    return;
  },
  getMessages: async (_options: GetMessagesOptions) => {
    return { messages };
  },
};

createDevApp()
  .registerPlugin(simpleChatPlugin)
  .addPage({
    element: (
      <TestApiProvider apis={[[simpleChatApiRef, mockedApi]]}>
        {' '}
        <SimpleChatPage />
      </TestApiProvider>
    ),
    title: 'Root Page',
    path: '/simple-chat',
  })
  .render();
