import { runCommonCrossPlatformTests } from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);

  it('I can see an image with a caption', () => {
    const imageEl = document.querySelector(
      'main figure img, main figure amp-img',
    );
    const imageCaptionEl = document.querySelector('main figure figcaption');

    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toBeTruthy();
    expect(imageEl.getAttribute('src')).toMatchSnapshot();

    expect(imageCaptionEl).toBeInTheDocument();
    expect(imageCaptionEl.textContent).toBeTruthy();
    expect(imageCaptionEl.textContent).toMatchSnapshot();
  });
};
