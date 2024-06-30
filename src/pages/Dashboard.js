import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
import AddExpense from '../components/Modals/addExpense';
import AddIncome from '../components/Modals/addIncome';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { addDoc, collection, getDoc, getDocs, query } from 'firebase/firestore';
import moment from "moment";

const Dashboard = () => {

  const [transaction, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const[user] = useAuthState(auth); 
  const[isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const[isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  }

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  }

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  }

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  }

  const onFinish = (values, type) =>{
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    // setTransactions([...transactions, newTransaction]);
    // setIsExpenseModalVisible(false);
    // setIsIncomeModalVisible(false);
    addTransaction(newTransaction);;
    // calculateBalance();
  };


  async function addTransaction(transaction){
      try{
        const docRef = await addDoc (
          collection(db, `users/${user.uid}/transactions`),
          transaction
        );
        console.log("Document written with ID: ", docRef.id); 
          toast.success("Transaction Added");        
      }catch(e){
        console.error("Error adding document: ", e);
          toast.error("Couldn't add transaction"); 
      }
  }

  useEffect(() => {
    // Get all the docs from a collection
    fetchTransactions()
  }, [])

  async function fetchTransactions(){
    setLoading(true);
    if(user){
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log("Transactions Array", transactionsArray);
      toast.success("Transaction Fetched!");
    }
    setLoading(false);
  }
  

  return (
    <div>
        <Header/>
        {loading ? <p>Loading....</p> : <><Cards showExpenseModal = {showExpenseModal} showIncomeModal = {showIncomeModal}/>
        <AddExpense isExpenseModalVisible={isExpenseModalVisible} handleExpenseCancel={handleExpenseCancel} onFinish={onFinish}/>
        <AddIncome isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish}/></>}
    </div>
  )
}

export default Dashboard
