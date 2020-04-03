/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import useToggle from '#hooks/useToggle';

/* The Include html which we are getting would be encoded
   so that html characters are escaped when serializing the page data.
   This function ensures that it gets decoded back to an html string.
 */
const decodeHTML = (str) => {
  const replacedParts = {
    '&quot;': '"',
    '&#39;': "'",
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
  };
  const replacementsRegex = new RegExp(
    Object.keys(replacedParts).join('|'),
    'gi',
  );
  return str.replace(replacementsRegex, (match) => replacedParts[match]);
};

const IncludeContainer = ({ html, type }) => {
  const { enabled } = useToggle('include');
  const [setHtml, markup] = useState('');
  const [scriptTags, setScriptsTags] = useState([]);

  const supportedTypes = {
    idt2: 'idt2',
    vj: 'vj',
  };

  const createAppendScriptTag = (code) => {
    const script = document.createElement('script');
    script.appendChild(document.createTextNode(code));
    document.body.append(script);
  };

  useEffect(() => {
    const response = `<style>@-webkit-keyframes spinnerRotate{from{-webkit-transform:rotate(0deg);}to{-webkit-transform:rotate(360deg);}}@-moz-keyframes spinnerRotate{from{-moz-transform:rotate(0deg);}to{-moz-transform:rotate(360deg);}}@-ms-keyframes spinnerRotate{from{-ms-transform:rotate(0deg);}to{-ms-transform:rotate(360deg);}}.bbc-news-visual-journalism-loading-spinner{display: block; margin: 10px auto; width: 33px; height: 33px; max-width: 33px; -webkit-animation-name: spinnerRotate; -webkit-animation-duration: 5s; -webkit-animation-iteration-count: infinite; -webkit-animation-timing-function: linear; -moz-animation-name: spinnerRotate; -moz-animation-duration: 5s; -moz-animation-iteration-count: infinite; -moz-animation-timing-function: linear; -ms-animation-name: spinnerRotate; -ms-animation-duration: 5s; -ms-animation-iteration-count: infinite; -ms-animation-timing-function: linear; background-image: url('data:image/gif;base64,R0lGODlhIQAhALMAAMPDw/Dw8BAQECAgIICAgHBwcKCgoDAwMFBQULCwsGBgYEBAQODg4JCQkAAAAP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFFOTcwNTgzMDlCMjExRTQ4MDU3RThBRkIxMjYyOEYyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFFOTcwNTg0MDlCMjExRTQ4MDU3RThBRkIxMjYyOEYyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUU5NzA1ODEwOUIyMTFFNDgwNTdFOEFGQjEyNjI4RjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUU5NzA1ODIwOUIyMTFFNDgwNTdFOEFGQjEyNjI4RjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAIQAhAAAE0vDJSScguOrNE3IgyI0bMIQoqUoF6q5jcLigsCzwJrtCAeSjDwoRAI4aLoNxxBCglEtJoFGUKFCEqCRxKkidoIP20aoVDaifFvB8XEGDseQEUjzoDq+87IijEnIPCSlpgWwhDIVyhyKKY4wOD3+BgyF3IXpjfHFvfYF4dmghalGQSgFgDmJaM2ZWWFEEKHYSTW1AojUMFEi3K7kgDRpCIUQkAcQgCDqtIT2kFgWpYVUaOzQ2NwvTIQfVHHw04iCZKibjNAPQMB7oDgiAixjzBOsbEQA7');}</style><script>define('vjCutsTheMustard', function cutsTheMustard(){return ( document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1') && 'querySelector' in document && 'localStorage' in window && 'addEventListener' in window );});</script><div id="5e57e13fcddb2"> <div id="5e57e13fcddb2-core-content"> <a href="//www.bbc.co.uk/indepthtoolkit/quizzes/sistema_solar_Quiz_Mundo">Haga clic para ver el contenido&#58; sistema_solar_Quiz_Mundo</a> </div></div><script type="text/javascript">require.config({paths:{'pym': '//static.bbc.co.uk/indepthtoolkit/15.3.0.361/js/vendor/bower/pym.js/dist/pym.v1.min', 'pymManager': '//static.bbc.co.uk/indepthtoolkit/15.3.0.361/js/vendor/bower/news-vj-iframe-wrapper/js/pym-manager'}}); require(['vjCutsTheMustard', 'pymManager'], function (cutsTheMustard, pymManager){if (cutsTheMustard){pymManager.init('5e57e13fcddb2', '//www.bbc.co.uk/indepthtoolkit/quizzes/sistema_solar_Quiz_Mundo?iframe=true&iframeUID=5e57e13fcddb2', 'pym', '5e57e13fcddb2-core-content');}});</script>`;
    const scriptTagRegExp = new RegExp(/<script\b[^>]*>([\s\S]*?)<\/script>/gm);
    const scriptTagMatches = response.matchAll(scriptTagRegExp);

    setScriptsTags(Array.from(scriptTagMatches));
    setHtml(response.replace(scriptTagMatches, ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scriptTags.forEach((scriptTag) => {
      // eslint-disable-next-line no-unused-vars
      const [_, contents] = scriptTag;
      createAppendScriptTag(contents);
    });
  }, [scriptTags]);

  const shouldNotRenderInclude = !enabled || !html || !supportedTypes[type];

  if (shouldNotRenderInclude) {
    return null;
  }

  return (
    <GridItemConstrainedMedium>
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: decodeHTML(html) }}
      />

      <div dangerouslySetInnerHTML={{ __html: markup }} />
    </GridItemConstrainedMedium>
  );
};

IncludeContainer.propTypes = {
  html: string,
  type: string.isRequired,
};

IncludeContainer.defaultProps = {
  html: null,
};

export default IncludeContainer;
