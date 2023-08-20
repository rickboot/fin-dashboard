import { useMemo, useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import regression, { DataPoint } from 'regression';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery } from '@/state/api';

const Predictions = () => {
  const [isPredition, setIsPrediction] = useState(false);
  const { palette } = useTheme();

  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];

    const monthlyData = kpiData[0].monthlyData;

    const sourceData: Array<DataPoint> = monthlyData.map(
      ({ revenue }, monthNum) => {
        return [monthNum, revenue];
      }
    );

    const regressionLine = regression.linear(sourceData);

    return monthlyData.map(({ month, revenue }, monthNum) => {
      return {
        month: month.substring(0, 3),
        'Actual Revenue': revenue,
        'Regression Line': regressionLine.points[monthNum][1],
        'Predicted Revenue': regressionLine.predict(monthNum + 12)[1],
      };
    });
  }, [kpiData]);

  return (
    <DashboardBox width='100%' height='100%' padding='1rem'>
      <FlexBetween m='1rem 2.5rem' gap='1rem'>
        <Box>
          <Typography variant='h3'>Revenue and Predictions</Typography>
          <Typography variant='h6'>
            charted revenue and predicted revenue based on linear regression
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPrediction(!isPredition)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: '0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)',
          }}
        >
          Show Predicted Revenue
        </Button>
      </FlexBetween>

      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 60,
            left: 20,
            bottom: 100,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke={palette.grey[800]} />

          <XAxis dataKey='month' tickLine={false} style={{ fontSize: '10px' }}>
            <Label value='Month' position='insideBottom' offset={-20} />
          </XAxis>

          <YAxis
            domain={[12000, 26000]}
            axisLine={{ strokeWidth: '0' }}
            style={{ fontSize: '10px' }}
            tickFormatter={(v) => `$${v}`}
          >
            <Label
              value='Revenue (USD)'
              position='insideLeft'
              offset={-10}
              angle={-90}
            />
          </YAxis>

          <Line
            type='monotone'
            dataKey='Actual Revenue'
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{
              strokeWidth: 5,
            }}
          />

          <Line
            type='monotone'
            dataKey='Regression Line'
            stroke={palette.tertiary[500]}
            dot={false}
          />

          {!isPredition && (
            <Line
              type='monotone'
              dataKey='Predicted Revenue'
              stroke={palette.secondary[500]}
              strokeDasharray='5 5'
            />
          )}

          <Tooltip />
          <Legend
            verticalAlign='top'
            wrapperStyle={{ paddingBottom: '10px' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;
