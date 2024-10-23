package com.leet.learning.ll_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.leet.learning")
public class LlServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(LlServerApplication.class, args);
	}

}
