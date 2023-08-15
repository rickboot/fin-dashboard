import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import { useGetTransactionsQuery } from '@/state/api';

const Row3 = () => {
  const { data: transactionData } = useGetTransactionsQuery();
  console.log(
    '🚀 ~ file: Row3.tsx:7 ~ Row3 ~ transactionData:',
    transactionData
  );

  return (
    <>
      <DashboardBox gridArea='g'>
        <BoxHeader title='List of Products' sideText='124 products' />
      </DashboardBox>

      <DashboardBox gridArea='h'>
        <BoxHeader title='Recent Orders' sideText='50 latest orders' />
      </DashboardBox>

      <DashboardBox gridArea='i'>
        <BoxHeader title='TBD' sideText='124 products' />
      </DashboardBox>
      <DashboardBox gridArea='j'>
        <BoxHeader title='TBD' sideText='124 products' />
      </DashboardBox>
    </>
  );
};

export default Row3;
