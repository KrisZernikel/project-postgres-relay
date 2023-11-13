import React, { useTransition } from 'react';
import './App.css';
import graphql from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
  loadQuery,
  // usePreloadedQuery,
  useLazyLoadQuery,
  useFragment,
  usePaginationFragment
} from 'react-relay/hooks';
import { RelayEnvironment } from './RelayEnvironment';
import InfiniteScroll from 'react-infinite-scroller';

const { Suspense } = React;

// Define a query
const RepositoryPostQuery = graphql`
  query AppRepositoryPostQuery {
    ...AppRepositoryPostFragment
  }
`;

// const PostFragment = graphql`
// fragment PostFragment on Query {
//   message
// }
// `

const RepositoryPostFragment = graphql`
  fragment AppRepositoryPostFragment on Query 
    @argumentDefinitions (
      cursor: { type: "Cursor" }
      count: { type: "Int", defaultValue: 3 }
    )
    @refetchable(queryName: "PostRefetchQuery")
  {
    posts(after: $cursor, first: $count) @connection(key: "RepositoryPostFragment_posts") {
      totalCount
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          message
        }
      }
    }
  }
`;

// Immediately load the query as our app starts. For a real app, we'd move this
// into our routing configuration, preloading data as we transition to new routes.
const preloadedQuery = loadQuery(RelayEnvironment, RepositoryPostQuery, {
  /* query variables */
});

// Inner component that reads the preloaded query results via `usePreloadedQuery()`.
// This works as follows:
// - If the query has completed, it returns the results of the query.
// - If the query is still pending, it "suspends" (indicates to React that the
//   component isn't ready to render yet). This will show the nearest <Suspense>
//   fallback.
// - If the query failed, it throws the failure error. For simplicity we aren't
//   handling the failure case here.
function App(props) {
  // const data = usePreloadedQuery(RepositoryPostQuery, props.preloadedQuery);

  const queryData = useLazyLoadQuery(RepositoryPostQuery, {});
  // const data = useFragment(RepositoryPostFragment, queryData);

  const [isPending, startTransition] = useTransition();
  const {data, loadNext} = usePaginationFragment(RepositoryPostFragment, queryData);
  // const onLoadMore = () => loadNext(3);
  const onLoadMore = () => startTransition(() => {
    loadNext(3);
  });

  const storyEdges = data.posts.edges;

  return (
    <div className="App">
    <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={data.posts.pageInfo.hasNextPage}
        loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={true}
    >
      {storyEdges.map(storyEdge =>
        <p key={storyEdge.node.id}>{storyEdge.node.message}</p>
      )}
    </InfiniteScroll>
    </div>
  );
}

// The above component needs to know how to access the Relay environment, and we
// need to specify a fallback in case it suspends:
// - <RelayEnvironmentProvider> tells child components how to talk to the current
//   Relay Environment instance
// - <Suspense> specifies a fallback in case a child suspends.
function AppRoot(props) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;