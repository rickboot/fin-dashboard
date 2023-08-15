import { useMemo } from 'react';
import { Box, Toolbar, Typography, useTheme } from '@mui/material';
import {
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetProductsQuery } from '@/state/api';

const Row2 = () => {
  const { palette } = useTheme();

  const { data: opsData } = useGetProductsQuery();

  const productData = useMemo(() => {
    return (
      // opsData &&
      opsData?.map(({ price, expense }) => {
        return {
          price,
          expense,
        };
      })
    );
  }, [opsData]);

  const pieData = [
    { name: 'Group A', value: 600 },
    { name: 'Group B', value: 400 },
  ];

  const pieColors = [palette.primary[800], palette.primary[300]];

  return (
    <>
      <DashboardBox gridArea='e'>
        <BoxHeader title='Campaigns and Targets' sideText='4%' />
        <FlexBetween gap='1.5rem'>
          <Box flexBasis='30%' display='flex' justifyContent='end'>
            <ResponsiveContainer width='100%' height={100}>
              <PieChart>
                <Toolbar />
                <Pie
                  data={pieData}
                  dataKey='value'
                  innerRadius='20'
                  outerRadius='40'
                  stroke='none'
                >
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box flexBasis='40%' textAlign='center'>
            <Typography variant='h5'>Target Sales</Typography>
            <Typography
              m='0.3rem'
              variant='h3'
              style={{ color: palette.primary[300] }}
            >
              84
            </Typography>
            <Typography variant='h6' style={{ color: palette.grey[600] }}>
              Finance goals of the campaign
            </Typography>
          </Box>

          <Box flexBasis='30%'>
            <Typography variant='h5'>Loss of Revenue</Typography>{' '}
            <Typography variant='h6'>Losses are down 25%</Typography>
            <Box mt='.2rem'></Box>
            <Typography variant='h5'>Profit Margin</Typography>{' '}
            <Typography variant='h6'>Margins are up 30%</Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea='f'>
        <BoxHeader title='Product Prices vs Expenses' sideText='4%' />
        <ResponsiveContainer width='100%' height='100%'>
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} strokeDasharray='3 2' />

            <XAxis
              type='number'
              dataKey='price'
              name='price'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type='number'
              dataKey='expense'
              name='expense'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type='number' range={[20]} />

            <Tooltip
              formatter={(v) => `$${v}`}
              cursor={{ strokeDasharray: '3 3' }}
            />

            <Scatter
              name='Product Expense Ratio'
              data={productData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};
export default Row2;
