package com.erp.ventas.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDateTime;
import java.util.*;
import com.erp.ventas.repo.VentaRepo;
import com.erp.ventas.model.Venta;

@RestController
@RequestMapping("/ventas")
public class VentasController {
    private final VentaRepo repo;
    private final RestTemplate restTemplate = new RestTemplate();

    public VentasController(VentaRepo repo){this.repo=repo;}

    @PostMapping
    public String registrar(
            @RequestParam("productoId") Long productoId,
            @RequestParam("cantidad") int cantidad,
            @RequestParam("usuario") String usuario) {

        // Llamada al InventariosService
        String url = "http://localhost:8081/inventarios/reducir/" + productoId + "?cantidad=" + cantidad;
        String resp = restTemplate.postForObject(url, null, String.class);

        if (resp.startsWith("ERROR")) return resp;

        Venta v = new Venta(null, productoId, cantidad, usuario, LocalDateTime.now());
        repo.save(v);
        return "Venta registrada";
    }

    @GetMapping
    public List<Venta> listar(){ return repo.findAll(); }
}