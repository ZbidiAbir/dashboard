import { CreateButton, DeleteButton, EditButton, FilterDropdown, List, useTable } from '@refinedev/antd'

import { useGo, getDefaultFilter } from '@refinedev/core'
import { Input, Space, Table } from 'antd';
import React from 'react'
import { COMPANIES_LIST_QUERY } from '/graphql/queries';
import { SearchOutlined } from '@ant-design/icons';
import CustomAvatar from '/components/custom-avatar';
import { Text } from '/components/text';
import { Company } from '/graphql/schema.types';
import { currencyNumber } from '/utilities';

export const CompanyList = ({ children }: React.PropsWithChildren) => {
    const { tableProps, filters } = useTable({
        resource: 'companies',
        onSearch: (values: any) => {
            return [
                {
                    field: "name",
                    operator: "contains",
                    value: values.name,
                },
            ];
        },
        pagination: {
            pageSize: 12,
        },
        sorters: {
            initial: [
                {
                    field: "createdAt",
                    order: "desc",
                },
            ],
        },
        filters: {
            initial: [
                {
                    field: 'name',
                    operator: 'contains',
                    value: undefined
                }]
        },
        meta: {
            gqlQuery: COMPANIES_LIST_QUERY
        }
    })
    const go = useGo();
    return (
        <div>
            <List breadcrumb={false} headerButtons={() => (
                <CreateButton onClick={() => {
                    go({
                        to: {
                            resource: 'companies',
                            action: 'create'
                        },
                        options: {
                            keepQuery: true

                        },
                        type: 'replace'
                    })
                }} />
            )}>
                <Table {...tableProps} pagination={{ ...tableProps.pagination, }}>
                    <Table.Column<Company> dataIndex="name" title="Company Title" defaultFilteredValue={getDefaultFilter('id', filters)} filterIcon={<SearchOutlined />} filterDropdown={(props) => (
                        <FilterDropdown {...props} >
                            <Input placeholder='Search Company' />
                        </FilterDropdown>
                    )}
                        render={(value, record) => {
                            return <Space>
                                <CustomAvatar shape='square' name={record.name} src={record.avatarUrl} />

                                <Text style={{ whiteSpace: 'nowrap' }}>{record.name}</Text>
                            </Space>;
                        }}
                    />
                    <Table.Column<Company>
                        dataIndex='totalRevenue'
                        title="Open deals amount"
                        render={(value, company) => {
                            return (
                                <Text>
                                    {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
                                </Text>
                            )
                        }}

                    />
                    <Table.Column<Company>
                        fixed="right"
                        dataIndex="id"
                        title="Actions"
                        render={(value) => (
                            <Space>
                                <EditButton hideText size="small" recordItemId={value} />

                                <DeleteButton hideText size="small" recordItemId={value} />
                            </Space>
                        )}
                    />


                </Table>
            </List>
            {children}
        </div>
    )
}

