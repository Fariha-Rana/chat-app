"use client";
import { FormControl, Input, Button, Box, Flex, Text, Center, Container } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import chatService from "@/appwrite/chatService";
import userAuth from "@/appwrite/authentication";
import { appwrite } from "@/appwrite/config";

export default function ChatComponent() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const _user = await userAuth.getCurrentUser();
      setUser(_user);
      await chatService.loadMessages();
      const messages = await chatService.getMessages();
      setMessages(messages);
    })();
  }, []);


  useEffect(() => {
    const _loadMessages = async () => {
      await chatService.loadMessages();
      const initialMessages = await chatService.getMessages();
      setMessages(initialMessages);
  
      const chatSubscription = appwrite.subscribe(
        `databases.[${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}].collections.[${process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID}].documents`,
        (documents) => {
          const newMessages = documents.filter(
            (doc) => !messages.some((message) => message.$id === doc.$id)
          );
          if (newMessages.length > 0) {
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
          }
        }
      );
  
      return () => {
        chatSubscription.unsubscribe();
      };
    };
  
    _loadMessages();
  }, [message, messages]);

  

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message) {
      await chatService.sendMessage(message);
      setMessage("");
    }
  };
  return (
    <Box
      p={4}
      position="relative"
      height="78vh"
      overflowY="auto"
      boxSizing="border-box"
    >
    {user && (
  <Flex direction="column"  overflowY="auto"  margin={{ base: "10px", md: "0" }}>
    {messages.map((message) => (
      <Box key={message.$id} p={2}  alignSelf={message.user === user?.name ? 'flex-end' : 'flex-start'}>
        <Flex> 
          <Text textAlign={message.user === user?.name ? 'right' : 'left'}  marginRight={"8px"} fontSize={"xs"}>{message.user === user?.name ? 'You' : message.user} { "  "}</Text>
         <Text textAlign={message.user === user?.name ? 'right' : 'left'} fontWeight={"bolder"} marginTop={"3px"}  fontSize={"xx-small"}> {message.date}</Text>
        </Flex>
        <Text textAlign={message.user === user?.name ? 'right' : 'left'}>{message.message}</Text>
      </Box>
    ))}
  </Flex>
)}
      {user && (
        <Box
          position="fixed"
          bottom="0"
          left="0"
          width="100%"
          p={4}
          borderTop="1px solid #ddd"
        >
          <form onSubmit={sendMessage}>
            <FormControl display="flex">
              <Input
                flex="1"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                rounded="full"
                mr={2}
                border="3px solid #ddd"
                _focus={{ outline: 'none', border: '1px solid #4CAF50' }}
              />
              <Button
                type="submit"
                rounded="full"
                border="3px solid #ddd"
                _focus={{ outline: 'none', border: '1px solid #4CAF50' }}
                _hover={{ bg: '#128C7E' }}
              >
                Send
              </Button>
            </FormControl>
          </form>
        </Box>
      )}
    </Box>
  );
};
