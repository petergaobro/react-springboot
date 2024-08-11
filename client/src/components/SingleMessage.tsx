import { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardActions, CardContent } from '@mui/material';
import { Message, getMessageList } from '../request/api';
import { useParams, useNavigate } from 'react-router-dom';

const SingleMessage = () => {

    const [message, setMessage] = useState<Message>({ id: 0, message: '', messageTimestamp: '' });
    /** prepare return objects of key-value */
    const { id } = useParams()
    const navigate = useNavigate();
    /** navigate to home */
    const handleGoHome = () => {
        navigate(`/`);
    }
    useEffect(() => {
        /** retrieve list of messages by calling function - getMessageList */
        const fetchMessage = async () => {
            try {
                const data = await getMessageList();
                /** find specfic message by id */
                const result = data.find(item => item.id === Number(id))
                if (result) {
                    setMessage(result);
                }
                /** error handling */
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessage();
    }, [id]);

    if (!message) return <div>Loading...</div>;

    return (
        <>
            {/* MUI card */}
            <Card sx={{ maxWidth: 500 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Details
                    </Typography>
                    {/* pass all data */}
                    <Box
                        sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
                    >
                        Message:&nbsp;{message.message} <br />
                        TimeSramp:&nbsp;{new Date(message.messageTimestamp).toLocaleString()}
                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleGoHome}>
                        Back
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

export default SingleMessage;
