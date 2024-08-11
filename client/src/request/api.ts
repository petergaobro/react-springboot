import axios from 'axios';


/** initialize interface */
export interface Message {
  id: number;
  message: string;
  messageTimestamp: Date | string;
}


/** server URL */
axios.defaults.baseURL = 'http://localhost:8080';

export const getMessageList = async (): Promise<Message[]> => {
  /** try catch block */
  try {
    /** axios get method */
    const response = await axios.get('/api/message/getMessageList');
    return response.data;
  } catch (error) {
    /** error handling */
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const saveMessage = async (message: Message[]): Promise<void> => {
  /** try catch block */
  try {
    /** axios post method */
    const response = await axios.post('/api/message/saveMessageList', [...message]);
    return response.data;
  } catch (error) {
    console.error('Error saving message:', error);
    /** error handling */
    throw error;
  }
};

