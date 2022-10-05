import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type LoginUserInputType = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  messageType: Scalars['String'];
  receiver: User;
  sender: User;
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMessage: Message;
  login: User;
  loginWithGithub: User;
  logout?: Maybe<Scalars['Boolean']>;
  signup: User;
};


export type MutationAddMessageArgs = {
  receiver: Scalars['String'];
  text: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginUserInputType;
};


export type MutationLoginWithGithubArgs = {
  code: Scalars['String'];
};


export type MutationSignupArgs = {
  input: SignupUserInputType;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  messages: Array<Message>;
  user: User;
  users: Array<User>;
};


export type QueryMessagesArgs = {
  user: Scalars['String'];
};


export type QueryUserArgs = {
  _id: Scalars['String'];
};

export type SignupUserInputType = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  updated: Scalars['DateTime'];
};

export type AddMessageMutationVariables = Exact<{
  receiver: Scalars['String'];
  text: Scalars['String'];
}>;


export type AddMessageMutation = { __typename?: 'Mutation', addMessage: { __typename: 'Message', _id: string, text: string, createdAt: any, sender: { __typename?: 'User', _id: string, name: string }, receiver: { __typename?: 'User', _id: string, name: string } } };

export type GithubLoginMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type GithubLoginMutation = { __typename?: 'Mutation', user: { __typename: 'User', _id: string, name: string, photo?: string | null, email: string } };

export type LoginUserMutationVariables = Exact<{
  input: LoginUserInputType;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', user: { __typename: 'User', _id: string, name: string, photo?: string | null, email: string } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logout?: boolean | null };

export type SignupUserMutationVariables = Exact<{
  input: SignupUserInputType;
}>;


export type SignupUserMutation = { __typename?: 'Mutation', user: { __typename: 'User', _id: string, name: string, email: string, photo?: string | null } };

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = { __typename?: 'Query', user?: { __typename: 'User', _id: string, name: string, email: string, photo?: string | null } | null };

export type MessagesQueryVariables = Exact<{
  user: Scalars['String'];
}>;


export type MessagesQuery = { __typename?: 'Query', receiver: { __typename: 'User', _id: string, name: string, photo?: string | null }, messages: Array<{ __typename: 'Message', _id: string, text: string, createdAt: any, sender: { __typename?: 'User', _id: string, name: string }, receiver: { __typename?: 'User', _id: string, name: string } }> };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', users: Array<{ __typename: 'User', _id: string, name: string, photo?: string | null }> };

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = { __typename?: 'Subscription', message: { __typename: 'Message', _id: string, text: string, messageType: string, createdAt: any, updatedAt: any, sender: { __typename?: 'User', _id: string }, receiver: { __typename?: 'User', _id: string } } };


export const AddMessageDocument = gql`
    mutation AddMessage($receiver: String!, $text: String!) {
  addMessage(receiver: $receiver, text: $text) {
    _id
    sender {
      _id
      name
    }
    receiver {
      _id
      name
    }
    text
    createdAt
    __typename
  }
}
    `;

export function useAddMessageMutation() {
  return Urql.useMutation<AddMessageMutation, AddMessageMutationVariables>(AddMessageDocument);
};
export const GithubLoginDocument = gql`
    mutation GithubLogin($code: String!) {
  user: loginWithGithub(code: $code) {
    _id
    name
    photo
    email
    __typename
  }
}
    `;

export function useGithubLoginMutation() {
  return Urql.useMutation<GithubLoginMutation, GithubLoginMutationVariables>(GithubLoginDocument);
};
export const LoginUserDocument = gql`
    mutation LoginUser($input: LoginUserInputType!) {
  user: login(input: $input) {
    _id
    name
    photo
    email
    __typename
  }
}
    `;

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument);
};
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logout
}
    `;

export function useLogoutUserMutation() {
  return Urql.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument);
};
export const SignupUserDocument = gql`
    mutation SignupUser($input: SignupUserInputType!) {
  user: signup(input: $input) {
    _id
    name
    email
    photo
    __typename
  }
}
    `;

export function useSignupUserMutation() {
  return Urql.useMutation<SignupUserMutation, SignupUserMutationVariables>(SignupUserDocument);
};
export const LoggedInUserDocument = gql`
    query LoggedInUser {
  user: me {
    _id
    name
    email
    photo
    __typename
  }
}
    `;

export function useLoggedInUserQuery(options?: Omit<Urql.UseQueryArgs<LoggedInUserQueryVariables>, 'query'>) {
  return Urql.useQuery<LoggedInUserQuery, LoggedInUserQueryVariables>({ query: LoggedInUserDocument, ...options });
};
export const MessagesDocument = gql`
    query Messages($user: String!) {
  receiver: user(_id: $user) {
    _id
    name
    photo
    __typename
  }
  messages(user: $user) {
    _id
    sender {
      _id
      name
    }
    receiver {
      _id
      name
    }
    text
    createdAt
    __typename
  }
}
    `;

export function useMessagesQuery(options: Omit<Urql.UseQueryArgs<MessagesQueryVariables>, 'query'>) {
  return Urql.useQuery<MessagesQuery, MessagesQueryVariables>({ query: MessagesDocument, ...options });
};
export const AllUsersDocument = gql`
    query AllUsers {
  users {
    _id
    name
    photo
    __typename
  }
}
    `;

export function useAllUsersQuery(options?: Omit<Urql.UseQueryArgs<AllUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<AllUsersQuery, AllUsersQueryVariables>({ query: AllUsersDocument, ...options });
};
export const NewMessageDocument = gql`
    subscription NewMessage {
  message: newMessage {
    _id
    text
    messageType
    sender {
      _id
    }
    receiver {
      _id
    }
    createdAt
    updatedAt
    __typename
  }
}
    `;

export function useNewMessageSubscription<TData = NewMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewMessageSubscription, TData>) {
  return Urql.useSubscription<NewMessageSubscription, TData, NewMessageSubscriptionVariables>({ query: NewMessageDocument, ...options }, handler);
};