import { useApi } from '@backstage/core-plugin-api';
import { simpleChatApiRef } from '../api/SimpleChatClient';
import { ChatMessage } from '@internal/backstage-plugin-simple-chat-common';
import { useCallback } from 'react';
import useAsyncRetry from 'react-use/esm/useAsyncRetry';
import useInterval from 'react-use/esm/useInterval';

export const useChatMessages = (intervalMs: number = 2500) => {
  const simpleChatApi = useApi(simpleChatApiRef);
  const getChatMessages = useCallback(async (): Promise<ChatMessage[]> => {
    try {
      const response = await simpleChatApi.getMessages({});
      return response.messages;
    } catch (error) {
      return Promise.reject(error);
    }
  }, [simpleChatApi]);
  const {
    value: messages,
    loading,
    error,
    retry,
  } = useAsyncRetry(() => getChatMessages(), [getChatMessages]);
  useInterval(() => retry(), intervalMs);
  return {
    messages,
    loading,
    error,
  };
};
