/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

/** 댓글 생성 시 필요한 입력값 */
export type CommentCreationInput = {
  content: Scalars['String']
  userName: Scalars['String']
}

/** 댓글 수정 시 필요한 입력값 */
export type CommentModificationInput = {
  id: Scalars['ID']
  content: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createComment: Scalars['Boolean']
  modifyComment: Scalars['Boolean']
  deleteComment: Scalars['Boolean']
}

export type MutationCreateCommentArgs = {
  input: CommentCreationInput
}

export type MutationModifyCommentArgs = {
  input: CommentModificationInput
}

export type MutationDeleteCommentArgs = {
  id: Scalars['Int']
}

export enum CrawlingSource {
  Youtube = 'YOUTUBE',
  Melon = 'MELON',
}

export type Comment = {
  __typename?: 'Comment'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  crawlingDate: Scalars['DateTime']
  content: Scalars['String']
  userName: Scalars['String']
  source: CrawlingSource
  like?: Maybe<Scalars['Int']>
}

export type Music = {
  __typename?: 'Music'
  id: Scalars['ID']
  title: Scalars['String']
  artists: Array<Scalars['String']>
  searchCount: Scalars['Int']
  genres?: Maybe<Array<Scalars['String']>>
  lyrics?: Maybe<Scalars['String']>
  youtubeLink?: Maybe<Scalars['String']>
  /** 이 노래에 해당하는 댓글 목록을 반환한다. # 페이지네이션 필요 */
  comments?: Maybe<Array<Scalars['String']>>
  /** 이 노래와 비슷한 노래 목록을 반환한다. # 페이지네이션 필요 */
  similarMusics?: Maybe<Array<Music>>
  /** 이 노래를 부른 가수의 다른 노래를 검색 횟수 순으로 반환한다. # 페이지네이션 필요 */
  artistOtherMusics?: Maybe<Array<Music>>
  /** 이 노래가 포함된 재생 목록을 반환한다. # 페이지네이션 필요 */
  includedPlaylists?: Maybe<Array<Playlist>>
}

export type Playlist = {
  __typename?: 'Playlist'
  id: Scalars['ID']
  name: Scalars['String']
  musics?: Maybe<Array<Music>>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  name: Scalars['String']
  age: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  comment?: Maybe<Comment>
  comments?: Maybe<Array<Comment>>
  /** 내 정보를 반환한다. 해당 권한이 없으면 오류가 발생한다. */
  me?: Maybe<User>
  /** 특정 음악 정보를 반환한다. */
  music?: Maybe<Music>
  /** 노래 제목 및 가수 이름으로 음악 검색 */
  musicByNameArtist?: Maybe<Music>
  /** 모든 음악 목록을 반환한다. # 페이지네이션 필요 */
  musics?: Maybe<Array<Music>>
  /** 사용자 목록을 반환한다. (관리자 전용) */
  users?: Maybe<Array<User>>
}

export type QueryCommentArgs = {
  id: Scalars['ID']
}

export type QueryMusicArgs = {
  id: Scalars['ID']
}

export type QueryMusicByNameArtistArgs = {
  name: Scalars['String']
  artist?: Maybe<Array<Scalars['String']>>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  CommentCreationInput: CommentCreationInput
  String: ResolverTypeWrapper<Scalars['String']>
  CommentModificationInput: CommentModificationInput
  ID: ResolverTypeWrapper<Scalars['ID']>
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  CrawlingSource: CrawlingSource
  Comment: ResolverTypeWrapper<Comment>
  Music: ResolverTypeWrapper<Music>
  Playlist: ResolverTypeWrapper<Playlist>
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>
  User: ResolverTypeWrapper<User>
  Query: ResolverTypeWrapper<{}>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  CommentCreationInput: CommentCreationInput
  String: Scalars['String']
  CommentModificationInput: CommentModificationInput
  ID: Scalars['ID']
  Mutation: {}
  Boolean: Scalars['Boolean']
  Int: Scalars['Int']
  Comment: Comment
  Music: Music
  Playlist: Playlist
  DateTime: Scalars['DateTime']
  User: User
  Query: {}
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createComment?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCommentArgs, 'input'>
  >
  modifyComment?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationModifyCommentArgs, 'input'>
  >
  deleteComment?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCommentArgs, 'id'>
  >
}

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  crawlingDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  source?: Resolver<ResolversTypes['CrawlingSource'], ParentType, ContextType>
  like?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MusicResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Music'] = ResolversParentTypes['Music']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  artists?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  searchCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  genres?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
  lyrics?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  youtubeLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  comments?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
  similarMusics?: Resolver<Maybe<Array<ResolversTypes['Music']>>, ParentType, ContextType>
  artistOtherMusics?: Resolver<Maybe<Array<ResolversTypes['Music']>>, ParentType, ContextType>
  includedPlaylists?: Resolver<Maybe<Array<ResolversTypes['Playlist']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PlaylistResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Playlist'] = ResolversParentTypes['Playlist']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  musics?: Resolver<Maybe<Array<ResolversTypes['Music']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  comment?: Resolver<
    Maybe<ResolversTypes['Comment']>,
    ParentType,
    ContextType,
    RequireFields<QueryCommentArgs, 'id'>
  >
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  music?: Resolver<
    Maybe<ResolversTypes['Music']>,
    ParentType,
    ContextType,
    RequireFields<QueryMusicArgs, 'id'>
  >
  musicByNameArtist?: Resolver<
    Maybe<ResolversTypes['Music']>,
    ParentType,
    ContextType,
    RequireFields<QueryMusicByNameArtistArgs, 'name'>
  >
  musics?: Resolver<Maybe<Array<ResolversTypes['Music']>>, ParentType, ContextType>
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>
  Comment?: CommentResolvers<ContextType>
  Music?: MusicResolvers<ContextType>
  Playlist?: PlaylistResolvers<ContextType>
  DateTime?: GraphQLScalarType
  User?: UserResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
