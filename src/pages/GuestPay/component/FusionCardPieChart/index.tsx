import React, { useState } from 'react';
import { Radio, Card, Box } from '@alifd/next';
import { Chart, Geom, Coord, Axis, Legend, Guide } from 'bizcharts';

import styles from './index.module.scss';

const { Html } = Guide;

interface ChartItem {
  type?: string;
  value?: number;
  title?: string;
}

interface CardConfig {
  title?: string;
  value?: number;
  chartData?: ChartItem[];
  chartHeight?: number;
}

const DEFAULT_DATA: CardConfig = {
  // title: '销售额类别占比',
  value: 183112,
  chartData: [
    {
      type: '已售楼房占比',
      value: 70,
      title: '已售楼房占比 | 70.00%',
    },
    {
      type: '出租房屋占比',
      value: 25,
      title: '出租房屋占比 | 25.00%',
    },
    {
      type: '未出售',
      value: 5,
      title: '类别一事例三 | 5.00%',
    },
    // {
    //   type: '类别一事例四',
    //   value: 13,
    //   title: '类别一事例四 | 13.11%     ¥2,341',
    // },
    // {
    //   type: '类别一事例五',
    //   value: 9,
    //   title: '类别一事例五 |  9.29%     ¥1,231',
    // },
  ],
  chartHeight: 500,
};

export interface FusionCardLineChartProps {
  cardConfig?: CardConfig;
}

const FusionCardLineChart: React.FunctionComponent<FusionCardLineChartProps> = (props: FusionCardLineChartProps): JSX.Element => {
  const {
    cardConfig = DEFAULT_DATA,
  } = props;

  const { title, value, chartData, chartHeight } = cardConfig;

  const [type, setType] = useState('one');
  const changeType = (key: string) => setType(key);


  return (
    <Card free>
      <Card.Header title={title} />
      <Card.Divider />
      <Card.Content>
        <Box align="center">
        </Box>
        <Chart width={10} height={chartHeight} forceFit data={chartData} padding={['auto', 'auto']}>
          <Coord type="theta" radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend
            position="bottom"
            layout="vertical"
            offsetY={-30}
            textStyle={{
              fill: '#666',
              fontSize: 14,
            }}
            itemMarginBottom={24}
          />
          <Guide>
            <Html
              position={['50%', '50%']}
              // eslint-disable-next-line max-len
              html={`<div style='color:#333;font-size:16px;text-align: center;width: 113px;'>销售额类别占比<br>`}
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="value"
            color="title"
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
          />
        </Chart>
      </Card.Content>
    </Card>
  );
};

export default FusionCardLineChart;
