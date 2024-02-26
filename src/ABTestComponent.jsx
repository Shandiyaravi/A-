import React, { useState, useEffect } from 'react';

const ABTestComponent = () => {
  const [userConsent, setUserConsent] = useState(false);
  const [variant, setVariant] = useState('');

  useEffect(() => {
    const randomVariant =
      Math.random() <= 0.5 ? 'variantA.jpg' : 'variantB.jpg';
    setVariant(randomVariant);
    console.log('A/B Test Interaction (Page Load):', randomVariant);
  }, []);

  const handleConsent = (consentValue) => {
    setUserConsent(consentValue);
    localStorage.setItem('userConsent', consentValue.toString());
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
          Help us choose the best image! This variant is randomly selected on
          page load:
        </p>
        <img
          src={variant}
          alt={`Advertisement Variant`}
          style={{ cursor: 'pointer' }}
        />
      </section>

      <section>
        <h2>Call-to-Action (CTA)</h2>
        {userConsent === false && (
          <div>
            <p>
              You have revoked consent and you will not be able to see the
              tracking payload! Click the button to give consent again.
            </p>
            <button onClick={() => handleConsent(true)}>Give Consent</button>
          </div>
        )}
        {userConsent === true && (
          <div>
            <p>Click the CTA button to trigger a tracked event in console</p>
            <button
              onClick={handleCTAButtonClick}
              style={{ cursor: 'pointer' }}
            >
              Tracked Event
            </button>
            <p>Click the button below to revoke consent:</p>
            <button onClick={() => handleConsent(false)}>Revoke Consent</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ABTestComponent;
