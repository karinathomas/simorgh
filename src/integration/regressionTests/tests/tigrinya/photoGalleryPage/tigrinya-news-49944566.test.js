/* eslint-disable no-irregular-whitespace */
/**
 * @pathname /tigrinya/news-49944566
 */

it('I can see a page title - AMP', () => {
  const pageTitle = amp.document.querySelector('title').textContent;

  expect(pageTitle).toBeTruthy();
  expect(pageTitle).toMatchInlineSnapshot(
    `"ኣብ ኣዲስ ኣበባ [ፊንፊኔ] ካብ ዝኽበር ዘሎ ኢሬቻ ብስእሊ - BBC News ትግርኛ"`,
  );
});

it('I can see a page title - Canonical', () => {
  const pageTitle = canonical.document.querySelector('title').textContent;

  expect(pageTitle).toBeTruthy();
  expect(pageTitle).toMatchInlineSnapshot(
    `"ኣብ ኣዲስ ኣበባ [ፊንፊኔ] ካብ ዝኽበር ዘሎ ኢሬቻ ብስእሊ - BBC News ትግርኛ"`,
  );
});

it(`I can see the brand logo in the header - AMP`, () => {
  const logo = amp.document.querySelector('header svg');

  expect(logo).toBeInTheDocument();
  expect(logo.parentNode.textContent).toMatchInlineSnapshot(`"BBC News, ትግርኛ"`);
});

it(`I can see the brand logo in the header - Canonical`, () => {
  const logo = canonical.document.querySelector('header svg');

  expect(logo).toBeInTheDocument();
  expect(logo.parentNode.textContent).toMatchInlineSnapshot(`"BBC News, ትግርኛ"`);
});

it('I can see a skip to content link that links to the main content of the page - AMP', () => {
  const skipToContentEl = amp.document.querySelector('[href="#content"]');
  const h1El = amp.document.querySelector('h1');

  expect(skipToContentEl.getAttribute('href')).toBe('#content');
  expect(h1El.getAttribute('id')).toBe('content');
  expect(h1El.getAttribute('tabindex')).toBe('-1');
  expect(skipToContentEl.textContent).toMatchInlineSnapshot(`"ናብቲ ትሕዝቶ ቀጽሉ"`);
});

it('I can see a headline - AMP', () => {
  const headline = amp.document.querySelector('h1').textContent;

  expect(headline).toBeTruthy();
  expect(headline).toMatchInlineSnapshot(
    `"ኣብ ኣዲስ ኣበባ [ፊንፊኔ] ካብ ዝኽበር ዘሎ ኢሬቻ ብስእሊ"`,
  );
});

it('I can see a skip to content link that links to the main content of the page - Canonical', () => {
  const skipToContentEl = canonical.document.querySelector('[href="#content"]');
  const h1El = canonical.document.querySelector('h1');

  expect(skipToContentEl.getAttribute('href')).toBe('#content');
  expect(h1El.getAttribute('id')).toBe('content');
  expect(h1El.getAttribute('tabindex')).toBe('-1');
  expect(skipToContentEl.textContent).toMatchInlineSnapshot(`"ናብቲ ትሕዝቶ ቀጽሉ"`);
});

it('I can see a headline - Canonical', () => {
  const headline = canonical.document.querySelector('h1').textContent;

  expect(headline).toBeTruthy();
  expect(headline).toMatchInlineSnapshot(
    `"ኣብ ኣዲስ ኣበባ [ፊንፊኔ] ካብ ዝኽበር ዘሎ ኢሬቻ ብስእሊ"`,
  );
});

it('I can see the footer copyright - AMP', () => {
  const footerCopyright = amp.document.querySelector('footer div p')
    .textContent;

  expect(footerCopyright).toBeTruthy();
  expect(footerCopyright).toMatchInlineSnapshot(
    `"© 2020 BBC. ቢቢሲ፡ ንትሕዝቶ ካልኦት መርበባት ሓበሬታ ሓላፍነት ኣይወስድን። ብዛዕባ ምስ ናይ ደገ መርበባት እንገብሮ መላግቦታት ዘለና ኣረኣእያ ንምርዳእ ኣንብቡ።"`,
  );
});

it('I can see the footer copyright - Canonical', () => {
  const footerCopyright = amp.document.querySelector('footer div p')
    .textContent;

  expect(footerCopyright).toBeTruthy();
  expect(footerCopyright).toMatchInlineSnapshot(
    `"© 2020 BBC. ቢቢሲ፡ ንትሕዝቶ ካልኦት መርበባት ሓበሬታ ሓላፍነት ኣይወስድን። ብዛዕባ ምስ ናይ ደገ መርበባት እንገብሮ መላግቦታት ዘለና ኣረኣእያ ንምርዳእ ኣንብቡ።"`,
  );
});