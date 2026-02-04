import { Box, Card, CardContent, Typography } from '@mui/material';

interface GenericPageProps {
  title: string;
  description?: string;
}

export default function GenericPage({ title, description }: GenericPageProps) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        {title}
      </Typography>

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            {description || `Cette page ${title} sera bientôt disponible`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Les fonctionnalités de cette section sont en cours de développement
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
