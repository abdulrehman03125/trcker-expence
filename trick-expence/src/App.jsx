import { useEffect, useState } from "react";
import "./App.css";
import IncomeModal from "./components/IncomeModal";
import ExpenseModal from "./components/ExpenseModal";
import { ToastContainer, toast, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {



  const addincome  = () => toast.success('🦄 Wow so easy!', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light"
    });
  const deleteexpence = () => toast("sucessfully deleted so easy expence!",{
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: "Slide",
    });

  const [income, setIncome] = useState(() => {
    const income = localStorage.getItem("income");
    return income ? JSON.parse(income) : 0;
  });
  const [expenses, setExpenses] = useState(() => {
    const expenses = localStorage.getItem("expenses");
    return expenses ? JSON.parse(expenses) : [];
  });

  const [balance, setBalance] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isIncomModalOpen, setIsIncomModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [Edit, setEdit] = useState(false);

  const myopenIncomModel = () => {
    setIsIncomModalOpen(true);
  };

  const handleIncomModalClose = () => {
    setIsIncomModalOpen(false);
  };

  const handleIncome = (amount) => {
    setIncome(income + +amount);
    handleIncomModalClose();
    addincome();
  };

  const openExpenseModal = () => {
    setIsExpenseModalOpen(true);
  };

  const closeExpenseModal = () => {
    setIsExpenseModalOpen(false);
  };
  const addExpense = (expense) => {
    const newExpAr = [...expenses, expense];
    setExpenses(newExpAr);
    closeExpenseModal();
  };
  const handleexpense = (amount, description, category) => {
    setBalance(balance - amount);
    setExpenses([...expenses, { amount, description, category }]);
  };
  const handleDelete = (index) => {
    const newItems = expenses.filter((el, i) => i != index);
    setExpenses(newItems);
    deleteexpence();
    
  };

  const handleEdit = (index) => {
    setEdit(index);
    setIsExpenseModalOpen(true);

    console.log('handleEdit', index);
  };
  const handleUpdate = (amount, description, category, index) => {
    const updatedExpenses = expenses.map((expense, i) =>
      i === index ? { amount, description, category } : expense
    );
    setExpenses(updatedExpenses);
    setIsExpenseModalOpen(false);
    setEdit(false);
  };

  useEffect(() => {
    let totalExpense = 0;
    expenses.forEach((exp) => {
      totalExpense += +exp.expense;
    });

    // console.log(totalExpense);

    setBalance(income - totalExpense);
    setTotalExpense(totalExpense);
    // console.log(totalExpense);

    // const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    // setTotalExpense(totalExpenses);
    // setBalance(income - totalExpenses);

    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("income", JSON.stringify(income));
  }, [income, expenses]);

  
  return (
    <>
      <div className="container">
      {/* <button onClick={notify}>Notify!</button> */}
        <div className="bg-dark text-white p-3">
          <h1 className="text-center mb-5">Expense Tracker</h1>
          <div className="row">
            <div className="col-md-4 text-center">
              <h3>Amount In</h3>
              <h5 className="text-success">${income}</h5>
              <button className="btn btn-success" onClick={myopenIncomModel}>
                Add Income
              </button>

              <IncomeModal
                handleIncome={handleIncome}
                handleexpense={handleexpense}
                isIncomModalOpen={isIncomModalOpen}
                handleIncomModalClose={handleIncomModalClose}
              />
            </div>

            <div className="col-md-4 text-center">
              <h3>Expenses</h3>
              <h5 className="text-warning">${totalExpense}</h5>
            </div>

            <div className="col-md-4 text-center">
              <h3>Balance</h3>
              <h5 className="text-danger">${balance}</h5>
              <button className="btn btn-danger" onClick={openExpenseModal}>
                Add Expense
              </button>
              <ExpenseModal
                addExpense={addExpense}
                isExpenseModalOpen={isExpenseModalOpen}
                closeExpenseModal={closeExpenseModal}
                handleDelete={handleDelete}
                handleexpense={handleexpense}
                handleUpdate={handleUpdate}
                handleEdit={handleEdit}
                editIndex={Edit}
                expenseToEdit={Edit !== false ? expenses[Edit] : null}
              />
            </div>
          </div>
        </div>
        <div className="p-3 bg-white">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp, i) => {
                return (
                  <tr key={i}>
                    <td>{exp.date}</td>
                    <td>{exp.detail}</td>
                    <td>{exp.category}</td>
                    <td>${exp.expense}</td>
                    <td>
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => handleDelete(i)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(i)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
