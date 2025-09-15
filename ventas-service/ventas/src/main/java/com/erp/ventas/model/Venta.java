package com.erp.ventas.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Venta {
    @Id @GeneratedValue
    private Long id;
    private Long idProducto;
    private int cantidad;
    private String usuario;
    private LocalDateTime fecha;
}