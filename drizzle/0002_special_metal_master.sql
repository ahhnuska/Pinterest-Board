CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	`desc` text,
	`colors` text DEFAULT '[]',
	`image_url` text,
	`status` text DEFAULT 'backlog',
	`notes` text,
	`inspo` text
);
--> statement-breakpoint
DROP TABLE `roasts`;