import React, { useState, useEffect } from 'react';
import { Box, Search, Card, Tag, ResponsiveGrid, Divider, Typography, Icon, Loading } from '@alifd/next';

import styles from './index.module.scss';

const { Group: TagGroup, Selectable: SelectableTag } = Tag;
const { Cell } = ResponsiveGrid;
export interface ICardItem {
  title?: string;
  content?: string;
  link?: string[];
}

export interface DataSource {
  cards: ICardItem[];
}

const DEFAULT_DATA: DataSource = {
  cards: [
    {
      content: '会长',
      title: '27栋439黄总',
      link: ['助人为乐','德性兼备'],
    },
    {
      content: '副会长',
      title: '27栋440丁阳',
      link: ['才高八斗', '积极向上'],
    },
    {
      content: '成员',
      title: '27栋430郑告',
      link: ['出类拔萃', '独当一面'],
    },
    {
      content: '成员',
      title: '26栋602胡小志',
      link: ['运筹帷幄', '厚德载物'],
    },
    {
      content: '成员',
      title: '3栋贞漂亮',
      link: ['倾国倾城', '平易近人'],
    }
  ]
};

const CardList: React.FunctionComponent<CardListProps> = (props: CardListProps): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
    onSearch = (): void => { },
  } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const onSearchClick = () => {
    setLoading(true);
    onSearch();
  };

  const renderCards = () => {
    const road = ['https://img-blog.csdnimg.cn/20210526012104397.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poZWhvb24xMjM=,size_16,color_FFFFFF,t_70#pic_center','https://img-blog.csdnimg.cn/20210526012117674.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poZWhvb24xMjM=,size_16,color_FFFFFF,t_70#pic_center','https://img-blog.csdnimg.cn/20210526012131702.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poZWhvb24xMjM=,size_16,color_FFFFFF,t_70#pic_center','https://img-blog.csdnimg.cn/20210526012141182.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poZWhvb24xMjM=,size_16,color_FFFFFF,t_70#pic_center','https://img-blog.csdnimg.cn/2021052601214784.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poZWhvb24xMjM=,size_16,color_FFFFFF,t_70#pic_center','https://img-blog.csdnimg.cn/20210526012154819.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poZWhvb24xMjM=,size_16,color_FFFFFF,t_70#pic_center','https://img-blog.csdnimg.cn/20210526012202109.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poZWhvb24xMjM=,size_16,color_FFFFFF,t_70#pic_center','https://img-blog.csdnimg.cn/2021052601221084.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poZWhvb24xMjM=,size_16,color_FFFFFF,t_70#pic_center','https://img-blog.csdnimg.cn/20210526012218894.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poZWhvb24xMjM=,size_16,color_FFFFFF,t_70#pic_center']
    return dataSource.cards.map((c: ICardItem, i: number) => (
      <Cell colSpan={3} className={styles.ListItem} key={i}>
        <div className={styles.main}>
          <img src={road[i+4]} alt="img" />
          <div className={styles.content}>
            <div className={styles.title}>
              {c.title}
            </div>
            <div className={styles.info}>
              {c.content}
            </div>
            <div className={styles.link}>
              <a href="#">{c.link[0]}</a>
              <a href="#">{c.link[1]}</a>
            </div>
          </div>
        </div>
      </Cell>
    ));
  };

  return (
    <>
      <Card free className={styles.CardList}>
        <Box align="center">
          <Search type="primary" hasIcon={false} searchText="搜索" onSearch={onSearchClick} />
        </Box>
        <Divider dashed style={{ margin: '24px 0' }} />
      </Card>
      <Loading visible={loading} style={{ display: 'block' }}>
        <ResponsiveGrid gap={20}>
          {renderCards()}
        </ResponsiveGrid>
      </Loading>
    </>
  );
};

export default CardList;
