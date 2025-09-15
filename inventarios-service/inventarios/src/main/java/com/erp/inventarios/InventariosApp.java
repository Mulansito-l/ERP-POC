package com.erp.inventarios;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import com.erp.inventarios.model.Producto;
import com.erp.inventarios.repo.ProductoRepo;

@SpringBootApplication
public class InventariosApp {

    public static void main(String[] args) {
        SpringApplication.run(InventariosApp.class, args);
    }

    // Bean para inicializar datos
    @Bean
    CommandLineRunner initData(ProductoRepo productoRepo) {
        return args -> {
            // Inserta productos
            productoRepo.save(new Producto(null, "Laptop X", 10));
            productoRepo.save(new Producto(null, "Mouse Y", 5));
            productoRepo.save(new Producto(null, "Teclado Z", 7));
            
            System.out.println("Datos iniciales insertados en la base H2.");
        };
    }
}