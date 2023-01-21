// A mock function to mimic making an async request for data
import axios from "axios"

export const emailService = {
  fetchEmails: async (pgNumber: number) => {
    try {
      const res = await axios.get(`https://flipkart-email-mock.vercel.app/?page=${pgNumber}`)
      return res.data
    } catch (error) {
      throw error
    }
  }, 
  fetchEmailBody: async (id: string) => {
    try {
      const res = await axios.get(`https://flipkart-email-mock.vercel.app/?id=${id}`) 
      return res.data
    } catch (error) {
      throw error
    }
  }
}


