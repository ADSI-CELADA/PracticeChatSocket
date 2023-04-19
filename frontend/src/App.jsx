import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000")

function App() {

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([{
    body : "messge test",
    from : "user 1"
  }])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    socket.emit('message', message);
    const newMessage = {
      body : message,
      from : "Me"
    }
    setMessages([...messages, newMessage])
    setMessage("");
  };

  useEffect(() => {
    const reciveMessage = message =>  {
      setMessages([...messages, message], {
        body : message.body,
        from : message.from
      })
    }
    socket.on('message', reciveMessage)

    return () => {
      socket.off('message', reciveMessage)
    }
  })

  return (
    <>console.log(message);
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={e => setMessage(e.target.value)}
          value={message
          } />
        <button>
          Send
        </button>
      </form>

          {
            messages.map((message, index) => (
              <div key={index}>
                <p> {message.from}:{message.body} </p>
              </div>
            ))
          }

    </>
  )
}

export default App
