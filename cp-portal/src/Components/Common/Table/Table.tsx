import React, { useEffect, useState } from 'react';
import { Table, Col, Row, Space, Card, Button } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate  } from "react-router-dom";
import qs from 'qs';
import Header from '../Header/Header';

interface DataType {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  email: string;
  login: {
    uuid: string;
  };
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>,
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const [size, setSize] = useState(60);

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/login`; 
    navigate(path);
  }

  return (
    <>
    <Space direction="vertical" size={size} style={{ display: 'flex' }}>
        <Header />
        <Row justify={"end"} align={"middle"} className="h-100">
            <Col span={18} md={{span: 18}} xl={{span: 18}} xs= {{span: 20}} lg={{span: 18}} style={{display:"flex",justifyContent:"end", paddingRight:"15px"}}>
                <Button type="primary" icon={<ArrowLeftOutlined />} onClick={routeChange}>
                  Back
                </Button>
            </Col>
        </Row>
        <Row justify={"center"} align={"middle"} className="h-100">
            <Col span={22} md={{span: 22}} xl={{span: 22}} xs= {{span: 22}} lg={{span: 22}}>
                <Card bordered={true}>
                    <Table
                      columns={columns}
                      rowKey={(record) => record.login.uuid}
                      dataSource={data}
                      pagination={tableParams.pagination}
                      loading={loading}
                      //onChange={handleTableChange}
                    />
                </Card>
            </Col>
        </Row>
    </Space>
    </>
  );
};

export default App;