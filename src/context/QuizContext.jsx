import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {

    async function findQuizById(QuizId){
        try {
            const res = await axios.get(`http://localhost:4000/quiz/${QuizId}`)
            return res;
        } catch(err) {console.log(err)}
    }

     return (
        <QuizContext.Provider value={{findQuizById}}>
          {children}
        </QuizContext.Provider>
      );

}
