import React, { useState } from 'react';

const ABTestComponent = () => {
  const [userConsent, setUserConsent] = useState(false);
  const variants = ['variantA.jpg', 'variantB.jpg'];

  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const handleImageClick = () => {
    setClickCount(clickCount + 1);
    const newVariantIndex = Math.floor(Math.random() * variants.length);
    setCurrentVariantIndex(newVariantIndex);
    console.log('A/B Test Interaction:', variants[newVariantIndex]);
  };

  const handleConsent = () => {
    setUserConsent(true);

    localStorage.setItem('userConsent', 'true');
  };

  const handleCTAButtonClick = () => {
    const trackingPayload = {
      event: 'CTAButtonClick',
      timestamp: new Date().toISOString(),
    };
    console.log('Tracking Payload:', trackingPayload);
  };

  return (
    <div>
      <h1>Ad Campaign with A/B Testing and CTA</h1>

      <section>
        <h2>Static Section</h2>
        <p>This is a static section with fixed content.</p>
      </section>

      <section>
        <h2>A/B Test Dynamic Section</h2>
        <p>
          Help us choose the best image! Click the image to see different
          variants:
        </p>
        <img
          src={variants[currentVariantIndex]}
          alt={`Advertisement Variant ${currentVariantIndex + 1}`}
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
      </section>

      <section>
        <h2>Call-to-Action (CTA)</h2>
        {!userConsent && (
          <div>
            <p>
              This website uses cookies. Do you consent to the use of cookies?
            </p>
            <button onClick={handleConsent}>I Consent</button>
          </div>
        )}
        {userConsent && (
          <div>
            <p>Click the CTA button to trigger a tracked event:</p>
            <button
              onClick={handleCTAButtonClick}
              style={{ cursor: 'pointer' }}
            >
              Learn More
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ABTestComponent;
