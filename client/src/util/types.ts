import {
  conversationPopulated,
  participantPopulated,
} from '@/graphql/operations/conversation';
import { messagePopulated } from '@/graphql/operations/message';
import { Prisma } from '@prisma/client';

/**
 * Users
 */
export interface CreateUsernameData {
  createUsername: { success: boolean; error: string };
}

export interface CreateUsernameVariables {
  username: string;
}

export interface SearchUsersInput {
  username: string;
}

export interface SearchUserData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  username: string;
}

/**
 * Conversations
 */

export type ConversationsPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
  include: typeof participantPopulated;
}>;

export interface ConversationData {
  conversations: Array<ConversationsPopulated>;
}
export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}

export interface CreateConversationInput {
  participantIds: Array<string>;
}

export interface ConversationUpdatedData {
  conversationUpdated: {
    conversation: Omit<ConversationsPopulated, 'latestMessage'> & {
      latestMessage: MessagePopulated;
    };
  };
}

/**
 * Messages
 */
export interface MessagesData {
  messages: Array<MessagePopulated>;
}
export interface MessagesVariables {
  conversationId: string;
}

export interface SendMessageArguments {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
}

export interface MessageSubscriptionData {
  subscriptionData: {
    data: {
      messageSent: MessagePopulated;
    };
  };
}

export type MessagePopulated = Prisma.MessageGetPayload<{
  include: typeof messagePopulated;
}>;
