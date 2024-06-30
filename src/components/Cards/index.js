import { Card, Row } from 'antd'
import React, { useState } from 'react'
import "./styles.css"
import Button from '../Button'

function Cards({showExpenseModal, showIncomeModal}) {
  return (
    <div>
      <Row className='my-row'>
        <Card bordered={true} className='my-card'>
          <h2>Current Balance</h2>
          <p>₹0</p>
          <Button text="Reset Balance" blue={true}/>
        </Card>

        <Card bordered={true} className='my-card'>
          <h2>Total Income</h2>
          <p>₹0</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
        </Card>

        <Card bordered={true} className='my-card'>
          <h2>Total Expenses</h2>
          <p>₹0</p>
          <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
        </Card>
       
      </Row>
    </div>
  )
}

export default Cards
