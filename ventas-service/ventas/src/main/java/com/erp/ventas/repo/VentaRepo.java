package com.erp.ventas.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.erp.ventas.model.Venta;

public interface VentaRepo extends JpaRepository<Venta, Long> {}