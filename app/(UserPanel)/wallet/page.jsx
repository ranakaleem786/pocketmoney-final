
import AppBar from '@/components/AppBar'
import BottomNav from '@/components/BottomNav'
import AddPaymentMethod from '@/components/wallet/AddPaymentMethod'
import SummaryCard from '@/components/wallet/SummaryCard'
import WithdrawalBox from '@/components/wallet/WithdrawalBox'
import WithdrawalHistory from '@/components/wallet/WithdrawalHistory'
import { api } from '@/lib/api'
import { serverApi } from '@/lib/serverApi'

import React from 'react'

// export const dynamic = "force-dynamic";


const page = async () => {
  
  // const rewardRes = await serverApi("/bounty/get-claimed-reward-count");
  const getPaymentRes = await api("/user/get-payment-method");
  // const getWithdrawals = await serverApi("/user/get-withdrawals");

  console.log(getPaymentRes?.data);
  

  return (
    <div className=''>
      <AppBar/>
      <SummaryCard rewardCount={rewardRes?.data?.reward?.rewardCount || 0} />
      <AddPaymentMethod getMethods={getPaymentRes?.data} />
      <WithdrawalBox getMethods={getPaymentRes?.data} />
      <WithdrawalHistory getWithdrawals={getWithdrawals?.data?.withdrawals} />
      <BottomNav/>
    </div>
  )
}

export default page
