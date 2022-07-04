import React from "react";
import Pokemon from "../pokemon.type";
import Card from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {
  CardActionArea,
  CardActions,
  Collapse,
  Grid,
  IconButton,
  IconButtonProps,
  styled
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface typeType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

const PokeCard = ({ name, url, id }: Pokemon) => {
  const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const [expanded, setExpanded] = React.useState(false);
  const [types, setTypes] = React.useState<string[]>([]);
  const handleExpandClick = () => {
    if (!expanded) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((result) => {
          setTypes(
            result.types.map((typeObject: typeType) => typeObject.type.name)
          );
        });
    }
    setExpanded(!expanded);
  };
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ width: 245 }} component="image" variant="outlined">
        <CardActionArea>
          <CardMedia
            component="img"
            height="160"
            image={imageURL}
            alt="green iguana"
          />
          <div></div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="p">
              #{id}
            </Typography>
            <Typography gutterBottom variant="h5" component="p">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
          </CardContent>
          <CardActions>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6">Type: </Typography>
              {types.map((type, index) => (
                <Typography key={index}>{type}</Typography>
              ))}
            </CardContent>
          </Collapse>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PokeCard;
