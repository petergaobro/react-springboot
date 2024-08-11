import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItemAvatar, Avatar, ListItemText, Box, Paper, Typography, IconButton, FormHelperText, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { getMessageList, saveMessage, Message } from '../request/api';
import { useNavigate } from "react-router-dom";
import { pink } from '@mui/material/colors';
import { InfoOutlined } from '@mui/icons-material';

const MessageBoard: React.FC = () => {
    /** initialize empty array */
    const [messages, setMessages] = useState<Message[]>([]);
    /** new empty state string */
    const [input, setInput] = useState('');
    /** boolean state */
    const [inputError, setInputError] = useState(false);
    /** assign var for navigate */
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMessages = async () => {
            /** call function to fetch messages from the API */
            try {
                const data = await getMessageList();
                /** if fetch successfully, update message */
                setMessages(data);
            } catch (error) {
                /** error handling */
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, []);

    const handleAddMessage = async () => {
        /** check input (whitespace or not)*/
        if (input.trim()) {
            /** create new message */
            const newMessage: Message = { id: Date.now(), message: input, messageTimestamp: new Date() };
            /** update message to the list */
            const updatedMessages: Message[] = [...messages, newMessage];
            /** save message to list on success */
            saveMessage(updatedMessages)
                .then(() => {
                    setMessages([...messages, newMessage]);
                    setInput('');
                    setInputError(false);
                })
                /** error log */
                .catch(error => console.error('Error saving message:', error));
        } else {
            /** set to error state */
            setInputError(true);
        }
    };

    const handleDeleteMessage = (id: number) => {
        /** filtering message and update state */
        setMessages(messages.filter(message => message.id !== id));
        /** create message array that was updated or deleted */
        const updatedMessages: Message[] = messages.filter(message => message.id !== id);
        /** save messages array after deletion */
        saveMessage(updatedMessages)
            .then(() => {
                setInput('');
            })
            .catch(error => console.error('Error saving message:', error));
    };

    const handleViewMessage = (message: Message) => {
        sessionStorage.setItem('message', JSON.stringify(message));
        navigate(`/message/${message.id}`);
    }



    return (
        <div data-testid="msgBoard">
            <Container>
                <Typography variant="h6" > Edalex challenge</Typography>
                <Box component={Paper} p={5} mt={2}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Message Board
                    </Typography>
                    <List>
                        {messages.length === 0 ?
                            // if message is existed, display loading
                            <>
                                Loading ...
                            </>
                            :
                            // if message(s) is/are existed, display then
                            <>
                                {/* list all messages */}
                                <Table size="medium">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Message content</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {messages.map((msg) => (
                                            <TableRow key={msg.id}>
                                                <TableCell>
                                                    <ListItemAvatar>
                                                        <Avatar>{msg.message.charAt(0)}</Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={msg.message}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(msg.messageTimestamp).toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    {/* buttons */}
                                                    <IconButton edge="end" aria-label="radio" onClick={() => handleViewMessage(msg)}>
                                                        <RadioButtonCheckedIcon color="success" />
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMessage(msg.id)}>
                                                        <DeleteIcon sx={{ color: pink[700] }} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </>
                        }
                    </List>
                    {/* text field */}
                    <Box mt={2} mb={2} display="flex">
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Please enter your message ..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            error={inputError}
                            helperText={
                                inputError
                                    ?
                                    <FormHelperText>
                                        <Box display="flex">
                                            <InfoOutlined fontSize="small" />
                                            <span>Opps! Message cannot be empty.</span>
                                        </Box>
                                    </FormHelperText>
                                    :
                                    null
                            }
                        />
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleAddMessage}> Send </Button>
                </Box>
            </Container>
        </div>

    );
};

export default MessageBoard;
