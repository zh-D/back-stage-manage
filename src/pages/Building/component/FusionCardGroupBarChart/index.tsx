import React from 'react';
import { Card } from '@alifd/next';
import { Chart, Geom, Axis, Legend } from 'bizcharts';

import styles from './index.module.scss';

interface ChartItem {
  type?: string;
  value?: number;
  category?: string;
}

interface CardConfig {
  title?: string;
  chartData?: ChartItem[];
  chartHeight?: number;
}

const DEFAULT_DATA: CardConfig = {
  title: '消费数据',
  chartData: [
    { category: '已售', value: 70, type: '林科大小区' },
    // { category: '品类一', value: 231, type: '门店二' },
    // { category: '品类一', value: 321, type: '门店三' },
    { category: '出租', value: 25, type: '林科大小区' },
    // { category: '品类二', value: -342, type: '门店二' },
    // { category: '品类二', value: -432, type: '门店三' },
    // { category: '品类三', value: 322, type: '门店一' },
    // { category: '品类三', value: 211, type: '门店二' },
    { category: '未售', value: 5, type: '林科大小区' },
    // { category: '品类四', value: 435, type: '门店一' },
    // { category: '品类四', value: 543, type: '门店二' },
    // { category: '品类四', value: 333, type: '门店三' },
    // { category: '品类五', value: 111, type: '门店一' },
    // { category: '品类五', value: 452, type: '门店二' },
    // { category: '品类五', value: 234, type: '门店三' },
  ],
  chartHeight: 500,
};

export interface FusionCardGroupBarChartProps {
  cardConfig?: CardConfig;
}

const FusionCardGroupBarChart: React.FunctionComponent<FusionCardGroupBarChartProps> = (props: FusionCardGroupBarChartProps): JSX.Element => {
  const {
    cardConfig = DEFAULT_DATA,
  } = props;

  const { title, chartData, chartHeight } = cardConfig;

  return (
    <Card free className={styles.FusionCardGroupBarChart}>
      <Card.Header title={title} />
      <Card.Divider />
      <Card.Content>
        <Chart renderer="canvas" forceFit width={10} height={chartHeight} data={chartData} padding={['80', 'auto']}>
          <Axis name="category" />
          <Axis name="value" />
          <Legend
            textStyle={{
              fill: '#666',
              fontSize: 14,
            }}
          />
          <Geom
            type="interval"
            position="category*value"
            color="type"
            adjust={[
              {
                type: 'dodge',
                marginRatio: 1 / 16,
              },
            ]}
          />
        </Chart>
      </Card.Content>
    </Card>
  );
};

export default FusionCardGroupBarChart;
