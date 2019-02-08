import React from 'react'
import { Table } from 'reactstrap'

const RatingTable = props => {
    const { data, currentUser } = props
    return <Table responsive borderless>
        <thead>
            <tr>
                <th>Name</th>
                <th className="text-center">Score</th>
            </tr>
        </thead>
        <tbody>
            {data.map(user => {
                const current = user.id === currentUser.id
                return <tr key={user.id} className={current ? 'user-table-record' : ''}>
                    <td>{current ? user.name + ' (you)' : user.name}</td>
                    <td className="text-center">{user.score}</td>
                </tr>
            })}
        </tbody>
    </Table>
}

export default RatingTable
