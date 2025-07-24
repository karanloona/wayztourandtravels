-- Drop the table if it already exists (optional, for testing purposes)
DROP TABLE IF EXISTS `users`;

-- Create the users table
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `userType` ENUM('superadmin', 'admin', 'member') NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert a sample user (optional, for testing) // admin@1234
INSERT INTO `users` (`username`, `password`, `userType`)
VALUES ('superadmin@gmail.com', '$2y$12$ZM4U.5N3Hdu3sLILoXsVGe1dzd7ro0XkFkHk1tSs.8p17ST.rNWPS', 'superadmin');


-- Drop the table if it exists (optional, for testing/reset purposes)
DROP TABLE IF EXISTS `bookings`;

-- Create the bookings table
-- Create the bookings table with UUID
CREATE TABLE `bookings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL UNIQUE, -- UUID as VARCHAR(36), unique constraint
  `fullName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `contact` BIGINT NOT NULL,
  `numberOfTravelers` INT NOT NULL,
  `date` VARCHAR(50) NOT NULL, -- Storing as string for simplicity (ISO format like "2025-03-22")
  `tripProtection` BOOLEAN NOT NULL,
  `totalCost` DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `bookings`
  ADD COLUMN `paymentStatus` INT NOT NULL DEFAULT 0, -- 0 could mean "Pending"
  ADD COLUMN `bookingStatus` INT NOT NULL DEFAULT 0, -- 0 could mean "Pending"
  ADD COLUMN `uuid` VARCHAR(255) NOT NULL,
  ADD COLUMN `paymentId` VARCHAR(255) NULL; -- Can be NULL until a payment is made
  ADD COLUMN `firstName` VARCHAR(255) NOT NULL,
  ADD COLUMN `lastName` VARCHAR(255) NOT NULL;
  ADD COLUMN `infants` INT NULL DEFAULT 0;
  DROP COLUMN `fullName`;


-- Drop the table if it already exists (optional)
DROP TABLE IF EXISTS `booking_inquiries`;

-- Create the booking_inquiries table
CREATE TABLE `booking_inquiries` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `email` VARCHAR(255) NOT NULL,
  `message` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Automatically set current timestamp
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

