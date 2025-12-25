import { useState } from 'react';
import PoliciesPage from './components/PoliciesPage';
import PaymentPage from './components/PaymentPage';
import { PageType } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('policies');

  const handleAgree = () => {
    setCurrentPage('payment');
  };

  return (
    <>
      {currentPage === 'policies' && <PoliciesPage onAgree={handleAgree} />}
      {currentPage === 'payment' && <PaymentPage />}
    </>
  );
}

export default App;
