import { useEffect, useState } from "react";
import { Container, Grid, Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Navigation from "../src/components/navigation";
import PokeDialog from "../src/components/dialogs/PokeDialog";

const Tumbo = ({ pokemons }) => {
  const [localPokemons, setlocalPokemons] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleSave = () => {
    setlocalPokemons(pokemons);
    localStorage.setItem("pokemons", JSON.stringify(pokemons));
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setlocalPokemons(JSON.parse(localStorage.getItem("pokemons")) || []);
  }, []);

  let toRender = <Typography>Aún no hay Pokemons aqui</Typography>;

  if (localPokemons.length > 0) {
    toRender = localPokemons.map((pokemon, index) => {
      return (
        <Grid key={index} item xs={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                src={pokemon.picture}
                alt={pokemon.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {pokemon.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pokemon.order}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    });
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "2em" }}>
        <Navigation />
        <Button variant="contained" type="button" onClick={handleOpen}>
          Nuevo Pokemon
        </Button>
        <Grid container spacing={2}>
          {toRender}
        </Grid>
      </Container>
      {openModal === true && (
        <PokeDialog handleClose={handleClose} open={openModal} />
      )}
    </>
  );
};

export default Tumbo;
