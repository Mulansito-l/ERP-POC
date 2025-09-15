package com.erp.inventarios.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
    @Id @GeneratedValue
    private Long id;
    private String nombre;
    private int stock;
}