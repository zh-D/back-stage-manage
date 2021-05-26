import React, { useState, useEffect } from 'react';
import { Box, Search, Card, Tag, Divider, Typography, Icon, Loading, Button, Pagination } from '@alifd/next';

import styles from './index.module.scss';

import RemindService from '../../../services/remind';
import { useRequest } from 'ice';


export interface ICardItem {
  title?: string;
  content?: string;
  subContent?: string;
}

export interface DataSource {
  cards: ICardItem[];
}

const DEFAULT_DATA: DataSource = {
  // cards: new Array(4).fill({
  //   title: '构建一套产品化设计系统',
  //   content: '随着互联网行业的聚变式发展，在电商业务从“信息透出” 到 “在线交易” 的过程中，网站 UI 构建也经历了“体验一致性”、“设计效率”、“UI系统构建/应用效率”、“多端适配” …',
  //   subContent: '谢瑶 3 小时前更新',
  // }),
  cards: [
    {title: 'A户型', content: '四房两厅,210平方米', subContent: '售房价格：2.5万/平方米' },
    {title: 'B户型', content: '三房两厅,170平方米', subContent: '售房价格：1.5万/平方米' },
    {title: 'C户型', content: '两房一厅,120平方米', subContent: '售房价格：1.2万/平方米，出租价格：5千/月' },
    {title: 'D户型', content: '两房一厅,110平方米', subContent: '售房价格：1万/平方米，出租价格：4千/月' },
  ]
};

const BasicList: React.FunctionComponent = (props): JSX.Element => {

  const { request: remindService } = useRequest(RemindService.getComplain());
  
  const {
    dataSource = DEFAULT_DATA,
    onSearch = (): void => { },
  } = props;

  const [loading, setLoading] = useState(true);
  const [] = useState();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  const onSearchClick = () => {
    setLoading(true);
    onSearch();
  };

  const renderCards = () => {
    return dataSource.cards.map((c: ICardItem, i: number) => (
      <div className={styles.ListItem} key={i}>
        <div className={styles.main}>
          <div className={styles.left}>
            {/* <img src={`../../../../public/img/${i+1}.jpg`} alt="img" /> */}
            <div>
              {/* <div className={styles.title}>
                {c.title}
              </div>
              <div className={styles.content}>
                {c.content}
              </div>
              <div className={styles.subContent}>
                {c.subContent}
              </div> */}
              123333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Card free className={styles.BasicList}>
        <Box align="center">
          <Search type="primary" hasIcon={false} searchText="搜索" onSearch={() => onSearchClick()} />
        </Box>
        <Divider dashed style={{ margin: '24px 0' }} />
          <Box className={styles.MainContent} spacing={10}>
            {renderCards()}
          </Box>
      </Card>
    </>
  );
};

export default BasicList;
