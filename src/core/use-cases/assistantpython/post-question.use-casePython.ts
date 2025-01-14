import { QuestionResponse } from "../../interfaces/assistant.response";


export const postQuestionUseCasePython = async ( threadId: string, question: string ) => {


  try {

    const resp = await fetch(`${ import.meta.env.VITE_ASSISTANT_API_PYTHON}/user-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ threadId, question })
    });


    const replies = await resp.json() as QuestionResponse[];
  
    return replies;


  } catch (error) {
    console.log(error);
    throw new Error('Error posting question')
  }


};