CREATE TABLE IF NOT EXISTS "products" (
	"id" text PRIMARY KEY DEFAULT (CONCAT('PRD_', gen_random_uuid())) NOT NULL,
	"name" text,
	"description" text,
	"price" numeric,
	"quantity" integer,
	"image" text,
	"category" text
);
