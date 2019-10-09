import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import LinkData from '.';

// eslint-disable-next-line react/prop-types
const Context = ({ children }) => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={false}
      pageType="article"
      pathname="/pathname"
      service="news"
      statusCode={200}
    >
      {children}
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('LinkData', () => {
  const propsForArticle = {
    showAuthor: true,
    type: 'Article',
    seoTitle: 'Royal wedding 2018: Bouquet laid on tomb of unknown warrior',
    headline: 'Article Headline for SEO',
    datePublished: '2018-01-01T12:01:00.000Z',
    dateModified: '2018-01-01T13:00:00.000Z',
    about: [
      {
        '@type': 'Thing',
        name: 'Royal Wedding 2018',
        sameAs: ['http://dbpedia.org/resource/Queen_Victoria'],
      },
      { '@type': 'Person', name: 'Duchess of Sussex' },
    ],
  };

  const propsForRadio = {
    type: 'RadioChannel',
    seoTitle: 'BBC News Radio',
  };

  const propsForFrontpage = {
    type: 'WebPage',
    seoTitle: 'Home - BBC News',
  };

  shouldMatchSnapshot(
    'should correctly render linked data for articles',
    <Context>
      <LinkData {...propsForArticle} />
    </Context>,
  );

  shouldMatchSnapshot(
    'should correctly render linked data for radio pages',
    <Context>
      <LinkData {...propsForRadio} />
    </Context>,
  );

  shouldMatchSnapshot(
    'should correctly render linked data for front pages',
    <Context>
      <LinkData {...propsForFrontpage} />
    </Context>,
  );
});
