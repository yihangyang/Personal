package com.example.demo;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String firstname;
    private String lastname;
    @Temporal(TemporalType.DATE)
    private Date birthdate;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;
    private String phone;
}

@Entity
@Data
class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String city;
    private String zip;
    private String street;
    private String number;
}
