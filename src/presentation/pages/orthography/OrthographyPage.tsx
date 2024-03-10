import { useState } from "react"
import { GptMessage, GptOrthographyMessage, MyMessage,TextMessageBox, TypingLoader } from "../../components"
import { orthographyUseCase } from "../../../core/use-cases";
// import { bannerComponent } from '../../components/tailwind-ui/banner'; // Importa el componente bannerComponent aquí

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  }
}
export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])
  const handlePost = async(text: string) => {
    setIsLoading(true);
    setMessages( (prev) => [...prev, {text: text, isGpt: false}]);
    const {ok,errors,message,userScore} = await orthographyUseCase(text);
    if (!ok) {
      setMessages((prev) => [...prev,{text: 'No se pudo realizar la correcion', isGpt: true}]);
    }else {
      setMessages((prev) => [...prev,{
        text: message, isGpt: true,
        info: {errors,message,userScore}
      }]);
    }
    //Todo: Añadir el mensaje de isGPT en true
    setIsLoading(false);
  }
  return (
    <>
    {/* {bannerComponent()}  */}
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-1">
          {/* Bienvenida */}
          <GptMessage text="Hola, soy el bot de Javascript" />

          {
            messages.map( (message, index) => (
              message.isGpt
                ? (
                  <GptOrthographyMessage 
                    key={ index }  
                    { ...message.info! }
                  />
                )
                : (
                  <MyMessage key={ index } text={ message.text } />
                )
                
            ))
          }

          
          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }
          

        </div>
      </div>


      <TextMessageBox 
        onSendMessage={ handlePost }
        placeholder='Introduce una petición aqui'
        disableCorrections
      />

    </div>
    </>
  );
};