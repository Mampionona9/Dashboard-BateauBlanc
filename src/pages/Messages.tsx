import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import { Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

interface Message {
  id: string;
  subject: string;
  content: string;
  is_read: boolean;
  created_at: string;
  sender?: {
    full_name: string;
    avatar_url?: string;
  };
}

export default function Messages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newMessage, setNewMessage] = useState({
    subject: '',
    content: '',
  });

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles!sender_id (full_name, avatar_url)
      `)
      .eq('recipient_id', user?.id)
      .order('created_at', { ascending: false });

    if (data) {
      setMessages(data as any);
    }
  };

  const handleSendMessage = async () => {
    const { error } = await supabase.from('messages').insert({
      sender_id: user?.id,
      recipient_id: user?.id,
      subject: newMessage.subject,
      content: newMessage.content,
    });

    if (!error) {
      setOpenDialog(false);
      setNewMessage({ subject: '', content: '' });
      fetchMessages();
    }
  };

  const markAsRead = async (messageId: string) => {
    await supabase.from('messages').update({ is_read: true }).eq('id', messageId);
    fetchMessages();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Messages
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => setOpenDialog(true)}
          sx={{
            background: 'linear-gradient(135deg, #00c853 0%, #00e676 100%)',
            textTransform: 'none',
          }}
        >
          Nouveau message
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0 }}>
          <List>
            {messages.length > 0 ? (
              messages.map((message) => (
                <Box key={message.id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setSelectedMessage(message);
                        if (!message.is_read) {
                          markAsRead(message.id);
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          variant="dot"
                          color="error"
                          invisible={message.is_read}
                          overlap="circular"
                        >
                          <Avatar sx={{ bgcolor: '#00c853' }}>
                            {message.sender?.full_name?.charAt(0) || 'U'}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography fontWeight={message.is_read ? 'normal' : 'bold'}>
                            {message.subject}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {message.sender?.full_name || 'Unknown'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {format(new Date(message.created_at), 'dd/MM/yyyy HH:mm')}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </Box>
              ))
            ) : (
              <ListItem>
                <ListItemText
                  primary={
                    <Typography align="center" color="text.secondary">
                      Aucun message
                    </Typography>
                  }
                />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Nouveau message</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Sujet"
            value={newMessage.subject}
            onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            value={newMessage.content}
            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button
            onClick={handleSendMessage}
            variant="contained"
            sx={{ background: 'linear-gradient(135deg, #00c853 0%, #00e676 100%)' }}
          >
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={selectedMessage !== null}
        onClose={() => setSelectedMessage(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedMessage && (
          <>
            <DialogTitle>{selectedMessage.subject}</DialogTitle>
            <DialogContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                De: {selectedMessage.sender?.full_name || 'Unknown'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {format(new Date(selectedMessage.created_at), 'dd/MM/yyyy HH:mm')}
              </Typography>
              <Typography>{selectedMessage.content}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedMessage(null)}>Fermer</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
