import { ConversationsPopulated } from '../../../server/src/util/types';

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
