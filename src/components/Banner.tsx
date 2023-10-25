import React, { useState } from 'react';

interface BannerProps {
  title1: string;
  message1: string;
  title2: string;
  title3: string;
  message3: string;
}

const Banner: React.FC<BannerProps> = ({
  title1,
  message1,
  title3,
  message3,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');

  const openPaymentModal = () => {
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handlePayment = () => {
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    const randomNum = Math.floor(Math.random() * 1000) + 1;
    const randomId = "p" + randomNum.toString();

    const paymentData = {
        'eventType': "PAYMENT_INITIATED",
        'eventTime': currentTimestamp,
        'txnId': randomId,
        'amount': -paymentAmount // amount must be negative
    }

    fetch('http://127.0.0.1:5000/api/submit_event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

    console.log(`Making a payment of $${paymentAmount}`);
    // Close the modal after making the payment
    closePaymentModal();
  };

  return (
    <div className="banner">
      <div className="banner-box">
        <h1>{title1}</h1>
        <h3>{message1}</h3>
      </div>
      <div className="banner-box">
        <button className="rounded-button" onClick={openPaymentModal}>
          Make Payment
        </button>
        {showPaymentModal && (
          <div className="payment-modal-overlay">
            <div className="payment-modal">
              <span className="close" onClick={closePaymentModal}>
                &times;
              </span>
              <h2>Making payment</h2>
              <p>Enter the amount:</p>
              <input
                type="text"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
              <button onClick={handlePayment}>Submit</button>
            </div>
          </div>
        )}
      </div>
      <div className="banner-box">
        <h1>{title3}</h1>
        <h3>{message3}</h3>
      </div>
    </div>
  );
};

export default Banner;
