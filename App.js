import React from 'react';

const ClientList = React.memo(function ClientList(props) {
  // Component implementation
});

export default ClientList;
```

```jsx
import React, { useMemo } from 'react';

function LoanApplication({ interestRate, principal }) {
  const monthlyPayment = useMemo(() => {
    // Assume calculateMonthlyPayment is an expensive function
    return calculateMonthlyPayment(interestRate, principal);
  }, [interestRate, principal]);

  return (
    <div>
      {/* Use the memoized value */}
      Your monthly payment is {monthlyPayment}
    </div>
  );
}