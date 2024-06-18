import { useState } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tab";
import TabPanel from "../src/components/TabPanel";
import Navigation from "../src/components/navigation";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home = ({ pokemons }) => {
  // const [pokemonsList, setPokemonsList] = useState(pokemons);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // // useEffect(() => {
  // //   first;

  // // }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: "2em" }}>
      {/* <Box>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box> */}

      <Navigation />

      <Grid container spacing={2}>
        {pokemons.map((pokemon, index) => {
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
        })}
      </Grid>
    </Container>
  );
};

Home.getInitialProps = async (ctx) => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=16");
  const json = await res.json();

  const detailList = await Promise.all(
    json.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const json = await res.json();
      console.log("detail", json);
      const {
        name,
        order,
        sprites: { front_default },
      } = json;
      return { name, order, picture: front_default };
    })
  );

  return { pokemons: detailList };
};

export default Home;
