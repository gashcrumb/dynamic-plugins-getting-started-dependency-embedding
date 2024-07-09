/***/
/**
 * Common functionalities for the simple-chat plugin.
 *
 * @packageDocumentation
 */
export type ChatMessage = {
  message: string;
  nickname: string;
  timestamp: string;
};

export type PostMessageOptions = {
  message: string;
};

export type GetMessagesOptions = {};

export type GetMessagesResult = {
  messages: ChatMessage[];
};

export interface SimpleChatApi {
  getMessages(options: GetMessagesOptions): Promise<GetMessagesResult>;
  postMessage(options: PostMessageOptions): Promise<void>;
}

export const SHARED_VALUE = "some shared value just in case";