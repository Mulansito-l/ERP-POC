import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Grid,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";

function App() {
  const [user, setUser] = useState("");
  const [logged, setLogged] = useState(false);
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [open, setOpen] = useState(false);

  const login = () => setLogged(true);

  const cargarInventario = async () => {
    let res = await fetch("/api/inventarios/inventarios");
    setProductos(await res.json());
  };

  const cargarVentas = async () => {
    let res = await fetch("/api/ventas/ventas");
    setVentas(await res.json());
  };

  const vender = async (idProd, cant) => {
    let res = await fetch(
      `/api/ventas/ventas?productoId=${idProd}&cantidad=${cant}&usuario=${user}`,
      { method: "POST" }
    );
    let texto = await res.text();
    setMensaje(texto);
    setOpen(true);
    cargarInventario();
    cargarVentas();
  };

  useEffect(() => {
    if (logged) {
      cargarInventario();
      cargarVentas();
    }
  }, [logged]);

  if (!logged) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              ERP Login
            </Typography>
            <TextField
              label="Usuario"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(e) => setUser(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={login}>
              Entrar
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido, {user}
      </Typography>

      <Grid container spacing={3}>
        {/* Inventario */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Inventario
              </Typography>
              <List>
                {productos.map((p) => {
                  let color = "success.main";
                  if (p.stock === 0) color = "error.main";
                  else if (p.stock < 5) color = "warning.main";

                  return (
                    <ListItem key={p.id} divider>
                      <Grid container alignItems="center">
                        <Grid item xs={8}>
                          <ListItemText
                            primary={p.nombre}
                            secondary={
                              <Box sx={{ color: color }}>
                                Stock: {p.stock}
                              </Box>
                            }
                          />
                        </Grid>
                        <Grid item xs={4} textAlign="right">
                          <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            onClick={() => vender(p.id, 1)}
                            disabled={p.stock === 0}
                          >
                            Vender 1
                          </Button>
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Ventas */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Ventas
              </Typography>
              <List>
                {ventas.map((v) => (
                  <ListItem key={v.id} divider>
                    <ListItemText
                      primary={`${v.usuario} vendió ${v.cantidad}`}
                      secondary={`Producto ID: ${v.idProducto}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar para mensajes */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="info">{mensaje}</Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
