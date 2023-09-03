package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Employee getEmployee(@PathVariable int id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        return employee.orElse(null);
    }

    @PostMapping
    public void addEmployee(@RequestBody Employee employee) {
        employeeRepository.save(employee);
    }

    @PutMapping("/{id}")
    public void updateEmployee(@PathVariable int id, @RequestBody Employee updatedEmployee) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);

        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            employee.setFirstname(updatedEmployee.getFirstname());
            employee.setLastname(updatedEmployee.getLastname());
            employee.setBirthdate(updatedEmployee.getBirthdate());
            employee.setAddress(updatedEmployee.getAddress());
            employee.setPhone(updatedEmployee.getPhone());

            employeeRepository.save(employee);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable int id) {
        employeeRepository.deleteById(id);
    }
}
