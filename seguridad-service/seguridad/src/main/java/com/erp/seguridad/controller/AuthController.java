package com.erp.seguridad.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/login")
    public String login(@RequestParam String user, @RequestParam String pass){
        // Mock simple: acepta cualquier user/pass
        return "token-"+user;
    }
}