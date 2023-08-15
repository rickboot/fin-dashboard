import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';

const Row1 = () => {
  const { palette } = useTheme();

  const { data: kpiData } = useGetKpisQuery();

  const monthlyData = useMemo(() => {
    return (
      kpiData &&
      kpiData[0].monthlyData.map(
        ({
          month,
          revenue,
          expenses,
          operationalExpenses,
          nonOperationalExpenses,
        }) => {
          return {
            name: month.substring(0, 3),
            revenue,
            expenses,
            'Operational Expenses': operationalExpenses,
            'Non-Operational Expenses': nonOperationalExpenses,
            profit: (revenue - expenses).toFixed(2),
          };
        }
      )
    );
  }, [kpiData]);

  return (
    <>
      <DashboardBox gridArea='a'>
        <BoxHeader
          title='Revenue and Expenses'
          subtitle='Top line: Revenue, Bottom line: Expenses'
          sideText='+4%'
        />
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            width={500}
            height={400}
            data={monthlyData}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id='colorRevenue' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset='95%'
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id='colorExpenses' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset='95%'
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey='name'
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              axisLine={{ strokeWidth: '0' }}
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='revenue'
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill='url(#colorRevenue)'
            />
            <Area
              type='monotone'
              dataKey='expenses'
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill='url(#colorExpenses)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea='b'>
        <BoxHeader
          title='Profit and Expenses'
          subtitle='Top line: Profit, Bottom line: Expenses'
          sideText='+4%'
        />
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 25,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey='name'
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
            />

            <Tooltip />

            <Legend
              height={30}
              wrapperStyle={{ fontSize: '10px', margin: '0 10px 0 0' }}
            />

            <Line
              type='monotone'
              dataKey='expenses'
              stroke={palette.tertiary[500]}
              dot={{
                strokeWidth: 1,
                r: 2,
                fill: palette.tertiary[500],
              }}
            />
            <Line
              type='monotone'
              dataKey='profit'
              stroke={palette.primary.main}
              dot={{
                strokeWidth: 1,
                r: 2,
                fill: palette.primary.main,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea='c'>
        <BoxHeader title='Monthly Revenue' sideText='4%' />
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={monthlyData}
            margin={{
              top: 24,
              right: 20,
              left: -5,
              bottom: 50,
            }}
          >
            <defs>
              <linearGradient
                id='colorMonthlyRevenue'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop
                  offset='5%'
                  stopColor={palette.primary.main}
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor={palette.primary.main}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke={palette.grey[800]} />

            <XAxis
              dataKey='name'
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
            />

            <Tooltip />

            <Bar dataKey='revenue' fill='url(#colorMonthlyRevenue)' />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea='d'>
        <BoxHeader
          title='Expenses'
          subtitle='Operational and Non-Operational Expenses'
          sideText='+4%'
        />
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 25,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey='name'
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
            />

            <Tooltip />

            <Legend
              height={30}
              wrapperStyle={{
                margin: '0 10px 0 0',
                fontSize: '10px',
              }}
            />

            <Line
              type='monotone'
              dataKey='Operational Expenses'
              stroke={palette.tertiary[500]}
              dot={{
                strokeWidth: 1,
                r: 2,
                fill: palette.tertiary[500],
              }}
            />
            <Line
              type='monotone'
              dataKey='Non-Operational Expenses'
              stroke={palette.primary.main}
              dot={{
                strokeWidth: 1,
                r: 2,
                fill: palette.primary.main,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};
export default Row1;
