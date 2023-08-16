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
    return opsData?.map(({ price, expense }) => {
      return {
        price,
        expense,
      };
    });
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
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          height='80%'
          width='100%'
        >
          <FlexBetween mt='0.25rem' gap='0.5rem' pr='1rem' width='100%'>
            <Box
              flexBasis='33%'
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <PieChart
                width={110}
                height={100}
                margin={{
                  top: 0,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <Pie
                  stroke='none'
                  data={pieData}
                  innerRadius={18}
                  outerRadius={38}
                  paddingAngle={2}
                  dataKey='value'
                >
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </Box>
            <Box flexBasis='33%' textAlign='center'>
              <Typography variant='h5'>Target Sales</Typography>
              <Typography
                m='0.3rem 0'
                variant='h3'
                color={palette.primary[300]}
              >
                83
              </Typography>
              <Typography variant='h6'>
                Finance goals of the campaign that is desired
              </Typography>
            </Box>
            <Box flexBasis='33%'>
              <Typography variant='h5'>Losses in Revenue</Typography>
              <Typography variant='h6'>Losses are down 25%</Typography>
              <Typography mt='0.4rem' variant='h5'>
                Profit Margins
              </Typography>
              <Typography variant='h6'>
                Margins are up by 30% from last month.
              </Typography>
            </Box>
          </FlexBetween>
        </Box>
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
