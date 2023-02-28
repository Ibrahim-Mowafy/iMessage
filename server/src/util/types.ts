import { Context } from 'graphql-ws/lib/server';
import {
  conversationPopulated,
  participantPopulated,
} from './../graphql/resolvers/conversation';

import { Prisma, PrismaClient } from '@prisma/client';
import { ISODateString } from 'next-auth';
import { PubSub } from 'graphql-subscriptions';
import { messagePopulated } from '../graphql/resolvers/message';

/**
 * Server Configuration
 */
export interface Session {
  user: User;
  expires: ISODateString;
}
export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub;
}
export interface SubscriptionContext extends Context {
  connectionParams: {
    session?: Session;
  };
}

/**
 * Users
 */

export interface User {
  id: string;
  username: string;
  image: string;
  email: string;
  emailVerified: boolean;
  name: string;
}

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
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

export interface ConversationUpdatedSubscriptionPayload {
  conversationUpdated: {
    conversation: ConversationsPopulated;
  };
}

/**
 * Messages
 */
export interface SendMessageArguments {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
}

export interface MessageSentSubscriptionPayload {
  messageSent: MessagePopulated;
}

export type MessagePopulated = Prisma.MessageGetPayload<{
  include: typeof messagePopulated;
}>;
