package com.erp.inventarios.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.erp.inventarios.repo.ProductoRepo;
import com.erp.inventarios.model.Producto;

@RestController
@RequestMapping("/inventarios")
public class InventarioController {
    private final ProductoRepo repo;
    public InventarioController(ProductoRepo repo){this.repo=repo;}

    @GetMapping
    public List<Producto> listar(){ return repo.findAll(); }

    @PostMapping("/reducir/{id}")
    public String reducir(@PathVariable("id") Long id,
                        @RequestParam("cantidad") int cantidad) {
        Optional<Producto> opt = repo.findById(id);
        if (opt.isEmpty()) return "ERROR: producto no encontrado";

        Producto p = opt.get();
        if (p.getStock() < cantidad) return "ERROR: stock insuficiente";

        p.setStock(p.getStock() - cantidad);
        repo.save(p);

        return "OK";
    }
}