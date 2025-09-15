package com.erp.inventarios.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.erp.inventarios.model.Producto;

public interface ProductoRepo extends JpaRepository<Producto, Long> {}