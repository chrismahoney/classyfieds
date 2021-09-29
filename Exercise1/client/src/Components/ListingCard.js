import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import {
  Link
} from 'react-router-dom';

export default function ListingCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://via.placeholder.com/345x140.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.listing.title} (${props.listing.price})
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.listing.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/listing/${props.listing._id}`}>View</Link>
      </CardActions>
    </Card>
  );
}