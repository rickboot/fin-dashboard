import { Box, useTheme } from '@mui/material';
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import regression, { DataPoint } from 'regression';

import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
// import { useState } from 'react';

const Predictions = () => {
  // const { isPredition, setIsPrediction } = useState(false);
  const { palette } = useTheme();

  const { data: kpiData } = useGetKpisQuery();

  const processedData = () => {
    if (!kpiData) return [];

    const monthlyData = kpiData[0].monthlyData;

    const dataPoints: Array<DataPoint> = monthlyData.map(
      ({ revenue }, monthNum) => {
        return [monthNum, revenue];
      }
    );

    const regressionLine = regression.linear(dataPoints);
    
    return regressionLine;
  }, [kpiData]);

  console.log(processedData);

  return (
    <Box color='red'>
      <DashboardBox></DashboardBox>
      {/* <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          margin={{
            top: 20,
            right: 25,
            bottom: 40,
            left: -10,
          }}
        >
          <CartesianGrid stroke={palette.grey[800]} strokeDasharray='3 2' />

          <XAxis
            type='monthNum'
            dataKey='month'
            name='month'
            axisLine={false}
            tickLine={false}
            style={{ fontSize: '10px' }}
            // tickFormatter={(v) => `$${v}`}
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
            data={processedData}
            fill={palette.tertiary[500]}
          />
        </LineChart>
      </ResponsiveContainer> */}
    </Box>
  );
};

export default Predictions;
function useMemo(
  arg0: () => void,
  arg1: (import('../../state/types').KpiData[] | undefined)[]
) {
  throw new Error('Function not implemented.');
}
