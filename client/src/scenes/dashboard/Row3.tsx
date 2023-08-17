import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from '@/state/api';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const productColumns = [
    {
      field: '_id',
      headerName: 'id',
      flex: 1,
    },
    {
      field: 'expense',
      headerName: 'Expense',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: '_id',
      headerName: 'id',
      flex: 1,
    },
    {
      field: 'buyer',
      headerName: 'Buyer',
      flex: 0.7,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'productIds',
      headerName: 'Count',
      flex: 0.3,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      const expensesByCategory = kpiData[0].expensesByCategory;

      return Object.entries(expensesByCategory).map(([key, value]) => {
        return [
          {
            name: key,
            value: value,
          },
          {
            name: `${key} of Total`,
            value: totalExpenses,
          },
        ];
      });
    }
  }, [kpiData]);

  return (
    <>
      <DashboardBox gridArea='g'>
        <BoxHeader
          title='List of Products'
          sideText={`${productData?.length || '0'} products`}
        />
        <Box
          mt='0.5rem'
          p='0 0.5rem'
          height='75%'
          sx={{
            '& .MuiDataGrid-root': { color: palette.grey[300], border: 'none' },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiButtonBase-root': {
              visibility: 'hidden',
            },
          }}
        >
          <DataGrid
            getRowId={(row) => row._id}
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea='h'>
        <BoxHeader
          title='Recent Orders'
          sideText={`${transactionData?.length} latest orders`}
        />
        <Box
          mt='0.5rem'
          p='0 0.5rem'
          height='80%'
          sx={{
            '& .MuiDataGrid-root': { color: palette.grey[300], border: 'none' },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'hidden !important',
            },
            '& .MuiButtonBase-root': {
              visibility: 'hidden',
            },
          }}
        >
          <DataGrid
            getRowId={(row) => row._id}
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea='i'>
        <BoxHeader title='Expense Breakdown by Category' sideText='4%' />
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          height='80%'
        >
          <FlexBetween
            // mt='0.5rem'
            gap='0.5rem'
            p='0 1rem'
            width='100%'
          >
            {pieChartData?.map((data, i) => (
              <Box key={`${data[0].name}-${i}`}>
                <PieChart width={100} height={100}>
                  <Pie
                    data={data}
                    dataKey='value'
                    innerRadius={18}
                    outerRadius={35}
                    paddingAngle={2}
                    stroke='none'
                  >
                    {data.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
                <Typography textAlign='center' variant='h5'>
                  {data[0].name}
                </Typography>
              </Box>
            ))}
          </FlexBetween>
        </Box>{' '}
      </DashboardBox>

      <DashboardBox gridArea='j'>
        <BoxHeader title='Summary and Explanation Data' sideText='+15%' />

        <Box
          height='15px'
          margin='1.25rem 1rem 0.4rem 1rem'
          borderRadius='1rem'
          bgcolor={palette.primary[800]}
        >
          <Box
            height='15px'
            width='40%'
            borderRadius='1rem'
            bgcolor={palette.primary[600]}
          ></Box>

          <Typography margin='1rem 1rem' variant='h6'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
          </Typography>
        </Box>
      </DashboardBox>
    </>
  );
};

export default Row3;
