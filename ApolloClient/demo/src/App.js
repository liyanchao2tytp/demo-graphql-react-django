/*
 * @Author: lyc
 * @Date: 2021-01-13 00:52:33
 * @LastEditors: lyc
 * @LastEditTime: 2021-01-24 19:19:37
 * @Description: file content
 */
import React from 'react'
// import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { ExchangeRates } from './useQueryHelper.jsx'

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
});



export default () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>First Apollo app</h1>
        <div>
          <ExchangeRates />
        </div>
      </div>

    </ApolloProvider>
  )
}