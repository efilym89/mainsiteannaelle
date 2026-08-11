CREATE TABLE `bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`contact_method` text DEFAULT 'call' NOT NULL,
	`zone` text DEFAULT '' NOT NULL,
	`branch` text DEFAULT 'Шота Руставели, 33' NOT NULL,
	`preferred_date` text DEFAULT '' NOT NULL,
	`preferred_time` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`consent_at` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
