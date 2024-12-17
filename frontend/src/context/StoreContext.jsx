import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = props => {
  // const URL = 'http://localhost:4000';
  const URL = 'https://task-management-backend-a35c.onrender.com';

  const [tasksData, setTasksData] = useState([]);

  async function loadData() {
    const response = await axios.get(`${URL}/api/task/list`);
    if (response.data.success) {
      setTasksData(response.data.data);
    } else {
      console.log(response.data.message);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const contextValue = {
    URL,
    tasksData,
    loadData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
